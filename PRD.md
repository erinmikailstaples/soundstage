# Dynamic Soundboard for Streamers – Engineering Project Kickoff

## Goal

Ship a cross-platform (Windows/macOS) desktop app for live streamers. Analyze real-time audio from livestreams, trigger dynamic crowd/audience sound effects using ElevenLabs, and support both automatic and manual controls—including Stream Deck integration.

---

## Tech Breakdown

**Frontend:**  
- React (Next.js or Vite)
- Audio source selection, trigger visualization, manual effects triggers, onboarding, configuration, Stream Deck status, and privacy controls.

**Backend:**  
- Python (FastAPI)
- Real-time audio capture and routing using `sounddevice`
- Audio analysis (emotion, keyword, event detection)
- ElevenLabs API integration (user key/SaaS pool)
- SFX synthesis, config/profile persistence
- Consent & privacy policy enforcement
- Modular API endpoints for future OBS/Twitch/Stream Deck integration
- Expose secure HTTP/WebSocket interface to frontend

---

## Core Requirements

- Real-time audio input capture (using `sounddevice`), routing (mic, app, system; user-configurable)
- Continuous audio analysis for emotion, keywords, in-stream events
- Automated & manual SFX triggering (with override, hotkey, UI, and Stream Deck control)
- ElevenLabs integration (user API keys and SaaS keys)
- Explicit user consent dialog for all audio capture (no audio processed until accepted)
- Local-only processing by default—remote/cloud processing requires explicit opt-in
- Modular backend design for future integrations (OBS, Twitch, Discord)
- User onboarding focused on streamers (pro and novice; frictionless out-of-the-box value)
- Robust installer, error handling, auto-update, and crash reporting

---

## Out of Scope (for v1)

- Mobile/web versions
- Full Discord/OBS/Twitch automation
- Non-streaming use cases

---

## Tech Stack

- **Frontend:** React, Next.js (or Vite), WebSockets for real-time event sync
- **Backend:** Python 3.11+, FastAPI, [`sounddevice`](https://python-sounddevice.readthedocs.io/) for real-time audio, open-source ML for emotion/keyword/event detection (swap for production models later), ElevenLabs REST API
- **Desktop Wrapper:** Electron or Tauri (specify before engineering)
- **Internal Communication:** Secure HTTP and WebSockets between frontend and backend, with an assumption of evolving to SaaS/remote model later

---

## Sprint 0 — Immediate Deliverables

- Mono-repo with `/backend/fastapi` and `/frontend/react`
- FastAPI skeleton with `/analyze`, `/trigger`, `/settings` endpoints
- Basic React UI for onboarding, audio input selection, trigger preview/testing, and privacy consent dialog
- Backend: Audio capture implementation with `sounddevice`, basic streaming to analysis flow
- ElevenLabs API server-side integration
- Stream Deck connectivity stubbed (blocking IN until backend handshake/plugin interface spec’d)
- Consent modal enforced: No analysis/capture until user opt-in

---

## Next Decisions Needed

- Electron or Tauri for final desktop build?
- Confirm minimum Windows/macOS audio device compatibility with `sounddevice`.

---

Move fast, prioritize working audio in/out scaffolding and a fully functional consent gate. Integrate privacy and SFX triggering next, then connect manual controls and Stream Deck stubs.

