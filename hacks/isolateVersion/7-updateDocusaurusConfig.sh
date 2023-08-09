notify "Updating docusaurus.config.js..."

# Remove unused versionedLinks dependency
sed -i '' '/const versionedLinks/d' docusaurus.config.js

# Update `url` to include `unsupported`
sed -i '' -e "s/docs.camunda.io/unsupported.docs.camunda.io/" docusaurus.config.js

# Update `baseUrl` to specify isolated version
sed -i '' -e "s/baseUrl: \"\\/\"/baseUrl: \"\/$ARCHIVED_VERSION\/\"/" docusaurus.config.js

# Remove optimize docs plugin.
#   1. Find the block that starts with the plugin declaration, and the closing braces afterward, and delete it.
sed -i '' '/^      "@docusaurus\/plugin-content-docs"/,/^      },/d' docusaurus.config.js
#   2. Format the config file, to collapse the empty brackets left behind (e.g. `  [\n  ]` -> `  []`)
npx prettier --write docusaurus.config.js
#   3. Remove the empty array
sed -i '' '/^    \[\],/d' docusaurus.config.js

# Add `announcementBar` to `themeConfig`
#   Find the line containing `themeConfig` and append the new settings to it.
sed -i '' "/themeConfig/a\\
    announcementBar: {\\
      id: \"camunda8\",\\
      content:\\
        '🚨 This version of Camunda Platform 8 is no longer actively maintained. For up-to-date documentation, see <b><a target=\"_blank\" rel=\"noopener noreferrer\" href=\"https://docs.camunda.io\">the latest version</a></b>.',\\
      backgroundColor: \"#FFC600\",\\
      textColor: \"#434343\",\\
      isCloseable: false,\\
    },\\
" docusaurus.config.js

# Convert version dropdown in top nav to static version number
sed -i '' "s/docsVersionDropdown/docsVersion/" docusaurus.config.js

# Remove unused version dropdown configuration
#   Find the block starting with dropdownItemsAfter, and ending with the correctly-indented closing bracket, and delete the block.
sed -i '' '/dropdownItemsAfter/,/          ],/d' docusaurus.config.js

# Replace the `docs` block with one that limits to only the isolated version
sed -i '' "/^        docs: {/,/^        },/c\\
        docs: {\\
          lastVersion: \"$ARCHIVED_VERSION\",\\
          includeCurrentVersion: false,\\
          versions: {\\
            \"$ARCHIVED_VERSION\": {\\
              label: \"$ARCHIVED_VERSION\",\\
              path: \"/\",\\
              noIndex: true,\\
              banner: \"unmaintained\",\\
            },\\
          },\\
        },\\
" docusaurus.config.js

# Replace the `sitemap`` block with one that only specifies a blanket ignorePattern.
sed -i '' '/^        sitemap: {/,/^        },/c\
        sitemap: {\
          \/\/ exclude everything from sitemap\
          ignorePatterns: [\"**\"],\
        },\
' docusaurus.config.js

# git add docusaurus.config.js
# git commit -m "archiving: update docusaurus config"
