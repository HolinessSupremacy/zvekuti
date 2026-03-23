import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, ArrowRight, Eye, EyeOff, Sparkles, Shield, Users } from 'lucide-react'

const FEATURES = [
  { icon: Sparkles, text: 'AI-powered compatibility matching' },
  { icon: Shield,   text: 'Verified Student ID authentication' },
  { icon: Users,    text: 'Groups, study partners & more'     },
]

export default function Landing({ onLogin }) {
  const [step, setStep] = useState('hero') // hero | login | register
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ studentId: '', name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    onLogin()
  }

  return (
    <div className="min-h-screen landing-bg noise flex flex-col relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-20 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 12px 40px rgba(99,102,241,0.4)',
              }}
            >
              <GraduationCap size={38} color="white" strokeWidth={1.8} />
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <h1
                className="text-5xl font-display font-bold mb-3 leading-tight"
                style={{ color: 'white' }}
              >
                Uni<span style={{ color: '#818cf8' }}>Link</span>
              </h1>
              <p className="text-xl font-light mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Where meaning begins.
              </p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '260px', margin: '0 auto' }}>
                Connect with fellow students who share your values, interests, and goals.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 w-full max-w-xs space-y-3"
            >
              {FEATURES.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(99,102,241,0.3)' }}>
                    <Icon size={16} color="#818cf8" />
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 w-full max-w-xs space-y-3"
            >
              <button
                onClick={() => setStep('register')}
                className="w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 8px 28px rgba(99,102,241,0.4)',
                }}
              >
                Get Started <ArrowRight size={18} />
              </button>
              <button
                onClick={() => setStep('login')}
                className="w-full py-4 rounded-2xl font-semibold text-sm"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                I already have an account
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-xs text-center"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Requires valid university email · Not a dating app
            </motion.p>
          </motion.div>
        )}

        {(step === 'login' || step === 'register') && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col px-6 py-8 relative z-10"
          >
            <button
              onClick={() => setStep('hero')}
              className="text-sm mb-8 flex items-center gap-2"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              ← Back
            </button>

            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
              <h2 className="text-3xl font-display font-bold mb-2" style={{ color: 'white' }}>
                {step === 'login' ? 'Welcome back' : 'Join UniLink'}
              </h2>
              <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {step === 'login' ? 'Sign in with your student credentials' : 'Create your student account'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 'register' && (
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Alex Johnson"
                      className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'white',
                      }}
                    />
                  </div>
                )}

                {step === 'register' && (
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Student ID
                    </label>
                    <input
                      type="text"
                      value={form.studentId}
                      onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))}
                      placeholder="STU-2024-XXXXX"
                      className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'white',
                      }}
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    University Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@university.edu"
                    className="w-full px-4 py-3.5 rounded-2xl text-sm font-medium outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'white',
                    }}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 pr-12 rounded-2xl text-sm font-medium outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'white',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(s => !s)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-xs">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 mt-2"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    boxShadow: '0 8px 28px rgba(99,102,241,0.35)',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                    />
                  ) : step === 'login' ? 'Sign In' : 'Create Account'}
                </button>

                <p className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {step === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={() => setStep(step === 'login' ? 'register' : 'login')}
                    style={{ color: '#818cf8' }}
                    className="font-semibold"
                  >
                    {step === 'login' ? 'Register' : 'Sign in'}
                  </button>
                </p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
