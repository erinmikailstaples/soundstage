"""
Audio capture service using sounddevice
Handles real-time audio input from various sources
"""
import sounddevice as sd
import numpy as np
import logging
from typing import Optional, Callable
from queue import Queue

logger = logging.getLogger(__name__)


class AudioCaptureService:
    """Service for capturing audio from system devices"""
    
    def __init__(
        self,
        sample_rate: int = 44100,
        channels: int = 2,
        blocksize: int = 1024
    ):
        self.sample_rate = sample_rate
        self.channels = channels
        self.blocksize = blocksize
        self.stream: Optional[sd.InputStream] = None
        self.is_capturing = False
        self.audio_queue = Queue()
        self.callback_fn: Optional[Callable] = None
        
    def list_devices(self):
        """List all available audio devices"""
        try:
            devices = sd.query_devices()
            return devices
        except Exception as e:
            logger.error(f"Error querying audio devices: {e}")
            return []
    
    def start_capture(self, device_id: Optional[int] = None, callback: Optional[Callable] = None):
        """Start capturing audio from specified device"""
        if self.is_capturing:
            logger.warning("Audio capture already in progress")
            return False
            
        self.callback_fn = callback
        
        try:
            def audio_callback(indata, frames, time, status):
                """Called for each audio block"""
                if status:
                    logger.warning(f"Audio callback status: {status}")
                
                # Convert to numpy array
                audio_data = np.copy(indata)
                
                # Add to queue for processing
                self.audio_queue.put(audio_data)
                
                # Call custom callback if provided
                if self.callback_fn:
                    self.callback_fn(audio_data)
            
            self.stream = sd.InputStream(
                device=device_id,
                channels=self.channels,
                samplerate=self.sample_rate,
                blocksize=self.blocksize,
                callback=audio_callback
            )
            
            self.stream.start()
            self.is_capturing = True
            logger.info(f"Audio capture started on device {device_id}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to start audio capture: {e}")
            return False
    
    def stop_capture(self):
        """Stop audio capture"""
        if not self.is_capturing:
            return
            
        try:
            if self.stream:
                self.stream.stop()
                self.stream.close()
                self.stream = None
            
            self.is_capturing = False
            logger.info("Audio capture stopped")
            
        except Exception as e:
            logger.error(f"Error stopping audio capture: {e}")
    
    def get_audio_data(self):
        """Get captured audio data from queue"""
        if self.audio_queue.empty():
            return None
        return self.audio_queue.get()
    
    def __del__(self):
        """Cleanup on deletion"""
        self.stop_capture()
