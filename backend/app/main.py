from dotenv import load_dotenv, find_dotenv
import os
# Load unified environment variables from workspace root
load_dotenv(find_dotenv())

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, user, chat, upload, quiz, health

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Auto-create database tables on startup (safe for fresh deployments)
    from app.database.connection import engine, Base
    from app.database import models  # noqa: F401 — ensure models are registered
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title="Pathshala AI Backend",
    version="1.0.0",
    lifespan=lifespan
)

# Build CORS allowed origins from env (supports local dev + Vercel + custom domain)
_frontend_url = os.getenv("FRONTEND_URL", "")
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
if _frontend_url:
    origins.append(_frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes (supports both /route and /api/route for Vercel rewrites)
for prefix in ["", "/api"]:
    app.include_router(auth.router, prefix=prefix)
    app.include_router(user.router, prefix=prefix)
    app.include_router(chat.router, prefix=prefix)
    app.include_router(upload.router, prefix=prefix)
    app.include_router(quiz.router, prefix=prefix)
    app.include_router(health.router, prefix=prefix)

@app.get("/api")
@app.get("/")
def root():
    return {
        "message": "Welcome to Pathshala AI Backend 🚀"
    }