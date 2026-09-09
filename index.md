---
layout: default
title: tensift
description: >-
  tensift is a research-grade Rust implementation of a deterministic 7-stage
  integer-factorization pipeline. Lattice construction, basis reduction, CVP
  approximation, tensor-network sampling, smoothness verification, and
  factor extraction — wired together as a single reproducible CLI tool and
  library.
---

<!-- =====================================================================
     01 — Hero
     ===================================================================== -->

<header class="home-hero">
  <div class="home-hero-inner">
    <div>
      <span class="home-eyebrow">{{ site.brand.product_line }}</span>
      <h1 class="home-title">
        A deterministic, auditable<br>
        pipeline for <em>integer factorization</em>.
      </h1>
      <p class="home-lede">
        tensift is a Rust implementation of a seven-stage pipeline that
        combines Schnorr's lattice construction, basis reduction, CVP
        approximation, and tree-tensor-network sampling to factor
        semiprimes. Same seed, same input, same answer — every run.
      </p>

      <div class="home-actions">
        <a class="btn btn-primary btn-lg" href="{{ '/getting-started/' | relative_url }}">
          Get started
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
        <a class="btn btn-secondary btn-lg" href="{{ '/concepts/algorithm-overview/' | relative_url }}">
          Read the algorithm
        </a>
        <a class="btn btn-ghost btn-lg" href="https://github.com/{{ site.repository }}" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
          View on GitHub
        </a>
      </div>

      <dl class="home-trustline">
        <div><dt>Rust</dt><dd>MSRV {{ site.brand.msrv }}</dd></div>
        <div><dt>CLI</dt><dd><code>tensift</code> on crates.io</dd></div>
        <div><dt>Library</dt><dd>5 crates</dd></div>
        <div><dt>Tests</dt><dd>{{ site.brand.stats.unit_tests }} unit + {{ site.brand.stats.integration_tests }} integration</dd></div>
        <div><dt>Benchmarks</dt><dd>{{ site.brand.stats.benches }} Criterion harnesses</dd></div>
      </dl>
    </div>

    <div class="home-hero-art" aria-hidden="true">
      <div class="art-frame">
        <object type="image/svg+xml" data="{{ '/assets/img/hero-trace.svg' | relative_url }}" style="width: 100%; height: 100%;"></object>
      </div>
    </div>
  </div>
</header>


<!-- =====================================================================
     02 — Problem framing
     ===================================================================== -->

<section class="section">
  <div class="section-inner">
    <div class="section-grid section-grid--2">
      <div>
        <p class="section-eyebrow">The problem</p>
        <h2 class="section-title">Factorization is a search problem dressed as geometry.</h2>
        <p class="section-lede">
          Given a semiprime <em>N = p · q</em>, finding the two prime factors
          is, classically, hard. Lattice methods turn that hardness into a
          geometric problem: build a lattice where short vectors correspond
          to <em>smooth relations</em>, then approximate a closest vector.
          What survives is a search over exponentially many sign
          combinations.
        </p>
        <p class="section-lede">
          tensift handles the geometric part with classical lattice
          machinery, then uses a tree tensor network to structure the
          combinatorial search. The two pieces together make the pipeline
          tractable on small semiprimes and worth reading as a system.
        </p>
      </div>

      <div class="problem-callout">
        <h3>Why a tensor network?</h3>
        <p>
          After CVP, the remaining work is a search over <em>2<sup>n</sup></em>
          binary sign choices. A tree tensor network (TTN) represents a
          probability distribution over those choices compactly. OPES
          sampling, MPO spectral amplification, and a small PID
          controller over bond dimension do the rest.
        </p>
        <p>
          The result is a deterministic search: same seed, same input, same
          factors, with per-stage timings and a relation count you can audit.
        </p>
        <p>
          <a class="btn btn-link" href="{{ '/concepts/why-lattice-tensor-network/' | relative_url }}">Why lattice + tensor network? →</a>
        </p>
      </div>
    </div>
  </div>
</section>


<!-- =====================================================================
     03 — What tensift does
     ===================================================================== -->

