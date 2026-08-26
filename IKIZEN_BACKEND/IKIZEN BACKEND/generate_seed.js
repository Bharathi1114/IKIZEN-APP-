const fs = require('fs');
const crypto = require('crypto');

function uuidv4() {
  return crypto.randomUUID();
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

function generateFoodData(baseFoods, preparations, targetCount) {
  const foods = [];
  let count = 0;
  
  while (count < targetCount) {
    for (const prep of preparations) {
      for (const base of baseFoods) {
        if (count >= targetCount) break;
        
        const name = `${prep} ${base.name}`.trim();
        const cal = Math.round(base.cal * (1 + randomFloat(-0.1, 0.2)));
        const prot = parseFloat((base.prot * (1 + randomFloat(-0.1, 0.1))).toFixed(1));
        const carb = parseFloat((base.carb * (1 + randomFloat(-0.1, 0.1))).toFixed(1));
        const fat = parseFloat((base.fat * (1 + randomFloat(-0.1, 0.2))).toFixed(1));
        
        foods.push({
          id: uuidv4(),
          name: name.replace(/'/g, "''"),
          calories: cal,
          protein: prot,
          carbs: carb,
          fat: fat,
          serving_size: '100g'
        });
        count++;
      }
    }
  }
  return foods;
}

// Data definitions
const preparations = ["", "Boiled", "Grilled", "Roasted", "Fried", "Steamed", "Baked", "Spicy", "Crispy", "Pan-seared", "Smoked", "Slow-cooked"];

const vegBase = [
  { name: "Potato", cal: 86, prot: 1.7, carb: 20, fat: 0.1 },
  { name: "Carrot", cal: 41, prot: 0.9, carb: 10, fat: 0.2 },
  { name: "Spinach", cal: 23, prot: 2.9, carb: 3.6, fat: 0.4 },
  { name: "Broccoli", cal: 34, prot: 2.8, carb: 6.6, fat: 0.4 },
  { name: "Cottage Cheese (Paneer)", cal: 298, prot: 18, carb: 3.4, fat: 24 },
  { name: "Cauliflower", cal: 25, prot: 1.9, carb: 5, fat: 0.3 },
  { name: "Green Peas", cal: 81, prot: 5.4, carb: 14, fat: 0.4 },
  { name: "Mushroom", cal: 22, prot: 3.1, carb: 3.3, fat: 0.3 },
  { name: "Lentils", cal: 116, prot: 9, carb: 20, fat: 0.4 },
  { name: "Chickpeas", cal: 164, prot: 8.9, carb: 27, fat: 2.6 },
  { name: "Kidney Beans", cal: 127, prot: 8.7, carb: 22.8, fat: 0.5 },
  { name: "Tofu", cal: 144, prot: 15.8, carb: 2.8, fat: 8.7 },
  { name: "Sweet Potato", cal: 86, prot: 1.6, carb: 20, fat: 0.1 },
  { name: "Pumpkin", cal: 26, prot: 1, carb: 6.5, fat: 0.1 },
  { name: "Eggplant", cal: 25, prot: 1, carb: 6, fat: 0.2 },
  { name: "Okra", cal: 33, prot: 1.9, carb: 7.5, fat: 0.2 },
  { name: "Zucchini", cal: 17, prot: 1.2, carb: 3.1, fat: 0.3 },
  { name: "Cabbage", cal: 25, prot: 1.3, carb: 5.8, fat: 0.1 },
  { name: "Bell Pepper", cal: 20, prot: 0.9, carb: 4.6, fat: 0.2 },
  { name: "Corn", cal: 86, prot: 3.2, carb: 19, fat: 1.2 },
  { name: "Quinoa", cal: 120, prot: 4.4, carb: 21.3, fat: 1.9 },
  { name: "Brown Rice", cal: 111, prot: 2.6, carb: 23, fat: 0.9 },
  { name: "Oats", cal: 389, prot: 16.9, carb: 66, fat: 6.9 },
  { name: "Edamame", cal: 121, prot: 11.9, carb: 8.9, fat: 5.2 },
  { name: "Tempeh", cal: 192, prot: 20.3, carb: 7.6, fat: 10.8 },
  { name: "Black Beans", cal: 132, prot: 8.9, carb: 23.7, fat: 0.5 },
  { name: "Asparagus", cal: 20, prot: 2.2, carb: 3.9, fat: 0.1 },
  { name: "Brussel Sprouts", cal: 43, prot: 3.4, carb: 9, fat: 0.3 },
  { name: "Green Beans", cal: 31, prot: 1.8, carb: 7, fat: 0.2 },
  { name: "Tomato", cal: 18, prot: 0.9, carb: 3.9, fat: 0.2 }
];

const nonVegBase = [
  { name: "Chicken Breast", cal: 165, prot: 31, carb: 0, fat: 3.6 },
  { name: "Chicken Thigh", cal: 209, prot: 26, carb: 0, fat: 10.9 },
  { name: "Chicken Wing", cal: 203, prot: 30.5, carb: 0, fat: 8.1 },
  { name: "Beef Steak", cal: 271, prot: 25, carb: 0, fat: 19 },
  { name: "Ground Beef", cal: 332, prot: 14, carb: 0, fat: 30 },
  { name: "Pork Chop", cal: 231, prot: 24, carb: 0, fat: 14 },
  { name: "Bacon", cal: 541, prot: 37, carb: 1.4, fat: 42 },
  { name: "Lamb Chops", cal: 294, prot: 25, carb: 0, fat: 21 },
  { name: "Salmon", cal: 208, prot: 20, carb: 0, fat: 13 },
  { name: "Tuna", cal: 132, prot: 28, carb: 0, fat: 1.3 },
  { name: "Shrimp", cal: 99, prot: 24, carb: 0.2, fat: 0.3 },
  { name: "Crab", cal: 83, prot: 18, carb: 0, fat: 0.7 },
  { name: "Lobster", cal: 89, prot: 19, carb: 0, fat: 0.9 },
  { name: "Scallops", cal: 111, prot: 20, carb: 5, fat: 0.8 },
  { name: "Turkey Breast", cal: 135, prot: 30, carb: 0, fat: 1 },
  { name: "Duck", cal: 337, prot: 19, carb: 0, fat: 28 },
  { name: "Mutton", cal: 294, prot: 25, carb: 0, fat: 21 },
  { name: "Cod", cal: 82, prot: 18, carb: 0, fat: 0.7 },
  { name: "Halibut", cal: 111, prot: 23, carb: 0, fat: 1.5 },
  { name: "Sardines", cal: 208, prot: 25, carb: 0, fat: 11 },
  { name: "Mackerel", cal: 305, prot: 19, carb: 0, fat: 25 },
  { name: "Oysters", cal: 199, prot: 9, carb: 12, fat: 13 },
  { name: "Clams", cal: 148, prot: 26, carb: 5, fat: 2 },
  { name: "Squid", cal: 92, prot: 15, carb: 3, fat: 1.4 },
  { name: "Octopus", cal: 164, prot: 30, carb: 4.4, fat: 2.1 },
  { name: "Venison", cal: 158, prot: 30, carb: 0, fat: 3.2 },
  { name: "Quail", cal: 134, prot: 22, carb: 0, fat: 4.5 },
  { name: "Pork Sausage", cal: 346, prot: 14, carb: 2, fat: 31 },
  { name: "Beef Sausage", cal: 332, prot: 14, carb: 2, fat: 30 },
  { name: "Meatballs", cal: 247, prot: 16, carb: 11, fat: 15 }
];

const veganBase = [
  { name: "Tofu", cal: 144, prot: 15.8, carb: 2.8, fat: 8.7 },
  { name: "Tempeh", cal: 192, prot: 20.3, carb: 7.6, fat: 10.8 },
  { name: "Seitan", cal: 370, prot: 75, carb: 14, fat: 1.9 },
  { name: "Lentils", cal: 116, prot: 9, carb: 20, fat: 0.4 },
  { name: "Chickpeas", cal: 164, prot: 8.9, carb: 27, fat: 2.6 },
  { name: "Black Beans", cal: 132, prot: 8.9, carb: 23.7, fat: 0.5 },
  { name: "Edamame", cal: 121, prot: 11.9, carb: 8.9, fat: 5.2 },
  { name: "Quinoa", cal: 120, prot: 4.4, carb: 21.3, fat: 1.9 },
  { name: "Chia Seeds", cal: 486, prot: 16.5, carb: 42, fat: 30.7 },
  { name: "Hemp Seeds", cal: 553, prot: 31.6, carb: 8.7, fat: 48.8 },
  { name: "Almonds", cal: 579, prot: 21.2, carb: 21.6, fat: 49.9 },
  { name: "Walnuts", cal: 654, prot: 15.2, carb: 13.7, fat: 65.2 },
  { name: "Peanuts", cal: 567, prot: 25.8, carb: 16.1, fat: 49.2 },
  { name: "Oatmeal", cal: 389, prot: 16.9, carb: 66, fat: 6.9 },
  { name: "Soy Milk", cal: 54, prot: 3.3, carb: 6, fat: 1.8 },
  { name: "Almond Milk", cal: 15, prot: 0.6, carb: 0.3, fat: 1.2 },
  { name: "Oat Milk", cal: 47, prot: 1.4, carb: 6.8, fat: 1.5 },
  { name: "Broccoli", cal: 34, prot: 2.8, carb: 6.6, fat: 0.4 },
  { name: "Spinach", cal: 23, prot: 2.9, carb: 3.6, fat: 0.4 },
  { name: "Kale", cal: 49, prot: 4.3, carb: 8.8, fat: 0.9 },
  { name: "Avocado", cal: 160, prot: 2, carb: 8.5, fat: 14.7 },
  { name: "Flaxseeds", cal: 534, prot: 18.3, carb: 28.9, fat: 42.2 },
  { name: "Nutritional Yeast", cal: 394, prot: 47, carb: 38, fat: 5 },
  { name: "Spirulina", cal: 290, prot: 57, carb: 24, fat: 7.7 },
  { name: "Peas", cal: 81, prot: 5.4, carb: 14, fat: 0.4 },
  { name: "Cashews", cal: 553, prot: 18.2, carb: 30.2, fat: 43.8 },
  { name: "Macadamia Nuts", cal: 718, prot: 7.9, carb: 13.8, fat: 75.8 },
  { name: "Pistachios", cal: 562, prot: 20, carb: 27.2, fat: 45.3 },
  { name: "Brazil Nuts", cal: 656, prot: 14.3, carb: 12.3, fat: 66.4 },
  { name: "Sunflower Seeds", cal: 584, prot: 20.8, carb: 20, fat: 51.5 }
];

const ketoBase = [
  { name: "Avocado", cal: 160, prot: 2, carb: 8.5, fat: 14.7 }, // Net carb 1.5
  { name: "Bacon", cal: 541, prot: 37, carb: 1.4, fat: 42 },
  { name: "Eggs", cal: 143, prot: 12.6, carb: 0.7, fat: 9.5 },
  { name: "Butter", cal: 717, prot: 0.9, carb: 0.1, fat: 81 },
  { name: "Cheese (Cheddar)", cal: 402, prot: 25, carb: 1.3, fat: 33 },
  { name: "Heavy Cream", cal: 345, prot: 2.1, carb: 2.8, fat: 36.1 },
  { name: "Olive Oil", cal: 884, prot: 0, carb: 0, fat: 100 },
  { name: "Coconut Oil", cal: 862, prot: 0, carb: 0, fat: 100 },
  { name: "Salmon", cal: 208, prot: 20, carb: 0, fat: 13 },
  { name: "Chicken Thigh", cal: 209, prot: 26, carb: 0, fat: 10.9 },
  { name: "Beef Steak", cal: 271, prot: 25, carb: 0, fat: 19 },
  { name: "Pork Belly", cal: 518, prot: 9, carb: 0, fat: 53 },
  { name: "Almonds", cal: 579, prot: 21.2, carb: 21.6, fat: 49.9 },
  { name: "Macadamia Nuts", cal: 718, prot: 7.9, carb: 13.8, fat: 75.8 },
  { name: "Walnuts", cal: 654, prot: 15.2, carb: 13.7, fat: 65.2 },
  { name: "Pecans", cal: 691, prot: 9.2, carb: 13.9, fat: 72 },
  { name: "Chia Seeds", cal: 486, prot: 16.5, carb: 42, fat: 30.7 }, // High fiber
  { name: "Flaxseeds", cal: 534, prot: 18.3, carb: 28.9, fat: 42.2 },
  { name: "Spinach", cal: 23, prot: 2.9, carb: 3.6, fat: 0.4 },
  { name: "Cauliflower", cal: 25, prot: 1.9, carb: 5, fat: 0.3 },
  { name: "Broccoli", cal: 34, prot: 2.8, carb: 6.6, fat: 0.4 },
  { name: "Zucchini", cal: 17, prot: 1.2, carb: 3.1, fat: 0.3 },
  { name: "Asparagus", cal: 20, prot: 2.2, carb: 3.9, fat: 0.1 },
  { name: "Mushrooms", cal: 22, prot: 3.1, carb: 3.3, fat: 0.3 },
  { name: "Green Beans", cal: 31, prot: 1.8, carb: 7, fat: 0.2 },
  { name: "Brie Cheese", cal: 334, prot: 21, carb: 0.5, fat: 28 },
  { name: "Cream Cheese", cal: 342, prot: 6, carb: 4.1, fat: 34 },
  { name: "Salami", cal: 336, prot: 22, carb: 1.2, fat: 26 },
  { name: "Tuna", cal: 132, prot: 28, carb: 0, fat: 1.3 },
  { name: "Ghee", cal: 900, prot: 0, carb: 0, fat: 100 }
];

const exerciseBase = [
  { name: "Push-ups", category: "fitness", muscle: "Chest", diff: "Beginner" },
  { name: "Pull-ups", category: "bodybuilding", muscle: "Back", diff: "Intermediate" },
  { name: "Squats", category: "fitness", muscle: "Legs", diff: "Beginner" },
  { name: "Deadlift", category: "bodybuilding", muscle: "Back/Legs", diff: "Advanced" },
  { name: "Bench Press", category: "bodybuilding", muscle: "Chest", diff: "Intermediate" },
  { name: "Lunges", category: "fitness", muscle: "Legs", diff: "Beginner" },
  { name: "Plank", category: "health", muscle: "Core", diff: "Beginner" },
  { name: "Burpees", category: "fitness", muscle: "Full Body", diff: "Intermediate" },
  { name: "Mountain Climbers", category: "fitness", muscle: "Core", diff: "Intermediate" },
  { name: "Bicep Curls", category: "bodybuilding", muscle: "Arms", diff: "Beginner" },
  { name: "Tricep Dips", category: "bodybuilding", muscle: "Arms", diff: "Beginner" },
  { name: "Leg Press", category: "bodybuilding", muscle: "Legs", diff: "Intermediate" },
  { name: "Calf Raises", category: "fitness", muscle: "Calves", diff: "Beginner" },
  { name: "Lat Pulldown", category: "bodybuilding", muscle: "Back", diff: "Beginner" },
  { name: "Overhead Press", category: "bodybuilding", muscle: "Shoulders", diff: "Intermediate" },
  { name: "Lateral Raises", category: "bodybuilding", muscle: "Shoulders", diff: "Beginner" },
  { name: "Front Raises", category: "bodybuilding", muscle: "Shoulders", diff: "Beginner" },
  { name: "Russian Twists", category: "fitness", muscle: "Core", diff: "Intermediate" },
  { name: "Crunch", category: "fitness", muscle: "Core", diff: "Beginner" },
  { name: "Leg Raises", category: "fitness", muscle: "Core", diff: "Intermediate" },
  { name: "Yoga Sun Salutation", category: "health", muscle: "Full Body", diff: "Beginner" },
  { name: "Pilates Roll Up", category: "health", muscle: "Core", diff: "Intermediate" },
  { name: "Jumping Jacks", category: "health", muscle: "Full Body", diff: "Beginner" },
  { name: "High Knees", category: "fitness", muscle: "Legs/Cardio", diff: "Beginner" },
  { name: "Box Jumps", category: "fitness", muscle: "Legs", diff: "Advanced" },
  { name: "Kettlebell Swing", category: "fitness", muscle: "Full Body", diff: "Intermediate" },
  { name: "Battle Ropes", category: "fitness", muscle: "Arms/Cardio", diff: "Intermediate" },
  { name: "Rowing Machine", category: "health", muscle: "Full Body", diff: "Beginner" },
  { name: "Treadmill Sprint", category: "fitness", muscle: "Legs/Cardio", diff: "Intermediate" },
  { name: "Stair Climber", category: "health", muscle: "Legs", diff: "Beginner" }
];

const exerciseVariants = ["", "Incline", "Decline", "Weighted", "Banded", "Single-arm", "Single-leg", "Isometric", "Explosive", "Slow Negative", "Pause"];

function generateExercises(targetCount) {
  const exercises = [];
  let count = 0;
  
  while (count < targetCount) {
    for (const variant of exerciseVariants) {
      for (const base of exerciseBase) {
        if (count >= targetCount) break;
        
        const name = `${variant} ${base.name}`.trim();
        exercises.push({
          id: uuidv4(),
          name: name.replace(/'/g, "''"),
          category: base.category,
          muscle_group: base.muscle,
          description: `A ${base.diff.toLowerCase()} level ${base.category} exercise targeting the ${base.muscle.toLowerCase()}.`,
          difficulty: base.diff
        });
        count++;
      }
    }
  }
  return exercises;
}

const numRecords = 300;

console.log("Generating data...");
const vegFoods = generateFoodData(vegBase, preparations, numRecords);
const nonVegFoods = generateFoodData(nonVegBase, preparations, numRecords);
const veganFoods = generateFoodData(veganBase, preparations, numRecords);
const ketoFoods = generateFoodData(ketoBase, preparations, numRecords);
const exercisesData = generateExercises(numRecords);

let sql = `
-- INITIALIZE SCHEMA

CREATE TABLE IF NOT EXISTS veg_foods (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    calories INTEGER NOT NULL,
    protein DECIMAL(5,1) NOT NULL,
    carbs DECIMAL(5,1) NOT NULL,
    fat DECIMAL(5,1) NOT NULL,
    serving_size VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS non_veg_foods (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    calories INTEGER NOT NULL,
    protein DECIMAL(5,1) NOT NULL,
    carbs DECIMAL(5,1) NOT NULL,
    fat DECIMAL(5,1) NOT NULL,
    serving_size VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS vegan_foods (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    calories INTEGER NOT NULL,
    protein DECIMAL(5,1) NOT NULL,
    carbs DECIMAL(5,1) NOT NULL,
    fat DECIMAL(5,1) NOT NULL,
    serving_size VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS keto_foods (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    calories INTEGER NOT NULL,
    protein DECIMAL(5,1) NOT NULL,
    carbs DECIMAL(5,1) NOT NULL,
    fat DECIMAL(5,1) NOT NULL,
    serving_size VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS exercises (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    muscle_group VARCHAR(100) NOT NULL,
    description TEXT,
    difficulty VARCHAR(50)
);

-- INSERT DATA
`;

function generateInserts(table, data) {
  let inserts = '';
  data.forEach(item => {
    if (table === 'exercises') {
      inserts += `INSERT INTO ${table} (id, name, category, muscle_group, description, difficulty) VALUES ('${item.id}', '${item.name}', '${item.category}', '${item.muscle_group}', '${item.description}', '${item.difficulty}');\n`;
    } else {
      inserts += `INSERT INTO ${table} (id, name, calories, protein, carbs, fat, serving_size) VALUES ('${item.id}', '${item.name}', ${item.calories}, ${item.protein}, ${item.carbs}, ${item.fat}, '${item.serving_size}');\n`;
    }
  });
  return inserts;
}

sql += generateInserts('veg_foods', vegFoods);
sql += generateInserts('non_veg_foods', nonVegFoods);
sql += generateInserts('vegan_foods', veganFoods);
sql += generateInserts('keto_foods', ketoFoods);
sql += generateInserts('exercises', exercisesData);

fs.writeFileSync('seed.sql', sql);
console.log('Successfully created seed.sql with 1500+ records.');
