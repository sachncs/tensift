import { motion } from 'framer-motion';
import { GraduationCap, Microscope, Code2, Layers } from 'lucide-react';

const USE_CASES = [
  {
    icon: GraduationCap,
    title: 'Students & educators',
    body:
      'A first-class reference for lattice methods and tensor networks. Read the source, run the examples, study the math.',
    tags: ['LLL', 'CVP', 'TTN'],
  },
  {
    icon: Microscope,
    title: 'Cryptography researchers',
    body:
      'A reproducible substrate for Schnorr-style sieving experiments. Tune BKZ, OPES, bond dimension — every knob is exposed.',
    tags: ['sieving', 'OPES', 'MPO'],
  },
  {
    icon: Code2,
    title: 'Rust engineers',
    body:
      'A clean, modular crate workspace with a public API. Embed tensift-core in your application, or wrap tensift-cli in your tooling.',
    tags: ['crate', 'CLI', 'lib'],
  },
  {
    icon: Layers,
    title: 'Quantum-curious builders',
    body:
      'A bridge between classical lattices and tensor-network techniques used in quantum many-body physics. Read the paper, run the code.',
    tags: ['Phys. Rev. A', 'TTN', 'factor base'],
  },
];

export function UseCases() {
  return (
    <section id="audience" className="relative border-y border-white/[0.05] bg-ink-900/40 py-32 lg:py-40">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow">Who it&apos;s for</div>
            <h2 className="display-title mt-4 text-balance">
              Built for the people who actually read the code.
            </h2>
            <p className="lede mt-6 max-w-md">
              tensift is opinionated about who it serves. The list is small, and we wrote it
              for them in mind.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {USE_CASES.map((useCase, i) => {
              const Icon = useCase.icon;
              return (
                <motion.article
                  key={useCase.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.55, delay: 0.08 + i * 0.06 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-7 transition-colors hover:border-amber-500/20 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-amber-300">
                      <Icon size={16} strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-[22px] leading-tight tracking-tight text-ink-50">
                    {useCase.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-300/85">
                    {useCase.body}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {useCase.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}