package com.simats.ikizen

import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

@Serializable
data class UserProfile(
    val id: String? = null,
    val name: String? = null,
    val age: Int? = null,
    val gender: String? = null,
    val units: String? = null,
    @SerialName("height_cm") val heightCm: Double? = null,
    @SerialName("weight_kg") val weightKg: Double? = null,
    @SerialName("primary_goal") val primaryGoal: String? = null,
    @SerialName("secondary_goals") val secondaryGoals: List<String>? = null,
    @SerialName("fitness_level") val fitnessLevel: String? = null,
    @SerialName("daily_steps") val dailySteps: Int? = null,
    @SerialName("sitting_hours") val sittingHours: Double? = null,
    @SerialName("sleep_duration") val sleepDuration: Double? = null,
    @SerialName("job_type") val jobType: String? = null,
    @SerialName("activity_level") val activityLevel: String? = null,
    @SerialName("diet_preference") val dietPreference: String? = null,
    val allergies: List<String>? = null,
    @SerialName("meal_frequency") val mealFrequency: String? = null,
    @SerialName("health_conditions") val healthConditions: List<String>? = null,
    val feelings: List<String>? = null,
    @SerialName("focus_areas") val focusAreas: List<String>? = null,
    @SerialName("target_calories") var targetCalories: Int? = null,
    @SerialName("target_protein") var targetProtein: Int? = null,
    @SerialName("target_carbs") var targetCarbs: Int? = null,
    @SerialName("target_fat") var targetFat: Int? = null
)

@Serializable
data class Exercise(
    val id: String = "",
    val name: String = "",
    val category: String? = null,
    @SerialName("recommended_sets") val recommendedSets: Int? = null,
    @SerialName("recommended_reps") val recommendedReps: String? = null,
    @SerialName("calories_burned_per_min") val caloriesBurnedPerMin: Double? = null
) {
    @kotlinx.serialization.Transient
    var isCompleted: Boolean = false
}

@Serializable
data class Food(
    val id: String = "",
    val name: String = "",
    val category: String? = null,
    @SerialName("protein") val proteinG: Double? = null,
    @SerialName("carbs") val carbsG: Double? = null,
    @SerialName("fat") val fatG: Double? = null,
    val calories: Int? = null,
    @SerialName("iron_mg") val ironMg: Double? = null
) {
    @kotlinx.serialization.Transient
    var isEaten: Boolean = false
}

@Serializable
data class DailyLog(
    val id: String = java.util.UUID.randomUUID().toString(),
    @SerialName("user_id") val userId: String = "",
    @SerialName("log_date") val logDate: String = "",
    @SerialName("calories_consumed") val caloriesConsumed: Int = 0,
    @SerialName("protein_consumed") val proteinConsumed: Int = 0,
    @SerialName("carbs_consumed") val carbsConsumed: Int = 0,
    @SerialName("fat_consumed") val fatConsumed: Int = 0,
    val foods: kotlinx.serialization.json.JsonArray? = null,
    val exercises: kotlinx.serialization.json.JsonArray? = null,
    val mood: String? = null
)

@Serializable
data class Quest(
    val id: String = "",
    val title: String = "",
    val description: String? = null,
    @SerialName("mood_improvement_focus") val moodImprovementFocus: String? = null
)
