import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const STAGES = [
  { id: '01', label: 'LATTICE', desc: 'Schnorr basis' },
  { id: '02', label: 'REDUCE', desc: 'LLL · BKZ' },
  { id: '03', label: 'CVP', desc: 'Babai · Klein' },
  { id: '04', label: 'TENSOR', desc: 'TTN ansatz' },
  { id: '05', label: 'SAMPLE', desc: 'OPES · MPO' },
  { id: '06', label: 'SMOOTH', desc: 'factor base' },
  { id: '07', label: 'EXTRACT', desc: 'GF(2) · GCD' },
];

export function HeroVisual() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % STAGES.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-x-8 top-1/2 -z-10 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="glass-strong relative overflow-hidden rounded-2xl p-1 shadow-card ring-1 ring-white/[0.04]">
        <div className="rounded-xl bg-gradient-to-b from-ink-900/60 to-ink-950/80 p-6 sm:p-10">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-4">
            <div className="flex items-center gap-2">
              <motion.span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-amber-400"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-400">
                tensift · factorization trace
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
              <span>seed 42</span>
              <span className="hidden sm:inline">deterministic</span>
            </div>
          </div>

          <div className="grid items-center gap-10 pt-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300/80">
                input
              </div>
              <div className="mt-3 flex items-baseline gap-4">
                <span className="font-display text-5xl font-light tracking-tight text-ink-50 sm:text-6xl">
                  N&nbsp;=&nbsp;8&nbsp;633
                </span>
              </div>
              <div className="mt-2 font-mono text-xs text-ink-400">
                14-bit semiprime · 89 × 97
              </div>

              <motion.div
                initial={false}
                animate={{ opacity: 1 }}
                className="mt-10 hidden lg:block"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300/80">
                  output
                </div>
                <div className="mt-3 flex items-center gap-3 font-display text-4xl font-light text-ink-50">
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-200"
                  >
                    p&nbsp;=&nbsp;89
                  </motion.span>
                  <span className="text-ink-500">×</span>
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-200"
                  >
                    q&nbsp;=&nbsp;97
                  </motion.span>
                </div>
                <div className="mt-3 flex items-center gap-2 font-mono text-xs text-emerald-300/90">
                  <motion.span
                    className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  verified · 12.4 ms total
                </div>
              </motion.div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300/80">
                  seven stages
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                  live
                </div>
              </div>
              <ol className="relative mt-4 space-y-2.5">
                {STAGES.map((stage, i) => {
                  const active = i === activeIdx;
                  return (
                    <motion.li
                      key={stage.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.07, duration: 0.4, ease: 'easeOut' }}
                      className={`group flex items-center gap-3 transition-colors ${
                        active ? 'text-ink-50' : ''
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-md border font-mono text-[10px] font-medium transition-colors ${
                          active
                            ? 'border-amber-500/50 bg-amber-500/15 text-amber-200'
                            : 'border-white/[0.06] bg-white/[0.03] text-amber-300/80'
                        }`}
                      >
                        {stage.id}
                      </span>
                      <span
                        className={`font-mono text-[12px] uppercase tracking-[0.18em] transition-colors ${
                          active ? 'text-amber-200' : 'text-ink-100'
                        }`}
                      >
                        {stage.label}
                      </span>
                      <span
                        className={`hidden font-mono text-[10px] uppercase tracking-[0.16em] transition-colors sm:inline ${
                          active ? 'text-ink-400' : 'text-ink-500'
                        }`}
                      >
                        {stage.desc}
                      </span>
                      <span className="ml-auto h-px flex-1 bg-gradient-to-r from-white/[0.07] to-transparent" />
                      <motion.span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          active ? 'bg-amber-300' : 'bg-amber-400/30'
                        }`}
                        animate={
                          active
                            ? { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }
                            : { opacity: 1 }
                        }
                        transition={
                          active ? { duration: 1.4, repeat: Infinity } : { duration: 0.2 }
                        }
                      />
                    </motion.li>
                  );
                })}
              </ol>

              <div className="mt-6 lg:hidden">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300/80">
                  output
                </div>
                <div className="mt-3 flex items-center gap-3 font-display text-3xl font-light text-ink-50">
                  <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-200">
                    p&nbsp;=&nbsp;89
                  </span>
                  <span className="text-ink-500">×</span>
                  <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-amber-200">
                    q&nbsp;=&nbsp;97
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.05] pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
            <span>rustc 1.88+ · clippy clean · rustfmt · 0 unsafe</span>
            <span className="text-amber-400/80">view trace →</span>
          </div>
        </div>
      </div>
    </div>
  );
}