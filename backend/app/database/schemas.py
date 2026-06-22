from datetime import datetime
from pydantic import BaseModel, EmailStr


# -----------------------------
# Register Request
# -----------------------------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


# -----------------------------
# Login Request
# -----------------------------
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# -----------------------------
# Response Model
# -----------------------------
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


# -----------------------------
# JWT Token Response
# -----------------------------
class Token(BaseModel):
    access_token: str
    token_type: str
    name: str
    email: str


# -----------------------------
# Google Login Request
# -----------------------------
class GoogleLoginRequest(BaseModel):
    name: str
    email: EmailStr