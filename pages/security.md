---
layout: page
title: Security policy
section: Project
permalink: /security/
---

# Security policy

> The canonical copy of this policy lives in
> [SECURITY.md](https://github.com/sachncs/tensift/blob/master/SECURITY.md).
> This page is a summary.

## Supported versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a vulnerability

If you discover a security vulnerability within tensift, please send an
email to **sachncs@gmail.com**. All security vulnerabilities will be
addressed promptly.

**Please do not report security vulnerabilities through public GitHub
issues.**

### What to include

- Type of vulnerability.
- Full paths of source files related to the vulnerability.
- The location of the affected source code (tag, branch, commit, or
  direct URL).
- Any special configuration required to reproduce the issue.
- Step-by-step instructions to reproduce the issue.
- Proof-of-concept or exploit code (if possible).
- Impact of the issue, including how an attacker might exploit it.

### What to expect

- **Acknowledgment** within 48 hours of your report.
- **Assessment** of the reported vulnerability.
- **Resolution** coordinated with you on disclosure timing.
- **Disclosure** of the vulnerability once a fix is available.

## Security best practices

When using tensift in your project:

- Keep your Rust toolchain updated to the latest stable version.
- Run `cargo audit` regularly to check for known vulnerabilities in
  dependencies.
- Review `deny.toml` for the project's dependency policy.
- Use `cargo deny` to enforce license and vulnerability checks.

## Scope

This security policy applies to:

- The tensift Rust crates.
- The command-line interface (`tensift-cli`).
- Documentation and examples in this repository.

## Out of scope

- Third-party dependencies (report to their respective maintainers).
- Issues in development/unreleased versions.
- Issues requiring physical access to the machine.

## Recognition

We appreciate the efforts of security researchers and acknowledge
contributors who help improve the security of this project (unless they
prefer to remain anonymous).