import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

# Initialize FastAPI
app = FastAPI()

# Load SBERT model
print("Loading SBERT model...")
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
print("Model loaded successfully!")

# Dummy dataset (Replace with actual schemes)
schemes = [
    {"id": 1, "text": "Government scheme for farmers"},
    {"id": 2, "text": "Startup business loan scheme"},
    {"id": 3, "text": "Healthcare benefits for senior citizens"},
    {"id": 4, "text": "Scholarship program for students"},
    {"id": 5, "text": "Women's empowerment subsidy program"}
]

# Build FAISS index
print("Building FAISS index...")
all_embeddings = np.array([model.encode(s["text"]) for s in schemes], dtype="float32")
faiss_index = faiss.IndexFlatL2(all_embeddings.shape[1])
faiss_index.add(all_embeddings)
print("FAISS index built with", faiss_index.ntotal, "entries.")

# Pydantic request model
class SearchRequest(BaseModel):
    query: str

@app.get("/")
def home():
    return {"message": "Welcome to Yojana Sarthi Backend!"}

@app.post("/search/")
def search_scheme(request: SearchRequest):
    query = request.query
    print("\n🔍 Received Query:", query)

    # Generate embedding for the query
    query_embedding = model.encode(query).reshape(1, -1)
    print("📏 Query Embedding Shape:", query_embedding.shape)
    print("📊 First 5 Embedding Values:", query_embedding[0][:5].tolist())

    # Ensure FAISS index is not empty
    if faiss_index.ntotal == 0:
        print("❌ FAISS Index is empty! No schemes available for search.")
        return {"error": "No schemes available for search"}

    # Perform FAISS search
    D, I = faiss_index.search(query_embedding, k=5)
    print("🔎 FAISS Retrieved Indices:", I.tolist())
    print("📉 FAISS Distances:", D.tolist())

    # Check if indices are valid
    max_index = len(schemes) - 1
    valid_indices = [i for i in I[0] if 0 <= i <= max_index]
    print("✅ Valid Indices:", valid_indices)

    if not valid_indices:
        print("🚫 No matching schemes found.")
        return {"error": "No matching schemes found"}

    # Fetch results
    results = [schemes[i] for i in valid_indices]
    print("🎯 Search Results:", results)

    return {"results": results}


@app.get("/test-embedding/")
def test_embedding():
    test_text = "Sample government scheme"
    embedding = model.encode(test_text)
    return {
        "embedding_shape": list(embedding.shape),
        "first_5_values": embedding[:5].tolist()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="debug", reload=True)
