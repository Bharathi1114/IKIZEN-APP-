package com.simats.ikizen

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class BasicsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_basics)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.rootLayout)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        
        findViewById<android.widget.ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }
        
        findViewById<androidx.appcompat.widget.AppCompatButton>(R.id.btnContinue).setOnClickListener {
            // Only update age (hardcoded 27 for now), do NOT overwrite height and weight which are handled by SeekBars
            OnboardingDataStore.userProfile = OnboardingDataStore.userProfile.copy(
                age = 27
            )
            startActivity(android.content.Intent(this, GoalsActivity::class.java))
        }

        val tvGenderMale = findViewById<android.widget.TextView>(R.id.tvGenderMale)
        val tvGenderFemale = findViewById<android.widget.TextView>(R.id.tvGenderFemale)
        val tvGenderOther = findViewById<android.widget.TextView>(R.id.tvGenderOther)
        
        fun updateGenderSelection(selected: android.widget.TextView, unselected1: android.widget.TextView, unselected2: android.widget.TextView, genderValue: String) {
            selected.setBackgroundResource(R.drawable.bg_toggle_selected)
            selected.setTextColor(android.graphics.Color.parseColor("#0B132B"))
            selected.setTypeface(null, android.graphics.Typeface.BOLD)
            
            unselected1.background = null
            unselected1.setTextColor(android.graphics.Color.parseColor("#758494"))
            unselected1.setTypeface(null, android.graphics.Typeface.NORMAL)
            
            unselected2.background = null
            unselected2.setTextColor(android.graphics.Color.parseColor("#758494"))
            unselected2.setTypeface(null, android.graphics.Typeface.NORMAL)
            
            OnboardingDataStore.userProfile = OnboardingDataStore.userProfile.copy(gender = genderValue)
        }
        
        tvGenderMale.setOnClickListener { updateGenderSelection(tvGenderMale, tvGenderFemale, tvGenderOther, "Male") }
        tvGenderFemale.setOnClickListener { updateGenderSelection(tvGenderFemale, tvGenderMale, tvGenderOther, "Female") }
        tvGenderOther.setOnClickListener { updateGenderSelection(tvGenderOther, tvGenderMale, tvGenderFemale, "Other") }

        val tvUnitsMetric = findViewById<android.widget.TextView>(R.id.tvUnitsMetric)
        val tvUnitsImperial = findViewById<android.widget.TextView>(R.id.tvUnitsImperial)

        val tvHeightValue = findViewById<android.widget.TextView>(R.id.tvHeightValue)
        val tvHeightMin = findViewById<android.widget.TextView>(R.id.tvHeightMin)
        val tvHeightMax = findViewById<android.widget.TextView>(R.id.tvHeightMax)
        val sbHeight = findViewById<android.widget.SeekBar>(R.id.sbHeight)

        val tvWeightValue = findViewById<android.widget.TextView>(R.id.tvWeightValue)
        val tvWeightMin = findViewById<android.widget.TextView>(R.id.tvWeightMin)
        val tvWeightMax = findViewById<android.widget.TextView>(R.id.tvWeightMax)
        val sbWeight = findViewById<android.widget.SeekBar>(R.id.sbWeight)
        
        var isMetric = false
        var heightProgress = 50
        var weightProgress = 40

        fun updateUI() {
            if (isMetric) {
                // Metric calculations
                val minHeightCm = 140
                val maxHeightCm = 210
                val heightCm = minHeightCm + (heightProgress * (maxHeightCm - minHeightCm) / 100)
                
                tvHeightMin.text = "${minHeightCm} cm"
                tvHeightMax.text = "${maxHeightCm} cm"
                tvHeightValue.text = "${heightCm} cm"
                
                val minWeightKg = 40
                val maxWeightKg = 140
                val weightKg = minWeightKg + (weightProgress * (maxWeightKg - minWeightKg) / 100)
                
                tvWeightMin.text = "${minWeightKg} kg"
                tvWeightMax.text = "${maxWeightKg} kg"
                tvWeightValue.text = "${weightKg} kg"
                
                OnboardingDataStore.userProfile = OnboardingDataStore.userProfile.copy(
                    heightCm = heightCm.toDouble(),
                    weightKg = weightKg.toDouble()
                )
            } else {
                // Imperial calculations
                val minHeightIn = 55 // 4'7"
                val maxHeightIn = 83 // 6'11"
                val heightIn = minHeightIn + (heightProgress * (maxHeightIn - minHeightIn) / 100)
                
                val feet = heightIn / 12
                val inches = heightIn % 12
                
                tvHeightMin.text = "4' 7\""
                tvHeightMax.text = "6' 11\""
                tvHeightValue.text = "${feet}' ${inches}\""
                
                val minWeightLbs = 88
                val maxWeightLbs = 309
                val weightLbs = minWeightLbs + (weightProgress * (maxWeightLbs - minWeightLbs) / 100)
                
                tvWeightMin.text = "${minWeightLbs} lbs"
                tvWeightMax.text = "${maxWeightLbs} lbs"
                tvWeightValue.text = "${weightLbs} lbs"
                
                // Convert back to metric for backend
                OnboardingDataStore.userProfile = OnboardingDataStore.userProfile.copy(
                    heightCm = heightIn * 2.54,
                    weightKg = weightLbs * 0.453592
                )
            }
        }

        fun updateUnitsSelection(selected: android.widget.TextView, unselected: android.widget.TextView, metric: Boolean) {
            selected.setBackgroundResource(R.drawable.bg_toggle_selected)
            selected.setTextColor(android.graphics.Color.parseColor("#0B132B"))
            selected.setTypeface(null, android.graphics.Typeface.BOLD)
            
            unselected.background = null
            unselected.setTextColor(android.graphics.Color.parseColor("#758494"))
            unselected.setTypeface(null, android.graphics.Typeface.NORMAL)
            
            isMetric = metric
            updateUI()
        }

        tvUnitsMetric.setOnClickListener { updateUnitsSelection(tvUnitsMetric, tvUnitsImperial, true) }
        tvUnitsImperial.setOnClickListener { updateUnitsSelection(tvUnitsImperial, tvUnitsMetric, false) }
        
        sbHeight.setOnSeekBarChangeListener(object : android.widget.SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: android.widget.SeekBar?, progress: Int, fromUser: Boolean) {
                heightProgress = progress
                updateUI()
            }
            override fun onStartTrackingTouch(seekBar: android.widget.SeekBar?) {}
            override fun onStopTrackingTouch(seekBar: android.widget.SeekBar?) {}
        })

        sbWeight.setOnSeekBarChangeListener(object : android.widget.SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: android.widget.SeekBar?, progress: Int, fromUser: Boolean) {
                weightProgress = progress
                updateUI()
            }
            override fun onStartTrackingTouch(seekBar: android.widget.SeekBar?) {}
            override fun onStopTrackingTouch(seekBar: android.widget.SeekBar?) {}
        })
        
        // Initial setup
        updateUI()
    }
}