<section class="section section--alt">
  <div class="section-inner">
    <p class="section-eyebrow">What it is</p>
    <h2 class="section-title">A system, not a demo.</h2>
    <p class="section-lede" style="margin-bottom: 2rem;">
      tensift is engineered as a system: a CLI for the terminal, a typed
      library for Rust, stage-by-stage documentation, reproducible
      execution, and a benchmarked implementation you can read end to end.
    </p>

    <div class="feature-grid">
      <article class="feature">
        <span class="feature-num">01 / Factorization pipeline</span>
        <h3 class="feature-title">Seven stages, one entry point</h3>
        <p>Lattice construction, basis reduction, CVP, tensor-network ansatz, sampling, smoothness, and factor extraction — all driven by a single <code>factorize</code> call.</p>
      </article>
      <article class="feature">
        <span class="feature-num">02 / CLI workflow</span>
        <h3 class="feature-title">A serious terminal tool</h3>
        <p><code>tensift &lt;N&gt;</code> for one-shot factoring, with positional arguments for every stage parameter and a bannered success report.</p>
      </article>
      <article class="feature">
        <span class="feature-num">03 / Rust library API</span>
        <h3 class="feature-title">Typed entry points</h3>
        <p>Five focused crates with clear boundaries. Drop in <code>tensift-algebra</code> for the pipeline, or <code>tensift-lattice</code> on its own.</p>
      </article>
      <article class="feature">
        <span class="feature-num">04 / Stage-based docs</span>
        <h3 class="feature-title">Read the implementation, not just the API</h3>
        <p>One page per stage. Mathematical framing, code shape, edge cases, and known simplifications — all in one place.</p>
      </article>
      <article class="feature">
        <span class="feature-num">05 / Reproducible execution</span>
        <h3 class="feature-title">Same seed, same answer</h3>
        <p>One <code>ChaCha8Rng</code> is threaded through every stage. The CLI prints a verification line: <em>p · q = N</em>.</p>
      </article>
      <article class="feature">
        <span class="feature-num">06 / Benchmarked</span>
        <h3 class="feature-title">Four Criterion harnesses</h3>
        <p>Prime generation, lattice construction, LLL reduction, classical sampler — measured, not assumed. See <a href="{{ '/docs/baseline/' | relative_url }}">baseline.md</a>.</p>
      </article>
    </div>
  </div>
</section>


<!-- =====================================================================
     04 — The 7-stage pipeline
     ===================================================================== -->

