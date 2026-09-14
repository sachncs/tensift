import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { SITE_CONFIG } from '../lib/site-config';

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(214,120,41,0.18)_0%,rgba(214,120,41,0)_60%)]" />
        <div className="absolute -top-32 left-1/2 h-[480px] w-[840px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }}
        />
      </div>

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="chip">
            <Sparkles size={11} className="text-amber-300" />
            <span>Phys. Rev. A 113 · 032418 (2026)</span>
          </div>

          <h1 className="display-title-xl mt-8 max-w-5xl text-balance">
            Integer factorization,
            <br />
            <em className="font-display not-italic">
              <span className="gradient-text-amber">deterministically</span>
            </em>
            .
          </h1>

          <p className="lede mt-8 max-w-2xl text-balance">
            {SITE_CONFIG.description} A Rust reference implementation
            that turns <span className="font-mono text-ink-50">N&nbsp;=&nbsp;p&nbsp;·&nbsp;q</span> into
            its two prime factors with a seven-stage, auditable trace.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#start" className="btn-primary px-6 py-3 text-[15px]">
              Install in 30 seconds
              <ArrowRight size={15} />
            </a>
            <a href="#pipeline" className="btn-secondary px-5 py-3 text-[15px]">
              See the pipeline
            </a>
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost px-4 py-3 text-[15px]"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              {SITE_CONFIG.repository}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 lg:mt-28"
        >
          <HeroVisual />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:grid-cols-4"
        >
          {[
            { k: '7', label: 'pipeline stages' },
            { k: '5', label: 'focused crates' },
            { k: '12.6k', label: 'lines of Rust' },
            { k: '0', label: 'unsafe blocks' },
          ].map((s) => (
            <div key={s.label} className="bg-ink-950/40 px-6 py-6 text-center">
              <div className="font-display text-3xl font-light text-ink-50">{s.k}</div>
              <div className="mt-1 text-[11px] font-mono uppercase tracking-widest text-ink-400">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}