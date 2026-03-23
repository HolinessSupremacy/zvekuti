import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Users, MessageCircle, Grid3X3, UserCircle } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/home',     icon: Home,          label: 'Home'     },
  { to: '/matches',  icon: Users,         label: 'Matches'  },
  { to: '/groups',   icon: Grid3X3,       label: 'Groups'   },
  { to: '/messages', icon: MessageCircle, label: 'Messages' },
  { to: '/profile',  icon: UserCircle,    label: 'Profile'  },
]

export default function Layout({ children, onLogout }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      {/* Main scrollable content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div
          className="flex items-center justify-around px-2 py-2"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(99,102,241,0.08)',
            boxShadow: '0 -4px 24px rgba(99,102,241,0.08)',
            paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
          }}
        >
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className="flex-1">
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-1 py-1 relative">
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full nav-active-bar"
                      transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                    />
                  )}
                  <motion.div
                    animate={{ scale: isActive ? 1.12 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon
                      size={22}
                      strokeWidth={isActive ? 2.2 : 1.7}
                      style={{
                        color: isActive ? 'var(--color-primary)' : '#9ca3af',
                        filter: isActive ? 'drop-shadow(0 0 6px rgba(99,102,241,0.4))' : 'none',
                      }}
                    />
                  </motion.div>
                  <span
                    className="text-[10px] font-semibold tracking-wide"
                    style={{ color: isActive ? 'var(--color-primary)' : '#9ca3af' }}
                  >
                    {label}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
