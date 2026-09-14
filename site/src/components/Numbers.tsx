import { motion } from 'framer-motion';
import { SITE_CONFIG } from '../lib/site-config';

interface Metric {
  value: string;
  label: string;
  detail?: string;
}

const METRICS: Metric[] = [
  { value: SITE_CONFIG.stats.stages.toString(), label: 'pipeline stages', detail: 'lattice → algebra' },
  { value: SITE_CONFIG.stats.crates.toString(), label: 'focused crates', detail: 'clear module boundaries' },
  { value: SITE_CONFIG.stats.unitTests.toString(), label: 'unit tests', detail: 'alongside the source' },
  { value: SITE_CONFIG.stats.integrationTests.toString(), label: 'integration tests', detail: 'end-to-end traces' },
  { value: SITE_CONFIG.stats.benchmarks.toString(), label: 'Criterion harnesses', detail: 'regression-safe benches' },
  { value: SITE_CONFIG.stats.linesOfRust, label: 'lines of Rust', detail: 'engineered, not generated' },
  { value: SITE_CONFIG.stats.unsafe, label: 'unsafe blocks', detail: 'memory safety is a default' },
  { value: SITE_CONFIG.msrv, label: 'MSRV', detail: 'stable Rust toolchain' },
];

export function Numbers() {
  return (
    <section id="numbers" className="relative py-32 lg:py-40">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow">By the numbers</div>
            <h2 className="display-title mt-4 text-balance">
              Engineered with the discipline of{' '}
              <em className="font-display not-italic text-amber-300/90">systems software</em>.
            </h2>
            <p className="lede mt-6">
              What you get when a research codebase is treated like a product:
              reproducible builds, audited dependencies, and a clean API surface.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] lg:grid-cols-4">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.04 }}
                className="group relative bg-ink-950/85 px-6 py-7 transition-colors hover:bg-ink-900/70"
              >
                <div className="font-display text-4xl font-light leading-none tracking-tight text-ink-50 lg:text-5xl">
                  {m.value}
                </div>
                <div className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-400">
                  {m.label}
                </div>
                {m.detail && (
                  <div className="mt-2 text-[12px] text-ink-500">{m.detail}</div>
                )}
                <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px scale-x-0 bg-amber-500/40 transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}