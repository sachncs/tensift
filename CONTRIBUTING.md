---
layout: page
title: Contributing
section: Project
---

# Contributing to tensift

Thank you for your interest in contributing to tensift (Tensor-Network
Schnorr's Sieving). This page summarizes the workflow; the canonical copy
lives in [CONTRIBUTING.md](https://github.com/sachncs/tensift/blob/master/CONTRIBUTING.md).

> **Read [CONTRIBUTING.md](https://github.com/sachncs/tensift/blob/master/CONTRIBUTING.md) before opening a PR.**
> Anything below is a high-level overview.

## Quick start

1. Fork the repository.
2. Clone your fork and run the setup script:

   ```bash
   git clone https://github.com/<your-username>/tensift.git
   cd tensift
   ./setup.sh
   ```

3. Create a branch for your change:

   ```bash
   git checkout -b feat/my-new-feature
   ```

4. Make your change, push, and open a PR.

## What to know before you write code

- **One crate per stage.**  The workspace is structured so that a tinkerer
  can swap out a single stage without touching the others. Keep the
  boundaries intact.
  See [Crate map](/api/crate-map/).
- **The pipeline is deterministic.**  Every random call in the workspace
  reads from a single `&mut R: Rng` threaded through the pipeline. Don't
  reintroduce `rand::random()` or `OsRng`. See
  [Tutorials → Reproducible runs](/tutorials/reproducible-runs/).
- **The MSRV is 1.88.**  Anything that won't compile on 1.88 won't ship.
- **`panic = "abort"` in release.**  Panics in library code abort the host
  process; wrap calls in `catch_unwind` if you need to recover.

## Commit conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Valid scopes (crate names): `core`, `lattice`, `tensor`, `algebra`, `cli`.

## Running the checks

```bash
# Format the whole workspace
cargo fmt --all

# Run the test suite
cargo test --workspace --all-features

# Lint with clippy
cargo clippy --workspace --all-targets --all-features -- -D warnings

# Audit dependencies
cargo audit
```

…or run them all with `just check`.

## Coding standards

- Follow `rustfmt` defaults.
- Use `thiserror` for library error types.
- Prefer workspace dependencies over direct `Cargo.toml` entries.
- No `unsafe` unless absolutely necessary; if needed, include detailed
  safety comments.

## Where to start

- `good first issue` label on GitHub.
- `documentation` label — these are small, isolated, and don't require
  deep familiarity with the algorithm.
- `help wanted` label — bigger items where maintainer review is
  especially welcome.

## Getting help

- Open a
  [discussion](https://github.com/sachncs/tensift/discussions).
- Ask in an existing issue.
- Reach out to the maintainers.

Thank you for contributing!