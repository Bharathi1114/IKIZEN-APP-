package com.simats.ikizen

object OnboardingDataStore {
    var userProfile = UserProfile()

    // Temporary session state for daily tracking
    val consumedFoods = mutableListOf<Food>()

    val consumedCalories: Int
        get() = consumedFoods.filter { it.isEaten }.sumOf { it.calories ?: 0 }

    val consumedProtein: Int
        get() = consumedFoods.filter { it.isEaten }.sumOf { (it.proteinG ?: 0.0).toInt() }

    val consumedCarbs: Int
        get() = consumedFoods.filter { it.isEaten }.sumOf { (it.carbsG ?: 0.0).toInt() }

    val consumedFat: Int
        get() = consumedFoods.filter { it.isEaten }.sumOf { (it.fatG ?: 0.0).toInt() }

    val completedExercises = mutableListOf<Exercise>()

    var loggedMood: String? = null

    fun reset() {
        userProfile = UserProfile()
        consumedFoods.clear()
        completedExercises.clear()
    }
}
