---
layout: docs
title: tensift-algebra
section: API reference
subtitle: The top-level crate. Smoothness testing, factor extraction, the factorize() entry point.
github_path: api/tensift-algebra.md
---

# tensift-algebra

`ten sift-algebra` is the top-level crate. It owns:

- **Stage 6: Smoothness verification** (`smoothness` module)
- **Stage 7: Factor extraction** (`gf2_solver` + `extract` + the wiring in `factor`)
- The `Config` struct and the top-level `factorize` function

It depends on `tensift-lattice` and `tensift-tensor` because the pipeline
needs them inline. A typical caller only needs `tensift-algebra` plus
`tensift-core`.

```toml
[dependencies]
tensift-algebra = "0.1"
rug = "1.29"
```

## `Config`

```rust
pub struct Config { /* see fields below */ }
```

Hyperparameters for the pipeline. Construct with `Config::default_for_bits(bits)`
for a sensible default tuned to the bit size of the input.

| Field | Type | Default | Meaning |
|---|---|---|---|
| `n` | `usize` | Auto (6-20) | Lattice dimension |
| `pi_2` | `usize` | `2 * n` | Smoothness basis size |
| `c` | `f64` | heuristic | Scaling parameter for the lattice's logarithmic row |
| `max_cvp` | `usize` | `500` | Maximum CVP instances to try |
| `gamma` | `usize` | `50` | Samples per CVP instance |
| `seed` | `u64` | `42` | RNG seed for reproducibility |
| `combination_trials` | `usize` | `50` | Random GF(2) combination trials |
| `use_ttn_sampler` | `bool` | `true` | Use TTN+OPES instead of classical sampler |
| `ttn_bond_dim` | `usize` | `4` | Initial TTN bond dimension |
| `transverse_field_alpha` | `f64` | `0.1` | Transverse field perturbation strength |
| `enable_adaptive_bonds` | `bool` | `true` | Adaptively grow bond dimension |
| `adaptive_pid_params` | `PidParams` | `for_tnss(32)` | PID params for adaptive bonds |
| `enable_index_slicing` | `bool` | `true` | Parallel evaluation of candidates |
| `num_slices` | `usize` | num CPUs | Parallel slice count (`0` = auto) |
| `min_configs_multiplier` | `usize` | `16` | Per-slice candidate budget multiplier |
| `svd_threshold` | `f64` | `1e-12` | SVD truncation threshold for tensor compression |
| `cvp_solver` | `CvpSolver` | `Deterministic` | CVP solver strategy |
| `klein_num_samples` | `usize` | `10` | Klein sampling count |
| `klein_eta` | `f64` | `0.4` | Klein sampling width |
| `reduce_mode` | `ReductionMode` | `Lll` | Lattice reduction strategy |
| `bkz_blocksize` | `usize` | `20` | BKZ block size |
| `enable_early_termination` | `bool` | `true` | Stop on convergence |
| `convergence_threshold` | `f64` | `1e-6` | Convergence threshold |
| `max_wall_time_secs` | `u64` | `0` | Wall-clock limit (`0` = no limit) |

### Constructors

- `Config::default_for_bits(bits: usize) -> Self` — pick defaults based on the
  bit size of the input.
- `Config::small_semiprime() -> Self` — fast settings for ≤ 30-bit inputs.
- `Config::large_semiprime() -> Self` — heavier settings for > 60-bit inputs.

### Methods

- `Config::effective_slices(&self) -> usize` — return `num_slices` if non-zero,
  else `rayon::current_num_threads()`.
- `Config::validate(&self) -> Result<()>` — check that the parameters are sane.
- `Config::slice_config(&self) -> SliceConfig` — build a `SliceConfig` for the
  parallel sampling stage.
- `Config::ttn_config(&self) -> TTNConfig` — build a `TTNConfig` for the TTN
  initialization.

## `factorize`

```rust
pub fn factorize(n: &Integer, config: &Config) -> Result<FactorResult>
```

