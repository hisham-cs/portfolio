const variants = {
  primary:
    'bg-brand-600 text-white shadow-sm shadow-black/10 hover:bg-brand-700 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10 dark:bg-brand-500 dark:hover:bg-brand-600 dark:shadow-black/30',
  secondary:
    'border border-slate-300 bg-white/70 text-slate-700 shadow-sm backdrop-blur hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-md dark:border-surface-border dark:bg-surface-card/70 dark:text-text-muted dark:hover:border-surface-border-hover dark:hover:text-brand-300',
  outline:
    'border-2 border-brand-600 text-brand-700 hover:-translate-y-0.5 hover:bg-brand-50 hover:border-brand-700 dark:border-brand-400 dark:text-text-main dark:hover:border-brand-300 dark:hover:bg-brand-400/10',
}

export default function Button({ as: Tag = 'a', variant = 'primary', className = '', children, ...props }) {
  return (
    <Tag
      className={`group inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
