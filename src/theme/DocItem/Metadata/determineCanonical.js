// @ts-check
// Note: these type definitions are only checked within an editor. We aren't set up
//   for type-checking in the build (yet!) but having these types defined helped me write this code.

/**
 * @typedef {object} CurrentDoc
 * @property {FrontMatter} frontMatter
 * @property {Metadata} metadata
 *
 * @typedef {object} FrontMatter
 * @property {string=} canonicalUrl
 * @property {string=} canonicalId
 *
 * @typedef {object} Metadata
 * @property {string=} unversionedId
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

  if (canonicalId) {
    return determineCanonicalFromId(canonicalId, currentPlugin);
  }

  return determineCanonicalFromDoc(currentDoc, currentPlugin);
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

  throw new Error(`canonicalUrl does not exist: ${canonicalUrl}.`);
}

/**
 * @param {string} canonicalId
 * @param {CurrentPlugin} currentPlugin
 * @returns string
 */
function determineCanonicalFromId(canonicalId, currentPlugin) {
  const match = currentPlugin.versions
    .find((x) => x.isLast)
    ?.docs.find((doc) => doc.id === canonicalId);

  if (match) {
    return match.path;
  }

  throw new Error(
    `canonicalId does not exist in latest version: ${canonicalId}.`
  );
}

/**
 * @param {CurrentDoc} currentDoc
 * @param {CurrentPlugin} currentPlugin
 * @returns string
 */
function determineCanonicalFromDoc(currentDoc, currentPlugin) {
  const {
    metadata: { unversionedId },
  } = currentDoc;

  const match = currentPlugin.versions
    .flatMap((x) => x.docs)
    .find((doc) => doc.id === unversionedId);

  return match?.path || "not found";
}

module.exports = determineCanonical;
