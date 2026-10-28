"""
Pathshala AI - Document Chunking & Text Extraction
Extracts text from PDF/text documents and splits them into semantically rich chunks with metadata.
"""

import os
from typing import List, Dict, Any, Union
import fitz  # PyMuPDF
from langchain_text_splitters import RecursiveCharacterTextSplitter


def extract_text_from_pdf_bytes(pdf_bytes: bytes, filename: str = "document.pdf") -> List[Dict[str, Any]]:
    """
    Extracts text from PDF raw bytes page-by-page.
    Returns a list of dicts: [{"text": str, "page": int, "source": str}]
    """
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    pages_data = []

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text("text").strip()
        if text:
            pages_data.append({
                "text": text,
                "page": page_num + 1,  # 1-indexed for students
                "source": filename
            })

    doc.close()
    return pages_data


def extract_text_from_pdf_file(file_path: str) -> List[Dict[str, Any]]:
    """
    Extracts text from a local PDF file path page-by-page.
    """
    filename = os.path.basename(file_path)
    with open(file_path, "rb") as f:
        return extract_text_from_pdf_bytes(f.read(), filename=filename)


def chunk_document_pages(
    pages_data: List[Dict[str, Any]],
    chunk_size: int = 700,
    chunk_overlap: int = 120
) -> List[Dict[str, Any]]:
    """
    Chunks document pages into overlapping text chunks using RecursiveCharacterTextSplitter.
    Preserves page numbers, source document names, and assigns unique chunk IDs.
    """
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=["\n\n", "\n", ". ", "? ", "! ", " ", ""]
    )

    all_chunks = []
    chunk_index = 0

    for page_item in pages_data:
        page_text = page_item["text"]
        page_num = page_item["page"]
        source_name = page_item["source"]

        chunks = splitter.split_text(page_text)
        for sub_idx, chunk_str in enumerate(chunks):
            cleaned = chunk_str.strip()
            if not cleaned or len(cleaned) < 15:
                continue

            chunk_id = f"{source_name}_p{page_num}_c{chunk_index}"
            all_chunks.append({
                "id": chunk_id,
                "text": cleaned,
                "metadata": {
                    "source": source_name,
                    "page": page_num,
                    "chunk_index": chunk_index,
                    "char_count": len(cleaned)
                }
            })
            chunk_index += 1

    return all_chunks
