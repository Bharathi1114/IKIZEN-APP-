package com.simats.ikizen

import android.os.Bundle
import android.widget.LinearLayout
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

import android.content.Intent
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.postgrest.postgrest
import kotlinx.coroutines.launch

class DashboardActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_dashboard)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.rootLayout)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        val llHome = findViewById<android.widget.LinearLayout>(R.id.llHome)
        val llExercises = findViewById<android.widget.LinearLayout>(R.id.llExercises)
        val llFood = findViewById<android.widget.LinearLayout>(R.id.llFood)
        val llMood = findViewById<android.widget.LinearLayout>(R.id.llMood)
        val llSettings = findViewById<android.widget.LinearLayout>(R.id.llSettings)

        llFood?.setOnClickListener {
            startActivity(Intent(this, FoodActivity::class.java))
        }
        
        llExercises?.setOnClickListener {
            startActivity(Intent(this, ExerciseActivity::class.java))
        }
        
        llMood?.setOnClickListener {
            startActivity(Intent(this, MoodActivity::class.java))
        }

        llSettings?.setOnClickListener {
            startActivity(Intent(this, ProfileActivity::class.java))
        }

        findViewById<android.view.View>(R.id.btnAICoach)?.setOnClickListener {
            startActivity(Intent(this, AICoachActivity::class.java))
        }
        findViewById<android.view.View>(R.id.cardAICoach)?.setOnClickListener {
            startActivity(Intent(this, AICoachActivity::class.java))
        }
        
        loadTargets()
        
        // Setup bottom navigation for Food (index 2) and Settings (index 4)
        val bottomNav = findViewById<LinearLayout>(R.id.bottomNav)
        bottomNav?.getChildAt(2)?.setOnClickListener {
            startActivity(android.content.Intent(this, FoodActivity::class.java))
        }
        bottomNav?.getChildAt(4)?.setOnClickListener {
            startActivity(android.content.Intent(this, SettingsActivity::class.java))
        }
    }

    override fun onResume() {
        super.onResume()
        // Refresh UI in case we just came back from FoodActivity and logged food
        loadTargets()
    }

    private fun loadTargets() {
        kotlinx.coroutines.CoroutineScope(kotlinx.coroutines.Dispatchers.Main).launch {
            try {
                val currentUser = SupabaseManager.client.auth.currentSessionOrNull()?.user
                if (currentUser != null) {
                    val profile = SupabaseManager.client.postgrest["profiles"]
                        .select { filter { eq("id", currentUser.id) } }
                        .decodeSingle<UserProfile>()
                    
                    updateUI(profile)
                    fetchRecommendations(profile)
                } else {
                    updateUI(OnboardingDataStore.userProfile)
                    fetchRecommendations(OnboardingDataStore.userProfile)
                }
            } catch (e: Exception) {
                android.util.Log.e("Dashboard", "Error loading profile: ${e.message}")
                updateUI(OnboardingDataStore.userProfile)
                fetchRecommendations(OnboardingDataStore.userProfile)
            }
        }
    }

    private fun updateUI(profile: UserProfile) {
        val calories = profile.targetCalories ?: 2870
        val protein = profile.targetProtein ?: 145
        val carbs = profile.targetCarbs ?: 300
        val fat = profile.targetFat ?: 80

        val cCal = OnboardingDataStore.consumedCalories
        val cPro = OnboardingDataStore.consumedProtein
        val cCar = OnboardingDataStore.consumedCarbs
        val cFat = OnboardingDataStore.consumedFat
        
        // Update new Top Nutrition Card
        findViewById<TextView>(R.id.tvMainCalories)?.text = java.text.NumberFormat.getNumberInstance(java.util.Locale.US).format(calories)
        findViewById<android.widget.ProgressBar>(R.id.pbMainCalories)?.apply { max = calories; progress = cCal }
        
        findViewById<TextView>(R.id.tvMainProtein)?.text = "${protein}g"
        findViewById<android.widget.ProgressBar>(R.id.pbMainProtein)?.apply { max = protein; progress = cPro }
        
        findViewById<TextView>(R.id.tvMainCarbs)?.text = "${carbs}g"
        findViewById<android.widget.ProgressBar>(R.id.pbMainCarbs)?.apply { max = carbs; progress = cCar }
        
        findViewById<TextView>(R.id.tvMainFat)?.text = "${fat}g"
        findViewById<android.widget.ProgressBar>(R.id.pbMainFat)?.apply { max = fat; progress = cFat }

        // Update Detailed Progress Bars Below
        findViewById<TextView>(R.id.tvCaloriesProgress)?.text = "${java.text.NumberFormat.getNumberInstance(java.util.Locale.US).format(cCal)} / ${java.text.NumberFormat.getNumberInstance(java.util.Locale.US).format(calories)} kcal"
        findViewById<android.widget.ProgressBar>(R.id.pbCalories)?.apply {
            max = calories
            progress = cCal
        }
        
        findViewById<TextView>(R.id.tvProteinProgress)?.text = "$cPro / $protein g"
        findViewById<android.widget.ProgressBar>(R.id.pbProtein)?.apply {
            max = protein
            progress = cPro
        }

        findViewById<TextView>(R.id.tvDetailCarbs)?.text = "$cCar / $carbs g"
        findViewById<android.widget.ProgressBar>(R.id.pbDetailCarbs)?.apply {
            max = carbs
            progress = cCar
        }

        findViewById<TextView>(R.id.tvDetailFat)?.text = "$cFat / $fat g"
        findViewById<android.widget.ProgressBar>(R.id.pbDetailFat)?.apply {
            max = fat
            progress = cFat
        }
    }

    private fun fetchRecommendations(profile: UserProfile) {
        kotlinx.coroutines.CoroutineScope(kotlinx.coroutines.Dispatchers.Main).launch {
            try {
                // 1. Fetch Recommended Foods based on Diet
                val dietPref = profile.dietPreference?.lowercase() ?: ""
                val foodTable = when {
                    dietPref.contains("vegan") -> "vegan_foods"
                    dietPref.contains("keto") -> "keto_foods"
                    dietPref.contains("non-veg") -> "non_veg_foods"
                    else -> "veg_foods"
                }

                val foods = SupabaseManager.client.postgrest[foodTable]
                    .select { limit(10) } // Just pull top 10 for speed and take 4
                    .decodeList<Food>()
                    .shuffled()
                    .take(4)

                val llFood = findViewById<LinearLayout>(R.id.llRecommendedFood)
                llFood?.removeAllViews()
                foods.forEach { food ->
                    llFood?.addView(createFoodCard(food))
                }

                // 2. Fetch Recommended Exercises based on fitness level / goals
                val exercises = SupabaseManager.client.postgrest["exercises"]
                    .select { limit(15) }
                    .decodeList<Exercise>()
                    .shuffled()
                    .take(4)

                val llExercise = findViewById<LinearLayout>(R.id.llRecommendedExercises)
                llExercise?.removeAllViews()
                exercises.forEach { ex ->
                    llExercise?.addView(createExerciseCard(ex))
                }

            } catch (e: Exception) {
                android.util.Log.e("Dashboard", "Error fetching recommendations: ${e.message}")
            }
        }
    }

    private fun createFoodCard(food: Food): LinearLayout {
        val card = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(48, 32, 48, 32)
            background = resources.getDrawable(R.drawable.bg_card, null)
            layoutParams = LinearLayout.LayoutParams(600, LinearLayout.LayoutParams.WRAP_CONTENT).apply {
                marginEnd = 24
            }
        }
        val name = TextView(this).apply { 
            text = food.name
            textSize = 14f
            setTextColor(android.graphics.Color.parseColor("#0B132B"))
            setTypeface(null, android.graphics.Typeface.BOLD) 
        }
        val details = TextView(this).apply { 
            text = "${food.calories} kcal · ${food.proteinG}g protein"
            textSize = 12f
            setTextColor(android.graphics.Color.parseColor("#758494"))
            setPadding(0, 8, 0, 0) 
        }
        card.addView(name)
        card.addView(details)
        return card
    }

    private fun createExerciseCard(ex: Exercise): LinearLayout {
        val card = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(48, 32, 48, 32)
            background = resources.getDrawable(R.drawable.bg_card, null)
            layoutParams = LinearLayout.LayoutParams(600, LinearLayout.LayoutParams.WRAP_CONTENT).apply {
                marginEnd = 24
            }
        }
        val name = TextView(this).apply { 
            text = ex.name
            textSize = 14f
            setTextColor(android.graphics.Color.parseColor("#0B132B"))
            setTypeface(null, android.graphics.Typeface.BOLD) 
        }
        val details = TextView(this).apply { 
            text = "${ex.recommendedSets} sets × ${ex.recommendedReps} · ${ex.caloriesBurnedPerMin} kcal/min"
            textSize = 12f
            setTextColor(android.graphics.Color.parseColor("#758494"))
            setPadding(0, 8, 0, 0) 
        }
        card.addView(name)
        card.addView(details)
        return card
    }
}
