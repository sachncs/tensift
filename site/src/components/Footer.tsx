import { Logo } from './Logo';
import { SITE_CONFIG } from '../lib/site-config';
import { Github, BookOpen, Package, FileText } from 'lucide-react';

const FOOTER_NAV = [
  {
    title: 'Project',
    links: [
      { label: 'Repository', href: SITE_CONFIG.githubUrl, icon: Github },
      { label: 'crates.io', href: SITE_CONFIG.cratesUrl, icon: Package },
      { label: 'docs.rs', href: SITE_CONFIG.docsUrl, icon: BookOpen },
      { label: 'Paper · Phys. Rev. A', href: SITE_CONFIG.paper.doi, icon: FileText },
    ],
  },
  {
    title: 'Pipeline',
    links: [
      { label: '01 · Lattice construction', href: '#pipeline' },
      { label: '02 · Basis reduction', href: '#pipeline' },
      { label: '03 · CVP baseline', href: '#pipeline' },
      { label: '04 · Tensor network', href: '#pipeline' },
      { label: '05 · Optimisation & sampling', href: '#pipeline' },
      { label: '06 · Smoothness', href: '#pipeline' },
      { label: '07 · Factor extraction', href: '#pipeline' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'In motion', href: '#trace' },
      { label: 'By the numbers', href: '#numbers' },
      { label: 'Audience', href: '#audience' },
      { label: 'Get started', href: '#start' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-ink-950">
      <div className="container-page py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr] lg:gap-20">
          <div>
            <Logo />
            <p className="lede mt-6 max-w-sm">
              A research-grade Rust implementation of a deterministic seven-stage integer-factorization pipeline.
              Same seed, same answer — every run.
            </p>

            <div className="mt-8 space-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-emerald-300/80">v{SITE_CONFIG.version}</span>
                <span className="text-ink-600">·</span>
                <span>Rust {SITE_CONFIG.msrv}+</span>
              </div>
              <div>
                <span className="text-ink-400">License</span>
                <span className="ml-2 text-ink-200">{SITE_CONFIG.license}</span>
              </div>
              <div>
                <span className="text-ink-400">Citation</span>
                <span className="ml-2 text-ink-200">{SITE_CONFIG.paper.citation}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {FOOTER_NAV.map((column) => (
              <div key={column.title}>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-300/80">
                  {column.title}
                </h4>
                <ul className="mt-6 space-y-3">
                  {column.links.map((link) => {
                    const Icon = 'icon' in link ? link.icon : undefined;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                          className="group inline-flex items-center gap-2 text-[13px] text-ink-300 transition-colors hover:text-ink-50"
                        >
                          {Icon && <Icon size={12} className="text-ink-500 group-hover:text-amber-300" />}
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.05] pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
            © {new Date().getFullYear()} Sachin · tensift · open source under MIT / Apache-2.0
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
            Built with care in Rust
          </p>
        </div>
      </div>
    </footer>
  );
}