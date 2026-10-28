"""
Pathshala AI - Ultra-Lightweight Vector Store
Stores document chunks and normalized embeddings using SQLite + NumPy.
100% serverless compatible (zero heavy C++ dependencies like onnxruntime/grpcio).
Runs anywhere in <50MB bundle size.
"""

import os
import json
import sqlite3
from typing import List, Dict, Any, Optional
import numpy as np
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
            emb_blob = np.array(emb, dtype=np.float32).tobytes()
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
    Performs fast cosine similarity search across all stored vectors.
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

    q_vec = np.array(query_vector, dtype=np.float32)
    q_norm = np.linalg.norm(q_vec)
    if q_norm > 0:
        q_vec = q_vec / q_norm

    ids = []
    texts = []
    metadatas = []
    vectors = []

    for r_id, r_text, r_meta, r_blob in rows:
        ids.append(r_id)
        texts.append(r_text)
        metadatas.append(json.loads(r_meta) if r_meta else {})
        vectors.append(np.frombuffer(r_blob, dtype=np.float32))

    matrix = np.vstack(vectors)
    norms = np.linalg.norm(matrix, axis=1, keepdims=True)
    norms[norms == 0] = 1.0
    norm_matrix = matrix / norms

    # Cosine similarities
    similarities = np.dot(norm_matrix, q_vec)

    # Top-K indices
    k = min(top_k, len(similarities))
    top_indices = np.argsort(similarities)[-k:][::-1]

    results = []
    for idx in top_indices:
        sim = float(similarities[idx])
        results.append({
            "id": ids[idx],
            "text": texts[idx],
            "metadata": metadatas[idx],
            "similarity": round(max(0.0, sim), 4)
        })

    return results


# Compatibility wrapper for any code calling get_knowledge_collection()
class _CollectionWrapper:
    def count(self):
        return count_indexed_chunks()


def get_knowledge_collection():
    return _CollectionWrapper()
