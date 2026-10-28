"""
Pathshala AI - LLM Tutor Service
Interfaces with Google Gemini LLM to provide adaptive, Socratic, and grounded tutoring.
"""

import os
import re
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# Check for API Keys
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-3.1-flash-lite")

_GENAI_CONFIGURED = False


def _configure_genai() -> bool:
    """
    Configures google-generativeai client if API key is present.
    """
    global _GENAI_CONFIGURED
    load_dotenv(find_dotenv(), override=True)
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        return False

    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        _GENAI_CONFIGURED = True
        return True
    except Exception as e:
        print(f"[LLM Service] Error configuring Gemini: {e}")
        return False


def get_tutor_system_prompt(tutor_style: str = "balanced") -> str:
    """
    Returns pedagogical instructions tailored to student's chosen study mode.
    """
    style_prompts = {
        "socratic": (
            "You are a Socratic AI Tutor at Pathshala. Instead of immediately handing over the complete answer, "
            "guide the student step-by-step with encouraging hints, conceptual questions, and interactive scaffolding."
        ),
        "simple": (
            "You are a friendly, conceptual AI Tutor at Pathshala. Explain everything using vivid real-life analogies, "
            "simple words, and zero unnecessary jargon. Teach as if explaining to a curious learner."
        ),
        "exam": (
            "You are an Exam Prep AI Coach at Pathshala. Focus on exam-oriented clarity: provide key definitions, "
            "step-by-step problem solving, formulas, common pitfalls to avoid, and bulleted revision takeaways."
        ),
        "balanced": (
            "You are Pathshala AI, an expert, encouraging personal tutor across all disciplines (science, mathematics, "
            "computer science, engineering, literature, and general academic topics)."
        )
    }

    base_style = style_prompts.get(tutor_style.lower(), style_prompts["balanced"])

    return f"""{base_style}

Crucial Context & Subject Rules:
1. ONLY cite or mention study materials if they are explicitly present in the "STUDENT'S RELEVANT STUDY MATERIALS" section for THIS specific query.
2. If NO study material context is provided for this question, answer directly, accurately, and comprehensively using your broad academic and technical knowledge.
3. NEVER force or mention unrelated previous topics (for example: do NOT mention past biology or photosynthesis notes if the student asks about a coding tool, physics, or general software). Students frequently switch between completely different subjects.
4. When asked about modern developer tools, coding environments, or "Antigravity / Google Antigravity":
   - Recognize that Google Antigravity is Google's advanced agentic AI coding platform and IDE (developed with Google DeepMind for autonomous development, terminal commands, file editing, and slash commands like /plan and /goal). Explain how developers use it for pair programming, code generation, and project workflows.
5. Use formatted Markdown with bold headings, clean bullet points, code blocks, or formulas.
6. At the very end of your response, provide 2 or 3 short suggested follow-up questions on separate lines prefixed by 'Suggested: '.
"""


def generate_tutor_response(
    message: str,
    context: Optional[str] = None,
    sources: Optional[List[Dict[str, Any]]] = None,
    history: Optional[List[Dict[str, str]]] = None,
    tutor_style: str = "balanced"
) -> Dict[str, Any]:
    """
    Generates a contextualized AI tutor response.
    """
    system_prompt = get_tutor_system_prompt(tutor_style)

    prompt_parts = [system_prompt]

    # Only include study material section if relevant content was actually found
    if context and context.strip():
        prompt_parts.append("=== STUDENT'S RELEVANT STUDY MATERIALS (USE FOR THIS QUESTION) ===\n" + context.strip())
    else:
        prompt_parts.append("(No specific study document matched this inquiry. Answer directly from general academic and technical knowledge without mentioning unrelated documents.)")

    if history:
        history_text = "=== PREVIOUS CONVERSATION TURNS (FOR CONTEXTUAL CONTINUITY ONLY) ===\n"
        for turn in history[-4:]:  # Keep last 2 exchanges
            role = "Student" if turn.get("role") in ["user", "student"] else "Tutor"
            history_text += f"{role}: {turn.get('content', '')}\n"
        prompt_parts.append(history_text)

    prompt_parts.append(f"Student's Current Inquiry: {message}\n\nTutor Answer:")
    full_prompt = "\n\n".join(prompt_parts)

    # Check if Gemini is configured
    configured = _configure_genai()

    if not configured:
        # Fallback response when GEMINI_API_KEY is not yet added
        fallback_text = (
            "### 🎓 Pathshala AI Tutor\n\n"
            f"I received your question: *\"{message}\"*\n\n"
        )

        if context and context.strip():
            fallback_text += (
                "**📚 Relevant Study Material Found in Knowledge Base:**\n"
                f"{context[:600]}...\n\n"
            )

        fallback_text += (
            "> **⚙️ Setup Notice**: To enable live Gemini responses, please add your `GEMINI_API_KEY` "
            "to your `.env` file:\n"
            "> ```env\n> GEMINI_API_KEY=your_gemini_api_key_here\n> ```\n"
            "> You can get a free API key at [Google AI Studio](https://aistudio.google.com/). "
            "The RAG ingestion and semantic retrieval pipelines are fully running and ready!"
        )

        return {
            "response": fallback_text,
            "sources": sources or [],
            "suggested_questions": [
                "How do I configure my Gemini API key?",
                "Can you show me what documents are currently indexed?",
                "How does the Socratic tutor mode work?"
            ],
            "model": "local-fallback"
        }

    try:
        import google.generativeai as genai
        configured_model = os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite")
        candidate_models = list(dict.fromkeys([
            configured_model,
            "gemini-3.5-flash-lite",
            "gemini-3.1-flash-lite",
            "gemini-2.5-flash",
            "gemini-1.5-flash"
        ]))

        response = None
        last_error = None
        for m_name in candidate_models:
            try:
                model = genai.GenerativeModel(m_name)
                response = model.generate_content(full_prompt)
                if response:
                    break
            except Exception as err:
                last_error = err
                err_str = str(err).lower()
                if "404" in err_str or "not found" in err_str or "no longer available" in err_str or "deprecated" in err_str:
                    continue
                raise err

        if not response and last_error:
            raise last_error

        raw_text = response.text or ""

        # Extract suggested follow-up questions if present
        suggested_questions = []
        clean_lines = []
        for line in raw_text.split("\n"):
            if line.strip().startswith("Suggested:"):
                q = line.replace("Suggested:", "").strip().lstrip("-*123. ")
                if q:
                    suggested_questions.append(q)
            else:
                clean_lines.append(line)

        final_response_text = "\n".join(clean_lines).strip()

        # If model didn't output suggestions, add intelligent defaults
        if not suggested_questions:
            suggested_questions = [
                "Could you give me an example of this?",
                "How might this appear on an exam question?",
                "Can you quiz me on this topic?"
            ]

        return {
            "response": final_response_text,
            "sources": sources or [],
            "suggested_questions": suggested_questions[:3],
            "model": MODEL_NAME
        }

    except Exception as e:
        print(f"[LLM Service Error]: {e}")
        return {
            "response": f"I encountered an issue connecting to the AI model: {str(e)}.\nPlease verify your GEMINI_API_KEY in `.env`.",
            "sources": sources or [],
            "suggested_questions": ["Try asking again", "Check API Key"],
            "model": "error"
        }
