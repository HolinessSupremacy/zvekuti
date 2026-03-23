import express from 'express'
import { posts, users } from '../data/mockData.js'

const router = express.Router()

// GET all posts (campus feed)
router.get('/', (req, res) => {
  const { type, limit = 20, offset = 0 } = req.query

  let result = [...posts]
  if (type) result = result.filter(p => p.type === type)

  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const paginated = result.slice(parseInt(offset), parseInt(offset) + parseInt(limit))

  // Hydrate with author name
  const hydrated = paginated.map(p => {
    const author = users.find(u => u.id === p.authorId)
    return { ...p, authorName: author?.name || 'Unknown Student' }
  })

  res.json({ success: true, data: hydrated, total: result.length, limit: parseInt(limit), offset: parseInt(offset) })
})

// GET post by id
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id))
  if (!post) return res.status(404).json({ success: false, message: 'Post not found' })
  const author = users.find(u => u.id === post.authorId)
  res.json({ success: true, data: { ...post, authorName: author?.name || 'Unknown' } })
})

// POST create post
router.post('/', (req, res) => {
  const { authorId, type, title, content, tags } = req.body
  if (!authorId || !content) return res.status(400).json({ success: false, message: 'authorId and content required' })
  if (!['study', 'lost', 'social', 'idea'].includes(type)) {
    return res.status(400).json({ success: false, message: 'Invalid post type. Must be: study, lost, social, idea' })
  }

  const newPost = {
    id: posts.length + 1,
    authorId, type, title: title || '',
    content, tags: tags || [],
    likes: 0, comments: 0,
    createdAt: new Date().toISOString(),
  }
  posts.push(newPost)

  const author = users.find(u => u.id === authorId)
  res.status(201).json({ success: true, data: { ...newPost, authorName: author?.name || 'Unknown' } })
})

// POST like a post
router.post('/:id/like', (req, res) => {
  const idx = posts.findIndex(p => p.id === parseInt(req.params.id))
  if (idx === -1) return res.status(404).json({ success: false, message: 'Post not found' })
  posts[idx].likes += 1
  res.json({ success: true, data: { likes: posts[idx].likes } })
})

// DELETE post
router.delete('/:id', (req, res) => {
  const idx = posts.findIndex(p => p.id === parseInt(req.params.id))
  if (idx === -1) return res.status(404).json({ success: false, message: 'Post not found' })
  posts.splice(idx, 1)
  res.json({ success: true, message: 'Post deleted' })
})

export default router
