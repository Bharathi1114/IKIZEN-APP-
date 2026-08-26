import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

old_workout_fn_start = "async renderWorkoutLog(prefillQuery = '') {"
new_workout_fn = """async renderWorkoutLog(prefillQuery = '') {
        if (prefillQuery) this.workoutLogState.searchQuery = prefillQuery;
        const content = document.getElementById('app-content');

        // ── Fetch user profile from Supabase ──────────────────────────────────
        const { data: { user } } = await supabaseClient.auth.getUser();
        const meta = user?.user_metadata || {};
        const primaryGoal = (meta.primary_goal || 'lose weight').toLowerCase();

        // ── Fetch all exercises from the Supabase exercises table ────────────
        let allExercises = this.workoutLogState.database; // fallback
        try {
            const { data, error } = await supabaseClient.from('exercises').select('*');
            if (!error && data && data.length > 0) {
                allExercises = data.map(ex => ({
                    id:      ex.id,
                    name:    ex.name,
                    sets:    ex.recommended_sets || 3,
                    reps:    ex.recommended_reps || '10',
                    kcalMin: ex.calories_burned_per_min || Math.abs((ex.name.charCodeAt(0) % 12) + 5),
                    category: ex.category || 'fitness',
                    muscle:  ex.muscle_group || ''
                }));
            }
        } catch(e) { console.warn('Exercise DB fetch failed, using local DB:', e); }

        // ── AI Auto-fill Today's Routine if empty ────────────────────────────
        if (this.workoutLogState.log.length === 0 && allExercises.length > 0) {
            const shuffled = [...allExercises].sort(() => Math.random() - 0.5);
            const sorted = shuffled.sort((a,b) => {
                const burnA = a.kcalMin * (primaryGoal.includes('weight') || primaryGoal.includes('loss') ? 2.0 : 1.0) + Math.random()*5;
                const burnB = b.kcalMin * (primaryGoal.includes('weight') || primaryGoal.includes('loss') ? 2.0 : 1.0) + Math.random()*5;
                return burnB - burnA;
            });
            this.workoutLogState.log = sorted.slice(0, 5);
        }

        // ── Also update the local searchable database with fetched data ───────
        if (allExercises !== this.workoutLogState.database && allExercises.length > 0) {
            this.workoutLogState.database = allExercises;
        }

        const renderUI = () => {
            const state = this.workoutLogState;
            const filteredDb = state.database.filter(workout =>
                workout.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            );

            content.innerHTML = `
                <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-24">
                    <div class="max-w-md mx-auto w-full p-4 pt-10 overflow-y-auto h-full pb-32">
                        
                        <!-- Header -->
                        <div class="flex justify-between items-center mb-1">
                            <h1 class="text-3xl font-bold text-[#0f172a]">Log Workout</h1>
                            <div class="flex items-center gap-4">
                                <button onclick="App.refreshWorkoutLog()" class="text-[#3b82f6] font-semibold text-sm">REFRESH</button>
                                <button onclick="App.renderDashboard()" class="text-gray-500 hover:text-gray-700">
                                    <i data-lucide="undo-2" class="w-6 h-6"></i>
                                </button>
                            </div>
                        </div>
                        <p class="text-gray-500 text-sm mb-8">Suggested exercises based on your profile</p>

                        <!-- Today's Routine -->
                        <div class="mb-8">
                            <h2 class="text-lg font-semibold text-gray-900 mb-4">Today's Routine</h2>
                            <div class="flex flex-col gap-3">
                                ${state.log.length === 0 ? `
                                    <div class="text-center py-6 text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-2xl">
                                        No workouts logged today.
                                    </div>
                                ` : ''}
                                ${state.log.map((workout, index) => `
                                    <div class="bg-white rounded-2xl p-4 flex justify-between items-center shadow-sm">
                                        <div>
                                            <h3 class="font-medium text-gray-900 text-[16px]">${workout.name}</h3>
                                            <p class="text-gray-400 text-xs mt-0.5">${workout.sets} Sets x ${workout.reps} Reps | ~${workout.kcalMin} kcal/min</p>
                                        </div>
                                        <div class="flex gap-4">
                                            <button class="text-gray-300 hover:text-gray-500">
                                                <i data-lucide="pencil" class="w-4 h-4 fill-gray-300"></i>
                                            </button>
                                            <button onclick="App.deleteWorkoutLog(${index})" class="text-red-400 hover:text-red-600">
                                                <i data-lucide="trash-2" class="w-4 h-4 fill-red-400"></i>
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <hr class="border-gray-200/50 mb-6">

                        <!-- Exercise Database -->
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900 mb-4">Exercise Database</h2>
                            
                            <!-- Search Bar -->
                            <div class="relative mb-5">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i data-lucide="search" class="w-5 h-5 text-gray-400"></i>
                                </div>
                                <input id="workout-search-input" type="text" placeholder="Search for exercises..." 
                                    value="${state.searchQuery}"
                                    onkeyup="App.updateWorkoutSearch(this.value)"
                                    class="w-full bg-white rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder-gray-400 shadow-sm border-none focus:ring-2 focus:ring-[#14b8a6]">
                            </div>

                            <!-- Database List -->
                            <div class="flex flex-col gap-3">
                                ${filteredDb.map(workout => `
                                    <div class="bg-white rounded-2xl p-4 flex justify-between items-center shadow-sm">
                                        <div>
                                            <h3 class="font-medium text-gray-900 text-[16px]">${workout.name}</h3>
                                            <p class="text-gray-400 text-xs mt-0.5">${workout.sets} Sets x ${workout.reps} Reps | ~${workout.kcalMin} kcal/min</p>
                                        </div>
                                        <button onclick='App.addWorkoutLog(${JSON.stringify(workout)})' class="text-[#3b82f6] hover:bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center transition">
                                            <i data-lucide="plus" class="w-5 h-5"></i>
                                        </button>
                                    </div>
                                `).join('')}
                                ${filteredDb.length === 0 ? `
                                    <div class="text-center py-4 text-gray-500">No exercises found.</div>
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
                        <button class="flex flex-col items-center gap-1 text-[#3b82f6]">
                            <div class="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center">
                                <i data-lucide="split" class="w-6 h-6 fill-[#3b82f6]/20 rotate-90"></i>
                            </div>
                            <span class="text-[10px] font-medium">Exercises</span>
                        </button>
                        <button onclick="App.renderFoodLog()" class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">
                            <i data-lucide="layout-list" class="w-6 h-6 fill-gray-200"></i>
                            <span class="text-[10px] font-medium mt-0.5">Food</span>
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

        this._reRenderWorkoutLog = renderUI;
        renderUI();
    },

    async refreshWorkoutLog() {
        this.workoutLogState.log = [];
        this.workoutLogState.searchQuery = '';
        await this.renderWorkoutLog();
    },"""

text = text.replace(old_workout_fn_start, new_workout_fn, 1)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Workout log done!")
