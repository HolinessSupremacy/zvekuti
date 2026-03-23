import express from 'express'
import { matches, users } from '../data/mockData.js'

const router = express.Router()

// GET matches for a user
router.get('/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)
  const { category, minCompat } = req.query

  let userMatches = matches.filter(m => m.userId === userId || m.matchedUserId === userId)

  if (category) userMatches = userMatches.filter(m => m.category === category)
  if (minCompat) userMatches = userMatches.filter(m => m.compatibility >= parseInt(minCompat))

  // Hydrate with user data
  const hydrated = userMatches.map(m => {
    const otherId = m.userId === userId ? m.matchedUserId : m.userId
    const otherUser = users.find(u => u.id === otherId)
    return {
      ...m,
      matchedUser: otherUser
        ? { id: otherUser.id, name: otherUser.name, major: otherUser.major, year: otherUser.year, interests: otherUser.interests }
        : m.matchedUser || null,
    }
  })

  // Sort by compatibility desc
  hydrated.sort((a, b) => b.compatibility - a.compatibility)

  res.json({ success: true, data: hydrated, count: hydrated.length })
})

// GET match compatibility between two users
router.get('/compatibility/:userId/:targetId', (req, res) => {
  const userId = parseInt(req.params.userId)
  const targetId = parseInt(req.params.targetId)
  const match = matches.find(
    m => (m.userId === userId && m.matchedUserId === targetId) ||
         (m.userId === targetId && m.matchedUserId === userId)
  )
  if (!match) {
    // Generate a random score if no pre-existing match
    const score = Math.floor(Math.random() * 40) + 50
    return res.json({ success: true, data: { compatibility: score, category: 'Social' } })
  }
  res.json({ success: true, data: match })
})

// POST create new match/connection
router.post('/', (req, res) => {
  const { userId, matchedUserId, category } = req.body
  if (!userId || !matchedUserId) return res.status(400).json({ success: false, message: 'userId and matchedUserId required' })

  const exists = matches.find(
    m => (m.userId === userId && m.matchedUserId === matchedUserId) ||
         (m.userId === matchedUserId && m.matchedUserId === userId)
  )
  if (exists) return res.json({ success: true, data: exists, message: 'Match already exists' })

  const newMatch = {
    userId, matchedUserId,
    compatibility: Math.floor(Math.random() * 35) + 55,
    category: category || 'Social',
    createdAt: new Date().toISOString(),
    isNew: true,
  }
  matches.push(newMatch)
  res.status(201).json({ success: true, data: newMatch })
})

export default router
