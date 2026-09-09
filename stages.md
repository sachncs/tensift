---
layout: page
title: Stage docs
section: Stage docs
subtitle: One page per stage. Mathematics, code shape, edge cases.
permalink: /stages/
---

# Stage docs

One page per stage of the pipeline. Each page covers the mathematical
framing, the code shape, the edge cases, and the known simplifications
in the implementation.

<div class="docs-tiles" style="margin-top: 2rem;">
  <a class="docs-tile" href="{{ '/docs/stage-1-lattice-construction/' | relative_url }}">
    <div class="docs-tile-label">01 · Lattice</div>
    <h3 class="docs-tile-title">Lattice construction</h3>
    <p>Build a Schnorr lattice that encodes the semiprime as a CVP instance.</p>
  </a>
  <a class="docs-tile" href="{{ '/docs/stage-2-basis-reduction/' | relative_url }}">
    <div class="docs-tile-label">02 · Reduce</div>
    <h3 class="docs-tile-title">Basis reduction</h3>
    <p>LLL, Segment LLL, BKZ with progressive scheduling, and pruning.</p>
  </a>
  <a class="docs-tile" href="{{ '/docs/stage-3-cvp-baseline/' | relative_url }}">
    <div class="docs-tile-label">03 · CVP</div>
    <h3 class="docs-tile-title">CVP baseline</h3>
    <p>Babai rounding and Klein sampling for closest-vector approximation.</p>
  </a>
  <a class="docs-tile" href="{{ '/docs/stage-4-tensor-network/' | relative_url }}">
    <div class="docs-tile-label">04 · Tensor</div>
    <h3 class="docs-tile-title">Tensor network ansatz</h3>
    <p>TTN, belief-propagation gauging, and adaptive-weighted topology.</p>
  </a>
  <a class="docs-tile" href="{{ '/docs/stage-5-optimization-sampling/' | relative_url }}">
    <div class="docs-tile-label">05 · Sample</div>
    <h3 class="docs-tile-title">Optimisation &amp; sampling</h3>
    <p>OPES, MPO spectral amplification, and fallback samplers.</p>
  </a>
  <a class="docs-tile" href="{{ '/docs/stage-6-smoothness-verification/' | relative_url }}">
    <div class="docs-tile-label">06 · Smooth</div>
    <h3 class="docs-tile-title">Smoothness verification</h3>
    <p>Trial division over the factor base, sr-pair construction, validation.</p>
  </a>
  <a class="docs-tile" href="{{ '/docs/stage-7-factor-extraction/' | relative_url }}">
    <div class="docs-tile-label">07 · Extract</div>
    <h3 class="docs-tile-title">Factor extraction</h3>
    <p>GF(2) linear algebra, kernel basis, and GCD-based factor recovery.</p>
  </a>
  <a class="docs-tile" href="{{ '/docs/implementation-notes/' | relative_url }}">
    <div class="docs-tile-label">Reference</div>
    <h3 class="docs-tile-title">Implementation notes</h3>
    <p>Known simplifications, limitations, and design tradeoffs.</p>
  </a>
</div>

## Reading order

Read the stage docs in order if you want to follow the algorithm.
Jump to specific stages if you already know the algorithm and want to
understand a particular implementation choice.