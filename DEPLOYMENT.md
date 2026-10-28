# 🚀 Pathshala AI — Deployment Guide

Pathshala AI is configured for **full-stack deployment on Vercel** using Vercel Multi-Services.

---

## 🏗️ Architecture on Vercel

```
                        https://your-app.vercel.app
                                    │
                ┌───────────────────┴───────────────────┐
                │                                       │
         /api/(.*) requests                    All other routes (.*)
                │                                       │
        ▼                                       ▼
  Backend (FastAPI)                       Frontend (Vite / React)
  root: backend/                          root: frontend/
  framework: fastapi                      framework: vite
```

---

## ⚡ Step 1: Verify Code & Commit to GitHub

Run in PowerShell:
```powershell
git add .
git commit -m "feat: configure all-in-one Vercel multi-service deployment"
git push origin main
```

---

## ⚡ Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New Project"** → **"Import Git Repository"**.
3. Select your repository: `AltimaOak/Pathshala-AI`.
4. **Root Directory**: Leave as `.` (root directory) — Vercel reads the root `vercel.json` to orchestrate both services.
5. In **Environment Variables**, add:

| Variable | Value | Notes |
|---|---|---|
| `GEMINI_API_KEY` | `your_gemini_api_key` | From [Google AI Studio](https://aistudio.google.com) |
| `GEMINI_MODEL` | `gemini-2.0-flash-lite` | Or `gemini-1.5-flash` |
| `DATABASE_URL` | `postgresql://...` | Neon, Supabase, or Railway PostgreSQL |
| `SECRET_KEY` | `your_secret_key_32_chars` | Random 32+ char string for JWT |
| `ALGORITHM` | `HS256` | Default JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | Session expiration |
| `VITE_GOOGLE_CLIENT_ID` | `your_google_client_id` | From Google Cloud Console |
| `VITE_API_URL` | `/api` | Set to `/api` so frontend queries the Vercel backend route |

6. Click **Deploy**!

---

## ⚡ Step 3: Google OAuth Configuration

After deployment, Vercel gives you your URL (e.g. `https://pathshala-ai.vercel.app`):
1. Open [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Edit your **OAuth 2.0 Client ID**.
3. In **Authorized JavaScript origins**, add:
   - `https://pathshala-ai.vercel.app`
4. In **Authorized redirect URIs**, add:
   - `https://pathshala-ai.vercel.app`
5. Save changes.

---

## 📁 Key Deployment Files

- [vercel.json](file:///d:/PathshalaAi/vercel.json): Root multi-service router directing `/api/(.*)` to `backend` and `/(.*)` to `frontend`.
- [backend/main.py](file:///d:/PathshalaAi/backend/main.py): ASGI entrypoint for Vercel Python runner.
- [backend/requirements.txt](file:///d:/PathshalaAi/backend/requirements.txt): Lightweight dependencies using Gemini API embeddings (serverless compatible, <250MB).
- [rag/embeddings.py](file:///d:/PathshalaAi/rag/embeddings.py): Serverless embedding pipeline using Gemini `text-embedding-004`.
- [rag/vector_store.py](file:///d:/PathshalaAi/rag/vector_store.py): ChromaDB storage with automatic fallback to `/tmp` on serverless.
