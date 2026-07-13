export default function SectionHeading({ eyebrow, title, align = 'center' }) {
  const isLeft = align === 'left'

  return (
    <div className={`mb-12 ${isLeft ? 'text-left' : 'text-center'}`}>
      <p className="mb-2 text-sm font-semibold tracking-widest text-text-secondary uppercase">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h2>
      <div className={`mt-4 h-1 w-16 rounded-full bg-text-muted/40 ${isLeft ? '' : 'mx-auto'}`} />
    </div>
  )
}
