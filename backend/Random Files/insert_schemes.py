from pymongo import MongoClient
import json

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["yojana_sarthi"]
schemes_collection = db["schemes"]

# Load JSON file
with open("K:/Computer Science/Hackathons/Infronix/data/schemes_fixed.json", "r", encoding="utf-8") as f:
    schemes = json.load(f)

# Insert into MongoDB
schemes_collection.insert_many(schemes)

print("✅ Data inserted successfully!")