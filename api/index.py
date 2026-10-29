import sys
import os

# Add backend and root to path so FastAPI app modules resolve
backend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "backend")
root_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
for p in [os.path.abspath(backend_dir), os.path.abspath(root_dir)]:
    if p not in sys.path:
        sys.path.insert(0, p)

from app.main import app

