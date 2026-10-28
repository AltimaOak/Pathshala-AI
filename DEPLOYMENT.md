# 🚀 Pathshala AI — Deployment Guide

**Stack:** React/Vite frontend on **Vercel** + FastAPI backend on **Railway**

---

## Architecture Overview

```
Browser
  │
  ├── Frontend (Vercel) ──────────── React SPA, static, global CDN
  │     └── https://pathshala-ai.vercel.app
  │
  └── Backend (Railway) ──────────── FastAPI + Python ML, persistent disk
        └── https://pathshala-ai.up.railway.app
```

---

## Step 1 — Push Code to GitHub

If not already on GitHub:

```bash
cd d:\PathshalaAi
git add .
git commit -m "feat: add deployment config"
git push
```

If no remote yet:
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/PathshalaAi.git
git push -u origin main
```

---

## Step 2 — Deploy Backend on Railway

### 2a. Create Railway Account
Go to [railway.app](https://railway.app) → Sign up with GitHub (free).

### 2b. New Project from GitHub
1. Click **"New Project"** → **"Deploy from GitHub repo"**
2. Select your `PathshalaAi` repo
3. Set **Root Directory** to `backend`
4. Railway auto-detects Python and reads `railway.json`

### 2c. Add PostgreSQL Database
1. In your Railway project, click **"New"** → **"Database"** → **"PostgreSQL"**
2. Railway automatically injects `DATABASE_URL` into your service

### 2d. Add Environment Variables
In Railway **Service → Variables**, add:

| Variable | Value |
|---|---|
| `GEMINI_API_KEY` | Your key from [aistudio.google.com](https://aistudio.google.com) |
| `GEMINI_MODEL` | `gemini-2.0-flash-lite` |
| `SECRET_KEY` | A random 32+ character string |
| `ALGORITHM` | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` |
| `FRONTEND_URL` | *(add after Vercel deploy — your Vercel URL)* |

> `DATABASE_URL` is auto-injected by the PostgreSQL addon — no need to add it manually.

### 2e. Get Your Railway URL
After deployment: **Settings → Domains** → copy the URL  
(e.g., `https://pathshala-ai-production.up.railway.app`)

---

## Step 3 — Deploy Frontend on Vercel

### 3a. Create Vercel Account
Go to [vercel.com](https://vercel.com) → Sign up with GitHub (free).

### 3b. Import Project
1. Click **"Add New Project"** → **"Import Git Repository"**
2. Select `PathshalaAi`
3. Set **Root Directory** to `frontend`
4. Framework preset auto-detects **Vite** ✓

### 3c. Add Environment Variables
In Vercel **Project → Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `VITE_GOOGLE_CLIENT_ID` | Your Google OAuth Client ID |
| `VITE_API_URL` | Your Railway URL (e.g. `https://pathshala-ai.up.railway.app`) |

### 3d. Deploy
Click **Deploy**. Vercel builds with `npm run build` and serves on global CDN.

---

## Step 4 — Connect Frontend ↔ Backend (CORS)

1. Copy your **Vercel URL** (e.g., `https://pathshala-ai.vercel.app`)
2. Go back to **Railway → Service → Variables**
3. Set `FRONTEND_URL` = `https://pathshala-ai.vercel.app`
4. Railway auto-redeploys → CORS now allows your Vercel origin

---

## Step 5 — Update Google OAuth

In [Google Cloud Console](https://console.cloud.google.com):
1. **APIs & Services → Credentials → OAuth 2.0 Client IDs → Edit**
2. **Authorized JavaScript origins** → add your Vercel URL
3. **Authorized redirect URIs** → add your Vercel URL

---

## Files Created for Deployment

| File | Purpose |
|---|---|
| `backend/Procfile` | Railway start command |
| `backend/runtime.txt` | Python version pin (3.10) |
| `backend/railway.json` | Railway build & deploy config |
| `backend/railway.toml` | Railway TOML config (alternative) |
| `backend/requirements-deploy.txt` | Slim deps for production (no bloat) |
| `frontend/vercel.json` | SPA routing + asset caching |
| `.env.example` | Template for all env vars |

---

## Costs

| Service | Free Tier |
|---|---|
| **Vercel** | Free forever for hobby |
| **Railway** | $5 trial credit (~500 compute hours) |
| **Railway PostgreSQL** | Included |
| **Gemini API** | Free: 1,500 req/day |

---

## Troubleshooting

**CORS errors** → Verify `FRONTEND_URL` in Railway matches your exact Vercel URL (no trailing slash)

**503 on Railway** → Railway does NOT spin down on free tier (unlike Render). Check logs in Railway dashboard.

**ModuleNotFoundError** → Add missing package to `requirements-deploy.txt`, commit, push — Railway auto-redeploys.

**Database errors** → Confirm PostgreSQL addon is linked to the backend service in Railway dashboard.
