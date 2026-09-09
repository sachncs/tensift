---
layout: docs
title: tensift-cli
section: API reference
subtitle: The `tensift` binary and the small re-export crate behind it.
github_path: api/tensift-cli.md
---

# tensift-cli

`tensift-cli` provides the `tensift` command-line binary. The crate
re-exports the rest of the workspace so downstream binaries can pull in
the full API surface with a single `use tensift_cli::*;`.

```toml
[dependencies]
tensift-cli = "0.1"
```

You typically use this crate either as a binary dependency (`cargo install
tensift-cli`) or as a library that re-exports the other four crates.

## Binary: `tensift`

```
tensift <semiprime> [n] [pi_2] [gamma] [seed] [max_cvp] [ttn_bond_dim] [num_slices]
```

A complete walk-through is in
[Tutorials → Factor from the CLI](/tutorials/factor-from-cli/). Key points:

- Exit code `0` on success, `1` on any error.
- `RUST_LOG=debug` for verbose output.
- All arguments after the semiprime are optional and positional.

### Output

The binary prints a banner like:

```
╔══════════════════════════════════════════════════════════╗
║          FACTORIZATION SUCCESSFUL                      ║
╠══════════════════════════════════════════════════════════╣
║ p =                                                7  ║
║ q =                                               13  ║
╠══════════════════════════════════════════════════════════╣
║ Relations found:    {relations_found}                     ║
║ CVP instances tried: {cvp_tried}                          ║
║ Parallel slices used: {num_slices}                        ║
╚══════════════════════════════════════════════════════════╝
```

A `Verification: p * q = N` log line confirms the factors multiply back
to the input.

## Re-exports

`tensift-cli::lib` re-exports every module from the four other workspace
crates:

```rust
// Algebraic components
pub use tensift_algebra::{factor, gf2_solver, primes, smoothness};

// Core utilities
pub use tensift_core::index_slicing;
pub use tensift_core::{Error, Result, consts, utils};

// Lattice reduction
pub use tensift_lattice::{babai, bkz, lattice, pruning, segment_lll};

// Tensor network
pub use tensift_tensor::{adaptive_bond, hamiltonian, opes, ttn};
```

A binary that depends on `tensift-cli` can therefore reach the entire
pipeline with a single dependency. The `tensift` binary itself is the
canonical example.

## Example binary

`tensift-cli` also publishes an `examples/` directory with two reference
programs. They are not part of the library API but are useful as starting
points for your own:

- `examples/basic_factorization.rs` — the smallest possible driver around
  `factorize`.
- `examples/test_factorization.rs` — a tiny test harness that runs the
  pipeline over a list of inputs.

## See also

- [Tutorials → Factor from the CLI](/tutorials/factor-from-cli/)
- [Tutorials → Use as a library](/tutorials/use-as-library/)
- [API reference → crate map](/api/crate-map/)
- [docs.rs/tensift-cli](https://docs.rs/tensift-cli)