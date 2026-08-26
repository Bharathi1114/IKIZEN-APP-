import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

def inject(text, icon, func):
    pattern = r'<button class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">\s*<i data-lucide="' + icon + r'"'
    repl = r'<button onclick="App.' + func + r'()" class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">\n                            <i data-lucide="' + icon + r'"'
    return re.sub(pattern, repl, text)

text = inject(text, 'target', 'renderDashboard')
text = inject(text, 'split', 'renderWorkoutLog')
text = inject(text, 'layout-list', 'renderFoodLog')
text = inject(text, 'eye', 'renderMood')
text = inject(text, 'wrench', 'renderSettings')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Done")
