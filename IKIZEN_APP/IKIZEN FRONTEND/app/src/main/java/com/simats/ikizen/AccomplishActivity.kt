package com.simats.ikizen

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class AccomplishActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_accomplish)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.rootLayout)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        
        findViewById<android.widget.ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }

        val accomplishSelections = mutableSetOf<String>()
        var productiveSelection: String? = null
        val hobbiesInterests = mutableSetOf<String>()
        
        fun setupGridCards(gridLayoutId: Int, isMultiSelect: Boolean) {
            val gridLayout = findViewById<android.widget.GridLayout>(gridLayoutId)
            for (i in 0 until gridLayout.childCount) {
                val child = gridLayout.getChildAt(i) as? android.widget.LinearLayout ?: continue
                child.setOnClickListener {
                    val cl = child.getChildAt(0) as? androidx.constraintlayout.widget.ConstraintLayout
                    val check = cl?.findViewById<android.widget.ImageView>(R.id.ivCheck)
                    val isCurrentlySelected = check?.visibility == android.view.View.VISIBLE

                    if (!isMultiSelect) {
                        // Deselect all others
                        for (j in 0 until gridLayout.childCount) {
                            val other = gridLayout.getChildAt(j) as? android.widget.LinearLayout ?: continue
                            if (other != child) {
                                other.setBackgroundResource(R.drawable.bg_goal_card_unselected)
                                val otherCl = other.getChildAt(0) as? androidx.constraintlayout.widget.ConstraintLayout
                                otherCl?.findViewById<android.widget.ImageView>(R.id.ivCheck)?.visibility = android.view.View.GONE
                            }
                        }
                    }
                    
                    val clChild = cl?.getChildAt(1) as? android.widget.TextView
                    val textVal = clChild?.text?.toString() ?: ""
                    
                    if (isCurrentlySelected && isMultiSelect) {
                        child.setBackgroundResource(R.drawable.bg_goal_card_unselected)
                        check?.visibility = android.view.View.GONE
                        if (textVal.isNotEmpty()) accomplishSelections.remove(textVal)
                    } else if (!isCurrentlySelected) {
                        child.setBackgroundResource(R.drawable.bg_goal_card_selected)
                        check?.visibility = android.view.View.VISIBLE
                        if (textVal.isNotEmpty()) {
                            if (isMultiSelect) accomplishSelections.add(textVal)
                            else productiveSelection = textVal
                        }
                    }
                }
            }
        }

        setupGridCards(R.id.glAccomplish, true)
        setupGridCards(R.id.glProductive, false)

        // Hobbies & Interests Chips
        fun setupChips(viewGroup: android.view.ViewGroup) {
            for (i in 0 until viewGroup.childCount) {
                val child = viewGroup.getChildAt(i)
                if (child is android.view.ViewGroup) {
                    setupChips(child)
                } else if (child is android.widget.TextView) {
                    val text = child.text.toString()
                    val bg = child.background
                    // Checking if it's a chip
                    if (bg != null && (text.contains("✓") || child.currentTextColor == android.graphics.Color.parseColor("#0B132B") || child.currentTextColor == android.graphics.Color.WHITE)) {
                        // Exclude static texts and grid items and goals
                        if (child.id == R.id.tvGoal1 || child.id == R.id.tvGoal2 || child.id == R.id.tvGoal3 || child.id == R.id.tvGoal4) continue
                        if (text == "Study" || text == "Career" || text == "Business" || text == "Personal Development" || text == "Hobbies" || text == "Fitness" || text == "Creative Work" || text == "Other") continue
                        if (text == "Morning" || text == "Afternoon" || text == "Evening" || text == "Night") continue
                        if (text.contains("What do you want") || text.contains("Your coach protects") || text.contains("Hobbies & interests") || text.contains("These become trackable")) continue
                        if (text.contains("When are you most") || text.contains("Your first personal") || text.contains("Small, specific")) continue
                        
                        child.setOnClickListener {
                            val currentText = child.text.toString()
                            if (currentText.endsWith(" ✓")) {
                                // Deselect
                                val baseText = currentText.removeSuffix(" ✓")
                                child.text = baseText
                                child.setBackgroundResource(R.drawable.bg_chip_unselected)
                                child.setTextColor(android.graphics.Color.parseColor("#0B132B"))
                                hobbiesInterests.remove(baseText)
                            } else {
                                // Select
                                val baseText = currentText
                                child.text = "$baseText ✓"
                                child.setBackgroundResource(R.drawable.bg_chip_selected)
                                child.setTextColor(android.graphics.Color.WHITE)
                                hobbiesInterests.add(baseText)
                            }
                        }
                    }
                }
            }
        }
        setupChips(findViewById(R.id.rootLayout))

        // Personal Goal Suggestions
        val etPersonalGoal = findViewById<android.widget.EditText>(R.id.etPersonalGoal)
        val goalSuggestions = listOf(
            findViewById<android.widget.TextView>(R.id.tvGoal1),
            findViewById<android.widget.TextView>(R.id.tvGoal2),
            findViewById<android.widget.TextView>(R.id.tvGoal3),
            findViewById<android.widget.TextView>(R.id.tvGoal4)
        )
        for (suggestion in goalSuggestions) {
            suggestion.setOnClickListener {
                etPersonalGoal.setText(suggestion.text.toString())
            }
        }

        findViewById<androidx.appcompat.widget.AppCompatButton>(R.id.btnContinueAccomplish).setOnClickListener {
            // Update user profile with what we have
            val customGoal = etPersonalGoal.text.toString().trim()
            val existingGoals = OnboardingDataStore.userProfile.secondaryGoals?.toMutableList() ?: mutableListOf()
            if (customGoal.isNotEmpty()) existingGoals.add(customGoal)
            existingGoals.addAll(accomplishSelections)
            if (productiveSelection != null) existingGoals.add(productiveSelection!!)
            existingGoals.addAll(hobbiesInterests)
            
            OnboardingDataStore.userProfile = OnboardingDataStore.userProfile.copy(
                secondaryGoals = existingGoals.distinct()
            )
            
            startActivity(android.content.Intent(this, RoutineActivity::class.java))
        }
    }
}
