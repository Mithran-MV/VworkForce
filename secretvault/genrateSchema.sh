#!/usr/bin/env bash
#
# Creates the SecretVault schema.
#
# This script used to contain NILLION_API_KEY, NILLION_PUBLIC_KEY and
# NILLION_SECRET_KEY written out literally. It now reads them from .env, which
# is gitignored - see .env.example for the list.

set -euo pipefail

cd "$(dirname "$0")"

if [ ! -f .env ]; then
  echo "secretvault/.env is missing. Copy .env.example to .env and fill it in." >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
. ./.env
set +a

node postSchema.js