<section class="section pipeline-section">
  <div class="section-inner">
    <p class="section-eyebrow">The pipeline</p>
    <h2 class="section-title">Seven stages, one continuous trace.</h2>
    <p class="section-lede">
      Each stage has a well-defined input, a typed output, and a
      small, auditable surface. The CLI and the library both drive the
      same seven stages in the same order.
    </p>

    <div class="pipeline" role="list">
      <div class="pipeline-stage" role="listitem">
        <span class="pipeline-stage-num">01</span>
        <h3 class="pipeline-stage-title">Lattice construction</h3>
        <p class="pipeline-stage-meta">Schnorr basis</p>
        <p>Build a <em>B ∈ ℤ<sup>(n+1)×n</sup></em> whose short vectors encode smooth relations.</p>
      </div>
      <div class="pipeline-stage" role="listitem">
        <span class="pipeline-stage-num">02</span>
        <h3 class="pipeline-stage-title">Basis reduction</h3>
        <p class="pipeline-stage-meta">LLL · BKZ</p>
        <p>Shorten the basis with LLL, Segment LLL, or progressive BKZ.</p>
      </div>
      <div class="pipeline-stage" role="listitem">
        <span class="pipeline-stage-num">03</span>
        <h3 class="pipeline-stage-title">CVP baseline</h3>
        <p class="pipeline-stage-meta">Babai · Klein</p>
        <p>Approximate the closest vector with deterministic Babai or randomized Klein sampling.</p>
      </div>
      <div class="pipeline-stage" role="listitem">
        <span class="pipeline-stage-num">04</span>
        <h3 class="pipeline-stage-title">Tensor network</h3>
        <p class="pipeline-stage-meta">TTN ansatz</p>
        <p>Encode the CVP residual as an Ising-like energy and build a tree tensor network over it.</p>
      </div>
      <div class="pipeline-stage" role="listitem">
        <span class="pipeline-stage-num">05</span>
        <h3 class="pipeline-stage-title">Optimisation &amp; sampling</h3>
        <p class="pipeline-stage-meta">OPES · MPO</p>
        <p>Variational sweeps, OPES sampling, and MPO power-iteration find low-energy configurations.</p>
      </div>
      <div class="pipeline-stage" role="listitem">
        <span class="pipeline-stage-num">06</span>
        <h3 class="pipeline-stage-title">Smoothness verification</h3>
        <p class="pipeline-stage-meta">factor base</p>
        <p>Trial-divide each candidate by the first π₂ primes; collect sr-pairs.</p>
      </div>
      <div class="pipeline-stage" role="listitem">
        <span class="pipeline-stage-num">07</span>
        <h3 class="pipeline-stage-title">Factor extraction</h3>
        <p class="pipeline-stage-meta">GF(2) · GCD</p>
        <p>Assemble exponent vectors over GF(2), find a kernel vector, recover <em>p</em> and <em>q</em> by GCD.</p>
      </div>
    </div>

    <div class="pipeline-legend">
      <span><strong>Inputs:</strong> a semiprime <em>N</em> and a seeded RNG.</span>
      <span><strong>Outputs:</strong> the two factors <em>p, q</em>, with verification.</span>
      <span><strong>Stats:</strong> relations found, CVP instances tried, per-stage timings.</span>
    </div>

    <div class="pipeline-detail">
      <article class="pipeline-card">
        <div class="pipeline-card-head">
          <span class="pipeline-card-num">01</span>
          <div>
            <h3 class="pipeline-card-title">Lattice construction</h3>
            <p class="pipeline-card-meta"><code>tensift-lattice::lattice::SchnorrLattice</code></p>
          </div>
        </div>
        <p>Build a randomized Schnorr basis and target vector that encode <em>N</em> as a CVP instance.</p>
      </article>
      <article class="pipeline-card">
        <div class="pipeline-card-head">
          <span class="pipeline-card-num">02</span>
          <div>
            <h3 class="pipeline-card-title">Basis reduction</h3>
            <p class="pipeline-card-meta"><code>tensift-lattice::{babai, bkz, segment_lll}</code></p>
          </div>
        </div>
        <p>Shorten the basis with LLL, Segment LLL, or progressive BKZ, producing Gram-Schmidt data.</p>
      </article>
      <article class="pipeline-card">
        <div class="pipeline-card-head">
          <span class="pipeline-card-num">03</span>
          <div>
            <h3 class="pipeline-card-title">CVP baseline</h3>
            <p class="pipeline-card-meta"><code>tensift-lattice::babai</code></p>
          </div>
        </div>
        <p>Approximate the closest vector using Babai rounding, Klein sampling, or a hybrid.</p>
      </article>
      <article class="pipeline-card">
        <div class="pipeline-card-head">
          <span class="pipeline-card-num">04</span>
          <div>
            <h3 class="pipeline-card-title">Tensor network ansatz</h3>
            <p class="pipeline-card-meta"><code>tensift-tensor::{ttn, hamiltonian}</code></p>
          </div>
        </div>
        <p>Turn the CVP residual into a spin-glass Hamiltonian, then build a tree tensor network over it.</p>
      </article>
      <article class="pipeline-card">
        <div class="pipeline-card-head">
          <span class="pipeline-card-num">05</span>
          <div>
            <h3 class="pipeline-card-title">Optimisation &amp; sampling</h3>
            <p class="pipeline-card-meta"><code>tensift-tensor::{classical_sampler, opes}</code></p>
          </div>
        </div>
        <p>Find low-energy configurations via OPES sampling and MPO spectral amplification.</p>
      </article>
      <article class="pipeline-card">
        <div class="pipeline-card-head">
          <span class="pipeline-card-num">06</span>
          <div>
            <h3 class="pipeline-card-title">Smoothness verification</h3>
            <p class="pipeline-card-meta"><code>tensift-algebra::smoothness</code></p>
          </div>
        </div>
        <p>Trial-divide candidates over the factor base and assemble smooth-relation pairs.</p>
      </article>
      <article class="pipeline-card">
        <div class="pipeline-card-head">
          <span class="pipeline-card-num">07</span>
          <div>
            <h3 class="pipeline-card-title">Factor extraction</h3>
            <p class="pipeline-card-meta"><code>tensift-algebra::{factor, gf2_solver}</code></p>
          </div>
        </div>
        <p>GF(2) kernel basis + GCD recovery → <em>p</em> and <em>q</em>, with a final verification that <em>p · q = N</em>.</p>
      </article>
    </div>

    <p style="margin-top: 2rem;">
      <a class="btn btn-secondary" href="{{ '/concepts/algorithm-overview/' | relative_url }}">Read the algorithm overview →</a>
      <a class="btn btn-ghost" href="{{ '/docs/stage-1-lattice-construction/' | relative_url }}" style="margin-left: 0.5rem;">Start at stage 1</a>
    </p>
  </div>
</section>


<!-- =====================================================================
     05 — Proof / trust
     ===================================================================== -->

