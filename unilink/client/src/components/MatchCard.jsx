import { motion } from 'framer-motion'
import { Heart, MessageCircle, Star } from 'lucide-react'

const AVATAR_COLORS = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #10b981, #34d399)',
  'linear-gradient(135deg, #f97316, #fb923c)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #3b82f6, #6366f1)',
]

function compatClass(score) {
  if (score >= 80) return 'compat-high'
  if (score >= 65) return 'compat-med'
  return 'compat-low'
}

export function MatchCardLarge({ match, index = 0, onConnect }) {
  const colorIdx = index % AVATAR_COLORS.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden flex-shrink-0 w-44 cursor-pointer card-hover"
      style={{ height: '220px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
    >
      {/* Avatar background */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: AVATAR_COLORS[colorIdx] }}
      >
        <span className="text-white text-5xl font-bold font-display" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
          {match.name.charAt(0)}
        </span>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 match-overlay" />

      {/* Compatibility badge */}
      <div className="absolute top-3 right-3">
        <span
          className={`${compatClass(match.compatibility)} text-white text-xs font-bold px-2.5 py-1 rounded-full`}
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
        >
          {match.compatibility}%
        </span>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white font-bold text-sm leading-tight">{match.name}</p>
        <p className="text-white/70 text-xs mt-0.5">{match.major}</p>
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {match.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        {onConnect && (
          <button
            onClick={(e) => { e.stopPropagation(); onConnect(match) }}
            className="mt-2 w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white text-xs font-semibold py-1.5 rounded-xl transition-all"
          >
            Connect
          </button>
        )}
      </div>
    </motion.div>
  )
}

export function MatchCardRow({ match, index = 0, onConnect, onMessage }) {
  const colorIdx = index % AVATAR_COLORS.length

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 p-4 rounded-2xl card-hover cursor-pointer"
      style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
    >
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: AVATAR_COLORS[colorIdx] }}
      >
        <span className="text-white text-xl font-bold font-display">{match.name.charAt(0)}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-bold text-sm truncate" style={{ color: 'var(--color-text)' }}>{match.name}</p>
          {match.isNew && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
              style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
              NEW
            </span>
          )}
        </div>
        <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-muted)' }}>{match.major} · {match.year}</p>
        <div className="flex gap-1 mt-1.5 flex-wrap">
          {match.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="trait-tag text-[10px] px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span
          className={`${compatClass(match.compatibility)} text-white text-xs font-bold px-2.5 py-1 rounded-full`}
        >
          {match.compatibility}%
        </span>
        <div className="flex gap-1.5">
          {onMessage && (
            <button
              onClick={(e) => { e.stopPropagation(); onMessage(match) }}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'var(--color-primary-soft)' }}
            >
              <MessageCircle size={14} style={{ color: 'var(--color-primary)' }} />
            </button>
          )}
          {onConnect && (
            <button
              onClick={(e) => { e.stopPropagation(); onConnect(match) }}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'var(--color-primary-soft)' }}
            >
              <Heart size={14} style={{ color: 'var(--color-primary)' }} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default MatchCardLarge
