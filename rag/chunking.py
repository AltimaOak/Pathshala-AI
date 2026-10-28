"""
Pathshala AI - Document Chunking & Text Extraction
Extracts text from PDF/text documents and splits them into semantically rich chunks with metadata.
Zero-heavy-dependency: works with pypdf (pure Python) and standalone recursive splitter.
"""

import os
import io
import re
from typing import List, Dict, Any, Union

def _extract_pdf_pages_pypdf(pdf_bytes: bytes, filename: str) -> List[Dict[str, Any]]:
    import pypdf
    reader = pypdf.PdfReader(io.BytesIO(pdf_bytes))
    pages_data = []
    for idx, page in enumerate(reader.pages):
        text = (page.extract_text() or "").strip()
        if text:
            pages_data.append({
                "text": text,
                "page": idx + 1,
                "source": filename
            })
    return pages_data


def _extract_pdf_pages_fitz(pdf_bytes: bytes, filename: str) -> List[Dict[str, Any]]:
    import fitz  # PyMuPDF
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    pages_data = []
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text("text").strip()
        if text:
            pages_data.append({
                "text": text,
                "page": page_num + 1,
                "source": filename
            })
    doc.close()
    return pages_data


def extract_text_from_pdf_bytes(pdf_bytes: bytes, filename: str = "document.pdf") -> List[Dict[str, Any]]:
    """
    Extracts text from PDF raw bytes page-by-page.
    Tries PyMuPDF (fitz) if installed, otherwise uses pure-Python pypdf.
    """
    try:
        return _extract_pdf_pages_fitz(pdf_bytes, filename)
    except Exception:
        return _extract_pdf_pages_pypdf(pdf_bytes, filename)


def extract_text_from_pdf_file(file_path: str) -> List[Dict[str, Any]]:
    """
    Extracts text from a local PDF file path page-by-page.
    """
    filename = os.path.basename(file_path)
    with open(file_path, "rb") as f:
        return extract_text_from_pdf_bytes(f.read(), filename=filename)


class _SimpleRecursiveSplitter:
    def __init__(self, chunk_size: int = 700, chunk_overlap: int = 120, separators: List[str] = None):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.separators = separators or ["\n\n", "\n", ". ", "? ", "! ", " ", ""]

    def split_text(self, text: str) -> List[str]:
        return self._split(text, self.separators)

    def _split(self, text: str, separators: List[str]) -> List[str]:
        if len(text) <= self.chunk_size:
            return [text] if text.strip() else []

        sep = separators[-1]
        for s in separators:
            if s == "" or s in text:
                sep = s
                break

        if sep:
            splits = text.split(sep)
        else:
            splits = list(text)

        chunks = []
        current = ""
        for part in splits:
            piece = (current + sep + part) if current else part
            if len(piece) <= self.chunk_size:
                current = piece
            else:
                if current.strip():
                    chunks.append(current.strip())
                # If a single piece is bigger than chunk_size, recursively split with next separators
                if len(part) > self.chunk_size and len(separators) > 1:
                    sub_index = separators.index(sep) + 1 if sep in separators else 1
                    sub_chunks = self._split(part, separators[sub_index:])
                    chunks.extend(sub_chunks)
                    current = ""
                else:
                    # Apply overlap from the tail of current chunk if possible
                    overlap_prefix = current[-self.chunk_overlap:] if len(current) > self.chunk_overlap else ""
                    current = (overlap_prefix + " " + part).strip()

        if current.strip():
            chunks.append(current.strip())

        return chunks


def chunk_document_pages(
    pages_data: List[Dict[str, Any]],
    chunk_size: int = 700,
    chunk_overlap: int = 120
) -> List[Dict[str, Any]]:
    """
    Chunks document pages into overlapping text chunks.
    Preserves page numbers, source document names, and assigns unique chunk IDs.
    """
    splitter = _SimpleRecursiveSplitter(
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