<section class="section">
  <div class="section-inner">
    <p class="section-eyebrow">Proof</p>
    <h2 class="section-title">Evidence, not marketing.</h2>
    <p class="section-lede" style="margin-bottom: 2rem;">
      Concrete numbers from the codebase. These are properties the project
      can be evaluated against, not aspirations.
    </p>

    <div class="proof-grid">
      <div class="proof-stat">
        <div class="proof-stat-num"><em>5</em></div>
        <div class="proof-stat-label">focused crates</div>
        <p>Each crate owns one stage of the pipeline. Stage boundaries are crate boundaries.</p>
      </div>
      <div class="proof-stat">
        <div class="proof-stat-num"><em>{{ site.brand.stats.unit_tests }}</em> + <em>{{ site.brand.stats.integration_tests }}</em></div>
        <div class="proof-stat-label">unit + integration tests</div>
        <p>Including determinism proptests, seed-robustness checks, and smoothness round-trips.</p>
      </div>
      <div class="proof-stat">
        <div class="proof-stat-num"><em>0</em></div>
        <div class="proof-stat-label">lines of <code>unsafe</code></div>
        <p>Strict <code>clippy -D warnings</code>, committed <code>Cargo.lock</code>, MSRV pinned in <code>rust-toolchain.toml</code>.</p>
      </div>
    </div>

    <ul class="proof-list" style="margin-top: 1.5rem;">
      <li><strong>Deterministic RNG pipeline.</strong> One <code>ChaCha8Rng::seed_from_u64(seed)</code> is threaded through every stage that needs randomness. No <code>rand::random()</code>, no <code>OsRng</code>, no environment-entropy leak.</li>
      <li><strong>Auditable verification.</strong> The CLI prints <em>Verification: p · q = N</em> after every successful run, with a non-zero exit code on any mismatch.</li>
      <li><strong>Committed <code>Cargo.lock</code>.</strong> Every build is reproducible to the dependency level.</li>
      <li><strong>MSRV pinned in <code>rust-toolchain.toml</code> and CI.</strong> A dedicated MSRV job builds on Rust {{ site.brand.msrv }}; the rest of CI uses <code>@stable</code>.</li>
      <li><strong>Strict <code>clippy -D warnings</code></strong> across <code>--all-targets --all-features</code>.</li>
      <li><strong>Two parallel CI jobs</strong> on Linux and macOS for the test and build-release gates.</li>
    </ul>

    <div class="benchmark-panel" aria-label="Indicative benchmark numbers from docs/baseline.md">
      <div class="benchmark-panel-head">
        <h3 class="benchmark-panel-title">Indicative measurements</h3>
        <span class="benchmark-panel-meta">single-threaded · Criterion quick mode</span>
      </div>
      <div class="benchmark-grid">
        <div class="benchmark-cell">
          <span class="benchmark-cell-name">first 1000 primes</span>
          <div class="benchmark-cell-bar"><div class="benchmark-cell-fill" style="width: 3%;"></div></div>
          <span class="benchmark-cell-value">11.4<span class="benchmark-cell-unit">µs</span></span>
        </div>
        <div class="benchmark-cell">
          <span class="benchmark-cell-name">lattice construction, dim 12</span>
          <div class="benchmark-cell-bar"><div class="benchmark-cell-fill" style="width: 6%;"></div></div>
          <span class="benchmark-cell-value">5.3<span class="benchmark-cell-unit">µs</span></span>
        </div>
        <div class="benchmark-cell">
          <span class="benchmark-cell-name">LLL reduction, dim 12</span>
          <div class="benchmark-cell-bar"><div class="benchmark-cell-fill" style="width: 50%;"></div></div>
          <span class="benchmark-cell-value">2.12<span class="benchmark-cell-unit">ms</span></span>
        </div>
        <div class="benchmark-cell">
          <span class="benchmark-cell-name">classical sampler</span>
          <div class="benchmark-cell-bar"><div class="benchmark-cell-fill" style="width: 22%;"></div></div>
          <span class="benchmark-cell-value">906<span class="benchmark-cell-unit">µs</span></span>
        </div>
        <div class="benchmark-cell">
          <span class="benchmark-cell-name">factor 91</span>
          <div class="benchmark-cell-bar"><div class="benchmark-cell-fill" style="width: 5%;"></div></div>
          <span class="benchmark-cell-value">191<span class="benchmark-cell-unit">µs</span></span>
        </div>
        <div class="benchmark-cell">
          <span class="benchmark-cell-name">factor 5183</span>
          <div class="benchmark-cell-bar"><div class="benchmark-cell-fill" style="width: 21%;"></div></div>
          <span class="benchmark-cell-value">908<span class="benchmark-cell-unit">µs</span></span>
        </div>
        <div class="benchmark-cell">
          <span class="benchmark-cell-name">factor 8633</span>
          <div class="benchmark-cell-bar"><div class="benchmark-cell-fill" style="width: 35%;"></div></div>
          <span class="benchmark-cell-value">~3<span class="benchmark-cell-unit">ms</span></span>
        </div>
        <div class="benchmark-cell">
          <span class="benchmark-cell-name">total Rust LOC</span>
          <div class="benchmark-cell-bar"><div class="benchmark-cell-fill" style="width: 100%; background: var(--c-text);"></div></div>
          <span class="benchmark-cell-value">~12,600<span class="benchmark-cell-unit">lines</span></span>
        </div>
      </div>
      <p style="font-size: var(--fs-12); color: var(--c-text-subtle); margin: 1rem 0 0; font-family: var(--f-mono); letter-spacing: 0.04em;">
        Recorded in <a href="{{ '/docs/baseline/' | relative_url }}" style="color: var(--c-text-subtle); border-bottom: 0;">docs/baseline.md</a>. Bar widths are scaled for visual comparison, not absolute comparison.
      </p>
    </div>
  </div>
