---
layout: docs
title: Batch factorization
section: Tutorials
subtitle: Factor many numbers in parallel with rayon.
github_path: tutorials/batch-factorization.md
---

# Batch factorization

If you have a list of semiprimes and a multi-core machine, the easiest way to
factor them in parallel is to use `rayon` (which tensift already depends on)
and let the `factorize` call use all available threads internally.

## Simple sequential loop

```rust
use rug::Integer;
use tensift_algebra::factor::{Config, FactorResult, factorize};

fn main() {
    let semiprimes = [91u64, 143, 323, 899, 1517, 2021, 8633];
    let mut successes = 0;

    for &n in &semiprimes {
        let n = Integer::from(n);
        let config = Config::default_for_bits(n.significant_bits() as usize);
        match factorize(&n, &config) {
            Ok(FactorResult { p, q, .. }) => {
                println!("{} = {} × {}", n, p, q);
                successes += 1;
            }
            Err(e) => println!("{}: failed ({})", n, e),
        }
    }
    println!("{}/{} semiprimes factored", successes, semiprimes.len());
}
```

The inner `factorize` call already parallelizes the sampling and smoothness
testing stages across `num_slices` threads (defaults to `num_cpus`).

## Parallel batch with rayon

For a many-input batch, you can also parallelize the outer loop:

```rust
use rayon::prelude::*;
use rug::Integer;
use tensift_algebra::factor::{Config, FactorResult, factorize};

fn main() {
    let semiprimes = [91u64, 143, 323, 899, 1517, 2021, 8633];

    let results: Vec<_> = semiprimes
        .par_iter()
        .map(|&n| {
            let n = Integer::from(n);
            let config = Config::default_for_bits(n.significant_bits() as usize);
            match factorize(&n, &config) {
                Ok(FactorResult { p, q, .. }) => Ok((n, p, q)),
                Err(e) => Err((n, e)),
            }
        })
        .collect();

    for r in &results {
        match r {
            Ok((n, p, q)) => println!("{} = {} × {}", n, p, q),
            Err((n, e)) => println!("{}: failed ({})", n, e),
        }
    }
}
```

This nests two layers of parallelism:

1. `rayon`'s `par_iter` runs each `factorize` call on its own task.
2. `factorize` itself uses `num_slices` threads internally.

To avoid over-subscription, you can lower `num_slices` per call:

```rust
let mut config = Config::default_for_bits(bits);
config.num_slices = 1;          // keep outer parallelism only
```

…or use `rayon`'s thread pool to constrain total threads:

```rust
rayon::ThreadPoolBuilder::new()
    .num_threads(4)
    .build_global()
    .unwrap();
```

## Reproducibility across the batch

If you want every factor of the same input to be identical run-to-run, pin the
seed:

```rust
let mut config = Config::default_for_bits(bits);
config.seed = 42;       // or any fixed u64
```

The seed is threaded through a single `ChaCha8Rng`, so a given `(n, config)`
pair always produces the same `(p, q)`.

## Where to go next

- [Tutorials → Reproducible runs](/tutorials/reproducible-runs/)
- [Tuning the pipeline](/tutorials/tuning-the-pipeline/) for changing
  parameters per input size
- [API reference → tensift-algebra](/api/tensift-algebra/)