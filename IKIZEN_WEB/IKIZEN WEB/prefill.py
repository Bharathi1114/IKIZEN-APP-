import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('async renderFoodLog() {', "async renderFoodLog(prefillQuery = '') {\n        if (prefillQuery) this.foodLogState.searchQuery = prefillQuery;")
text = text.replace('async renderWorkoutLog() {', "async renderWorkoutLog(prefillQuery = '') {\n        if (prefillQuery) this.workoutLogState.searchQuery = prefillQuery;")

text = text.replace('onclick="App.renderFoodLog()"', "onclick=\"App.renderFoodLog('${food.name}')\"")
text = text.replace('onclick="App.renderWorkoutLog()"', "onclick=\"App.renderWorkoutLog('${workout.name}')\"")

# Fix nav bar ones
text = text.replace("onclick=\"App.renderFoodLog('${food.name}')\" class=\"flex flex-col", 'onclick="App.renderFoodLog()" class="flex flex-col')
text = text.replace("onclick=\"App.renderWorkoutLog('${workout.name}')\" class=\"flex flex-col", 'onclick="App.renderWorkoutLog()" class="flex flex-col')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Prefill logic injected!")
