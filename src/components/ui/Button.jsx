const variants = {
  // The one primary-styled action per view (taste rule: exactly one). This
  // is one of the four sanctioned accent locations — see index.css.
  primary:
    'bg-accent text-accent-contrast shadow-sm shadow-black/10 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-md',
  secondary:
    'border border-border bg-surface-elevated/70 text-text-secondary shadow-sm backdrop-blur hover:-translate-y-0.5 hover:border-text-muted hover:text-text-primary hover:shadow-md',
  // Neutral, not accent-bordered: an accent-colored border here would put a
  // second accent-styled button next to the primary CTA in Hero.
  outline:
    'border-2 border-border text-text-primary hover:-translate-y-0.5 hover:border-text-muted hover:bg-surface',
}

export default function Button({ as: Tag = 'a', variant = 'primary', className = '', children, ...props }) {
  return (
    <Tag
      className={`group inline-flex min-h-11 items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
