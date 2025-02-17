import numpy as np
from sentence_transformers import SentenceTransformer
from rank_bm25 import BM25Okapi
import faiss
import json

# Load the fine-tuned SBERT model
model = SentenceTransformer("models/fine_tuned_sbert")

# Load government schemes dataset
with open("data/schemes.json", "r") as f:
    schemes = json.load(f)

# Load FAISS index
index = faiss.read_index("faiss_index/scheme_index.faiss")

# Prepare BM25 keyword search
corpus = [scheme["description"] for scheme in schemes]
tokenized_corpus = [doc.lower().split() for doc in corpus]
bm25 = BM25Okapi(tokenized_corpus)


def search_scheme(query, top_k=5):
    # Encode query with SBERT
    query_embedding = model.encode(query, convert_to_numpy=True)

    # FAISS nearest neighbor search
    D, I = index.search(np.array([query_embedding]), k=top_k)  # D = distances, I = indices

    # BM25 keyword search scores
    bm25_scores = bm25.get_scores(query.lower().split())

    # Hybrid scoring (FAISS similarity + BM25)
    final_scores = []
    for i in I[0]:
        if i < len(schemes):
            faiss_score = 1 / (1 + D[0][i])  # Convert distance to similarity
            keyword_score = bm25_scores[i]
            final_score = 0.7 * faiss_score + 0.3 * keyword_score  # Weighted ranking
            final_scores.append((i, final_score))

    # Sort results by combined score
    final_scores.sort(key=lambda x: x[1], reverse=True)

    # Get final ranked results
    results = [schemes[i] for i, _ in final_scores]

    return results


# Example query test
query = "loan for farmers"
print(f"🔎 Query: {query}")
print("📌 Best Matches:")
for scheme in search_scheme(query):
    print(f" - {scheme['name']}")
