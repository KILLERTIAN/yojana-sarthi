from sentence_transformers import SentenceTransformer

try:
    model = SentenceTransformer("all-MiniLM-L6-v2")  # Load the model
    print("Model loaded successfully!")

    # Test encoding
    test_text = "Hello, this is a test."
    embedding = model.encode(test_text)

    print("Embedding shape:", embedding.shape)
    print("First 5 values:", embedding[:5])  # Print first 5 values for debugging

except Exception as e:
    print("Error loading model:", e)
