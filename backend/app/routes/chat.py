"""
Pathshala AI - Chat & AI Tutor Routes
Provides conversational AI tutor endpoints with RAG context grounding and memory.
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

from app.services.rag_service import get_query_context
from app.services.llm_service import generate_tutor_response, GEMINI_API_KEY
from app.services.memory_service import append_message, get_session_history, clear_session_history
from rag.vector_store import count_indexed_chunks, list_indexed_sources

router = APIRouter(
    prefix="/chat",
    tags=["Chat & AI Tutor"]
)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="Student's message or academic question")
    session_id: Optional[str] = Field("default", description="Session identifier for memory")
    tutor_style: Optional[str] = Field("balanced", description="Tutoring style: balanced, socratic, simple, or exam")
    source_filter: Optional[str] = Field(None, description="Optional filename filter to restrict context search")
    top_k: Optional[int] = Field(4, ge=1, le=10, description="Number of knowledge base snippets to retrieve")


class ClearHistoryRequest(BaseModel):
    session_id: str = "default"


@router.post("", summary="Send a question to the AI Tutor")
def chat_with_tutor(request: ChatRequest):
    """
    Processes student query through RAG pipeline:
    1. Retrieves relevant excerpts from uploaded study materials.
    2. Incorporates conversation memory.
    3. Prompts LLM using the selected pedagogical tutor style.
    4. Returns grounded answer with citations and follow-up prompts.
    """
    try:
        # Step 1: Semantic Retrieval from Knowledge Base
        rag_data = get_query_context(
            query=request.message,
            top_k=request.top_k,
            source_filter=request.source_filter
        )

        context_text = rag_data.get("context_text", "")
        sources = rag_data.get("sources", [])

        # Step 2: Fetch Conversation History
        history = get_session_history(request.session_id)

        # Step 3: LLM Generation
        llm_result = generate_tutor_response(
            message=request.message,
            context=context_text,
            sources=sources,
            history=history,
            tutor_style=request.tutor_style
        )

        response_text = llm_result.get("response", "")

        # Step 4: Update Conversation Memory
        append_message(request.session_id, role="user", content=request.message)
        append_message(request.session_id, role="assistant", content=response_text)

        return {
            "response": response_text,
            "sources": llm_result.get("sources", []),
            "suggested_questions": llm_result.get("suggested_questions", []),
            "model": llm_result.get("model", "unknown"),
            "has_context": rag_data.get("has_context", False)
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating tutor response: {str(e)}"
        )


@router.post("/clear", summary="Clear session conversation history")
def clear_chat(request: ClearHistoryRequest):
    """
    Clears memory for the given session ID.
    """
    cleared = clear_session_history(request.session_id)
    return {
        "success": True,
        "message": f"Session '{request.session_id}' history cleared."
    }


@router.get("/health", summary="Check AI Tutor & Knowledge Base health")
def tutor_health():
    """
    Diagnostics endpoint to verify API key, Vector DB, and indexed materials status.
    """
    from os import getenv
    from dotenv import load_dotenv, find_dotenv
    load_dotenv(find_dotenv(), override=True)
    has_gemini = bool(getenv("GEMINI_API_KEY") or getenv("GOOGLE_API_KEY"))
    chunks_count = count_indexed_chunks()
    indexed_docs = list_indexed_sources()

    return {
        "status": "online",
        "gemini_api_configured": has_gemini,
        "model_engine": getenv("GEMINI_MODEL", "gemini-3.8-flash"),
        "vector_store": "ChromaDB",
        "embedding_model": "all-MiniLM-L6-v2 (local)",
        "indexed_chunks": chunks_count,
        "indexed_documents_count": len(indexed_docs),
        "documents": [d["source"] for d in indexed_docs]
    }
