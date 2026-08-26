import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Add IDs to inputs
text = text.replace('<input type="text" placeholder="Search for foods..."', '<input id="food-search-input" type="text" placeholder="Search for foods..."')
text = text.replace('<input type="text" placeholder="Search for exercises..."', '<input id="workout-search-input" type="text" placeholder="Search for exercises..."')

# Update updateFoodSearch
new_food_search = '''updateFoodSearch(query) {
        this.foodLogState.searchQuery = query;
        if (this._reRenderFoodLog) this._reRenderFoodLog();
        const input = document.getElementById('food-search-input');
        if (input) {
            input.focus();
            const val = input.value;
            input.value = '';
            input.value = val;
        }
    },'''
text = re.sub(r'updateFoodSearch\(query\) \{.*?\},', new_food_search, text, flags=re.DOTALL)

# Update updateWorkoutSearch
new_workout_search = '''updateWorkoutSearch(query) {
        this.workoutLogState.searchQuery = query;
        if (this._reRenderWorkoutLog) this._reRenderWorkoutLog();
        const input = document.getElementById('workout-search-input');
        if (input) {
            input.focus();
            const val = input.value;
            input.value = '';
            input.value = val;
        }
    },'''
text = re.sub(r'updateWorkoutSearch\(query\) \{.*?\},', new_workout_search, text, flags=re.DOTALL)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed focus!")
