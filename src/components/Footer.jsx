import { profile } from '../data.js'

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <a href="#home" className="text-sm font-bold tracking-tight text-text-primary">
          {profile.name.split(' ')[0]}
          <span className="text-text-secondary">.dev</span>
        </a>

        <p className="font-mono text-xs tracking-[0.06em] text-text-muted">
          © {new Date().getFullYear()} {profile.name} · React / Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
