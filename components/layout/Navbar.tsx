import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-sm border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-medium text-sm tracking-tight text-[var(--foreground)]">
          Shivansh Kalra
        </Link>

        <div className="flex items-center gap-6 text-sm text-[var(--muted-foreground)]">
          <Link href="/projects" className="hover:text-[var(--foreground)] transition-colors">
            Projects
          </Link>
          <Link href="/experience" className="hover:text-[var(--foreground)] transition-colors">
            Experience
          </Link>
          <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
