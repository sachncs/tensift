---
layout: docs
title: Quick tour
section: Tutorials
subtitle: A five-minute tour of what tensift does, end to end.
github_path: tutorials/quick-tour.md
---

# Quick tour

A five-minute tour of what tensift does, end to end, with no math. If you want
to *run* something right away, jump to
[Tutorials → Factor from the CLI](/tutorials/factor-from-cli/).

## The problem in one sentence

tensift splits a semiprime (a number that is the product of exactly two primes)
into those two primes.

```
91       = 7  × 13        (small)
8633     = 89 × 97        (medium)
```

## What the pipeline looks like

```
   N = p × q
       │
       ▼
┌──────────────────────────────┐
│ 1. Lattice construction      │   Encode the problem as a CVP instance.
│ 2. Basis reduction           │   Improve the lattice so CVP is solvable.
│ 3. CVP baseline              │   Get an approximate closest vector.
│ 4. Tensor network ansatz     │   Turn the residual into an Ising-like energy.
│ 5. Optimization & sampling   │   Find low-energy bit-string configurations.
│ 6. Smoothness verification   │   Test whether each relation is "smooth".
│ 7. Factor extraction         │   GF(2) linear algebra + GCD → {p, q}.
└──────────────────────────────┘
       │
       ▼
   (p, q)
```

Each stage has its own
[stage document](/docs/stage-1-lattice-construction/). The top-level
[`factorize`](/api/tensift-algebra/) entry point drives all seven stages for
you.

## What you can do with it

- **Factor small semiprimes** — anything up to about 60 bits is tractable on a
  laptop. Above that, the pipeline starts to want serious compute.
- **Tinker with samplers** — swap the default TTN+OPES sampler for a
  simulated-annealing fallback, change the bond dimension, or plug in your own.
- **Study the algorithm** — the implementation is meant to be read. Every
  stage has a documentation page, and the [implementation notes](/docs/implementation-notes/)
  call out where the code departs from the paper.
- **Benchmark** — four Criterion benchmarks cover lattice construction,
  reduction, prime generation, and the classical sampler.

## What you should *not* use it for

- Anything that depends on the cryptographic hardness of integer factorization
  — this is a research implementation. See
  [Concepts → Limitations](/concepts/limitations/).
- Inputs larger than ~64 bits — the heuristic lattice dimensions in
  `Config::default_for_bits` top out at `n = 20`.

## Where to go from here

- New to the project?  → [Getting started](/getting-started/) then
  [Factor from the CLI](/tutorials/factor-from-cli/).
- Coming from the paper?  →
  [Concepts → Algorithm overview](/concepts/algorithm-overview/) and then the
  [stage docs](/docs/stage-1-lattice-construction/).
- Want to extend it?  → [API reference → crate map](/api/crate-map/) and
  [Contributing](/contributing/).