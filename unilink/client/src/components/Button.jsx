import { motion } from 'framer-motion'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  icon,
  fullWidth = false,
  disabled = false,
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 select-none'

  const variants = {
    primary:  'text-white shadow-soft active:scale-95',
    secondary:'border-2 active:scale-95',
    ghost:    'active:scale-95',
    danger:   'text-white active:scale-95',
    mint:     'text-white active:scale-95',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-base',
  }

  const styles = {
    primary:  { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 6px 20px rgba(99,102,241,0.3)' },
    secondary:{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', background: 'var(--color-primary-soft)' },
    ghost:    { color: 'var(--color-muted)', background: 'transparent' },
    danger:   { background: 'linear-gradient(135deg, #ef4444, #dc2626)' },
    mint:     { background: 'linear-gradient(135deg, #10b981, #34d399)', boxShadow: '0 6px 20px rgba(16,185,129,0.25)' },
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      style={styles[variant]}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  )
}
