import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Settings.css'

interface UserSettings {
  audio_input_device: string | null
  audio_output_device: string | null
  auto_trigger_enabled: boolean
  trigger_sensitivity: number
  elevenlabs_api_key: string | null
  effect_volume: number
  hotkeys_enabled: boolean
}

function Settings() {
  const [settings, setSettings] = useState<UserSettings>({
    audio_input_device: null,
    audio_output_device: null,
    auto_trigger_enabled: false,
    trigger_sensitivity: 0.5,
    elevenlabs_api_key: null,
    effect_volume: 0.8,
    hotkeys_enabled: true,
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings/current')
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  const saveSettings = async () => {
    try {
      const response = await fetch('/api/settings/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
    }
  }

  const updateSetting = (key: keyof UserSettings, value: any) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div className="settings-page">
      <header className="settings-header">
        <Link to="/" className="back-link">← Back to Dashboard</Link>
        <h1>Settings</h1>
      </header>

      <div className="settings-content">
        <section className="settings-section">
          <h2>Audio Configuration</h2>
          
          <div className="form-group">
            <label>Input Device</label>
            <select
              value={settings.audio_input_device || ''}
              onChange={(e) => updateSetting('audio_input_device', e.target.value)}
              className="input-select"
            >
              <option value="">Default</option>
            </select>
          </div>

          <div className="form-group">
            <label>Output Device</label>
            <select
              value={settings.audio_output_device || ''}
              onChange={(e) => updateSetting('audio_output_device', e.target.value)}
              className="input-select"
            >
              <option value="">Default</option>
            </select>
          </div>

          <div className="form-group">
            <label>Effect Volume: {Math.round(settings.effect_volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.effect_volume}
              onChange={(e) => updateSetting('effect_volume', parseFloat(e.target.value))}
              className="input-range"
            />
          </div>
        </section>

        <section className="settings-section">
          <h2>Triggering</h2>

          <div className="form-group">
            <label>Trigger Sensitivity: {Math.round(settings.trigger_sensitivity * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.trigger_sensitivity}
              onChange={(e) => updateSetting('trigger_sensitivity', parseFloat(e.target.value))}
              className="input-range"
            />
            <small>Higher sensitivity = more frequent triggers</small>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.hotkeys_enabled}
                onChange={(e) => updateSetting('hotkeys_enabled', e.target.checked)}
              />
              <span>Enable Hotkeys</span>
            </label>
          </div>
        </section>

        <section className="settings-section">
          <h2>ElevenLabs API</h2>

          <div className="form-group">
            <label>API Key</label>
            <input
              type="password"
              placeholder="sk_..."
              value={settings.elevenlabs_api_key || ''}
              onChange={(e) => updateSetting('elevenlabs_api_key', e.target.value)}
              className="input-text"
            />
            <small>Your API key is stored locally and never shared</small>
          </div>
        </section>

        <section className="settings-section">
          <h2>Privacy</h2>

          <div className="privacy-info">
            <p>
              Audio processing is performed locally by default. No audio data is sent to
              external servers unless you explicitly enable cloud processing.
            </p>
            <button className="btn-secondary">Manage Consent</button>
          </div>
        </section>

        <div className="settings-actions">
          <button className="btn-primary" onClick={saveSettings}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
