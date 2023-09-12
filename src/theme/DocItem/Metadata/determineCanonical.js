// @ts-check
// Note: these type definitions are only checked within an editor. We aren't set up
//   for type-checking in the build (yet!) but having these types defined helped me write this code.

/**
 * @typedef {object} CurrentDoc
 * @property {FrontMatter} frontMatter
 *
 * @typedef {object} FrontMatter
 * @property {string=} canonicalUrl
 * @property {string=} canonicalId
 */

/**
 * @typedef {object} CurrentVersion
 * @property {"default"|"optimize"} pluginId
 * @property {string} version
 */

/**
 * @typedef {object} CurrentPlugin
 * @property {"/docs"|"/optimize"} path
 * @property {Array<PluginVersion>} versions
 *
 * @typedef {object} PluginVersion
 * @property {string} name
 * @property {boolean} isLast
 * @property {string} path
 * @property {Array<PluginDoc>} docs
 *
 * @typedef {object} PluginDoc
 * @property {string} id
 * @property {string} path
 */

// sjh - this is how to import the original type, if you need it later
// *  * @param {import("@docusaurus/theme-common/lib/internal").DocContextValue} doc

/**
 *  * @param {CurrentDoc} currentDoc
 *  * @param {CurrentVersion} currentVersion
 *  * @param {CurrentPlugin} currentPlugin
 */
function determineCanonical(currentDoc, currentVersion, currentPlugin) {
  const {
    frontMatter: { canonicalUrl, canonicalId },
  } = currentDoc;

  if (canonicalUrl) {
    return determineCanonicalFromUrl(canonicalUrl, currentPlugin);
  }

  if (currentDoc.frontMatter.canonicalUrl) {
    return currentDoc.frontMatter.canonicalUrl;
  }

  return "x";
}

/**
 * @param {string} canonicalUrl
 * @param {CurrentPlugin} currentPlugin
 * @returns string
 */
function determineCanonicalFromUrl(canonicalUrl, currentPlugin) {
  const match = currentPlugin.versions
    .flatMap((version) => version.docs)
    .find((doc) => doc.path === canonicalUrl);

  if (match) {
    return canonicalUrl;
  }

  throw new Error(`Nonexistent canonicalUrl: ${canonicalUrl}.`);
}

module.exports = determineCanonical;
