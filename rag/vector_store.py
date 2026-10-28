"""
Pathshala AI - Vector Store Integration
Manages persistent ChromaDB vector storage for study materials, embeddings, and metadata.
"""

import os
from typing import List, Dict, Any, Optional
import chromadb
from chromadb.config import Settings
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# Determine default ChromaDB persistence directory
_DEFAULT_DB_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "backend",
    "chroma_db"
)
CHROMA_PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", _DEFAULT_DB_PATH)
COLLECTION_NAME = "pathshala_knowledge_base"

_CHROMA_CLIENT: Optional[chromadb.PersistentClient] = None


def get_chroma_client() -> chromadb.PersistentClient:
    """
    Returns a persistent ChromaDB client instance.
    """
    global _CHROMA_CLIENT
    if _CHROMA_CLIENT is None:
        os.makedirs(CHROMA_PERSIST_DIR, exist_ok=True)
        _CHROMA_CLIENT = chromadb.PersistentClient(
            path=CHROMA_PERSIST_DIR,
            settings=Settings(anonymized_telemetry=False)
        )
    return _CHROMA_CLIENT


def get_knowledge_collection():
    """
    Returns or initializes the main educational materials ChromaDB collection.
    """
    client = get_chroma_client()
    return client.get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"}
    )


def add_chunks_to_vector_store(
    chunks: List[Dict[str, Any]],
    embeddings: Optional[List[List[float]]] = None
) -> int:
    """
    Adds chunked documents and their embeddings into ChromaDB.
    """
    if not chunks:
        return 0

    from rag.embeddings import embed_batch

    collection = get_knowledge_collection()

    ids = [c["id"] for c in chunks]
    documents = [c["text"] for c in chunks]
    metadatas = [c["metadata"] for c in chunks]

    if embeddings is None:
        embeddings = embed_batch(documents)

    collection.upsert(
        ids=ids,
        embeddings=embeddings,
        documents=documents,
        metadatas=metadatas
    )

    return len(chunks)


def list_indexed_sources() -> List[Dict[str, Any]]:
    """
    Returns aggregated metadata of all unique documents indexed in ChromaDB.
    """
    collection = get_knowledge_collection()
    data = collection.get(include=["metadatas"])
    
    sources_summary: Dict[str, Dict[str, Any]] = {}
    if data and data.get("metadatas"):
        for meta in data["metadatas"]:
            source = meta.get("source", "Unknown")
            page = meta.get("page", 1)
            
            if source not in sources_summary:
                sources_summary[source] = {
                    "source": source,
                    "chunks_count": 0,
                    "pages": set()
                }
            sources_summary[source]["chunks_count"] += 1
            sources_summary[source]["pages"].add(page)

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
    collection = get_knowledge_collection()
    # Query all matching IDs
    existing = collection.get(
        where={"source": source_name},
        include=["metadatas"]
    )
    if existing and existing.get("ids"):
        collection.delete(ids=existing["ids"])
        return len(existing["ids"])
    return 0


def count_indexed_chunks() -> int:
    """
    Returns total number of chunks indexed in the knowledge base.
    """
    collection = get_knowledge_collection()
    return collection.count()
