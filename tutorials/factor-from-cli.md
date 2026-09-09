---
layout: docs
title: Factor from the CLI
section: Tutorials
subtitle: Run tensift from the command line — arguments, output, and seed control.
github_path: tutorials/factor-from-cli.md
---

# Factor from the CLI

The `tensift` binary takes a semiprime and an optional list of positional
arguments that tune the pipeline. This page is a complete reference for the
CLI.

## The shortest invocation

```bash
tensift 91
```

You'll see log lines followed by a boxed banner:

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

The exit code is `0` on success and `1` on any error.

## Positional arguments

Every argument after the semiprime is optional and positional, in this order:

```bash
tensift <semiprime> [n] [pi_2] [gamma] [seed] [max_cvp] [ttn_bond_dim] [num_slices]
```

| # | Argument | Plain English | Default |
|---|---|---|---|
| 0 | `<semiprime>` | Number to factor | — |
| 1 | `n` | Lattice dimension | Auto from bit size |
| 2 | `pi_2` | Smoothness basis size | `2 × n` |
| 3 | `gamma` | Candidate samples per CVP instance | `50` |
| 4 | `seed` | RNG seed for reproducibility | `42` |
| 5 | `max_cvp` | Maximum CVP instances to try | `500` |
| 6 | `ttn_bond_dim` | Initial tensor-network bond dimension | `4` |
| 7 | `num_slices` | Parallel slices (`0` = auto) | num CPUs |

Defaults come from `Config::default_for_bits(bits)`, where `bits` is the
significant-bit count of the input.

## Reproducible runs

The `seed` argument seeds a single `ChaCha8Rng` that the entire pipeline reads
from. Same seed, same input, same answer:

```bash
tensift 8633 15 30 100 12345
tensift 8633 15 30 100 12345
```

Both runs will print the same `p` and `q` and the same statistics.

## Verbosity

`tensift` honors the standard `RUST_LOG` environment variable:

```bash
RUST_LOG=debug tensift 91
```

Common levels:

- `error` — only failures.
- `warn` — warnings (default).
- `info` — progress messages.
- `debug` — per-stage detail.
- `trace` — verbose per-step logging.

## Exit codes

| Code | Meaning |
|------|---------|
| `0`  | Factorization succeeded; `p × q == n` verified. |
| `1`  | Factorization failed (insufficient smooth relations, numeric error, etc.) |
| `1`  | Invalid input (un-parseable number, bad argument). |

## Examples

```bash
# 7-bit semiprime, all defaults
tensift 91

# 14-bit semiprime with custom lattice dimension
tensift 8633 15

# Custom dimension, smoothness basis, samples per CVP
tensift 8633 15 30 100

# Fixed seed for reproducibility
tensift 8633 15 30 100 12345

# Higher CVP budget and bigger bond dimension
tensift 8633 15 30 100 12345 1000 8

# Force 4 parallel slices
tensift 8633 15 30 100 12345 1000 8 4
```

## See also

- [Library equivalent of this tutorial](/tutorials/use-as-library/)
- [Tuning the pipeline](/tutorials/tuning-the-pipeline/) for what to change when
  the default parameters don't factor your number
- [Reproducible runs](/tutorials/reproducible-runs/) for how the seeded RNG
  flows through the seven stages