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
 * @property {Array<Version>} versions
 *
 * @typedef {object} Version
 * @property {string} name
 * @property {boolean} isLast
 * @property {string} path
 * @property {Array<Doc>} docs
 *
 * @typedef {object} Doc
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

  // const smol = allDocs[docs.pluginId].versions.map((x) => ({
  //   isLast: x.isLast,
  //   name: x.name,
  //   path: x.path,
  //   doc: x.docs.find((y) => y.id === unversionedId),
  // }));

  if (canonicalUrl) {
    if (
      // TODO: clean up this horrendous chaining mess with lodash.get() or similar
      currentPlugin &&
      currentPlugin.versions &&
      currentPlugin.versions.length &&
      currentPlugin.versions[0].docs
    ) {
      return canonicalUrl;
    }

    throw new Error(`Nonexistent canonicalUrl: ${canonicalUrl}.`);
  }

  if (currentDoc.frontMatter.canonicalUrl) {
    return currentDoc.frontMatter.canonicalUrl;
  }

  return "x";
}

module.exports = determineCanonical;
