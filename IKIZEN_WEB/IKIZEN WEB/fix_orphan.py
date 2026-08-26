import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Find the orphaned old renderWorkoutLog body that starts right after refreshWorkoutLog closing
# It starts with "        if (prefillQuery) this.workoutLogState..." and ends with "    },"
# followed by updateWorkoutSearch

# Find the orphan block
orphan_start = text.find('    },\n        if (prefillQuery) this.workoutLogState.searchQuery = prefillQuery;\n        const content = document.getElementById(\'app-content\');\n        \n        // Fetch existing log from Supabase on first load\n        if (this.workoutLogState.')

if orphan_start == -1:
    print("Could not find orphan with exact match, trying looser search...")
    # Try to find it differently
    idx = text.find('async refreshWorkoutLog')
    end_of_refresh = text.find('    },\n', idx) + 6  # end of the refreshWorkoutLog closing brace
    print(f"End of refreshWorkoutLog at: {end_of_refresh}")
    print(repr(text[end_of_refresh:end_of_refresh+100]))
else:
    print(f"Found orphan at: {orphan_start}")
    # The orphan content starts right after "    }," (the refreshWorkoutLog closing)
    # Find where the next proper method starts (updateWorkoutSearch)
    orphan_body_start = orphan_start + 6  # skip "    },"
    orphan_end = text.find('\n    updateWorkoutSearch(', orphan_body_start)
    print(f"Orphan ends at: {orphan_end}")
    print(f"Orphan length: {orphan_end - orphan_body_start} chars")
    print(repr(text[orphan_body_start:orphan_body_start+100]))
    print("...")
    print(repr(text[orphan_end-50:orphan_end+50]))
    
    # Remove the orphan
    text = text[:orphan_body_start] + '\n' + text[orphan_end:]
    
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Removed orphaned workout body!")