</section>


<!-- =====================================================================
     06 — CLI experience
     ===================================================================== -->

<section class="section section--ink cli-section">
  <div class="section-inner">
    <div class="section-grid section-grid--2">
      <div>
        <p class="section-eyebrow">Command line</p>
        <h2 class="section-title">A terminal tool that reads like one.</h2>
        <p class="section-lede">
          One binary, one positional argument, and a bannered success
          report. Positional arguments expose every stage parameter; an
          environment variable controls verbosity. Nothing hidden, nothing
          interactive.
        </p>
        <ul class="proof-list" style="margin-top: 1.5rem;">
          <li><strong>Deterministic by default.</strong> Same seed reproduces the same factors and statistics, even across machines.</li>
          <li><strong>Honest exit codes.</strong> <code>0</code> on success, <code>1</code> on any failure — never silent.</li>
          <li><strong>Standard logging.</strong> Honours <code>RUST_LOG</code>; <code>info</code>, <code>debug</code>, and <code>trace</code> cover the cases you care about.</li>
          <li><strong>No interactive prompts.</strong> Suits CI, batch jobs, and reproducible research environments.</li>
        </ul>
        <p style="margin-top: 1.5rem;">
          <a class="btn btn-secondary" href="{{ '/tutorials/factor-from-cli/' | relative_url }}">Walk through the CLI →</a>
        </p>
      </div>

      <div>
        <div class="cli-mock" aria-label="Terminal session showing tensift 91 and a successful factorization">
          <div class="cli-mock-bar">
            <div class="cli-mock-dots" aria-hidden="true"><span></span><span></span><span></span></div>
            <div class="cli-mock-title">tensift — ~/research</div>
          </div>
          <pre class="cli-mock-body"><span class="cli-dim">$</span> <span class="cli-cmd">cargo install tensift-cli</span>
<span class="cli-dim">  Compiling</span> tensift v0.1.1
<span class="cli-dim">  Finished</span> release · optimized
<span class="cli-dim">  Replaced</span> /usr/local/cargo/bin/tensift
<span class="cli-dim">$</span> <span class="cli-cmd">tensift 8633 15 30 100 42</span>
<span class="cli-out">[INFO] tensift Optimized Factorization Pipeline</span>
<span class="cli-out">[INFO] Input: 8633 (14 bits)</span>
<span class="cli-out">[INFO] Configuration: n=15 pi_2=30 gamma=100 seed=42 ...</span>
<span class="cli-out">[INFO] Starting factorization...</span>
<span class="cli-out"></span>
<span class="cli-dim">╔══════════════════════════════════════════════════════════╗</span>
<span class="cli-dim">║</span>          <span class="cli-accent">FACTORIZATION SUCCESSFUL</span>                      <span class="cli-dim">║</span>
<span class="cli-dim">╠══════════════════════════════════════════════════════════╣</span>
<span class="cli-dim">║</span> p = <span class="cli-ok">89</span>                                              <span class="cli-dim">║</span>
<span class="cli-dim">║</span> q = <span class="cli-ok">97</span>                                              <span class="cli-dim">║</span>
<span class="cli-dim">╠══════════════════════════════════════════════════════════╣</span>
<span class="cli-dim">║</span> Relations found:    14                              <span class="cli-dim">║</span>
<span class="cli-dim">║</span> CVP instances tried:  1                              <span class="cli-dim">║</span>
<span class="cli-dim">║</span> Parallel slices used: 12                            <span class="cli-dim">║</span>
<span class="cli-dim">╚══════════════════════════════════════════════════════════╝</span>
<span class="cli-ok">[INFO] Verification: p * q = N</span></pre>
        </div>

        <div class="cli-callouts">
          <div class="cli-callout">
            <span class="cli-callout-label">Install</span>
            <h4 class="cli-callout-title">One line, from crates.io</h4>
            <p><code>cargo install tensift-cli</code> — drops a <code>tensift</code> binary on your <code>PATH</code>.</p>
          </div>
          <div class="cli-callout">
            <span class="cli-callout-label">Run</span>
            <h4 class="cli-callout-title">Positional, deterministic</h4>
            <p>Every stage parameter has a positional slot. The seed defaults to <code>42</code>; set it for reproducibility.</p>
          </div>
          <div class="cli-callout">
            <span class="cli-callout-label">Verify</span>
            <h4 class="cli-callout-title">Closed-loop <em>p · q = N</em></h4>
            <p>Successful runs print a verification line; mismatches exit non-zero so scripts fail loudly.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- =====================================================================
     07 — Library / API experience
     ===================================================================== -->

