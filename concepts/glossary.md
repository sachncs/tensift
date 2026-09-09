---
layout: docs
title: Glossary
section: Concepts
subtitle: Terms used in the docs and code.
github_path: concepts/glossary.md
---

# Glossary

Terms in alphabetical order.

**Babai rounding** — A deterministic algorithm that, given a lattice basis and
a target vector, returns an approximately-closest lattice point. Implemented
in `tensift_lattice::babai::babai_rounding`.

**Basis reduction** — A transformation of a lattice basis that yields a
"better" basis in some sense (shorter vectors, more orthogonal). The two
algorithms used here are LLL and BKZ.

**BKZ** — Block Korkine-Zolotarev reduction. A basis-reduction algorithm that
is stronger than LLL but slower. Implemented in
`tensift_lattice::bkz`.

**Bond dimension** — The dimension of the index connecting two tensors in a
tensor network. Higher = more expressive, more expensive.

**Closest Vector Problem (CVP)** — Given a lattice $\Lambda$ and a target
vector $t$, find the lattice vector closest to $t$. CVP is the central
optimization problem the pipeline solves.

**Determinism** — The pipeline guarantees that the same `(N, Config::seed,
other Config fields)` always produce the same `(p, q)` and statistics.

**Factor base** — A set of small primes over which candidate numbers are
tested for smoothness. In tensift, the factor base is the first $\pi_2$
primes.

**GF(2)** — The field with two elements, $\{0, 1\}$, with addition as XOR.
The factor-extraction stage assembles exponent vectors over GF(2) and uses
Gaussian elimination to find a kernel vector.

**Kernel vector** — A non-zero vector $v$ in the kernel of the GF(2)
relation matrix. Multiplying out the relations according to $v$'s entries
gives $X^2 \equiv Y^2 \pmod N$, which reveals factors via GCD.

**Klein sampling** — A randomized algorithm for the CVP that replaces
deterministic rounding with discrete-Gaussian sampling. Implemented in
`tensift_lattice::babai::klein_sampling`.

**LLL** — Lenstra-Lenstra-Lovász reduction. A polynomial-time
basis-reduction algorithm. Implemented in
`tensift_lattice::{segment_lll, babai}`.

**MPO** — Matrix Product Operator. A tensor-network representation of a
linear operator; in tensift, used to represent the CVP Hamiltonian for
spectral amplification.

**OPES** — Optimal tensor-network sampling with cumulative bounds. A
sampling algorithm that avoids resampling any bit-string by maintaining exact
cumulative probability bounds. Implemented in
`tensift_tensor::opes::OpesSampler`.

**Reduction mode** — `Config::reduce_mode` selects the basis-reduction
strategy (`Lll` or `Bkz { progressive }`).

**Semiprime** — A positive integer that is the product of exactly two
primes. The class of inputs tensift is designed for.

**Smooth relation** — A pair $(u, w)$ with $w = u - v \cdot N$ such that
both $u$ and $w$ factor completely over the factor base.

**Schnorr lattice** — A specific lattice construction by C. P. Schnorr that
encodes factorization as a CVP instance. Implemented in
`tensift_lattice::lattice::SchnorrLattice`.

**Tensor network** — A factorized representation of a high-order tensor as a
network of lower-order tensors. In tensift, a binary Tree Tensor Network
(TTN) over $n$ qubits.

**TTN** — Tree Tensor Network. A specific tensor-network topology used in
tensift for the variational ansatz. Implemented in
`tensift_tensor::ttn::TreeTensorNetwork`.

**Variational ansatz** — A parameterized family of probability distributions
used to approximate the optimal one. In tensift, the TTN is the variational
ansatz for the distribution over CVP residual corrections.

## See also

- [Concepts → Algorithm overview](/concepts/algorithm-overview/) for the
  big-picture pipeline
- [Stage docs](/docs/stage-1-lattice-construction/) for per-stage deep dives
- [API reference](/api/crate-map/) for the type and function index