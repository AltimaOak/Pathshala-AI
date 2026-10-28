"""
Pathshala AI - RAG Service
Coordinates indexing of student notes, semantic searching, and context aggregation.
"""

import sys
import os
from typing import List, Dict, Any, Optional

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from rag.vector_store import (
    add_chunks_to_vector_store,
    list_indexed_sources,
    delete_source_from_vector_store,
    count_indexed_chunks,
    get_knowledge_collection
)
from rag.retriever import retrieve_relevant_chunks
from rag.pipeline import build_rag_context
from app.services.pdf_service import process_pdf_bytes


def index_pdf_document(pdf_bytes: bytes, filename: str) -> Dict[str, Any]:
    """
    Ingests an uploaded PDF: extracts, splits, embeds, and indexes it into ChromaDB.
    """
    processing_result = process_pdf_bytes(pdf_bytes, filename=filename)
    if not processing_result["success"]:
        return processing_result

    chunks = processing_result["chunks"]
    indexed_count = add_chunks_to_vector_store(chunks)

    return {
        "success": True,
        "filename": filename,
        "total_pages": processing_result["total_pages"],
        "indexed_chunks": indexed_count
    }


def search_knowledge_base(
    query: str,
    top_k: int = 4,
    source_filter: Optional[str] = None
) -> List[Dict[str, Any]]:
    """
    Finds relevant chunks for a question.
    """
    return retrieve_relevant_chunks(
        query=query,
        top_k=top_k,
        source_filter=source_filter
    )


def get_query_context(
    query: str,
    top_k: int = 4,
    source_filter: Optional[str] = None
) -> Dict[str, Any]:
    """
    Retrieves and builds formatted context for LLM prompt augmentation.
    """
    return build_rag_context(
        query=query,
        top_k=top_k,
        source_filter=source_filter
    )


def get_indexed_documents() -> List[Dict[str, Any]]:
    """
    Returns list of all active documents in the vector store.
    """
    return list_indexed_sources()


def remove_document(filename: str) -> Dict[str, Any]:
    """
    Removes all chunks of a document from ChromaDB.
    """
    deleted_count = delete_source_from_vector_store(filename)
    return {
        "success": True,
        "filename": filename,
        "deleted_chunks": deleted_count
    }


def get_stats() -> Dict[str, Any]:
    """
    Returns high-level statistics about the knowledge base.
    """
    sources = list_indexed_sources()
    total_chunks = count_indexed_chunks()
    return {
        "total_documents": len(sources),
        "total_chunks": total_chunks,
        "documents": sources
    }
