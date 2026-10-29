"""
Pathshala AI - Embedding Generation Module
Generates dense vector embeddings using Google Gemini's REST API.
Lightweight, serverless-compatible — no google-generativeai SDK required.
"""

import os
import httpx
from typing import List

_EMBEDDING_MODEL = "text-embedding-004"
_API_BASE = "https://generativelanguage.googleapis.com/v1beta"


def _get_api_key() -> str:
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not set in environment.")
    return api_key


def embed_text(text: str) -> List[float]:
    """
    Generates an embedding vector for a single string using Gemini REST API.
    """
    api_key = _get_api_key()
    url = f"{_API_BASE}/models/{_EMBEDDING_MODEL}:embedContent?key={api_key}"
    payload = {
        "model": f"models/{_EMBEDDING_MODEL}",
        "content": {"parts": [{"text": text}]},
        "taskType": "RETRIEVAL_DOCUMENT"
    }
    with httpx.Client(timeout=30.0) as client:
        resp = client.post(url, json=payload)
        resp.raise_for_status()
    return resp.json()["embedding"]["values"]


def embed_batch(texts: List[str], batch_size: int = 32) -> List[List[float]]:
    """
    Generates embeddings for a batch of strings using Gemini REST API.
    """
    if not texts:
        return []
    all_embeddings = []
    for i in range(0, len(texts), batch_size):
        chunk = texts[i : i + batch_size]
        for t in chunk:
            all_embeddings.append(embed_text(t))
    return all_embeddings


def embed_query(query: str) -> List[float]:
    """
    Generates an embedding for a search query (uses RETRIEVAL_QUERY task type).
    """
    api_key = _get_api_key()
    url = f"{_API_BASE}/models/{_EMBEDDING_MODEL}:embedContent?key={api_key}"
    payload = {
        "model": f"models/{_EMBEDDING_MODEL}",
        "content": {"parts": [{"text": query}]},
        "taskType": "RETRIEVAL_QUERY"
    }
    with httpx.Client(timeout=30.0) as client:
        resp = client.post(url, json=payload)
        resp.raise_for_status()
    return resp.json()["embedding"]["values"]
