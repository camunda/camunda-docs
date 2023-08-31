notify "Removing other versions from the manifests..."

# exclude all other versions from main version file
echo "[\"$ARCHIVED_VERSION\"]" > versions.json

git add versions.json
git commit -m "archiving($ARCHIVED_VERSION): exclude all other versions from the main version file"

# exclude all other versions from optimize version file
echo "[\"$ARCHIVED_OPTIMIZE_VERSION\"]" > optimize_versions.json

git add optimize_versions.json
git commit -m "archiving($ARCHIVED_VERSION): exclude all other versions from the optimize version file"