The top-level entry point. Runs all seven stages and returns a `FactorResult`
with the two factors and pipeline statistics.

```rust
use rug::Integer;
use tensift_algebra::factor::{Config, factorize};

let n = Integer::from(91u64);
let config = Config::default_for_bits(7);
let result = factorize(&n, &config)?;
println!("p = {}, q = {}", result.p, result.q);
```

## `FactorResult`

```rust
pub struct FactorResult {
    pub p: Integer,
    pub q: Integer,
    pub relations_found: usize,
    pub cvp_tried: usize,
    pub stats: PipelineStats,
}
```

Returned by `factorize` on success. `p` and `q` are verified: `p * q == n`.

## `PipelineStats`

```rust
pub struct PipelineStats {
    pub lattice_time_ms: f64,
    pub reduction_time_ms: f64,
    pub sampling_time_ms: f64,
    pub smoothness_time_ms: f64,
    pub linear_algebra_time_ms: f64,
    pub extraction_time_ms: f64,
    pub cvp_instances: usize,
    pub smooth_relations: usize,
    pub num_slices: usize,
}
```

Per-stage wall-clock timings (milliseconds) plus a few counters.

## `SmoothnessBasis`

```rust
pub struct SmoothnessBasis { /* ... */ }
```

A precomputed list of the first $\pi_2$ primes, used for trial division during
smoothness verification.

### Methods

- `SmoothnessBasis::new(pi_2: usize) -> Self` — generate the basis of the
  first `pi_2` primes.
- `SmoothnessBasis::len(&self) -> usize` — number of primes.
- `SmoothnessBasis::is_empty(&self) -> bool` — true if `pi_2 == 0`.
- `SmoothnessBasis::get(&self, index: usize) -> Option<u64>` — the prime at
  `index`.

## `SrPair`

```rust
pub struct SrPair { /* ... */ }
```

A smooth relation with exponent vectors `e_u` and `e_w` over the factor base.
Built by `try_build_sr_pair`.

## `factor_smooth`

```rust
pub fn factor_smooth(n: &Integer, basis: &SmoothnessBasis) -> Option<Vec<u32>>
```

Trial-divide `n` by the factor base. Returns the exponent vector, or `None`
if `n` is not smooth.

## `try_build_sr_pair`

```rust
pub fn try_build_sr_pair(
    u: i64,
    w: i64,
    n: &Integer,
    basis: &SmoothnessBasis,
) -> Option<SrPair>
```

Build an `SrPair` from a candidate `(u, w)` with `w ≡ u (mod n)`. Returns
`None` if either `u` or `w` is not smooth over the basis.

## `verify_sr_pair`

```rust
pub fn verify_sr_pair(
    pair: &SrPair,
    e: &[i64],
    primes: &[u64],
    n: &Integer,
) -> bool
```

Re-verify a smooth relation. Used by the integration tests.

## `kernel_basis`

```rust
pub fn kernel_basis(matrix: &[Vec<u8>]) -> Vec<Vec<u8>>
```

Compute a basis of the kernel of a bit-packed matrix over GF(2). Each
column is a kernel vector. Returns the trivial kernel if the matrix is
invertible.

## Re-exports

`factor` re-exports the most useful types from across the workspace so
downstream code can `use tensift_algebra::factor::*;` and have everything in
scope:

```rust
pub use crate::config::{Config, CvpSolver, ReductionMode};
```

## See also

- [Tutorials → Use as a library](/tutorials/use-as-library/)
- [Stage 6: Smoothness verification](/docs/stage-6-smoothness-verification/)
- [Stage 7: Factor extraction](/docs/stage-7-factor-extraction/)
- [`cargo doc --open`](https://doc.rust-lang.org/cargo/commands/cargo-doc.html)
  for the full rustdoc surface (also published to
  [docs.rs/tensift-algebra](https://docs.rs/tensift-algebra))