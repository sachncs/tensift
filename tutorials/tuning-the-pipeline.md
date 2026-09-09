---
layout: docs
title: Tuning the pipeline
section: Tutorials
subtitle: What to change when the defaults don't factor your number.
github_path: tutorials/tuning-the-pipeline.md
---

# Tuning the pipeline

This page collects practical advice on how to pick `Config` values when the
defaults don't factor your input. The defaults are tuned for inputs up to ~30
bits; above that, you usually need to bump a few parameters.

## When does the default fail?

The most common failure mode is `"insufficient smooth relations: needed X,
found Y"`. This means the pipeline ran the configured budget of CVP instances
and TTN sweeps, but did not find enough smooth relations over the factor
base. Three levers help:

| Lever | Field | Effect |
|---|---|---|
| More CVP attempts | `max_cvp` | Try more lattice-sampled candidates per bit-string. |
| Larger factor base | `pi_2` | More primes in the smoothness basis; relations become more likely. |
| More samples per CVP | `gamma` | More candidates per CVP instance. |

There is also a higher-level lever: switch the CVP solver.

## Switching the CVP solver

`Config::cvp_solver` accepts three values:

| Solver | Behaviour | When to use |
|---|---|---|
| `CvpSolver::Deterministic` | Babai nearest-plane rounding. | Cheap, deterministic. Often sufficient for ≤ 20 bits. |
| `CvpSolver::Klein` | Discrete-Gaussian sampling. | Better quality, slower. Useful for larger lattices. |
| `CvpSolver::Hybrid` | Try Babai first, then Klein; keep the best. | Default for large semiprimes. |

```rust
use tensift_algebra::config::{Config, CvpSolver};

let mut config = Config::default_for_bits(bits);
config.cvp_solver = CvpSolver::Hybrid;
```

The Klein solver also exposes `klein_num_samples` and `klein_eta`:

```rust
config.klein_num_samples = 20;   // more samples = better quality, slower
config.klein_eta = 0.4;          // typical near-ML value (1 / sqrt(2π))
```

## Switching the reduction strategy

`Config::reduce_mode` accepts:

| Strategy | Behaviour | When to use |
|---|---|---|
| `ReductionMode::Lll` | LLL reduction. | Fast, adequate for small semiprimes. |
| `ReductionMode::Bkz { progressive }` | BKZ reduction, optionally with progressive scheduling. | Use for `n ≥ 12` or when LLL leaves the basis too skewed. |

For BKZ, `bkz_blocksize` controls the block size (larger blocks are slower
but yield a better basis). The current BKZ implementation performs limited
enumeration for blocks > 3, so quality improvements plateau; see the
[implementation notes](/docs/implementation-notes/#bkz-enumeration).

```rust
use tensift_algebra::config::{Config, ReductionMode};

let mut config = Config::default_for_bits(bits);
config.reduce_mode = ReductionMode::Bkz { progressive: true };
config.bkz_blocksize = 20;
```

## TTN bond dimension

`tensift_tensor::ttn::TreeTensorNetwork` is initialized with `ttn_bond_dim`.
Higher bond dimension means more expressive variational states at the cost of
more arithmetic per sweep:

```rust
config.ttn_bond_dim = 8;          // default is 4
```

Adaptive bond resizing is on by default and will adjust within
`[adaptive_pid_params.min_bond, adaptive_pid_params.max_bond]` based on
observed entanglement entropy. The PID parameters come from
`PidParams::for_tnss(n)` by default.

## What to try first

For a 30-40 bit input that the defaults can't factor, try, in order:

1. Double `max_cvp` (e.g. 500 → 1000).
2. Double `pi_2` (e.g. `2 × n` → `4 × n`).
3. Switch `cvp_solver` to `Hybrid`.
4. Switch `reduce_mode` to `Bkz { progressive: true }` with `bkz_blocksize = 20`.

If those don't help:

- Increase `combination_trials` (more random GF(2) combinations).
- Increase `gamma` (more candidates per CVP).
- Increase `ttn_bond_dim` to 8 or 16.

## When nothing works

The implementation has a hard ceiling around 60-64 bits with default
settings. Above that:

- The lattice dimension `n = 20` may not be enough.
- The BKZ implementation does not perform full enumeration.
- The tensor-network samplers lose accuracy at very high dimensions.

These are documented tradeoffs, not bugs; see
[Concepts → Limitations](/concepts/limitations/).

## See also

- [`Config` API reference](/api/tensift-algebra/#config)
- [Implementation notes](/docs/implementation-notes/)
- [Stage 5: Optimization & sampling](/docs/stage-5-optimization-sampling/) for
  the sampling-stage internals