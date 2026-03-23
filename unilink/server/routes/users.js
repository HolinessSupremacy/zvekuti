import express from 'express'
import { users } from '../data/mockData.js'

const router = express.Router()

// GET all users
router.get('/', (req, res) => {
  const { major, year, interest } = req.query
  let result = users

  if (major) result = result.filter(u => u.major.toLowerCase().includes(major.toLowerCase()))
  if (year)  result = result.filter(u => u.year.toLowerCase() === year.toLowerCase())
  if (interest) result = result.filter(u => u.interests.some(i => i.toLowerCase().includes(interest.toLowerCase())))

  // Strip sensitive fields
  const safe = result.map(({ password, ...u }) => u)
  res.json({ success: true, data: safe, count: safe.length })
})

// GET user by id
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id))
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })
  const { password, ...safe } = user
  res.json({ success: true, data: safe })
})

// POST login (mock)
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body
  if (!email) return res.status(400).json({ success: false, message: 'Email required' })
  const user = users.find(u => u.email === email) || users[0]
  const { password: _, ...safe } = user
  res.json({ success: true, data: { user: safe, token: 'mock-jwt-token-' + Date.now() } })
})

// POST register (mock)
router.post('/auth/register', (req, res) => {
  const { name, email, studentId } = req.body
  if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email required' })
  const newUser = {
    id: users.length + 1,
    name, email, studentId: studentId || 'STU-NEW',
    major: 'Undeclared', year: 'Freshman',
    bio: '', interests: [], connections: [], groups: [],
    profileCompletion: 20, isVerified: false,
    joinedAt: new Date().toISOString(),
    personality: {},
  }
  users.push(newUser)
  res.status(201).json({ success: true, data: { user: newUser, token: 'mock-jwt-token-' + Date.now() } })
})

// PATCH update user profile
router.patch('/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id))
  if (idx === -1) return res.status(404).json({ success: false, message: 'User not found' })
  users[idx] = { ...users[idx], ...req.body, id: users[idx].id }
  const { password, ...safe } = users[idx]
  res.json({ success: true, data: safe })
})

export default router
