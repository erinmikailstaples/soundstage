"""
Configuration management for SoundStage backend
"""
from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    
    # API Configuration
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "SoundStage"
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]
    
    # Audio Settings
    SAMPLE_RATE: int = 44100
    CHANNELS: int = 2
    BLOCKSIZE: int = 1024
    
    # ElevenLabs
    ELEVENLABS_API_KEY: str = ""
    ELEVENLABS_BASE_URL: str = "https://api.elevenlabs.io/v1"
    
    # Privacy & Consent
    CONSENT_REQUIRED: bool = True
    LOCAL_PROCESSING_ONLY: bool = True
    
    # Paths
    CONFIG_DIR: str = "~/.soundstage"
    AUDIO_CACHE_DIR: str = "~/.soundstage/cache"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()
