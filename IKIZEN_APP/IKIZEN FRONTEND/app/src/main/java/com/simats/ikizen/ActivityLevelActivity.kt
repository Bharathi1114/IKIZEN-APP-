package com.simats.ikizen

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class ActivityLevelActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_activity_level)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.rootLayout)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        
        findViewById<android.widget.ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }
        
        var currentSteps = 1000
        var currentSittingHours = 2.0
        var currentSleepDuration = 8.0
        var currentJobType = "Desk job"
        var currentActivityLevel = "Lightly Active"
        
        // SeekBars setup
        val tvStepsValue = findViewById<android.widget.TextView>(R.id.tvStepsValue)
        val sbSteps = findViewById<android.widget.SeekBar>(R.id.sbSteps)
        sbSteps.setOnSeekBarChangeListener(object : android.widget.SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: android.widget.SeekBar?, progress: Int, fromUser: Boolean) {
                val steps = progress + 1000
                currentSteps = steps
                tvStepsValue.text = java.text.NumberFormat.getNumberInstance(java.util.Locale.US).format(steps)
            }
            override fun onStartTrackingTouch(seekBar: android.widget.SeekBar?) {}
            override fun onStopTrackingTouch(seekBar: android.widget.SeekBar?) {}
        })

        val tvSittingValue = findViewById<android.widget.TextView>(R.id.tvSittingValue)
        val sbSitting = findViewById<android.widget.SeekBar>(R.id.sbSitting)
        sbSitting.setOnSeekBarChangeListener(object : android.widget.SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: android.widget.SeekBar?, progress: Int, fromUser: Boolean) {
                val hours = progress + 2
                currentSittingHours = hours.toDouble()
                tvSittingValue.text = "$hours h"
            }
            override fun onStartTrackingTouch(seekBar: android.widget.SeekBar?) {}
            override fun onStopTrackingTouch(seekBar: android.widget.SeekBar?) {}
        })

        val tvSleepValue = findViewById<android.widget.TextView>(R.id.tvSleepValue)
        val sbSleep = findViewById<android.widget.SeekBar>(R.id.sbSleep)
        sbSleep.setOnSeekBarChangeListener(object : android.widget.SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: android.widget.SeekBar?, progress: Int, fromUser: Boolean) {
                val hours = (progress + 8) / 2.0 // Map 0-14 to 4.0-11.0 (steps of 0.5)
                currentSleepDuration = hours
                tvSleepValue.text = "${if (hours % 1.0 == 0.0) hours.toInt() else hours} h"
            }
            override fun onStartTrackingTouch(seekBar: android.widget.SeekBar?) {}
            override fun onStopTrackingTouch(seekBar: android.widget.SeekBar?) {}
        })

        // Job type chips setup
        val jobChips = listOf(
            findViewById<android.widget.TextView>(R.id.tvJobDesk),
            findViewById<android.widget.TextView>(R.id.tvJobStudent),
            findViewById<android.widget.TextView>(R.id.tvJobField),
            findViewById<android.widget.TextView>(R.id.tvJobPhysical),
            findViewById<android.widget.TextView>(R.id.tvJobShift),
            findViewById<android.widget.TextView>(R.id.tvJobNotWorking)
        )
        val baseJobNames = listOf("Desk job", "Student", "Field work", "Physical work", "Shift work", "Not working now")
        
        fun selectJobChip(selectedIndex: Int) {
            currentJobType = baseJobNames[selectedIndex]
            for (i in jobChips.indices) {
                if (i == selectedIndex) {
                    jobChips[i].setBackgroundResource(R.drawable.bg_chip_selected)
                    jobChips[i].setTextColor(android.graphics.Color.WHITE)
                    jobChips[i].text = "${baseJobNames[i]} ✓"
                    jobChips[i].backgroundTintList = android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#1CA6A6"))
                } else {
                    jobChips[i].setBackgroundResource(R.drawable.bg_chip_unselected)
                    jobChips[i].setTextColor(android.graphics.Color.parseColor("#0B132B"))
                    jobChips[i].text = baseJobNames[i]
                    jobChips[i].backgroundTintList = null
                }
            }
        }
        
        for (i in jobChips.indices) {
            jobChips[i].setOnClickListener { selectJobChip(i) }
        }

        // Daily Activity Level Cards setup
        val activityCards = listOf(
            findViewById<android.widget.LinearLayout>(R.id.llActivitySedentary),
            findViewById<android.widget.LinearLayout>(R.id.llActivityLightly),
            findViewById<android.widget.LinearLayout>(R.id.llActivityModerately),
            findViewById<android.widget.LinearLayout>(R.id.llActivityVery),
            findViewById<android.widget.LinearLayout>(R.id.llActivityExtremely)
        )
        val activityImages = listOf(
            findViewById<android.widget.ImageView>(R.id.ivActivitySedentary),
            findViewById<android.widget.ImageView>(R.id.ivActivityLightly),
            findViewById<android.widget.ImageView>(R.id.ivActivityModerately),
            findViewById<android.widget.ImageView>(R.id.ivActivityVery),
            findViewById<android.widget.ImageView>(R.id.ivActivityExtremely)
        )
        val activityRadios = listOf(
            findViewById<android.widget.RadioButton>(R.id.rbActivitySedentary),
            findViewById<android.widget.RadioButton>(R.id.rbActivityLightly),
            findViewById<android.widget.RadioButton>(R.id.rbActivityModerately),
            findViewById<android.widget.RadioButton>(R.id.rbActivityVery),
            findViewById<android.widget.RadioButton>(R.id.rbActivityExtremely)
        )
        
        fun selectActivityCard(selectedIndex: Int) {
            val activityNames = listOf("Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active")
            currentActivityLevel = activityNames[selectedIndex]
            for (i in activityCards.indices) {
                if (i == selectedIndex) {
                    activityCards[i].setBackgroundResource(R.drawable.bg_goal_card_selected)
                    activityImages[i].setColorFilter(android.graphics.Color.parseColor("#1CA6A6"))
                    activityRadios[i].isChecked = true
                    activityRadios[i].buttonTintList = android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#1877F2"))
                } else {
                    activityCards[i].setBackgroundResource(R.drawable.bg_goal_card_unselected)
                    activityImages[i].clearColorFilter()
                    activityRadios[i].isChecked = false
                    activityRadios[i].buttonTintList = android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#758494")) // default gray
                }
            }
        }
        
        for (i in activityCards.indices) {
            activityCards[i].setOnClickListener { selectActivityCard(i) }
        }

        findViewById<androidx.appcompat.widget.AppCompatButton>(R.id.btnContinueActivityLevel).setOnClickListener {
            OnboardingDataStore.userProfile = OnboardingDataStore.userProfile.copy(
                dailySteps = currentSteps,
                sittingHours = currentSittingHours,
                sleepDuration = currentSleepDuration,
                jobType = currentJobType,
                activityLevel = currentActivityLevel
            )
            startActivity(android.content.Intent(this, DietActivity::class.java))
        }
        
        // Initial defaults
        selectJobChip(0)
        selectActivityCard(1)
    }
}
