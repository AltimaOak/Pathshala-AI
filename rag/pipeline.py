"""
Pathshala AI - End-to-End RAG Pipeline
Orchestrates context retrieval, document groundings, and citation metadata.
"""

from typing import List, Dict, Any, Optional
from rag.retriever import retrieve_relevant_chunks


def build_rag_context(
    query: str,
    top_k: int = 4,
    source_filter: Optional[str] = None,
    min_similarity: float = 0.25
) -> Dict[str, Any]:
    """
    Retrieves relevant snippets and constructs a formatted context block
    suitable for injecting into LLM system or user prompts.
    """
    chunks = retrieve_relevant_chunks(
        query=query,
        top_k=top_k,
        source_filter=source_filter
    )

    # Filter out chunks with very low similarity
    filtered_chunks = [c for c in chunks if c.get("similarity", 0) >= min_similarity]

    if not filtered_chunks:
        return {
            "has_context": False,
            "context_text": "",
            "sources": [],
            "chunks": []
        }

    context_lines = []
    unique_sources = {}

    for idx, c in enumerate(filtered_chunks, 1):
        meta = c.get("metadata", {})
        source_name = meta.get("source", "Document")
        page_num = meta.get("page", 1)
        sim = c.get("similarity", 0.0)

        context_lines.append(
            f"--- Reference [{idx}] (Source: {source_name}, Page: {page_num}) ---\n{c['text']}"
        )

        source_key = f"{source_name}_p{page_num}"
        if source_key not in unique_sources:
            unique_sources[source_key] = {
                "source": source_name,
                "page": page_num,
                "similarity": sim
            }

    context_text = "\n\n".join(context_lines)

    return {
        "has_context": True,
        "context_text": context_text,
        "sources": list(unique_sources.values()),
        "chunks": filtered_chunks
    }
