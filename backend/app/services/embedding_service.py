"""
Pathshala AI - Embedding Service
Service layer wrapper for computing vector embeddings.
"""

import sys
import os
from typing import List

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from rag.embeddings import embed_text, embed_batch, get_embedding_model


def get_text_embedding(text: str) -> List[float]:
    """
    Returns dense vector representation for a query or document.
    """
    return embed_text(text)


def get_batch_embeddings(texts: List[str]) -> List[List[float]]:
    """
    Returns dense vectors for multiple texts.
    """
    return embed_batch(texts)
