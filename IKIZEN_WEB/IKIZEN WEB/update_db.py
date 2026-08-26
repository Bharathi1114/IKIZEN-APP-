import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Add to foodDatabase
food_addition = '''{ id: 911, name: "Tofu", cals: 120, p: 14, c: 3, f: 7 },
            { id: 912, name: "Lentils", cals: 230, p: 18, c: 40, f: 1 },
            { id: 913, name: "Quinoa", cals: 222, p: 8, c: 39, f: 4 },
            { id: 914, name: "Avocado", cals: 240, p: 3, c: 12, f: 22 },
            { id: 915, name: "Salmon", cals: 206, p: 22, c: 0, f: 12 },
            { id: 916, name: "Almonds", cals: 164, p: 6, c: 6, f: 14 },
            '''
text = re.sub(r'database: \[', r'database: [\n            ' + food_addition, text, count=1)

# Add to workoutDatabase (Find the second 'database: [')
workout_addition = '''{ id: 911, name: "Running", sets: 1, reps: 30, kcalMin: 12 },
            { id: 912, name: "Jump Rope", sets: 3, reps: 10, kcalMin: 15 },
            { id: 913, name: "Bench Press", sets: 3, reps: 10, kcalMin: 7 },
            { id: 914, name: "Cycling", sets: 1, reps: 45, kcalMin: 10 },
            { id: 915, name: "Burpees", sets: 3, reps: 15, kcalMin: 12 },
            { id: 916, name: "Squats", sets: 3, reps: 15, kcalMin: 6 },
            { id: 917, name: "Pushups", sets: 3, reps: 20, kcalMin: 5 },
            '''
# Since the first replace above modifies the first occurrence, the second occurrence is now what we want
parts = text.split('database: [')
text = parts[0] + 'database: [' + parts[1] + 'database: [\n            ' + workout_addition + parts[2]

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Added missing items to DB')
