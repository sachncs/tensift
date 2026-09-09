#!/bin/bash
# Setup script for tensift development environment
# This script is idempotent and safe to re-run

set -euo pipefail

echo "tensift Development Environment Setup"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Determine the rustup installer signature URL for the channel we want.
# Pinning a specific channel keeps the install reproducible across hosts.
RUSTUP_CHANNEL="${RUSTUP_CHANNEL:-stable}"
RUSTUP_SHA256_URL="https://static.rust-lang.org/rustup/archive/${RUSTUP_CHANNEL}/x86_64-unknown-linux-gnu/rustup-init.sha256"
RUSTUP_INSTALLER_URL="https://static.rust-lang.org/rustup/dist/x86_64-unknown-linux-gnu/rustup-init"
RUSTUP_SHA_FILE="$(mktemp -t rustup-init.sha256.XXXXXX)"
RUSTUP_INSTALLER="$(mktemp -t rustup-init.XXXXXX)"
trap 'rm -f "${RUSTUP_SHA_FILE}" "${RUSTUP_INSTALLER}"' EXIT

# Check if Rust is installed at the expected MSRV (1.88) or newer.
MIN_RUST_VERSION="1.88.0"
needs_install=0
if ! command -v rustc &> /dev/null; then
    needs_install=1
else
    current_version="$(rustc --version | awk '{print $2}')"
    if [ "$(printf '%s\n' "${MIN_RUST_VERSION}" "${current_version}" | sort -V | head -n1)" != "${MIN_RUST_VERSION}" ]; then
        echo -e "${YELLOW}Found rustc ${current_version}; need >= ${MIN_RUST_VERSION}.${NC}"
        needs_install=1
    else
        echo -e "${GREEN}Rust found: $(rustc --version)${NC}"
    fi
fi

if [ "${needs_install}" -eq 1 ]; then
    echo -e "${YELLOW}Installing rustup (channel=${RUSTUP_CHANNEL}) with checksum verification...${NC}"

    # Download the rustup installer and its published SHA256.
    if ! curl --proto '=https' --tlsv1.2 --fail --silent --show-error \
            -o "${RUSTUP_INSTALLER}" "${RUSTUP_INSTALLER_URL}"; then
        echo -e "${RED}Failed to download rustup installer from ${RUSTUP_INSTALLER_URL}${NC}" >&2
        echo -e "${RED}Verify your network/proxy settings and rerun.${NC}" >&2
        exit 1
    fi
    if ! curl --proto '=https' --tlsv1.2 --fail --silent --show-error \
            -o "${RUSTUP_SHA_FILE}" "${RUSTUP_SHA256_URL}"; then
        echo -e "${RED}Failed to download rustup checksum from ${RUSTUP_SHA256_URL}${NC}" >&2
        echo -e "${RED}Refusing to execute an installer without integrity verification.${NC}" >&2
        exit 1
    fi

    # Verify the installer against the published digest. `sha256sum -c` reads
    # "<sha> <file>" lines; rewrite the file path to match the download.
    expected_sha="$(awk '{print $1}' "${RUSTUP_SHA_FILE}")"
    actual_sha="$(sha256sum "${RUSTUP_INSTALLER}" | awk '{print $1}')"
    if [ "${expected_sha}" != "${actual_sha}" ]; then
        echo -e "${RED}rustup installer checksum mismatch:${NC}" >&2
        echo -e "${RED}  expected: ${expected_sha}${NC}" >&2
        echo -e "${RED}  actual:   ${actual_sha}${NC}" >&2
        exit 1
    fi
    echo -e "${GREEN}rustup installer checksum verified.${NC}"

    sh "${RUSTUP_INSTALLER}" -y --default-toolchain "${RUSTUP_CHANNEL}" --profile minimal --no-modify-path
    source "$HOME/.cargo/env"
fi

# Ensure cargo is available
source "$HOME/.cargo/env" 2>/dev/null || true

# Install/update toolchain components
echo -e "${YELLOW}Installing required toolchain components...${NC}"
rustup component add rustfmt clippy rust-src 2>/dev/null || true

# Install useful tools (optional)
echo -e "${YELLOW}Checking for optional tools...${NC}"

# cargo-audit
if ! command -v cargo-audit &> /dev/null; then
    echo "Installing cargo-audit..."
    cargo install cargo-audit 2>/dev/null || echo "cargo-audit installation skipped"
fi

# cargo-deny
if ! command -v cargo-deny &> /dev/null; then
    echo "Installing cargo-deny..."
    cargo install cargo-deny 2>/dev/null || echo "cargo-deny installation skipped"
fi

# just
if ! command -v just &> /dev/null; then
    echo "Installing just..."
    cargo install just 2>/dev/null || echo "just installation skipped"
fi

# Verify installation
echo ""
echo -e "${GREEN}Verification:${NC}"
echo "Rust: $(rustc --version)"
echo "Cargo: $(cargo --version)"
echo "Rustfmt: $(rustfmt --version)"
echo "Clippy: $(cargo clippy --version)"

# Run initial checks
echo ""
echo -e "${YELLOW}Running initial checks...${NC}"

if cargo fmt --all -- --check 2>/dev/null; then
    echo -e "${GREEN}Formatting: OK${NC}"
else
    echo -e "${YELLOW}Formatting: Issues found (run 'cargo fmt --all')${NC}"
fi

if cargo clippy --all-targets --all-features -- -D warnings 2>/dev/null; then
    echo -e "${GREEN}Clippy: OK${NC}"
else
    echo -e "${YELLOW}Clippy: Warnings found${NC}"
fi

echo ""
echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  - Run 'just' to see available commands"
echo "  - Run 'cargo test' to run tests"
echo "  - Run 'cargo run -- <number>' to factor a number"
