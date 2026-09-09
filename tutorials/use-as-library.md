---
layout: docs
title: Use as a library
section: Tutorials
subtitle: Embed tensift in your own Rust crate with the tensift-algebra API.
github_path: tutorials/use-as-library.md
---

# Use as a library

If you want to factor numbers from inside your own code, depend on
`tensift-algebra` and call `factorize`. This tutorial walks through the three
things most callers actually do:

1. Factor a single number with default settings.
2. Factor a number with custom `Config` settings.
3. Read pipeline statistics alongside the result.

## 1. Add the dependency

In your `Cargo.toml`:

```toml
[dependencies]
tensift-algebra = "0.1"
rug = "1.29"
```

`tensift-algebra` re-exports the rest of the pipeline (`tensift-lattice`,
`tensift-tensor`, `tensift-core`) for you, so a single dependency line is
enough for the typical use case.

## 2. Factor a single number

```rust
use rug::Integer;
use tensift_algebra::factor::{Config, factorize};

fn main() {
    let n = Integer::from(91u64);                 // 91 = 7 × 13
    let config = Config::default_for_bits(7);     // tuned for 7-bit numbers
    let result = factorize(&n, &config).unwrap();

    println!("p = {}, q = {}", result.p, result.q);
}
```

`Config::default_for_bits(bits)` returns a `Config` whose `n`, `pi_2`,
`max_cvp`, `gamma`, and `seed` are tuned to the bit size of `N`. The returned
`FactorResult` contains the two factors and some pipeline statistics.

## 3. Customize the configuration

Every CLI argument has a field on `Config`. For example, the
`tensift 8633 15 30 100 12345` invocation translates directly to:

```rust
use rug::Integer;
use tensift_algebra::factor::{Config, factorize};

fn main() {
    let n = Integer::from(8633u64);
    let mut config = Config::default_for_bits(14);
    config.n = 15;
    config.pi_2 = 30;
    config.gamma = 100;
    config.seed = 12345;

    let result = factorize(&n, &config).unwrap();
    println!("p = {}, q = {}", result.p, result.q);
}
```

The full set of fields is documented in the
[`Config` API reference](/api/tensift-algebra/#config).

## 4. Read the pipeline statistics

`factorize` returns a `FactorResult` that includes a `stats` field of type
`PipelineStats`. This contains per-stage timings and a few counters:

```rust
use rug::Integer;
use tensift_algebra::factor::{Config, factorize};

fn main() {
    let n = Integer::from(8633u64);
    let config = Config::default_for_bits(14);
    let result = factorize(&n, &config).unwrap();

    println!("p = {}, q = {}", result.p, result.q);
    println!("relations found: {}", result.relations_found);
    println!("CVP instances tried: {}", result.cvp_tried);
    println!("lattice time:        {:.2} ms", result.stats.lattice_time_ms);
    println!("reduction time:      {:.2} ms", result.stats.reduction_time_ms);
    println!("sampling time:       {:.2} ms", result.stats.sampling_time_ms);
    println!("smoothness time:     {:.2} ms", result.stats.smoothness_time_ms);
    println!("linear-algebra time: {:.2} ms", result.stats.linear_algebra_time_ms);
    println!("extraction time:     {:.2} ms", result.stats.extraction_time_ms);
}
```

## Where to go next

- [API reference → tensift-algebra](/api/tensift-algebra/) for the full
  function and type list, including `SmoothnessBasis`, `CvpSolver`, and
  `ReductionMode`.
- [Tutorials → Batch factorization](/tutorials/batch-factorization/) for
  factoring many numbers in parallel.
- [Tutorials → Reproducible runs](/tutorials/reproducible-runs/) for how the
  seeded RNG works in library code.