import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix the email input on the login screen - add autocomplete=off and clear any value
text = text.replace(
    'id="login-email" type="email"',
    'id="login-email" type="email" autocomplete="off"'
)
text = text.replace(
    'id="login-password" type="password"',
    'id="login-password" type="password" autocomplete="new-password"'
)

# Also find the login form itself and add autocomplete=off if it has a form tag
text = re.sub(r'(<form[^>]*renderLogin[^>]*>)', r'\1', text)  # no-op just check

# Specifically target the login template and ensure value="" on both inputs
# The email input in renderLogin likely has a value or placeholder
text = re.sub(
    r'(id="login-email"[^>]*?)(\s*value="[^"]*")',
    r'\1 value=""',
    text
)

# Add readonly trick: set readonly on focus to defeat autofill, remove on click
text = text.replace(
    'id="login-email" type="email" autocomplete="off"',
    'id="login-email" type="email" autocomplete="off" readonly onfocus="this.removeAttribute(\'readonly\')"'
)
text = text.replace(
    'id="login-password" type="password" autocomplete="new-password"',
    'id="login-password" type="password" autocomplete="new-password" readonly onfocus="this.removeAttribute(\'readonly\')"'
)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Login autocomplete fixed!")
