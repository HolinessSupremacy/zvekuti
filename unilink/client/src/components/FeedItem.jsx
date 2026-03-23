import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share2, BookOpen, MapPin, Users, Lightbulb } from 'lucide-react'
import { useState } from 'react'

const TYPE_CONFIG = {
  study:    { icon: BookOpen,   color: '#6366f1', bg: '#eef2ff', label: 'Study Group' },
  lost:     { icon: MapPin,     color: '#f97316', bg: '#ffe4d6', label: 'Lost & Found' },
  social:   { icon: Users,      color: '#10b981', bg: '#d1fae5', label: 'Social'       },
  idea:     { icon: Lightbulb,  color: '#8b5cf6', bg: '#f5f3ff', label: 'Idea'         },
}

const AVATAR_COLORS = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #10b981, #34d399)',
  'linear-gradient(135deg, #f97316, #fb923c)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
]

export default function FeedItem({ post, index = 0 }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes || 0)
  const config = TYPE_CONFIG[post.type] || TYPE_CONFIG.social
  const Icon = config.icon
  const colorIdx = (post.authorId || index) % AVATAR_COLORS.length

  const handleLike = () => {
    setLiked(l => !l)
    setLikeCount(c => liked ? c - 1 : c + 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="p-4 rounded-3xl card-hover"
      style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: AVATAR_COLORS[colorIdx] }}
        >
          <span className="text-white font-bold text-sm">{post.author.charAt(0)}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{post.author}</span>
            <span
              className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: config.bg, color: config.color }}
            >
              <Icon size={10} />
              {config.label}
            </span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{post.time}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3">
        {post.title && (
          <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--color-text)' }}>{post.title}</h4>
        )}
        <p className="text-sm leading-relaxed" style={{ color: '#4b5563' }}>{post.content}</p>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {post.tags.map(tag => (
            <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={{ background: 'var(--color-primary-soft)', color: 'var(--color-primary)' }}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 mt-4 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
        <button onClick={handleLike} className="flex items-center gap-1.5 group">
          <motion.div animate={{ scale: liked ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.25 }}>
            <Heart
              size={16}
              fill={liked ? '#ec4899' : 'none'}
              style={{ color: liked ? '#ec4899' : 'var(--color-muted)' }}
            />
          </motion.div>
          <span className="text-xs font-medium" style={{ color: liked ? '#ec4899' : 'var(--color-muted)' }}>
            {likeCount}
          </span>
        </button>

        <button className="flex items-center gap-1.5">
          <MessageCircle size={16} style={{ color: 'var(--color-muted)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>{post.comments || 0}</span>
        </button>

        <button className="ml-auto flex items-center gap-1.5">
          <Share2 size={15} style={{ color: 'var(--color-muted)' }} />
        </button>
      </div>
    </motion.div>
  )
}
