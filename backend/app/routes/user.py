from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.database.schemas import UserResponse
from app.database.models import User
from app.utils.jwt import get_current_user
from pydantic import BaseModel, EmailStr

router = APIRouter(
    prefix="/user",
    tags=["User"]
)

class UserUpdate(BaseModel):
    name: str
    email: EmailStr

@router.get("/me", response_model=UserResponse)
def read_user_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserResponse)
def update_user_me(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if email is already taken by another user
    if data.email != current_user.email:
        from app.database import crud
        existing_user = crud.get_user_by_email(db, data.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already in use")
    
    current_user.name = data.name
    current_user.email = data.email
    db.commit()
    db.refresh(current_user)
    return current_user
