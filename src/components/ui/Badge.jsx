const variants = {
  neutral: 'bg-surface text-text-secondary hover:bg-surface-elevated',
  // Not currently rendered anywhere in the app; kept token-consistent in
  // case a future call site needs an accent-tinted badge. Using it would
  // add a location beyond the four sanctioned accent spots — check that
  // against the accent-discipline rule before wiring it up.
  accent: 'bg-accent/10 text-accent hover:bg-accent/16',
  success: 'bg-success/10 text-success ring-1 ring-inset ring-success/20',
  warning: 'bg-warning/10 text-warning ring-1 ring-inset ring-warning/20',
}

export default function Badge({ variant = 'neutral', size = 'md', dot = false, className = '', children }) {
  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
        </span>
      )}
      {children}
    </span>
  )
}
