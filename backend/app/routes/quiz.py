"""
Pathshala AI - Quiz Routes
Provides interactive quiz generation and evaluation endpoints.
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from app.services.quiz_service import generate_quiz_from_topic

router = APIRouter(
    prefix="/quiz",
    tags=["Quiz & Assessments"]
)


class QuizRequest(BaseModel):
    topic: str = Field(..., min_length=2, description="Topic or subject to generate quiz for")
    num_questions: Optional[int] = Field(5, ge=1, le=15, description="Number of questions")
    difficulty: Optional[str] = Field("medium", description="Difficulty level: easy, medium, hard")


@router.post("/generate", summary="Generate a quiz on a topic")
def create_quiz(request: QuizRequest):
    """
    Generates a multiple-choice practice quiz grounded in study materials.
    """
    try:
        quiz = generate_quiz_from_topic(
            topic=request.topic,
            num_questions=request.num_questions,
            difficulty=request.difficulty
        )
        return quiz
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate quiz: {str(e)}"
        )
