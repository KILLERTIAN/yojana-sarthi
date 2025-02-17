from sentence_transformers import SentenceTransformer, losses, InputExample
from torch.utils.data import DataLoader
import json

# Load pre-trained SBERT model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load training data
import os

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))  # Moves up two levels
data_path = os.path.join(base_dir, "data", "training_data.json")

with open(data_path, "r") as f:
    training_data = json.load(f)

print(type(training_data))  # Should print <class 'list'>
print(training_data[:2])    # Print first two entries to check format


# Convert to SBERT training format
train_examples = [
    InputExample(texts=[item["details"], item["scheme_name"]], label=1.0) for item in training_data
]


# Create DataLoader
train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=8)

# Define loss function
train_loss = losses.CosineSimilarityLoss(model)

# Train model
model.fit(train_objectives=[(train_dataloader, train_loss)], epochs=3, warmup_steps=10)

# Save fine-tuned model
model.save("models/fine_tuned_sbert")

print("✅ Fine-tuned SBERT model saved at: models/fine_tuned_sbert")
