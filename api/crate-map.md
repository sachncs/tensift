---
layout: page
title: Crate map
section: API reference
subtitle: How the five workspace crates fit together, and where to look for what.
permalink: /api/crate-map/
---

# Crate map

tensift is a Cargo workspace of five crates. Each one owns a stage of the
pipeline, with the boundaries drawn so that a tinkerer can swap out a
single stage without disturbing the others.

<div class="crate-grid" style="margin: 1.5rem 0 2rem;">
  <a class="crate-tile" href="{{ '/api/tensift-core/' | relative_url }}">
    <span class="crate-tile-name">tensift-core</span>
    <span class="crate-tile-role">foundation</span>
    <p>Errors, constants, prime generation, index slicing.</p>
  </a>
  <a class="crate-tile" href="{{ '/api/tensift-lattice/' | relative_url }}">
    <span class="crate-tile-name">tensift-lattice</span>
    <span class="crate-tile-role">stages 1–3</span>
    <p>Schnorr lattice, LLL/BKZ, Babai, Klein sampling.</p>
  </a>
  <a class="crate-tile" href="{{ '/api/tensift-tensor/' | relative_url }}">
    <span class="crate-tile-name">tensift-tensor</span>
    <span class="crate-tile-role">stages 4–5</span>
    <p>TTN ansatz, Hamiltonian, OPES, MPO amplification.</p>
  </a>
  <a class="crate-tile" href="{{ '/api/tensift-algebra/' | relative_url }}">
    <span class="crate-tile-name">tensift-algebra</span>
    <span class="crate-tile-role">stages 6–7</span>
    <p>Smoothness testing, GF(2) solver, <code>factorize</code>.</p>
  </a>
  <a class="crate-tile" href="{{ '/api/tensift-cli/' | relative_url }}">
    <span class="crate-tile-name">tensift-cli</span>
    <span class="crate-tile-role">binary</span>
    <p>The CLI binary and a re-export crate for downstream binaries.</p>
  </a>
</div>

## What lives where

| Crate | Responsibility | Key types |
|---|---|---|
| [`tensift-core`](/api/tensift-core/) | Errors, constants, prime generation, index slicing | `Error`, `primes::first_n_primes`, `index_slicing::SliceConfig` |
| [`tensift-lattice`](/api/tensift-lattice/) | Stages 1-3: lattice construction, basis reduction, CVP | `SchnorrLattice`, `reduce_basis_lll`, `babai_rounding`, `klein_sampling` |
| [`tensift-tensor`](/api/tensift-tensor/) | Stages 4-5: Hamiltonian, tensor network, sampling | `CvpHamiltonian`, `TreeTensorNetwork`, `sample_low_energy` |
| [`tensift-algebra`](/api/tensift-algebra/) | Stages 6-7: smoothness testing, GF(2) extraction, top-level pipeline | `SmoothnessBasis`, `Config`, `factorize` |
| [`tensift-cli`](/api/tensift-cli/) | Command-line interface and example binaries | the `tensift` binary |

## Where to look for what

- **I want to factor a number from Rust.**  →
  [`tensift_algebra::factor::factorize`](/api/tensift-algebra/#factorize).
- **I want to build a Schnorr lattice myself.**  →
  [`tensift_lattice::lattice::SchnorrLattice`](/api/tensift-lattice/#schnorrlattice).
- **I want to run a custom sampler.**  →
  [`tensift_tensor::classical_sampler::sample_low_energy`](/api/tensift-tensor/#sample_low_energy)
  or [`tensift_tensor::opes::sample_amplified_mpo`](/api/tensift-tensor/#sample_amplified_mpo).
- **I want to inspect the smooth relations.**  →
  [`tensift_algebra::smoothness::SmoothnessBasis`](/api/tensift-algebra/#smoothnessbasis)
  and [`tensift_algebra::smoothness::try_build_sr_pair`](/api/tensift-algebra/#try_build_sr_pair).
- **I want to swap the GF(2) solver for my own.**  →
  [`tensift_algebra::gf2_solver::kernel_basis`](/api/tensift-algebra/#kernel-basis).

## Feature flags

None of the crates currently expose feature flags. The dependencies are pinned
at the workspace level.

## MSRV

All five crates share the workspace `rust-version = "1.88"`, which means the
crate metadata advertises Rust 1.88 as the minimum supported version. Any
newer stable toolchain is also supported.

## Cross-crate re-exports

`tensift-cli` re-exports everything from the four other crates, so a single
`use tensift_cli::*;` brings the whole surface into scope. The library
equivalent of the CLI is documented in
[Tutorials → Use as a library](/tutorials/use-as-library/).

## See also

- [API reference → tensift-algebra](/api/tensift-algebra/)
- [API reference → tensift-lattice](/api/tensift-lattice/)
- [API reference → tensift-tensor](/api/tensift-tensor/)
- [API reference → tensift-core](/api/tensift-core/)
- [API reference → tensift-cli](/api/tensift-cli/)