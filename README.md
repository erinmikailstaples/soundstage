# SoundStage

Dynamic Soundboard for Live Streamers - Real-time audio analysis and AI-generated crowd sound effects.

## Overview

SoundStage analyzes your stream audio in real-time and triggers dynamic crowd reactions using ElevenLabs API. Built for streamers who want to add immersive soundscapes to their content.

## Features

- 🎤 Real-time audio capture and analysis
- 🧠 Emotion, keyword, and event detection
- 🔊 AI-generated sound effects via ElevenLabs
- 🎮 Stream Deck integration (coming soon)
- 🔒 Privacy-first with local processing by default
- ⚡ Automatic and manual triggering modes

## Project Structure

```
soundstage/
├── backend/          # Python FastAPI backend
│   ├── main.py       # Main FastAPI application
│   ├── app/
│   │   ├── routers/  # API endpoints
│   │   ├── services/ # Audio capture, analysis, ElevenLabs
│   │   └── core/     # Configuration
│   └── requirements.txt
│
├── frontend/         # React + TypeScript frontend
│   ├── src/
│   │   ├── components/  # Consent dialog, etc.
│   │   ├── pages/       # Onboarding, Dashboard, Settings
│   │   └── App.tsx
│   └── package.json
│
└── PRD.md           # Product Requirements Document
```

## Quick Start

### Backend

```bash
cd backend

# Install dependencies with uv
uv pip install -e .

# Create .env file
cp .env.example .env
# Add your ElevenLabs API key

# Run server
uvicorn main:app --reload
```

Backend runs on `http://localhost:8000`

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

Frontend runs on `http://localhost:5173`

## Environment Variables

Create `backend/.env`:

```env
ELEVENLABS_API_KEY=your_api_key_here
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Development Status

This is Sprint 0 scaffolding. Core features are stubbed out and ready for implementation:

- ✅ Mono-repo structure
- ✅ FastAPI backend with endpoints
- ✅ React frontend with routing
- ✅ Consent and privacy flow
- ✅ Audio device selection UI
- ✅ Effect triggering UI
- ⏳ Audio capture with sounddevice (stub)
- ⏳ Audio analysis (emotion, keywords, events)
- ⏳ ElevenLabs integration (stub)
- ⏳ Stream Deck connectivity (stub)

## Tech Stack

**Backend:**
- Python 3.11+
- FastAPI
- sounddevice (audio capture)
- httpx (HTTP client)
- WebSockets

**Frontend:**
- React 18
- TypeScript
- Vite
- React Router

## Next Steps

1. Implement audio capture with sounddevice
2. Integrate ElevenLabs API for real sound generation
3. Add basic emotion detection
4. Connect WebSocket for real-time events
5. Decide on Electron vs Tauri for desktop packaging

## License

TBD
