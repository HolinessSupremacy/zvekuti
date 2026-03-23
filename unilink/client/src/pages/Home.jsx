import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Search, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StoryAvatar from '../components/StoryAvatar'
import { MatchCardLarge } from '../components/MatchCard'
import FeedItem from '../components/FeedItem'

const CURRENT_USER = {
  name: 'Alex Johnson',
  major: 'Computer Science · Junior',
  profileCompletion: 72,
}

const STORIES = [
  { id: 1, name: 'Priya R.', isOnline: true },
  { id: 2, name: 'Kofi O.', isOnline: true },
  { id: 3, name: 'Maya L.', isOnline: false },
  { id: 4, name: 'Sam K.', isOnline: true },
  { id: 5, name: 'Zara B.', isOnline: false },
]

const TOP_MATCHES = [
  { id: 1, name: 'Priya Rajan', major: 'Data Science', year: 'Junior', compatibility: 87, tags: ['Anime', 'Coding', 'Late Night Study'] },
  { id: 2, name: 'Kofi Owusu', major: 'Film Studies', year: 'Senior', compatibility: 79, tags: ['Music', 'Photography', 'Travel'] },
  { id: 3, name: 'Maya Lin', major: 'Psychology', year: 'Sophomore', compatibility: 74, tags: ['Reading', 'Yoga', 'Board Games'] },
  { id: 4, name: 'Sam Kim', major: 'Engineering', year: 'Junior', compatibility: 68, tags: ['Gaming', 'Robotics', 'Coffee'] },
]

const FEED = [
  {
    id: 1, type: 'study', author: 'Priya Rajan', authorId: 1,
    title: 'Data Structures Study Group 📚',
    content: 'Starting a weekly DS&A study group! Meeting every Thursday 6–8 PM at the library. All levels welcome, we learn together.',
    tags: ['algorithms', 'CS', 'studygroup'], likes: 14, comments: 5, time: '2h ago',
  },
  {
    id: 2, type: 'lost', author: 'Marcus Webb', authorId: 2,
    title: 'Lost: AirPods Pro Case 🎧',
    content: 'Lost my white AirPods case near the Student Union food court around noon. Has a small blue sticker on it. Please DM if found!',
    tags: ['lostfound', 'airpods'], likes: 3, comments: 2, time: '4h ago',
  },
  {
    id: 3, type: 'social', author: 'Zara Bello', authorId: 3,
    title: 'International Movie Night 🎬',
    content: 'Hosting a chill movie night featuring films from different countries this Friday at 8 PM. Snacks provided! Bring your own blanket.',
    tags: ['movies', 'international', 'chill'], likes: 31, comments: 12, time: '6h ago',
  },
  {
    id: 4, type: 'idea', author: 'Kofi Owusu', authorId: 0,
    title: 'Campus Photography Walk 📷',
    content: 'Anyone interested in an early morning photography walk around campus? Would love to meet fellow photographers and explore different perspectives.',
    tags: ['photography', 'art', 'campus'], likes: 19, comments: 7, time: '8h ago',
  },
]

const PROFILE_TASKS = [
  { label: 'Add interests', done: true },
  { label: 'Personality quiz', done: true },
  { label: 'Upload photo', done: false },
  { label: 'Connect 3 friends', done: false },
]

export default function Home() {
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const h = new Date().getHours()
    if (h < 12) setGreeting('Good morning')
    else if (h < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{greeting} 👋</p>
          <h1 className="text-2xl font-display font-bold" style={{ color: 'var(--color-text)' }}>
            {CURRENT_USER.name.split(' ')[0]}
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Search size={18} style={{ color: 'var(--color-muted)' }} />
          </button>
          <button className="w-10 h-10 rounded-2xl flex items-center justify-center relative" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Bell size={18} style={{ color: 'var(--color-muted)' }} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: '#f97316' }} />
          </button>
        </div>
      </motion.div>

      {/* Profile Completion Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 rounded-3xl mb-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          boxShadow: '0 8px 32px rgba(99,102,241,0.3)',
        }}
      >
        {/* Decorative circle */}
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="absolute -bottom-4 -right-10 w-24 h-24 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />

        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-white/70 text-xs font-medium mb-0.5">Profile Strength</p>
              <p className="text-white font-bold text-lg">{CURRENT_USER.profileCompletion}% Complete</p>
            </div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <span className="text-white font-display font-bold text-lg">A</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full mb-3" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${CURRENT_USER.profileCompletion}%` }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="h-2 rounded-full"
              style={{ background: 'rgba(255,255,255,0.9)' }}
            />
          </div>

          {/* Tasks */}
          <div className="flex gap-2 flex-wrap">
            {PROFILE_TASKS.map(t => (
              <span
                key={t.label}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: t.done ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                  color: t.done ? 'white' : 'rgba(255,255,255,0.55)',
                  textDecoration: t.done ? 'line-through' : 'none',
                }}
              >
                {t.done ? '✓ ' : ''}{t.label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Campus Stories */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-display font-bold section-accent" style={{ color: 'var(--color-text)' }}>
            Campus Stories
          </h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          <StoryAvatar isOwn user={{ name: 'You' }} index={0} />
          {STORIES.map((s, i) => (
            <StoryAvatar key={s.id} user={s} index={i + 1} />
          ))}
        </div>
      </motion.div>

      {/* Your Matches */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-display font-bold section-accent" style={{ color: 'var(--color-text)' }}>
            Your Matches
          </h2>
          <button
            onClick={() => navigate('/matches')}
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: 'var(--color-primary)' }}
          >
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {TOP_MATCHES.map((m, i) => (
            <MatchCardLarge key={m.id} match={m} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Campus Feed */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-display font-bold section-accent" style={{ color: 'var(--color-text)' }}>
            Campus Feed
          </h2>
          <button className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
            Filter
          </button>
        </div>

        {/* Post composer */}
        <div
          className="flex items-center gap-3 p-4 rounded-2xl mb-4"
          style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div
            className="flex-1 px-4 py-2.5 rounded-xl text-sm"
            style={{ background: 'var(--color-bg)', color: 'var(--color-muted)' }}
          >
            Share something with campus…
          </div>
        </div>

        <div className="space-y-3">
          {FEED.map((post, i) => (
            <FeedItem key={post.id} post={post} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
