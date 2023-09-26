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
 * @property {string=} permalink
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
 *  * @param {CurrentPlugin} currentPlugin
 */
function determineCanonical(currentDoc, currentPlugin) {
  const {
    frontMatter: { canonicalUrl, canonicalId },
  } = currentDoc;

  let result;

  if (canonicalUrl) {
    result = determineCanonicalFromUrl(canonicalUrl, currentPlugin);
  } else if (canonicalId) {
    result = determineCanonicalFromId(canonicalId, currentPlugin);
  } else {
    result = determineCanonicalFromDoc(currentDoc, currentPlugin);
  }

  // Trim trailing slashes. Most docs don't contain them, but occasionally we specify a slug that ends in a slash.
  return result?.replace(/\/+$/, "");
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
    metadata: { unversionedId, permalink },
  } = currentDoc;

  const match = currentPlugin.versions
    .filter((x) => x.name !== "current") // exclude `next`
    .flatMap((x) => x.docs)
    .find((doc) => doc.id === unversionedId);

  if (match) {
    if (/(optimize|docs)((next|[0-9\.]*)\/)/.test(match.path)) {
      // This finds docs whose matches are non-latest versions.
      //  These docs would probably benefit from adding canonical frontmatter.
      console.log(
        `WARN(canonicals): document at ${permalink} points canonical at non-latest version ${match.path}`
      );
    }

    return match.path;
  }

  return permalink;
}

module.exports = determineCanonical;
