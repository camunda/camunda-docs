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
  const results = versionConfig.map((version) => {
    const { source, suggestions } = version;

    const sourceFiles = changedFiles.filter((x) => x.startsWith(source));

    const unmatchedFiles = sourceFiles.filter((file) => {
      const subpath = file.replace(source, "");

      return !changedFiles.includes(suggestions[0] + subpath);
    });

    return {
      source,
      files: unmatchedFiles.map((x) => x.replace(source, "")),
      suggestion: suggestions[0],
    };
  });

  return results.filter((x) => x.files.length > 0);
}

module.exports = { identifyMissingChanges };
