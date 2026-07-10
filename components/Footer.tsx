import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-800/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
                CF
              </div>
              <span className="font-display text-lg font-semibold">CullFlow</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              AI culls your wedding shoot and delivers a client gallery automatically.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/demo" className="hover:text-brand-400 transition-colors">
                  Interactive Demo
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-brand-400 transition-colors">
                  Developer Docs
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-brand-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-brand-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Learn More</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/research" className="hover:text-brand-400 transition-colors">
                  How we found this idea
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-brand-400 transition-colors">
                  Try the demo
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-brand-400 transition-colors">
                  Integration notes
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-gray-600">
            © 2026 CullFlow. Demo built by Idea Miner.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <Link href="/demo" className="hover:text-gray-400 transition-colors">
              Demo
            </Link>
            <Link href="/developers" className="hover:text-gray-400 transition-colors">
              Developers
            </Link>
            <Link href="/research" className="hover:text-gray-400 transition-colors">
              How we found this idea
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
