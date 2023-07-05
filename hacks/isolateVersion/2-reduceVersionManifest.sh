notify "Removing other versions from the manifest..."

# exclude all other versions from version file
echo "[\"$ARCHIVED_VERSION\"]" > versions.json

git add versions.json
git commit -m "archiving: exclude all other versions from the version file"
