text = open('js/app.js', 'r', encoding='utf-8').read()
idx = text.find("const diet = meta.diet")
print('Line number:', text[:idx].count('\n') + 1)
