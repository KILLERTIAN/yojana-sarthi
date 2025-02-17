import json

input_file = "K:/Computer Science/Hackathons/Infronix/data/schemes.json"
output_file = "K:/Computer Science/Hackathons/Infronix/data/schemes_fixed.json"

try:
    with open(input_file, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # Convert multiple JSON objects into a valid JSON array
    json_array = "[" + ",".join(line.strip() for line in lines) + "]"

    # Save fixed JSON
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(json_array)

    print("✅ JSON file fixed! Saved as schemes_fixed.json")

except Exception as e:
    print(f"❌ Error: {e}")