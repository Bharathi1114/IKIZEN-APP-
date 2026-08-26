text = open('js/app.js', 'r', encoding='utf-8').read()
idx = text.find('login-password')
line_num = text[:idx].count('\n') + 1
print(f"login-password at line: {line_num}")
print(repr(text[idx-30:idx+250]))
