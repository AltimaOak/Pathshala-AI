"""
Pathshala AI - Upload & Knowledge Base Routes
Handles uploading study materials, PDF parsing, vector indexing, and source listing.
"""

from fastapi import APIRouter, UploadFile, File, HTTPException, status
from typing import List, Dict, Any
from app.services.rag_service import (
    index_pdf_document,
    get_indexed_documents,
    remove_document,
    get_stats
)

router = APIRouter(
    prefix="/upload",
    tags=["Upload & Knowledge Base"]
)


@router.post("/pdf", summary="Upload and index a PDF document")
async def upload_pdf(file: UploadFile = File(...)):
    """
    Uploads a study material PDF, extracts its text, generates chunk embeddings,
    and indexes it into the ChromaDB vector database.
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Currently only PDF files (.pdf) are supported."
        )

    try:
        content = await file.read()
        if len(content) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty."
            )

        result = index_pdf_document(pdf_bytes=content, filename=file.filename)
        if not result.get("success"):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=result.get("error", "Failed to process PDF.")
            )

        return {
            "message": f"Successfully indexed '{file.filename}' into knowledge base.",
            "data": result
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing the document: {str(e)}"
        )


@router.get("/files", summary="List all indexed study documents")
def list_files():
    """
    Returns a list of all documents indexed in the student's knowledge base.
    """
    try:
        documents = get_indexed_documents()
        return {
            "count": len(documents),
            "files": documents
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve files: {str(e)}"
        )


@router.delete("/files/{filename}", summary="Delete an indexed document")
def delete_file(filename: str):
    """
    Removes a document and its embedding chunks from the vector database.
    """
    try:
        result = remove_document(filename)
        return {
            "message": f"Successfully deleted '{filename}' from knowledge base.",
            "data": result
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete file: {str(e)}"
        )


@router.get("/stats", summary="Get knowledge base statistics")
def knowledge_base_stats():
    """
    Returns overall statistics on indexed documents and chunks.
    """
    try:
        return get_stats()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch stats: {str(e)}"
        )
