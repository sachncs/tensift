export const SITE_CONFIG = {
  name: 'tensift',
  tagline: 'Integer factorization via tensor-network Schnorr sieving',
  description:
    'A deterministic, auditable Rust pipeline that splits a semiprime into its two prime factors. Seven stages. One reproducible trace.',
  repository: 'sachncs/tensift',
  githubUrl: 'https://github.com/sachncs/tensift',
  cratesUrl: 'https://crates.io/crates/tensift-cli',
  docsUrl: 'https://docs.rs/tensift',
  paper: {
    title: 'Schnorr’s factoring algorithm via tensor networks',
    citation:
      'M. Tesoro, I. Siloi, D. Jaschke, G. Magnifico, S. Montangero — Phys. Rev. A 113, 032418 (2026)',
    doi: 'https://doi.org/10.1103/PhysRevA.113.032418',
  },
  msrv: '1.88',
  version: '0.1.1',
  license: 'MIT OR Apache-2.0',
  stats: {
    crates: 5,
    stages: 7,
    unitTests: 121,
    integrationTests: 14,
    benchmarks: 4,
    linesOfRust: '12.6k',
    unsafe: '0',
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;