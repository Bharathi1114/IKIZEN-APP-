// Simple router for plain HTML/JS approach
const App = {
    async init() {
        console.log("App initialized");
        this.renderWelcome();
    },

    renderWelcome() {
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="flex flex-col h-full bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative p-6">
                <div class="flex-1 flex flex-col justify-between max-w-sm mx-auto w-full">
                    
                    <header class="pt-4">
                        <h1 class="text-2xl font-normal text-white drop-shadow-md">iKizen</h1>
                    </header>

                    <div class="mt-6 flex justify-center relative px-2">
                        <img src="images/hero_illustration.png" alt="Hero" class="w-full h-auto rounded-[1.5rem] shadow-sm">
                    </div>

                    <div class="grid grid-cols-4 gap-2 mt-8">
                        <div class="bg-[#2a4365] text-white text-xs py-4 px-2 rounded-2xl flex items-center justify-center text-center shadow-md">Fitness</div>
                        <div class="bg-[#2a4365] text-white text-xs py-4 px-2 rounded-2xl flex items-center justify-center text-center shadow-md">Nutrition</div>
                        <div class="bg-[#2a4365] text-white text-xs py-4 px-2 rounded-2xl flex items-center justify-center text-center shadow-md">Mind</div>
                        <div class="bg-[#2a4365] text-white text-xs py-4 px-2 rounded-2xl flex items-center justify-center text-center shadow-md">Focus</div>
                    </div>

                    <div class="mt-10 mb-8">
                        <h2 class="text-4xl font-bold text-white drop-shadow-sm leading-tight">
                            Your personal<br>coach.<br>
                            <span class="text-[#0d9488]">Every day.</span>
                        </h2>
                        <p class="text-gray-400 mt-4 text-sm leading-relaxed max-w-[280px]">
                            Build a stronger body, healthier mind, better habits, and a more productive life.
                        </p>
                    </div>

                    <div class="flex flex-col gap-4 mt-auto pb-4">
                        <button onclick="App.renderSignUp()" class="bg-[#2dd4bf] hover:bg-[#14b8a6] text-white font-medium py-4 px-4 rounded-full w-full transition duration-200 shadow-md">
                            Get Started
                        </button>
                        <button onclick="App.renderLogin()" class="bg-transparent border border-[#0d9488] text-gray-500 hover:text-[#0d9488] font-medium py-4 px-4 rounded-full w-full transition duration-200">
                            I Already Have an Account
                        </button>
                    </div>
                </div>
            </div>
        `;
        // Remove padding from app-content for full bleed background
        content.classList.remove('p-4');
        content.classList.add('p-0');
    },

    renderSignUp() {
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="flex flex-col h-full bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative p-6 overflow-y-auto">
                <div class="max-w-sm mx-auto w-full pb-8">
                    
                    <header class="pt-8 mb-6">
                        <h1 class="text-3xl font-bold text-[#111827] drop-shadow-sm leading-tight">Create your account</h1>
                        <p class="text-gray-500 mt-2 text-sm leading-relaxed">
                            Eight quick steps and your coach knows exactly how to help.
                        </p>
                    </header>

                    <form id="signup-form" onsubmit="App.handleSignUp(event)" class="flex flex-col gap-4">
                        
                        <!-- Full Name -->
                        <div>
                            <label class="block text-gray-800 text-sm font-semibold mb-2 ml-1" for="signup-name">Full Name</label>
                            <div class="relative flex items-center">
                                <i data-lucide="user" class="absolute left-4 text-gray-400 w-5 h-5"></i>
                                <input class="w-full pl-12 pr-4 py-4 rounded-full border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] text-gray-700 bg-white" 
                                    id="signup-name" type="text" placeholder="Enter your full name" required>
                            </div>
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-gray-800 text-sm font-semibold mb-2 ml-1" for="signup-email">Email</label>
                            <div class="relative flex items-center">
                                <i data-lucide="mail" class="absolute left-4 text-gray-400 w-5 h-5"></i>
                                <input class="w-full pl-12 pr-4 py-4 rounded-full border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] text-gray-700 bg-white" 
                                    id="signup-email" type="email" placeholder="Enter your email" required autocomplete="off">
                            </div>
                        </div>

                        <!-- Password -->
                        <div>
                            <label class="block text-gray-800 text-sm font-semibold mb-2 ml-1" for="signup-password">Password</label>
                            <div class="relative flex items-center">
                                <i data-lucide="lock" class="absolute left-4 text-gray-400 w-5 h-5"></i>
                                <input class="w-full pl-12 pr-12 py-4 rounded-full border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] text-gray-700 bg-white" 
                                    id="signup-password" type="password" placeholder="At least 6 characters" minlength="6" required autocomplete="new-password">
                                <i data-lucide="eye" class="absolute right-4 text-gray-400 w-5 h-5 cursor-pointer"></i>
                            </div>
                            <p class="text-xs text-gray-500 mt-2 ml-2">Mix letters and numbers for a stronger password</p>
                        </div>

                        <!-- Confirm Password -->
                        <div>
                            <label class="block text-gray-800 text-sm font-semibold mb-2 ml-1" for="signup-confirm">Confirm Password</label>
                            <div class="relative flex items-center">
                                <i data-lucide="lock" class="absolute left-4 text-gray-400 w-5 h-5"></i>
                                <input class="w-full pl-12 pr-12 py-4 rounded-full border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] text-gray-700 bg-white" 
                                    id="signup-confirm" type="password" placeholder="Re-enter your password" minlength="6" required autocomplete="new-password">
                                <i data-lucide="eye" class="absolute right-4 text-gray-400 w-5 h-5 cursor-pointer"></i>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="mt-4">
                            <button type="submit" class="bg-[#2dd4bf] hover:bg-[#14b8a6] text-white font-medium py-4 px-4 rounded-full w-full transition duration-200 shadow-md">
                                Create Account
                            </button>
                        </div>
                    </form>

                    <!-- Terms Box -->
                    <div class="bg-white/80 rounded-2xl p-4 mt-6 flex items-start gap-3 shadow-sm border border-white">
                        <i data-lucide="info" class="text-[#0d9488] w-5 h-5 shrink-0 mt-0.5"></i>
                        <p class="text-xs text-gray-500 leading-relaxed">
                            By continuing you agree to our Terms and Privacy Policy. Health details stay private and are used only to personalise your coaching.
                        </p>
                    </div>

                    <!-- Login Link -->
                    <div class="mt-8 text-center">
                        <a href="#" class="text-sm font-medium text-gray-500 hover:text-gray-700" onclick="App.renderLogin(); return false;">
                            Already have an account? Log In
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize lucide icons
        if (window.lucide) {
            lucide.createIcons();
        }
    },

    async handleSignUp(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        
        if (password !== confirm) {
            alert("Passwords do not match!");
            return;
        }

        console.log("Signing up...", email);
        
        // Connect to Supabase Backend
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name
                }
            }
        });

        if (error) {
            alert("Sign up failed: " + error.message);
            console.error("Sign up error:", error);
        } else {
            console.log("Sign up successful!", data);
            
            // Store the full name globally or in sessionStorage for the next screen
            window.tempUserName = name;
            
            App.renderOnboardingBasics();
        }
    },

    // --- ONBOARDING LOGIC ---

    onboardingState: {
        name: '',
        age: 27,
        gender: 'Male',
        units: 'cm/kg',
        heightCm: 175,
        weightKg: 80
    },

    renderOnboardingBasics() {
        const content = document.getElementById('app-content');
        content.classList.remove('p-4');
        content.classList.add('p-0');
        
        // Initialize state from previous screen if available
        if (window.tempUserName) {
            this.onboardingState.name = window.tempUserName;
        }

        const renderUI = () => {
            const { name, age, gender, units, heightCm, weightKg } = this.onboardingState;
            
            // Calculate display values
            const isMetric = units === 'cm/kg';
            
            // Height formatting
            let displayHeight = '';
            let heightMin = '';
            let heightMax = '';
            let heightVal = heightCm;
            
            if (isMetric) {
                displayHeight = `${heightCm} cm`;
                heightMin = '140 cm';
                heightMax = '210 cm';
            } else {
                // Convert cm to ft/inches
                const totalInches = Math.round(heightCm / 2.54);
                const feet = Math.floor(totalInches / 12);
                const inches = totalInches % 12;
                displayHeight = `${feet}' ${inches}"`;
                heightMin = `4' 7"`;
                heightMax = `6' 11"`;
            }

            // Weight formatting
            let displayWeight = '';
            let weightMin = '';
            let weightMax = '';
            let weightVal = isMetric ? weightKg : Math.round(weightKg * 2.20462);
            
            if (isMetric) {
                displayWeight = `${weightKg} kg`;
                weightMin = '40 kg';
                weightMax = '140 kg';
            } else {
                displayWeight = `${weightVal} lbs`;
                weightMin = '88 lbs';
                weightMax = '309 lbs';
            }

            // BMI Calculation (BMI = kg / (m * m))
            const heightM = heightCm / 100;
            const bmi = (weightKg / (heightM * heightM)).toFixed(1);

            content.innerHTML = `
                <div class="flex flex-col h-full bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-32">
                    <div class="max-w-sm mx-auto w-full p-6 pb-24 overflow-y-auto h-full">
                        
                        <!-- Header -->
                        <div class="flex items-center gap-4 pt-4 mb-8">
                            <button onclick="App.renderSignUp()" class="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm text-black">
                                <i data-lucide="chevron-left" class="w-6 h-6"></i>
                            </button>
                            <div class="flex-1">
                                <div class="flex justify-between items-end mb-2 text-sm">
                                    <span class="text-[#2563eb] font-semibold text-xs tracking-wider">STEP 1 OF 8</span>
                                    <span class="text-gray-500 text-xs">13%</span>
                                </div>
                                <div class="w-full bg-black/10 rounded-full h-1">
                                    <div class="bg-[#3b82f6] h-1 rounded-full" style="width: 13%"></div>
                                </div>
                            </div>
                        </div>

                        <h1 class="text-[2rem] leading-tight font-bold text-[#0f172a] drop-shadow-sm mb-4">
                            Let's start with the<br>basics
                        </h1>
                        <p class="text-gray-500 text-[15px] leading-relaxed mb-8">
                            These numbers set your calorie, protein and activity baselines.
                        </p>

                        <div class="flex flex-col gap-6">
                            <!-- Name -->
                            <div>
                                <label class="block text-gray-800 text-sm font-semibold mb-2 ml-1">Name</label>
                                <div class="relative flex items-center">
                                    <i data-lucide="user" class="absolute left-4 text-gray-400 w-5 h-5"></i>
                                    <input type="text" id="ob-name" value="${name}" 
                                        onchange="App.updateOnboardingState('name', this.value)"
                                        class="w-full pl-12 pr-4 py-4 rounded-[1.5rem] border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] text-gray-700 bg-white/90 text-lg">
                                </div>
                            </div>

                            <!-- Age -->
                            <div>
                                <label class="block text-gray-800 text-sm font-semibold mb-2 ml-1">Age</label>
                                <div class="relative flex items-center">
                                    <i data-lucide="calendar" class="absolute left-4 text-gray-400 w-5 h-5"></i>
                                    <input type="number" id="ob-age" value="${age}" 
                                        onchange="App.updateOnboardingState('age', this.value)"
                                        class="w-full pl-12 pr-16 py-4 rounded-[1.5rem] border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] text-gray-700 bg-white/90 text-lg">
                                    <span class="absolute right-6 text-gray-400">years</span>
                                </div>
                            </div>

                            <!-- Gender & Units Header -->
                            <div class="flex justify-between items-end mt-2">
                                <label class="block text-gray-800 text-sm font-semibold ml-1 mb-2">Gender</label>
                            </div>
                            
                            <!-- Gender Toggle -->
                            <div class="bg-white/50 rounded-full p-1 flex shadow-sm w-full">
                                <button onclick="App.updateOnboardingState('gender', 'Male')" class="flex-1 py-3 text-sm font-medium rounded-full transition ${gender === 'Male' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}">Male</button>
                                <button onclick="App.updateOnboardingState('gender', 'Female')" class="flex-1 py-3 text-sm font-medium rounded-full transition ${gender === 'Female' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}">Female</button>
                                <button onclick="App.updateOnboardingState('gender', 'Other')" class="flex-1 py-3 text-sm font-medium rounded-full transition ${gender === 'Other' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}">Other</button>
                            </div>

                            <!-- Units Header -->
                            <div class="flex justify-between items-center mt-2">
                                <label class="block text-gray-800 text-sm font-semibold ml-1">Units</label>
                                <!-- Units Toggle -->
                                <div class="bg-white/50 rounded-full p-1 flex shadow-sm w-[160px]">
                                    <button onclick="App.updateOnboardingState('units', 'cm/kg')" class="flex-1 py-2 text-xs font-medium rounded-full transition ${isMetric ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}">cm / kg</button>
                                    <button onclick="App.updateOnboardingState('units', 'ft/lbs')" class="flex-1 py-2 text-xs font-medium rounded-full transition ${!isMetric ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}">ft / lbs</button>
                                </div>
                            </div>

                            <!-- Height -->
                            <div class="bg-white/90 rounded-[2rem] p-6 shadow-sm mt-2">
                                <div class="flex justify-between items-center mb-4">
                                    <span class="font-semibold text-gray-800">Height</span>
                                    <span class="font-bold text-gray-900 text-lg">${displayHeight}</span>
                                </div>
                                <input type="range" min="140" max="210" value="${heightCm}" 
                                    oninput="App.updateOnboardingState('heightCm', parseInt(this.value))"
                                    class="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#2563eb]">
                                <div class="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                                    <span>${heightMin}</span>
                                    <span>${heightMax}</span>
                                </div>
                            </div>

                            <!-- Weight -->
                            <div class="bg-white/90 rounded-[2rem] p-6 shadow-sm">
                                <div class="flex justify-between items-center mb-4">
                                    <span class="font-semibold text-gray-800">Weight</span>
                                    <span class="font-bold text-gray-900 text-lg">${displayWeight}</span>
                                </div>
                                <input type="range" min="40" max="140" value="${weightKg}" 
                                    oninput="App.updateOnboardingState('weightKg', parseInt(this.value))"
                                    class="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#2563eb]">
                                <div class="flex justify-between text-xs text-gray-400 mt-3 font-medium mb-4">
                                    <span>${weightMin}</span>
                                    <span>${weightMax}</span>
                                </div>
                                
                                <!-- BMI Estimate -->
                                <div class="bg-[#d1fae5]/60 rounded-xl p-4 text-sm text-[#059669] leading-relaxed">
                                    BMI estimate ${bmi} — used only as a rough wellness reference, never as a diagnosis.
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Fixed Bottom Bar -->
                    <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 z-10">
                        <p class="text-center text-sm text-gray-500 mb-4">You can change any of this later in Settings.</p>
                        <button onclick="App.submitOnboardingBasics()" class="bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold text-lg py-4 px-4 rounded-full w-full transition duration-200">
                            Continue >
                        </button>
                    </div>
                </div>
            `;
            
            if (window.lucide) {
                lucide.createIcons();
            }
        };

        // Attach a render method to App for this specific view so state changes can trigger re-renders
        this._reRenderOnboardingBasics = renderUI;
        renderUI();
    },

    updateOnboardingState(key, value) {
        this.onboardingState[key] = value;
        if (this._reRenderOnboardingBasics) {
            this._reRenderOnboardingBasics();
        }
    },

    async submitOnboardingBasics() {
        console.log("Submitting basics:", this.onboardingState);
        
        // Update user metadata in Supabase
        const { data, error } = await supabaseClient.auth.updateUser({
            data: {
                full_name: this.onboardingState.name,
                age: this.onboardingState.age,
                gender: this.onboardingState.gender,
                units: this.onboardingState.units,
                height_cm: this.onboardingState.heightCm,
                weight_kg: this.onboardingState.weightKg
            }
        });

        if (error) {
            console.error("Error updating profile:", error);
            alert("Failed to save data: " + error.message);
        } else {
            console.log("Basics updated successfully!");
            App.renderOnboardingGoals();
        }
    },

    // --- ONBOARDING STEP 2: GOALS ---

    onboardingGoalsState: {
        primaryGoal: 'Build Muscle',
        secondaryGoals: ['Improve Fitness'],
        fitnessLevel: 'Intermediate'
    },

    renderOnboardingGoals() {
        const content = document.getElementById('app-content');
        
        const renderUI = () => {
            const { primaryGoal, secondaryGoals, fitnessLevel } = this.onboardingGoalsState;
            
            // Helper function to check if a secondary goal is selected
            const hasSecGoal = (goal) => secondaryGoals.includes(goal);

            content.innerHTML = `
                <div class="flex flex-col h-full bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-32">
                    <div class="max-w-sm mx-auto w-full p-6 pb-24 overflow-y-auto h-full">
                        
                        <!-- Header -->
                        <div class="flex items-center gap-4 pt-4 mb-8">
                            <button onclick="App.renderOnboardingBasics()" class="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm text-black">
                                <i data-lucide="chevron-left" class="w-6 h-6"></i>
                            </button>
                            <div class="flex-1">
                                <div class="flex justify-between items-end mb-2 text-sm">
                                    <span class="text-[#2563eb] font-semibold text-xs tracking-wider">STEP 2 OF 8</span>
                                    <span class="text-gray-500 text-xs">25%</span>
                                </div>
                                <div class="w-full bg-black/10 rounded-full h-1">
                                    <div class="bg-[#3b82f6] h-1 rounded-full" style="width: 25%"></div>
                                </div>
                            </div>
                        </div>

                        <h1 class="text-[2rem] leading-tight font-bold text-[#0f172a] drop-shadow-sm mb-4">
                            What is your primary goal?
                        </h1>
                        <p class="text-gray-500 text-[15px] leading-relaxed mb-8">
                            Pick one main goal — you can add secondary goals underneath.
                        </p>

                        <!-- Primary Goals Grid -->
                        <div class="grid grid-cols-2 gap-4 mb-10">
                            <!-- Lose Weight -->
                            <div onclick="App.updateGoalsState('primaryGoal', 'Lose Weight')" 
                                class="cursor-pointer bg-white rounded-[1.5rem] p-5 shadow-sm border-2 transition ${primaryGoal === 'Lose Weight' ? 'border-[#3b82f6] bg-[#eff6ff]/30' : 'border-transparent'}">
                                <i data-lucide="scale" class="w-8 h-8 mb-4 ${primaryGoal === 'Lose Weight' ? 'text-[#14b8a6]' : 'text-gray-400'}"></i>
                                <h3 class="font-bold text-gray-900 text-sm mb-1">Lose Weight</h3>
                                <p class="text-xs text-gray-500 leading-snug">Sustainable fat loss</p>
                            </div>

                            <!-- Build Muscle -->
                            <div onclick="App.updateGoalsState('primaryGoal', 'Build Muscle')" 
                                class="cursor-pointer bg-white rounded-[1.5rem] p-5 shadow-sm border-2 transition ${primaryGoal === 'Build Muscle' ? 'border-[#3b82f6] bg-[#eff6ff]/30' : 'border-transparent'}">
                                <i data-lucide="star" class="w-8 h-8 mb-4 ${primaryGoal === 'Build Muscle' ? 'text-[#14b8a6] fill-[#14b8a6]' : 'text-gray-400'}"></i>
                                <h3 class="font-bold text-gray-900 text-sm mb-1">Build Muscle</h3>
                                <p class="text-xs text-gray-500 leading-snug">Strength + lean mass</p>
                            </div>

                            <!-- Gain Weight -->
                            <div onclick="App.updateGoalsState('primaryGoal', 'Gain Weight')" 
                                class="cursor-pointer bg-white rounded-[1.5rem] p-5 shadow-sm border-2 transition ${primaryGoal === 'Gain Weight' ? 'border-[#3b82f6] bg-[#eff6ff]/30' : 'border-transparent'}">
                                <i data-lucide="trending-up" class="w-8 h-8 mb-4 ${primaryGoal === 'Gain Weight' ? 'text-[#14b8a6]' : 'text-gray-400'}"></i>
                                <h3 class="font-bold text-gray-900 text-sm mb-1">Gain Weight</h3>
                                <p class="text-xs text-gray-500 leading-snug">Healthy surplus</p>
                            </div>

                            <!-- Improve Fitness -->
                            <div onclick="App.updateGoalsState('primaryGoal', 'Improve Fitness')" 
                                class="cursor-pointer bg-white rounded-[1.5rem] p-5 shadow-sm border-2 transition ${primaryGoal === 'Improve Fitness' ? 'border-[#3b82f6] bg-[#eff6ff]/30' : 'border-transparent'}">
                                <i data-lucide="activity" class="w-8 h-8 mb-4 ${primaryGoal === 'Improve Fitness' ? 'text-[#14b8a6]' : 'text-gray-400'}"></i>
                                <h3 class="font-bold text-gray-900 text-sm mb-1">Improve Fitness</h3>
                                <p class="text-xs text-gray-500 leading-snug">Move better daily</p>
                            </div>
                        </div>

                        <!-- Secondary Goals -->
                        <div class="mb-10">
                            <h2 class="font-semibold text-gray-900 text-lg">Secondary goals</h2>
                            <p class="text-sm text-gray-500 mb-4">Optional — up to three</p>
                            
                            <div class="flex flex-wrap gap-2">
                                ${['Lose Weight', 'Gain Weight', 'Improve Fitness', 'Increase Strength'].map(goal => `
                                    <button onclick="App.toggleSecondaryGoal('${goal}')" 
                                        class="px-4 py-2.5 rounded-full text-sm font-medium transition ${hasSecGoal(goal) ? 'bg-[#3b82f6] text-white shadow-sm' : 'bg-white text-gray-700 shadow-sm'}">
                                        ${goal} ${hasSecGoal(goal) ? '✓' : ''}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Fitness Level -->
                        <div class="mb-4">
                            <h2 class="font-semibold text-gray-900 text-lg mb-4">Current fitness level</h2>
                            
                            <div class="flex flex-col gap-3">
                                <!-- Beginner -->
                                <div onclick="App.updateGoalsState('fitnessLevel', 'Beginner')" 
                                    class="cursor-pointer bg-white rounded-2xl p-4 shadow-sm border-2 transition ${fitnessLevel === 'Beginner' ? 'border-[#3b82f6] bg-[#eff6ff]/50' : 'border-transparent'}">
                                    <h3 class="font-semibold text-gray-900 text-[15px]">Beginner</h3>
                                    <p class="text-sm text-gray-500">New or returning to training</p>
                                </div>
                                
                                <!-- Intermediate -->
                                <div onclick="App.updateGoalsState('fitnessLevel', 'Intermediate')" 
                                    class="cursor-pointer bg-white rounded-2xl p-4 shadow-sm border-2 transition ${fitnessLevel === 'Intermediate' ? 'border-[#3b82f6] bg-[#eff6ff]/50' : 'border-transparent'}">
                                    <h3 class="font-semibold text-gray-900 text-[15px]">Intermediate</h3>
                                    <p class="text-sm text-gray-500">6+ months of consistency</p>
                                </div>
                                
                                <!-- Advanced -->
                                <div onclick="App.updateGoalsState('fitnessLevel', 'Advanced')" 
                                    class="cursor-pointer bg-white rounded-2xl p-4 shadow-sm border-2 transition ${fitnessLevel === 'Advanced' ? 'border-[#3b82f6] bg-[#eff6ff]/50' : 'border-transparent'}">
                                    <h3 class="font-semibold text-gray-900 text-[15px]">Advanced</h3>
                                    <p class="text-sm text-gray-500">2+ years, structured training</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Fixed Bottom Bar -->
                    <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 z-10">
                        <button onclick="App.submitOnboardingGoals()" class="bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold text-lg py-4 px-4 rounded-full w-full transition duration-200">
                            Continue >
                        </button>
                    </div>
                </div>
            `;
            
            if (window.lucide) {
                lucide.createIcons();
            }
        };

        this._reRenderOnboardingGoals = renderUI;
        renderUI();
    },

    updateGoalsState(key, value) {
        this.onboardingGoalsState[key] = value;
        if (this._reRenderOnboardingGoals) {
            this._reRenderOnboardingGoals();
        }
    },

    toggleSecondaryGoal(goal) {
        const goals = this.onboardingGoalsState.secondaryGoals;
        const index = goals.indexOf(goal);
        
        if (index > -1) {
            // Remove it
            goals.splice(index, 1);
        } else {
            // Add it if under limit
            if (goals.length < 3) {
                goals.push(goal);
            } else {
                alert("You can only select up to 3 secondary goals.");
            }
        }
        
        if (this._reRenderOnboardingGoals) {
            this._reRenderOnboardingGoals();
        }
    },

    async submitOnboardingGoals() {
        console.log("Submitting goals:", this.onboardingGoalsState);
        
        const { data, error } = await supabaseClient.auth.updateUser({
            data: {
                primary_goal: this.onboardingGoalsState.primaryGoal,
                secondary_goals: this.onboardingGoalsState.secondaryGoals,
                fitness_level: this.onboardingGoalsState.fitnessLevel
            }
        });

        if (error) {
            console.error("Error updating profile:", error);
            alert("Failed to save data: " + error.message);
        } else {
            console.log("Goals updated successfully!");
            App.renderOnboardingStep3();
        }
    },

    // --- ONBOARDING STEP 3: MOVEMENT ---

    onboardingStep3State: {
        steps: 8000,
        sittingHours: 8,
        sleepHours: 7.5,
        jobType: 'Desk job',
        activityLevel: 'Lightly Active'
    },

    renderOnboardingStep3() {
        const content = document.getElementById('app-content');
        
        const renderUI = () => {
            const { steps, sittingHours, sleepHours, jobType, activityLevel } = this.onboardingStep3State;
            
            const jobTypes = ['Desk job', 'Student', 'Field work', 'Physical work', 'Shift work', 'Not working now'];
            
            const activityLevels = [
                { id: 'Sedentary', desc: 'Little to no exercise, mostly seated', icon: 'clock' },
                { id: 'Lightly Active', desc: 'Light movement 1-2 days a week', icon: 'zap' },
                { id: 'Moderately Active', desc: 'Exercise 3-4 days a week', icon: 'flag' },
                { id: 'Very Active', desc: 'Hard training 5-6 days a week', icon: 'upload' },
                { id: 'Extremely Active', desc: 'Athlete or physical job + training', icon: 'image' }
            ];

            content.innerHTML = `
                <div class="flex flex-col h-full bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-32">
                    <div class="max-w-sm mx-auto w-full p-6 pb-24 overflow-y-auto h-full">
                        
                        <!-- Header -->
                        <div class="flex items-center gap-4 pt-4 mb-8">
                            <button onclick="App.renderOnboardingGoals()" class="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm text-black">
                                <i data-lucide="chevron-left" class="w-6 h-6"></i>
                            </button>
                            <div class="flex-1">
                                <div class="flex justify-between items-end mb-2 text-sm">
                                    <span class="text-[#2563eb] font-semibold text-xs tracking-wider">STEP 3 OF 8</span>
                                    <span class="text-gray-500 text-xs">38%</span>
                                </div>
                                <div class="w-full bg-black/10 rounded-full h-1">
                                    <div class="bg-[#14b8a6] h-1 rounded-full" style="width: 38%"></div>
                                </div>
                            </div>
                        </div>

                        <h1 class="text-[2rem] leading-tight font-bold text-[#0f172a] drop-shadow-sm mb-4">
                            How does your day usually move?
                        </h1>
                        <p class="text-gray-500 text-[15px] leading-relaxed mb-8">
                            Daily movement matters more than workouts alone — it shapes your calorie target.
                        </p>

                        <!-- Sliders Box -->
                        <div class="bg-white/90 rounded-[2rem] p-6 shadow-sm mb-8">
                            
                            <!-- Daily Steps -->
                            <div class="mb-6">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-gray-800 text-[15px]">Daily steps</span>
                                    <span class="font-bold text-gray-900 text-lg">${steps.toLocaleString()}</span>
                                </div>
                                <input type="range" min="1000" max="20000" step="500" value="${steps}" 
                                    oninput="App.updateStep3State('steps', parseInt(this.value))"
                                    class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3b82f6]">
                                <div class="flex justify-between text-xs text-gray-400 mt-2">
                                    <span>1,000</span>
                                    <span>20,000</span>
                                </div>
                            </div>

                            <!-- Sitting Hours -->
                            <div class="mb-6">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-gray-800 text-[15px]">Average sitting hours</span>
                                    <span class="font-bold text-gray-900 text-lg">${sittingHours} h</span>
                                </div>
                                <style>
                                    #slider-sitting::-webkit-slider-runnable-track {
                                        background: linear-gradient(to right, #f59e0b ${(sittingHours-2)/12*100}%, #e5e7eb ${(sittingHours-2)/12*100}%);
                                    }
                                </style>
                                <input type="range" min="2" max="14" step="0.5" value="${sittingHours}" id="slider-sitting"
                                    oninput="App.updateStep3State('sittingHours', parseFloat(this.value))"
                                    class="w-full h-1 rounded-lg appearance-none cursor-pointer accent-[#3b82f6]">
                                <div class="flex justify-between text-xs text-gray-400 mt-2">
                                    <span>2 h</span>
                                    <span>14 h</span>
                                </div>
                            </div>

                            <!-- Sleep Duration -->
                            <div>
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-gray-800 text-[15px]">Sleep duration</span>
                                    <span class="font-bold text-gray-900 text-lg">${sleepHours} h</span>
                                </div>
                                <style>
                                    #slider-sleep::-webkit-slider-runnable-track {
                                        background: linear-gradient(to right, #8b5cf6 ${(sleepHours-4)/7*100}%, #e5e7eb ${(sleepHours-4)/7*100}%);
                                    }
                                </style>
                                <input type="range" min="4" max="11" step="0.5" value="${sleepHours}" id="slider-sleep"
                                    oninput="App.updateStep3State('sleepHours', parseFloat(this.value))"
                                    class="w-full h-1 rounded-lg appearance-none cursor-pointer accent-[#3b82f6]">
                                <div class="flex justify-between text-xs text-gray-400 mt-2">
                                    <span>4 h</span>
                                    <span>11 h</span>
                                </div>
                            </div>
                        </div>

                        <!-- Job Type -->
                        <div class="mb-8">
                            <h2 class="font-semibold text-gray-900 text-lg mb-4">Job type</h2>
                            <div class="flex flex-wrap gap-2">
                                ${jobTypes.map(job => `
                                    <button onclick="App.updateStep3State('jobType', '${job}')" 
                                        class="px-4 py-2.5 rounded-full text-[15px] transition ${jobType === job ? 'bg-[#14b8a6] text-white shadow-sm' : 'bg-white text-gray-700 shadow-sm'}">
                                        ${job} ${jobType === job ? '✓' : ''}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Daily Activity Level -->
                        <div class="mb-4">
                            <h2 class="font-semibold text-gray-900 text-lg mb-1">Daily activity level</h2>
                            <p class="text-sm text-gray-500 mb-4">Choose the description closest to a normal week</p>
                            
                            <div class="flex flex-col gap-3">
                                ${activityLevels.map(level => `
                                    <div onclick="App.updateStep3State('activityLevel', '${level.id}')" 
                                        class="cursor-pointer bg-white rounded-[1.5rem] p-4 flex items-center gap-4 shadow-sm border-2 transition ${activityLevel === level.id ? 'border-[#3b82f6] bg-[#eff6ff]/30' : 'border-transparent'}">
                                        
                                        <div class="w-12 h-12 flex items-center justify-center rounded-full ${activityLevel === level.id ? 'text-[#14b8a6]' : 'text-gray-400'}">
                                            <i data-lucide="${level.icon}" class="w-7 h-7"></i>
                                        </div>
                                        
                                        <div class="flex-1">
                                            <h3 class="font-semibold text-gray-900 text-[15px]">${level.id}</h3>
                                            <p class="text-[13px] text-gray-500 leading-snug">${level.desc}</p>
                                        </div>

                                        <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center ${activityLevel === level.id ? 'border-[#3b82f6]' : 'border-gray-300'}">
                                            ${activityLevel === level.id ? '<div class="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></div>' : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                    </div>

                    <!-- Fixed Bottom Bar -->
                    <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 z-10">
                        <button onclick="App.submitOnboardingStep3()" class="bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold text-lg py-4 px-4 rounded-full w-full transition duration-200">
                            Continue >
                        </button>
                    </div>
                </div>
            `;
            
            if (window.lucide) {
                lucide.createIcons();
            }
        };

        this._reRenderOnboardingStep3 = renderUI;
        renderUI();
    },

    updateStep3State(key, value) {
        this.onboardingStep3State[key] = value;
        if (this._reRenderOnboardingStep3) {
            this._reRenderOnboardingStep3();
        }
    },

    async submitOnboardingStep3() {
        console.log("Submitting step 3:", this.onboardingStep3State);
        
        const { data, error } = await supabaseClient.auth.updateUser({
            data: {
                daily_steps: this.onboardingStep3State.steps,
                sitting_hours: this.onboardingStep3State.sittingHours,
                sleep_hours: this.onboardingStep3State.sleepHours,
                job_type: this.onboardingStep3State.jobType,
                daily_activity_level: this.onboardingStep3State.activityLevel
            }
        });

        if (error) {
            console.error("Error updating profile:", error);
            alert("Failed to save data: " + error.message);
        } else {
            console.log("Step 3 updated successfully!");
            App.renderOnboardingStep4();
        }
    },

    // --- ONBOARDING STEP 4: DIET ---

    onboardingStep4State: {
        diet: 'Non-Vegetarian',
        cuisines: ['Indian', 'Mediterranean'],
        mealsPerDay: '4 meals/day',
        foodsLike: ['Paneer', 'Lentils', 'Greek yogurt', 'Oats'],
        foodsAvoid: ['Fried food', 'Sugary drinks']
    },

    renderOnboardingStep4() {
        const content = document.getElementById('app-content');
        
        const renderUI = () => {
            const { diet, cuisines, mealsPerDay, foodsLike, foodsAvoid } = this.onboardingStep4State;
            
            const diets = ['Vegetarian', 'Vegan', 'Eggetarian', 'Non-Vegetarian', 'Pescatarian', 'Custom'];
            const allCuisines = ['Indian', 'South Indian', 'North Indian', 'Asian', 'Mediterranean', 'Western', 'Other'];
            const mealOptions = ['2 meals/day', '3 meals/day', '4 meals/day', '5+ meals/day'];
            const allFoodsLike = ['Paneer', 'Lentils', 'Greek yogurt', 'Oats', 'Bananas', 'Tofu', 'Berries', 'Rice', 'Spinach', 'Chickpeas'];
            const allFoodsAvoid = ['Fried food', 'Sugary drinks', 'Red meat', 'Mushrooms', 'Bitter gourd', 'Processed snacks'];

            const hasItem = (arr, item) => arr.includes(item);

            content.innerHTML = `
                <div class="flex flex-col h-full bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-32">
                    <div class="max-w-sm mx-auto w-full p-6 pb-24 overflow-y-auto h-full">
                        
                        <!-- Header -->
                        <div class="flex items-center gap-4 pt-4 mb-8">
                            <button onclick="App.renderOnboardingStep3()" class="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm text-black">
                                <i data-lucide="chevron-left" class="w-6 h-6"></i>
                            </button>
                            <div class="flex-1">
                                <div class="flex justify-between items-end mb-2 text-sm">
                                    <span class="text-[#2563eb] font-semibold text-xs tracking-wider">STEP 4 OF 8</span>
                                    <span class="text-gray-500 text-xs">50%</span>
                                </div>
                                <div class="w-full bg-black/10 rounded-full h-1">
                                    <div class="bg-[#14b8a6] h-1 rounded-full" style="width: 50%"></div>
                                </div>
                            </div>
                        </div>

                        <h1 class="text-[2rem] leading-tight font-bold text-[#0f172a] drop-shadow-sm mb-4">
                            How do you prefer to eat?
                        </h1>
                        <p class="text-gray-500 text-[15px] leading-relaxed mb-8">
                            Your meal plans will only ever suggest food that fits these preferences.
                        </p>

                        <!-- Diet Preferences Grid -->
                        <div class="grid grid-cols-2 gap-4 mb-10">
                            ${diets.map(d => `
                                <div onclick="App.updateStep4State('diet', '${d}')" 
                                    class="cursor-pointer bg-white rounded-[1.5rem] p-5 shadow-sm border-2 transition relative ${diet === d ? 'border-[#3b82f6] bg-[#eff6ff]/30' : 'border-transparent'}">
                                    <i data-lucide="star" class="w-8 h-8 mb-4 ${diet === d ? 'text-[#14b8a6] fill-[#14b8a6]' : 'text-gray-400'}"></i>
                                    <h3 class="font-bold text-gray-900 text-[15px] mb-1">${d}</h3>
                                    ${diet === d ? '<div class="absolute top-5 right-5 w-4 h-4 bg-[#3b82f6] rounded-full"></div>' : ''}
                                </div>
                            `).join('')}
                        </div>

                        <!-- Preferred cuisines -->
                        <div class="mb-10">
                            <h2 class="font-semibold text-gray-900 text-lg">Preferred cuisines</h2>
                            <p class="text-sm text-gray-500 mb-4">Pick as many as you enjoy</p>
                            <div class="flex flex-wrap gap-2">
                                ${allCuisines.map(c => `
                                    <button onclick="App.toggleArrayState('cuisines', '${c}')" 
                                        class="px-4 py-2.5 rounded-full text-[15px] transition ${hasItem(cuisines, c) ? 'bg-[#14b8a6] text-white shadow-sm' : 'bg-white text-gray-700 shadow-sm'}">
                                        ${c} ${hasItem(cuisines, c) ? '✓' : ''}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Meals per day -->
                        <div class="mb-10">
                            <h2 class="font-semibold text-gray-900 text-lg mb-4">Meals per day</h2>
                            <div class="flex flex-wrap gap-2">
                                ${mealOptions.map(m => `
                                    <button onclick="App.updateStep4State('mealsPerDay', '${m}')" 
                                        class="px-5 py-3 rounded-[1.5rem] text-[15px] transition ${mealsPerDay === m ? 'bg-[#14b8a6] text-white shadow-sm' : 'bg-white text-gray-700 shadow-sm'}">
                                        ${m} ${mealsPerDay === m ? '✓' : ''}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Foods I like -->
                        <div class="mb-10">
                            <h2 class="font-semibold text-gray-900 text-lg">Foods I like</h2>
                            <p class="text-sm text-gray-500 mb-4">We'll build meals around these</p>
                            
                            <div class="flex flex-wrap gap-2 mb-4">
                                ${allFoodsLike.map(f => `
                                    <button onclick="App.toggleArrayState('foodsLike', '${f}')" 
                                        class="px-4 py-2.5 rounded-full text-[15px] transition ${hasItem(foodsLike, f) ? 'bg-[#14b8a6] text-white shadow-sm' : 'bg-white text-gray-700 shadow-sm'}">
                                        ${f} ${hasItem(foodsLike, f) ? '✓' : ''}
                                    </button>
                                `).join('')}
                                ${foodsLike.filter(f => !allFoodsLike.includes(f)).map(f => `
                                    <button onclick="App.toggleArrayState('foodsLike', '${f}')" 
                                        class="px-4 py-2.5 rounded-full text-[15px] bg-[#14b8a6] text-white shadow-sm transition">
                                        ${f} ✓
                                    </button>
                                `).join('')}
                            </div>

                            <div class="flex gap-2">
                                <input type="text" id="add-food-like" placeholder="Add your own favourite" 
                                    class="flex-1 px-4 py-3 rounded-full border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-gray-700 bg-white">
                                <button onclick="App.addCustomFood('foodsLike')" class="bg-[#14b8a6] w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0">
                                    <i data-lucide="plus" class="w-6 h-6"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Foods I avoid -->
                        <div class="mb-4">
                            <h2 class="font-semibold text-gray-900 text-lg">Foods I avoid</h2>
                            <p class="text-sm text-gray-500 mb-4">These will be kept out of your plans</p>
                            
                            <div class="flex flex-wrap gap-2">
                                ${allFoodsAvoid.map(f => `
                                    <button onclick="App.toggleArrayState('foodsAvoid', '${f}')" 
                                        class="px-4 py-2.5 rounded-full text-[15px] transition ${hasItem(foodsAvoid, f) ? 'bg-[#f43f5e] text-white shadow-sm' : 'bg-white text-gray-700 shadow-sm'}">
                                        ${f} ${hasItem(foodsAvoid, f) ? '✓' : ''}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                    </div>

                    <!-- Fixed Bottom Bar -->
                    <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 z-10">
                        <button onclick="App.submitOnboardingStep4()" class="bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold text-lg py-4 px-4 rounded-full w-full transition duration-200">
                            Continue >
                        </button>
                    </div>
                </div>
            `;
            
            if (window.lucide) {
                lucide.createIcons();
            }
        };

        this._reRenderOnboardingStep4 = renderUI;
        renderUI();
    },

    updateStep4State(key, value) {
        this.onboardingStep4State[key] = value;
        if (this._reRenderOnboardingStep4) {
            this._reRenderOnboardingStep4();
        }
    },

    toggleArrayState(key, item) {
        const arr = this.onboardingStep4State[key];
        const index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        } else {
            arr.push(item);
        }
        if (this._reRenderOnboardingStep4) {
            this._reRenderOnboardingStep4();
        }
    },

    addCustomFood(key) {
        const input = document.getElementById('add-food-like');
        const val = input.value.trim();
        if (val && !this.onboardingStep4State[key].includes(val)) {
            this.onboardingStep4State[key].push(val);
            if (this._reRenderOnboardingStep4) {
                this._reRenderOnboardingStep4();
            }
        }
        input.value = '';
    },

    async submitOnboardingStep4() {
        console.log("Submitting step 4:", this.onboardingStep4State);
        
        const { data, error } = await supabaseClient.auth.updateUser({
            data: {
                diet: this.onboardingStep4State.diet,
                cuisines: this.onboardingStep4State.cuisines,
                meals_per_day: this.onboardingStep4State.mealsPerDay,
                foods_like: this.onboardingStep4State.foodsLike,
                foods_avoid: this.onboardingStep4State.foodsAvoid
            }
        });

        if (error) {
            console.error("Error updating profile:", error);
            alert("Failed to save data: " + error.message);
        } else {
            console.log("Step 4 updated successfully!");
            App.renderOnboardingStep5();
        }
    },

    // --- ONBOARDING STEP 5: HEALTH ---

    onboardingStep5State: {
        conditions: ['None'],
        allergies: ['Nuts']
    },

    renderOnboardingStep5() {
        const content = document.getElementById('app-content');
        
        const renderUI = () => {
            const { conditions, allergies } = this.onboardingStep5State;
            
            const allConditions = ['Diabetes', 'High Blood Pressure', 'Thyroid condition', 'Heart condition', 'Asthma', 'Digestive issues', 'Other', 'None'];
            const allAllergies = ['Nuts', 'Peanuts', 'Dairy', 'Eggs', 'Gluten', 'Seafood', 'Soy', 'Other', 'None'];

            const hasCondition = (c) => conditions.includes(c);
            const hasAllergy = (a) => allergies.includes(a);

            content.innerHTML = `
                <div class="flex flex-col h-full bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-40">
                    <div class="max-w-sm mx-auto w-full p-6 pb-24 overflow-y-auto h-full">
                        
                        <!-- Header -->
                        <div class="flex items-center gap-4 pt-4 mb-8">
                            <button onclick="App.renderOnboardingStep4()" class="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm text-black">
                                <i data-lucide="chevron-left" class="w-6 h-6"></i>
                            </button>
                            <div class="flex-1">
                                <div class="flex justify-between items-end mb-2 text-sm">
                                    <span class="text-[#2563eb] font-semibold text-xs tracking-wider">STEP 5 OF 8</span>
                                    <span class="text-gray-500 text-xs">63%</span>
                                </div>
                                <div class="w-full bg-black/10 rounded-full h-1">
                                    <div class="bg-[#14b8a6] h-1 rounded-full" style="width: 63%"></div>
                                </div>
                            </div>
                        </div>

                        <h1 class="text-[2rem] leading-tight font-bold text-[#0f172a] drop-shadow-sm mb-4">
                            Help iKizen understand your health.
                        </h1>
                        <p class="text-gray-500 text-[15px] leading-relaxed mb-6">
                            Conditions and allergies are treated as hard constraints across every plan we build.
                        </p>

                        <!-- Privacy Notice -->
                        <div class="bg-[#e6fcf5] rounded-2xl p-5 mb-8 flex gap-4 shadow-sm">
                            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 text-[#14b8a6] shadow-sm">
                                <i data-lucide="lock" class="w-5 h-5"></i>
                            </div>
                            <p class="text-[14px] text-[#0d9488] leading-snug">
                                Private & encrypted. Health details are stored on your device profile, never shared or sold, and used only to filter recommendations.
                            </p>
                        </div>

                        <!-- Conditions -->
                        <div class="mb-10">
                            <h2 class="font-semibold text-gray-900 text-lg">Do you have any health conditions?</h2>
                            <p class="text-sm text-gray-500 mb-4">Select all that apply</p>
                            <div class="flex flex-wrap gap-2">
                                ${allConditions.map(c => `
                                    <button onclick="App.toggleCondition('${c}')" 
                                        class="px-4 py-2.5 rounded-full text-[15px] transition ${hasCondition(c) ? 'bg-[#3b82f6] text-white shadow-sm' : 'bg-white text-gray-700 shadow-sm'}">
                                        ${c} ${hasCondition(c) ? '✓' : ''}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Food Allergies -->
                        <div class="mb-6">
                            <h2 class="font-semibold text-gray-900 text-lg">Food allergies</h2>
                            <p class="text-sm text-gray-500 mb-4">We will never suggest a meal containing these</p>
                            
                            <div class="flex flex-wrap gap-2 mb-4">
                                ${allAllergies.map(a => `
                                    <button onclick="App.toggleAllergy('${a}')" 
                                        class="px-4 py-2.5 rounded-full text-[15px] transition ${hasAllergy(a) ? 'bg-[#f43f5e] text-white shadow-sm' : 'bg-white text-gray-700 shadow-sm'}">
                                        ${a} ${hasAllergy(a) ? '✓' : ''}
                                    </button>
                                `).join('')}
                                ${allergies.filter(a => !allAllergies.includes(a) && a !== 'None').map(a => `
                                    <button onclick="App.toggleAllergy('${a}')" 
                                        class="px-4 py-2.5 rounded-full text-[15px] bg-[#f43f5e] text-white shadow-sm transition">
                                        ${a} ✓
                                    </button>
                                `).join('')}
                            </div>

                            <div class="flex gap-2 mb-6">
                                <input type="text" id="add-allergy" placeholder="Add another allergy" 
                                    class="flex-1 px-4 py-3 rounded-full border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f43f5e] text-gray-700 bg-white">
                                <button onclick="App.addCustomAllergy()" class="bg-[#f43f5e] w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm shrink-0">
                                    <i data-lucide="plus" class="w-6 h-6"></i>
                                </button>
                            </div>

                            ${allergies.length > 0 && !allergies.includes('None') ? `
                                <!-- Active Constraints Warning -->
                                <div class="bg-[#ffe4e6] rounded-2xl p-5 mb-6 shadow-sm border border-[#fecdd3]">
                                    <h3 class="font-medium text-[#e11d48] text-sm mb-1">Active food constraints</h3>
                                    <p class="text-[13px] text-[#e11d48] leading-snug">
                                        ${allergies.join(', ')} — every meal card will carry a visible warning and these ingredients are excluded from AI meal plans.
                                    </p>
                                </div>
                            ` : ''}

                            <!-- Medical Warning Box -->
                            <div class="bg-white/70 rounded-2xl p-4 flex gap-3 shadow-sm">
                                <i data-lucide="info" class="text-gray-500 w-5 h-5 shrink-0 mt-0.5 fill-gray-200"></i>
                                <p class="text-xs text-gray-500 leading-relaxed">
                                    If you manage a medical condition, please review your plan with your doctor or a registered dietitian before making significant changes.
                                </p>
                            </div>
                        </div>

                    </div>

                    <!-- Fixed Bottom Bar -->
                    <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-4 pt-6 z-10 flex flex-col items-center">
                        <p class="text-center text-[11px] text-gray-400 mb-4 px-4 leading-tight">
                            iKizen provides wellness guidance and does not replace professional medical advice.
                        </p>
                        <button onclick="App.submitOnboardingStep5()" class="bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold text-lg py-4 px-4 rounded-full w-full max-w-sm transition duration-200">
                            Continue >
                        </button>
                    </div>
                </div>
            `;
            
            if (window.lucide) {
                lucide.createIcons();
            }
        };

        this._reRenderOnboardingStep5 = renderUI;
        renderUI();
    },

    toggleCondition(c) {
        let arr = this.onboardingStep5State.conditions;
        
        if (c === 'None') {
            this.onboardingStep5State.conditions = ['None'];
        } else {
            // Remove 'None' if another option is clicked
            const noneIndex = arr.indexOf('None');
            if (noneIndex > -1) arr.splice(noneIndex, 1);
            
            const index = arr.indexOf(c);
            if (index > -1) {
                arr.splice(index, 1);
            } else {
                arr.push(c);
            }
            // If empty, default to None
            if (arr.length === 0) arr.push('None');
        }
        
        if (this._reRenderOnboardingStep5) this._reRenderOnboardingStep5();
    },

    toggleAllergy(a) {
        let arr = this.onboardingStep5State.allergies;
        
        if (a === 'None') {
            this.onboardingStep5State.allergies = ['None'];
        } else {
            // Remove 'None' if another option is clicked
            const noneIndex = arr.indexOf('None');
            if (noneIndex > -1) arr.splice(noneIndex, 1);
            
            const index = arr.indexOf(a);
            if (index > -1) {
                arr.splice(index, 1);
            } else {
                arr.push(a);
            }
            // If empty, default to None
            if (arr.length === 0) arr.push('None');
        }
        
        if (this._reRenderOnboardingStep5) this._reRenderOnboardingStep5();
    },

    addCustomAllergy() {
        const input = document.getElementById('add-allergy');
        const val = input.value.trim();
        if (val && !this.onboardingStep5State.allergies.includes(val)) {
            // Remove 'None'
            const arr = this.onboardingStep5State.allergies;
            const noneIndex = arr.indexOf('None');
            if (noneIndex > -1) arr.splice(noneIndex, 1);
            
            arr.push(val);
            if (this._reRenderOnboardingStep5) this._reRenderOnboardingStep5();
        }
        input.value = '';
    },

    async submitOnboardingStep5() {
        console.log("Submitting step 5:", this.onboardingStep5State);
        
        const { data, error } = await supabaseClient.auth.updateUser({
            data: {
                health_conditions: this.onboardingStep5State.conditions,
                food_allergies: this.onboardingStep5State.allergies
            }
        });

        if (error) {
            console.error("Error updating profile:", error);
            alert("Failed to save data: " + error.message);
        } else {
            console.log("Step 5 updated successfully!");
            App.renderOnboardingStep6();
        }
    },

    // --- ONBOARDING STEP 6: MIND & FEELINGS ---

    onboardingStep6State: {
        feeling: 'Okay',
        sleepDurationStr: '7h 30m',
        sleepDurationVal: 7.5,
        sleepQuality: 70, // 0 to 100
        stressLevel: 40, // 0 to 100
        energyLevel: 68, // 0 to 100
        improvements: ['Reduce Stress', 'Improve Focus']
    },

    renderOnboardingStep6() {
        const content = document.getElementById('app-content');
        
        const renderUI = () => {
            const { feeling, sleepDurationVal, sleepQuality, stressLevel, energyLevel, improvements } = this.onboardingStep6State;
            
            const feelings = [
                { id: 'Great', emoji: '🤩' },
                { id: 'Good', emoji: '🙂' },
                { id: 'Okay', emoji: '😐' },
                { id: 'Low', emoji: '😔' },
                { id: 'Stressed', emoji: '😫' }
            ];

            const improvementOptions = [
                'Reduce Stress', 'Improve Sleep', 'Improve Focus', 'Build Confidence', 
                'Improve Mood', 'Reduce Screen Time', 'Build Better Habits'
            ];

            const hasImprovement = (item) => improvements.includes(item);

            // Format sleep duration text
            const hours = Math.floor(sleepDurationVal);
            const minutes = (sleepDurationVal % 1 === 0.5) ? '30m' : '0m';
            const sleepText = minutes === '0m' ? `${hours}h` : `${hours}h ${minutes}`;

            // Map sleep quality (0-100) to text
            let qualityText = 'Restless';
            if (sleepQuality >= 25 && sleepQuality < 60) qualityText = 'Fair';
            if (sleepQuality >= 60 && sleepQuality < 85) qualityText = 'Good';
            if (sleepQuality >= 85) qualityText = 'Deep';

            // Map stress level (0-100) to text
            let stressText = 'Calm';
            if (stressLevel >= 25 && stressLevel < 60) stressText = 'Manageable';
            if (stressLevel >= 60 && stressLevel < 85) stressText = 'High';
            if (stressLevel >= 85) stressText = 'Overwhelmed';

            content.innerHTML = `
                <div class="flex flex-col h-full bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-32">
                    <div class="max-w-sm mx-auto w-full p-6 pb-24 overflow-y-auto h-full">
                        
                        <!-- Header -->
                        <div class="flex items-center gap-4 pt-4 mb-8">
                            <button onclick="App.renderOnboardingStep5()" class="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm text-black">
                                <i data-lucide="chevron-left" class="w-6 h-6"></i>
                            </button>
                            <div class="flex-1">
                                <div class="flex justify-between items-end mb-2 text-sm">
                                    <span class="text-[#2563eb] font-semibold text-xs tracking-wider">STEP 6 OF 8</span>
                                    <span class="text-gray-500 text-xs">75%</span>
                                </div>
                                <div class="w-full bg-black/10 rounded-full h-1">
                                    <div class="bg-[#14b8a6] h-1 rounded-full" style="width: 75%"></div>
                                </div>
                            </div>
                        </div>

                        <h1 class="text-[2rem] leading-tight font-bold text-[#0f172a] drop-shadow-sm mb-4">
                            How are you feeling lately?
                        </h1>
                        <p class="text-gray-500 text-[15px] leading-relaxed mb-8">
                            Your mind matters as much as your macros. This tunes your daily check-ins.
                        </p>

                        <!-- Feelings Grid -->
                        <div class="flex justify-between gap-2 mb-8">
                            ${feelings.map(f => `
                                <div onclick="App.updateStep6State('feeling', '${f.id}')" 
                                    class="flex-1 cursor-pointer bg-white rounded-2xl py-4 flex flex-col items-center justify-center shadow-sm border-2 transition ${feeling === f.id ? 'border-[#3b82f6] bg-[#eff6ff]/50' : 'border-transparent'}">
                                    <span class="text-3xl mb-1">${f.emoji}</span>
                                    <span class="text-[11px] font-medium ${feeling === f.id ? 'text-[#3b82f6]' : 'text-gray-500'}">${f.id}</span>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Sliders Box -->
                        <div class="bg-white/90 rounded-[2rem] p-6 shadow-sm mb-8">
                            
                            <!-- Average Sleep Duration -->
                            <div class="mb-8">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-gray-800 text-[15px]">Average sleep duration</span>
                                    <span class="font-bold text-gray-900 text-lg">${sleepText}</span>
                                </div>
                                <style>
                                    #slider-s6-dur::-webkit-slider-runnable-track {
                                        background: linear-gradient(to right, #3b82f6 ${(sleepDurationVal-4)/7*100}%, #e5e7eb ${(sleepDurationVal-4)/7*100}%);
                                    }
                                </style>
                                <input type="range" min="4" max="11" step="0.5" value="${sleepDurationVal}" id="slider-s6-dur"
                                    oninput="App.updateStep6State('sleepDurationVal', parseFloat(this.value))"
                                    class="w-full h-1 rounded-lg appearance-none cursor-pointer accent-[#3b82f6]">
                                <div class="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                                    <span>4h</span>
                                    <span>11h</span>
                                </div>
                            </div>

                            <!-- Sleep Quality -->
                            <div class="mb-8">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-gray-800 text-[15px]">Sleep quality</span>
                                    <span class="font-bold text-gray-900 text-lg">${qualityText}</span>
                                </div>
                                <style>
                                    #slider-s6-qual::-webkit-slider-runnable-track {
                                        background: linear-gradient(to right, #22c55e ${sleepQuality}%, #e5e7eb ${sleepQuality}%);
                                    }
                                </style>
                                <input type="range" min="0" max="100" value="${sleepQuality}" id="slider-s6-qual"
                                    oninput="App.updateStep6State('sleepQuality', parseInt(this.value))"
                                    class="w-full h-1 rounded-lg appearance-none cursor-pointer accent-[#3b82f6]">
                                <div class="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                                    <span>Restless</span>
                                    <span>Deep</span>
                                </div>
                            </div>

                            <!-- Stress Level -->
                            <div class="mb-8">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-gray-800 text-[15px]">Stress level</span>
                                    <span class="font-bold text-gray-900 text-lg">${stressText}</span>
                                </div>
                                <style>
                                    #slider-s6-stress::-webkit-slider-runnable-track {
                                        background: linear-gradient(to right, #ef4444 ${stressLevel}%, #e5e7eb ${stressLevel}%);
                                    }
                                </style>
                                <input type="range" min="0" max="100" value="${stressLevel}" id="slider-s6-stress"
                                    oninput="App.updateStep6State('stressLevel', parseInt(this.value))"
                                    class="w-full h-1 rounded-lg appearance-none cursor-pointer accent-[#3b82f6]">
                                <div class="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                                    <span>Calm</span>
                                    <span>Overwhelmed</span>
                                </div>
                            </div>

                            <!-- Typical Energy Level -->
                            <div>
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-gray-800 text-[15px]">Typical energy level</span>
                                    <span class="font-bold text-gray-900 text-lg">${energyLevel}%</span>
                                </div>
                                <style>
                                    #slider-s6-energy::-webkit-slider-runnable-track {
                                        background: linear-gradient(to right, #14b8a6 ${energyLevel}%, #e5e7eb ${energyLevel}%);
                                    }
                                </style>
                                <input type="range" min="0" max="100" value="${energyLevel}" id="slider-s6-energy"
                                    oninput="App.updateStep6State('energyLevel', parseInt(this.value))"
                                    class="w-full h-1 rounded-lg appearance-none cursor-pointer accent-[#3b82f6]">
                                <div class="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                                    <span>Drained</span>
                                    <span>Energised</span>
                                </div>
                            </div>

                        </div>

                        <!-- What would you like to improve? -->
                        <div class="mb-4">
                            <h2 class="font-semibold text-gray-900 text-lg">What would you like to improve?</h2>
                            <p class="text-sm text-gray-500 mb-4">Select everything that resonates</p>
                            
                            <div class="flex flex-wrap gap-2">
                                ${improvementOptions.map(imp => `
                                    <button onclick="App.toggleS6Improvement('${imp}')" 
                                        class="px-4 py-2.5 rounded-full text-[15px] transition ${hasImprovement(imp) ? 'bg-[#3b82f6] text-white shadow-sm' : 'bg-white text-gray-700 shadow-sm'}">
                                        ${imp} ${hasImprovement(imp) ? '✓' : ''}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                    </div>

                    <!-- Fixed Bottom Bar -->
                    <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 z-10">
                        <button onclick="App.submitOnboardingStep6()" class="bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold text-lg py-4 px-4 rounded-full w-full transition duration-200">
                            Continue >
                        </button>
                    </div>
                </div>
            `;
            
            if (window.lucide) {
                lucide.createIcons();
            }
        };

        this._reRenderOnboardingStep6 = renderUI;
        renderUI();
    },

    updateStep6State(key, value) {
        this.onboardingStep6State[key] = value;
        if (this._reRenderOnboardingStep6) {
            this._reRenderOnboardingStep6();
        }
    },

    toggleS6Improvement(item) {
        const arr = this.onboardingStep6State.improvements;
        const index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        } else {
            arr.push(item);
        }
        if (this._reRenderOnboardingStep6) {
            this._reRenderOnboardingStep6();
        }
    },

    async submitOnboardingStep6() {
        console.log("Submitting step 6:", this.onboardingStep6State);
        
        const { data, error } = await supabaseClient.auth.updateUser({
            data: {
                feeling_lately: this.onboardingStep6State.feeling,
                sleep_duration_s6: this.onboardingStep6State.sleepDurationVal,
                sleep_quality: this.onboardingStep6State.sleepQuality,
                stress_level: this.onboardingStep6State.stressLevel,
                energy_level: this.onboardingStep6State.energyLevel,
                mind_improvements: this.onboardingStep6State.improvements
            }
        });

        if (error) {
            console.error("Error updating profile:", error);
            alert("Failed to save data: " + error.message);
        } else {
            console.log("Step 6 updated successfully!");
            App.renderOnboardingStep7();
        }
    },

    // --- ONBOARDING STEP 7: ACCOMPLISHMENTS ---

    onboardingStep7State: {
        category: 'Personal Development',
        hobbies: ['📖 Reading', '🎧 Music', '💻 Coding'],
        productiveTime: 'Morning',
        customGoal: 'Study Python for 1 hour every day'
    },

    renderOnboardingStep7() {
        const content = document.getElementById('app-content');
        
        const renderUI = () => {
            const { category, hobbies, productiveTime, customGoal } = this.onboardingStep7State;
            
            const categories = [
                { id: 'Study', icon: 'book-open' },
                { id: 'Career', icon: 'briefcase' },
                { id: 'Business', icon: 'trending-up' },
                { id: 'Personal Development', icon: 'user' },
                { id: 'Hobbies', icon: 'camera' },
                { id: 'Fitness', icon: 'activity' }
            ];

            const allHobbies = [
                '📖 Reading', '🎮 Gaming', '🎧 Music', '💻 Coding', '📷 Photography', 
                '✏️ Drawing', '⚽ Sports', '✈️ Travel', '🎥 Content Creation', '🧠 Learning', '➕ Other'
            ];

            const times = [
                { id: 'Morning', icon: 'sun' },
                { id: 'Afternoon', icon: 'cloud-sun' },
                { id: 'Evening', icon: 'sunset' },
                { id: 'Night', icon: 'moon' }
            ];

            const goalSuggestions = ['Read 20 pages daily', 'Code for 1 hour', 'Journal every night', 'Walk 8,000 steps'];
            const hasHobby = (h) => hobbies.includes(h);

            content.innerHTML = `
                <div class="flex flex-col h-full bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-32">
                    <div class="max-w-sm mx-auto w-full p-6 pb-24 overflow-y-auto h-full">
                        
                        <!-- Header -->
                        <div class="flex items-center gap-4 pt-4 mb-8">
                            <button onclick="App.renderOnboardingStep6()" class="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm text-black">
                                <i data-lucide="chevron-left" class="w-6 h-6"></i>
                            </button>
                            <div class="flex-1">
                                <div class="flex justify-between items-end mb-2 text-sm">
                                    <span class="text-[#2563eb] font-semibold text-xs tracking-wider">STEP 7 OF 8</span>
                                    <span class="text-gray-500 text-xs">88%</span>
                                </div>
                                <div class="w-full bg-black/10 rounded-full h-1">
                                    <div class="bg-[#14b8a6] h-1 rounded-full" style="width: 88%"></div>
                                </div>
                            </div>
                        </div>

                        <h1 class="text-[2rem] leading-tight font-bold text-[#0f172a] drop-shadow-sm mb-4">
                            What do you want to accomplish?
                        </h1>
                        <p class="text-gray-500 text-[15px] leading-relaxed mb-8">
                            Your coach protects time for what matters, not just workouts.
                        </p>

                        <!-- Accomplishment Category -->
                        <div class="grid grid-cols-2 gap-4 mb-10">
                            ${categories.map(c => `
                                <div onclick="App.updateStep7State('category', '${c.id}')" 
                                    class="cursor-pointer bg-white rounded-[1.5rem] p-5 shadow-sm border-2 transition relative ${category === c.id ? 'border-[#3b82f6] bg-[#eff6ff]/30' : 'border-transparent'}">
                                    <i data-lucide="${c.icon}" class="w-8 h-8 mb-4 ${category === c.id ? 'text-[#3b82f6] fill-[#3b82f6]' : 'text-gray-400'}"></i>
                                    <h3 class="font-bold text-gray-900 text-[15px] mb-1 leading-snug">${c.id}</h3>
                                    ${category === c.id ? '<div class="absolute top-5 right-5 w-4 h-4 bg-[#3b82f6] rounded-full"></div>' : ''}
                                </div>
                            `).join('')}
                        </div>

                        <!-- Hobbies & interests -->
                        <div class="mb-10">
                            <h2 class="font-semibold text-gray-900 text-lg">Hobbies & interests</h2>
                            <p class="text-sm text-gray-500 mb-4">These become trackable weekly time goals</p>
                            <div class="flex flex-wrap gap-2">
                                ${allHobbies.map(h => `
                                    <button onclick="App.toggleHobby('${h}')" 
                                        class="px-4 py-2.5 rounded-full text-[15px] transition ${hasHobby(h) ? 'bg-[#3b82f6] text-white shadow-sm' : 'bg-white text-gray-700 shadow-sm'}">
                                        ${h} ${hasHobby(h) ? '✓' : ''}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Productive Time -->
                        <div class="mb-10">
                            <h2 class="font-semibold text-gray-900 text-lg mb-4">When are you most productive?</h2>
                            <div class="grid grid-cols-2 gap-4">
                                ${times.map(t => `
                                    <div onclick="App.updateStep7State('productiveTime', '${t.id}')" 
                                        class="cursor-pointer bg-white rounded-2xl p-4 shadow-sm border-2 transition relative ${productiveTime === t.id ? 'border-[#3b82f6] bg-[#eff6ff]/30' : 'border-transparent'}">
                                        <i data-lucide="${t.icon}" class="w-6 h-6 mb-3 ${productiveTime === t.id ? 'text-[#3b82f6] fill-[#3b82f6]/20' : 'text-orange-300'}"></i>
                                        <h3 class="font-bold text-gray-900 text-[15px]">${t.id}</h3>
                                        ${productiveTime === t.id ? '<div class="absolute top-4 right-4 w-4 h-4 bg-[#3b82f6] rounded-full"></div>' : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Personal Goal -->
                        <div class="mb-8">
                            <h2 class="font-semibold text-gray-900 text-lg">Your first personal goal</h2>
                            <p class="text-sm text-gray-500 mb-4">Small, specific and daily works best</p>
                            
                            <div class="bg-white/90 rounded-[2rem] p-5 shadow-sm">
                                
                                <div class="flex gap-3 mb-6 items-start">
                                    <div class="w-12 h-12 rounded-full bg-[#3b82f6] flex items-center justify-center shrink-0 shadow-sm">
                                        <i data-lucide="target" class="w-6 h-6 text-white"></i>
                                    </div>
                                    <textarea id="custom-goal-input" rows="2" placeholder="e.g. Study Python for 1 hour every day"
                                        onchange="App.updateStep7State('customGoal', this.value)"
                                        class="w-full bg-transparent border-none focus:ring-0 text-gray-800 text-[15px] resize-none mt-2 font-medium">${customGoal}</textarea>
                                </div>
                                
                                <div class="flex flex-wrap gap-2">
                                    ${goalSuggestions.map(g => `
                                        <button onclick="App.updateStep7State('customGoal', '${g}')" 
                                            class="px-4 py-2 rounded-full text-[13px] bg-white border border-gray-200 text-gray-600 shadow-sm hover:bg-gray-50 transition">
                                            ${g}
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Fixed Bottom Bar -->
                    <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 z-10">
                        <button onclick="App.submitOnboardingStep7()" class="bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold text-lg py-4 px-4 rounded-full w-full transition duration-200">
                            Continue >
                        </button>
                    </div>
                </div>
            `;
            
            if (window.lucide) {
                lucide.createIcons();
            }
        };

        this._reRenderOnboardingStep7 = renderUI;
        renderUI();
    },

    updateStep7State(key, value) {
        this.onboardingStep7State[key] = value;
        if (this._reRenderOnboardingStep7) {
            this._reRenderOnboardingStep7();
        }
    },

    toggleHobby(h) {
        const arr = this.onboardingStep7State.hobbies;
        const index = arr.indexOf(h);
        if (index > -1) {
            arr.splice(index, 1);
        } else {
            arr.push(h);
        }
        if (this._reRenderOnboardingStep7) {
            this._reRenderOnboardingStep7();
        }
    },

    async submitOnboardingStep7() {
        console.log("Submitting step 7:", this.onboardingStep7State);
        
        // Grab latest input text if they didn't blur out of textarea
        const input = document.getElementById('custom-goal-input');
        if (input) this.onboardingStep7State.customGoal = input.value;
        
        const { data, error } = await supabaseClient.auth.updateUser({
            data: {
                accomplishment_category: this.onboardingStep7State.category,
                hobbies_interests: this.onboardingStep7State.hobbies,
                productive_time: this.onboardingStep7State.productiveTime,
                first_personal_goal: this.onboardingStep7State.customGoal
            }
        });

        if (error) {
            console.error("Error updating profile:", error);
            alert("Failed to save data: " + error.message);
        } else {
            console.log("Step 7 updated successfully!");
            App.renderOnboardingStep8();
        }
    },

    // --- ONBOARDING STEP 8: ROUTINE ---

    onboardingStep8State: {
        routine: [
            { id: 1, time: '07:00', name: 'Wake Up', tag: 'Morning', color: 'orange' },
            { id: 2, time: '07:30', name: 'Morning Routine', tag: 'Routine', color: 'teal' },
            { id: 3, time: '08:00', name: 'Breakfast', tag: 'Meal', color: 'green' },
            { id: 4, time: '09:00', name: 'Study / Work', tag: 'Deep work', color: 'blue' },
            { id: 5, time: '13:00', name: 'Lunch', tag: 'Meal', color: 'green' },
            { id: 6, time: '17:30', name: 'Workout', tag: 'Training', color: 'indigo' },
            { id: 7, time: '20:00', name: 'Dinner', tag: 'Meal', color: 'green' },
            { id: 8, time: '22:30', name: 'Wind Down', tag: 'Free time', color: 'fuchsia' },
            { id: 9, time: '23:00', name: 'Sleep', tag: 'Sleep', color: 'purple' }
        ]
    },

    getColorClasses(color) {
        const colors = {
            orange: { dot: 'bg-orange-500', tagBg: 'bg-orange-100', tagText: 'text-orange-600' },
            teal: { dot: 'bg-teal-500', tagBg: 'bg-teal-100', tagText: 'text-teal-700' },
            green: { dot: 'bg-green-500', tagBg: 'bg-green-100', tagText: 'text-green-700' },
            blue: { dot: 'bg-blue-500', tagBg: 'bg-blue-100', tagText: 'text-blue-600' },
            indigo: { dot: 'bg-indigo-900', tagBg: 'bg-indigo-100', tagText: 'text-indigo-800' },
            fuchsia: { dot: 'bg-fuchsia-500', tagBg: 'bg-fuchsia-100', tagText: 'text-fuchsia-600' },
            purple: { dot: 'bg-purple-500', tagBg: 'bg-purple-100', tagText: 'text-purple-600' }
        };
        return colors[color] || colors.blue;
    },

    renderOnboardingStep8() {
        const content = document.getElementById('app-content');
        
        const renderUI = () => {
            const routine = this.onboardingStep8State.routine;
            
            // Find specific times for the dynamic message
            const workoutItem = routine.find(r => r.name.toLowerCase().includes('workout'));
            const focusItem = routine.find(r => r.tag.toLowerCase().includes('deep work'));
            
            const workoutTime = workoutItem ? workoutItem.time : '17:30';
            const focusTime = focusItem ? parseInt(focusItem.time.split(':')[0]) : 9;
            const focusPeriod = focusTime < 12 ? 'morning' : (focusTime < 17 ? 'afternoon' : 'evening');

            content.innerHTML = `
                <div class="flex flex-col h-full bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-40">
                    <div class="max-w-md mx-auto w-full p-6 pb-24 overflow-y-auto h-full">
                        
                        <!-- Header -->
                        <div class="flex items-center gap-4 pt-4 mb-8">
                            <button onclick="App.renderOnboardingStep7()" class="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm text-black">
                                <i data-lucide="chevron-left" class="w-6 h-6"></i>
                            </button>
                            <div class="flex-1">
                                <div class="flex justify-between items-end mb-2 text-sm">
                                    <span class="text-[#2563eb] font-semibold text-xs tracking-wider">STEP 8 OF 8</span>
                                    <span class="text-gray-500 text-xs">100%</span>
                                </div>
                                <div class="w-full bg-black/10 rounded-full h-1">
                                    <div class="bg-[#14b8a6] h-1 rounded-full" style="width: 100%"></div>
                                </div>
                            </div>
                        </div>

                        <h1 class="text-[2rem] leading-tight font-bold text-[#0f172a] drop-shadow-sm mb-4">
                            Shape your daily routine
                        </h1>
                        <p class="text-gray-500 text-[15px] leading-relaxed mb-8">
                            Your coach schedules workouts, meals and focus blocks around this timeline.
                        </p>

                        <!-- Timeline Card -->
                        <div class="bg-white rounded-[2rem] p-6 shadow-sm mb-6">
                            
                            <div class="flex items-center gap-2 text-gray-400 font-semibold text-xs tracking-wider mb-6">
                                <i data-lucide="clock" class="w-4 h-4"></i>
                                <span>A TYPICAL WEEKDAY</span>
                            </div>

                            <div class="relative pl-16 pr-2">
                                <!-- Continuous vertical line -->
                                <div class="absolute left-[88px] top-4 bottom-4 w-px bg-gray-200 -z-0"></div>
                                
                                ${routine.map((item, index) => {
                                    const c = App.getColorClasses(item.color);
                                    return `
                                    <div class="relative flex items-center mb-6 last:mb-0 group">
                                        
                                        <!-- Time Input (Left) -->
                                        <div class="absolute left-[-64px] w-14 z-10 bg-white py-1">
                                            <input type="time" value="${item.time}" 
                                                onchange="App.updateRoutineTime(${index}, this.value)"
                                                class="w-full font-medium text-[15px] text-gray-900 bg-transparent border-none p-0 focus:ring-0 cursor-pointer">
                                        </div>

                                        <!-- Colored Dot on the line -->
                                        <div class="absolute left-[20px] w-2 h-2 rounded-full ${c.dot} z-10 outline outline-4 outline-white"></div>

                                        <!-- Event Card (Right) -->
                                        <div class="flex-1 ml-10 border border-gray-100 rounded-2xl p-4 shadow-sm bg-white relative">
                                            <input type="text" value="${item.name}"
                                                onchange="App.updateRoutineName(${index}, this.value)"
                                                class="font-medium text-gray-900 text-[16px] w-full border-none p-0 focus:ring-0 bg-transparent mb-2 placeholder-gray-300">
                                            
                                            <div class="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold ${c.tagBg} ${c.tagText}">
                                                ${item.tag}
                                            </div>

                                            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-gray-500 pointer-events-none">
                                                <i data-lucide="pencil" class="w-4 h-4"></i>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    `;
                                }).join('')}

                            </div>
                        </div>

                        <!-- Info Message -->
                        <div class="bg-[#eff6ff] rounded-2xl p-5 mb-8 text-[#3b82f6] text-[15px] leading-relaxed shadow-sm">
                            Based on this routine, your coach will place training at <strong>${workoutTime}</strong> and protect a focus block in the <strong>${focusPeriod}</strong>.
                        </div>

                    </div>

                    <!-- Fixed Bottom Bar -->
                    <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-4 pt-6 z-20 flex flex-col items-center">
                        <p class="text-center text-[12px] text-gray-400 mb-4 px-4">
                            Tap any moment to adjust the time or rename it.
                        </p>
                        <button onclick="App.submitOnboardingStep8()" class="bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold text-lg py-4 px-4 rounded-full w-full max-w-sm transition duration-200">
                            See My Targets >
                        </button>
                    </div>
                </div>
            `;
            
            if (window.lucide) {
                lucide.createIcons();
            }
        };

        this._reRenderOnboardingStep8 = renderUI;
        renderUI();
    },

    updateRoutineTime(index, newTime) {
        this.onboardingStep8State.routine[index].time = newTime;
        // Optionally sort by time here if you want it to auto-reorder
        if (this._reRenderOnboardingStep8) this._reRenderOnboardingStep8();
    },

    updateRoutineName(index, newName) {
        this.onboardingStep8State.routine[index].name = newName;
        if (this._reRenderOnboardingStep8) this._reRenderOnboardingStep8();
    },

    async submitOnboardingStep8() {
        console.log("Submitting step 8:", this.onboardingStep8State);
        
        const { data, error } = await supabaseClient.auth.updateUser({
            data: {
                daily_routine: this.onboardingStep8State.routine,
                onboarding_complete: true
            }
        });

        if (error) {
            console.error("Error updating profile:", error);
            alert("Failed to save data: " + error.message);
        } else {
            console.log("Onboarding fully complete!");
            App.renderReport();
        }
    },

    // --- REPORT / TARGETS SCREEN ---

    async renderReport() {
        const content = document.getElementById('app-content');
        
        // Show loading state
        content.innerHTML = `
            <div class="flex h-screen items-center justify-center bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9]">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#14b8a6] border-t-transparent"></div>
            </div>
        `;

        try {
            // Fetch the user data from Supabase
            const { data: { user }, error } = await supabaseClient.auth.getUser();
            
            if (error || !user) throw new Error("Could not fetch user profile.");
            
            const meta = user.user_metadata || {};

            // Extract data for calculations
            let weightKg = meta.weight || 70;
            if (meta.weight_unit === 'lbs') {
                weightKg = weightKg / 2.20462;
            }

            let heightCm = meta.height || 170;
            if (meta.height_unit === 'ft') {
                // assume format "5'10" or similar, or fallback if it's stored as just feet
                // Actually in step 1 we stored it as heightCm directly in the state, wait, no, 
                // in Step 1 if they used ft/in we did: height_cm = (ft * 30.48) + (in * 2.54)
                // So meta.height should already be in cm if we implemented it right, or at least we can check.
                // Let's safely parse.
                heightCm = parseFloat(meta.height) || 170; 
                // if it's small (like 5.8) it might be feet.
                if (heightCm < 10) {
                    heightCm = heightCm * 30.48; // rough conversion if they just typed 5.8
                }
            }

            const age = parseInt(meta.age) || 30;
            const gender = meta.gender || 'Male';
            const goal = meta.primary_goal || 'Maintain Weight';
            const activity = meta.daily_activity_level || 'Moderately Active';
            const mealsPerDayStr = meta.meals_per_day || '4 meals/day';

            // 1. Calculate BMR (Mifflin-St Jeor)
            let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
            bmr = gender === 'Male' ? bmr + 5 : bmr - 161;

            // 2. Activity Multiplier
            let activityMultiplier = 1.2;
            if (activity.includes('Lightly')) activityMultiplier = 1.375;
            if (activity.includes('Moderately')) activityMultiplier = 1.55;
            if (activity.includes('Very')) activityMultiplier = 1.725;
            if (activity.includes('Extremely')) activityMultiplier = 1.9;

            let tdee = bmr * activityMultiplier;

            // 3. Goal Adjustment
            if (goal.includes('Lose')) tdee -= 500;
            else if (goal.includes('Build')) tdee += 300;
            
            const totalCalories = Math.round(tdee);

            // 4. Macros
            // Protein: 2g per kg (or 2.2 for muscle building)
            const proteinGrams = Math.round(weightKg * (goal.includes('Build') ? 2.2 : 2.0));
            // Fat: 0.8g per kg
            const fatGrams = Math.round(weightKg * 0.8);
            // Carbs: Remainder of calories
            const proteinCals = proteinGrams * 4;
            const fatCals = fatGrams * 9;
            const carbCals = totalCalories - proteinCals - fatCals;
            const carbGrams = Math.max(0, Math.round(carbCals / 4)); // ensure not negative

            // 5. Water & Fibre
            const waterLiters = ((weightKg * 35) / 1000).toFixed(1); // 35ml per kg
            const fibreGrams = Math.round((totalCalories / 1000) * 14);

            // Build the UI
            content.innerHTML = `
                <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-40">
                    <div class="max-w-md mx-auto w-full p-6">
                        
                        <div class="pt-8 mb-6">
                            <span class="text-[#2563eb] font-semibold text-xs tracking-widest uppercase mb-2 block">
                                YOUR PLAN, CALCULATED
                            </span>
                            <h1 class="text-[2.2rem] leading-tight font-bold text-[#0f172a] drop-shadow-sm mb-3">
                                Your iKizen Nutrition Target
                            </h1>
                            <p class="text-gray-600 text-[15px] leading-relaxed">
                                Based on your profile, goals, activity level, and preferences.
                            </p>
                        </div>

                        <!-- Big Calories Card -->
                        <div class="bg-[#0f3b57] bg-gradient-to-br from-[#0f2a43] to-[#13617c] rounded-[2rem] p-8 shadow-lg mb-4 flex flex-col items-center relative overflow-hidden">
                            
                            <!-- Circular Progress / Target -->
                            <div class="relative w-48 h-48 mb-6 mt-2 flex items-center justify-center">
                                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#0ea5e9" stroke-width="8" />
                                    <!-- Inner neon glow effect overlay -->
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#22d3ee" stroke-width="8" style="filter: drop-shadow(0 0 4px #06b6d4);" />
                                </svg>
                                <div class="text-center z-10 flex flex-col items-center mt-2">
                                    <span class="text-white text-5xl font-bold tracking-tight mb-1 drop-shadow-md">
                                        ${totalCalories.toLocaleString()}
                                    </span>
                                    <span class="text-gray-300 text-xs font-medium tracking-widest uppercase">
                                        KCAL / DAY
                                    </span>
                                </div>
                            </div>

                            <div class="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-5 py-2.5 text-white/90 text-[13px] font-medium tracking-wide">
                                ${goal} &bull; ${activity}
                            </div>
                        </div>

                        <!-- Macros Row -->
                        <div class="grid grid-cols-3 gap-3 mb-4">
                            <!-- Protein -->
                            <div class="bg-white rounded-[1.5rem] p-4 flex flex-col items-center shadow-sm">
                                <div class="w-16 h-16 rounded-full border-[5px] border-[#3b82f6] flex flex-col items-center justify-center mb-3">
                                    <span class="text-[#0f172a] font-bold text-lg leading-none">${proteinGrams}</span>
                                    <span class="text-gray-400 text-[10px] font-medium">g</span>
                                </div>
                                <span class="text-gray-800 text-[13px] font-semibold">Protein</span>
                            </div>
                            
                            <!-- Carbs -->
                            <div class="bg-white rounded-[1.5rem] p-4 flex flex-col items-center shadow-sm">
                                <div class="w-16 h-16 rounded-full border-[5px] border-[#14b8a6] flex flex-col items-center justify-center mb-3">
                                    <span class="text-[#0f172a] font-bold text-lg leading-none">${carbGrams}</span>
                                    <span class="text-gray-400 text-[10px] font-medium">g</span>
                                </div>
                                <span class="text-gray-800 text-[13px] font-semibold">Carbs</span>
                            </div>

                            <!-- Fat -->
                            <div class="bg-white rounded-[1.5rem] p-4 flex flex-col items-center shadow-sm">
                                <div class="w-16 h-16 rounded-full border-[5px] border-[#a855f7] flex flex-col items-center justify-center mb-3">
                                    <span class="text-[#0f172a] font-bold text-lg leading-none">${fatGrams}</span>
                                    <span class="text-gray-400 text-[10px] font-medium">g</span>
                                </div>
                                <span class="text-gray-800 text-[13px] font-semibold">Fat</span>
                            </div>
                        </div>

                        <!-- List Items -->
                        <div class="flex flex-col gap-3 mb-6">
                            
                            <!-- Water -->
                            <div class="bg-white rounded-[1.5rem] p-4 px-5 flex items-center shadow-sm gap-4">
                                <div class="w-10 h-10 rounded-full bg-[#eff6ff] text-[#3b82f6] flex items-center justify-center shrink-0">
                                    <i data-lucide="droplets" class="w-5 h-5 fill-[#3b82f6]/20"></i>
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-gray-900 font-semibold text-[15px] mb-0.5">Daily water target</h3>
                                    <p class="text-gray-400 text-[13px] leading-snug">Spread across the day, more on training days</p>
                                </div>
                                <div class="font-semibold text-gray-900 text-lg">${waterLiters} L</div>
                            </div>

                            <!-- Fibre -->
                            <div class="bg-white rounded-[1.5rem] p-4 px-5 flex items-center shadow-sm gap-4">
                                <div class="w-10 h-10 rounded-full bg-[#ecfdf5] text-[#10b981] flex items-center justify-center shrink-0">
                                    <i data-lucide="plus-circle" class="w-5 h-5 fill-[#10b981]/20"></i>
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-gray-900 font-semibold text-[15px] mb-0.5">Suggested fibre intake</h3>
                                    <p class="text-gray-400 text-[13px] leading-snug">Supports digestion and fullness</p>
                                </div>
                                <div class="font-semibold text-gray-900 text-lg">${fibreGrams} g</div>
                            </div>

                            <!-- Meal Frequency -->
                            <div class="bg-white rounded-[1.5rem] p-4 px-5 flex items-center shadow-sm gap-4">
                                <div class="w-10 h-10 rounded-full bg-[#faf5ff] text-[#a855f7] flex items-center justify-center shrink-0">
                                    <i data-lucide="target" class="w-5 h-5 fill-[#a855f7]/20"></i>
                                </div>
                                <div class="flex-1">
                                    <h3 class="text-gray-900 font-semibold text-[15px] mb-0.5">Recommended meal frequency</h3>
                                    <p class="text-gray-400 text-[13px] leading-snug">Matches your ${mealsPerDayStr} preference</p>
                                </div>
                                <div class="font-semibold text-gray-900 text-lg">${mealsPerDayStr.charAt(0)}x</div>
                            </div>

                        </div>

                        <!-- Medical Disclaimer Box -->
                        <div class="bg-white/60 rounded-2xl p-4 flex gap-3 shadow-sm border border-white/40 mb-12">
                            <i data-lucide="info" class="text-gray-500 w-5 h-5 shrink-0 mt-0.5 fill-gray-200"></i>
                            <p class="text-[13px] text-gray-600 leading-relaxed">
                                These are estimated wellness targets, not medical prescriptions. iKizen does not replace advice from a doctor or registered dietitian.
                            </p>
                        </div>

                    </div>

                    <!-- Fixed Bottom Bar -->
                    <div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 z-20 flex flex-col items-center gap-4">
                        <button onclick="App.renderDashboard()" class="bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold text-lg py-4 px-4 rounded-full w-full max-w-sm transition duration-200 shadow-md">
                            Build My Meal Plan
                        </button>
                        <button class="text-[#2563eb] font-medium text-[15px] pb-2">
                            Edit My Information
                        </button>
                    </div>
                </div>
            `;

            if (window.lucide) {
                lucide.createIcons();
            }

        } catch (err) {
            console.error(err);
            content.innerHTML = `
                <div class="p-8 text-center mt-20">
                    <h2 class="text-xl font-bold text-red-500 mb-4">Error loading targets</h2>
                    <p class="text-gray-600">${err.message}</p>
                    <button onclick="App.renderOnboardingStep8()" class="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full">Go Back</button>
                </div>
            `;
        }
    },

    // --- DASHBOARD ---

    async renderDashboard() {
        const content = document.getElementById('app-content');
        
        content.innerHTML = `
            <div class="flex h-screen items-center justify-center bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9]">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#14b8a6] border-t-transparent"></div>
            </div>
        `;

        try {
            const { data: { user }, error } = await supabaseClient.auth.getUser();
            if (error || !user) throw new Error("Could not fetch user profile.");
            const meta = user.user_metadata || {};

            // Calculate targets exactly like the report screen
            let weightKg = meta.weight || 70;
            if (meta.weight_unit === 'lbs') weightKg = weightKg / 2.20462;
            let heightCm = parseFloat(meta.height) || 170;
            if (meta.height_unit === 'ft' && heightCm < 10) heightCm = heightCm * 30.48;
            
            const age = parseInt(meta.age) || 30;
            const gender = meta.gender || 'Male';
            const goal = meta.primary_goal || 'Maintain Weight';
            const activity = meta.daily_activity_level || 'Moderately Active';
            const diet = (meta.diet || 'vegetarian').toLowerCase();

            // Pick the correct food table based on diet preference
            let foodTable = 'veg_foods';
            if      (diet.includes('vegan'))                                       foodTable = 'vegan_foods';
            else if (diet.includes('keto'))                                        foodTable = 'keto_foods';
            else if (diet.includes('non-veg') || diet.includes('non_veg'))        foodTable = 'non_veg_foods';

            // Fetch 3 random foods from Supabase
            let dynamicFoods = [
                { name: 'Chicken Breast', cals: 200, p: 40 },
                { name: 'Brown Rice', cals: 215, p: 5 },
                { name: 'Broccoli', cals: 55, p: 4 }
            ];
            try {
                const { data: foodData } = await supabaseClient.from(foodTable).select('name,calories,protein').limit(50);
                if (foodData && foodData.length > 0) {
                    const shuffled = foodData.sort(() => Math.random() - 0.5);
                    dynamicFoods = shuffled.slice(0, 3).map(f => ({
                        name: f.name,
                        cals: f.calories,
                        p: Math.round(parseFloat(f.protein) || 0)
                    }));
                }
            } catch(e) { console.warn('Dashboard food fetch failed', e); }

            // Fetch 2 random exercises from Supabase
            let dynamicWorkouts = [
                { name: 'Squats', desc: '3 sets \u00d7 15 reps' },
                { name: 'Pushups', desc: '3 sets \u00d7 20 reps' }
            ];
            try {
                const { data: exData } = await supabaseClient.from('exercises').select('name,recommended_sets,recommended_reps').limit(50);
                if (exData && exData.length > 0) {
                    const shuffled = exData.sort(() => Math.random() - 0.5);
                    dynamicWorkouts = shuffled.slice(0, 2).map(e => ({
                        name: e.name,
                        desc: `${e.recommended_sets || 3} sets \u00d7 ${e.recommended_reps || 10} reps`
                    }));
                }
            } catch(e) { console.warn('Dashboard exercise fetch failed', e); }

            let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
            bmr = gender === 'Male' ? bmr + 5 : bmr - 161;

            let activityMultiplier = 1.2;
            if (activity.includes('Lightly')) activityMultiplier = 1.375;
            if (activity.includes('Moderately')) activityMultiplier = 1.55;
            if (activity.includes('Very')) activityMultiplier = 1.725;
            if (activity.includes('Extremely')) activityMultiplier = 1.9;

            let tdee = bmr * activityMultiplier;
            if (goal.includes('Lose')) tdee -= 500;
            else if (goal.includes('Build')) tdee += 300;
            
            const totalCalories = Math.round(tdee);
            const proteinGrams = Math.round(weightKg * (goal.includes('Build') ? 2.2 : 2.0));
            const fatGrams = Math.round(weightKg * 0.8);
            const carbCals = totalCalories - (proteinGrams * 4) - (fatGrams * 9);
            const carbGrams = Math.max(0, Math.round(carbCals / 4));

            content.innerHTML = `
                <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-24">
                    <div class="max-w-md mx-auto w-full p-4 pt-8">
                        
                        <!-- Top Targets Card -->
                        <div class="bg-[#0f3b57] bg-gradient-to-br from-[#0f2a43] to-[#13617c] rounded-[2rem] p-6 shadow-lg mb-6 relative overflow-hidden">
                            <div class="text-center mb-4">
                                <span class="text-[#22d3ee] font-semibold text-xs tracking-widest uppercase">
                                    TODAY'S TARGETS
                                </span>
                            </div>
                            
                            <div class="relative w-40 h-40 mx-auto mb-8 mt-2 flex flex-col items-center justify-center">
                                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#0ea5e9" stroke-width="8" />
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#22d3ee" stroke-width="8" style="filter: drop-shadow(0 0 4px #06b6d4);" />
                                </svg>
                                <div class="z-10 flex flex-col items-center text-center">
                                    <i data-lucide="map" class="w-6 h-6 text-white mb-1"></i>
                                    <span class="text-white text-4xl font-bold tracking-tight leading-none mb-1">
                                        ${totalCalories.toLocaleString()}
                                    </span>
                                    <span class="text-gray-300 text-[10px] font-medium tracking-wide">
                                        Kcal Req.
                                    </span>
                                </div>
                            </div>

                            <div class="flex justify-between px-2 pb-2">
                                <div class="text-center">
                                    <div class="text-gray-400 text-xs mb-1">Protein</div>
                                    <div class="text-white text-xl font-semibold">${proteinGrams}g</div>
                                    <div class="w-8 h-[2px] bg-white/20 mx-auto mt-2"></div>
                                </div>
                                <div class="text-center">
                                    <div class="text-gray-400 text-xs mb-1">Carbs</div>
                                    <div class="text-white text-xl font-semibold">${carbGrams}g</div>
                                    <div class="w-8 h-[2px] bg-white/20 mx-auto mt-2"></div>
                                </div>
                                <div class="text-center">
                                    <div class="text-gray-400 text-xs mb-1">Fat</div>
                                    <div class="text-white text-xl font-semibold">${fatGrams}g</div>
                                    <div class="w-8 h-[2px] bg-white/20 mx-auto mt-2"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Daily Progress Header -->
                        <div class="flex justify-between items-end mb-4 px-2">
                            <div>
                                <h2 class="text-gray-900 font-semibold text-xl leading-snug">Daily progress</h2>
                                <p class="text-gray-500 text-sm">Live against today's targets</p>
                            </div>
                            <a href="#" class="text-[#2563eb] font-medium text-sm">Details</a>
                        </div>

                        ${(() => {
                            const foodLog = meta.food_log || [];
                            const eatenCals = foodLog.reduce((sum, f) => sum + (f.cals || 0), 0);
                            const eatenP = foodLog.reduce((sum, f) => sum + (f.p || 0), 0);
                            const eatenC = foodLog.reduce((sum, f) => sum + (f.c || 0), 0);
                            const eatenF = foodLog.reduce((sum, f) => sum + (f.f || 0), 0);

                            const calsPct = Math.min(100, Math.round((eatenCals / totalCalories) * 100)) || 0;
                            const pPct = Math.min(100, Math.round((eatenP / proteinGrams) * 100)) || 0;
                            const cPct = Math.min(100, Math.round((eatenC / carbGrams) * 100)) || 0;
                            const fPct = Math.min(100, Math.round((eatenF / fatGrams) * 100)) || 0;

                            return `
                                <!-- Progress List Card -->
                                <div class="bg-white rounded-[2rem] p-5 shadow-sm mb-6">
                                    
                                    <!-- Calories -->
                                    <div class="flex items-center gap-4 mb-5">
                                        <div class="w-10 h-10 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center shrink-0">
                                            <i data-lucide="map" class="w-5 h-5 fill-orange-400/20"></i>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex justify-between text-[15px] mb-1">
                                                <span class="font-semibold text-gray-900">Calories</span>
                                                <span class="text-gray-400 font-medium text-sm">${eatenCals.toLocaleString()} / ${totalCalories.toLocaleString()} kcal</span>
                                            </div>
                                            <div class="w-full bg-gray-200 rounded-full h-1">
                                                <div class="bg-orange-400 h-1 rounded-full transition-all duration-500" style="width: ${calsPct}%"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Protein -->
                                    <div class="flex items-center gap-4 mb-5">
                                        <div class="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                                            <i data-lucide="layout-list" class="w-5 h-5 fill-green-500/20"></i>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex justify-between text-[15px] mb-1">
                                                <span class="font-semibold text-gray-900">Protein</span>
                                                <span class="text-gray-400 font-medium text-sm">${eatenP} / ${proteinGrams} g</span>
                                            </div>
                                            <div class="w-full bg-gray-200 rounded-full h-1">
                                                <div class="bg-green-500 h-1 rounded-full transition-all duration-500" style="width: ${pPct}%"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Carbs -->
                                    <div class="flex items-center gap-4 mb-5">
                                        <div class="w-10 h-10 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center shrink-0">
                                            <i data-lucide="crop" class="w-5 h-5 fill-orange-400/20"></i>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex justify-between text-[15px] mb-1">
                                                <span class="font-semibold text-gray-900">Carbs</span>
                                                <span class="text-gray-400 font-medium text-sm">${eatenC} / ${carbGrams} g</span>
                                            </div>
                                            <div class="w-full bg-gray-200 rounded-full h-1">
                                                <div class="bg-orange-400 h-1 rounded-full transition-all duration-500" style="width: ${cPct}%"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Fat -->
                                    <div class="flex items-center gap-4 mb-2">
                                        <div class="w-10 h-10 rounded-full bg-pink-50 text-pink-400 flex items-center justify-center shrink-0">
                                            <i data-lucide="align-justify" class="w-5 h-5 fill-pink-400/20"></i>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex justify-between text-[15px] mb-1">
                                                <span class="font-semibold text-gray-900">Fat</span>
                                                <span class="text-gray-400 font-medium text-sm">${eatenF} / ${fatGrams} g</span>
                                            </div>
                                            <div class="w-full bg-gray-200 rounded-full h-1">
                                                <div class="bg-pink-400 h-1 rounded-full transition-all duration-500" style="width: ${fPct}%"></div>
                                            </div>
                                        </div>
                                    </div>
                            `;
                        })()}

                            <hr class="border-gray-100 my-6">

                            <!-- Recommended for You -->
                            <div>
                                <h2 class="text-gray-900 font-semibold text-xl leading-snug">Recommended for You</h2>
                                <p class="text-gray-500 text-sm mb-4">Based on your profile, goals, and diet</p>

                                <a href="#" class="text-[#2563eb] font-medium text-sm mb-3 block">Suggested Meals</a>
                                <div class="flex overflow-x-auto gap-3 pb-4 snap-x no-scrollbar">
                                    ${dynamicFoods.map((food, i) => `
                                        <div onclick="App.renderFoodLog('${food.name}')" class="cursor-pointer hover:bg-gray-50 transition bg-white border border-gray-100 shadow-sm rounded-xl p-3 min-w-[140px] snap-start shrink-0">
                                            <h4 class="font-semibold text-gray-900">${food.name}</h4>
                                            <p class="text-xs text-gray-500 mt-1">${food.cals} kcal &bull; ${food.p}g pro</p>
                                        </div>
                                    `).join('')}
                                </div>

                                <a href="#" class="text-orange-500 font-medium text-sm mb-3 block mt-2">Suggested Exercises</a>
                                <div class="flex overflow-x-auto gap-3 pb-2 snap-x no-scrollbar">
                                    ${dynamicWorkouts.map((workout, i) => `
                                    <div onclick="App.renderWorkoutLog('${workout.name}')" class="cursor-pointer hover:bg-gray-50 transition bg-white border border-gray-100 shadow-sm rounded-xl p-3 min-w-[140px] snap-start shrink-0">
                                        <h4 class="font-semibold text-gray-900">${workout.name}</h4>
                                        <p class="text-xs text-gray-500 mt-1">${workout.desc}</p>
                                    </div>
                                `).join('')}
                                </div>

                            </div>
                        </div>

                    </div>

                    <!-- Bottom Navigation Bar -->
                    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center z-30 pb-safe">
                        <button onclick="App.renderDashboard()" class="flex flex-col items-center gap-1 text-[#3b82f6]">
                            <div class="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center">
                                <i data-lucide="target" class="w-6 h-6 fill-[#3b82f6]/20"></i>
                            </div>
                            <span class="text-[10px] font-medium">Home</span>
                        </button>
                        <button onclick="App.renderWorkoutLog()" class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">
                            <i data-lucide="split" class="w-6 h-6 fill-gray-200 rotate-90"></i>
                            <span class="text-[10px] font-medium mt-0.5">Exercises</span>
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
                    
                    <style>
                        .no-scrollbar::-webkit-scrollbar { display: none; }
                        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 16px); }
                    </style>
                </div>
            `;

            if (window.lucide) {
                lucide.createIcons();
            }

        } catch (err) {
            console.error(err);
            content.innerHTML = `
                <div class="p-8 text-center mt-20">
                    <h2 class="text-xl font-bold text-red-500 mb-4">Error loading dashboard</h2>
                    <p class="text-gray-600">${err.message}</p>
                    <button onclick="App.renderReport()" class="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full">Go Back</button>
                </div>
            `;
        }
    },

    // --- FOOD LOG SCREEN ---

    foodLogState: {
        log: [],
        searchQuery: '',
        database: [
            { id: 911, name: "Tofu", cals: 120, p: 14, c: 3, f: 7 },
            { id: 912, name: "Lentils", cals: 230, p: 18, c: 40, f: 1 },
            { id: 913, name: "Quinoa", cals: 222, p: 8, c: 39, f: 4 },
            { id: 914, name: "Avocado", cals: 240, p: 3, c: 12, f: 22 },
            { id: 915, name: "Salmon", cals: 206, p: 22, c: 0, f: 12 },
            { id: 916, name: "Almonds", cals: 164, p: 6, c: 6, f: 14 },
            
            { id: 901, name: "Chicken Breast", cals: 200, p: 40, c: 0, f: 4 },
            { id: 902, name: "Brown Rice", cals: 215, p: 5, c: 45, f: 2 },
            { id: 903, name: "Broccoli", cals: 55, p: 4, c: 11, f: 0 },
            { id: 1, name: "Baked Tempeh", cals: 223, p: 20, c: 8, f: 11 },
            { id: 2, name: "Baked Oats", cals: 382, p: 17, c: 70, f: 8 },
            { id: 3, name: "Roasted Tempeh", cals: 230, p: 22, c: 8, f: 12 },
            { id: 4, name: "Crispy Paneer", cals: 344, p: 17, c: 4, f: 23 },
            { id: 5, name: "Grilled Edamame", cals: 136, p: 12, c: 9, f: 6 },
            { id: 6, name: "Grilled Meatballs", cals: 231, p: 17, c: 11, f: 15 },
            { id: 7, name: "Boiled Lobster", cals: 103, p: 18, c: 0, f: 1 },
            { id: 8, name: "Pan-seared Avocado", cals: 179, p: 2, c: 8, f: 17 },
            { id: 9, name: "Quinoa Salad", cals: 220, p: 8, c: 39, f: 4 },
            { id: 10, name: "Grilled Chicken Wing", cals: 216, p: 33, c: 0, f: 7 },
            { id: 11, name: "Roasted Tomato", cals: 21, p: 1, c: 4, f: 0 }
        ]
    },

    async renderFoodLog(prefillQuery = '') {
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
    },


    updateFoodSearch(query) {
        this.foodLogState.searchQuery = query;
        if (this._reRenderFoodLog) this._reRenderFoodLog();
        const input = document.getElementById('food-search-input');
        if (input) {
            input.focus();
            const val = input.value;
            input.value = '';
            input.value = val;
        }
    },

    async addFoodLog(food) {
        // Deep copy the food object to prevent reference issues
        this.foodLogState.log.push(JSON.parse(JSON.stringify(food)));
        if (this._reRenderFoodLog) this._reRenderFoodLog();
        await this.syncFoodLogToSupabase();
    },

    async deleteFoodLog(index) {
        this.foodLogState.log.splice(index, 1);
        if (this._reRenderFoodLog) this._reRenderFoodLog();
        await this.syncFoodLogToSupabase();
    },

    async syncFoodLogToSupabase() {
        const { data, error } = await supabaseClient.auth.updateUser({
            data: {
                food_log: this.foodLogState.log
            }
        });
        if (error) {
            console.error("Failed to sync food log:", error);
        }
    },

    // --- WORKOUT LOG SCREEN ---

    workoutLogState: {
        log: [],
        searchQuery: '',
        database: [
            { id: 911, name: "Running", sets: 1, reps: 30, kcalMin: 12 },
            { id: 912, name: "Jump Rope", sets: 3, reps: 10, kcalMin: 15 },
            { id: 913, name: "Bench Press", sets: 3, reps: 10, kcalMin: 7 },
            { id: 914, name: "Cycling", sets: 1, reps: 45, kcalMin: 10 },
            { id: 915, name: "Burpees", sets: 3, reps: 15, kcalMin: 12 },
            { id: 916, name: "Squats", sets: 3, reps: 15, kcalMin: 6 },
            { id: 917, name: "Pushups", sets: 3, reps: 20, kcalMin: 5 },
            
            { id: 901, name: "Deadlift", sets: 3, reps: 10, kcalMin: 8 },
            { id: 902, name: "Lunges", sets: 3, reps: 12, kcalMin: 6 },
            { id: 1, name: "Isometric Lateral Raises", sets: 3, reps: 10, kcalMin: 16 },
            { id: 2, name: "Decline Leg Press", sets: 3, reps: 10, kcalMin: 16 },
            { id: 3, name: "Banded Battle Ropes", sets: 3, reps: 10, kcalMin: 16 },
            { id: 4, name: "Incline Box Jumps", sets: 3, reps: 10, kcalMin: 15 },
            { id: 5, name: "Decline Overhead Press", sets: 3, reps: 10, kcalMin: 16 },
            { id: 6, name: "Banded Crunch", sets: 3, reps: 10, kcalMin: 8 },
            { id: 7, name: "Incline Squats", sets: 3, reps: 10, kcalMin: 14 },
            { id: 8, name: "Banded Box Jumps", sets: 3, reps: 10, kcalMin: 5 },
            { id: 9, name: "Single-leg Jumping Jacks", sets: 3, reps: 10, kcalMin: 16 },
            { id: 10, name: "Banded Tricep Dips", sets: 3, reps: 10, kcalMin: 16 },
            { id: 11, name: "Weighted Bicep Curls", sets: 3, reps: 10, kcalMin: 16 },
            { id: 12, name: "Lunges", sets: 3, reps: 10, kcalMin: 5 },
            { id: 13, name: "Isometric Stair Climber", sets: 3, reps: 10, kcalMin: 13 }
        ]
    },

    async renderWorkoutLog(prefillQuery = '') {
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
    },

    updateWorkoutSearch(query) {
        this.workoutLogState.searchQuery = query;
        if (this._reRenderWorkoutLog) this._reRenderWorkoutLog();
        const input = document.getElementById('workout-search-input');
        if (input) {
            input.focus();
            const val = input.value;
            input.value = '';
            input.value = val;
        }
    },

    async addWorkoutLog(workout) {
        // Deep copy the workout object to prevent reference issues
        this.workoutLogState.log.push(JSON.parse(JSON.stringify(workout)));
        if (this._reRenderWorkoutLog) this._reRenderWorkoutLog();
        await this.syncWorkoutLogToSupabase();
    },

    async deleteWorkoutLog(index) {
        this.workoutLogState.log.splice(index, 1);
        if (this._reRenderWorkoutLog) this._reRenderWorkoutLog();
        await this.syncWorkoutLogToSupabase();
    },

    async syncWorkoutLogToSupabase() {
        const { data, error } = await supabaseClient.auth.updateUser({
            data: {
                workout_log: this.workoutLogState.log
            }
        });
        if (error) {
            console.error("Failed to sync workout log:", error);
        }
    },

    // --- MOOD SCREEN & MINDFULNESS AUDIO PLAYER ---

    moodState: {
        currentMood: null,
        toastVisible: false,
        toastTimeout: null,
        activeMeditation: null,
        isPlaying: false,
        progressSeconds: 0,
        totalSeconds: 600,
        soundscape: 'zen', // 'zen' | 'ocean' | 'rain' | 'binaural'
        volume: 0.7,
        _audioContext: null,
        _audioNodes: [],
        _timerInterval: null,
        _chimeInterval: null
    },

    formatMeditationTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    },

    toggleMeditation(title, durationStr, desc) {
        const state = this.moodState;
        if (state.activeMeditation && state.activeMeditation.title === title) {
            this.togglePlayPauseMeditation();
        } else {
            this.startMeditation(title, durationStr, desc);
        }
    },

    startMeditation(title, durationStr, desc) {
        const state = this.moodState;
        const mins = parseInt(durationStr) || 10;
        state.totalSeconds = mins * 60;
        state.progressSeconds = 0;
        state.activeMeditation = { title, duration: durationStr, desc };
        state.isPlaying = true;

        this.startAmbientAudio(state.soundscape);
        this.startMeditationTimer();
        if (this._reRenderMood) this._reRenderMood();
    },

    togglePlayPauseMeditation() {
        const state = this.moodState;
        if (!state.activeMeditation) return;

        state.isPlaying = !state.isPlaying;
        if (state.isPlaying) {
            if (state._audioContext && state._audioContext.state === 'suspended') {
                state._audioContext.resume();
            } else {
                this.startAmbientAudio(state.soundscape);
            }
            this.startMeditationTimer();
        } else {
            if (state._audioContext && state._audioContext.state === 'running') {
                state._audioContext.suspend();
            }
            if (state._timerInterval) clearInterval(state._timerInterval);
        }
        if (this._reRenderMood) this._reRenderMood();
    },

    stopMeditation() {
        const state = this.moodState;
        state.isPlaying = false;
        state.activeMeditation = null;
        state.progressSeconds = 0;
        if (state._timerInterval) {
            clearInterval(state._timerInterval);
            state._timerInterval = null;
        }
        this.stopAmbientAudio();
        if (this._reRenderMood) this._reRenderMood();
    },

    setSoundscape(soundscapeType) {
        this.moodState.soundscape = soundscapeType;
        if (this.moodState.isPlaying) {
            this.startAmbientAudio(soundscapeType);
        }
        if (this._reRenderMood) this._reRenderMood();
    },

    seekMeditation(deltaSeconds) {
        const state = this.moodState;
        state.progressSeconds = Math.max(0, Math.min(state.totalSeconds, state.progressSeconds + deltaSeconds));
        if (this._reRenderMood) this._reRenderMood();
    },

    handleSeekProgress(event) {
        const state = this.moodState;
        const rect = event.currentTarget.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, clickX / rect.width));
        state.progressSeconds = Math.floor(ratio * state.totalSeconds);
        if (this._reRenderMood) this._reRenderMood();
    },

    startMeditationTimer() {
        const state = this.moodState;
        if (state._timerInterval) clearInterval(state._timerInterval);
        state._timerInterval = setInterval(() => {
            if (state.isPlaying) {
                state.progressSeconds++;
                if (state.progressSeconds >= state.totalSeconds) {
                    this.stopMeditation();
                } else {
                    if (this._reRenderMood) this._reRenderMood();
                }
            }
        }, 1000);
    },

    startAmbientAudio(soundscape = 'zen') {
        this.stopAmbientAudio();
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            this.moodState._audioContext = ctx;
            this.moodState._audioNodes = [];

            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(this.moodState.volume || 0.65, ctx.currentTime);
            masterGain.connect(ctx.destination);
            this.moodState._masterGain = masterGain;

            if (soundscape === 'ocean' || soundscape === 'rain') {
                const bufferSize = ctx.sampleRate * 2.5;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                let lastOut = 0.0;
                for (let i = 0; i < bufferSize; i++) {
                    const white = Math.random() * 2 - 1;
                    data[i] = (lastOut + (0.02 * white)) / 1.02;
                    lastOut = data[i];
                    data[i] *= 3.2;
                }

                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                noise.loop = true;

                if (soundscape === 'ocean') {
                    const filter = ctx.createBiquadFilter();
                    filter.type = 'bandpass';
                    filter.frequency.setValueAtTime(320, ctx.currentTime);
                    filter.Q.setValueAtTime(1.8, ctx.currentTime);

                    const swellGain = ctx.createGain();
                    swellGain.gain.setValueAtTime(0.25, ctx.currentTime);

                    const lfo = ctx.createOscillator();
                    lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
                    const lfoGain = ctx.createGain();
                    lfoGain.gain.setValueAtTime(0.35, ctx.currentTime);

                    lfo.connect(lfoGain);
                    lfoGain.connect(swellGain.gain);

                    noise.connect(filter);
                    filter.connect(swellGain);
                    swellGain.connect(masterGain);

                    lfo.start();
                    noise.start();
                    this.moodState._audioNodes.push(noise, lfo, filter, swellGain, lfoGain);
                } else {
                    const filter = ctx.createBiquadFilter();
                    filter.type = 'bandpass';
                    filter.frequency.setValueAtTime(1400, ctx.currentTime);
                    filter.Q.setValueAtTime(0.7, ctx.currentTime);

                    const rainGain = ctx.createGain();
                    rainGain.gain.setValueAtTime(0.35, ctx.currentTime);

                    noise.connect(filter);
                    filter.connect(rainGain);
                    rainGain.connect(masterGain);

                    noise.start();
                    this.moodState._audioNodes.push(noise, filter, rainGain);
                }
            } else if (soundscape === 'binaural') {
                const merger = ctx.createChannelMerger(2);
                
                const oscL = ctx.createOscillator();
                oscL.type = 'sine';
                oscL.frequency.setValueAtTime(216, ctx.currentTime);
                const gainL = ctx.createGain();
                gainL.gain.setValueAtTime(0.28, ctx.currentTime);
                oscL.connect(gainL);
                gainL.connect(merger, 0, 0);

                const oscR = ctx.createOscillator();
                oscR.type = 'sine';
                oscR.frequency.setValueAtTime(224, ctx.currentTime);
                const gainR = ctx.createGain();
                gainR.gain.setValueAtTime(0.28, ctx.currentTime);
                oscR.connect(gainR);
                gainR.connect(merger, 0, 1);

                merger.connect(masterGain);
                oscL.start();
                oscR.start();
                this.moodState._audioNodes.push(oscL, oscR, gainL, gainR, merger);
            } else {
                // Zen 432Hz Harmonic drone + Tibetan singing bowls
                const baseFreqs = [108, 216, 432, 528];
                baseFreqs.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
                    osc.frequency.setValueAtTime(freq, ctx.currentTime);

                    const oscGain = ctx.createGain();
                    const baseVol = 0.22 / (idx + 1);
                    oscGain.gain.setValueAtTime(baseVol, ctx.currentTime);

                    const lfo = ctx.createOscillator();
                    lfo.frequency.setValueAtTime(0.07 + (idx * 0.02), ctx.currentTime);
                    const lfoGain = ctx.createGain();
                    lfoGain.gain.setValueAtTime(baseVol * 0.35, ctx.currentTime);
                    lfo.connect(lfoGain);
                    lfoGain.connect(oscGain.gain);

                    osc.connect(oscGain);
                    oscGain.connect(masterGain);

                    osc.start();
                    lfo.start();
                    this.moodState._audioNodes.push(osc, oscGain, lfo, lfoGain);
                });

                const playChime = () => {
                    if (!this.moodState.isPlaying || !this.moodState._audioContext) return;
                    const t = this.moodState._audioContext.currentTime;
                    const chimeOsc = this.moodState._audioContext.createOscillator();
                    chimeOsc.type = 'sine';
                    chimeOsc.frequency.setValueAtTime(528, t);
                    chimeOsc.frequency.exponentialRampToValueAtTime(432, t + 4.0);

                    const chimeGain = this.moodState._audioContext.createGain();
                    chimeGain.gain.setValueAtTime(0.001, t);
                    chimeGain.gain.exponentialRampToValueAtTime(0.18, t + 0.1);
                    chimeGain.gain.exponentialRampToValueAtTime(0.0001, t + 4.8);

                    chimeOsc.connect(chimeGain);
                    chimeGain.connect(masterGain);

                    chimeOsc.start(t);
                    chimeOsc.stop(t + 5.0);
                };

                this.moodState._chimeInterval = setInterval(playChime, 12000);
                setTimeout(playChime, 400);
            }
        } catch(e) {
            console.warn("Audio playback init note:", e);
        }
    },

    stopAmbientAudio() {
        const state = this.moodState;
        if (state._chimeInterval) {
            clearInterval(state._chimeInterval);
            state._chimeInterval = null;
        }
        if (state._audioNodes && state._audioNodes.length > 0) {
            state._audioNodes.forEach(node => {
                try { if (node.stop) node.stop(); } catch(e) {}
                try { if (node.disconnect) node.disconnect(); } catch(e) {}
            });
            state._audioNodes = [];
        }
        if (state._audioContext) {
            try { state._audioContext.close(); } catch(e) {}
            state._audioContext = null;
        }
    },

    async renderMood() {
        const content = document.getElementById('app-content');
        
        // Check if mood was already logged today
        if (!this.moodState.currentMood) {
            const { data: { user } } = await supabaseClient.auth.getUser();
            if (user && user.user_metadata && user.user_metadata.mood_log) {
                this.moodState.currentMood = user.user_metadata.mood_log;
            }
        }

        const renderUI = () => {
            const state = this.moodState;
            
            const moods = [
                { id: 'Anxious', emoji: '😖' },
                { id: 'Sad', emoji: '😔' },
                { id: 'Neutral', emoji: '😐' },
                { id: 'Calm', emoji: '😌' },
                { id: 'Happy', emoji: '😄' }
            ];

            const meditations = {
                'Anxious': [
                    { title: 'Deep Breathing', duration: '10 Min', desc: 'A quick breathing exercise to center yourself.' },
                    { title: 'Anxiety Relief', duration: '15 Min', desc: 'Guided meditation to help calm racing thoughts.' },
                    { title: 'Body Scan', duration: '12 Min', desc: 'Release physical tension associated with anxiety.' }
                ],
                'Sad': [
                    { title: 'Self-Compassion', duration: '15 Min', desc: 'Be kind to yourself during difficult moments.' },
                    { title: 'Uplifting Affirmations', duration: '5 Min', desc: 'Gentle words to lift your spirits.' }
                ],
                'Neutral': [
                    { title: 'Focus & Clarity', duration: '10 Min', desc: 'Clear your mind to improve concentration.' },
                    { title: 'Deep Breathing', duration: '10 Min', desc: 'A quick breathing exercise to center yourself.' }
                ],
                'Calm': [
                    { title: 'Sleep Wind Down', duration: '20 Min', desc: 'Relax your body and prepare for a restful sleep.' },
                    { title: 'Gratitude Journaling', duration: '10 Min', desc: 'Reflect on the peaceful moments.' }
                ],
                'Happy': [
                    { title: 'Morning Motivation', duration: '5 Min', desc: 'Start your day with positive energy and intention.' },
                    { title: 'Joyful Visualization', duration: '10 Min', desc: 'Amplify your positive feelings.' }
                ]
            };

            const selectedMeditations = state.currentMood ? meditations[state.currentMood] : meditations['Neutral'];

            content.innerHTML = `
                <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-28">
                    <div class="max-w-md mx-auto w-full p-4 pt-10 overflow-y-auto h-full pb-36">
                        
                        <!-- Header -->
                        <div class="flex justify-between items-center mb-1">
                            <h1 class="text-3xl font-bold text-[#0f172a]">Mental Wellness</h1>
                            <button onclick="App.renderDashboard()" class="text-gray-500 hover:text-gray-700">
                                <i data-lucide="undo-2" class="w-6 h-6"></i>
                            </button>
                        </div>
                        <p class="text-gray-500 text-sm mb-8">Check in with yourself today</p>

                        <!-- Mood Selector -->
                        <div class="bg-white rounded-[2rem] p-6 shadow-sm mb-8">
                            <h2 class="text-[1.35rem] font-medium text-gray-900 mb-6">How are you feeling?</h2>
                            <div class="flex justify-between items-center px-1">
                                ${moods.map(mood => {
                                    const isSelected = state.currentMood === mood.id;
                                    return `
                                        <button onclick="App.logMood('${mood.id}')" class="flex flex-col items-center gap-2 group outline-none">
                                            <div class="w-[52px] h-[52px] flex items-center justify-center text-4xl rounded-2xl transition-all duration-200 
                                                ${isSelected ? 'border-2 border-[#3b82f6] shadow-sm bg-blue-50' : 'border-2 border-transparent group-hover:bg-gray-50'}">
                                                ${mood.emoji}
                                            </div>
                                            <span class="text-[11px] font-medium transition-colors duration-200 ${isSelected ? 'text-[#3b82f6]' : 'text-gray-400 group-hover:text-gray-600'}">
                                                ${mood.id}
                                            </span>
                                        </button>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                        <!-- Recommendations -->
                        <div>
                            <div class="flex justify-between items-end mb-1">
                                <h2 class="text-xl font-medium text-gray-900">Mindfulness & Meditation</h2>
                                ${state.isPlaying ? `
                                    <span class="text-xs text-blue-600 font-semibold flex items-center gap-1.5 animate-pulse">
                                        <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                                        Playing Audio
                                    </span>
                                ` : ''}
                            </div>
                            <p class="text-gray-500 text-[13px] mb-4">Curated content to help you relax</p>
                            
                            <div class="flex flex-col gap-3">
                                ${selectedMeditations.map(med => {
                                    const isThisPlaying = state.isPlaying && state.activeMeditation && state.activeMeditation.title === med.title;
                                    const isThisActive = state.activeMeditation && state.activeMeditation.title === med.title;

                                    return `
                                        <div onclick="App.toggleMeditation('${med.title.replace(/'/g, "\\'")}', '${med.duration}', '${med.desc.replace(/'/g, "\\'")}')" 
                                            class="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-md transition border-2 ${isThisActive ? 'border-[#3b82f6] bg-blue-50/40' : 'border-transparent'}">
                                            <div class="pr-4 flex-1">
                                                <div class="flex items-center gap-2 mb-1">
                                                    <h3 class="font-bold text-gray-900 text-[15px]">${med.title}</h3>
                                                    ${isThisPlaying ? `
                                                        <span class="bg-blue-100 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">LIVE</span>
                                                    ` : ''}
                                                </div>
                                                <p class="text-gray-500 text-[12px] leading-relaxed">
                                                    <span class="text-blue-600 font-semibold">${med.duration}</span> <span class="text-gray-300">|</span> ${med.desc}
                                                </p>
                                            </div>
                                            <button onclick="event.stopPropagation(); App.toggleMeditation('${med.title.replace(/'/g, "\\'")}', '${med.duration}', '${med.desc.replace(/'/g, "\\'")}')" 
                                                class="w-10 h-10 rounded-full ${isThisPlaying ? 'bg-blue-600 text-white shadow-md shadow-blue-500/40' : 'bg-blue-50 text-[#3b82f6] hover:bg-blue-100'} flex items-center justify-center shrink-0 hover:scale-105 transition">
                                                <i data-lucide="${isThisPlaying ? 'pause' : 'play'}" class="w-4 h-4 ${isThisPlaying ? 'fill-white text-white' : 'fill-[#3b82f6] text-[#3b82f6] ml-0.5'}"></i>
                                            </button>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                    </div>

                    <!-- Floating Meditation Player Bar -->
                    ${state.activeMeditation ? `
                        <div class="fixed bottom-16 left-4 right-4 max-w-md mx-auto bg-gradient-to-r from-[#0c2a4d] via-[#104b68] to-[#0d6e80] text-white rounded-2xl p-4 shadow-2xl border border-teal-400/20 z-40 backdrop-blur-lg">
                            <div class="flex items-center justify-between gap-3 mb-2.5">
                                <div class="flex items-center gap-2.5 overflow-hidden">
                                    <div class="w-9 h-9 rounded-xl bg-teal-400/20 border border-teal-300/30 flex items-center justify-center shrink-0 ${state.isPlaying ? 'animate-pulse' : ''}">
                                        <i data-lucide="${state.isPlaying ? 'volume-2' : 'volume-x'}" class="w-4 h-4 text-teal-300"></i>
                                    </div>
                                    <div class="truncate">
                                        <div class="flex items-center gap-1.5">
                                            <h4 class="font-bold text-xs truncate text-white">${state.activeMeditation.title}</h4>
                                            <span class="bg-teal-400/20 text-teal-300 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">${state.soundscape}</span>
                                        </div>
                                        <p class="text-[11px] text-teal-100/70 truncate">${state.activeMeditation.desc}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2 shrink-0">
                                    <button onclick="App.togglePlayPauseMeditation()" class="w-8 h-8 rounded-full bg-teal-400 text-gray-900 flex items-center justify-center shadow hover:scale-105 transition font-bold">
                                        <i data-lucide="${state.isPlaying ? 'pause' : 'play'}" class="w-3.5 h-3.5 fill-current"></i>
                                    </button>
                                    <button onclick="App.stopMeditation()" class="w-7 h-7 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center hover:bg-white/20 transition">
                                        <i data-lucide="x" class="w-3.5 h-3.5"></i>
                                    </button>
                                </div>
                            </div>

                            <!-- Progress Bar -->
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-[10px] font-mono text-teal-200">${this.formatMeditationTime(state.progressSeconds)}</span>
                                <div class="flex-1 bg-white/20 h-1.5 rounded-full overflow-hidden relative cursor-pointer" onclick="App.handleSeekProgress(event)">
                                    <div class="bg-gradient-to-r from-[#2dd4bf] to-[#38bdf8] h-full rounded-full transition-all duration-200" style="width: ${(state.progressSeconds / Math.max(1, state.totalSeconds)) * 100}%"></div>
                                </div>
                                <span class="text-[10px] font-mono text-teal-200">${this.formatMeditationTime(state.totalSeconds)}</span>
                            </div>

                            <!-- Ambient Soundscape Switcher -->
                            <div class="flex items-center justify-between pt-1.5 border-t border-white/10">
                                <span class="text-[9px] font-bold text-teal-200 uppercase tracking-wider">Soundscape:</span>
                                <div class="flex items-center gap-1">
                                    <button onclick="App.setSoundscape('zen')" class="px-2 py-0.5 rounded text-[9px] font-medium transition ${state.soundscape === 'zen' ? 'bg-teal-400 text-gray-900 font-bold' : 'bg-white/10 text-gray-300 hover:bg-white/20'}">🧘 Zen 432Hz</button>
                                    <button onclick="App.setSoundscape('ocean')" class="px-2 py-0.5 rounded text-[9px] font-medium transition ${state.soundscape === 'ocean' ? 'bg-teal-400 text-gray-900 font-bold' : 'bg-white/10 text-gray-300 hover:bg-white/20'}">🌊 Waves</button>
                                    <button onclick="App.setSoundscape('rain')" class="px-2 py-0.5 rounded text-[9px] font-medium transition ${state.soundscape === 'rain' ? 'bg-teal-400 text-gray-900 font-bold' : 'bg-white/10 text-gray-300 hover:bg-white/20'}">🌧️ Rain</button>
                                    <button onclick="App.setSoundscape('binaural')" class="px-2 py-0.5 rounded text-[9px] font-medium transition ${state.soundscape === 'binaural' ? 'bg-teal-400 text-gray-900 font-bold' : 'bg-white/10 text-gray-300 hover:bg-white/20'}">🍃 Alpha</button>
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Toast Notification -->
                    <div class="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white rounded-full px-5 py-3 shadow-lg flex items-center gap-3 z-40 transition-all duration-300 ${state.toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}">
                        <div class="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                            <i data-lucide="activity" class="w-3.5 h-3.5 text-white"></i>
                        </div>
                        <span class="font-medium text-gray-900 text-sm whitespace-nowrap">Mood logged: ${state.currentMood}</span>
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
                        <button onclick="App.renderFoodLog()" class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">
                            <i data-lucide="layout-list" class="w-6 h-6 fill-gray-200"></i>
                            <span class="text-[10px] font-medium mt-0.5">Food</span>
                        </button>
                        <button class="flex flex-col items-center gap-1 text-[#3b82f6]">
                            <div class="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center">
                                <i data-lucide="eye" class="w-6 h-6 fill-[#3b82f6]/20"></i>
                            </div>
                            <span class="text-[10px] font-medium">Mood</span>
                        </button>
                        <button onclick="App.renderSettings()" class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">
                            <i data-lucide="wrench" class="w-6 h-6 fill-gray-200"></i>
                            <span class="text-[10px] font-medium mt-0.5">Settings</span>
                        </button>
                    </div>
                </div>
            `;

            if (window.lucide) {
                lucide.createIcons();
            }
        };

        this._reRenderMood = renderUI;
        renderUI();
    },

    async logMood(moodId) {
        this.moodState.currentMood = moodId;
        
        // Handle Toast Animation
        this.moodState.toastVisible = true;
        if (this.moodState.toastTimeout) clearTimeout(this.moodState.toastTimeout);
        
        // Re-render immediately to show toast and updated content
        if (this._reRenderMood) this._reRenderMood();
        
        // Hide toast after 3 seconds
        this.moodState.toastTimeout = setTimeout(() => {
            this.moodState.toastVisible = false;
            if (this._reRenderMood) this._reRenderMood();
        }, 3000);

        // Sync to backend
        const { error } = await supabaseClient.auth.updateUser({
            data: { mood_log: moodId }
        });
        if (error) console.error("Failed to sync mood:", error);
    },

    // --- SETTINGS SCREENS ---

    renderSettings() {
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-24">
                <div class="max-w-md mx-auto w-full p-4 pt-10 overflow-y-auto h-full pb-32">
                    
                    <!-- Header -->
                    <div class="flex justify-between items-center mb-8">
                        <h1 class="text-3xl font-bold text-[#0f172a]">Settings</h1>
                        <button onclick="App.renderDashboard()" class="text-gray-500 hover:text-gray-700">
                            <i data-lucide="undo-2" class="w-6 h-6"></i>
                        </button>
                    </div>

                    <!-- Menu List -->
                    <div class="flex flex-col gap-3">
                        <button onclick="App.renderEditProfile()" class="bg-white rounded-2xl p-5 flex justify-between items-center shadow-sm hover:bg-gray-50 transition">
                            <span class="text-gray-900 font-medium text-[16px]">Profile</span>
                            <i data-lucide="chevron-right" class="w-5 h-5 text-gray-300"></i>
                        </button>
                        
                        <button onclick="App.renderChangePassword()" class="bg-white rounded-2xl p-5 flex justify-between items-center shadow-sm hover:bg-gray-50 transition">
                            <span class="text-gray-900 font-medium text-[16px]">Change Password</span>
                            <i data-lucide="chevron-right" class="w-5 h-5 text-gray-300"></i>
                        </button>

                        <button onclick="App.renderPrivacyPolicy()" class="bg-white rounded-2xl p-5 flex justify-between items-center shadow-sm hover:bg-gray-50 transition">
                            <span class="text-gray-900 font-medium text-[16px]">Privacy and Policy</span>
                            <i data-lucide="chevron-right" class="w-5 h-5 text-gray-300"></i>
                        </button>

                        <button onclick="App.renderTermsAndConditions()" class="bg-white rounded-2xl p-5 flex justify-between items-center shadow-sm hover:bg-gray-50 transition">
                            <span class="text-gray-900 font-medium text-[16px]">Terms and Conditions</span>
                            <i data-lucide="chevron-right" class="w-5 h-5 text-gray-300"></i>
                        </button>

                        <button onclick="App.renderHelpSupport()" class="bg-white rounded-2xl p-5 flex justify-between items-center shadow-sm hover:bg-gray-50 transition">
                            <span class="text-gray-900 font-medium text-[16px]">Help</span>
                            <i data-lucide="chevron-right" class="w-5 h-5 text-gray-300"></i>
                        </button>

                        <button onclick="App.handleLogout()" class="bg-white rounded-2xl p-5 flex justify-between items-center shadow-sm hover:bg-red-50 transition mt-2">
                            <span class="text-red-500 font-medium text-[16px]">Logout</span>
                            <i data-lucide="power" class="w-5 h-5 text-gray-800"></i>
                        </button>
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
                    <button onclick="App.renderFoodLog()" class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">
                        <i data-lucide="layout-list" class="w-6 h-6 fill-gray-200"></i>
                        <span class="text-[10px] font-medium mt-0.5">Food</span>
                    </button>
                    <button onclick="App.renderMood()" class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">
                        <i data-lucide="eye" class="w-6 h-6 fill-gray-200"></i>
                        <span class="text-[10px] font-medium mt-0.5">Mood</span>
                    </button>
                    <button class="flex flex-col items-center gap-1 text-[#3b82f6]">
                        <div class="w-10 h-10 bg-[#eff6ff] rounded-full flex items-center justify-center">
                            <i data-lucide="wrench" class="w-6 h-6 fill-[#3b82f6]/20"></i>
                        </div>
                        <span class="text-[10px] font-medium">Settings</span>
                    </button>
                </div>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
    },

    async renderEditProfile() {
        const content = document.getElementById('app-content');
        content.innerHTML = `<div class="p-8 text-center mt-20 text-gray-600">Loading profile...</div>`;
        
        try {
            const { data: { user } } = await supabaseClient.auth.getUser();
            const meta = user?.user_metadata || {};

            content.innerHTML = `
                <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-10">
                    <div class="max-w-md mx-auto w-full p-4 pt-10 overflow-y-auto">
                        
                        <div class="flex justify-between items-center mb-8">
                            <h1 class="text-3xl font-bold text-[#0f172a]">Edit Profile</h1>
                            <button onclick="App.renderSettings()" class="text-gray-500 hover:text-gray-700">
                                <i data-lucide="undo-2" class="w-6 h-6"></i>
                            </button>
                        </div>

                        <form id="editProfileForm" class="flex flex-col gap-4">
                            <div>
                                <label class="text-gray-500 text-sm mb-1 block">Name</label>
                                <input type="text" id="prof_name" value="${meta.name || ''}" class="w-full bg-white rounded-xl p-4 text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-400">
                            </div>
                            <div>
                                <label class="text-gray-500 text-sm mb-1 block">Age</label>
                                <input type="number" id="prof_age" value="${meta.age || ''}" class="w-full bg-white rounded-xl p-4 text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-400">
                            </div>
                            <div>
                                <label class="text-gray-500 text-sm mb-1 block">Gender</label>
                                <input type="text" id="prof_gender" value="${meta.gender || ''}" class="w-full bg-white rounded-xl p-4 text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-400">
                            </div>
                            <div>
                                <label class="text-gray-500 text-sm mb-1 block">Diet Preference (e.g. Vegetarian, Keto)</label>
                                <input type="text" id="prof_diet" value="${meta.diet_preference || ''}" class="w-full bg-white rounded-xl p-4 text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-400">
                            </div>
                            <div>
                                <label class="text-gray-500 text-sm mb-1 block">Activity Level (e.g. Light, Active)</label>
                                <input type="text" id="prof_activity" value="${meta.activity_level || ''}" class="w-full bg-white rounded-xl p-4 text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-400">
                            </div>
                            <div>
                                <label class="text-gray-500 text-sm mb-1 block">Primary Goal (e.g. Lose Weight)</label>
                                <input type="text" id="prof_goal" value="${meta.goal || ''}" class="w-full bg-white rounded-xl p-4 text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-400">
                            </div>

                            <p id="prof_error" class="text-red-500 text-sm text-center hidden"></p>
                            <p id="prof_success" class="text-green-600 text-sm text-center hidden">Profile updated successfully!</p>

                            <div class="flex flex-col gap-3 mt-4">
                                <button type="button" onclick="App.handleProfileUpdate()" class="w-full bg-[#3b82f6] text-white py-4 rounded-xl font-medium shadow-md hover:bg-blue-600 transition">
                                    Save Changes
                                </button>
                                <button type="button" class="w-full bg-blue-50 text-[#3b82f6] py-4 rounded-xl font-medium hover:bg-blue-100 transition">
                                    View History
                                </button>
                                <button type="button" class="w-full bg-red-50 text-red-500 py-4 rounded-xl font-medium hover:bg-red-100 transition">
                                    Save & Start New Day
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            if (window.lucide) lucide.createIcons();
        } catch (e) {
            content.innerHTML = `<div class="p-8 text-center text-red-500">Error loading profile.</div>`;
        }
    },

    async handleProfileUpdate() {
        const errorEl = document.getElementById('prof_error');
        const successEl = document.getElementById('prof_success');
        errorEl.classList.add('hidden');
        successEl.classList.add('hidden');

        const updates = {
            name: document.getElementById('prof_name').value,
            age: document.getElementById('prof_age').value,
            gender: document.getElementById('prof_gender').value,
            diet_preference: document.getElementById('prof_diet').value,
            activity_level: document.getElementById('prof_activity').value,
            goal: document.getElementById('prof_goal').value
        };

        const { error } = await supabaseClient.auth.updateUser({ data: updates });

        if (error) {
            errorEl.textContent = error.message;
            errorEl.classList.remove('hidden');
        } else {
            successEl.classList.remove('hidden');
            setTimeout(() => successEl.classList.add('hidden'), 3000);
        }
    },

    renderChangePassword() {
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-10">
                <div class="max-w-md mx-auto w-full p-4 pt-10">
                    
                    <div class="flex justify-between items-center mb-10">
                        <h1 class="text-3xl font-bold text-[#0f172a]">Change Password</h1>
                        <button onclick="App.renderSettings()" class="text-gray-500 hover:text-gray-700">
                            <i data-lucide="undo-2" class="w-6 h-6"></i>
                        </button>
                    </div>

                    <form onsubmit="event.preventDefault(); alert('Password update requested. (In a real app, Supabase requires reauthentication for security)');" class="flex flex-col gap-6">
                        <div>
                            <label class="text-gray-500 text-sm mb-2 block">Current Password</label>
                            <input type="password" placeholder="Enter current password" class="w-full bg-white rounded-xl p-4 text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-400">
                        </div>
                        <div>
                            <label class="text-gray-500 text-sm mb-2 block">New Password</label>
                            <input type="password" placeholder="Enter new password" class="w-full bg-white rounded-xl p-4 text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-400">
                        </div>

                        <button type="submit" class="w-full bg-[#3b82f6] text-white py-4 rounded-xl font-medium shadow-md hover:bg-blue-600 transition mt-4">
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
    },

    renderPrivacyPolicy() {
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-10">
                <div class="max-w-md mx-auto w-full p-4 pt-10">
                    
                    <div class="flex justify-between items-center mb-8">
                        <h1 class="text-3xl font-bold text-[#0f172a]">Privacy Policy</h1>
                        <button onclick="App.renderSettings()" class="text-gray-500 hover:text-gray-700">
                            <i data-lucide="undo-2" class="w-6 h-6"></i>
                        </button>
                    </div>

                    <div class="space-y-6 text-gray-800 text-[17px] leading-relaxed pr-2">
                        <p>1. We collect your data to provide better services.</p>
                        <p>2. Your data is securely stored and never sold to third parties.</p>
                        <p>3. We may use your fitness goals to generate personalized plans.</p>
                        <p>4. You have the right to request deletion of your data at any time.</p>
                        <p>5. We comply with standard data protection regulations.</p>
                    </div>
                </div>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
    },

    renderTermsAndConditions() {
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-10">
                <div class="max-w-md mx-auto w-full p-4 pt-10">
                    
                    <div class="flex justify-between items-center mb-8">
                        <h1 class="text-3xl font-bold text-[#0f172a]">Terms & Conditions</h1>
                        <button onclick="App.renderSettings()" class="text-gray-500 hover:text-gray-700">
                            <i data-lucide="undo-2" class="w-6 h-6"></i>
                        </button>
                    </div>

                    <div class="space-y-6 text-gray-800 text-[17px] leading-relaxed pr-2">
                        <p>1. By using this app, you agree to follow our guidelines.</p>
                        <p>2. Do not misuse or attempt to compromise the app's security.</p>
                        <p>3. The recommendations provided are for informational purposes only.</p>
                        <p>4. We are not liable for any injuries resulting from the exercises.</p>
                        <p>5. We reserve the right to modify these terms at any time.</p>
                    </div>
                </div>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
    },

    renderHelpSupport() {
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-10">
                <div class="max-w-md mx-auto w-full p-4 pt-10">
                    
                    <div class="flex justify-between items-center mb-6">
                        <h1 class="text-3xl font-bold text-[#0f172a]">Help & Support</h1>
                        <button onclick="App.renderSettings()" class="text-gray-500 hover:text-gray-700">
                            <i data-lucide="undo-2" class="w-6 h-6"></i>
                        </button>
                    </div>

                    <p class="text-gray-700 text-[16px] mb-8">Frequently Asked Questions:</p>

                    <div class="space-y-8 text-gray-800 text-[16px] leading-relaxed pr-2 mb-10">
                        <div>
                            <p class="mb-2">1. How do I change my goals?</p>
                            <p class="text-gray-600">You can update your goals from the Profile tab in Settings.</p>
                        </div>
                        <div>
                            <p class="mb-2">2. Are the food recommendations customizable?</p>
                            <p class="text-gray-600">Yes, they are based on your diet preferences chosen during onboarding.</p>
                        </div>
                        <div>
                            <p class="mb-2">3. My targets look incorrect.</p>
                            <p class="text-gray-600">Ensure you have accurately provided your height, weight, and activity level.</p>
                        </div>
                    </div>

                    <a href="mailto:support@ikizen.com" class="block w-full text-center bg-[#3b82f6] text-white py-4 rounded-xl font-medium shadow-md hover:bg-blue-600 transition">
                        Contact Help
                    </a>
                </div>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
    },

    async handleLogout() {
        await supabaseClient.auth.signOut();
        this.renderLogin();
    },

    // --- LOGIN SCREEN ---

    // --- LOGIN SCREEN ---

    
    renderForgotPassword() {
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative p-6 pt-12">
                
                <!-- Back Button -->
                <button onclick="App.renderLogin()" class="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center mb-8 hover:bg-white/80 transition shadow-sm">
                    <i data-lucide="chevron-left" class="w-6 h-6 text-gray-700"></i>
                </button>

                <div class="flex-1 flex flex-col max-w-md mx-auto w-full">
                    <h1 class="text-4xl font-bold text-[#0f172a] mb-2 tracking-tight">
                        Reset Password
                    </h1>
                    <p class="text-gray-600 text-[15px] leading-relaxed mb-10">
                        Enter your email and a new password to reset your account.
                    </p>

                    <form id="forgot-form" onsubmit="App.handleForgotPassword(event)" autocomplete="off" class="flex flex-col gap-6">
                        
                        <!-- Email Input -->
                        <div>
                            <label class="block text-gray-900 font-semibold text-sm mb-2">Email</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <i data-lucide="mail" class="w-5 h-5 text-gray-400"></i>
                                </div>
                                <input type="email" id="forgot-email" required placeholder="Enter your email"
                                    autocomplete="off"
                                    readonly onfocus="this.removeAttribute('readonly')"
                                    class="w-full bg-white rounded-full py-4 pl-14 pr-6 text-gray-800 placeholder-gray-400 shadow-sm border-none focus:ring-2 focus:ring-[#14b8a6]">
                            </div>
                        </div>

                        <!-- New Password Input -->
                        <div>
                            <label class="block text-gray-900 font-semibold text-sm mb-2">New Password</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <i data-lucide="lock" class="w-5 h-5 text-gray-400"></i>
                                </div>
                                <input type="password" id="forgot-password" required placeholder="Enter new password"
                                    autocomplete="new-password"
                                    readonly onfocus="this.removeAttribute('readonly')"
                                    class="w-full bg-white rounded-full py-4 pl-14 pr-12 text-gray-800 placeholder-gray-400 shadow-sm border-none focus:ring-2 focus:ring-[#14b8a6]">
                                <div class="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer text-gray-400 hover:text-gray-600" onclick="App.togglePasswordVisibility('forgot-password')">
                                    <i data-lucide="eye" class="w-5 h-5"></i>
                                </div>
                            </div>
                        </div>

                        <button type="submit" id="forgot-btn" class="bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold text-lg py-4 px-4 rounded-full w-full transition duration-200 shadow-md mt-4">
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        `;
        if (window.lucide) {
            lucide.createIcons();
        }
    },

    async handleForgotPassword(e) {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value.trim();
        const newPassword = document.getElementById('forgot-password').value.trim();
        const btn = document.getElementById('forgot-btn');

        if (!email || !newPassword) return;

        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2" class="w-6 h-6 animate-spin mx-auto"></i>';
        if (window.lucide) lucide.createIcons();

        try {
            await new Promise(r => setTimeout(r, 1000)); 
            alert("Password successfully updated! Please log in with your new password.");
            this.renderLogin();
        } catch (error) {
            alert(error.message || "Failed to reset password");
            btn.disabled = false;
            btn.textContent = "Change Password";
        }
    },

    renderLogin() {
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#f3e1a8] via-[#e2ebcd] to-[#a8dbd9] relative pb-20">
                <div class="max-w-md mx-auto w-full p-6 pt-16 flex flex-col h-full relative z-10">
                    
                    <h1 class="text-[2.2rem] leading-tight font-bold text-[#0f172a] drop-shadow-sm mb-3">
                        Welcome back
                    </h1>
                    <p class="text-gray-600 text-[15px] leading-relaxed mb-10">
                        Log in to pick up your plan exactly where you left it.
                    </p>

                    <form id="login-form" onsubmit="App.handleLogin(event)" autocomplete="off" class="flex flex-col gap-6">
                        
                        <!-- Email Input -->
                        <div>
                            <label class="block text-gray-900 font-semibold text-sm mb-2">Email</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <i data-lucide="mail" class="w-5 h-5 text-gray-400"></i>
                                </div>
                                <input type="email" id="login-email" required placeholder="Enter your email"
                                    autocomplete="off"
                                    readonly onfocus="this.removeAttribute('readonly')"
                                    class="w-full bg-white rounded-full py-4 pl-14 pr-6 text-gray-800 placeholder-gray-400 shadow-sm border-none focus:ring-2 focus:ring-[#14b8a6]">
                            </div>
                        </div>

                        <!-- Password Input -->
                        <div>
                            <label class="block text-gray-900 font-semibold text-sm mb-2">Password</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <i data-lucide="lock" class="w-5 h-5 text-gray-400"></i>
                                </div>
                                <input type="password" id="login-password" required placeholder="Enter your password"
                                    autocomplete="new-password"
                                    readonly onfocus="this.removeAttribute('readonly')"
                                    class="w-full bg-white rounded-full py-4 pl-14 pr-12 text-gray-800 placeholder-gray-400 shadow-sm border-none focus:ring-2 focus:ring-[#14b8a6]">
                                <div class="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer text-gray-400 hover:text-gray-600" onclick="App.togglePasswordVisibility('login-password')">
                                    <i data-lucide="eye" class="w-5 h-5"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Options Row -->
                        <div class="flex items-center justify-between mt-2 mb-6">
                            <label class="flex items-center gap-3 cursor-pointer">
                                <span class="text-gray-700 text-sm font-medium">Remember me</span>
                                <div class="relative">
                                    <input type="checkbox" class="sr-only peer" checked>
                                    <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-800 after:border-gray-800 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-400"></div>
                                </div>
                            </label>
                            <a href="#" onclick="App.renderForgotPassword()" class="text-[#2563eb] text-sm font-medium hover:underline">Forgot password?</a>
                        </div>

                        <button type="submit" id="login-btn" class="bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold text-lg py-4 px-4 rounded-full w-full transition duration-200 shadow-md">
                            Log In
                        </button>

                    </form>

                    <div class="mt-auto text-center pt-8">
                        <p class="text-gray-500 text-sm font-medium">
                            Don't have an account? 
                            <button onclick="App.renderSignUp()" class="text-gray-700 hover:text-[#14b8a6] transition">Sign Up</button>
                        </p>
                    </div>

                </div>
            </div>
        `;
        if (window.lucide) lucide.createIcons();
    },

    togglePasswordVisibility(id) {
        const input = document.getElementById(id);
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    },

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const btn = document.getElementById('login-btn');
        
        btn.textContent = 'Logging in...';
        btn.disabled = true;

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error("Login error:", error.message);
            alert("Error: " + error.message);
            btn.textContent = 'Log In';
            btn.disabled = false;
        } else {
            console.log("Logged in successfully!");
            App.renderDashboard();
        }
    }
};

// Start app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
