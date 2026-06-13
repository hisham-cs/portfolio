import { profile } from '../data.js'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 py-8 dark:border-surface-border/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <a href="#home" className="text-lg font-bold tracking-tight text-slate-900 dark:text-text-main">
            {profile.name.split(' ')[0]}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-brand dark:to-brand-light">
              .dev
            </span>
          </a>

          <div className="text-sm text-slate-500 dark:text-text-muted">
            <p>
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <p className="mt-1">
              Built with <span className="font-medium text-slate-700 dark:text-text-main">React</span> &{' '}
              <span className="font-medium text-slate-700 dark:text-text-main">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
