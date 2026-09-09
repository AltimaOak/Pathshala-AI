from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, user

app = FastAPI(
    title="Pathshala AI Backend",
    version="1.0.0"
)

# Allow your React frontend to communicate with the backend
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(auth.router)
app.include_router(user.router)


@app.get("/")
def root():
    return {
        "message": "Welcome to Pathshala AI Backend 🚀"
    }