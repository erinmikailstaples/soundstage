import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ConsentDialog from './components/ConsentDialog'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import './App.css'

function App() {
  const [consentGiven, setConsentGiven] = useState<boolean>(false)
  const [showConsent, setShowConsent] = useState<boolean>(true)
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(false)

  useEffect(() => {
    // Check if consent was previously given
    const consent = localStorage.getItem('soundstage_consent')
    if (consent === 'true') {
      setConsentGiven(true)
      setShowConsent(false)
    }

    // Check if onboarding was completed
    const onboarding = localStorage.getItem('soundstage_onboarding')
    if (onboarding === 'true') {
      setOnboardingComplete(true)
    }
  }, [])

  const handleConsentAccept = async () => {
    try {
      const response = await fetch('/api/settings/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audio_capture_consent: true,
          cloud_processing_consent: false,
          analytics_consent: false,
        }),
      })

      if (response.ok) {
        setConsentGiven(true)
        setShowConsent(false)
        localStorage.setItem('soundstage_consent', 'true')
      }
    } catch (error) {
      console.error('Failed to save consent:', error)
    }
  }

  const handleConsentDecline = () => {
    setShowConsent(false)
    // User declined - show limited UI or exit message
  }

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true)
    localStorage.setItem('soundstage_onboarding', 'true')
  }

  if (showConsent && !consentGiven) {
    return <ConsentDialog onAccept={handleConsentAccept} onDecline={handleConsentDecline} />
  }

  if (!onboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
