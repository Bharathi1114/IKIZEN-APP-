package com.simats.ikizen

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.postgrest.postgrest
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ProfileActivity : AppCompatActivity() {

    private lateinit var etName: EditText
    private lateinit var etAge: EditText
    private lateinit var etGender: EditText
    private lateinit var etDiet: EditText
    private lateinit var etActivity: EditText
    private lateinit var etGoal: EditText
    private var currentUserProfile: UserProfile? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        findViewById<ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }

        etName = findViewById(R.id.etName)
        etAge = findViewById(R.id.etAge)
        etGender = findViewById(R.id.etGender)
        etDiet = findViewById(R.id.etDiet)
        etActivity = findViewById(R.id.etActivity)
        etGoal = findViewById(R.id.etGoal)

        loadProfile()

        findViewById<Button>(R.id.btnSaveProfile).setOnClickListener {
            saveProfile()
        }
        
        findViewById<Button>(R.id.btnViewHistory).setOnClickListener {
            startActivity(android.content.Intent(this, HistoryActivity::class.java))
        }

        findViewById<Button>(R.id.btnResetDay).setOnClickListener {
            saveDayAndReset()
        }
    }

    private fun saveDayAndReset() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val currentUser = SupabaseManager.client.auth.currentSessionOrNull()?.user
                if (currentUser != null) {
                    val dateStr = java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault()).format(java.util.Date())
                    
                    val dailyLog = DailyLog(
                        userId = currentUser.id,
                        logDate = dateStr,
                        caloriesConsumed = OnboardingDataStore.consumedFoods.sumOf { it.calories ?: 0 },
                        proteinConsumed = OnboardingDataStore.consumedFoods.sumOf { (it.proteinG ?: 0.0).toInt() },
                        carbsConsumed = OnboardingDataStore.consumedFoods.sumOf { (it.carbsG ?: 0.0).toInt() },
                        fatConsumed = OnboardingDataStore.consumedFoods.sumOf { (it.fatG ?: 0.0).toInt() },
                        mood = OnboardingDataStore.loggedMood
                    )
                    
                    // Upsert today's log
                    SupabaseManager.client.postgrest["daily_logs"].upsert(dailyLog)
                    
                    withContext(Dispatchers.Main) {
                        // Reset everything for the new day
                        OnboardingDataStore.consumedFoods.clear()
                        OnboardingDataStore.completedExercises.clear()
                        OnboardingDataStore.loggedMood = null
                        
                        Toast.makeText(this@ProfileActivity, "Day saved! Started a fresh day.", Toast.LENGTH_LONG).show()
                        
                        // Go back to Dashboard
                        val intent = android.content.Intent(this@ProfileActivity, DashboardActivity::class.java)
                        intent.addFlags(android.content.Intent.FLAG_ACTIVITY_CLEAR_TOP or android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                        startActivity(intent)
                        finish()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@ProfileActivity, "Error saving day: ${e.message}", Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    private fun loadProfile() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val currentUser = SupabaseManager.client.auth.currentSessionOrNull()?.user
                if (currentUser != null) {
                    val profile = SupabaseManager.client.postgrest["profiles"]
                        .select { filter { eq("id", currentUser.id) } }
                        .decodeSingle<UserProfile>()
                    
                    currentUserProfile = profile

                    withContext(Dispatchers.Main) {
                        etName.setText(profile.name ?: "")
                        etAge.setText(profile.age?.toString() ?: "")
                        etGender.setText(profile.gender ?: "")
                        etDiet.setText(profile.dietPreference ?: "")
                        etActivity.setText(profile.activityLevel ?: "")
                        etGoal.setText(profile.primaryGoal ?: "")
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@ProfileActivity, "Error loading profile: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun saveProfile() {
        val name = etName.text.toString()
        val age = etAge.text.toString().toIntOrNull()
        val gender = etGender.text.toString()
        val diet = etDiet.text.toString()
        val activity = etActivity.text.toString()
        val goal = etGoal.text.toString()

        CoroutineScope(Dispatchers.IO).launch {
            try {
                val currentUser = SupabaseManager.client.auth.currentSessionOrNull()?.user
                if (currentUser != null) {
                    // Update our stored profile with new values from UI
                    val updatedProfile = (currentUserProfile ?: UserProfile()).copy(
                        id = currentUser.id,
                        name = name.takeIf { it.isNotBlank() },
                        age = age,
                        gender = gender.takeIf { it.isNotBlank() },
                        dietPreference = diet.takeIf { it.isNotBlank() },
                        activityLevel = activity.takeIf { it.isNotBlank() },
                        primaryGoal = goal.takeIf { it.isNotBlank() }
                    )

                    SupabaseManager.client.postgrest["profiles"].upsert(updatedProfile)
                    
                    // Also update in-memory datastore so Dashboard sees it instantly
                    OnboardingDataStore.userProfile = updatedProfile

                    withContext(Dispatchers.Main) {
                        Toast.makeText(this@ProfileActivity, "Profile updated successfully!", Toast.LENGTH_SHORT).show()
                        finish()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@ProfileActivity, "Error updating profile: ${e.message}", Toast.LENGTH_LONG).show()
                }
            }
        }
    }
}
