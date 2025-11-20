import { useState, useEffect } from 'react'
import './Onboarding.css'

interface OnboardingProps {
  onComplete: () => void
}

interface AudioDevice {
  id: number
  name: string
  type: string
  channels: number
}

function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1)
  const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([])
  const [selectedInput, setSelectedInput] = useState<number | null>(null)
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    if (step === 2) {
      fetchAudioDevices()
    }
  }, [step])

  const fetchAudioDevices = async () => {
    try {
      const response = await fetch('/api/analyze/audio-devices')
      const data = await response.json()
      setAudioDevices(data.devices || [])
    } catch (error) {
      console.error('Failed to fetch audio devices:', error)
    }
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Save settings and complete onboarding
      saveSettings()
    }
  }

  const handleSkip = () => {
    setStep(step + 1)
  }

  const saveSettings = async () => {
    try {
      await fetch('/api/settings/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audio_input_device: selectedInput?.toString(),
          elevenlabs_api_key: apiKey || null,
        }),
      })
      onComplete()
    } catch (error) {
      console.error('Failed to save settings:', error)
      onComplete() // Continue anyway
    }
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        {step === 1 && (
          <div className="onboarding-step">
            <h1>Welcome to SoundStage!</h1>
            <p className="subtitle">Let's get you set up in just a few steps</p>
            
            <div className="feature-list">
              <div className="feature">
                <span className="icon">🎤</span>
                <div>
                  <h3>Real-time Audio Analysis</h3>
                  <p>Automatically detect emotions and events in your stream</p>
                </div>
              </div>
              <div className="feature">
                <span className="icon">🔊</span>
                <div>
                  <h3>Dynamic Sound Effects</h3>
                  <p>Trigger crowd reactions with AI-generated audio</p>
                </div>
              </div>
              <div className="feature">
                <span className="icon">🎮</span>
                <div>
                  <h3>Stream Deck Integration</h3>
                  <p>Manual controls at your fingertips</p>
                </div>
              </div>
            </div>

            <button className="btn-primary" onClick={handleNext}>
              Get Started
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step">
            <h2>Select Your Audio Source</h2>
            <p>Choose which audio input to monitor for your stream</p>

            <div className="device-list">
              {audioDevices.map((device) => (
                <label key={device.id} className="device-option">
                  <input
                    type="radio"
                    name="audio-device"
                    value={device.id}
                    checked={selectedInput === device.id}
                    onChange={() => setSelectedInput(device.id)}
                  />
                  <div className="device-info">
                    <span className="device-name">{device.name}</span>
                    <span className="device-meta">
                      {device.channels} channel{device.channels > 1 ? 's' : ''}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <div className="button-group">
              <button className="btn-secondary" onClick={() => setStep(step - 1)}>
                Back
              </button>
              <button className="btn-primary" onClick={handleNext} disabled={!selectedInput}>
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-step">
            <h2>ElevenLabs API Key (Optional)</h2>
            <p>Add your ElevenLabs API key for sound effect generation</p>

            <div className="form-group">
              <label>API Key</label>
              <input
                type="password"
                placeholder="sk_..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="input-text"
              />
              <small>
                Don't have one? <a href="https://elevenlabs.io" target="_blank">Get it here</a>
              </small>
            </div>

            <div className="info-box">
              <p>
                <strong>Note:</strong> If you don't provide your own API key, you can use our
                shared pool with limited usage. You can always add your key later in settings.
              </p>
            </div>

            <div className="button-group">
              <button className="btn-secondary" onClick={() => setStep(step - 1)}>
                Back
              </button>
              <button className="btn-tertiary" onClick={handleSkip}>
                Skip for Now
              </button>
              <button className="btn-primary" onClick={handleNext}>
                Finish Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Onboarding
