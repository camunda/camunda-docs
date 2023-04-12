#!/bin/bash   
set -e

# Before running this script make sure these versions are correct!
NEW_DOCS_VERSION="8.2"
PREVIOUS_DOCS_VERSION="8.1"
NEW_OPTIMIZE_VERSION="3.10.0"
PREVIOUS_OPTIMIZE_VERSION="3.9.0"

echo "1/4 Creating version $NEW_DOCS_VERSION of main docs..."
npm run docusaurus docs:version $NEW_DOCS_VERSION

echo "2/4 Creating version $NEW_OPTIMIZE_VERSION of Optimize docs..."
npm run docusaurus docs:version:optimize $NEW_OPTIMIZE_VERSION

echo "3/4 Correcting sidebars files of new versions..."
sed -i '' 's/\"href\": \"\/optimize\/next\//\"href\": \"\/optimize\//g' versioned_sidebars/version-$NEW_DOCS_VERSION-sidebars.json
sed -i '' 's/\"href\": \"\/docs\/next\//\"href\": \"\/docs\//g' optimize_versioned_sidebars/version-$NEW_OPTIMIZE_VERSION-sidebars.json

echo "4/4 Correcting sidebars files of previous versions..."
sed -i '' "s/\"href\": \"\/optimize\//\"href\": \"\/optimize\/${PREVIOUS_OPTIMIZE_VERSION}\//g" versioned_sidebars/version-$PREVIOUS_DOCS_VERSION-sidebars.json
sed -i '' "s/\"href\": \"\/docs\//\"href\": \"\/docs\/${PREVIOUS_DOCS_VERSION}\//g" optimize_versioned_sidebars/version-$PREVIOUS_OPTIMIZE_VERSION-sidebars.json

