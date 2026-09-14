import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Terminal } from 'lucide-react';
import { useState } from 'react';
import { SITE_CONFIG } from '../lib/site-config';

const INSTALL_COMMAND = 'cargo install tensift-cli';

export function GetStarted() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="start" className="relative py-32 lg:py-40">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-ink-900/70 via-ink-950/80 to-ink-950/90 p-8 sm:p-12 lg:p-20"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-amber-500/15 blur-[140px]" />
            <div className="absolute inset-0 grid-bg opacity-40" />
          </div>

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <div className="eyebrow">Get started</div>
              <h2 className="display-title mt-4 text-balance">
                <em className="font-display not-italic text-amber-300/90">30 seconds.</em>{' '}
                One command.
              </h2>
              <p className="lede mt-6 max-w-md">
                Install tensift from crates.io and factor your first semiprime before this page finishes loading.
                No git clone, no build step.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href={SITE_CONFIG.cratesUrl} target="_blank" rel="noreferrer" className="btn-primary px-6 py-3 text-[15px]">
                  Install from crates.io
                  <ArrowUpRight size={15} />
                </a>
                <a href={SITE_CONFIG.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary px-5 py-3 text-[15px]">
                  Read on GitHub
                </a>
              </div>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                Requires Rust {SITE_CONFIG.msrv} or newer · MIT / Apache-2.0
              </p>
            </div>

            <div className="relative">
              <div className="glass-strong overflow-hidden rounded-2xl">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Terminal size={13} className="text-amber-300" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-300">
                      install
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label="Copy command"
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-300 transition-colors hover:bg-white/[0.06] hover:text-ink-100"
                  >
                    <Copy size={11} />
                    {copied ? 'copied' : 'copy'}
                  </button>
                </div>
                <pre className="overflow-x-auto bg-ink-950/70 px-6 py-7 font-mono text-[14px] leading-relaxed text-ink-100 sm:px-8 sm:py-10">
                  <code>
                    <span className="select-none text-amber-400">$ </span>
                    {INSTALL_COMMAND}
                  </code>
                </pre>
                <div className="border-t border-white/[0.06] bg-ink-950/40 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 sm:px-8">
                  <div className="flex items-center justify-between">
                    <span>no git · no build step · deterministic</span>
                    <span className="text-amber-300/80">→ ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}