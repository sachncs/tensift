---
layout: page
title: Concepts
section: Concepts
subtitle: "The big picture: the algorithm, why it works, and where it stops."
permalink: /concepts/
---

# Concepts

Concept-level documentation for the algorithm and the engineering
tradeoffs. For stage-by-stage implementation details, see
[Stage docs](/docs/stage-1-lattice-construction/).

<div class="docs-tiles" style="margin-top: 2rem;">
  <a class="docs-tile" href="{{ '/concepts/algorithm-overview/' | relative_url }}">
    <div class="docs-tile-label">01 · Map</div>
    <h3 class="docs-tile-title">Algorithm overview</h3>
    <p>The big picture: the 7-stage pipeline and how the pieces fit together.</p>
  </a>
  <a class="docs-tile" href="{{ '/concepts/why-lattice-tensor-network/' | relative_url }}">
    <div class="docs-tile-label">02 · Why</div>
    <h3 class="docs-tile-title">Why lattice + tensor network?</h3>
    <p>The math motivation for combining Schnorr's lattice with a tree tensor network.</p>
  </a>
  <a class="docs-tile" href="{{ '/concepts/limitations/' | relative_url }}">
    <div class="docs-tile-label">03 · Limits</div>
    <h3 class="docs-tile-title">Limitations</h3>
    <p>Where tensift is bounded, and what it cannot do.</p>
  </a>
  <a class="docs-tile" href="{{ '/concepts/glossary/' | relative_url }}">
    <div class="docs-tile-label">04 · Terms</div>
    <h3 class="docs-tile-title">Glossary</h3>
    <p>Terms used in the docs and code: Babai, BKZ, CVP, OPES, TTN, …</p>
  </a>
</div>

## Reading order

1. **Algorithm overview** for the pipeline map and why each stage exists.
2. **Why lattice + tensor network?** for the math motivation.
3. **Limitations** before you benchmark — the heuristics have known bounds.
4. **Glossary** as a reference while you read.