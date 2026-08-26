import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'const foodsLike =.*?(?=let bmr)', text, re.DOTALL)
if match:
    print('Found foodsLike')
    start = match.start()
    end = match.end()
    
    new_logic = '''const diet = meta.diet || 'Balanced';
            let dynamicFoods = [
                { name: 'Chicken Breast', cals: 200, p: 40 },
                { name: 'Brown Rice', cals: 215, p: 5 },
                { name: 'Broccoli', cals: 55, p: 4 }
            ];
            if (diet.includes('Vegan') || diet.includes('Vegetarian')) {
                dynamicFoods = [
                    { name: 'Tofu', cals: 120, p: 14 },
                    { name: 'Lentils', cals: 230, p: 18 },
                    { name: 'Quinoa', cals: 222, p: 8 }
                ];
            } else if (diet.includes('Keto') || diet.includes('Paleo')) {
                dynamicFoods = [
                    { name: 'Avocado', cals: 240, p: 3 },
                    { name: 'Salmon', cals: 206, p: 22 },
                    { name: 'Almonds', cals: 164, p: 6 }
                ];
            }

            let dynamicWorkouts = [
                { name: 'Squats', desc: '3 sets \u00d7 15 reps' },
                { name: 'Pushups', desc: '3 sets \u00d7 20 reps' }
            ];
            if (goal.includes('Lose Weight')) {
                dynamicWorkouts = [
                    { name: 'Running', desc: '1 set \u00d7 30 min' },
                    { name: 'Jump Rope', desc: '3 sets \u00d7 10 min' }
                ];
            } else if (goal.includes('Build Muscle')) {
                dynamicWorkouts = [
                    { name: 'Deadlift', desc: '3 sets \u00d7 10 reps' },
                    { name: 'Bench Press', desc: '3 sets \u00d7 10 reps' }
                ];
            } else if (goal.includes('Improve Stamina')) {
                dynamicWorkouts = [
                    { name: 'Cycling', desc: '1 set \u00d7 45 min' },
                    { name: 'Burpees', desc: '3 sets \u00d7 15 reps' }
                ];
            }

            '''
            
    text = text[:start] + new_logic + text[end:]

    foods_repl = '''${dynamicFoods.map((food, i) => `
                                        <div onclick="App.renderFoodLog()" class="cursor-pointer hover:bg-gray-50 transition bg-white border border-gray-100 shadow-sm rounded-xl p-3 min-w-[140px] snap-start shrink-0">
                                            <h4 class="font-semibold text-gray-900">${food.name}</h4>
                                            <p class="text-xs text-gray-500 mt-1">${food.cals} kcal &bull; ${food.p}g pro</p>
                                        </div>
                                    `).join('')}'''
    
    text = re.sub(r'\$\{foodsLike\.slice\(0, 3\).*?\` : \'\'\}', foods_repl, text, flags=re.DOTALL)
    
    workouts_repl = '''${dynamicWorkouts.map((workout, i) => `
                                    <div onclick="App.renderWorkoutLog()" class="cursor-pointer hover:bg-gray-50 transition bg-white border border-gray-100 shadow-sm rounded-xl p-3 min-w-[140px] snap-start shrink-0">
                                        <h4 class="font-semibold text-gray-900">${workout.name}</h4>
                                        <p class="text-xs text-gray-500 mt-1">${workout.desc}</p>
                                    </div>
                                `).join('')}'''
    
    text = re.sub(r'<div onclick="App\.renderWorkoutLog\(\)" class="cursor-pointer hover:bg-gray-50.*?<\/div>\s*<\/div>', workouts_repl + '\\n                                </div>', text, flags=re.DOTALL)
    
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Dashboard updated')
