#!/usr/bin/env bash
set -euo pipefail

rm -rf ".vercel/output" ".next" "apps/rivva-app/.next" "apps/rivva-app/.vercel/output"

vercel build --prod
vercel deploy --prebuilt --prod
