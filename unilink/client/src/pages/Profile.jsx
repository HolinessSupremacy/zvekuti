import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Settings, Edit3, LogOut, ChevronRight, MapPin, GraduationCap,
  Moon, Sun, Bell, Shield, HelpCircle, Star, Zap, Coffee,
  BookOpen, Music, Camera, Gamepad2, Globe, Heart
} from 'lucide-react'

const INTERESTS = [
  { label: 'Anime', emoji: '🎌' },
  { label: 'Coding', emoji: '💻' },
  { label: 'Photography', emoji: '📷' },
  { label: 'Music', emoji: '🎵' },
  { label: 'Gaming', emoji: '🎮' },
  { label: 'Reading', emoji: '📚' },
  { label: 'Travel', emoji: '✈️' },
  { label: 'Art', emoji: '🎨' },
  { label: 'Fitness', emoji: '🏃' },
  { label: 'Film', emoji: '🎬' },
  { label: 'Coffee', emoji: '☕' },
  { label: 'Board Games', emoji: '♟️' },
]

const PERSONALITY_TRAITS = [
  { label: 'Communication', value: 'Text-first', icon: '💬', color: '#6366f1' },
  { label: 'Social Energy', value: 'Ambivert', icon: '⚡', color: '#10b981' },
  { label: 'Availability', value: 'Late Night Owl', icon: '🌙', color: '#8b5cf6' },
  { label: 'Study Style', value: 'Deep Focus', icon: '🎯', color: '#f97316' },
  { label: 'Conflict Style', value: 'Collaborative', icon: '🤝', color: '#ec4899' },
]

const STATS = [
  { label: 'Matches', value: '8' },
  { label: 'Connections', value: '3' },
  { label: 'Groups', value: '2' },
  { label: 'Posts', value: '12' },
]

const SETTINGS_ITEMS = [
  { icon: Bell, label: 'Notifications', sub: 'Manage alerts' },
  { icon: Shield, label: 'Privacy & Safety', sub: 'Control your visibility' },
  { icon: Globe, label: 'Language', sub: 'English (US)' },
  { icon: HelpCircle, label: 'Help & Support', sub: 'FAQs and contact' },
]

const AVATAR_GRADIENT = 'linear-gradient(135deg, #6366f1, #8b5cf6)'

