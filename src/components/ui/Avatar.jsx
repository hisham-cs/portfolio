function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// Renders a real headshot when `src` is provided; otherwise falls back to a
// clean initials monogram so the UI never ships a placeholder photo.
export default function Avatar({ name, src, size = 56, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-200/70 bg-brand-100 dark:border-surface-border dark:bg-surface-hover ${className}`}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span
          className="font-bold text-brand-700 dark:text-brand-300"
          style={{ fontSize: size * 0.36 }}
        >
          {getInitials(name)}
        </span>
      )}
    </div>
  )
}
