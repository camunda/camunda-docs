notify "Configuring Optimize docs instance..."

# Edit the optimize docs plugin config to limit to only the isolated optimize version
sed -i '' "/^        routeBasePath: \"optimize\"/,/^      },/c\\
        routeBasePath: \"optimize\",\\
        beforeDefaultRemarkPlugins: [versionedLinks],\\
        lastVersion: \"$ARCHIVED_OPTIMIZE_VERSION\",\\
        includeCurrentVersion: false,\\
        versions: {\\
          \"$ARCHIVED_OPTIMIZE_VERSION\": {\\
            label: \"$ARCHIVED_OPTIMIZE_VERSION\",\\
            path: \"/\",\\
            noIndex: true,\\
            banner: \"unmaintained\",\\
          },\\
        },\\
      },\\
" docusaurus.config.js

# remove other versions from versionedLinks markdown plugin
#   replace the existing versionMappings array with an array that 
#   includes only the archived versions.
sed -i '' "/^const versionMappings = \[$/,/\];/c\\
const versionMappings = [\\
  { docsVersion: \"$ARCHIVED_VERSION\", optimizeVersion: \"$ARCHIVED_OPTIMIZE_VERSION\" },\\
];\\
" src/versions.js

# remove hard-coded versions from main docs sidebar configuration
sed -i '' "s/optimize\/$ARCHIVED_OPTIMIZE_VERSION\//optimize\//g" versioned_sidebars/version-$ARCHIVED_VERSION-sidebars.json

# remove hard-coded versions from optimize docs sidebar configuration
sed -i '' "s/docs\/$ARCHIVED_VERSION\//docs\//g" optimize_versioned_sidebars/version-$ARCHIVED_OPTIMIZE_VERSION-sidebars.json

git add docusaurus.config.js src/mdx versioned_sidebars optimize_versioned_sidebars
git commit -m "archiving($ARCHIVED_VERSION): configure Optimize docs instance"