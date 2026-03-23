import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Users, Plus, ChevronRight, Lock } from 'lucide-react'

const CATEGORIES = ['All', 'Academic', 'Social', 'Sports', 'Arts', 'Tech']

const GROUPS = [
  {
    id: 1, name: 'Data Science Society', category: 'Academic',
    members: 128, description: 'Weekly workshops on ML, stats, and data visualization. All levels welcome!',
    tags: ['Python', 'ML', 'Statistics'], isJoined: true, color: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    id: 2, name: 'Film & Photography Club', category: 'Arts',
    members: 94, description: 'Showcasing student work, monthly screenings, and outdoor photo walks.',
    tags: ['Photography', 'Film', 'Visual Art'], isJoined: false, color: 'linear-gradient(135deg, #ec4899, #f43f5e)',
  },
  {
    id: 3, name: 'Anime & Manga Guild', category: 'Social',
    members: 212, description: 'Watch parties, cosplay events, manga library, and convention trips.',
    tags: ['Anime', 'Manga', 'Cosplay'], isJoined: true, color: 'linear-gradient(135deg, #f97316, #fb923c)',
  },
  {
    id: 4, name: 'Open Source Builders', category: 'Tech',
    members: 67, description: 'Contribute to real projects, learn Git, and build your portfolio together.',
    tags: ['GitHub', 'Linux', 'Coding'], isJoined: false, color: 'linear-gradient(135deg, #10b981, #34d399)',
  },
  {
    id: 5, name: 'Women in STEM', category: 'Academic',
    members: 176, description: 'Mentorship, guest speakers, networking events, and scholarship resources.',
    tags: ['Mentorship', 'Networking', 'Research'], isJoined: false, color: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
  },
  {
    id: 6, name: 'Campus Runners', category: 'Sports',
    members: 83, description: 'Morning runs, 5K training plans, and fun community races on campus.',
    tags: ['Running', 'Fitness', 'Wellness'], isJoined: false, color: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    id: 7, name: 'Debate & Rhetoric Society', category: 'Academic',
    members: 55, description: 'Sharpen your arguments, practice public speaking, compete in tournaments.',
    tags: ['Debate', 'Public Speaking', 'Logic'], isJoined: false, color: 'linear-gradient(135deg, #f59e0b, #f97316)',
    isPrivate: true,
  },
  {
    id: 8, name: 'Meditation & Mindfulness', category: 'Social',
    members: 139, description: 'Guided sessions every morning, breathwork workshops, and stress-free zones.',
    tags: ['Wellness', 'Mental Health', 'Yoga'], isJoined: false, color: 'linear-gradient(135deg, #34d399, #10b981)',
  },
]

function GroupCard({ group, index, onJoin }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="p-4 rounded-3xl card-hover cursor-pointer"
      style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: group.color }}
        >
          <span className="text-white text-xl font-bold font-display">{group.name.charAt(0)}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{group.name}</h3>
            {group.isPrivate && <Lock size={11} style={{ color: 'var(--color-muted)' }} />}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Users size={11} style={{ color: 'var(--color-muted)' }} />
            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{group.members} members</span>
            <span className="text-xs" style={{ color: 'var(--color-border)' }}>·</span>
            <span className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>{group.category}</span>
          </div>
        </div>

        <button
          onClick={() => onJoin(group)}
          className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
          style={group.isJoined
            ? { background: 'var(--color-mint-soft)', color: 'var(--color-mint)' }
            : { background: 'var(--color-primary-soft)', color: 'var(--color-primary)' }
          }
        >
          {group.isJoined ? '✓ Joined' : '+ Join'}
        </button>
      </div>

      <p className="text-xs leading-relaxed mt-3" style={{ color: '#6b7280' }}>{group.description}</p>

      <div className="flex gap-1.5 mt-3 flex-wrap">
        {group.tags.map(tag => (
          <span key={tag} className="trait-tag text-[10px] px-2 py-0.5 rounded-full">{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Groups() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [groups, setGroups] = useState(GROUPS)

  const filtered = groups.filter(g => {
    const matchesCat = activeCategory === 'All' || g.category === activeCategory
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCat && matchesSearch
  })

  const handleJoin = (group) => {
    setGroups(prev => prev.map(g =>
      g.id === group.id ? { ...g, isJoined: !g.isJoined, members: g.isJoined ? g.members - 1 : g.members + 1 } : g
    ))
  }

  const myGroups = groups.filter(g => g.isJoined)

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold" style={{ color: 'var(--color-text)' }}>Groups</h1>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Discover your community</p>
        </div>
        <button
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 16px rgba(99,102,241,0.3)' }}
        >
          <Plus size={18} color="white" />
        </button>
      </motion.div>

      {/* My Groups */}
      {myGroups.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-display font-bold section-accent" style={{ color: 'var(--color-text)' }}>My Groups</h2>
            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{myGroups.length} joined</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {myGroups.map((g, i) => (
              <div key={g.id} className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: g.color, boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}>
                  <span className="text-white font-bold text-lg font-display">{g.name.charAt(0)}</span>
                </div>
                <span className="text-[10px] font-semibold text-center max-w-[56px] leading-tight" style={{ color: 'var(--color-text)' }}>
                  {g.name.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
        <input
          type="text"
          placeholder="Search groups…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3.5 rounded-2xl text-sm font-medium outline-none"
          style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', color: 'var(--color-text)' }}
        />
      </motion.div>

      {/* Category filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="flex gap-2 overflow-x-auto pb-2 mb-5">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200"
            style={activeCategory === cat
              ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }
              : { background: 'white', color: 'var(--color-muted)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }
            }
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Groups list */}
      <div className="space-y-3">
        {filtered.map((group, i) => (
          <GroupCard key={group.id} group={group} index={i} onJoin={handleJoin} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔭</p>
            <p className="font-bold" style={{ color: 'var(--color-text)' }}>No groups found</p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  )
}
