import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import { MatchCardRow } from '../components/MatchCard'

const FILTERS = ['All', 'Study Partners', 'Social', 'Projects', 'Clubs']

const ALL_MATCHES = [
  {
    id: 1, name: 'Priya Rajan', major: 'Data Science', year: 'Junior',
    compatibility: 87, tags: ['Anime', 'Coding', 'Late Night Study'],
    category: 'Study Partners', isNew: true,
  },
  {
    id: 2, name: 'Kofi Owusu', major: 'Film Studies', year: 'Senior',
    compatibility: 79, tags: ['Photography', 'Music', 'Art House'],
    category: 'Social',
  },
  {
    id: 3, name: 'Maya Lin', major: 'Psychology', year: 'Sophomore',
    compatibility: 74, tags: ['Reading', 'Yoga', 'Board Games'],
    category: 'Social', isNew: true,
  },
  {
    id: 4, name: 'Sam Kim', major: 'Mechanical Eng.', year: 'Junior',
    compatibility: 68, tags: ['Robotics', 'Gaming', '3D Printing'],
    category: 'Projects',
  },
  {
    id: 5, name: 'Zara Bello', major: 'International Relations', year: 'Senior',
    compatibility: 65, tags: ['Travel', 'Languages', 'Film'],
    category: 'Social',
  },
  {
    id: 6, name: 'Ethan Brooks', major: 'Computer Science', year: 'Freshman',
    compatibility: 61, tags: ['Open Source', 'Linux', 'Anime'],
    category: 'Study Partners',
  },
  {
    id: 7, name: 'Sofia Reyes', major: 'Business Admin', year: 'Junior',
    compatibility: 58, tags: ['Entrepreneurship', 'Tennis', 'Coffee'],
    category: 'Projects',
  },
  {
    id: 8, name: 'Jordan Patel', major: 'Neuroscience', year: 'Senior',
    compatibility: 55, tags: ['Research', 'Hiking', 'Chess'],
    category: 'Study Partners',
  },
]

export default function Matches() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [connectedIds, setConnectedIds] = useState([])

  const filtered = ALL_MATCHES.filter(m => {
    const matchesFilter = activeFilter === 'All' || m.category === activeFilter
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const handleConnect = (match) => {
    setConnectedIds(ids => [...ids, match.id])
  }

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-display font-bold mb-1" style={{ color: 'var(--color-text)' }}>
          Your Matches
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          {ALL_MATCHES.length} students matched with your profile
        </p>
      </motion.div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="relative mb-4"
      >
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
        <input
          type="text"
          placeholder="Search by name, major, or interest…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-12 py-3.5 rounded-2xl text-sm font-medium outline-none"
          style={{
            background: 'white',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            color: 'var(--color-text)',
          }}
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: 'var(--color-primary-soft)' }}>
          <SlidersHorizontal size={14} style={{ color: 'var(--color-primary)' }} />
        </button>
      </motion.div>

      {/* Filter pills */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-2 mb-6"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200"
            style={activeFilter === f
              ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }
              : { background: 'white', color: 'var(--color-muted)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }
            }
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        {[
          { label: 'Total Matches', value: ALL_MATCHES.length },
          { label: 'Avg. Compat.', value: `${Math.round(ALL_MATCHES.reduce((a, m) => a + m.compatibility, 0) / ALL_MATCHES.length)}%` },
          { label: 'Connected', value: connectedIds.length },
        ].map(stat => (
          <div key={stat.label} className="p-3 rounded-2xl text-center" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <p className="text-lg font-display font-bold" style={{ color: 'var(--color-primary)' }}>{stat.value}</p>
            <p className="text-[10px] font-medium" style={{ color: 'var(--color-muted)' }}>{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Match List */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-bold" style={{ color: 'var(--color-text)' }}>No matches found</p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filtered.map((match, i) => (
              <div key={match.id} className="relative">
                <MatchCardRow
                  match={match}
                  index={i}
                  onConnect={connectedIds.includes(match.id) ? null : handleConnect}
                />
                {connectedIds.includes(match.id) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: 'var(--color-mint-soft)', color: 'var(--color-mint)' }}
                  >
                    ✓ Connected
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
