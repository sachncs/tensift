import { motion } from 'framer-motion';
import { Boxes, Cpu, FlaskConical, ShieldCheck, Sparkles, Workflow } from 'lucide-react';

const FEATURES = [
  {
    icon: Workflow,
    title: 'Deterministic by design',
    body:
      'Seeded RNG, reproducible LLL pivots, and fixed-precision arithmetic mean the same input yields the same factors — every run, every machine.',
    eyebrow: 'Reproducibility',
  },
  {
    icon: Cpu,
    title: 'Zero unsafe code',
    body:
      'Written in safe Rust with strict clippy, rustfmt, and a committed Cargo.lock. Memory safety is a default, not a promise.',
    eyebrow: 'Memory safety',
  },
  {
    icon: Boxes,
    title: 'Five focused crates',
    body:
      'tensift-algebra · tensift-lattice · tensift-tensor · tensift-core · tensift-cli. Clear boundaries, composable internals.',
    eyebrow: 'Modular workspace',
  },
  {
    icon: ShieldCheck,
    title: 'Auditable per-stage trace',
    body:
      'Every stage emits a structured artefact — basis, CVP anchor, smooth relations, GF(2) certificate. Inspect, replay, verify.',
    eyebrow: 'Transparency',
  },
  {
    icon: FlaskConical,
    title: 'Tunable end-to-end',
    body:
      'Bond dimension, factor base size, BKZ block size, OPES biasing, MPO spectrum — every parameter is exposed for research.',
    eyebrow: 'Research-grade',
  },
  {
    icon: Sparkles,
    title: 'CLI + library',
    body:
      'Factor a number from your terminal, or embed tensift-core as a library in your own Rust application.',
    eyebrow: 'Two surfaces',
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 lg:py-40">
      <div className="container-page">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="eyebrow">Why tensift</div>
            <h2 className="display-title mt-4 text-balance">
              Built for <em className="font-display not-italic text-amber-300/90">rigor</em>,
              not performance theatre.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lede max-w-md"
          >
            A research reference, engineered with the discipline of systems software.
            The polish comes from clarity, not from hiding complexity.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-ink-950/85 p-7 transition-colors hover:bg-ink-900/60 lg:p-9"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/8 text-amber-300">
                    <Icon size={16} strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
                    {feature.eyebrow}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-[22px] leading-tight tracking-tight text-ink-50">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-300/85">
                  {feature.body}
                </p>

                <div className="mt-7 flex items-center gap-2 text-[12px] text-ink-400 transition-colors group-hover:text-amber-300">
                  <span>Learn more</span>
                  <span aria-hidden="true">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}