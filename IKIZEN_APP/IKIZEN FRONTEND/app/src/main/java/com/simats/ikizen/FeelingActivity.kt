package com.simats.ikizen

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class FeelingActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_feeling)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.rootLayout)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        
        findViewById<android.widget.ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }
        
        var currentFeeling = "Okay"
        var currentSleepDuration = 8.0
        val currentFocusAreas = mutableSetOf<String>()

        // Emoji Cards (Single Select)
        val emojiCards = listOf(
            findViewById<android.widget.LinearLayout>(R.id.llFeelingGreat),
            findViewById<android.widget.LinearLayout>(R.id.llFeelingGood),
            findViewById<android.widget.LinearLayout>(R.id.llFeelingOkay),
            findViewById<android.widget.LinearLayout>(R.id.llFeelingLow),
            findViewById<android.widget.LinearLayout>(R.id.llFeelingStressed)
        )
        val emojiTexts = listOf(
            findViewById<android.widget.TextView>(R.id.tvFeelingGreat),
            findViewById<android.widget.TextView>(R.id.tvFeelingGood),
            findViewById<android.widget.TextView>(R.id.tvFeelingOkay),
            findViewById<android.widget.TextView>(R.id.tvFeelingLow),
            findViewById<android.widget.TextView>(R.id.tvFeelingStressed)
        )
        
        fun selectEmojiCard(selectedIndex: Int) {
            val feelingNames = listOf("Great", "Good", "Okay", "Low", "Stressed")
            currentFeeling = feelingNames[selectedIndex]
            for (i in emojiCards.indices) {
                if (i == selectedIndex) {
                    emojiCards[i].setBackgroundResource(R.drawable.bg_emoji_card_selected)
                    emojiTexts[i].setTextColor(android.graphics.Color.parseColor("#1877F2"))
                    emojiTexts[i].setTypeface(null, android.graphics.Typeface.BOLD)
                } else {
                    emojiCards[i].setBackgroundResource(R.drawable.bg_emoji_card_unselected)
                    emojiTexts[i].setTextColor(android.graphics.Color.parseColor("#758494"))
                    emojiTexts[i].setTypeface(null, android.graphics.Typeface.NORMAL)
                }
            }
        }
        
        for (i in emojiCards.indices) {
            emojiCards[i].setOnClickListener { selectEmojiCard(i) }
        }

        // Seekbars
        val tvSleepDurationValue = findViewById<android.widget.TextView>(R.id.tvSleepDurationValue)
        val sbSleepDuration = findViewById<android.widget.SeekBar>(R.id.sbSleepDuration)
        sbSleepDuration.setOnSeekBarChangeListener(object : android.widget.SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: android.widget.SeekBar?, progress: Int, fromUser: Boolean) {
                val hours = (progress + 8) / 2.0
                currentSleepDuration = hours
                if (hours % 1.0 == 0.0) {
                    tvSleepDurationValue.text = "${hours.toInt()}h 0m"
                } else {
                    tvSleepDurationValue.text = "${hours.toInt()}h 30m"
                }
            }
            override fun onStartTrackingTouch(seekBar: android.widget.SeekBar?) {}
            override fun onStopTrackingTouch(seekBar: android.widget.SeekBar?) {}
        })

        val tvSleepQualityValue = findViewById<android.widget.TextView>(R.id.tvSleepQualityValue)
        val sbSleepQuality = findViewById<android.widget.SeekBar>(R.id.sbSleepQuality)
        sbSleepQuality.setOnSeekBarChangeListener(object : android.widget.SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: android.widget.SeekBar?, progress: Int, fromUser: Boolean) {
                val quality = when {
                    progress <= 20 -> "Restless"
                    progress <= 40 -> "Poor"
                    progress <= 60 -> "Fair"
                    progress <= 80 -> "Good"
                    else -> "Deep"
                }
                tvSleepQualityValue.text = quality
            }
            override fun onStartTrackingTouch(seekBar: android.widget.SeekBar?) {}
            override fun onStopTrackingTouch(seekBar: android.widget.SeekBar?) {}
        })

        val tvStressLevelValue = findViewById<android.widget.TextView>(R.id.tvStressLevelValue)
        val sbStressLevel = findViewById<android.widget.SeekBar>(R.id.sbStressLevel)
        sbStressLevel.setOnSeekBarChangeListener(object : android.widget.SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: android.widget.SeekBar?, progress: Int, fromUser: Boolean) {
                val stress = when {
                    progress <= 20 -> "Calm"
                    progress <= 40 -> "Low"
                    progress <= 60 -> "Manageable"
                    progress <= 80 -> "High"
                    else -> "Overwhelmed"
                }
                tvStressLevelValue.text = stress
            }
            override fun onStartTrackingTouch(seekBar: android.widget.SeekBar?) {}
            override fun onStopTrackingTouch(seekBar: android.widget.SeekBar?) {}
        })

        val tvEnergyLevelValue = findViewById<android.widget.TextView>(R.id.tvEnergyLevelValue)
        val sbEnergyLevel = findViewById<android.widget.SeekBar>(R.id.sbEnergyLevel)
        sbEnergyLevel.setOnSeekBarChangeListener(object : android.widget.SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: android.widget.SeekBar?, progress: Int, fromUser: Boolean) {
                tvEnergyLevelValue.text = "$progress%"
            }
            override fun onStartTrackingTouch(seekBar: android.widget.SeekBar?) {}
            override fun onStopTrackingTouch(seekBar: android.widget.SeekBar?) {}
        })

        // Generic Chip Toggler for all the multi-select chips
        fun setupChips(viewGroup: android.view.ViewGroup) {
            for (i in 0 until viewGroup.childCount) {
                val child = viewGroup.getChildAt(i)
                if (child is android.view.ViewGroup) {
                    setupChips(child)
                } else if (child is android.widget.TextView) {
                    val text = child.text.toString()
                    val bg = child.background
                    // Checking if it's a chip (we only want the ones in the "improve" section)
                    if (bg != null && (text.contains("✓") || child.currentTextColor == android.graphics.Color.parseColor("#0B132B") || child.currentTextColor == android.graphics.Color.WHITE)) {
                        // Exclude the static UI elements that match the color profile
                        if (child.id == R.id.tvSleepDurationValue || child.id == R.id.tvSleepQualityValue || child.id == R.id.tvStressLevelValue || child.id == R.id.tvEnergyLevelValue) continue
                        if (text == "🤩" || text == "🙂" || text == "😐" || text == "😔" || text == "😫") continue // skip emojis
                        if (text == "Great" || text == "Good" || text == "Okay" || text == "Low" || text == "Stressed") continue
                        if (text.contains("Average sleep duration") || text.contains("Sleep quality") || text.contains("Stress level") || text.contains("Typical energy level")) continue
                        if (text.contains("How are you feeling") || text.contains("Your mind matters") || text.contains("What would you like") || text.contains("Select everything")) continue
                        if (text == "4h" || text == "11h" || text == "Restless" || text == "Deep" || text == "Calm" || text == "Overwhelmed" || text == "Drained" || text == "Energised") continue

                        child.setOnClickListener {
                            val currentText = child.text.toString()
                            if (currentText.endsWith(" ✓")) {
                                // Deselect
                                val baseText = currentText.removeSuffix(" ✓")
                                child.text = baseText
                                child.setBackgroundResource(R.drawable.bg_chip_unselected)
                                child.setTextColor(android.graphics.Color.parseColor("#0B132B"))
                                currentFocusAreas.remove(baseText)
                            } else {
                                // Select
                                val baseText = currentText
                                child.text = "$baseText ✓"
                                // Alternating colors just to match design slightly (some are teal, some are blue in screenshot)
                                // The design shows "Reduce Stress" is teal, "Improve Focus" is blue.
                                // We can just default to blue or teal depending on length or just use blue.
                                if (baseText.contains("Stress") || baseText.contains("Habits")) {
                                    child.setBackgroundResource(R.drawable.bg_chip_selected_teal)
                                } else {
                                    child.setBackgroundResource(R.drawable.bg_chip_selected)
                                }
                                child.setTextColor(android.graphics.Color.WHITE)
                                currentFocusAreas.add(baseText)
                            }
                        }
                    }
                }
            }
        }
        
        setupChips(findViewById(R.id.rootLayout))

        findViewById<androidx.appcompat.widget.AppCompatButton>(R.id.btnContinueFeeling).setOnClickListener {
            OnboardingDataStore.userProfile = OnboardingDataStore.userProfile.copy(
                feelings = listOf(currentFeeling),
                sleepDuration = currentSleepDuration,
                focusAreas = currentFocusAreas.toList()
            )
            startActivity(android.content.Intent(this, AccomplishActivity::class.java))
        }
        
        // init
        selectEmojiCard(2)
    }
}
