package com.simats.ikizen

import android.graphics.Color
import android.graphics.Typeface
import android.os.Bundle
import android.view.Gravity
import android.widget.EditText
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.postgrest.postgrest
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class AICoachActivity : AppCompatActivity() {

    private var currentPersona = "holistic"
    private var userProfile: UserProfile = OnboardingDataStore.userProfile
    private lateinit var llChatStream: LinearLayout
    private lateinit var svContent: ScrollView
    private lateinit var etMessage: EditText

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_ai_coach)

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.rootLayout)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        findViewById<ImageView>(R.id.btnBack)?.setOnClickListener {
            finish()
        }

        llChatStream = findViewById(R.id.llChatStream)
        svContent = findViewById(R.id.svContent)
        etMessage = findViewById(R.id.etMessage)

        setupPersonaChips()
        setupQuickPrompts()
        setupChatInput()

        loadProfileAndInsights()
    }

    private fun setupPersonaChips() {
        val chipHolistic = findViewById<TextView>(R.id.chipHolistic)
        val chipTrainer = findViewById<TextView>(R.id.chipTrainer)
        val chipNutritionist = findViewById<TextView>(R.id.chipNutritionist)
        val chipMindfulness = findViewById<TextView>(R.id.chipMindfulness)

        val chips = listOf(chipHolistic, chipTrainer, chipNutritionist, chipMindfulness)

        chipHolistic?.setOnClickListener {
            updatePersonaSelection("holistic", chips, chipHolistic, "🌿 Holistic Lifestyle Coach")
        }
        chipTrainer?.setOnClickListener {
            updatePersonaSelection("trainer", chips, chipTrainer, "🏋️ Performance & Fitness Trainer")
        }
        chipNutritionist?.setOnClickListener {
            updatePersonaSelection("nutritionist", chips, chipNutritionist, "🥗 Precision Nutritionist")
        }
        chipMindfulness?.setOnClickListener {
            updatePersonaSelection("mindfulness", chips, chipMindfulness, "🧘 Zen & Mindfulness Mentor")
        }
    }

    private fun updatePersonaSelection(persona: String, allChips: List<TextView?>, selected: TextView?, label: String) {
        currentPersona = persona
        allChips.forEach {
            it?.background = resources.getDrawable(R.drawable.bg_chip_unselected, null)
            it?.setTextColor(Color.parseColor("#0B132B"))
            it?.setTypeface(null, Typeface.NORMAL)
        }
        selected?.background = resources.getDrawable(R.drawable.bg_chip_selected_teal, null)
        selected?.setTextColor(Color.WHITE)
        selected?.setTypeface(null, Typeface.BOLD)

        addCoachBubble("Switched active persona to **$label**. All lifestyle recommendations, macro timing, and exercise prescriptions are now calibrated to this specialty.")
    }

    private fun setupQuickPrompts() {
        findViewById<TextView>(R.id.promptAudit)?.setOnClickListener {
            sendMessage("Give me a comprehensive lifestyle and progress audit for today.")
        }
        findViewById<TextView>(R.id.promptDinner)?.setOnClickListener {
            sendMessage("Suggest a meal that fits my remaining calorie and protein budget.")
        }
        findViewById<TextView>(R.id.promptWorkout)?.setOnClickListener {
            sendMessage("How should I adapt my workout if I feel fatigued with high sitting hours?")
        }
        findViewById<TextView>(R.id.promptSleep)?.setOnClickListener {
            sendMessage("What is the best evening wind-down routine for restorative sleep?")
        }
    }

    private fun setupChatInput() {
        findViewById<ImageView>(R.id.btnSend)?.setOnClickListener {
            val text = etMessage.text.toString().trim()
            if (text.isNotEmpty()) {
                sendMessage(text)
                etMessage.text.clear()
            }
        }
    }

    private fun loadProfileAndInsights() {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val currentUser = SupabaseManager.client.auth.currentSessionOrNull()?.user
                if (currentUser != null) {
                    val profile = withContext(Dispatchers.IO) {
                        SupabaseManager.client.postgrest["profiles"]
                            .select { filter { eq("id", currentUser.id) } }
                            .decodeSingle<UserProfile>()
                    }
                    userProfile = profile
                }
            } catch (e: Exception) {
                userProfile = OnboardingDataStore.userProfile
            }

            updateSmartInsightsUI()

            // Initial Coach greeting
            addCoachBubble("👋 Hello ${userProfile.name ?: "there"}! I am your **iKizen AI Lifestyle Coach**.\n\nI analyze your live nutrition, training load, mood, and sleep data in real-time. Ask me for meal suggestions, workout modifications, or lifestyle optimization tips!")
        }
    }

    private fun updateSmartInsightsUI() {
        val cCal = OnboardingDataStore.consumedCalories
        val tCal = userProfile.targetCalories ?: 2400
        val cPro = OnboardingDataStore.consumedProtein
        val tPro = userProfile.targetProtein ?: 140

        val calScore = Math.min(100, Math.round((cCal.toDouble() / tCal) * 100).toInt())
        val proScore = Math.min(100, Math.round((cPro.toDouble() / tPro) * 100).toInt())

        val vitality = Math.min(100, Math.max(50, (calScore * 0.4 + proScore * 0.6).toInt() + 10))
        findViewById<TextView>(R.id.tvVitalityBadge)?.text = "$vitality% Vitality"

        val remPro = Math.max(0, tPro - cPro)
        if (remPro > 25) {
            findViewById<TextView>(R.id.tvMainInsightTitle)?.text = "🥩 Protein Synthesis Threshold Gap"
            findViewById<TextView>(R.id.tvMainInsightDesc)?.text = "You are currently ${remPro}g short of your muscle preservation target. Prioritize high-protein food sources in your next meal."
            findViewById<TextView>(R.id.tvPillarStatus)?.text = "ADVISORY"
            findViewById<TextView>(R.id.tvPillarStatus)?.setTextColor(Color.parseColor("#FFD54F"))
        } else {
            findViewById<TextView>(R.id.tvMainInsightTitle)?.text = "✨ Macro Balance & Steady Fuel"
            findViewById<TextView>(R.id.tvMainInsightDesc)?.text = "Your daily macro distribution is well-aligned with your ${userProfile.primaryGoal ?: "fitness"} goal. Focus on evening hydration and digital wind-down."
            findViewById<TextView>(R.id.tvPillarStatus)?.text = "OPTIMAL"
            findViewById<TextView>(R.id.tvPillarStatus)?.setTextColor(Color.parseColor("#69F0AE"))
        }
    }

    private fun sendMessage(userText: String) {
        addUserBubble(userText)

        // Generate AI Response
        CoroutineScope(Dispatchers.Main).launch {
            val response = generateAIResponse(userText)
            addCoachBubble(response)
        }
    }

    private fun addUserBubble(text: String) {
        val bubble = TextView(this).apply {
            this.text = text
            textSize = 13f
            setTextColor(Color.WHITE)
            background = resources.getDrawable(R.drawable.bg_button_primary, null)
            setPadding(36, 24, 36, 24)
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                gravity = Gravity.END
                bottomMargin = 16
                marginStart = 120
            }
        }
        llChatStream.addView(bubble)
        svContent.post { svContent.fullScroll(ScrollView.FOCUS_DOWN) }
    }

    private fun addCoachBubble(text: String) {
        val bubble = TextView(this).apply {
            this.text = text.replace("**", "")
            textSize = 13f
            setTextColor(Color.parseColor("#0B132B"))
            background = resources.getDrawable(R.drawable.bg_card, null)
            setPadding(36, 28, 36, 28)
            setLineSpacing(4f, 1.15f)
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                gravity = Gravity.START
                bottomMargin = 16
                marginEnd = 40
            }
        }
        llChatStream.addView(bubble)
        svContent.post { svContent.fullScroll(ScrollView.FOCUS_DOWN) }
    }

    private fun generateAIResponse(prompt: String): String {
        val p = prompt.toLowerCase()
        val cCal = OnboardingDataStore.consumedCalories
        val tCal = userProfile.targetCalories ?: 2400
        val cPro = OnboardingDataStore.consumedProtein
        val tPro = userProfile.targetProtein ?: 140
        val remCal = Math.max(0, tCal - cCal)
        val remPro = Math.max(0, tPro - cPro)
        val diet = userProfile.dietPreference ?: "Vegetarian"
        val goal = userProfile.primaryGoal ?: "Maintain Weight"

        return when {
            p.contains("audit") || p.contains("stats") || p.contains("progress") -> {
                "📊 Daily Lifestyle & Macro Audit:\n\n" +
                "• Consumed Energy: $cCal / $tCal kcal ($remCal kcal remaining)\n" +
                "• Protein Adherence: ${cPro}g / ${tPro}g ($remPro g remaining)\n" +
                "• Diet Profile: $diet\n" +
                "• Primary Objective: $goal\n\n" +
                "Coach Verdict: You are making steady progress! Ensure your final meal hits your protein threshold."
            }
            p.contains("dinner") || p.contains("meal") || p.contains("eat") || p.contains("food") -> {
                val suggestion = if (diet.toLowerCase().contains("vegan")) {
                    "Tofu Edamame Quinoa Bowl (~380 kcal, 28g protein)"
                } else if (diet.toLowerCase().contains("non-veg")) {
                    "Grilled Herb Chicken Breast with Steamed Veggies (~410 kcal, 44g protein)"
                } else {
                    "Paneer Tikka with Sautéed Spinach & Brown Rice (~420 kcal, 32g protein)"
                }
                "🥗 Personalized Meal Recommendation:\n\n" +
                "Based on your $diet preference and remaining $remCal kcal budget:\n\n" +
                "• Suggested: $suggestion\n" +
                "• Hydration: Pair with 400ml water and electrolytes for optimal digestion."
            }
            p.contains("workout") || p.contains("exercise") || p.contains("fatigue") || p.contains("energy") -> {
                "⚡ Adaptive Training Guidance:\n\n" +
                "• Recommended: 15-min Core & Posterior Chain Mobility Flow\n" +
                "• Focus: Hip flexor extension and spinal decompression to counteract sitting fatigue\n" +
                "• Rest Interval: Keep intensity moderate to avoid central nervous system exhaustion."
            }
            p.contains("sleep") || p.contains("relax") || p.contains("wind") || p.contains("stress") -> {
                "🌙 Circadian Sleep Protocol:\n\n" +
                "1. Digital Sunset: Turn off screens 45 minutes before sleep.\n" +
                "2. 4-7-8 Breathwork: Inhale 4s, hold 7s, exhale 8s (repeat 4 times).\n" +
                "3. Optimal Sleep Window: 10:30 PM - 6:30 AM for cellular and muscular rejuvenation."
            }
            else -> {
                "💡 Lifestyle Coach Insight:\n\n" +
                "Your daily progress is calibrated for '$goal'. You have $remCal kcal and ${remPro}g protein remaining today.\n\n" +
                "Stay consistent with water intake, take regular posture stretch breaks, and finish strong!"
            }
        }
    }
}
