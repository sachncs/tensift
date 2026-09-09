---
layout: docs
title: tensift-core
section: API reference
subtitle: Foundation types, errors, constants, and prime generation.
github_path: api/tensift-core.md
---

# tensift-core

`tensift-core` is the foundation crate. It owns:

- The `Error` enum and `Result<T>` alias.
- Numerical constants.
- Prime generation.
- The `index_slicing` module (parallel candidate evaluation partitioning).
- Small floating-point and integer helpers.

```toml
[dependencies]
tensift-core = "0.1"
```

You almost never depend on this directly. The other four crates re-export
the bits you need.

## `Error`

```rust
pub enum Error {
    InvalidParameter(String),
    Gf2Solver(String),
    InsufficientSmoothRelations { needed: usize, found: usize },
    NumericalOverflow(String),
    InvalidState(String),
}
```

All errors implement `std::error::Error` via `thiserror`. Variants:

- `InvalidParameter` — bad `Config` or input.
- `Gf2Solver` — failure inside the GF(2) kernel solver.
- `InsufficientSmoothRelations { needed, found }` — the pipeline ran out of
  CVP budget before finding enough smooth relations. Tweak
  `Config::max_cvp` or `Config::gamma` and try again.
- `NumericalOverflow` — a numeric value exceeded its target type's range.
- `InvalidState` — internal invariant violation.

`Error` implements `From<String>` and `From<&str>` for ergonomic `?`
usage with ad-hoc messages.

## `Result`

```rust
pub type Result<T> = core::result::Result<T, Error>;
```

Standard alias for fallible operations throughout the workspace.

## `constants` (re-exported as `consts`)

```rust
pub mod constants {
    pub const EPSILON: f64 = 1e-12;
}
```

The default epsilon for `f64` comparisons. The alias `tensift_core::consts`
is provided for backward compatibility.

## `primes` module

### `first_n_primes`

```rust
pub fn first_n_primes(n: usize) -> Vec<u64>
```

Return the first $n$ primes as a `Vec<u64>`. Used by `SchnorrLattice::new`
to build the factor base.

The implementation uses a segmented sieve. The bench in
`crates/tensift-core/benches/primes.rs` covers $n$ up to $10^4$.

## `index_slicing` module

### `SliceConfig`

```rust
pub struct SliceConfig {
    pub num_slices: usize,
    pub min_configs_per_slice: usize,
    pub seed: u64,
}
```

Configuration for parallel candidate evaluation. The total candidate budget
is roughly `num_slices * min_configs_per_slice`. Constructed by
`Config::slice_config()`.

### `bits_to_index`

```rust
pub fn bits_to_index(bits: &[bool]) -> usize
```

Interpret a `&[bool]` as a binary integer (LSB-first). Used to convert
configurations to array indices for parallel aggregation.

### `index_to_bits`

```rust
pub fn index_to_bits(index: usize, n: usize) -> Vec<bool>
```

Inverse of `bits_to_index`.

## `utils` module

### `approx_eq`

```rust
pub fn approx_eq(a: f64, b: f64) -> bool
```

`(a - b).abs() < EPSILON`.

### `safe_round_to_i64`

```rust
pub fn safe_round_to_i64(x: f64) -> i64
```

Round `x` to the nearest `i64`, saturating on `NaN`, `inf`, or values that
exceed `i64::MAX/MIN`. Used by the lattice and Babai stages.

### `log2_ceil`

```rust
pub fn log2_ceil(n: usize) -> usize
```

Smallest $k$ such that $2^k \ge n$. Returns 0 for $n \le 1$.

## See also

- [docs.rs/tensift-core](https://docs.rs/tensift-core)
- [API reference → crate map](/api/crate-map/)