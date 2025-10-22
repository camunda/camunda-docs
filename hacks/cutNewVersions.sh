#!/bin/bash   
set -e

# Before running this script make sure these versions are correct!
NEW_DOCS_VERSION="8.8"
PREVIOUS_DOCS_VERSION="8.7"
NEW_NEXT_DOCS_VERSION="8.9"

echo "1/4 Creating version $NEW_DOCS_VERSION of main docs..."
npm run docusaurus docs:version $NEW_DOCS_VERSION

# commit the big stuff first, so that we can split into two PRs -- a big one, and a reviewable one.
git add versioned_docs versioned_sidebars
git commit -m "release: the big commit"

# now start committing the small stuff
# if there are uncommitted changes to this file, commit it:
if [ -n "$(git status --porcelain ./hacks/cutNewVersions.sh)" ]; then
  git add ./hacks/cutNewVersions.sh
  git commit -m "chore: update versions in cutNewVersions.sh"
fi

git add versions.json
git commit -m "release: new version number for versions.json"

echo "2/4 Correcting versions.js..."
sed -i '' "s/${PREVIOUS_DOCS_VERSION}/${NEW_DOCS_VERSION}/" ./src/versions.js

git add ./src/versions.js
git commit -m "release: new version number for src/versions.js"

echo "3/4 Correcting current-version redirects..."
sed -i '' "s/docs\/${NEW_DOCS_VERSION}\/(\.\*)/docs\/${NEW_NEXT_DOCS_VERSION}\/(\.\*)/" ./static/.htaccess
sed -i '' "s/docs\/${PREVIOUS_DOCS_VERSION}\/(\.\*)/docs\/${NEW_DOCS_VERSION}\/(\.\*)/" ./static/.htaccess

git add ./static/.htaccess
git commit -m "release: new version numbers for content redirects"

echo "4/4 Correcting check-versions workflow configuration..."
sed -i '' "s/${NEW_DOCS_VERSION}/${NEW_NEXT_DOCS_VERSION}/" ./.github/workflows/check-versions/version-config.json
sed -i '' "s/${PREVIOUS_DOCS_VERSION}/${NEW_DOCS_VERSION}/" ./.github/workflows/check-versions/version-config.json

git add ./.github/workflows/check-versions/version-config.json
git commit -m "release: new version numbers in check-versions workflow"

echo "🎉 Automated steps are complete! Next steps:"
echo "  1. Continue the manual steps defined in howtos/release-procedure.md."
echo "  2. Open a PR with only the first commit in this branch. It's a big one, and reviewing it will crash your browser!"
echo "  3. Open a second PR, into the first PR, with the remaining commits on this branch. These are all the reviewable changes."