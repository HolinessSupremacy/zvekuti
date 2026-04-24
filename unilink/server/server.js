import express from 'express'
import cors from 'cors'
import usersRouter from './routes/users.js'
import matchesRouter from './routes/matches.js'
import postsRouter from './routes/posts.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the React app build directory
app.use(express.static('../client/dist'))

// Request logger
app.use((req, _res, next) => {
  const ts = new Date().toISOString().split('T')[1].split('.')[0]
  console.log(`[${ts}] ${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api/users', usersRouter)
app.use('/api/matches', matchesRouter)
app.use('/api/posts', postsRouter)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'UniLink API',
    version: '1.0.0',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  })
})

// API docs overview
app.get('/api', (_req, res) => {
  res.json({
    name: 'UniLink API',
    version: '1.0.0',
    description: 'Student Connection Platform Backend',
    endpoints: {
      health:   'GET  /api/health',
      users: {
        list:     'GET  /api/users',
        get:      'GET  /api/users/:id',
        update:   'PATCH /api/users/:id',
        login:    'POST /api/users/auth/login',
        register: 'POST /api/users/auth/register',
      },
      matches: {
        forUser:       'GET  /api/matches/user/:userId',
        compatibility: 'GET  /api/matches/compatibility/:userId/:targetId',
        create:        'POST /api/matches',
      },
      posts: {
        feed:   'GET  /api/posts',
        get:    'GET  /api/posts/:id',
        create: 'POST /api/posts',
        like:   'POST /api/posts/:id/like',
        delete: 'DELETE /api/posts/:id',
      },
    },
  })
})

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (_req, res) => {
  res.sendFile('index.html', { root: '../client/dist' })
})

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Error handler
app.use((err, _req, res, _next) => {
  console.error('Server error:', err)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log('\n🎓 UniLink API Server')
  console.log(`   Running on  → http://localhost:${PORT}`)
  console.log(`   API docs    → http://localhost:${PORT}/api`)
  console.log(`   Health      → http://localhost:${PORT}/api/health`)
  console.log('   Press Ctrl+C to stop\n')
})
