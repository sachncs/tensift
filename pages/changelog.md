---
layout: page
title: Changelog
section: Project
permalink: /changelog/
---

# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> The full changelog is also available in the
> [repository's CHANGELOG.md](https://github.com/sachncs/tensift/blob/master/CHANGELOG.md).

## Highlights

- [Unreleased](#unreleased) — Documentation expansion, rebrand sweep, determinism
  hardening, GitHub Pages site.
- [0.1.1](#011---2026-06-19) — First published version on crates.io.
- [0.1.0](#010---2026-06-19) — Complete 7-stage pipeline.
- [0.0.1](#001---2026-06-19) — Initial scaffolding.

## [Unreleased]

### Added

- Determinism, seed-robustness, and smoothness round-trip proptests
  (integration suite now at 14 tests).
- MSRV CI job that verifies the workspace builds on Rust 1.88.
- GitHub Pages site at `sachncs.github.io/tensift` with full navigation
  sidebar, top-level landing page, tutorials, concepts, and per-crate
  API reference pages.
- Six new tutorials: *Quick tour*, *Factor from the CLI*, *Use as a
  library*, *Batch factorization*, *Tuning the pipeline*, *Reproducible
  runs*.
- Four new concept pages: *Algorithm overview*, *Why lattice + tensor
  network?*, *Limitations*, *Glossary*.
- Per-crate API reference pages: *Crate map*, *tensift-algebra*,
  *tensift-lattice*, *tensift-tensor*, *tensift-core*, *tensift-cli*.

### Changed

- Rebranded project and crates to `tensift` (was `tnss-*`): crate and
  package names, the CLI binary (`tensift`), crate directories, import
  paths, CI references, and the documentation URL. `TNSS` is retained
  only as the algorithm acronym (e.g. `PidParams::for_tnss`).
- Raised MSRV from 1.85 to 1.88 (let-chains stabilized).
- Split `factor.rs` into `config.rs`, `extract.rs`, and the pipeline
  module; `Config`, `CvpSolver`, and `ReductionMode` are re-exported
  from the `factor` module for compatibility.
- Pinned `rand` to 0.10 and removed all system-entropy (`rand::random()`)
  calls; the pipeline now threads a single `ChaCha8Rng::seed_from_u64(seed)`
  through every stage that needs randomness. `fast_shuffle`,
  `greedy_local_search`, `truncate_tensor`, `contract_mpo_mpo`, and
  `spectral_amplification` were updated to take `&mut R: Rng`.
- `Config.min_configs_per_slice` became `min_configs_multiplier`: the
  sampler now evaluates at least `min_configs_multiplier × num_slices`
  candidate configurations (the value was previously read by nothing).
- Rewrote the README in a beginner-first style.
- Repaired documentation drift (crate paths, test counts, CLI positional
  arguments, MSRV, `svd_threshold` default, pi_2 range, getting-started
  example).
- Refreshed workspace keywords to include `tensift`, `semiprime`, and
  `schnorr`; corrected workspace `homepage` / `repository` URLs.
- Annotated the workspace `[profile.release] panic = "abort"` setting so
  callers know panics abort the host process.
- `rust-toolchain.toml` pins the project's local toolchain to 1.88 (CI
  still uses `@stable` for the non-MSRV jobs).
- `setup.sh` downloads rustup with SHA-256 integrity verification instead
  of piping to a shell.

### Removed

- Dead parallel-contraction framework from `index_slicing` (`IndexSlice`,
  `PartitionIndices`, `ParallelContractor`, `LoadStats`, and friends).
- `contract_node_parallel` TTN slice contraction path.
- `amplitude_fast` and `ContractionBuffers`.
- All dependencies from `tensift-core` except `thiserror`.

### Fixed

- CI `fmt` job now uses `cargo fmt --all -- --check` so the whole
  workspace is checked (was checking only the root crate).
- `tnss-sampler` no longer appears in the `CONTRIBUTING.md` scope list
  (the crate was removed).
- Clippy lints `manual_is_multiple_of` and `collapsible_if`; clippy
  now runs with `-D warnings` in the gate.
- Bug-report template now references the correct product name and
  Rust 1.88 example (was 1.85).

## [0.1.1] - 2026-06-19

### Changed

- Updated version to 0.1.1.

## [0.1.0] - 2026-06-19

### Added

- Complete 7-stage pipeline implementation.
- Workspace architecture with 6 crates (core, lattice, tensor, sampler,
  algebra, cli).
- Schnorr lattice construction (Stage 1).
- LLL, Segment LLL, and BKZ basis reduction (Stage 2).
- Babai rounding and Klein sampling for CVP baseline (Stage 3).
- Tree Tensor Network (TTN) variational ansatz (Stage 4).
- OPES optimization, MPO spectral amplification, and fallback samplers
  (Stage 5).
- Smoothness verification and sr-pair extraction (Stage 6).
- GF(2) linear algebra and factor recovery (Stage 7).
- 149 unit tests.
- 4 Criterion benchmarks.
- CLI binary with examples.
- Zero `unsafe` code.
- Strict clippy compliance.
- CI/CD pipeline with GitHub Actions.
- Stage-by-stage documentation.

## [0.0.1] - 2026-06-19

### Added

- Initial project setup.
- Workspace structure.
- Basic crate scaffolding.

---

[Unreleased]: https://github.com/sachncs/tensift/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/sachncs/tensift/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/sachncs/tensift/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/sachncs/tensift/releases/tag/v0.0.1