export default function Profile({ onLogout }) {
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedInterests, setSelectedInterests] = useState(['Anime', 'Coding', 'Coffee', 'Music'])
  const [editingInterests, setEditingInterests] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const toggleInterest = (label) => {
    setSelectedInterests(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Cover gradient */}
      <div
        className="h-36 relative"
        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)' }}
      >
        <div className="absolute inset-0" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'20\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', opacity: 0.5 }} />
        <button
          className="absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
        >
          <Settings size={18} color="white" />
        </button>
      </div>

      {/* Avatar + name */}
      <div className="px-4 pb-4">
        <div className="flex items-end justify-between -mt-10 mb-4">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: AVATAR_GRADIENT, border: '4px solid white', boxShadow: '0 8px 24px rgba(99,102,241,0.35)' }}
            >
              <span className="text-white text-3xl font-display font-bold">A</span>
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: '2px solid white' }}
            >
              <Edit3 size={10} color="white" />
            </button>
          </div>

          <button
            className="px-4 py-2 rounded-xl text-xs font-bold"
            style={{ background: 'var(--color-primary-soft)', color: 'var(--color-primary)' }}
          >
            Edit Profile
          </button>
        </div>

        <div className="mb-4">
          <h1 className="text-xl font-display font-bold" style={{ color: 'var(--color-text)' }}>Alex Johnson</h1>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-muted)' }}>
              <GraduationCap size={12} /> Computer Science · Junior
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-muted)' }}>
              <MapPin size={12} /> State University
            </span>
          </div>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: '#6b7280' }}>
            Passionate about building things and connecting ideas. Night-owl coder who also loves anime marathons ☕
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {STATS.map(stat => (
            <div key={stat.label} className="p-3 rounded-2xl text-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <p className="text-lg font-display font-bold" style={{ color: 'var(--color-primary)' }}>{stat.value}</p>
              <p className="text-[10px] font-medium" style={{ color: 'var(--color-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl mb-5" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          {['profile', 'settings'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-200"
              style={activeTab === tab
                ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', boxShadow: '0 3px 10px rgba(99,102,241,0.3)' }
                : { color: 'var(--color-muted)' }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">

              {/* Personality Traits */}
              <section>
                <h2 className="text-sm font-display font-bold mb-3 section-accent" style={{ color: 'var(--color-text)' }}>
                  Personality Traits
                </h2>
                <div className="space-y-2.5">
                  {PERSONALITY_TRAITS.map((trait, i) => (
                    <motion.div
                      key={trait.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center justify-between p-3.5 rounded-2xl"
                      style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `${trait.color}18` }}>
                          {trait.icon}
                        </div>
                        <div>
                          <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>{trait.label}</p>
                          <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--color-text)' }}>{trait.value}</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full" style={{ background: trait.color }} />
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Interests */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-display font-bold section-accent" style={{ color: 'var(--color-text)' }}>
                    Interests
                  </h2>
                  <button
                    onClick={() => setEditingInterests(e => !e)}
                    className="text-xs font-semibold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {editingInterests ? 'Done' : 'Edit'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editingInterests ? INTERESTS : INTERESTS.filter(i => selectedInterests.includes(i.label))).map((item, idx) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => editingInterests && toggleInterest(item.label)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-sm font-semibold transition-all duration-200 interest-chip"
                      style={selectedInterests.includes(item.label)
                        ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', boxShadow: '0 3px 10px rgba(99,102,241,0.25)' }
                        : { background: 'white', color: 'var(--color-muted)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }
                      }
                    >
                      <span>{item.emoji}</span>
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </section>

              {/* Compatibility Overview */}
              <section className="p-4 rounded-3xl" style={{ background: 'linear-gradient(135deg, #eef2ff, #f5f3ff)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={16} style={{ color: 'var(--color-primary)' }} />
                  <h2 className="text-sm font-display font-bold" style={{ color: 'var(--color-text)' }}>Compatibility Score</h2>
                </div>
                <p className="text-xs mb-4" style={{ color: 'var(--color-muted)' }}>
                  Based on your personality, interests, and communication style
                </p>
                <div className="space-y-3">
                  {[
                    { label: 'Study Compatibility', value: 82 },
                    { label: 'Social Compatibility', value: 74 },
                    { label: 'Project Compatibility', value: 68 },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>{item.label}</span>
                        <span className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>{item.value}%</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: 'rgba(99,102,241,0.12)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          className="h-2 rounded-full"
                          style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {/* Settings items */}
              <div className="rounded-3xl overflow-hidden" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                {SETTINGS_ITEMS.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3 px-4 py-4 cursor-pointer"
                      style={{ borderBottom: i < SETTINGS_ITEMS.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--color-primary-soft)' }}>
                        <Icon size={17} style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{item.label}</p>
                        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{item.sub}</p>
                      </div>
                      <ChevronRight size={16} style={{ color: 'var(--color-border)' }} />
                    </motion.div>
                  )
                })}
              </div>

              {/* App info */}
              <div className="p-4 rounded-3xl text-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <GraduationCap size={22} color="white" />
                </div>
                <p className="font-display font-bold" style={{ color: 'var(--color-text)' }}>UniLink</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>Version 1.0.0 · Where meaning begins</p>
              </div>

              {/* Logout */}
              {showLogoutConfirm ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-3xl"
                  style={{ background: '#fff5f5', border: '1px solid #fecaca' }}
                >
                  <p className="text-sm font-bold mb-1 text-center" style={{ color: '#dc2626' }}>Sign out of UniLink?</p>
                  <p className="text-xs text-center mb-4" style={{ color: '#9ca3af' }}>You can always sign back in with your student email.</p>
                  <div className="flex gap-2">
                    <button onClick={() => setShowLogoutConfirm(false)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                      style={{ background: '#f3f4f6', color: '#6b7280' }}>
                      Cancel
                    </button>
                    <button onClick={onLogout}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold"
                  style={{ background: '#fff5f5', color: '#ef4444', border: '1px solid #fecaca' }}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
