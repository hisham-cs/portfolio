export default function SectionHeading({ eyebrow, title, align = 'center' }) {
  const isLeft = align === 'left'

  return (
    <div className={`mb-12 ${isLeft ? 'text-left' : 'text-center'}`}>
      <p className="mb-2 text-sm font-semibold tracking-widest text-brand-600 uppercase dark:text-brand-300">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-text-main">
        {title}
      </h2>
      <div className={`mt-4 h-1 w-16 rounded-full bg-brand-600 dark:bg-brand-400 ${isLeft ? '' : 'mx-auto'}`} />
    </div>
  )
}
