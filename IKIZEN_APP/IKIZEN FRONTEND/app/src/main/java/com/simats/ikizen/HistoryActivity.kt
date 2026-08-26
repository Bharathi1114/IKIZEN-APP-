package com.simats.ikizen

import android.graphics.Color
import android.graphics.Typeface
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.postgrest.postgrest
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class HistoryActivity : AppCompatActivity() {

    private lateinit var llHistoryList: LinearLayout
    private lateinit var tvEmpty: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_history)

        llHistoryList = findViewById(R.id.llHistoryList)
        tvEmpty = findViewById(R.id.tvEmpty)

        findViewById<ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }

        loadHistory()
    }

    private fun loadHistory() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val currentUser = SupabaseManager.client.auth.currentSessionOrNull()?.user
                if (currentUser != null) {
                    val logs = SupabaseManager.client.postgrest["daily_logs"]
                        .select { filter { eq("user_id", currentUser.id) } }
                        .decodeList<DailyLog>()
                        .sortedByDescending { it.logDate }

                    withContext(Dispatchers.Main) {
                        if (logs.isEmpty()) {
                            tvEmpty.visibility = View.VISIBLE
                        } else {
                            tvEmpty.visibility = View.GONE
                            renderLogs(logs)
                        }
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@HistoryActivity, "Error loading history: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun renderLogs(logs: List<DailyLog>) {
        llHistoryList.removeAllViews()

        logs.forEach { log ->
            val card = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                setPadding(48, 32, 48, 32)
                background = resources.getDrawable(R.drawable.bg_card, null)
                elevation = 2f
                layoutParams = LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT, 
                    LinearLayout.LayoutParams.WRAP_CONTENT
                ).apply {
                    bottomMargin = 32
                }
            }

            val headerRow = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT)
            }

            val dateText = TextView(this).apply {
                text = log.logDate
                textSize = 18f
                setTextColor(Color.parseColor("#0B132B"))
                setTypeface(null, Typeface.BOLD)
                layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
            }

            val moodEmoji = getEmojiForMood(log.mood)
            val moodText = TextView(this).apply {
                text = moodEmoji
                textSize = 24f
            }

            headerRow.addView(dateText)
            headerRow.addView(moodText)

            val detailsText = TextView(this).apply {
                text = "Calories: ${log.caloriesConsumed} kcal\nProtein: ${log.proteinConsumed}g | Carbs: ${log.carbsConsumed}g | Fat: ${log.fatConsumed}g"
                textSize = 14f
                setTextColor(Color.parseColor("#758494"))
                setPadding(0, 16, 0, 0)
            }

            card.addView(headerRow)
            card.addView(detailsText)

            llHistoryList.addView(card)
        }
    }

    private fun getEmojiForMood(mood: String?): String {
        return when (mood) {
            "Anxious" -> "😖"
            "Sad" -> "😔"
            "Calm" -> "😌"
            "Happy" -> "😄"
            "Neutral" -> "😐"
            else -> "😐"
        }
    }
}
