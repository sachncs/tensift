---
layout: docs
title: Algorithm overview
section: Concepts
subtitle: How the 7-stage pipeline turns a semiprime into two factors.
github_path: concepts/algorithm-overview.md
---

# Algorithm overview

This page is the high-level map. It assumes you've seen the
[Quick tour](/tutorials/quick-tour/) and want to know what's going on under the
hood. Each stage has its own detailed page; this overview explains how they
fit together.

## What tensift solves

**Integer factorization.**  Given a semiprime $N = p \times q$ (the product
of exactly two primes), find $p$ and $q$.

The classical hardness of this problem underlies RSA. tensift does **not**
break RSA at scale — it is a research implementation of a heuristic algorithm
that works on inputs up to about 60-64 bits.

## The pipeline at a glance

```
   N = p × q
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Stage 1: Lattice construction                                 │
│   Build a Schnorr lattice B that encodes N as a CVP instance.│
│   B has dimension n+1 × n; target vector t encodes ln N.     │
└──────────────────────────────────────────────────────────────┘
       │       │
       ▼       ▼
┌──────────────────────────────────────────────────────────────┐
│ Stage 2: Basis reduction                                      │
│   Run LLL or BKZ to shorten the basis vectors.               │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Stage 3: CVP baseline                                         │
│   Babai rounding or Klein sampling to find an approximate    │
│   closest lattice point to the target t.                     │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Stage 4: Tensor-network ansatz                                │
│   Turn the CVP residual r = t - b_cl into an Ising-like      │
│   Hamiltonian H(z) over n binary variables z ∈ {0, 1}^n.     │
│   Build a Tree Tensor Network (TTN) over H.                  │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Stage 5: Optimization & sampling                              │
│   Run TTN sweeps + OPES + MPO spectral amplification to find  │
│   low-energy bit-string configurations z* that improve CVP.  │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Stage 6: Smoothness verification                              │
│   Each candidate (u, w) with w = u - v·N is checked: both u  │
│   and w must factor completely over a factor base of π₂     │
│   small primes.                                              │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ Stage 7: Factor extraction                                    │
│   Assemble exponent vectors over GF(2); find a kernel vector. │
│   Use it to build X² ≡ Y² (mod N) and recover gcd(X ± Y, N). │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
   (p, q)
```

## Why a lattice?

Schnorr's insight: the right lattice turns factorization into **finding short
lattice vectors**, which is equivalent to finding **smooth relations**. A
smooth relation is a pair $(u, w)$ with $w = u - v \cdot N$ such that both $u$
and $w$ factor completely over a small factor base of primes. Once you have
enough smooth relations, linear algebra over GF(2) gives you $X^2 \equiv Y^2
\pmod{N}$ and $\gcd(X \pm Y, N)$ is a factor.

The lattice doesn't help you find the relations directly. It gives you a
geometric structure where approximations to a *closest vector* (CVP)
correspond to candidates that are *more likely* to be smooth.

## Why a tensor network?

After CVP, you have an approximate closest vector and a residual $r = t -
b_{\text{cl}}$. Each direction in the reduced basis either helps or hurts the
approximation. Choosing which directions to add — and with what sign — is a
combinatorial search problem over $2^n$ configurations.

A tree tensor network (TTN) provides a compact representation of a
probability distribution over those $2^n$ configurations. OPES and MPO
spectral amplification are then used to find configurations with low
"Hamiltonian" energy $H(z) = \| r - \sum_j \kappa_j z_j d_j \|^2$.

In other words: the tensor network replaces a brute-force enumeration of
$2^n$ candidates with a structured search that scales polynomially in $n$.

## Where things can go wrong

The pipeline is **heuristic**. The guarantees are:

- **Correctness:**  if the pipeline returns `Ok((p, q))`, then $p \times q = N$
  (the CLI verifies this in a final assertion).
- **Completeness:**  there is no guarantee that the pipeline will find the
  factors in the configured budget. If `max_cvp` runs out without enough
  smooth relations, `factorize` returns an `InsufficientSmoothRelations`
  error.

What can go wrong:

- The factor base is too small for `N` → increase `pi_2`.
- The lattice basis is too skewed after LLL → switch to `Bkz { progressive }`.
- The TTN sampler misses a low-energy basin → increase `gamma` and/or
  `ttn_bond_dim`.
- The factor base is fine but the relation matrix has low rank → increase
  `combination_trials`.

These are the levers you can pull at the `Config` level.

## Where the code lives

| Stage | Crate / module | Public entry |
|---|---|---|
| 1: Lattice | `tensift-lattice::lattice` | `SchnorrLattice::new` |
| 2: Reduction | `tensift-lattice::babai`, `tensift-lattice::segment_lll`, `tensift-lattice::bkz` | `reduce_basis_lll`, `bkz_reduce`, `progressive_bkz_reduce` |
| 3: CVP | `tensift-lattice::babai` | `babai_rounding`, `klein_sampling`, `hybrid_cvp_solver` |
| 4: Tensor network | `tensift-tensor::ttn`, `tensift-tensor::hamiltonian` | `TreeTensorNetwork::new_with_config`, `CvpHamiltonian` |
| 5: Sampling | `tensift-tensor::classical_sampler`, `tensift-tensor::opes` | `sample_low_energy`, `sample_amplified_mpo` |
| 6: Smoothness | `tensift-algebra::smoothness` | `SmoothnessBasis`, `try_build_sr_pair` |
| 7: Extraction | `tensift-algebra::factor`, `tensift-algebra::gf2_solver` | `factorize` (top-level) |

The top-level `factorize` function in `tensift-algebra::factor` wires them
together and returns a `FactorResult`.

## See also

- [Concepts → Why lattice + tensor network?](/concepts/why-lattice-tensor-network/)
- [Concepts → Limitations](/concepts/limitations/)
- [Concepts → Glossary](/concepts/glossary/)
- [Stage 1](/docs/stage-1-lattice-construction/) through
  [Stage 7](/docs/stage-7-factor-extraction/) for the per-stage deep dives.