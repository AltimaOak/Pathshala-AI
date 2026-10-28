"""
Pathshala AI - Memory Service
Stores and manages conversational context and session chat history.
"""

from typing import List, Dict, Any
from collections import defaultdict

# In-memory session store (keyed by session_id or user_id)
_CHAT_SESSIONS = defaultdict(list)
_MAX_HISTORY_PER_SESSION = 20


def append_message(session_id: str, role: str, content: str) -> None:
    """
    Appends a turn to the session history.
    """
    history = _CHAT_SESSIONS[session_id]
    history.append({
        "role": role,
        "content": content
    })
    # Trim to prevent memory bloat
    if len(history) > _MAX_HISTORY_PER_SESSION:
        _CHAT_SESSIONS[session_id] = history[-_MAX_HISTORY_PER_SESSION:]


def get_session_history(session_id: str) -> List[Dict[str, str]]:
    """
    Retrieves the recent history for a session.
    """
    return _CHAT_SESSIONS.get(session_id, [])


def clear_session_history(session_id: str) -> bool:
    """
    Clears conversation history for a given session.
    """
    if session_id in _CHAT_SESSIONS:
        del _CHAT_SESSIONS[session_id]
        return True
    return False
