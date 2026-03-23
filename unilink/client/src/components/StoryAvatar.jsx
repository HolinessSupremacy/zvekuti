import { motion } from 'framer-motion'

const AVATAR_COLORS = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #10b981, #34d399)',
  'linear-gradient(135deg, #f97316, #fb923c)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #3b82f6, #6366f1)',
  'linear-gradient(135deg, #8b5cf6, #ec4899)',
]

export default function StoryAvatar({ user, index = 0, isOwn = false }) {
  const colorIdx = index % AVATAR_COLORS.length

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer"
    >
      <div className={isOwn ? '' : 'story-ring'} style={{ padding: isOwn ? 0 : '2px', borderRadius: '9999px' }}>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center relative"
          style={{
            background: isOwn ? 'var(--color-primary-soft)' : AVATAR_COLORS[colorIdx],
            border: isOwn ? '2px dashed var(--color-primary)' : '2px solid white',
          }}
        >
          {isOwn ? (
            <span style={{ color: 'var(--color-primary)', fontSize: '22px' }}>+</span>
          ) : (
            <span className="text-white font-bold text-lg font-display">
              {user.name.charAt(0)}
            </span>
          )}
          {!isOwn && user.isOnline && (
            <span
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full pulse-dot"
              style={{ background: '#10b981', border: '2px solid white' }}
            />
          )}
        </div>
      </div>
      <span className="text-[11px] font-medium max-w-[56px] text-center truncate" style={{ color: 'var(--color-text)' }}>
        {isOwn ? 'Your Story' : user.name.split(' ')[0]}
      </span>
    </motion.div>
  )
}
