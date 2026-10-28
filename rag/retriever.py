"""
Pathshala AI - Semantic Retriever
Finds the most contextually relevant document snippets for student inquiries.
"""

from typing import List, Dict, Any, Optional
from rag.embeddings import embed_query
from rag.vector_store import search_vectors, count_indexed_chunks


def retrieve_relevant_chunks(
    query: str,
    top_k: int = 4,
    source_filter: Optional[str] = None
) -> List[Dict[str, Any]]:
    """
    Retrieves the top_k most similar chunks for the given query text.
    Returns list of dicts: [{"id": str, "text": str, "metadata": dict, "similarity": float}]
    """
    if count_indexed_chunks() == 0:
        return []

    # Generate query embedding with Gemini API
    query_vector = embed_query(query)

    return search_vectors(
        query_vector=query_vector,
        top_k=top_k,
        source_filter=source_filter
    )
