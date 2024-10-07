#!/bin/bash   
set -e

# Before running this script make sure these versions are correct!
NEW_DOCS_VERSION="8.6"
PREVIOUS_DOCS_VERSION="8.5"
NEW_OPTIMIZE_VERSION="3.14.0"
PREVIOUS_OPTIMIZE_VERSION="3.13.0"

echo "1/6 Creating version $NEW_DOCS_VERSION of main docs..."
npm run docusaurus docs:version $NEW_DOCS_VERSION

echo "2/6 Creating version $NEW_OPTIMIZE_VERSION of Optimize docs..."
npm run docusaurus docs:version:optimize $NEW_OPTIMIZE_VERSION

echo "3/6 Correcting sidebars files of new versions..."
sed -i '' 's/\"href\": \"\/optimize\/next\//\"href\": \"\/optimize\//g' versioned_sidebars/version-$NEW_DOCS_VERSION-sidebars.json
sed -i '' 's/\"href\": \"\/docs\/next\//\"href\": \"\/docs\//g' optimize_versioned_sidebars/version-$NEW_OPTIMIZE_VERSION-sidebars.json

echo "4/6 Correcting sidebars files of previous versions..."
sed -i '' "s/\"href\": \"\/optimize\//\"href\": \"\/optimize\/${PREVIOUS_OPTIMIZE_VERSION}\//g" versioned_sidebars/version-$PREVIOUS_DOCS_VERSION-sidebars.json
sed -i '' "s/\"href\": \"\/docs\//\"href\": \"\/docs\/${PREVIOUS_DOCS_VERSION}\//g" optimize_versioned_sidebars/version-$PREVIOUS_OPTIMIZE_VERSION-sidebars.json

# commit the big stuff first, so that we can split into two PRs -- a big one, and a reviewable one.
git add versioned_docs versioned_sidebars optimize_versioned_docs optimize_versioned_sidebars
git commit -m "release: the big commit"

# now start committing the small stuff
# if there are uncommitted changes to this file, commit it:
if [ -n "$(git status --porcelain ./hacks/cutNewVersions.sh)" ]; then
  git add ./hacks/cutNewVersions.sh
  git commit -m "chore: update versions in cutNewVersions.sh"
fi

git add versions.json optimize_versions.json
git commit -m "release: new version numbers"

echo "5/6 Correcting current-version redirects..."
sed -i '' "s/docs\/${PREVIOUS_DOCS_VERSION}\/(\.\*)/docs\/${NEW_DOCS_VERSION}\/(\.\*)/" ./static/.htaccess
sed -i '' "s/optimize\/${PREVIOUS_OPTIMIZE_VERSION}\/(\.\*)/optimize\/${NEW_OPTIMIZE_VERSION}\/(\.\*)/" ./static/.htaccess

git add ./static/.htaccess
git commit -m "release: new version numbers for content redirects"

echo "6/6 Correcting check-versions workflow configuration..."
sed -i '' "s/${PREVIOUS_DOCS_VERSION}/${NEW_DOCS_VERSION}/" ./.github/workflows/check-versions/version-config.json
sed -i '' "s/${PREVIOUS_OPTIMIZE_VERSION}/${NEW_OPTIMIZE_VERSION}/" ./.github/workflows/check-versions/version-config.json

git add ./.github/workflows/check-versions/version-config.json
git commit -m "release: new version numbers in check-versions workflow"

echo "🎉 Automated steps are complete! Next steps:"
echo "  1. Continue the manual steps defined in howtos/release-procedure.md."
echo "  2. Open a PR with only the first commit in this branch. It's a big one, and reviewing it will crash your browser!"
echo "  3. Open a second PR, into the first PR, with the remaining commits on this branch. These are all the reviewable changes."