<section class="section">
  <div class="section-inner">
    <p class="section-eyebrow">Library</p>
    <h2 class="section-title">Elegant in Rust.</h2>
    <p class="section-lede" style="margin-bottom: 1.5rem;">
      Five focused crates with typed entry points. Drop in
      <code>tensift-algebra</code> for the full pipeline, or pull a single
      stage from <code>tensift-lattice</code> or <code>tensift-tensor</code>.
    </p>

    <div class="crate-grid">
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

    <div class="api-snippet" aria-label="Sample Rust code calling tensift_algebra::factor::factorize">
      <div class="api-snippet-head">
        <span>factor 8633 — library</span>
        <span>Rust · tensift-algebra 0.1</span>
      </div>
      <pre class="api-snippet-body"><code class="language-rust">use rug::Integer;
use tensift_algebra::factor::{factorize, Config};

fn main() -&gt; Result&lt;(), Box&lt;dyn std::error::Error&gt;&gt; {
    let n       = Integer::from(8633_u64);                  // 89 × 97
    let config  = Config::default_for_bits(14);             // tuned for 14-bit N
    let result  = factorize(&amp;n, &amp;config)?;

    assert_eq!(Integer::from(&amp;result.p * &amp;result.q), n);
    println!("p = {}, q = {}", result.p, result.q);
    Ok(())
}</code></pre>
    </div>

    <ul class="proof-list" style="margin-top: 1.5rem;">
      <li><strong>Reusable pipeline entry points.</strong> The same <code>factorize</code> drives the CLI and the library — no shadow logic.</li>
      <li><strong>Typed configuration.</strong> <code>Config</code> surfaces every stage parameter as a field, with <code>Config::default_for_bits</code>, <code>Config::small_semiprime</code>, and <code>Config::large_semiprime</code> as named presets.</li>
      <li><strong>Per-stage statistics.</strong> <code>FactorResult</code> carries per-stage wall-clock timings and a relation count for every run.</li>
      <li><strong>Composable crates.</strong> Use <code>tensift-lattice</code> alone if you only need Schnorr + Babai. Use <code>tensift-tensor</code> alone if you have your own Hamiltonian.</li>
    </ul>

    <p style="margin-top: 1.5rem;">
      <a class="btn btn-secondary" href="{{ '/tutorials/use-as-library/' | relative_url }}">Read the library walk-through →</a>
      <a class="btn btn-ghost" href="{{ '/api/crate-map/' | relative_url }}" style="margin-left: 0.5rem;">Crate map</a>
    </p>
  </div>
</section>


<!-- =====================================================================
     08 — Documentation system
     ===================================================================== -->

