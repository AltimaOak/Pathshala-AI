"""
Pathshala AI - PDF & Document Service
Handles file uploads, text extraction, cleaning, and preparation for embedding.
"""

import sys
import os
from typing import List, Dict, Any

# Ensure project root is in python path
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from rag.chunking import (
    extract_text_from_pdf_bytes,
    extract_text_from_pdf_file,
    chunk_document_pages
)


def process_pdf_bytes(
    pdf_bytes: bytes,
    filename: str,
    chunk_size: int = 700,
    chunk_overlap: int = 120
) -> Dict[str, Any]:
    """
    Extracts pages and chunks a PDF directly from uploaded bytes in memory.
    """
    pages_data = extract_text_from_pdf_bytes(pdf_bytes, filename=filename)
    if not pages_data:
        return {
            "success": False,
            "filename": filename,
            "total_pages": 0,
            "chunks": [],
            "error": "No extractable text found in PDF."
        }

    chunks = chunk_document_pages(
        pages_data=pages_data,
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )

    return {
        "success": True,
        "filename": filename,
        "total_pages": len(pages_data),
        "chunks_count": len(chunks),
        "chunks": chunks
    }


def process_pdf_file(
    file_path: str,
    chunk_size: int = 700,
    chunk_overlap: int = 120
) -> Dict[str, Any]:
    """
    Extracts pages and chunks a PDF from a filesystem path.
    """
    filename = os.path.basename(file_path)
    with open(file_path, "rb") as f:
        return process_pdf_bytes(f.read(), filename, chunk_size, chunk_overlap)
