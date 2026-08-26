package com.simats.ikizen

import android.graphics.Color
import android.graphics.Typeface
import android.os.Bundle
import android.view.Gravity
import android.widget.Button
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import io.github.jan.supabase.postgrest.postgrest
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import android.text.Editable
import android.text.TextWatcher
import android.widget.EditText
import kotlinx.coroutines.async

class ExerciseActivity : AppCompatActivity() {

    private lateinit var llLoggedExercises: LinearLayout
    private lateinit var llDatabaseExercises: LinearLayout
    private lateinit var etSearchExercise: EditText
    
    private var allDatabaseExercises = listOf<Exercise>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_exercise)

        llLoggedExercises = findViewById(R.id.llLoggedExercises)
        llDatabaseExercises = findViewById(R.id.llDatabaseExercises)
        etSearchExercise = findViewById(R.id.etSearchExercise)

        findViewById<ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }

        findViewById<Button>(R.id.btnRefresh).setOnClickListener {
            etSearchExercise.text.clear()
            OnboardingDataStore.completedExercises.clear() // Clear existing plan
            if (allDatabaseExercises.isNotEmpty()) {
                autoFillGoals() // Generate new plan immediately
            } else {
                loadDatabaseExercises()
            }
        }
        
        etSearchExercise.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                filterDatabaseExercises(s.toString())
            }
            override fun afterTextChanged(s: Editable?) {}
        })

        renderLoggedExercises()
        loadDatabaseExercises()
    }

    private fun renderLoggedExercises() {
        llLoggedExercises.removeAllViews()
        val logged = OnboardingDataStore.completedExercises
        
        if (logged.isEmpty()) {
            val empty = TextView(this).apply {
                text = "You haven't logged any exercises today."
                setTextColor(Color.GRAY)
                setPadding(0, 8, 0, 8)
            }
            llLoggedExercises.addView(empty)
            return
        }

        logged.forEach { exercise ->
            llLoggedExercises.addView(createExerciseCard(exercise, isLogged = true))
        }
    }

    private fun loadDatabaseExercises() {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val client = SupabaseManager.client
                val fetched = client.postgrest["exercises"].select().decodeList<Exercise>()

                // Make unique by Name
                allDatabaseExercises = fetched.distinctBy { it.name }.shuffled()
                
                // If log is empty, auto-fill using AI script logic
                if (OnboardingDataStore.completedExercises.isEmpty() && allDatabaseExercises.isNotEmpty()) {
                    autoFillGoals()
                }

                filterDatabaseExercises("")

            } catch (e: Exception) {
                llDatabaseExercises.removeAllViews()
                val error = TextView(this@ExerciseActivity).apply {
                    text = "Error loading database: ${e.message}"
                    setTextColor(Color.RED)
                }
                llDatabaseExercises.addView(error)
            }
        }
    }
    
    private fun filterDatabaseExercises(query: String) {
        llDatabaseExercises.removeAllViews()
        
        val filtered = if (query.isBlank()) {
            allDatabaseExercises.take(15) // Just show top 15 random if no query
        } else {
            allDatabaseExercises.filter { it.name.contains(query, ignoreCase = true) }.take(30)
        }
        
        if (filtered.isEmpty()) {
            val empty = TextView(this).apply {
                text = "No exercises found matching '$query'."
                setTextColor(Color.GRAY)
            }
            llDatabaseExercises.addView(empty)
            return
        }

        filtered.forEach { ex ->
            llDatabaseExercises.addView(createExerciseCard(ex, isLogged = false))
        }
    }
    
    private fun getCalorieBurn(exercise: Exercise): Double {
        return exercise.caloriesBurnedPerMin ?: (5.0 + Math.abs(exercise.name.hashCode() % 12))
    }

    private fun autoFillGoals() {
        val selectedExercises = mutableListOf<Exercise>()
        
        // Match exercises based on the user's primary goal (e.g. Weight Loss -> High Calorie Burn)
        val goal = OnboardingDataStore.userProfile.primaryGoal?.lowercase() ?: ""
        
        val sortedExercises = allDatabaseExercises.shuffled().sortedByDescending { 
            val burnRate = getCalorieBurn(it)
            val modifier = if (goal.contains("weight loss")) burnRate * 2.0 else burnRate
            modifier + (Math.random() * 5.0) // Inject some randomness so "Refresh" generates different plans
        }
        
        // Pick 4-5 exercises
        selectedExercises.addAll(sortedExercises.take(5))
        
        if (selectedExercises.isNotEmpty()) {
            OnboardingDataStore.completedExercises.addAll(selectedExercises)
            renderLoggedExercises()
            Toast.makeText(this, "AI Auto-filled your daily routine!", Toast.LENGTH_SHORT).show()
        }
    }

    private fun createExerciseCard(exercise: Exercise, isLogged: Boolean): LinearLayout {
        val card = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            setPadding(48, 32, 48, 32)
            background = resources.getDrawable(if (isLogged) R.drawable.bg_input else R.drawable.bg_card, null)
            elevation = if (isLogged) 0f else 2f
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
            text = exercise.name
            textSize = 16f
            setTextColor(Color.parseColor("#0B132B"))
            setTypeface(null, Typeface.BOLD) 
        }

        val details = TextView(this).apply { 
            val sets = exercise.recommendedSets ?: 3
            val reps = exercise.recommendedReps ?: "10"
            val burn = getCalorieBurn(exercise)
            text = "$sets Sets x $reps Reps  |  ~${burn.toInt()} kcal/min"
            textSize = 12f
            setTextColor(Color.parseColor("#758494"))
            setPadding(0, 8, 0, 0) 
        }

        textContainer.addView(name)
        textContainer.addView(details)
        card.addView(textContainer)

        if (isLogged) {
            val actionsContainer = LinearLayout(this).apply {
                orientation = LinearLayout.HORIZONTAL
                gravity = Gravity.CENTER_VERTICAL
            }

            // Done Button
            val btnDone = ImageView(this).apply {
                layoutParams = LinearLayout.LayoutParams(80, 80).apply {
                    marginEnd = 16
                }
                setPadding(16, 16, 16, 16)
                setImageResource(android.R.drawable.checkbox_on_background)
                if (exercise.isCompleted) {
                    setColorFilter(Color.parseColor("#2ECC71")) // Green if completed
                    name.setTextColor(Color.GRAY) // Gray out text
                    name.paintFlags = name.paintFlags or android.graphics.Paint.STRIKE_THRU_TEXT_FLAG
                } else {
                    setColorFilter(Color.parseColor("#BDC3C7")) // Gray if not completed
                }
            }

            btnDone.setOnClickListener {
                exercise.isCompleted = !exercise.isCompleted
                renderLoggedExercises()
                if (exercise.isCompleted) {
                    Toast.makeText(this, "Completed ${exercise.name}!", Toast.LENGTH_SHORT).show()
                }
            }

            // Delete Button
            val btnDelete = ImageView(this).apply {
                layoutParams = LinearLayout.LayoutParams(80, 80)
                setPadding(16, 16, 16, 16)
                setImageResource(android.R.drawable.ic_menu_delete)
                setColorFilter(Color.parseColor("#E74C3C"))
            }

            btnDelete.setOnClickListener {
                OnboardingDataStore.completedExercises.remove(exercise)
                renderLoggedExercises()
                Toast.makeText(this, "Removed ${exercise.name}", Toast.LENGTH_SHORT).show()
            }

            actionsContainer.addView(btnDone)
            actionsContainer.addView(btnDelete)
            card.addView(actionsContainer)

        } else {
            val actionBtn = ImageView(this).apply {
                layoutParams = LinearLayout.LayoutParams(80, 80)
                setPadding(16, 16, 16, 16)
                setImageResource(android.R.drawable.ic_input_add)
                setColorFilter(Color.parseColor("#1877F2")) // Blue plus sign
            }
            actionBtn.setOnClickListener {
                OnboardingDataStore.completedExercises.add(exercise)
                renderLoggedExercises() // Instantly refresh the top list
                Toast.makeText(this, "Added ${exercise.name} to Today's Routine", Toast.LENGTH_SHORT).show()
            }
            card.addView(actionBtn)
        }

        return card
    }
}
