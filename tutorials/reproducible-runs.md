---
layout: docs
title: Reproducible runs
section: Tutorials
subtitle: How tensift threads a single seeded RNG through every stage.
github_path: tutorials/reproducible-runs.md
---

# Reproducible runs

tensift guarantees that the same input, the same `Config`, and the same `seed`
produce the same factors. This page explains how that guarantee is implemented
and what can break it.

## The seeded RNG

`factorize` constructs exactly one `ChaCha8Rng`:

```rust
use rand::SeedableRng;
use rand_chacha::ChaCha8Rng;

let mut rng = ChaCha8Rng::seed_from_u64(seed);
```

…and passes `&mut rng` down through every stage that needs randomness. The
relevant stages are:

| Stage | Randomness source |
|---|---|
| 1: Lattice construction | diagonal weight permutation |
| 2: Basis reduction | none — deterministic |
| 3: CVP baseline | Klein sampling (only when `cvp_solver ∈ {Klein, Hybrid}`) |
| 4: Tensor network | leaf tensor initialization, belief-propagation start |
| 5: Optimization & sampling | classical sampler (greedy restart, SA, TTN sweeps) |
| 6: Smoothness verification | deterministic (trial division) |
| 7: Factor extraction | random GF(2) combination trials |

There is **one** `&mut rng` parameter threading through this list. No stage
calls `rand::random()` or constructs its own `OsRng`.

## What this gives you

```bash
$ tensift 8633 15 30 100 12345
p = 89, q = 97, relations = 14

$ tensift 8633 15 30 100 12345
p = 89, q = 97, relations = 14
```

Same seed → same factors, same relation count, same timings (within scheduling
noise).

## What can break reproducibility

A few things to watch for:

1. **Multi-threaded scheduling.**  Parallel operations over the slice budget
   may accumulate in a different order across runs when the work-stealing
   scheduler picks differently. The factors and statistics are stable; per-call
   timings may vary by a few percent.
2. **Non-deterministic floating-point.**  The TTN sweep uses `f64`
   contractions. Compiled reordering of `+`/`*` chains can produce bit-for-bit
   different intermediates on different CPUs, which can occasionally nudge
   the sampler into a different basin. With the same seed on the same
   hardware, results are reproducible; across machines they may differ in the
   last few relations.
3. **Changing the seed.**  Obvious, but: don't.

## Library code

```rust
use rand::SeedableRng;
use rand_chacha::ChaCha8Rng;
use rug::Integer;
use tensift_algebra::factor::{Config, factorize};

fn main() {
    let n = Integer::from(8633u64);
    let mut config = Config::default_for_bits(14);
    config.seed = 12345;

    let r1 = factorize(&n, &config).unwrap();
    let r2 = factorize(&n, &config).unwrap();

    assert_eq!((r1.p.clone(), r1.q.clone()), (r2.p.clone(), r2.q.clone()));
}
```

`Config::seed` is the only place you need to set. The pipeline constructs
the `ChaCha8Rng` internally.

## See also

- [Tutorials → Use as a library](/tutorials/use-as-library/)
- [Stage 5: Optimization & sampling](/docs/stage-5-optimization-sampling/)
- [Implementation notes → Custom Power-Iteration SVD](/docs/implementation-notes/#custom-power-iteration-svd)