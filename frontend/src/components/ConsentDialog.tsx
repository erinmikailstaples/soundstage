import { useState } from 'react'
import './ConsentDialog.css'

interface ConsentDialogProps {
  onAccept: () => void
  onDecline: () => void
}

function ConsentDialog({ onAccept, onDecline }: ConsentDialogProps) {
  const [cloudProcessing, setCloudProcessing] = useState(false)

  return (
    <div className="consent-overlay">
      <div className="consent-dialog">
        <h1>Welcome to SoundStage</h1>
        <p className="subtitle">Your Dynamic Soundboard for Live Streaming</p>

        <div className="consent-content">
          <h2>Privacy & Consent</h2>
          
          <div className="consent-section">
            <h3>Required: Audio Capture</h3>
            <p>
              SoundStage needs permission to capture audio from your microphone and/or
              system audio to analyze your stream and trigger sound effects.
            </p>
            <ul>
              <li>Audio is processed locally on your device by default</li>
              <li>No audio is recorded or stored</li>
              <li>You can revoke this permission at any time</li>
            </ul>
          </div>

          <div className="consent-section optional">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={cloudProcessing}
                onChange={(e) => setCloudProcessing(e.target.checked)}
              />
              <div>
                <h3>Optional: Cloud Processing</h3>
                <p>
                  Enable cloud-based audio analysis for improved accuracy. Audio will be
                  sent to our secure servers for processing.
                </p>
              </div>
            </label>
          </div>

          <div className="privacy-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <span>•</span>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          </div>
        </div>

        <div className="consent-actions">
          <button className="btn-secondary" onClick={onDecline}>
            Decline
          </button>
          <button className="btn-primary" onClick={onAccept}>
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConsentDialog
