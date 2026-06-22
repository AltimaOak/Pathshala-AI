from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, user

app = FastAPI(
    title="Pathshala AI Backend",
    version="1.0.0"
)

# Allow your React frontend to communicate with the backend
origins = [
    "http://localhost:5173",   # Vite React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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