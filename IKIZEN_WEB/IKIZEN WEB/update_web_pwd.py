text = open('js/app.js', 'r', encoding='utf-8').read()

forgot_password_html = '''
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
'''

text = text.replace('renderLogin() {', forgot_password_html + '\n    renderLogin() {')

text = text.replace(
    '<a href="#" class="text-[#2563eb] text-sm font-medium hover:underline">Forgot password?</a>',
    '<a href="#" onclick="App.renderForgotPassword()" class="text-[#2563eb] text-sm font-medium hover:underline">Forgot password?</a>'
)

open('js/app.js', 'w', encoding='utf-8').write(text)
print('Web app updated with Forgot Password flow')
