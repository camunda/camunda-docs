notify "Updating docusaurus.config.js..."

# Update `url` to include `unsupported`
#  Note that this introduces one line that reads "unsupported.unsupported.docs.camunda.io" but that line gets removed in a later step.
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/docs.camunda.io/unsupported.docs.camunda.io/" docusaurus.config.js
else
  sed -i "s/docs.camunda.io/unsupported.docs.camunda.io/" docusaurus.config.js
fi

# Update footer social icons based on the new baseUrl
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/src= \"\/img\//src=\"\/$ARCHIVED_VERSION\/img\//g" docusaurus.config.js
else
  sed -i "s/src= \"\/img\//src=\"\/$ARCHIVED_VERSION\/img\//g" docusaurus.config.js
fi

# Update announcement bar to show a version warning.
#   Find the announcementBar block and replace it with a new one.
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "/announcementBar: {/,/    },/c\\
      announcementBar: {\\
        id: \"camunda8\",\\
        content:\\
          '🚨 This version of Camunda 8 is no longer actively maintained. For up-to-date documentation, see <b><a target=\"_blank\" rel=\"noopener noreferrer\" href=\"https://docs.camunda.io\">the latest version</a></b>.',\\
        backgroundColor: \"#FFC600\",\\
        textColor: \"#434343\",\\
        isCloseable: false,\\
      },\\
  " docusaurus.config.js
else
  sed -i "/announcementBar: {/,/    },/c\\
      announcementBar: {\\
        id: \"camunda8\",\\
        content:\\
          '🚨 This version of Camunda 8 is no longer actively maintained. For up-to-date documentation, see <b><a target=\"_blank\" rel=\"noopener noreferrer\" href=\"https://docs.camunda.io\">the latest version</a></b>.',\\
        backgroundColor: \"#FFC600\",\\
        textColor: \"#434343\",\\
        isCloseable: false,\\
      },\\
  " docusaurus.config.js
fi

# Convert version dropdown in top nav to static version number
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/docsVersionDropdown/docsVersion/" docusaurus.config.js
else
  sed -i "s/docsVersionDropdown/docsVersion/" docusaurus.config.js
fi

# Remove unused version dropdown configuration
#   Find the block starting with dropdownItemsAfter, and ending with the correctly-indented closing bracket, and delete the block.
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' '/dropdownItemsAfter/,/          ],/d' docusaurus.config.js
else
  sed -i '/dropdownItemsAfter/,/          ],/d' docusaurus.config.js
fi

# Remove the Search experience, by removing Algolia configuration
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' '/algolia: {/,/    },/d' docusaurus.config.js
else
  sed -i '/algolia: {/,/    },/d' docusaurus.config.js
fi

# Replace the `docs` block with one that limits to only the isolated version
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "/^        docs: {/,/^        },/c\\
        docs: {\\
          lastVersion: currentVersion,\\
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
else
  sed -i "/^        docs: {/,/^        },/c\\
        docs: {\\
          lastVersion: currentVersion,\\
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
fi

# Replace the `sitemap`` block with one that only specifies a blanket ignorePattern.
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' '/^        sitemap: {/,/^        },/c\
        sitemap: {\
          \/\/ exclude everything from sitemap\
          ignorePatterns: [\"**\"],\
        },\
' docusaurus.config.js
else
  sed -i '/^        sitemap: {/,/^        },/c\
        sitemap: {\
          \/\/ exclude everything from sitemap\
          ignorePatterns: [\"**\"],\
        },\
' docusaurus.config.js
fi

git add docusaurus.config.js
git commit -m "archiving($ARCHIVED_VERSION): update docusaurus config"
