notify "Updating docusaurus.config.js..."

# Update `url` to include `unsupported`
sed -i '' "s/docs.camunda.io/unsupported.docs.camunda.io/" docusaurus.config.js

# Update `baseUrl` to specify isolated version
sed -i '' "s/baseUrl: \"\\/\"/baseUrl: \"\/$ARCHIVED_VERSION\/\"/" docusaurus.config.js

# Update footer social icons based on the new baseUrl
sed -i '' "s/src= \"\/img\//src=\"\/$ARCHIVED_VERSION\/img\//g" docusaurus.config.js

# Update announcment bar to show a version warning.
#   Find the announcementBar block and replace it with a new one.
sed -i '' "/announcementBar: {/,/    },/c\\
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

# Remove the Search experience, by removing Algolia configuration
sed -i '' '/algolia: {/,/    },/d' docusaurus.config.js

# Replace the `docs` block with one that limits to only the isolated version
sed -i '' "/^        docs: {/,/^        },/c\\
        docs: {\\
          lastVersion: \"$ARCHIVED_VERSION\",\\
          includeCurrentVersion: false,\\
          beforeDefaultRemarkPlugins: [versionedLinks],\\
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

git add docusaurus.config.js
git commit -m "archiving($ARCHIVED_VERSION): update docusaurus config"
