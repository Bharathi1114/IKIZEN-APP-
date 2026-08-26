import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# ─────────────────────────────────────────────
# 1.  Find and replace the ENTIRE renderFoodLog function body
# ─────────────────────────────────────────────

old_food_fn_start = "async renderFoodLog(prefillQuery = '') {"
new_food_fn = """async renderFoodLog(prefillQuery = '') {
        if (prefillQuery) this.foodLogState.searchQuery = prefillQuery;
        const content = document.getElementById('app-content');

        // ── Fetch user profile from Supabase ──────────────────────────────────
        const { data: { user } } = await supabaseClient.auth.getUser();
        const meta = user?.user_metadata || {};
        const dietPref = (meta.diet || 'vegetarian').toLowerCase();
        const targetCalories = meta.target_calories || 2000;
        const targetProtein  = meta.target_protein  || 100;

        // ── Pick which table to query based on diet preference ───────────────
        let foodTable = 'veg_foods';
        if      (dietPref.includes('vegan'))       foodTable = 'vegan_foods';
        else if (dietPref.includes('keto'))        foodTable = 'keto_foods';
        else if (dietPref.includes('non-veg') || dietPref.includes('non_veg')) foodTable = 'non_veg_foods';

        // ── Fetch all foods from the correct Supabase table ──────────────────
        let allFoods = this.foodLogState.database; // fallback to local DB
        try {
            const { data, error } = await supabaseClient.from(foodTable).select('*');
            if (!error && data && data.length > 0) {
                allFoods = data.map(f => ({
                    id:   f.id,
                    name: f.name,
                    cals: f.calories,
                    p:    parseFloat(f.protein  || 0),
                    c:    parseFloat(f.carbs    || 0),
                    f:    parseFloat(f.fat      || 0),
                    category: foodTable.replace('_foods','')
                }));
            }
        } catch(e) { console.warn('Food DB fetch failed, using local DB:', e); }

        // ── AI Auto-fill if Today's Log is empty ─────────────────────────────
        if (this.foodLogState.log.length === 0 && allFoods.length > 0) {
            // Shuffle for variety on each load
            const shuffled = [...allFoods].sort(() => Math.random() - 0.5);
            const sorted   = shuffled.sort((a,b) => (b.p + Math.random()*15) - (a.p + Math.random()*15));

            let curCal = 0, curPro = 0;
            const picked = [];
            let iterations = 0;
            while (curCal < targetCalories - 100 && iterations < 3) {
                for (const food of sorted) {
                    if (curCal + food.cals <= targetCalories + 100 && picked.length < 8) {
                        picked.push(food);
                        curCal += food.cals;
                        curPro += food.p;
                    }
                }
                iterations++;
            }
            if (picked.length > 0) this.foodLogState.log = picked;
        }

        // ── Also update the local searchable database with fetched data ───────
        if (allFoods !== this.foodLogState.database && allFoods.length > 0) {
            this.foodLogState.database = allFoods;
        }

        const renderUI = () => {
            const state = this.foodLogState;
            const filteredDb = state.database.filter(food =>
                food.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            );

            content.innerHTML = `
                <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-24">
                    <div class="max-w-md mx-auto w-full p-4 pt-10 overflow-y-auto h-full pb-32">
                        
                        <!-- Header -->
                        <div class="flex justify-between items-center mb-1">
                            <h1 class="text-3xl font-bold text-[#0f172a]">Log Food</h1>
                            <div class="flex items-center gap-4">
                                <button onclick="App.refreshFoodLog()" class="text-[#3b82f6] font-semibold text-sm">REFRESH</button>
                                <button onclick="App.renderDashboard()" class="text-gray-500 hover:text-gray-700">
                                    <i data-lucide="undo-2" class="w-6 h-6"></i>
                                </button>
                            </div>
                        </div>
                        <p class="text-gray-500 text-sm mb-8">Suggested meals based on your targets</p>

                        <!-- Today's Log -->
                        <div class="mb-8">
                            <h2 class="text-lg font-semibold text-gray-900 mb-4">Today's Log</h2>
                            <div class="flex flex-col gap-3">
                                ${state.log.length === 0 ? `
                                    <div class="text-center py-6 text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-2xl">
                                        No food logged today.
                                    </div>
                                ` : ''}
                                ${state.log.map((food, index) => `
                                    <div class="bg-white rounded-2xl p-4 flex justify-between items-center shadow-sm">
                                        <div>
                                            <h3 class="font-medium text-gray-900 text-[16px]">${food.name}</h3>
                                            <p class="text-gray-400 text-xs mt-0.5">${food.cals} kcal | P: ${food.p}g C: ${food.c}g F: ${food.f}g</p>
                                        </div>
                                        <div class="flex gap-4">
                                            <button class="text-gray-300 hover:text-gray-500">
                                                <i data-lucide="pencil" class="w-4 h-4 fill-gray-300"></i>
                                            </button>
                                            <button onclick="App.deleteFoodLog(${index})" class="text-red-400 hover:text-red-600">
                                                <i data-lucide="trash-2" class="w-4 h-4 fill-red-400"></i>
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <hr class="border-gray-200/50 mb-6">

                        <!-- Food Database -->
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900 mb-4">Food Database</h2>
                            
                            <!-- Search Bar -->
                            <div class="relative mb-5">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i data-lucide="search" class="w-5 h-5 text-gray-400"></i>
                                </div>
                                <input id="food-search-input" type="text" placeholder="Search for foods..." 
                                    value="${state.searchQuery}"
                                    onkeyup="App.updateFoodSearch(this.value)"
                                    class="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder-gray-400 shadow-sm border-none focus:ring-2 focus:ring-[#14b8a6]">
                            </div>

                            <!-- Database List -->
                            <div class="flex flex-col gap-3">
                                ${filteredDb.map(food => `
                                    <div class="bg-white rounded-2xl p-4 flex justify-between items-center shadow-sm">
                                        <div>
                                            <h3 class="font-medium text-gray-900 text-[16px]">${food.name}</h3>
                                            <p class="text-gray-400 text-xs mt-0.5">${food.cals} kcal | P: ${food.p}g C: ${food.c}g F: ${food.f}g</p>
                                        </div>
                                        <button onclick='App.addFoodLog(${JSON.stringify(food)})' class="text-[#3b82f6] hover:bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center transition">
                                            <i data-lucide="plus" class="w-5 h-5"></i>
                                        </button>
                                    </div>
                                `).join('')}
                                ${filteredDb.length === 0 ? `
                                    <div class="text-center py-4 text-gray-500">No foods found.</div>
                                ` : ''}
                            </div>
                        </div>

                    </div>

                    <!-- Bottom Navigation Bar -->
                    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center z-30 pb-safe">
                        <button onclick="App.renderDashboard()" class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">
                            <i data-lucide="target" class="w-6 h-6 fill-gray-200"></i>
                            <span class="text-[10px] font-medium mt-0.5">Home</span>
                        </button>
                        <button onclick="App.renderWorkoutLog()" class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">
                            <i data-lucide="split" class="w-6 h-6 fill-gray-200 rotate-90"></i>
                            <span class="text-[10px] font-medium mt-0.5">Exercises</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-[#3b82f6]">
                            <div class="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center">
                                <i data-lucide="layout-list" class="w-6 h-6 fill-[#3b82f6]/20"></i>
                            </div>
                            <span class="text-[10px] font-medium">Food</span>
                        </button>
                        <button onclick="App.renderMood()" class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">
                            <i data-lucide="eye" class="w-6 h-6 fill-gray-200"></i>
                            <span class="text-[10px] font-medium mt-0.5">Mood</span>
                        </button>
                        <button onclick="App.renderSettings()" class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">
                            <i data-lucide="wrench" class="w-6 h-6 fill-gray-200"></i>
                            <span class="text-[10px] font-medium mt-0.5">Settings</span>
                        </button>
                    </div>
                </div>
            `;

            if (window.lucide) { lucide.createIcons(); }
        };

        this._reRenderFoodLog = renderUI;
        renderUI();
    },

    async refreshFoodLog() {
        this.foodLogState.log = [];
        this.foodLogState.searchQuery = '';
        await this.renderFoodLog();
    },"""

text = text.replace(old_food_fn_start, new_food_fn, 1)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Food log done!")
