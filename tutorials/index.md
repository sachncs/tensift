---
layout: page
title: Tutorials
section: Tutorials
subtitle: Six task-oriented guides for working with tensift.
permalink: /tutorials/
---

# Tutorials

Task-oriented guides for working with tensift. Each tutorial has a
clear goal, a runnable example, and a pointer to the related
documentation.

<div class="docs-tiles" style="margin-top: 2rem;">
  <a class="docs-tile" href="{{ '/tutorials/quick-tour/' | relative_url }}">
    <div class="docs-tile-label">01 · Tour</div>
    <h3 class="docs-tile-title">Quick tour</h3>
    <p>A five-minute overview of what tensift does, end to end, with no math.</p>
  </a>
  <a class="docs-tile" href="{{ '/tutorials/factor-from-cli/' | relative_url }}">
    <div class="docs-tile-label">02 · CLI</div>
    <h3 class="docs-tile-title">Factor from the CLI</h3>
    <p>The <code>tensift</code> binary — arguments, output, seed control, exit codes.</p>
  </a>
  <a class="docs-tile" href="{{ '/tutorials/use-as-library/' | relative_url }}">
    <div class="docs-tile-label">03 · Library</div>
    <h3 class="docs-tile-title">Use as a library</h3>
    <p>Embed tensift in your own Rust crate with the <code>tensift-algebra</code> API.</p>
  </a>
  <a class="docs-tile" href="{{ '/tutorials/batch-factorization/' | relative_url }}">
    <div class="docs-tile-label">04 · Batch</div>
    <h3 class="docs-tile-title">Batch factorization</h3>
    <p>Factor many numbers in parallel with <code>rayon</code> and <code>factorize</code>.</p>
  </a>
  <a class="docs-tile" href="{{ '/tutorials/tuning-the-pipeline/' | relative_url }}">
    <div class="docs-tile-label">05 · Tuning</div>
    <h3 class="docs-tile-title">Tuning the pipeline</h3>
    <p>What to change when the defaults don't factor your number.</p>
  </a>
  <a class="docs-tile" href="{{ '/tutorials/reproducible-runs/' | relative_url }}">
    <div class="docs-tile-label">06 · Determinism</div>
    <h3 class="docs-tile-title">Reproducible runs</h3>
    <p>How the seeded RNG flows through every stage.</p>
  </a>
</div>

## By goal

<div class="role-paths">
  <div class="role-path">
    <div class="role-path-name">Run something now</div>
    <ol>
      <li><a href="{{ '/tutorials/quick-tour/' | relative_url }}">Quick tour</a></li>
      <li><a href="{{ '/tutorials/factor-from-cli/' | relative_url }}">Factor from the CLI</a></li>
    </ol>
  </div>
  <div class="role-path">
    <div class="role-path-name">Embed in Rust</div>
    <ol>
      <li><a href="{{ '/tutorials/use-as-library/' | relative_url }}">Use as a library</a></li>
      <li><a href="{{ '/tutorials/batch-factorization/' | relative_url }}">Batch factorization</a></li>
    </ol>
  </div>
  <div class="role-path">
    <div class="role-path-name">Tune performance</div>
    <ol>
      <li><a href="{{ '/tutorials/tuning-the-pipeline/' | relative_url }}">Tuning the pipeline</a></li>
      <li><a href="{{ '/tutorials/reproducible-runs/' | relative_url }}">Reproducible runs</a></li>
    </ol>
  </div>
</div>