<section class="section section--alt">
  <div class="section-inner">
    <p class="section-eyebrow">Documentation</p>
    <h2 class="section-title">A reading path for every role.</h2>
    <p class="section-lede" style="margin-bottom: 1.5rem;">
      Seven documentation surfaces, organised so a new user, an algorithm
      reader, a contributor, and a benchmark reviewer each find what they
      need without sorting the rest.
    </p>

    <div class="docs-tiles">
      <a class="docs-tile" href="{{ '/getting-started/' | relative_url }}">
        <div class="docs-tile-label">01 — Begin</div>
        <h3 class="docs-tile-title">Getting started</h3>
        <p>Install the CLI, factor your first number, embed in Rust.</p>
      </a>
      <a class="docs-tile" href="{{ '/tutorials/quick-tour/' | relative_url }}">
        <div class="docs-tile-label">02 — Learn</div>
        <h3 class="docs-tile-title">Tutorials</h3>
        <p>Six task-oriented guides: quick tour, CLI, library, batch, tuning, reproducible runs.</p>
      </a>
      <a class="docs-tile" href="{{ '/concepts/algorithm-overview/' | relative_url }}">
        <div class="docs-tile-label">03 — Understand</div>
        <h3 class="docs-tile-title">Concept docs</h3>
        <p>Algorithm overview, why lattice + tensor network, limitations, glossary.</p>
      </a>
      <a class="docs-tile" href="{{ '/docs/stage-1-lattice-construction/' | relative_url }}">
        <div class="docs-tile-label">04 — Stage</div>
        <h3 class="docs-tile-title">Stage docs</h3>
        <p>One page per stage: mathematics, code shape, edge cases, simplifications.</p>
      </a>
      <a class="docs-tile" href="{{ '/api/crate-map/' | relative_url }}">
        <div class="docs-tile-label">05 — Reference</div>
        <h3 class="docs-tile-title">API reference</h3>
        <p>Crate map and per-crate API: types, methods, where each is used.</p>
      </a>
      <a class="docs-tile" href="{{ '/changelog/' | relative_url }}">
        <div class="docs-tile-label">06 — Track</div>
        <h3 class="docs-tile-title">Changelog</h3>
        <p>Released and unreleased changes, grouped per Keep a Changelog.</p>
      </a>
      <a class="docs-tile" href="{{ '/contributing/' | relative_url }}">
        <div class="docs-tile-label">07 — Build</div>
        <h3 class="docs-tile-title">Contributing</h3>
        <p>Setup, commit conventions, checks, where to start.</p>
      </a>
      <a class="docs-tile" href="{{ '/docs/baseline/' | relative_url }}">
        <div class="docs-tile-label">08 — Measure</div>
        <h3 class="docs-tile-title">Baseline</h3>
        <p>Pre-refactor gates, benchmarks, and known-defect record.</p>
      </a>
    </div>

    <div class="role-paths">
      <div class="role-path">
        <div class="role-path-name">New user</div>
        <ol>
          <li><a href="{{ '/tutorials/quick-tour/' | relative_url }}">Quick tour</a></li>
          <li><a href="{{ '/getting-started/' | relative_url }}">Get started</a></li>
          <li><a href="{{ '/tutorials/factor-from-cli/' | relative_url }}">Factor from the CLI</a></li>
        </ol>
      </div>
      <div class="role-path">
        <div class="role-path-name">Algorithm reader</div>
        <ol>
          <li><a href="{{ '/concepts/algorithm-overview/' | relative_url }}">Algorithm overview</a></li>
          <li><a href="{{ '/docs/stage-1-lattice-construction/' | relative_url }}">Stage 1 — Lattice</a></li>
          <li><a href="{{ '/docs/stage-4-tensor-network/' | relative_url }}">Stage 4 — Tensor network</a></li>
        </ol>
      </div>
      <div class="role-path">
        <div class="role-path-name">Contributor</div>
        <ol>
          <li><a href="{{ '/api/crate-map/' | relative_url }}">Crate map</a></li>
          <li><a href="{{ '/docs/implementation-notes/' | relative_url }}">Implementation notes</a></li>
          <li><a href="{{ '/contributing/' | relative_url }}">Contributing</a></li>
        </ol>
      </div>
      <div class="role-path">
        <div class="role-path-name">Benchmark reviewer</div>
        <ol>
          <li><a href="{{ '/docs/baseline/' | relative_url }}">Baseline</a></li>
          <li><a href="{{ '/docs/implementation-notes/' | relative_url }}">Implementation notes</a></li>
          <li><a href="{{ '/concepts/limitations/' | relative_url }}">Limitations</a></li>
        </ol>
      </div>
    </div>
  </div>
</section>


<!-- =====================================================================
     09 — Limitations
     ===================================================================== -->

<section class="section">
  <div class="section-inner">
    <p class="section-eyebrow">Limitations</p>
    <h2 class="section-title">Honest about where it stops.</h2>
    <p class="section-lede" style="margin-bottom: 1.5rem;">
      Boundary lines on the input size, the heuristics, and the
      cryptographic applicability. Stated here so you can decide whether
      tensift fits your use case without reading the code first.
    </p>

    <div class="limitations-grid">
      <div class="limit-card">
        <h3 class="limit-card-title">Where it works</h3>
        <ul>
          <li>Small to medium semiprimes — the <code>Config::default_for_bits</code> heuristic tops out at <em>n = 20</em> for &gt; 60 bits.</li>
          <li>Reliable at ~30 bits with defaults; ~40–50 bits with the parameter tweaks described in <a href="{{ '/tutorials/tuning-the-pipeline/' | relative_url }}">Tuning the pipeline</a>.</li>
          <li>Excellent as a research vehicle: lattice + tensor-network combination is worth studying on small inputs.</li>
          <li>Educational: a single binary that runs all seven stages is a good way to read the algorithm.</li>
        </ul>
      </div>
      <div class="limit-card limit-card--scope">
        <h3 class="limit-card-title">Where it stops</h3>
        <ul>
          <li>Hard ceiling around 60–64 bits with default settings. Above that, the bundled BKZ performs limited enumeration for blocks &gt; 3.</li>
          <li>The MPO is a nearest-neighbour identity-like structure; it does not fully encode the CVP Hamiltonian coupling pattern.</li>
          <li>Not a cryptanalysis tool. No constant-factor advantage over QS / NFS on large inputs.</li>
          <li>Not a production cryptographic library. <code>panic = "abort"</code> in release; downstream callers should wrap in <code>catch_unwind</code>.</li>
        </ul>
      </div>
    </div>

    <p style="margin-top: 1.5rem;">
      <a class="btn btn-secondary" href="{{ '/concepts/limitations/' | relative_url }}">Read the full limitations page →</a>
    </p>
  </div>
