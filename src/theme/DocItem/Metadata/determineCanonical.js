// @ts-check
// Note: these type definitions are only checked within an editor. We aren't set up
//   for type-checking in the build (yet!) but having these types defined helped me write this code.

/**
 * @typedef {object} FrontMatter
 * @property {string?} canonicalUrl
 *
 * @typedef {object} CurrentDoc
 * @property {FrontMatter} frontMatter
 *
 *
 * @typedef {object} CurrentVersion
 * @property {string} pluginId
 * @property {string} version
 *
 *
 * @typedef {object} Doc
 * @property {string} id
 * @property {string} path
 *
 * @typedef {object} Version
 * @property {string} name
 * @property {boolean} isLast
 * @property {string} path
 * @property {Array<Doc>} docs
 *
 * @typedef {object} DocsPlugin
 * @property {string} path
 * @property {Array<Version>} versions
 */

// sjh - this is how to import the original type, if you need it later
// *  * @param {import("@docusaurus/theme-common/lib/internal").DocContextValue} doc

/**
 *  * @param {CurrentDoc} currentDoc
 *  * @param {CurrentVersion} currentVersion
 *  * @param {DocsPlugin} currentPlugin
 */
function determineCanonical(currentDoc, currentVersion, currentPlugin) {
  // const {
  //   metadata: {
  //     unversionedId,
  //     frontMatter: { canonicalUrl, canonicalId },
  //   },
  // } = doc;

  // const smol = allDocs[docs.pluginId].versions.map((x) => ({
  //   isLast: x.isLast,
  //   name: x.name,
  //   path: x.path,
  //   doc: x.docs.find((y) => y.id === unversionedId),
  // }));

  if (currentDoc.frontMatter.canonicalUrl) {
    return currentDoc.frontMatter.canonicalUrl;
  }

  return "x";
}

module.exports = determineCanonical;
