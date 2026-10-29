#!/bin/bash
set -euo pipefail

: "${GITHUB_APP_TOKEN:?Missing GITHUB_APP_TOKEN}"
: "${DRONE_PULL_REQUEST:?Missing DRONE_PULL_REQUEST}"
: "${DRONE_REPO:?Missing DRONE_REPO}"
: "${DRONE_BUILD_NUMBER:?Missing DRONE_BUILD_NUMBER}"
: "${DRONE_BUILD_LINK:?Missing DRONE_BUILD_LINK}"
test -s playwright-report/index.html || { echo "Missing Playwright HTML report"; exit 1; }

GH_API="https://api.github.com/repos/${DRONE_REPO}"
TAG_NAME="pr-${DRONE_PULL_REQUEST}-playwright-report"
REPORT_ARCHIVE="playwright-report-pr-${DRONE_PULL_REQUEST}-${DRONE_BUILD_NUMBER}.zip"
RESPONSE_FILE="$(mktemp)"
trap 'rm -f "$RESPONSE_FILE" "$REPORT_ARCHIVE"' EXIT

zip -qr "$REPORT_ARCHIVE" playwright-report
http_code="$(curl -sS -o "$RESPONSE_FILE" -w '%{http_code}' \
  -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  "${GH_API}/releases/tags/${TAG_NAME}")"
if [ "$http_code" = "404" ]; then
  http_code="$(curl -sS -o "$RESPONSE_FILE" -w '%{http_code}' -X POST \
    -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "${GH_API}/releases" \
    -d "$(jq -n --arg tag "$TAG_NAME" --arg name "Playwright Report PR #${DRONE_PULL_REQUEST}" \
      '{tag_name:$tag,name:$name,prerelease:true,draft:false}')")"
fi
if [[ ! "$http_code" =~ ^2 ]]; then
  echo "Failed to fetch or create report release (HTTP ${http_code})"
  cat "$RESPONSE_FILE"
  exit 1
fi
RELEASE_ID="$(jq -er '.id | select(type == "number")' "$RESPONSE_FILE")"

# Remove an asset with the same build name so a retry can upload it again.
ASSET_IDS="$(jq -r --arg name "$REPORT_ARCHIVE" '.assets | if type == "array" then .[] | select(.name == $name) | .id else error("Invalid release assets") end' "$RESPONSE_FILE")"
while read -r asset_id; do
  [ -n "$asset_id" ] || continue
  curl -fsS -X DELETE -o /dev/null \
    -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "${GH_API}/releases/assets/${asset_id}"
done <<< "$ASSET_IDS"

curl -fsS -o "$RESPONSE_FILE" -X POST \
  -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/zip" \
  --data-binary @"${REPORT_ARCHIVE}" \
  "https://uploads.github.com/repos/${DRONE_REPO}/releases/${RELEASE_ID}/assets?name=${REPORT_ARCHIVE}"
DOWNLOAD_URL="$(jq -er '.browser_download_url | select(type == "string" and length > 0)' "$RESPONSE_FILE")"

COMMENT_BODY="$(printf '<!-- playwright-report -->\nPlaywright HTML report for this PR build: %s\n\nDrone build: %s' "$DOWNLOAD_URL" "$DRONE_BUILD_LINK")"
COMMENT_ID=""
page=1
while :; do
  curl -fsS -o "$RESPONSE_FILE" \
    -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    "${GH_API}/issues/${DRONE_PULL_REQUEST}/comments?per_page=100&page=${page}"
  COMMENT_ID="$(jq -r '[.[] | select(.user.type == "Bot" and (.body | startswith("<!-- playwright-report -->")))][0].id // empty' "$RESPONSE_FILE")"
  [ -z "$COMMENT_ID" ] || break
  [ "$(jq 'length' "$RESPONSE_FILE")" -eq 100 ] || break
  page=$((page + 1))
done

if [ -n "$COMMENT_ID" ]; then
  comment_url="${GH_API}/issues/comments/${COMMENT_ID}"
  method=PATCH
else
  comment_url="${GH_API}/issues/${DRONE_PULL_REQUEST}/comments"
  method=POST
fi
curl -fsS -o "$RESPONSE_FILE" -X "$method" \
  -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  "$comment_url" -d "$(jq -n --arg body "$COMMENT_BODY" '{body:$body}')"
jq -er '.html_url | select(type == "string" and length > 0)' "$RESPONSE_FILE"
echo "Uploaded report asset: ${DOWNLOAD_URL}"
