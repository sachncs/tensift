import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './Logo';
import { useScroll } from '../hooks/useScroll';
import { SITE_CONFIG } from '../lib/site-config';

const NAV_LINKS = [
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Features', href: '#features' },
  { label: 'In motion', href: '#trace' },
  { label: 'Numbers', href: '#numbers' },
  { label: 'Get started', href: '#start' },
];

export function Nav() {
  const { atTop } = useScroll(8);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: atTop ? 'rgba(11,10,9,0)' : 'rgba(11,10,9,0.72)',
        borderColor: atTop ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.06)',
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
    >
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium tracking-tight text-ink-300 transition-colors hover:text-ink-50"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary hidden sm:inline-flex"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>Star</span>
          </a>

          <a href="#start" className="btn-primary hidden md:inline-flex">
            Get started
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-200 hover:bg-white/5 md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <path d="M6 6l12 12M18 6l-12 12" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/[0.06] bg-ink-950/85 backdrop-blur-xl md:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm text-ink-200 hover:bg-white/5 hover:text-ink-50"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#start"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-3 w-full"
              >
                Get started
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}