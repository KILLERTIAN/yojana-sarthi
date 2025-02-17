from fastapi import FastAPI, Depends
from pydantic import BaseModel
import faiss
import sqlite3
from sentence_transformers import SentenceTransformer

app = FastAPI()

# Load SBERT model
model = SentenceTransformer("all-MiniLM-L6-v2")
if 'embedding' in locals():
    print(type(embedding), embedding.shape if hasattr(embedding, "shape") else "No shape")
else:
    print("Variable 'embedding' is not defined!")

# Set up FAISS index
index = faiss.IndexFlatL2(384)  # 384 is the SBERT embedding size
schemes = []  # Store schemes with their text and metadata

# SQLite setup (No MongoDB needed)
conn = sqlite3.connect("schemes.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS schemes (id INTEGER PRIMARY KEY, name TEXT, description TEXT, vector TEXT)")
conn.commit()

# Request model
class SchemeQuery(BaseModel):
    query: str

# Add a scheme (for testing)
import numpy as np


@app.post("/add-scheme/")
def add_scheme(name: str, description: str):
    embedding = model.encode(description)
    index.add(np.array([embedding], dtype=np.float32))  # Ensure correct dtype

    cursor.execute("INSERT INTO schemes (name, description, vector) VALUES (?, ?, ?)",
                   (name, description, str(embedding.tolist())))
    conn.commit()

    schemes.append({"name": name, "description": description, "vector": embedding.tolist()})
    return {"message": "Scheme added"}


# Search for a scheme
@app.post("/search/")
def search_scheme(query: SchemeQuery):
    query_vector = np.array([model.encode(query.query)], dtype=np.float32)  # Ensure correct dtype
    D, I = index.search(query_vector, k=5)

    results = [schemes[i] for i in I[0] if i < len(schemes)]
    return {"results": results}

from fastapi import FastAPI

app = FastAPI()

@app.get("/test-embedding/")
def test_embedding():
    try:
        test_text = "This is a test sentence."
        embedding = model.encode(test_text)
        return {"embedding_shape": embedding.shape, "first_5_values": embedding[:5].tolist()}
    except Exception as e:
        return {"error": str(e)}


# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)