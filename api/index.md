---
layout: page
title: API reference
section: API reference
subtitle: Per-crate API surfaces. The crate map is the right place to start.
permalink: /api/
---

# API reference

Type, function, and method indexes for the five workspace crates.
Start at the [Crate map](/api/crate-map/) if you want the big picture;
the per-crate pages have the full public surface.

<div class="docs-tiles" style="margin-top: 2rem;">
  <a class="docs-tile" href="{{ '/api/crate-map/' | relative_url }}">
    <div class="docs-tile-label">Map</div>
    <h3 class="docs-tile-title">Crate map</h3>
    <p>How the five workspace crates fit together, and where to look for what.</p>
  </a>
  <a class="docs-tile" href="{{ '/api/tensift-algebra/' | relative_url }}">
    <div class="docs-tile-label">Stages 6–7</div>
    <h3 class="docs-tile-title">tensift-algebra</h3>
    <p>Top-level crate: smoothness testing, factor extraction, <code>factorize</code>.</p>
  </a>
  <a class="docs-tile" href="{{ '/api/tensift-lattice/' | relative_url }}">
    <div class="docs-tile-label">Stages 1–3</div>
    <h3 class="docs-tile-title">tensift-lattice</h3>
    <p>Schnorr lattice, LLL, BKZ, Babai, Klein sampling.</p>
  </a>
  <a class="docs-tile" href="{{ '/api/tensift-tensor/' | relative_url }}">
    <div class="docs-tile-label">Stages 4–5</div>
    <h3 class="docs-tile-title">tensift-tensor</h3>
    <p>TTN ansatz, Hamiltonian, OPES, MPO amplification.</p>
  </a>
  <a class="docs-tile" href="{{ '/api/tensift-core/' | relative_url }}">
    <div class="docs-tile-label">Foundation</div>
    <h3 class="docs-tile-title">tensift-core</h3>
    <p>Errors, constants, prime generation, index slicing.</p>
  </a>
  <a class="docs-tile" href="{{ '/api/tensift-cli/' | relative_url }}">
    <div class="docs-tile-label">Binary</div>
    <h3 class="docs-tile-title">tensift-cli</h3>
    <p>The CLI binary and the re-export crate.</p>
  </a>
</div>

## Where to look for what

- **I want to factor a number from Rust.**  → [`tensift_algebra::factor::factorize`](/api/tensift-algebra/#factorize).
- **I want to build a Schnorr lattice myself.**  → [`tensift_lattice::lattice::SchnorrLattice`](/api/tensift-lattice/#schnorrlattice).
- **I want to run a custom sampler.**  → [`tensift_tensor::classical_sampler::sample_low_energy`](/api/tensift-tensor/#sample_low_energy) or [`tensift_tensor::opes::sample_amplified_mpo`](/api/tensift-tensor/#sample_amplified_mpo).
- **I want to inspect smooth relations.**  → [`tensift_algebra::smoothness::SmoothnessBasis`](/api/tensift-algebra/#smoothnessbasis).
- **I want to swap the GF(2) solver.**  → [`tensift_algebra::gf2_solver::kernel_basis`](/api/tensift-algebra/#kernel_basis).