notify "Updating current version configuration..."

sed -i '' "s/const currentVersion = \"[0-9]\.[0-9]\";/const currentVersion = \"$ARCHIVED_VERSION\";/" src/versions.js

git add src/versions.js
git commit -m "archiving($ARCHIVED_VERSION): configure current version"