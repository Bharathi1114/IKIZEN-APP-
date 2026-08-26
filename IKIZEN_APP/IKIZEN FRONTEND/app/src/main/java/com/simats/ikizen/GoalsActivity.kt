package com.simats.ikizen

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class GoalsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_goals)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.rootLayout)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        
        findViewById<android.widget.ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }
        
        var currentPrimaryGoal = "Improve Fitness"
        val currentSecondaryGoals = mutableSetOf<String>()
        var currentFitnessLevel = "Intermediate"

        findViewById<androidx.appcompat.widget.AppCompatButton>(R.id.btnContinueGoals).setOnClickListener {
            // Save to DataStore
            OnboardingDataStore.userProfile = OnboardingDataStore.userProfile.copy(
                primaryGoal = currentPrimaryGoal,
                secondaryGoals = currentSecondaryGoals.toList(),
                fitnessLevel = currentFitnessLevel
            )
            startActivity(android.content.Intent(this, ActivityLevelActivity::class.java))
        }

        // Primary Goals (Single Select)
        val llGoalLoseWeight = findViewById<android.widget.LinearLayout>(R.id.llGoalLoseWeight)
        val llGoalBuildMuscle = findViewById<android.widget.LinearLayout>(R.id.llGoalBuildMuscle)
        val llGoalGainWeight = findViewById<android.widget.LinearLayout>(R.id.llGoalGainWeight)
        val llGoalImproveFitness = findViewById<android.widget.LinearLayout>(R.id.llGoalImproveFitness)

        val ivGoalLoseWeight = findViewById<android.widget.ImageView>(R.id.ivGoalLoseWeight)
        val ivGoalBuildMuscle = findViewById<android.widget.ImageView>(R.id.ivGoalBuildMuscle)
        val ivGoalGainWeight = findViewById<android.widget.ImageView>(R.id.ivGoalGainWeight)
        val ivGoalImproveFitness = findViewById<android.widget.ImageView>(R.id.ivGoalImproveFitness)

        val primaryGoals = listOf(llGoalLoseWeight, llGoalBuildMuscle, llGoalGainWeight, llGoalImproveFitness)
        val primaryGoalIcons = listOf(ivGoalLoseWeight, ivGoalBuildMuscle, ivGoalGainWeight, ivGoalImproveFitness)

        fun selectPrimaryGoal(index: Int) {
            val goalNames = listOf("Lose Weight", "Build Muscle", "Gain Weight", "Improve Fitness")
            currentPrimaryGoal = goalNames[index]
            for (i in primaryGoals.indices) {
                if (i == index) {
                    primaryGoals[i].setBackgroundResource(R.drawable.bg_goal_card_selected)
                    primaryGoalIcons[i].setImageResource(android.R.drawable.star_on)
                    primaryGoalIcons[i].imageTintList = android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#1CA6A6"))
                } else {
                    primaryGoals[i].setBackgroundResource(R.drawable.bg_goal_card_unselected)
                    primaryGoalIcons[i].setImageResource(android.R.drawable.ic_menu_agenda)
                    primaryGoalIcons[i].imageTintList = null
                }
            }
        }

        llGoalLoseWeight.setOnClickListener { selectPrimaryGoal(0) }
        llGoalBuildMuscle.setOnClickListener { selectPrimaryGoal(1) }
        llGoalGainWeight.setOnClickListener { selectPrimaryGoal(2) }
        llGoalImproveFitness.setOnClickListener { selectPrimaryGoal(3) }

        // Secondary Goals (Multi Select)
        val tvSecLoseWeight = findViewById<android.widget.TextView>(R.id.tvSecLoseWeight)
        val tvSecGainWeight = findViewById<android.widget.TextView>(R.id.tvSecGainWeight)
        val tvSecImproveFitness = findViewById<android.widget.TextView>(R.id.tvSecImproveFitness)
        val tvSecIncreaseStrength = findViewById<android.widget.TextView>(R.id.tvSecIncreaseStrength)

        fun toggleSecondaryGoal(view: android.widget.TextView) {
            val isSelected = view.tag as? Boolean ?: false
            if (isSelected) {
                view.setBackgroundResource(R.drawable.bg_chip_unselected)
                view.setTextColor(android.graphics.Color.parseColor("#0B132B"))
                // Remove checkmark
                val baseText = view.text.toString().replace(" ✓", "")
                view.text = baseText
                view.tag = false
                currentSecondaryGoals.remove(baseText)
            } else {
                view.setBackgroundResource(R.drawable.bg_chip_selected)
                view.setTextColor(android.graphics.Color.WHITE)
                // Add checkmark
                val baseText = view.text.toString()
                view.text = "$baseText ✓"
                view.tag = true
                currentSecondaryGoals.add(baseText)
            }
        }

        tvSecLoseWeight.setOnClickListener { toggleSecondaryGoal(tvSecLoseWeight) }
        tvSecGainWeight.setOnClickListener { toggleSecondaryGoal(tvSecGainWeight) }
        tvSecImproveFitness.setOnClickListener { toggleSecondaryGoal(tvSecImproveFitness) }
        tvSecIncreaseStrength.setOnClickListener { toggleSecondaryGoal(tvSecIncreaseStrength) }

        // Initial default state for secondary (Improve Fitness is selected in mock)
        toggleSecondaryGoal(tvSecImproveFitness)

        // Fitness Level (Single Select)
        val llFitnessBeginner = findViewById<android.widget.LinearLayout>(R.id.llFitnessBeginner)
        val llFitnessIntermediate = findViewById<android.widget.LinearLayout>(R.id.llFitnessIntermediate)
        val llFitnessAdvanced = findViewById<android.widget.LinearLayout>(R.id.llFitnessAdvanced)
        
        val fitnessLevels = listOf(llFitnessBeginner, llFitnessIntermediate, llFitnessAdvanced)
        
        fun selectFitnessLevel(index: Int) {
            val fitnessNames = listOf("Beginner", "Intermediate", "Advanced")
            currentFitnessLevel = fitnessNames[index]
            for (i in fitnessLevels.indices) {
                if (i == index) {
                    fitnessLevels[i].setBackgroundResource(R.drawable.bg_goal_card_selected)
                } else {
                    fitnessLevels[i].setBackgroundResource(R.drawable.bg_goal_card_unselected)
                }
            }
        }

        llFitnessBeginner.setOnClickListener { selectFitnessLevel(0) }
        llFitnessIntermediate.setOnClickListener { selectFitnessLevel(1) }
        llFitnessAdvanced.setOnClickListener { selectFitnessLevel(2) }
        
        // Initial defaults
        selectPrimaryGoal(1)
        selectFitnessLevel(1)
    }
}
