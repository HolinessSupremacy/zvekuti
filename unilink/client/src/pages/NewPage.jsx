import { motion } from 'framer-motion'
import { Bell, Search } from 'lucide-react'

export default function NewPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 px-4 py-3" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>New Page</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-4 py-6"
      >
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Welcome to the New Page</h2>
          <p className="text-gray-600">This is a placeholder for the new page content.</p>
        </div>
      </motion.div>
    </div>
  )
}