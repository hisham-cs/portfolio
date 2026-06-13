export default function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-10 text-center">
      <p className="mb-2 text-sm font-semibold tracking-widest text-indigo-600 uppercase dark:text-brand-light">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-text-main">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-indigo-600 dark:bg-brand" />
    </div>
  )
}
