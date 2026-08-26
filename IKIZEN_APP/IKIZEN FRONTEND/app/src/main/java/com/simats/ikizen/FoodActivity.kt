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
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.postgrest.postgrest
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlin.math.roundToInt

import android.text.Editable
import android.text.TextWatcher
import android.widget.EditText
import kotlinx.coroutines.async

class FoodActivity : AppCompatActivity() {

    private lateinit var llLoggedFoods: LinearLayout
    private lateinit var llDatabaseFoods: LinearLayout
    private lateinit var etSearchFood: EditText
    
    private var allDatabaseFoods = listOf<Food>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_food)

        llLoggedFoods = findViewById(R.id.llLoggedFoods)
        llDatabaseFoods = findViewById(R.id.llDatabaseFoods)
        etSearchFood = findViewById(R.id.etSearchFood)

        findViewById<ImageView>(R.id.btnBack).setOnClickListener {
            finish()
        }

        findViewById<Button>(R.id.btnRefresh).setOnClickListener {
            etSearchFood.text.clear()
            OnboardingDataStore.consumedFoods.clear() // Clear existing plan
            if (allDatabaseFoods.isNotEmpty()) {
                autoFillGoals() // Generate new plan immediately
            } else {
                loadDatabaseFoods()
            }
        }
        
        etSearchFood.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                filterDatabaseFoods(s.toString())
            }
            override fun afterTextChanged(s: Editable?) {}
        })

        renderLoggedFoods()
        loadDatabaseFoods()
    }

    private fun renderLoggedFoods() {
        llLoggedFoods.removeAllViews()
        val logged = OnboardingDataStore.consumedFoods
        
        if (logged.isEmpty()) {
            val empty = TextView(this).apply {
                text = "You haven't logged any food today."
                setTextColor(Color.GRAY)
                setPadding(0, 8, 0, 8)
            }
            llLoggedFoods.addView(empty)
            return
        }

        logged.forEach { food ->
            llLoggedFoods.addView(createFoodCard(food, isLogged = true))
        }
    }

    private fun loadDatabaseFoods() {
        llDatabaseFoods.removeAllViews()
        val loading = TextView(this).apply {
            text = "Loading database..."
            setTextColor(Color.GRAY)
            setPadding(0, 8, 0, 8)
        }
        llDatabaseFoods.addView(loading)

        CoroutineScope(Dispatchers.Main).launch {
            try {
                // Fetch from all tables concurrently
                val client = SupabaseManager.client
                val vegDef = async { client.postgrest["veg_foods"].select().decodeList<Food>() }
                val nonVegDef = async { client.postgrest["non_veg_foods"].select().decodeList<Food>() }
                val veganDef = async { client.postgrest["vegan_foods"].select().decodeList<Food>() }
                val ketoDef = async { client.postgrest["keto_foods"].select().decodeList<Food>() }

                val allFetched = mutableListOf<Food>()
                try { allFetched.addAll(vegDef.await().map { it.copy(category = "vegetarian") }) } catch(e: Exception){}
                try { allFetched.addAll(nonVegDef.await().map { it.copy(category = "non-vegetarian") }) } catch(e: Exception){}
                try { allFetched.addAll(veganDef.await().map { it.copy(category = "vegan") }) } catch(e: Exception){}
                try { allFetched.addAll(ketoDef.await().map { it.copy(category = "keto") }) } catch(e: Exception){}

                // Make unique by ID or Name
                allDatabaseFoods = allFetched.distinctBy { it.name }.shuffled()
                
                // If log is empty, auto-fill using AI script logic
                if (OnboardingDataStore.consumedFoods.isEmpty() && allDatabaseFoods.isNotEmpty()) {
                    autoFillGoals()
                }

                filterDatabaseFoods("")

            } catch (e: Exception) {
                llDatabaseFoods.removeAllViews()
                val error = TextView(this@FoodActivity).apply {
                    text = "Error loading database: ${e.message}"
                    setTextColor(Color.RED)
                }
                llDatabaseFoods.addView(error)
            }
        }
    }
    
    private fun filterDatabaseFoods(query: String) {
        llDatabaseFoods.removeAllViews()
        
        val filtered = if (query.isBlank()) {
            allDatabaseFoods.take(15) // Just show top 15 random if no query
        } else {
            allDatabaseFoods.filter { it.name.contains(query, ignoreCase = true) }.take(30)
        }
        
        if (filtered.isEmpty()) {
            val empty = TextView(this).apply {
                text = "No foods found matching '$query'."
                setTextColor(Color.GRAY)
            }
            llDatabaseFoods.addView(empty)
            return
        }

        filtered.forEach { food ->
            llDatabaseFoods.addView(createFoodCard(food, isLogged = false))
        }
    }
    
    private fun autoFillGoals() {
        val targetCalories = OnboardingDataStore.userProfile.targetCalories ?: 2800
        val targetProtein = OnboardingDataStore.userProfile.targetProtein ?: 140
        
        var currentCalories = 0
        var currentProtein = 0
        
        val selectedFoods = mutableListOf<Food>()
        
        // STRICTLY filter foods that match the user's diet
        val pref = OnboardingDataStore.userProfile.dietPreference?.lowercase() ?: ""
        val allowedFoods = allDatabaseFoods.filter { food ->
            val cat = food.category?.lowercase() ?: ""
            if (pref.contains("vegan")) cat == "vegan"
            else if (pref.contains("keto")) cat == "keto"
            else if (pref.contains("non-veg")) cat == "non-vegetarian"
            else cat == "vegetarian"
        }
        
        // Sort by highest protein density, but inject some randomness so "Refresh" generates different plans!
        val sortedFoods = allowedFoods.shuffled().sortedByDescending { 
            (it.proteinG ?: 0.0) + (Math.random() * 15) // Add random weight to mix it up
        }
        
        // Loop multiple times to allow adding multiples of the same food if needed to reach targets
        var iterations = 0
        while (currentCalories < targetCalories - 100 && iterations < 3) {
            for (food in sortedFoods) {
                val foodCal = food.calories ?: continue
                val foodPro = (food.proteinG ?: 0.0).toInt()
                
                // Allow slightly overshooting by +100
                if (currentCalories + foodCal <= targetCalories + 100) {
                    selectedFoods.add(food)
                    currentCalories += foodCal
                    currentProtein += foodPro
                    
                    if (selectedFoods.size >= 8) break // Stop if we get too many items
                }
            }
            iterations++
        }
        
        if (selectedFoods.isNotEmpty()) {
            OnboardingDataStore.consumedFoods.addAll(selectedFoods)
            renderLoggedFoods()
            Toast.makeText(this, "AI Auto-filled your daily log based on your targets!", Toast.LENGTH_SHORT).show()
        }
    }

    private fun createFoodCard(food: Food, isLogged: Boolean): LinearLayout {
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
            text = food.name
            textSize = 16f
            setTextColor(Color.parseColor("#0B132B"))
            setTypeface(null, Typeface.BOLD) 
        }

        val details = TextView(this).apply { 
            val p = food.proteinG?.roundToInt() ?: 0
            val c = food.carbsG?.roundToInt() ?: 0
            val f = food.fatG?.roundToInt() ?: 0
            text = "${food.calories} kcal  |  P: ${p}g  C: ${c}g  F: ${f}g"
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
                // Use a default Android checkmark
                setImageResource(android.R.drawable.checkbox_on_background)
                if (food.isEaten) {
                    setColorFilter(Color.parseColor("#2ECC71")) // Green if eaten
                    name.setTextColor(Color.GRAY) // Gray out text
                    name.paintFlags = name.paintFlags or android.graphics.Paint.STRIKE_THRU_TEXT_FLAG
                } else {
                    setColorFilter(Color.parseColor("#BDC3C7")) // Gray if not eaten
                }
            }

            btnDone.setOnClickListener {
                food.isEaten = !food.isEaten
                renderLoggedFoods() // Refresh to show color/strikethrough and update data store
                if (food.isEaten) {
                    Toast.makeText(this, "Marked ${food.name} as Eaten!", Toast.LENGTH_SHORT).show()
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
                OnboardingDataStore.consumedFoods.remove(food)
                renderLoggedFoods()
                Toast.makeText(this, "Removed ${food.name}", Toast.LENGTH_SHORT).show()
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
                OnboardingDataStore.consumedFoods.add(food)
                renderLoggedFoods() // Instantly refresh the top list
                Toast.makeText(this, "Added ${food.name} to Today's Plan", Toast.LENGTH_SHORT).show()
            }
            card.addView(actionBtn)
        }

        return card
    }
}
