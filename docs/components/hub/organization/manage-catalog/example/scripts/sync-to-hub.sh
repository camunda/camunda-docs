#!/usr/bin/env bash
set -euo pipefail

# ──────────────────────────────────────────────
# Sync element templates to the Camunda Hub Catalog.
#
# Submits the full desired state of the Catalog to the ingestion endpoint as a
# multipart/form-data request. Each asset contributes one `template` part (the
# element template .json) and one `readme` part (the README.md). README files
# are paired with their template through the `template:` value in the README
# frontmatter, resolved relative to the README's directory.
#
# Required environment variables:
#   CAMUNDA_CONSOLE_CLIENT_ID
#   CAMUNDA_CONSOLE_CLIENT_SECRET
#   CAMUNDA_OAUTH_URL              token issuer (SaaS login or Management Identity)
#   CAMUNDA_CATALOG_BASE_URL       Web Modeler API base URL incl. version, e.g. .../api/v2
#
# Optional environment variables:
#   CAMUNDA_OAUTH_AUDIENCE         token audience (SaaS only; omit for Self-Managed)
# ──────────────────────────────────────────────

# --- Authenticate --------------------------------------------------------------

echo "Requesting access token from ${CAMUNDA_OAUTH_URL}..."

AUDIENCE_ARG=()
if [[ -n "${CAMUNDA_OAUTH_AUDIENCE:-}" ]]; then
  AUDIENCE_ARG=(--data-urlencode "audience=${CAMUNDA_OAUTH_AUDIENCE}")
fi

TOKEN_RESPONSE=$(curl --silent --fail --request POST "${CAMUNDA_OAUTH_URL}" \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'grant_type=client_credentials' \
  "${AUDIENCE_ARG[@]}" \
  --data-urlencode "client_id=${CAMUNDA_CONSOLE_CLIENT_ID}" \
  --data-urlencode "client_secret=${CAMUNDA_CONSOLE_CLIENT_SECRET}")

ACCESS_TOKEN=$(echo "${TOKEN_RESPONSE}" | jq -r '.access_token')

if [[ -z "${ACCESS_TOKEN}" || "${ACCESS_TOKEN}" == "null" ]]; then
  echo "Error: Failed to obtain access token."
  exit 1
fi

echo "Authentication successful."

# --- Discover assets and build the multipart request ---------------------------

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Each asset contributes a `template` and a `readme` part. The multipart filename
# carries the asset directory as a prefix (e.g. payment-connector/README.md) so
# that Hub can resolve the README's `template:` reference relative to that
# directory and pair the two parts.
FORM_ARGS=()
ASSET_COUNT=0

for asset_dir in "${REPO_ROOT}"/*/; do
  readme="${asset_dir}README.md"
  [[ -f "${readme}" ]] || continue

  # Each asset has exactly one element template .json file.
  json_file=$(ls "${asset_dir}"*.json 2>/dev/null | head -1 || true)
  [[ -n "${json_file}" ]] || continue

  asset_name=$(basename "${asset_dir}")
  json_base=$(basename "${json_file}")

  FORM_ARGS+=(-F "template=@${json_file};filename=${asset_name}/${json_base};type=application/json")
  FORM_ARGS+=(-F "readme=@${readme};filename=${asset_name}/README.md;type=text/markdown")
  ASSET_COUNT=$((ASSET_COUNT + 1))
done

if [[ ${ASSET_COUNT} -eq 0 ]]; then
  echo "No catalog assets found. Nothing to sync."
  exit 0
fi

echo "Found ${ASSET_COUNT} catalog asset(s). Submitting to Hub Catalog..."

# --- Submit to the ingestion endpoint ------------------------------------------

RESPONSE=$(curl --silent --write-out "\n%{http_code}" --request PUT \
  "${CAMUNDA_CATALOG_BASE_URL}/catalog/assets/ingestion" \
  --header "Authorization: Bearer ${ACCESS_TOKEN}" \
  "${FORM_ARGS[@]}")

HTTP_BODY=$(echo "${RESPONSE}" | sed '$d')
HTTP_STATUS=$(echo "${RESPONSE}" | tail -1)

if [[ "${HTTP_STATUS}" == "204" ]]; then
  echo "Catalog sync completed successfully (HTTP 204)."
else
  echo "Error: Catalog sync failed (HTTP ${HTTP_STATUS})."
  if [[ -n "${HTTP_BODY}" ]]; then
    echo ""
    echo "Response:"
    echo "${HTTP_BODY}" | jq '.' 2>/dev/null || echo "${HTTP_BODY}"
  fi
  exit 1
fi
