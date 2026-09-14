import { motion } from 'framer-motion';

const STAGES = [
  {
    id: '01',
    group: 'Lattice',
    name: 'Lattice construction',
    detail: 'Build a Schnorr basis from N. Short vectors encode smooth relations.',
    tech: 'Schnorr basis',
    span: 2,
  },
  {
    id: '02',
    group: 'Lattice',
    name: 'Basis reduction',
    detail: 'LLL and BKZ find short, near-orthogonal vectors with reproducible seeds.',
    tech: 'LLL · BKZ',
    span: 2,
  },
  {
    id: '03',
    group: 'Lattice',
    name: 'CVP baseline',
    detail: 'Babai / Klein rounding gives a Closest-Vector-Problem anchor.',
    tech: 'Babai · Klein',
    span: 2,
  },
  {
    id: '04',
    group: 'Sampling',
    name: 'Tensor network ansatz',
    detail: 'A tree tensor network (TTN) represents 2ⁿ sign choices compactly.',
    tech: 'TTN',
    span: 2,
  },
  {
    id: '05',
    group: 'Sampling',
    name: 'Optimisation & sampling',
    detail: 'OPES sampling and MPO spectral amplification search low-energy states.',
    tech: 'OPES · MPO',
    span: 2,
  },
  {
    id: '06',
    group: 'Algebra',
    name: 'Smoothness verification',
    detail: 'Each candidate relation is tested against the factor base.',
    tech: 'factor base',
    span: 1,
  },
  {
    id: '07',
    group: 'Algebra',
    name: 'Factor extraction',
    detail: 'Linear algebra over GF(2) lifts smooth relations to N = p · q.',
    tech: 'GF(2) · GCD',
    span: 1,
  },
] as const;

export function Pipeline() {
  return (
    <section id="pipeline" className="relative py-32 lg:py-40">
      <div className="container-page">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow">The pipeline</div>
            <h2 className="display-title mt-4 max-w-2xl text-balance">
              Seven stages. <em className="font-display not-italic text-amber-300/90">One trace.</em>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lede max-w-md lg:justify-self-end lg:text-right"
          >
            Classical lattice machinery meets a tree tensor network. Each stage produces
            an auditable artefact you can inspect, replay, and verify.
          </motion.p>
        </div>

        <div className="relative mt-20">
          <div className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-500/15 to-transparent lg:block" />

          <div className="grid gap-3 lg:grid-cols-12">
            {STAGES.map((stage, i) => (
              <StageCard key={stage.id} stage={stage} index={i} />
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <GroupLegend label="Lattice" count={3} tone="warm" />
            <GroupLegend label="Sampling" count={2} tone="neutral" />
            <GroupLegend label="Algebra" count={2} tone="cool" />
          </div>
        </div>
      </div>
    </section>
  );
}

interface StageCardProps {
  stage: (typeof STAGES)[number];
  index: number;
}

function StageCard({ stage, index }: StageCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay: 0.05 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.015] p-6 transition-colors hover:border-amber-500/20 hover:bg-white/[0.03] ${
        stage.span === 1 ? 'lg:col-span-3' : 'lg:col-span-2'
      }`}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-500/0 transition-colors duration-500 group-hover:bg-amber-500/10 blur-2xl" />

      <div className="flex items-start justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300/90">
          {stage.id}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
          {stage.group}
        </span>
      </div>

      <h3 className="mt-6 font-display text-[22px] leading-tight tracking-tight text-ink-50">
        {stage.name}
      </h3>

      <p className="mt-3 text-[13px] leading-relaxed text-ink-300/85">
        {stage.detail}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-white/[0.05] pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
          {stage.tech}
        </span>
        <span aria-hidden="true" className="text-ink-500 transition-colors group-hover:text-amber-300">
          →
        </span>
      </div>
    </motion.article>
  );
}

function GroupLegend({
  label,
  count,
  tone,
}: {
  label: string;
  count: number;
  tone: 'warm' | 'neutral' | 'cool';
}) {
  const toneClass = {
    warm: 'bg-amber-500/15 border-amber-500/30 text-amber-200',
    neutral: 'bg-white/[0.04] border-white/[0.08] text-ink-200',
    cool: 'bg-sky-400/10 border-sky-400/20 text-sky-200',
  }[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between rounded-xl border px-5 py-4 ${toneClass}`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.22em]">{label}</span>
      <span className="font-display text-xl font-light">
        {count} <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">stages</span>
      </span>
    </motion.div>
  );
}