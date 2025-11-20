# SoundStage Frontend

React + TypeScript frontend for the SoundStage dynamic soundboard application.

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

The frontend runs on `http://localhost:5173` by default and proxies API requests to the backend at `http://localhost:8000`.

## Features

- **Consent Dialog**: Privacy-first onboarding with explicit consent for audio capture
- **Onboarding Flow**: Guided setup for audio devices and API keys
- **Dashboard**: Real-time control panel for audio analysis and effect triggering
- **Settings**: Configuration management for devices, sensitivity, and preferences

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
