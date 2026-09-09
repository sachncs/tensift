---
layout: docs
title: tensift-lattice
section: API reference
subtitle: Lattice construction, basis reduction, and CVP approximation.
github_path: api/tensift-lattice.md
---

# tensift-lattice

`tensift-lattice` owns **stages 1 through 3** of the pipeline:

- **Stage 1: Lattice construction** — the Schnorr lattice that encodes the
  semiprime as a CVP instance.
- **Stage 2: Basis reduction** — LLL, Segment LLL, and BKZ.
- **Stage 3: CVP baseline** — Babai rounding, Klein sampling, hybrid solver.

```toml
[dependencies]
tensift-lattice = "0.1"
```

Most users should not need to depend on this crate directly — `tensift-algebra`
re-exports the top-level `factorize` that drives all three stages.

## Modules

| Module | Owns |
|---|---|
| `lattice` | `SchnorrLattice` construction |
| `babai` | LLL reduction, Gram-Schmidt, Babai, Klein |
| `bkz` | BKZ reduction with optional progressive scheduling |
| `segment_lll` | Segment-LLL variant for streaming reduction |
| `pruning` | Pruning strategies for BKZ enumeration |

## `SchnorrLattice`

```rust
pub struct SchnorrLattice {
    pub basis: Matrix<BigVector>,
    pub target: Vec<i64>,
    pub primes: Vec<u64>,
    pub diagonal_weights: Vec<i64>,
    pub scaling_param: f64,
    pub dimension: usize,
    pub last_row_values: Vec<i64>,
}
```

A Schnorr lattice basis together with its target vector. Construct with
`SchnorrLattice::new`.

### `SchnorrLattice::new`

```rust
pub fn new<R: Rng>(
    dimension: usize,
    semiprime: &Integer,
    scaling_param: f64,
    rng: &mut R,
) -> Self
```

Build a fresh Schnorr lattice for the given semiprime `N` and lattice
dimension. The `scaling_param` is the precision parameter `c` from the
construction; values in `0.5 .. 2.0` are typical.

**Panics** in debug mode if `dimension < 2` or `scaling_param <= 0`.

### `SchnorrLattice::verify_invariants`

```rust
pub fn verify_invariants(&self) -> bool
```

Re-check the lattice's structural invariants. Returns `true` if everything
is consistent. Useful in tests.

## `babai` module

### `reduce_basis_lll`

```rust
pub fn reduce_basis_lll(basis: &mut Matrix<BigVector>)
```

LLL-reduce a basis in place. Uses Modified Gram-Schmidt under the hood.

### `compute_gram_schmidt`

```rust
pub fn compute_gram_schmidt(basis: &Matrix<BigVector>) -> GsoData
```

Compute Modified Gram-Schmidt orthogonalization data. The returned `GsoData`
holds the orthogonal vectors, the $\mu_{i,j}$ coefficients, and the squared
norms.

### `babai_rounding`

```rust
pub fn babai_rounding(
    target: &[i64],
    gso: &GsoData,
    basis: &Matrix<BigVector>,
) -> BabaiResult
```

Babai's nearest-plane algorithm. Returns the closest lattice point and the
residual.

### `klein_sampling`

```rust
pub fn klein_sampling(
    target: &[i64],
    gso: &GsoData,
    basis: &Matrix<BigVector>,
    config: &KleinConfig,
) -> Vec<BabaiResult>
```

Klein's randomized CVP algorithm. Returns multiple candidates sampled from
the discrete-Gaussian distribution centered on the GSO projections.

### `hybrid_cvp_solver`

```rust
pub fn hybrid_cvp_solver(
    target: &[i64],
    gso: &GsoData,
    basis: &Matrix<BigVector>,
    config: &KleinConfig,
) -> BabaiResult
```

Try Babai first, then Klein; keep the best. The hybrid strategy is enabled
by `Config::cvp_solver = CvpSolver::Hybrid`.

### `KleinConfig`

```rust
pub struct KleinConfig {
    pub dimension: usize,
    pub num_samples: usize,
    pub eta: f64,
}

impl KleinConfig {
    pub fn for_dimension(n: usize) -> Self
    pub fn with_samples(mut self, samples: usize) -> Self
    pub fn with_eta(mut self, eta: f64) -> Self
}
```

Configure Klein sampling. `eta = 0.4` is the typical near-ML value
($1 / \sqrt{2\pi}$). The `for_dimension` constructor picks a reasonable
sample count for the given lattice dimension.

## `bkz` module

### `bkz_reduce`

```rust
pub fn bkz_reduce(basis: &mut Matrix<BigVector>, config: &BKZConfig)
```

BKZ-reduce a basis. The current implementation uses limited enumeration
(single vectors and pairs) for blocks > 3 — see
[Implementation notes → BKZ enumeration](/docs/implementation-notes/#bkz-enumeration).

### `progressive_bkz_reduce`

```rust
pub fn progressive_bkz_reduce(basis: &mut Matrix<BigVector>, config: &BKZConfig)
```

BKZ reduction with progressive block-size scheduling. Starts with a small
block and grows the block size in steps. Generally gives a better basis
than a single fixed-block run at the same cost.

### `BKZConfig`

```rust
pub struct BKZConfig {
    pub blocksize: usize,
    pub max_tours: usize,
    pub prune_threshold: f64,
}
```

BKZ parameters. The defaults (`blocksize = 20`, `max_tours = 5`,
`prune_threshold = 0.99`) work for the bundled test set.

## `segment_lll` module

### `parallel_local_lll`

```rust
pub fn parallel_local_lll(basis: &mut Matrix<BigVector>, segment_size: usize)
```

Segment-LLL reduction. Processes even-indexed segments then odd-indexed
segments; the current implementation is effectively sequential, but the API
is structured so a parallel implementation can drop in without changing
callers.

## `pruning` module

Pruning-radius strategies for BKZ enumeration. Not part of the public
`factorize` path by default; exposed for tinkerers who want to experiment
with enumeration bounds.

## See also

- [Stage 1: Lattice construction](/docs/stage-1-lattice-construction/)
- [Stage 2: Basis reduction](/docs/stage-2-basis-reduction/)
- [Stage 3: CVP baseline](/docs/stage-3-cvp-baseline/)
- [Concepts → Why lattice + tensor network?](/concepts/why-lattice-tensor-network/)
- [docs.rs/tensift-lattice](https://docs.rs/tensift-lattice) for the full
  rustdoc surface