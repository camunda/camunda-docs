// @ts-check

// Note: these type definitions are only checked within an editor.
/**
 * @typedef {object} VersionConfig
 * @property {string} version
 * @property {string} source
 * @property {Array<string>} suggestions
 *
 * @typedef {object} SuggestedChanges
 * @property {string} source
 * @property {string} suggestion
 * @property {Array<string>} files
 */

/**
 *
 * @param {Array<VersionConfig>} versionConfig
 * @param {Array<string>} changedFiles
 * @returns {Array<SuggestedChanges>}
 */
function identifyMissingChanges(versionConfig, changedFiles) {
  /** @type {Array<SuggestedChanges>} */
  const missingSuggestions = [];

  versionConfig.forEach(({ source, suggestions }) => {
    if (!source.endsWith("/")) {
      throw new Error(`Version source must end with a slash: ${source}`);
    }

    const thisVersionsChanges = changedFiles
      .filter((x) => x.startsWith(source))
      .map((x) => x.replace(source, ""));

    suggestions.forEach((suggestion) => {
      const unmatchedFiles = thisVersionsChanges.filter((file) => {
        return !changedFiles.includes(suggestion + file);
      });

      if (unmatchedFiles.length > 0) {
        missingSuggestions.push({
          source,
          suggestion,
          files: unmatchedFiles,
        });
      }
    });
  });

  return missingSuggestions;
}

module.exports = { identifyMissingChanges };
