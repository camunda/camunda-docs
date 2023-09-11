// @ts-check
// Note: these type definitions are only checked within an editor. We aren't set up
//   for type-checking in the build (yet!) but having these types defined helped me write this code.

/**
 * @typedef {object} FrontMatter
 * @property {string?} canonicalUrl
 *
 * @typedef {object} Doc
 * @property {FrontMatter} frontMatter
 */

// sjh - this is how to import the original type, if you need it later
// *  * @param {import("@docusaurus/theme-common/lib/internal").DocContextValue} doc

/**
 *  * @param {Doc} doc
 */
function determineCanonical(doc) {
  // const {
  //   metadata: {
  //     unversionedId,
  //     frontMatter: { canonicalUrl, canonicalId },
  //   },
  // } = doc;

  if (doc.frontMatter.canonicalUrl) {
    return doc.frontMatter.canonicalUrl;
  }

  return "x";
}

module.exports = determineCanonical;
