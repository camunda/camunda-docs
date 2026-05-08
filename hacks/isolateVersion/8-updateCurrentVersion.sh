notify "Updating current version configuration..."

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/const currentVersion = \"[0-9]\.[0-9]\";/const currentVersion = \"$ARCHIVED_VERSION\";/" src/versions.js
else
  sed -i "s/const currentVersion = \"[0-9]\.[0-9]\";/const currentVersion = \"$ARCHIVED_VERSION\";/" src/versions.js
fi

git add src/versions.js
git commit -m "archiving($ARCHIVED_VERSION): configure current version"