"""
Pathshala AI - Semantic Retriever
Finds the most contextually relevant document snippets for student inquiries.
"""

from typing import List, Dict, Any, Optional
from rag.embeddings import embed_query
from rag.vector_store import get_knowledge_collection


def retrieve_relevant_chunks(
    query: str,
    top_k: int = 4,
    source_filter: Optional[str] = None
) -> List[Dict[str, Any]]:
    """
    Retrieves the top_k most similar chunks for the given query text.
    Returns list of dicts: [{"id": str, "text": str, "metadata": dict, "score": float}]
    """
    collection = get_knowledge_collection()
    
    # Check if collection is empty
    if collection.count() == 0:
        return []

    # Generate query embedding (optimized for retrieval search)
    query_vector = embed_query(query)

    query_kwargs = {
        "query_embeddings": [query_vector],
        "n_results": min(top_k, collection.count()),
        "include": ["documents", "metadatas", "distances"]
    }

    if source_filter:
        query_kwargs["where"] = {"source": source_filter}

    results = collection.query(**query_kwargs)

    retrieved = []
    if results and results.get("ids") and len(results["ids"][0]) > 0:
        for i in range(len(results["ids"][0])):
            distance = results["distances"][0][i] if "distances" in results else 0.0
            # For cosine distance: cosine_sim = 1 - distance
            similarity = round(max(0.0, 1.0 - distance), 4)

            retrieved.append({
                "id": results["ids"][0][i],
                "text": results["documents"][0][i],
                "metadata": results["metadatas"][0][i],
                "similarity": similarity
            })

    return retrieved
