const variants = {
  neutral:
    'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-surface-hover dark:text-text-muted dark:hover:bg-surface-border',
  accent:
    'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/16',
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-success/10 dark:text-success dark:ring-success/20',
  warning: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-warning/10 dark:text-warning dark:ring-warning/20',
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
