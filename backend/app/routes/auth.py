from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.schemas import UserCreate, UserLogin, Token, GoogleLoginRequest
from app.database import crud

from app.utils.password import hash_password, verify_password
from app.utils.jwt import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = crud.get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed = hash_password(user.password)

    new_user = crud.create_user(db, user, hashed)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = crud.get_user_by_email(db, user.email)

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "name": db_user.name,
        "email": db_user.email
    }


@router.post("/google-login", response_model=Token)
def google_login(data: GoogleLoginRequest, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, data.email)

    if not db_user:
        import uuid
        dummy_password = hash_password(str(uuid.uuid4()))
        user_create = UserCreate(
            name=data.name,
            email=data.email,
            password=dummy_password
        )
        db_user = crud.create_user(db, user_create, dummy_password)

    token = create_access_token(
        {
            "sub": db_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "name": db_user.name,
        "email": db_user.email
    }