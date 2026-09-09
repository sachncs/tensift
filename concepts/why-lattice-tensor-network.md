---
layout: docs
title: Why lattice + tensor network?
section: Concepts
subtitle: The math motivation for combining Schnorr's lattice with a tree tensor network.
github_path: concepts/why-lattice-tensor-network.md
---

# Why lattice + tensor network?

This page explains, in one place, why tensift combines a Schnorr-style lattice
construction with a tree tensor network variational sampler. It is meant for
readers who already know what a lattice is and what a tensor network is, and
want to understand the *combination*.

## Two problems, one pipeline

After CVP you have an approximate closest vector $b_{\text{cl}}$ and a
residual $r = t - b_{\text{cl}}$. A useful next step is to **search the space
of basis-vector combinations** for one that brings the lattice point closer to
the target. Each combination $z \in \{0, 1\}^n$ yields a candidate
lattice point:

$$
b_z = b_{\text{cl}} + \sum_j \kappa_j z_j d_j
$$

where $d_j$ are the reduced basis vectors and $\kappa_j \in \{-1, 0, +1\}$ is
the rounding-correction sign. The quality of $b_z$ is measured by

$$
H(z) = \| r - \sum_j \kappa_j z_j d_j \|^2.
$$

You want $\arg\min_z H(z)$.

That's a combinatorial search over $2^n$ configurations — intractable by
brute force once $n$ is more than ~25. The tensor network is what makes the
search feasible.

## What the tensor network buys you

A tree tensor network (TTN) over $n$ binary variables can represent
arbitrary distributions on $\{0, 1\}^n$ — at the cost of memory exponential
in the bond dimension. The pipeline:

1. Builds a TTN whose bond structure mirrors the Hamiltonian's coupling
   pattern (strongly coupled qubits get grouped early in the tree).
2. Initializes leaf tensors randomly and refines them with variational
   sweeps that minimize the expected energy.
3. Samples low-energy configurations from the resulting distribution, using
   OPES to avoid resampling and an MPO power iteration to amplify the
   ground-state component.

The TTN replaces a brute-force enumeration with a structured search whose
cost is polynomial in $n$ (for fixed bond dimension).

## What the lattice buys you

Without the lattice, you'd have to find smooth relations by trial: pick
random $(u, v)$ pairs, compute $w = u - v N$, and check smoothness. The
proportion of smooth pairs shrinks exponentially in the size of the factor
base, so this is hopeless for any nontrivial input.

The lattice concentrates probability mass on candidates that are *more likely*
to be smooth. Approximating CVP gives you a baseline candidate; the
tensor-network search then refines around it. Together, they raise the
smooth-relation probability enough that the pipeline finds enough relations
in the configured budget.

## What this approach is *not*

It is **not** Shor's algorithm. There is no quantum subroutine, no period
finding, no polynomial-time guarantee. For classical factorization, the
Number Field Sieve still holds the asymptotic record at $L_N[1/3, c]$.

It is also **not** a production cryptanalysis tool. The implementation has a
hard ceiling around 60-64 bits with default settings, and BKZ enumeration is
limited to small blocks. See [Concepts → Limitations](/concepts/limitations/)
for the full list.

## Where this lives in the codebase

- Lattice: `tensift_lattice::lattice::SchnorrLattice`
- Lattice reduction: `tensift_lattice::{babai, bkz, segment_lll}`
- Hamiltonian: `tensift_tensor::hamiltonian::CvpHamiltonian`
- TTN: `tensift_tensor::ttn::TreeTensorNetwork`
- Samplers: `tensift_tensor::{classical_sampler, opes}`
- Smoothness + extraction: `tensift_algebra::{smoothness, factor, gf2_solver}`

The top-level entry point is `tensift_algebra::factor::factorize`. See
[API reference → tensift-algebra](/api/tensift-algebra/) for the full type
list.

## See also

- [Concepts → Algorithm overview](/concepts/algorithm-overview/) for the
  step-by-step pipeline map
- [Stage 4: Tensor network ansatz](/docs/stage-4-tensor-network/) for the
  TTN construction details
- [Implementation notes](/docs/implementation-notes/) for where the code
  departs from the paper