package com.simats.ikizen

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class DietActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_diet)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.rootLayout)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        
        findViewById<android.widget.ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }
        
        var currentDietPreference = "Non-Vegetarian"
        val currentAvoids = mutableSetOf<String>()
        
        // Diet Preference Cards (Single Select)
        val dietCards = listOf(
            findViewById<android.widget.LinearLayout>(R.id.llDietVeg),
            findViewById<android.widget.LinearLayout>(R.id.llDietVegan),
            findViewById<android.widget.LinearLayout>(R.id.llDietEggetarian),
            findViewById<android.widget.LinearLayout>(R.id.llDietNonVeg),
            findViewById<android.widget.LinearLayout>(R.id.llDietPesc),
            findViewById<android.widget.LinearLayout>(R.id.llDietCustom)
        )
        val dietIcons = listOf(
            findViewById<android.widget.ImageView>(R.id.ivDietVegIcon),
            findViewById<android.widget.ImageView>(R.id.ivDietVeganIcon),
            findViewById<android.widget.ImageView>(R.id.ivDietEggIcon),
            findViewById<android.widget.ImageView>(R.id.ivDietNonVegIcon),
            findViewById<android.widget.ImageView>(R.id.ivDietPescIcon),
            findViewById<android.widget.ImageView>(R.id.ivDietCustomIcon)
        )
        val dietChecks = listOf(
            findViewById<android.widget.ImageView>(R.id.ivDietVegCheck),
            findViewById<android.widget.ImageView>(R.id.ivDietVeganCheck),
            findViewById<android.widget.ImageView>(R.id.ivDietEggCheck),
            findViewById<android.widget.ImageView>(R.id.ivDietNonVegCheck),
            findViewById<android.widget.ImageView>(R.id.ivDietPescCheck),
            findViewById<android.widget.ImageView>(R.id.ivDietCustomCheck)
        )
        
        fun selectDietCard(selectedIndex: Int) {
            val dietNames = listOf("Vegetarian", "Vegan", "Eggetarian", "Non-Vegetarian", "Pescatarian", "Custom")
            currentDietPreference = dietNames[selectedIndex]
            for (i in dietCards.indices) {
                if (i == selectedIndex) {
                    dietCards[i].setBackgroundResource(R.drawable.bg_goal_card_selected)
                    dietIcons[i].setColorFilter(android.graphics.Color.parseColor("#1CA6A6"))
                    dietChecks[i].visibility = android.view.View.VISIBLE
                } else {
                    dietCards[i].setBackgroundResource(R.drawable.bg_goal_card_unselected)
                    dietIcons[i].clearColorFilter()
                    dietChecks[i].visibility = android.view.View.INVISIBLE
                }
            }
        }
        
        for (i in dietCards.indices) {
            dietCards[i].setOnClickListener { selectDietCard(i) }
        }

        // Generic Chip Toggler for all the multi-select chips
        // We will traverse the view hierarchy and find TextViews with chip backgrounds
        fun setupChips(viewGroup: android.view.ViewGroup) {
            for (i in 0 until viewGroup.childCount) {
                val child = viewGroup.getChildAt(i)
                if (child is android.view.ViewGroup) {
                    setupChips(child)
                } else if (child is android.widget.TextView) {
                    val text = child.text.toString()
                    val bg = child.background
                    if (bg != null && (text.contains("✓") || child.currentTextColor == android.graphics.Color.parseColor("#0B132B") || child.currentTextColor == android.graphics.Color.WHITE)) {
                        // It's a chip!
                        // Determine type based on initial background (heuristic based on layout)
                        val isRed = child.currentTextColor == android.graphics.Color.WHITE && child.backgroundTintList == null && text.contains("Fried") || text.contains("Sugary")
                        
                        child.setOnClickListener {
                            val currentText = child.text.toString()
                            val baseText = currentText.removeSuffix(" ✓")
                            if (currentText.endsWith(" ✓")) {
                                // Deselect
                                child.text = baseText
                                child.setBackgroundResource(R.drawable.bg_chip_unselected)
                                child.setTextColor(android.graphics.Color.parseColor("#0B132B"))
                                currentAvoids.remove(baseText)
                            } else {
                                // Select
                                child.text = "$baseText ✓"
                                if (baseText == "Fried food" || baseText == "Sugary drinks" || baseText == "Red meat" || baseText == "Mushrooms" || baseText == "Bitter gourd" || baseText == "Processed snacks") {
                                    child.setBackgroundResource(R.drawable.bg_chip_selected_red)
                                } else {
                                    child.setBackgroundResource(R.drawable.bg_chip_selected_teal)
                                }
                                child.setTextColor(android.graphics.Color.WHITE)
                                currentAvoids.add(baseText)
                            }
                        }
                    }
                }
            }
        }
        
        setupChips(findViewById(R.id.rootLayout))

        findViewById<androidx.appcompat.widget.AppCompatButton>(R.id.btnContinueDiet).setOnClickListener {
            OnboardingDataStore.userProfile = OnboardingDataStore.userProfile.copy(
                dietPreference = currentDietPreference
                // userProfile in DataModels has allergies: List<String>?, but the previous code didn't specify avoids in DietActivity explicitly in UserProfile.
                // It only has 'allergies', 'healthConditions'. We can ignore avoids or save them to something. 
                // We'll just save dietPreference as requested.
            )
            startActivity(android.content.Intent(this, HealthActivity::class.java))
        }
        
        // initial selection
        selectDietCard(3)
    }
}
