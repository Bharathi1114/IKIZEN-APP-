package com.simats.ikizen

import android.graphics.Color
import android.graphics.Typeface
import android.os.Bundle
import android.view.Gravity
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MoodActivity : AppCompatActivity() {

    private lateinit var llMoodContainer: LinearLayout
    private lateinit var llMeditationList: LinearLayout

    private val moods = listOf(
        Pair("😖", "Anxious"),
        Pair("😔", "Sad"),
        Pair("😐", "Neutral"),
        Pair("😌", "Calm"),
        Pair("😄", "Happy")
    )

    private fun getMeditationsForMood(mood: String?): List<MeditationContent> {
        return when (mood) {
            "Anxious" -> listOf(
                MeditationContent("Deep Breathing", "10 Min", "A quick breathing exercise to center yourself.", "https://example.com/audio1"),
                MeditationContent("Anxiety Relief", "15 Min", "Guided meditation to help calm racing thoughts.", "https://example.com/audio4"),
                MeditationContent("Body Scan", "12 Min", "Release physical tension associated with anxiety.", "https://example.com/audio6")
            )
            "Sad" -> listOf(
                MeditationContent("Self-Compassion", "15 Min", "Be kind to yourself during difficult moments.", "https://example.com/audio7"),
                MeditationContent("Uplifting Affirmations", "5 Min", "Gentle words to lift your spirits.", "https://example.com/audio8")
            )
            "Calm" -> listOf(
                MeditationContent("Sleep Wind Down", "20 Min", "Relax your body and prepare for a restful sleep.", "https://example.com/audio2"),
                MeditationContent("Gratitude Journaling", "10 Min", "Reflect on the peaceful moments.", "https://example.com/audio9")
            )
            "Happy" -> listOf(
                MeditationContent("Morning Motivation", "5 Min", "Start your day with positive energy and intention.", "https://example.com/audio3"),
                MeditationContent("Joyful Visualization", "10 Min", "Amplify your positive feelings.", "https://example.com/audio10")
            )
            else -> listOf(
                // Neutral / Default
                MeditationContent("Focus & Clarity", "10 Min", "Clear your mind to improve concentration.", "https://example.com/audio5"),
                MeditationContent("Deep Breathing", "10 Min", "A quick breathing exercise to center yourself.", "https://example.com/audio1")
            )
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_mood)

        llMoodContainer = findViewById(R.id.llMoodContainer)
        llMeditationList = findViewById(R.id.llMeditationList)

        findViewById<ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }

        renderMoodCheckIn()
        renderMeditations()
    }

    private fun renderMoodCheckIn() {
        llMoodContainer.removeAllViews()

        moods.forEach { mood ->
            val isSelected = OnboardingDataStore.loggedMood == mood.second

            val container = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                gravity = Gravity.CENTER
                layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
                
                background = if (isSelected) {
                    resources.getDrawable(R.drawable.bg_input, null)
                } else {
                    null
                }
                
                setPadding(8, 16, 8, 16)
                
                setOnClickListener {
                    OnboardingDataStore.loggedMood = mood.second
                    Toast.makeText(this@MoodActivity, "Mood logged: ${mood.second}", Toast.LENGTH_SHORT).show()
                    renderMoodCheckIn() // Re-render to update highlights
                    renderMeditations() // Update meditation list for this mood
                }
            }

            val emoji = TextView(this).apply {
                text = mood.first
                textSize = 32f
                gravity = Gravity.CENTER
            }

            val label = TextView(this).apply {
                text = mood.second
                textSize = 10f
                gravity = Gravity.CENTER
                setTextColor(if (isSelected) Color.parseColor("#1877F2") else Color.parseColor("#758494"))
                setTypeface(null, if (isSelected) Typeface.BOLD else Typeface.NORMAL)
                setPadding(0, 8, 0, 0)
            }

            container.addView(emoji)
            container.addView(label)
            llMoodContainer.addView(container)
        }
    }

    private fun renderMeditations() {
        llMeditationList.removeAllViews()

        getMeditationsForMood(OnboardingDataStore.loggedMood).forEach { med ->
            val card = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                setPadding(48, 32, 48, 32)
                background = resources.getDrawable(R.drawable.bg_card, null)
                elevation = 2f
                layoutParams = LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT, 
                    LinearLayout.LayoutParams.WRAP_CONTENT
                ).apply {
                    bottomMargin = 24
                }
                gravity = Gravity.CENTER_VERTICAL
            }

            val textContainer = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
            }

            val name = TextView(this).apply { 
                text = med.title
                textSize = 16f
                setTextColor(Color.parseColor("#0B132B"))
                setTypeface(null, Typeface.BOLD) 
            }

            val details = TextView(this).apply { 
                text = "${med.duration}  |  ${med.description}"
                textSize = 12f
                setTextColor(Color.parseColor("#758494"))
                setPadding(0, 8, 0, 0) 
            }

            textContainer.addView(name)
            textContainer.addView(details)
            card.addView(textContainer)

            val playBtn = ImageView(this).apply {
                layoutParams = LinearLayout.LayoutParams(80, 80)
                setPadding(16, 16, 16, 16)
                setImageResource(android.R.drawable.ic_media_play)
                setColorFilter(Color.parseColor("#1877F2"))
                
                setOnClickListener {
                    Toast.makeText(this@MoodActivity, "Starting ${med.title}...", Toast.LENGTH_SHORT).show()
                }
            }
            card.addView(playBtn)

            llMeditationList.addView(card)
        }
    }
}

data class MeditationContent(
    val title: String,
    val duration: String,
    val description: String,
    val streamUrl: String
)
