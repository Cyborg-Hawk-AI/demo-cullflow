import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-surface-900/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-lg shadow-brand-500/20">
            CF
          </div>
          <span className="font-display text-xl font-semibold tracking-tight group-hover:text-brand-300 transition-colors">
            CullFlow
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-gray-400 md:flex">
          <Link href="/#features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/research" className="hover:text-white transition-colors">
            Research
          </Link>
          <Link href="/developers" className="hover:text-white transition-colors">
            Developers
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-600/25 hover:bg-brand-500 transition-colors"
          >
            Open Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
