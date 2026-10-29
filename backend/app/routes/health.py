from fastapi import APIRouter
from sqlalchemy import text
from app.database.connection import engine
import os

router = APIRouter(tags=["Health"])

@router.get("/health")
def health_check():
    db_status = "unconfigured"
    db_error = None

    if os.getenv("DATABASE_URL"):
        try:
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            db_status = "connected"
        except Exception as e:
            db_status = "error"
            db_error = str(e)
    
    gemini_key_set = bool(os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY"))

    return {
        "status": "ok",
        "database": {
            "status": db_status,
            "error": db_error
        },
        "gemini": {
            "configured": gemini_key_set
        },
        "jwt_secret": {
            "configured": bool(os.getenv("SECRET_KEY"))
        }
    }

