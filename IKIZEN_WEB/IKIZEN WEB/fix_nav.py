import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

def replace_inactive(icon_name, onclick_func):
    pattern = r'<button class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">\s*<i data-lucide="' + icon_name + r'"'
    repl = r'<button onclick="App.' + onclick_func + r'()" class="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition pt-1">\n                            <i data-lucide="' + icon_name + r'''
    return re.sub(pattern, repl, text)

text = replace_inactive('target', 'renderDashboard')
text = replace_inactive('split', 'renderWorkoutLog')
text = replace_inactive('layout-list', 'renderFoodLog')
text = replace_inactive('eye', 'renderMood')
text = replace_inactive('wrench', 'renderSettings')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)
print('Fixed!')