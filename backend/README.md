# SoundStage Backend

FastAPI backend for real-time audio processing and sound effect generation.

## Setup

```bash
# Install dependencies with uv
uv pip install -e .

# For development dependencies
uv pip install -e ".[dev]"
```

## Running

```bash
# Development mode
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
ELEVENLABS_API_KEY=your_api_key_here
```

## API Endpoints

- `GET /` - Health check
- `GET /health` - Detailed health status
- `WS /ws` - WebSocket for real-time events

### Analysis
- `POST /api/analyze/start` - Start audio analysis
- `POST /api/analyze/stop` - Stop audio analysis
- `GET /api/analyze/status` - Get analysis status
- `GET /api/analyze/audio-devices` - List audio devices

### Trigger
- `POST /api/trigger/manual` - Manually trigger effect
- `POST /api/trigger/auto/enable` - Enable auto-triggering
- `POST /api/trigger/auto/disable` - Disable auto-triggering
- `GET /api/trigger/effects` - List available effects
- `GET /api/trigger/history` - Get trigger history

### Settings
- `POST /api/settings/consent` - Set user consent
- `GET /api/settings/consent` - Get consent status
- `POST /api/settings/update` - Update settings
- `GET /api/settings/current` - Get current settings
- `POST /api/settings/profile/save` - Save profile
- `GET /api/settings/profile/list` - List profiles
- `POST /api/settings/profile/load` - Load profile
