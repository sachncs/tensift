---
layout: docs
title: Getting Started
section: Getting started
subtitle: Install tensift, factor a number, and start hacking on the pipeline.
github_path: docs/getting-started.md
---

# Getting Started

This guide walks you from a fresh checkout (or a fresh `cargo install`) to your
first successful factorization, and then to a small Rust program that uses
`tensift-algebra` as a library.

> **New here?**  Start at [Tutorials → Quick tour](/tutorials/quick-tour/) for a
> five-minute overview, then come back for the full walk-through.

## Before you start

You will need:

- A computer running macOS, Linux, or Windows.
- A terminal you can type commands into.
- A recent stable Rust toolchain. tensift pins **Rust 1.88** as its MSRV
  ([Minimum Supported Rust Version](https://doc.rust-lang.org/cargo/reference/manifest.html#the-rust-version-field)).

If you already have Rust installed and want to check the version, run:

```bash
rustc --version
```

If the version is at least `1.88.0`, you're set. If not, install rustup from
<https://rustup.rs> and run `rustup install stable` (or `rustup default 1.88` to
match the project pin).

## Install

### Option 1 — From crates.io (fastest)

```bash
cargo install tensift-cli
```

This drops a `tensift` binary on your `PATH`. No clone, no build step.

### Option 2 — From source (recommended if you want to hack on it)

```bash
git clone https://github.com/sachncs/tensift.git
cd tensift
./setup.sh           # installs rustfmt + clippy components and useful tools
cargo build --release
```

The release binary lands at `target/release/tensift`.

## Factor your first number

The fastest way to see tensift work is from the terminal:

```bash
tensift 91
```

`tensift 91` prints a few log lines and then a boxed
**FACTORIZATION SUCCESSFUL** banner that reads `p = 7`, `q = 13`, plus some
statistics. That is, it factored `91 = 7 × 13`.

Try a slightly larger semiprime:

```bash
tensift 8633     # 89 × 97
```

You can pin the random seed to make the run reproducible:

```bash
tensift 8633 15 30 100 12345
#              ↑  ↑   ↑    ↑
#              n  pi_2 gamma seed
```

`tensift --help` shows the full positional argument list.

> **Where do the seeds come in?**  Every random number tensift draws is sourced
> from a single `ChaCha8Rng` seeded from this `seed` argument. The same seed,
> the same inputs, the same answer. See
> [Tutorials → Reproducible runs](/tutorials/reproducible-runs/) for details.

## Use tensift from Rust code

Add `tensift-algebra` to your `Cargo.toml`:

```toml
[dependencies]
tensift-algebra = "0.1"
rug = "1.29"
```

Then call `factorize`:

```rust
use rug::Integer;
use tensift_algebra::factor::{Config, factorize};

fn main() {
    let n = Integer::from(91u64);                 // 91 = 7 × 13
    let config = Config::default_for_bits(7);     // tuned for 7-bit numbers
    let result = factorize(&n, &config).unwrap();

    println!("p = {}, q = {}", result.p, result.q);
}
```

Run it:

```bash
cargo run
```

You should see `p = 7, q = 13`.

> **Under the hood.**  `factorize` wires together all seven stages for you.
> If you need finer control — for example, to swap a sampler, run multiple
> stages in parallel, or inspect the intermediate relations — see
> [Tutorials → Use as a library](/tutorials/use-as-library/) and the
> [crate map](/api/crate-map/).

## What's next?

| If you want to ... | Go to |
|---|---|
| See a hands-on tour of the CLI | [Tutorials → Quick tour](/tutorials/quick-tour/) |
| Run the same number through many configs | [Tutorials → Tuning the pipeline](/tutorials/tuning-the-pipeline/) |
| Understand the algorithm | [Concepts → Algorithm overview](/concepts/algorithm-overview/) |
| Inspect a stage in depth | [Stage 1: Lattice construction](/docs/stage-1-lattice-construction/) |
| Look up a type or function | [API reference → tensift-algebra](/api/tensift-algebra/) |
| Build something on top | [Contributing](/contributing/) |

## Troubleshooting

- **"`error: package tensift-cli vX.Y.Z … requires rustc 1.88 …`** — Your
  toolchain is older than the MSRV. Run `rustup update stable` (or
  `rustup install 1.88 && rustup default 1.88`).
- **Factorization fails with `"not enough smooth relations"`** — Increase
  `max_cvp` (more CVP tries) or `gamma` (more samples per CVP). The defaults
  work for inputs up to ~30 bits; above that, the pipeline needs more samples.
- **The binary prints a banner but does not say `SUCCESSFUL`** — The pipeline
  ran but did not find enough smooth relations. Try the previous bullet, or
  pick a smaller semiprime.

For more help, see [Support](/support/) or open an
[issue on GitHub](https://github.com/sachncs/tensift/issues).