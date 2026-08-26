import os
import re

layout_dir = "app/src/main/res/layout"

# Regex to match the root element's background attribute (naive approach: match the first android:background)
for filename in os.listdir(layout_dir):
    if filename.endswith(".xml"):
        filepath = os.path.join(layout_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Some files like item_xxx might not be full screens, but let's just do it for activity_*.xml
        if filename.startswith("activity_"):
            # Replace the first occurrence of android:background="#..." or android:background="@color/..." with @drawable/app_bg
            # We'll use a regex that matches the first android:background
            
            new_content = re.sub(
                r'android:background="[^"]+"',
                r'android:background="@drawable/app_bg"',
                content,
                count=1 # ONLY the first occurrence (which is almost always the root tag)
            )
            
            if new_content != content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {filename}")
