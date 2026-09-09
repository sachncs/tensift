---
layout: docs
title: tensift-tensor
section: API reference
subtitle: Tensor network, Hamiltonian encoding, and samplers for stages 4 and 5.
github_path: api/tensift-tensor.md
---

# tensift-tensor

`tensift-tensor` owns **stages 4 and 5** of the pipeline:

- **Stage 4: Tensor network ansatz** — encode the CVP residual as a
  spin-glass Hamiltonian, then build a Tree Tensor Network (TTN) over it.
- **Stage 5: Optimization & sampling** — classical samplers, OPES, and MPO
  spectral amplification to find low-energy configurations.

```toml
[dependencies]
tensift-tensor = "0.1"
```

## Modules

| Module | Owns |
|---|---|
| `hamiltonian` | `CvpHamiltonian` — the spin-glass energy function over CVP residual corrections |
| `ttn` | `TreeTensorNetwork` — the binary TTN variational ansatz |
| `classical_sampler` | Exact enumeration, greedy local search, simulated annealing |
| `opes` | OPES sampling, MPO-MPO contraction, spectral amplification |
| `adaptive_bond` | Adaptive bond-dimension resizing with a PID controller |

## `hamiltonian` module

### `CvpHamiltonian`

```rust
pub struct CvpHamiltonian { /* ... */ }
```

Encodes the CVP residual as a spin-glass energy function over binary
variables $z \in \{0, 1\}^n$. The energy is

$$
H(z) = \| r - \sum_j \kappa_j z_j d_j \|^2
$$

where $r$ is the residual, $d_j$ are reduced basis vectors, and $\kappa_j
\in \{-1, 0, +1\}$ is the rounding-correction sign for the $j$-th basis
vector.

### Construction

`CvpHamiltonian` is built by the `factorize` pipeline from a reduced basis
and a Babai/Klein solution. There is no public constructor — it's an
internal type whose state is set up by the pipeline. If you need to build
one yourself (for example, to plug in your own sampler), use the helpers in
this module or the test fixtures in `crates/tensift-tensor/src/hamiltonian.rs`.

### Methods

- `n_vars(&self) -> usize` — number of binary variables (= `n`).
- `energy(&self, bits: &[bool]) -> f64` — evaluate $H(z)$ for a single
  configuration. Returns `f64`.
- `compute_flip_delta(&self, bits: &[bool], j: usize) -> f64` — $O(1)$
  energy-difference computation for flipping spin $j$. Used by the
  classical samplers.

## `ttn` module

### `TreeTensorNetwork`

```rust
pub struct TreeTensorNetwork { /* ... */ }
```

A binary tree tensor network over $n$ qubits. Supports bottom-up contraction
for amplitude evaluation, BP gauging, adaptive-weighted topology, and
variational sweeps.

### `TreeTensorNetwork::new_with_config`

```rust
pub fn new_with_config<R: Rng>(
    n_qubits: usize,
    config: &TTNConfig,
    rng: &mut R,
) -> Result<Self>
```

Build a new TTN. The returned network has random leaf tensors and a
default topology; call `sweep` or `sweep_adaptive` to refine the
parameters.

Errors: `Error::InvalidParameter` if `n_qubits < 1`.

### `TreeTensorNetwork::new_random`

```rust
pub fn new_random<R: Rng>(n_qubits: usize, bond_dim: usize, rng: &mut R) -> Self
```

Convenience constructor with a fixed initial bond dimension.

### Methods

- `amplitude(&self, bits: &[bool]) -> f64` — compute $|\psi(z)|^2$ by
  contracting the network bottom-up.
- `probability(&self, bits: &[bool]) -> f64` — normalized probability.
- `probabilities_parallel<R: Rng>(&self, rng: &mut R) -> Vec<(Vec<bool>, f64)>`
  — Monte-Carlo sample from the network.
- `sweep(&mut self, hamiltonian: &dyn Fn(&[bool]) -> f64, learning_rate: f64)`
  — one variational sweep with finite-difference gradients.
- `sweep_adaptive(&mut self, hamiltonian: &dyn Fn(&[bool]) -> f64, learning_rate: f64)`
  — sweep with adaptive bond resizing enabled.
- `enable_adaptive_bonds(&mut self, params: PidParams)` — turn on adaptive
  bond resizing with the given PID parameters.

### `TTNConfig`

```rust
pub struct TTNConfig {
    pub initial_bond_dim: usize,
    pub max_bond_dim: usize,
    pub min_bond_dim: usize,
    pub enable_adaptive: bool,
    pub pid_params: PidParams,
    pub enable_slicing: bool,
    pub slice_config: SliceConfig,
    pub svd_threshold: f64,
}
```

Tuning parameters for the TTN. The default `Config::ttn_config()` returns
a `TTNConfig` that respects the workspace settings.

## `classical_sampler` module

### `sample_low_energy`

```rust
pub fn sample_low_energy<R: Rng>(
    hamiltonian: &CvpHamiltonian,
    config: &ClassicalSamplerConfig,
    rng: &mut R,
) -> Vec<(Vec<bool>, f64)>
```

Run the combined classical sampler (exact enumeration when $n \le 20$,
greedy local search with random restarts, simulated annealing) and return
the top `num_samples` lowest-energy configurations.

### `ClassicalSamplerConfig`

```rust
pub struct ClassicalSamplerConfig {
    pub greedy_restarts: usize,     // default 10
    pub annealing_runs: usize,      // default 5
    pub annealing_steps: usize,     // default 10_000
    pub t_initial: f64,             // default 10.0
    pub t_final: f64,               // default 0.01
    pub num_samples: usize,         // default 50
    pub use_exact: bool,            // default true
}
```

## `opes` module

### `OpesSampler`

A sampler that uses partial tensor-network contractions and exact
cumulative bounds to draw without replacement. Toggled by
`Config::use_ttn_sampler = true` (the default).

### `sample_amplified_mpo`

```rust
pub fn sample_amplified_mpo<R: Rng>(
    hamiltonian: &CvpHamiltonian,
    num_samples: usize,
    amplification_power: usize,
    rng: &mut R,
) -> Vec<(Vec<bool>, f64)>
```

Sample from the MPO power-iteration-amplified distribution. Power iteration
amplifies the ground-state component of the Hamiltonian; the resulting
distribution is then sampled.

### `MatrixProductOperator`

```rust
pub struct MatrixProductOperator { /* ... */ }
```

An MPO representation of the CVP Hamiltonian. Used internally for spectral
amplification; constructed by `MatrixProductOperator::from_hamiltonian`.

### `AmplificationConfig`

```rust
pub struct AmplificationConfig {
    pub power: usize,                 // default 8
    pub max_bond_dim: usize,          // default MAX_MPO_BOND_DIM
    pub svd_threshold: f64,           // default 1e-12
    pub progressive: bool,            // default true
}
```

## `adaptive_bond` module

### `PidParams`

```rust
pub struct PidParams { /* ... */ }
```

Parameters for the PID controller that drives adaptive bond resizing. Use
`PidParams::for_tnss(n)` for sensible defaults.

## See also

- [Stage 4: Tensor network ansatz](/docs/stage-4-tensor-network/)
- [Stage 5: Optimization & sampling](/docs/stage-5-optimization-sampling/)
- [Implementation notes → Custom Power-Iteration SVD](/docs/implementation-notes/#custom-power-iteration-svd)
- [docs.rs/tensift-tensor](https://docs.rs/tensift-tensor)