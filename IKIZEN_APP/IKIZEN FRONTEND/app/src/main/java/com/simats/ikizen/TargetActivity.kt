package com.simats.ikizen

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.postgrest.postgrest
import kotlinx.coroutines.launch

class TargetActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_target)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.rootLayout)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        
        findViewById<android.widget.TextView>(R.id.btnEditInfo).setOnClickListener {
            val intent = android.content.Intent(this, BasicsActivity::class.java)
            intent.addFlags(android.content.Intent.FLAG_ACTIVITY_CLEAR_TOP or android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
            startActivity(intent)
            finish()
        }
        
        // Background task to save profile and get AI Plan
        kotlinx.coroutines.CoroutineScope(kotlinx.coroutines.Dispatchers.Main).launch {
            // 1. Save to Supabase (catch errors gracefully so it doesn't block AI)
            try {
                val currentUser = SupabaseManager.client.auth.currentSessionOrNull()?.user
                if (currentUser != null) {
                    val profileToSave = OnboardingDataStore.userProfile.copy(id = currentUser.id)
                    SupabaseManager.client.postgrest["profiles"].upsert(profileToSave, onConflict = "id")
                }
            } catch (e: Exception) {
                android.util.Log.e("TargetActivity", "Supabase save error (ignored): ${e.message}")
            }

            // 2. Deterministic Calculation
            try {
                val profile = OnboardingDataStore.userProfile
                val weight = profile.weightKg ?: 70.0
                val height = profile.heightCm ?: 170.0
                val age = profile.age ?: 30
                val isMale = profile.gender?.lowercase() == "male"
                
                // Mifflin-St Jeor Equation
                var bmr = (10 * weight) + (6.25 * height) - (5 * age)
                bmr += if (isMale) 5 else -161
                
                // Activity multiplier
                val multiplier = when (profile.activityLevel?.lowercase()) {
                    "sedentary" -> 1.2
                    "lightly active" -> 1.375
                    "moderately active" -> 1.55
                    "very active" -> 1.725
                    "extra active" -> 1.9
                    else -> 1.375 // Default
                }
                
                var calories = (bmr * multiplier).toInt()
                
                // Goal adjustment
                when (profile.primaryGoal?.lowercase()) {
                    "lose weight" -> calories -= 500
                    "build muscle" -> calories += 300
                    "gain weight" -> calories += 500
                }
                
                // Macros (Protein: 1.8g/kg, Fat: 25%, Rest Carbs)
                val protein = (weight * 1.8).toInt()
                val fat = ((calories * 0.25) / 9.0).toInt()
                val carbs = ((calories - (protein * 4) - (fat * 9)) / 4).coerceAtLeast(0)
                
                // Secondary targets
                val waterLiters = (weight * 0.033) + if (multiplier >= 1.55) 0.5 else 0.0
                val fibre = (calories / 1000.0) * 14.0
                val meals = profile.mealFrequency?.firstOrNull { it.isDigit() }?.digitToInt() ?: 4
                
                // Update UI
                findViewById<android.widget.TextView>(R.id.tvCaloriesVal).text = java.text.NumberFormat.getNumberInstance(java.util.Locale.US).format(calories)
                findViewById<android.widget.TextView>(R.id.tvProteinVal).text = protein.toString()
                findViewById<android.widget.TextView>(R.id.tvCarbsVal).text = carbs.toString()
                findViewById<android.widget.TextView>(R.id.tvFatVal).text = fat.toString()
                findViewById<android.widget.TextView>(R.id.tvWaterVal).text = String.format(java.util.Locale.US, "%.1f L", waterLiters)
                findViewById<android.widget.TextView>(R.id.tvFibreVal).text = String.format(java.util.Locale.US, "%.0f g", fibre)
                findViewById<android.widget.TextView>(R.id.tvMealVal).text = "${meals}x"
                
                // Format Tag based on goals
                val goalStr = profile.primaryGoal?.split(" ")?.joinToString(" ") { it.replaceFirstChar { char -> char.uppercase() } } ?: "Maintain"
                val activityStr = profile.activityLevel?.split(" ")?.joinToString(" ") { it.replaceFirstChar { char -> char.uppercase() } } ?: "Active"
                findViewById<android.widget.TextView>(R.id.tvTag).text = "$goalStr · $activityStr"
                
                // Save targets to store
                OnboardingDataStore.userProfile.targetCalories = calories
                OnboardingDataStore.userProfile.targetProtein = protein
                OnboardingDataStore.userProfile.targetCarbs = carbs
                OnboardingDataStore.userProfile.targetFat = fat
                
                android.widget.Toast.makeText(this@TargetActivity, "Plan Calculated Successfully!", android.widget.Toast.LENGTH_SHORT).show()
                
            } catch (e: Exception) {
                android.util.Log.e("TargetActivity", "Calculation error: ${e.message}")
                e.printStackTrace()
            }
        }
        
        findViewById<androidx.appcompat.widget.AppCompatButton>(R.id.btnBuildPlan).setOnClickListener {
            findViewById<androidx.appcompat.widget.AppCompatButton>(R.id.btnBuildPlan).isEnabled = false
            
            kotlinx.coroutines.CoroutineScope(kotlinx.coroutines.Dispatchers.Main).launch {
                try {
                    val currentUser = SupabaseManager.client.auth.currentSessionOrNull()?.user
                    if (currentUser != null) {
                        val profileToSave = OnboardingDataStore.userProfile.copy(id = currentUser.id)
                        SupabaseManager.client.postgrest["profiles"].upsert(profileToSave, onConflict = "id")
                    }
                } catch (e: Exception) {
                    android.util.Log.e("TargetActivity", "Final profile save error: ${e.message}")
                }
                
                val intent = android.content.Intent(this@TargetActivity, LoginActivity::class.java)
                intent.flags = android.content.Intent.FLAG_ACTIVITY_NEW_TASK or android.content.Intent.FLAG_ACTIVITY_CLEAR_TASK
                startActivity(intent)
            }
        }
    }
}
