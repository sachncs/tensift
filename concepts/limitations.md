---
layout: docs
title: Limitations
section: Concepts
subtitle: Where tensift is bounded, and what it cannot do.
github_path: concepts/limitations.md
---

# Limitations

tensift is a research implementation. This page lists the boundaries that
matter if you're using it to study algorithms, benchmark ideas, or extend the
codebase. The implementation notes also cover these in more detail.

## Hard ceilings

### Input size

`Config::default_for_bits(bits)` tops out at `n = 20` for `bits > 60`. Above
this, the implementation has not been tested and the heuristic parameters are
unlikely to work without manual tuning.

In practice, the pipeline reliably factors inputs up to ~30 bits with
defaults, and ~40-50 bits with the tuning described in
[Tutorials → Tuning the pipeline](/tutorials/tuning-the-pipeline/). Beyond
60 bits, no tested configuration exists in this repository.

### Bond dimension

`ttn_bond_dim` is bounded by `PidParams::for_tnss(n).max_bond`, which scales
with the lattice dimension. Higher bond dimension gives more expressive
variational states but increases sweep cost quadratically.

### BKZ block size

The bundled BKZ implementation performs **limited enumeration** for blocks
larger than 3: it tries single vectors and pairs but does not run full
branch-and-bound with pruning. For high-quality BKZ reduction, integrate a
production BKZ library.

## Heuristic components

The pipeline is heuristic. Three components are approximations:

1. **Tensor-network sampler.**  The TTN+OPES+MPO stack approximates a
   probability distribution over $2^n$ configurations. It can miss low-energy
   basins for difficult instances.
2. **Power-iteration SVD.**  `MatrixProductOperator::truncate_tensor` uses 3
   fixed iterations of power iteration on the Gram matrix, not a true SVD.
   For ill-conditioned matrices, truncation quality may degrade.
3. **MPO spectral amplification.**  The MPO is a nearest-neighbor
   identity-like structure with dummy local energy terms. It does not fully
   encode the CVP Hamiltonian coupling pattern; the amplified distribution
   does not exactly match the CVP energy landscape.

These are conscious design choices, not bugs. See
[Implementation notes → Custom Power-Iteration SVD](/docs/implementation-notes/#custom-power-iteration-svd)
and [Implementation notes → Simplified MPO Representation](/docs/implementation-notes/#simplified-mpo-representation)
for the rationale.

## What tensift is *not* for

- **Cryptanalysis.**  tensift will not help you factor RSA-sized integers.
  The implementation has no constant-factor advantages over QS / NFS for
  large inputs, and the approximations above become limiting.
- **Production cryptographic libraries.**  The release profile is
  `panic = "abort"` (see `Cargo.toml`), which means any panic in the library
  aborts the host process. Wrap calls in `std::panic::catch_unwind` if you
  need to recover from a transient error.
- **High-throughput factoring.**  No SIMD, no GPU, no carefully tuned linear
  algebra. The bundled implementations favor readability over throughput.

## Where the algorithm's asymptotic profile lives

| Algorithm | Complexity | tensift's niche |
|---|---|---|
| Trial division | $O(\sqrt{N})$ | tensift is overkill for $N < 10^{10}$. |
| Quadratic sieve | $L_N[1/2, 1]$ | Mature, widely used. |
| Number field sieve | $L_N[1/3, c]$ | State of the art for > 100 bits. |
| Shor's algorithm | $O((\log N)^3)$ | Quantum. |

tensift is **not** trying to compete asymptotically with QS or NFS. It is a
research vehicle for studying the lattice-plus-tensor-network combination on
small inputs.

## See also

- [Implementation notes](/docs/implementation-notes/) for the per-component
  tradeoffs and known simplifications
- [Concepts → Algorithm overview](/concepts/algorithm-overview/) for the
  pipeline map
- [Contributing](/contributing/) for ideas on where to push the boundaries