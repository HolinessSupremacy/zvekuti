import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Layout from './Layout'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Matches from './pages/Matches'
import Groups from './pages/Groups'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import NewPage from './pages/NewPage'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => setIsAuthenticated(true)
  const handleLogout = () => setIsAuthenticated(false)

  if (!isAuthenticated) {
    return <Landing onLogin={handleLogin} />
  }

  return (
    <Layout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
        <Route path="/newpage" element={<NewPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Layout>
  )
}
