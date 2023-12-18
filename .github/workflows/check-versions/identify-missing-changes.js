// @ts-check

// Note: these type definitions are only checked within an editor.
/**
 * @typedef {object} VersionConfig
 * @property {string} version
 * @property {string} source
 * @property {Array<string>} suggestions
 */

/**
 *
 * @param {Array<VersionConfig>} versionConfig
 * @param {Array<string>} changedFiles
 * @returns
 */
function identifyMissingChanges(versionConfig, changedFiles) {
  const results = versionConfig.map((version) => {
    const { source, suggestions } = version;

    const matches = changedFiles.filter((x) => x.startsWith(source));

    return {
      source,
      matches,
    };
  });

  return results;
}

module.exports = { identifyMissingChanges };
