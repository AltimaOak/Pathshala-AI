from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv, find_dotenv
from fastapi import HTTPException, status
import os

# Load environment variables
load_dotenv(find_dotenv())

raw_db_url = os.getenv("DATABASE_URL", "").strip()

# Normalize Postgres dialect for SQLAlchemy 2.0 (e.g. postgres:// -> postgresql://)
if raw_db_url.startswith("postgres://"):
    DATABASE_URL = raw_db_url.replace("postgres://", "postgresql://", 1)
elif raw_db_url:
    DATABASE_URL = raw_db_url
else:
    # Fallback to local SQLite if DATABASE_URL is not set so the app doesn't crash on import
    DATABASE_URL = "sqlite:////tmp/pathshala_fallback.db" if os.getenv("VERCEL") else "sqlite:///./fallback.db"

# Clean Neon-specific channel binding parameter that can cause psycopg2 to fail
DATABASE_URL = DATABASE_URL.replace("&channel_binding=require", "").replace("channel_binding=require&", "")

# Create SQLAlchemy engine with pool pre-ping to handle serverless disconnects
connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

# Auto-create tables once
_tables_initialized = False

def init_db():
    global _tables_initialized
    if not _tables_initialized:
        try:
            from app.database import models  # noqa: F401
            Base.metadata.create_all(bind=engine)
            _tables_initialized = True
        except Exception as e:
            print(f"[Database Init Warning]: Could not create tables: {e}")

# Call init_db on module load
init_db()

# Dependency
def get_db():
    if not os.getenv("DATABASE_URL"):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="DATABASE_URL environment variable is missing in Vercel settings."
        )
    init_db()
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database query failed: {str(e)}"
        )
    finally:
        db.close()
