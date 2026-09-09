---
layout: page
title: Support
section: Project
---

# Support

If you're stuck, here is where to ask.

## Where to ask

| Channel | When to use it |
|---|---|
| [GitHub Discussions](https://github.com/sachncs/tensift/discussions) | Open-ended questions, design ideas, "how do I do X?" |
| [GitHub Issues](https://github.com/sachncs/tensift/issues) | Bug reports, feature requests, documentation fixes |
| Email: **sachncs@gmail.com** | Security vulnerabilities only — see [Security policy](/security/) |

## Before you ask

A quick checklist that often solves the problem on its own:

1. **Check the version.**  Run `tensift --help` (or `cargo run -p tensift-cli -- --help`)
   and confirm the version. The MSRV is 1.88.
2. **Read the troubleshooting section of [Getting started](/getting-started/#troubleshooting).**
3. **Search the existing issues.**  Someone may have hit the same thing.
4. **Try a smaller input.**  If the pipeline can't factor a 30-bit semiprime
   with the defaults, something is wrong; see
   [Tuning the pipeline](/tutorials/tuning-the-pipeline/).

## Reporting a bug

Use the [bug report template](https://github.com/sachncs/tensift/issues/new?template=bug_report.md).
Include:

- Operating system and Rust version.
- tensift version (`tensift --help`).
- The exact command you ran.
- The complete error output.
- A minimal reproducer, if possible.

## Requesting a feature

Use the
[feature request template](https://github.com/sachncs/tensift/issues/new?template=feature_request.md).
Describe the use case first, then the proposed solution. Algorithmic
changes are particularly welcome — see
[Concepts → Limitations](/concepts/limitations/) for the current list of
known simplifications.

## Contributing fixes

See [Contributing](/contributing/) for the workflow.