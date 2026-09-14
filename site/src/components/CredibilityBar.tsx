import { motion } from 'framer-motion';
import { SITE_CONFIG } from '../lib/site-config';

const ITEMS = [
  { label: 'crates.io', value: SITE_CONFIG.cratesUrl },
  { label: 'docs.rs', value: SITE_CONFIG.docsUrl },
  { label: 'Phys. Rev. A', value: SITE_CONFIG.paper.doi },
  { label: 'GitHub', value: SITE_CONFIG.githubUrl },
  { label: 'MIT / Apache-2.0', value: null },
];

export function CredibilityBar() {
  return (
    <section className="relative border-y border-white/[0.05] bg-ink-950/60 py-10">
      <div className="container-page">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-ink-400">
            <span className="inline-block h-px w-8 bg-amber-500/50" />
            available on
          </div>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {ITEMS.map((item, i) => {
              const inner = (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="font-display text-xl font-light tracking-tight text-ink-200/80 transition-colors hover:text-ink-50 sm:text-2xl"
                >
                  {item.label}
                </motion.span>
              );
              return item.value ? (
                <a
                  key={item.label}
                  href={item.value}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center"
                >
                  {inner}
                </a>
              ) : (
                <span key={item.label}>{inner}</span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}