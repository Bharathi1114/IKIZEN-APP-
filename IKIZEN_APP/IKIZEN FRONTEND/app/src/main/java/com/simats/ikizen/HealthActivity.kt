package com.simats.ikizen

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class HealthActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_health)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.rootLayout)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        
        findViewById<android.widget.ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }
        
        fun dpToPx(dp: Int): Int {
            return (dp * resources.displayMetrics.density).toInt()
        }

        val tvActiveConstraints = findViewById<android.widget.TextView>(R.id.tvActiveConstraints)
        val selectedAllergies = mutableListOf<String>()
        val selectedHealthConditions = mutableListOf<String>()

        fun updateActiveConstraints() {
            if (selectedAllergies.isEmpty()) {
                tvActiveConstraints.text = "No active constraints."
            } else {
                val names = selectedAllergies.joinToString(", ")
                tvActiveConstraints.text = "$names — every meal card will carry a visible warning and these ingredients are excluded from AI meal plans."
            }
        }

        // Generic Chip Toggler for all the multi-select chips
        fun setupChips(viewGroup: android.view.ViewGroup) {
            for (i in 0 until viewGroup.childCount) {
                val child = viewGroup.getChildAt(i)
                if (child is android.view.ViewGroup) {
                    setupChips(child)
                } else if (child is android.widget.TextView) {
                    val text = child.text.toString()
                    val bg = child.background
                    if (bg != null && child.id != R.id.tvActiveConstraints && (text.contains("✓") || child.currentTextColor == android.graphics.Color.parseColor("#0B132B") || child.currentTextColor == android.graphics.Color.WHITE)) {
                        // Determine if it's an allergy (red) or condition (teal)
                        // In the XML, conditions come first (Diabetes, etc) and allergies second (Nuts, Peanuts, etc)
                        // We can just rely on the red highlight if it's an allergy. But let's just use teal for everything unless it's in the allergy section.
                        // Actually, looking at the design, ALL chips in Health screen use teal except Allergies which use red.
                        // Let's just make anything after "Food allergies" red, but it's easier to just assume it's red if it's an allergy.
                        val isAllergy = listOf("Nuts", "Peanuts", "Dairy", "Eggs", "Gluten", "Seafood", "Soy").any { text.contains(it) } || text.contains("Allergy")
                        
                        // Initial state check
                        if (text.contains("✓")) {
                            val baseName = text.removeSuffix(" ✓")
                            if (isAllergy) {
                                if (!selectedAllergies.contains(baseName)) selectedAllergies.add(baseName)
                            } else {
                                if (!selectedHealthConditions.contains(baseName) && baseName != "None") selectedHealthConditions.add(baseName)
                            }
                        }

                        child.setOnClickListener {
                            val currentText = child.text.toString()
                            val baseText = currentText.removeSuffix(" ✓")
                            
                            // Let's dynamically determine if it's in the allergy section by checking if its parent's parent's parent is somewhere below the food allergies title. 
                            // Simple heuristic: if we add a custom one, it's an allergy. If it's in the known list, it's an allergy.
                            // Let's just default to red if it's an allergy.
                            val isThisAllergy = isAllergy || selectedAllergies.contains(baseText) || findViewById<android.widget.LinearLayout>(R.id.llLastAllergyRow).indexOfChild(child) != -1

                            if (currentText.endsWith(" ✓")) {
                                // Deselect
                                child.text = baseText
                                child.setBackgroundResource(R.drawable.bg_chip_unselected)
                                child.setTextColor(android.graphics.Color.parseColor("#0B132B"))
                                if (isThisAllergy) {
                                    selectedAllergies.remove(baseText)
                                } else {
                                    selectedHealthConditions.remove(baseText)
                                }
                            } else {
                                // Select
                                child.text = "$currentText ✓"
                                if (isThisAllergy || baseText == "None") {
                                    if (baseText != "None") {
                                        child.setBackgroundResource(R.drawable.bg_chip_selected_red)
                                        selectedAllergies.add(baseText)
                                    } else {
                                        child.setBackgroundResource(R.drawable.bg_chip_selected) // Blue for 'None'
                                    }
                                } else {
                                    child.setBackgroundResource(R.drawable.bg_chip_selected)
                                    if (baseText != "None") selectedHealthConditions.add(baseText)
                                }
                                child.setTextColor(android.graphics.Color.WHITE)
                            }
                            updateActiveConstraints()
                        }
                    }
                }
            }
        }
        
        setupChips(findViewById(R.id.rootLayout))
        updateActiveConstraints() // init

        val etAddAllergy = findViewById<android.widget.EditText>(R.id.etAddAllergy)
        val btnAddAllergy = findViewById<android.widget.ImageView>(R.id.btnAddAllergy)
        val llLastAllergyRow = findViewById<android.widget.LinearLayout>(R.id.llLastAllergyRow)

        btnAddAllergy.setOnClickListener {
            val customAllergy = etAddAllergy.text.toString().trim()
            if (customAllergy.isNotEmpty()) {
                val newChip = android.widget.TextView(this).apply {
                    text = customAllergy
                    setBackgroundResource(R.drawable.bg_chip_unselected)
                    setTextColor(android.graphics.Color.parseColor("#0B132B"))
                    val p = dpToPx(12)
                    setPadding(p, p, p, p)
                    val params = android.widget.LinearLayout.LayoutParams(
                        android.widget.LinearLayout.LayoutParams.WRAP_CONTENT,
                        android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
                    )
                    params.marginEnd = dpToPx(8)
                    layoutParams = params
                }
                
                llLastAllergyRow.addView(newChip, 0) // add before 'None' if possible, or just add
                
                // Add click listener explicitly to this new chip
                newChip.setOnClickListener {
                    val currentText = newChip.text.toString()
                    val baseText = currentText.removeSuffix(" ✓")
                    if (currentText.endsWith(" ✓")) {
                        newChip.text = baseText
                        newChip.setBackgroundResource(R.drawable.bg_chip_unselected)
                        newChip.setTextColor(android.graphics.Color.parseColor("#0B132B"))
                        selectedAllergies.remove(baseText)
                    } else {
                        newChip.text = "$currentText ✓"
                        newChip.setBackgroundResource(R.drawable.bg_chip_selected_red)
                        newChip.setTextColor(android.graphics.Color.WHITE)
                        selectedAllergies.add(baseText)
                    }
                    updateActiveConstraints()
                }
                
                etAddAllergy.text.clear()
            }
        }

        findViewById<androidx.appcompat.widget.AppCompatButton>(R.id.btnContinueHealth).setOnClickListener {
            OnboardingDataStore.userProfile = OnboardingDataStore.userProfile.copy(
                allergies = selectedAllergies.toList(),
                healthConditions = selectedHealthConditions.toList()
            )
            startActivity(android.content.Intent(this, FeelingActivity::class.java))
        }
    }
}
