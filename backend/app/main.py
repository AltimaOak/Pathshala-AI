from dotenv import load_dotenv, find_dotenv
import os
# Load unified environment variables from workspace root
load_dotenv(find_dotenv())

import threading
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, user, chat, upload, quiz

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Pre-warm embedding model in background thread on startup
    def warm_up():
        try:
            from rag.embeddings import get_embedding_model
            get_embedding_model()
            print("[Pathshala AI] Embedding model pre-warmed & ready.")
        except Exception as e:
            print(f"[Pathshala AI] Warning: Could not pre-warm embedding model: {e}")

    threading.Thread(target=warm_up, daemon=True).start()
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
    # Also dynamically allow any *.vercel.app subdomain for preview deployments
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(chat.router)
app.include_router(upload.router)
app.include_router(quiz.router)


@app.get("/")
def root():
    return {
        "message": "Welcome to Pathshala AI Backend 🚀"
    }