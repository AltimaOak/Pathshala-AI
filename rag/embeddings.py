"""
Pathshala AI - Embedding Generation Module
Generates dense vector embeddings using Google Gemini's text-embedding API.
Lightweight, serverless-compatible — no torch or sentence-transformers required.
"""

import os
from typing import List
import google.generativeai as genai

# Gemini embedding model — 768-dimensional, fast, free tier available
_EMBEDDING_MODEL = "models/text-embedding-004"

def _get_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not set in environment.")
    genai.configure(api_key=api_key)


def embed_text(text: str) -> List[float]:
    """
    Generates an embedding vector for a single string using Gemini API.
    """
    _get_client()
    result = genai.embed_content(
        model=_EMBEDDING_MODEL,
        content=text,
        task_type="retrieval_document"
    )
    return result["embedding"]


def embed_batch(texts: List[str], batch_size: int = 32) -> List[List[float]]:
    """
    Generates embeddings for a batch of strings using Gemini API.
    Processes in batches to respect API rate limits.
    """
    if not texts:
        return []
    _get_client()
    all_embeddings = []
    for i in range(0, len(texts), batch_size):
        chunk = texts[i : i + batch_size]
        embeddings = [
            genai.embed_content(
                model=_EMBEDDING_MODEL,
                content=t,
                task_type="retrieval_document"
            )["embedding"]
            for t in chunk
        ]
        all_embeddings.extend(embeddings)
    return all_embeddings


def embed_query(query: str) -> List[float]:
    """
    Generates an embedding for a search query (uses retrieval_query task type
    for better semantic search results).
    """
    _get_client()
    result = genai.embed_content(
        model=_EMBEDDING_MODEL,
        content=query,
        task_type="retrieval_query"
    )
    return result["embedding"]
