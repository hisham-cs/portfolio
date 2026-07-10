import { profile } from '../data.js'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-surface-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <a href="#home" className="text-sm font-bold tracking-tight text-slate-900 dark:text-text-main">
          {profile.name.split(' ')[0]}
          <span className="text-brand-600 dark:text-brand-300">.dev</span>
        </a>

        <p className="font-mono text-xs tracking-[0.06em] text-slate-400 dark:text-text-dim">
          © {new Date().getFullYear()} {profile.name} · React / Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
