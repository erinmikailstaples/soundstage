import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

interface Effect {
  id: string
  name: string
  category: string
}

function Dashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [autoTriggerEnabled, setAutoTriggerEnabled] = useState(false)
  const [effects, setEffects] = useState<Effect[]>([])
  const [recentTriggers, setRecentTriggers] = useState<string[]>([])

  useEffect(() => {
    fetchEffects()
    fetchStatus()
  }, [])

  const fetchEffects = async () => {
    try {
      const response = await fetch('/api/trigger/effects')
      const data = await response.json()
      setEffects(data.effects || [])
    } catch (error) {
      console.error('Failed to fetch effects:', error)
    }
  }

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/analyze/status')
      const data = await response.json()
      setIsAnalyzing(data.active || false)
    } catch (error) {
      console.error('Failed to fetch status:', error)
    }
  }

  const toggleAnalysis = async () => {
    try {
      const endpoint = isAnalyzing ? '/api/analyze/stop' : '/api/analyze/start'
      const body = isAnalyzing ? {} : {
        audio_source: 'default',
        enable_emotion: true,
        enable_keywords: true,
        enable_events: true,
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        setIsAnalyzing(!isAnalyzing)
      }
    } catch (error) {
      console.error('Failed to toggle analysis:', error)
    }
  }

  const toggleAutoTrigger = async () => {
    try {
      const endpoint = autoTriggerEnabled
        ? '/api/trigger/auto/disable'
        : '/api/trigger/auto/enable'

      const response = await fetch(endpoint, { method: 'POST' })

      if (response.ok) {
        setAutoTriggerEnabled(!autoTriggerEnabled)
      }
    } catch (error) {
      console.error('Failed to toggle auto-trigger:', error)
    }
  }

  const triggerEffect = async (effectId: string) => {
    try {
      const response = await fetch('/api/trigger/manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          effect_type: effectId,
          intensity: 0.7,
        }),
      })

      if (response.ok) {
        setRecentTriggers([effectId, ...recentTriggers.slice(0, 4)])
      }
    } catch (error) {
      console.error('Failed to trigger effect:', error)
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>SoundStage</h1>
        <Link to="/settings" className="settings-link">⚙️ Settings</Link>
      </header>

      <div className="dashboard-content">
        <div className="control-panel">
          <div className="status-card">
            <h2>Audio Analysis</h2>
            <div className="status-indicator">
              <span className={`indicator ${isAnalyzing ? 'active' : ''}`}></span>
              <span>{isAnalyzing ? 'Active' : 'Inactive'}</span>
            </div>
            <button
              className={`btn-toggle ${isAnalyzing ? 'active' : ''}`}
              onClick={toggleAnalysis}
            >
              {isAnalyzing ? 'Stop Analysis' : 'Start Analysis'}
            </button>
          </div>

          <div className="status-card">
            <h2>Auto-Trigger</h2>
            <div className="status-indicator">
              <span className={`indicator ${autoTriggerEnabled ? 'active' : ''}`}></span>
              <span>{autoTriggerEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
            <button
              className={`btn-toggle ${autoTriggerEnabled ? 'active' : ''}`}
              onClick={toggleAutoTrigger}
              disabled={!isAnalyzing}
            >
              {autoTriggerEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>

        <div className="effects-section">
          <h2>Manual Triggers</h2>
          <div className="effects-grid">
            {effects.map((effect) => (
              <button
                key={effect.id}
                className={`effect-button ${effect.category}`}
                onClick={() => triggerEffect(effect.id)}
              >
                {effect.name}
              </button>
            ))}
          </div>
        </div>

        <div className="activity-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentTriggers.length === 0 ? (
              <p className="empty-state">No recent triggers</p>
            ) : (
              recentTriggers.map((trigger, index) => (
                <div key={index} className="activity-item">
                  <span className="activity-time">Just now</span>
                  <span className="activity-text">Triggered: {trigger}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
