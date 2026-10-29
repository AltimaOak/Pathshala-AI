"""
Pathshala AI - Summary & Study Notes Service
Generates concise executive summaries, key flashcards, and revision notes from study materials.
"""

import os
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv, find_dotenv
from app.services.llm_service import _call_gemini, MODEL_NAME
from rag.retriever import retrieve_relevant_chunks
from rag.vector_store import get_knowledge_collection

load_dotenv(find_dotenv())


def generate_document_summary(
    source_name: Optional[str] = None,
    topic: Optional[str] = None
) -> Dict[str, Any]:
    """
    Generates a structured revision summary and key concepts list.
    """
    collection = get_knowledge_collection()
    query_kwargs = {"include": ["documents", "metadatas"]}
    if source_name:
        query_kwargs["where"] = {"source": source_name}

    results = collection.get(**query_kwargs)
    documents = results.get("documents", [])

    if not documents:
        return {
            "title": topic or source_name or "Study Notes",
            "summary": "No documents found to summarize. Please upload study materials first.",
            "key_takeaways": [],
            "source": source_name
        }

    combined_text = "\n\n".join(documents[:6])  # Combine first several chunks

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

    if not api_key:
        return {
            "title": f"Summary: {source_name or topic or 'Study Material'}",
            "summary": combined_text[:400] + "...",
            "key_takeaways": [
                "Fundamental definitions and core mechanisms",
                "Key formulas and operational principles",
                "Direct applications in examinations"
            ],
            "total_chunks_analyzed": len(documents[:6])
        }

    try:
        active_model = os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite")

        prompt = f"""You are a master academic summarizer for Pathshala AI.
Analyze the following study material excerpts and generate a clear, structured revision brief.

Content:
{combined_text}

Provide:
1. Executive Summary (2-3 paragraphs)
2. 5 Key Takeaways & Core Concepts (bullet points)
3. Essential Definitions or Formulas
"""
        response_text = _call_gemini(prompt, active_model, api_key)
        return {
            "title": f"Revision Brief: {source_name or topic or 'Study Notes'}",
            "content": response_text.strip(),
            "source": source_name,
            "total_chunks_analyzed": len(documents[:6])
        }

    except Exception as e:
        return {
            "title": f"Summary Error",
            "content": f"Failed to generate summary: {str(e)}",
            "source": source_name
        }
