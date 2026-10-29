"""
Pathshala AI - Ultra-Lightweight Vector Store
Stores document chunks and normalized embeddings using SQLite + pure Python math.
100% serverless compatible — zero heavy dependencies.
"""

import os
import json
import math
import struct
import sqlite3
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# On Vercel / serverless, filesystem is read-only except /tmp
if os.getenv("VERCEL"):
    _DEFAULT_DB_DIR = "/tmp/pathshala_data"
else:
    _DEFAULT_DB_DIR = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "backend",
        "chroma_db"
    )

DB_PATH = os.path.join(
    os.getenv("CHROMA_PERSIST_DIR", _DEFAULT_DB_DIR),
    "vectors.sqlite"
)


# ---------- Pure-Python vector math helpers ----------

def _vec_to_bytes(vec: List[float]) -> bytes:
    """Pack a float list into a compact binary blob (float32)."""
    return struct.pack(f"{len(vec)}f", *vec)


def _bytes_to_vec(blob: bytes) -> List[float]:
    """Unpack a binary blob back to a float list."""
    n = len(blob) // 4
    return list(struct.unpack(f"{n}f", blob))


def _dot(a: List[float], b: List[float]) -> float:
    return sum(x * y for x, y in zip(a, b))


def _norm(v: List[float]) -> float:
    return math.sqrt(sum(x * x for x in v))


def _normalize(v: List[float]) -> List[float]:
    n = _norm(v)
    if n == 0:
        return v
    return [x / n for x in v]


def _cosine_similarity(a: List[float], b: List[float]) -> float:
    return _dot(a, b)


# ---------- Database ----------

def _get_connection() -> sqlite3.Connection:
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS chunks (
            id TEXT PRIMARY KEY,
            source TEXT,
            page INTEGER,
            text TEXT,
            metadata TEXT,
            embedding BLOB
        )
    """)
    conn.commit()
    return conn


def add_chunks_to_vector_store(
    chunks: List[Dict[str, Any]],
    embeddings: Optional[List[List[float]]] = None
) -> int:
    """
    Adds chunked documents and their embeddings into the SQLite vector store.
    """
    if not chunks:
        return 0

    from rag.embeddings import embed_batch

    documents = [c["text"] for c in chunks]
    if embeddings is None:
        embeddings = embed_batch(documents)

    conn = _get_connection()
    with conn:
        for chunk, emb in zip(chunks, embeddings):
            emb_blob = _vec_to_bytes(emb)
            metadata_json = json.dumps(chunk.get("metadata", {}))
            source = chunk.get("metadata", {}).get("source", "Unknown")
            page = chunk.get("metadata", {}).get("page", 1)

            conn.execute("""
                INSERT OR REPLACE INTO chunks (id, source, page, text, metadata, embedding)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (chunk["id"], source, page, chunk["text"], metadata_json, emb_blob))

    return len(chunks)


def list_indexed_sources() -> List[Dict[str, Any]]:
    """
    Returns aggregated metadata of all unique documents indexed.
    """
    conn = _get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT source, page FROM chunks")
    rows = cursor.fetchall()

    sources_summary: Dict[str, Dict[str, Any]] = {}
    for source, page in rows:
        if source not in sources_summary:
            sources_summary[source] = {
                "source": source,
                "chunks_count": 0,
                "pages": set()
            }
        sources_summary[source]["chunks_count"] += 1
        sources_summary[source]["pages"].add(page or 1)

    result = []
    for src, info in sources_summary.items():
        result.append({
            "source": info["source"],
            "chunks_count": info["chunks_count"],
            "total_pages": len(info["pages"]),
            "pages_list": sorted(list(info["pages"]))
        })
    return result


def delete_source_from_vector_store(source_name: str) -> int:
    """
    Deletes all chunks belonging to a specific source filename.
    """
    conn = _get_connection()
    with conn:
        cursor = conn.execute("DELETE FROM chunks WHERE source = ?", (source_name,))
        return cursor.rowcount


def count_indexed_chunks() -> int:
    """
    Returns total number of chunks indexed in the knowledge base.
    """
    conn = _get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM chunks")
    row = cursor.fetchone()
    return row[0] if row else 0


def search_vectors(
    query_vector: List[float],
    top_k: int = 4,
    source_filter: Optional[str] = None
) -> List[Dict[str, Any]]:
    """
    Performs cosine similarity search across all stored vectors.
    """
    conn = _get_connection()
    cursor = conn.cursor()

    if source_filter:
        cursor.execute(
            "SELECT id, text, metadata, embedding FROM chunks WHERE source = ?",
            (source_filter,)
        )
    else:
        cursor.execute("SELECT id, text, metadata, embedding FROM chunks")

    rows = cursor.fetchall()
    if not rows:
        return []

    q_vec = _normalize(query_vector)

    scored = []
    for r_id, r_text, r_meta, r_blob in rows:
        doc_vec = _normalize(_bytes_to_vec(r_blob))
        sim = _cosine_similarity(q_vec, doc_vec)
        scored.append((sim, r_id, r_text, r_meta))

    # Sort by similarity descending, take top_k
    scored.sort(key=lambda x: x[0], reverse=True)

    results = []
    for sim, r_id, r_text, r_meta in scored[:top_k]:
        results.append({
            "id": r_id,
            "text": r_text,
            "metadata": json.loads(r_meta) if r_meta else {},
            "similarity": round(max(0.0, sim), 4)
        })

    return results


# Compatibility wrapper for any code calling get_knowledge_collection()
class _CollectionWrapper:
    def count(self):
        return count_indexed_chunks()


def get_knowledge_collection():
    return _CollectionWrapper()
