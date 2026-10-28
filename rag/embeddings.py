"""
Pathshala AI - Embedding Generation Module
Generates dense vector embeddings using SentenceTransformers (all-MiniLM-L6-v2).
Runs 100% locally on CPU/GPU without external API latency or cost.
"""

from typing import List, Union
import numpy as np
from sentence_transformers import SentenceTransformer

_MODEL_NAME = "all-MiniLM-L6-v2"
_EMBEDDING_MODEL = None


def get_embedding_model() -> SentenceTransformer:
    """
    Lazy-loads and caches the SentenceTransformer model in memory.
    """
    global _EMBEDDING_MODEL
    if _EMBEDDING_MODEL is None:
        # Load local model
        _EMBEDDING_MODEL = SentenceTransformer(_MODEL_NAME)
    return _EMBEDDING_MODEL


def embed_text(text: str) -> List[float]:
    """
    Generates an embedding vector for a single string.
    """
    model = get_embedding_model()
    embedding = model.encode(text, normalize_embeddings=True)
    return embedding.tolist()


def embed_batch(texts: List[str], batch_size: int = 32) -> List[List[float]]:
    """
    Generates embeddings for a batch of strings.
    """
    if not texts:
        return []
    model = get_embedding_model()
    embeddings = model.encode(
        texts,
        batch_size=batch_size,
        show_progress_bar=False,
        normalize_embeddings=True
    )
    return embeddings.tolist()