</section>


<!-- =====================================================================
     10 — Contributing / extendability
     ===================================================================== -->

<section class="section section--alt">
  <div class="section-inner">
    <p class="section-grid section-grid--2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: start;">
      <div>
        <p class="section-eyebrow">Extending</p>
        <h2 class="section-title">Hackable by design.</h2>
        <p class="section-lede">
          Stage boundaries are crate boundaries. You can swap a single
          stage without touching the rest, run the test suite against
          your replacement, and benchmark it in isolation.
        </p>

        <ul class="contrib-checklist" style="margin-top: 1.5rem;">
          <li><strong>Clean crate boundaries.</strong> <code>tensift-core</code>, <code>-lattice</code>, <code>-tensor</code>, <code>-algebra</code>, <code>-cli</code> each own one stage or one cross-cutting concern.</li>
          <li><strong>Deterministic behaviour.</strong> Every random call reads from the threaded <code>ChaCha8Rng</code>. <em>Same seed, same input, same answer</em> is a contract, not a hope.</li>
          <li><strong>Testability.</strong> {{ site.brand.stats.unit_tests }} unit + {{ site.brand.stats.integration_tests }} integration tests, including determinism proptests and seed-robustness checks.</li>
          <li><strong>Stage separation.</strong> Per-stage <code>PipelineStats</code> timings are exposed on every <code>FactorResult</code> so you can see what your change actually moved.</li>
          <li><strong>Readable implementation notes.</strong> <a href="{{ '/docs/implementation-notes/' | relative_url }}">Implementation notes</a> calls out where the code departs from the paper and where the heuristics live.</li>
        </ul>
      </div>

      <div>
        <div class="contrib-callout">
          <h3>Where to start</h3>
          <p>Three entry points depending on the kind of change you want to make:</p>
          <p>
            <strong>Algorithmic.</strong> Swap a sampler, change a bond-dimension heuristic, or implement full BKZ enumeration. The
            <a href="{{ '/api/tensift-tensor/' | relative_url }}">tensift-tensor</a> and
            <a href="{{ '/api/tensift-lattice/' | relative_url }}">tensift-lattice</a> API surfaces are small.
          </p>
          <p>
            <strong>Engineering.</strong> Tighten the slice budget, switch to <code>ndarray-linalg</code> for SVD, or add SIMD. Start with the
            <a href="{{ '/docs/implementation-notes/' | relative_url }}">implementation notes</a>.
          </p>
          <p>
            <strong>Documentation.</strong> <em>good first issue</em> and <em>documentation</em> labels in
            <a href="https://github.com/{{ site.repository }}/issues">the issue tracker</a> cover isolated, well-scoped tasks.
          </p>
        </div>

        <p style="margin-top: 1.5rem;">
          <a class="btn btn-primary" href="{{ '/contributing/' | relative_url }}">Read the contributing guide →</a>
          <a class="btn btn-ghost" href="https://github.com/{{ site.repository }}" style="margin-left: 0.5rem;">Open an issue</a>
        </p>
      </div>
    </p>
  </div>
</section>


<!-- =====================================================================
     11 — Call to action
     ===================================================================== -->

<section class="section section--ink" style="border-bottom: 0;">
  <div class="section-inner" style="text-align: center;">
    <p class="section-eyebrow">Try it</p>
    <h2 class="section-title" style="margin-left: auto; margin-right: auto;">
      A pipeline you can read, run, and reason about.
    </h2>
    <p class="section-lede" style="margin-left: auto; margin-right: auto;">
      Install the CLI, factor a number, then read the seven stage
      documents to see how it works end to end.
    </p>
    <div class="home-actions" style="justify-content: center;">
      <a class="btn btn-primary btn-lg" href="{{ '/getting-started/' | relative_url }}">Get started</a>
      <a class="btn btn-secondary btn-lg" href="{{ '/concepts/algorithm-overview/' | relative_url }}">Read the algorithm</a>
      <a class="btn btn-ghost btn-lg" href="https://github.com/{{ site.repository }}" rel="noopener">View on GitHub</a>
    </div>
  </div>
</section>