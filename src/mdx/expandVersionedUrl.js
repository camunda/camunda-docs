// @ts-check

// Note: these type definitions are only checked within an editor. We aren't set up
//   for type-checking in the build (yet!) but having these types defined helped me write this code.
/**
 * @typedef {object} Token
 * @property {string} token
 * @property {Array<TokenRule>} rules
 *
 * @typedef {object} TokenRule
 * @property {string} match
 * @property {string} expandTo
 */

const { versionMappings } = require("../versions.js");
const [currentVersions, ...remainingVersions] = versionMappings;

/** @type {Token} */
const docsToken = {
  token: "$docs$",
  rules: [
    { match: "/optimize/", expandTo: "/docs/next" },
    {
      match: `/optimize_versioned_docs/version-${currentVersions.optimizeVersion}`,
      expandTo: "/docs",
    },
    ...remainingVersions.map((version) => {
      return {
        match: `/optimize_versioned_docs/version-${version.optimizeVersion}/`,
        expandTo: `/docs/${version.docsVersion}`,
      };
    }),
  ],
};

/** @type {Token} */
const optimizeToken = {
  token: "$optimize$",
  rules: [
    { match: "/docs/", expandTo: "/optimize/next" },
    {
      match: `/versioned_docs/version-${currentVersions.docsVersion}`,
      expandTo: "/optimize",
    },
    ...remainingVersions.map((version) => {
      return {
        match: `/versioned_docs/version-${version.docsVersion}/`,
        expandTo: `/optimize/${version.optimizeVersion}`,
      };
    }),
  ],
};

const tokens = [docsToken, optimizeToken];

function expandVersionedUrl(targetUrl, sourcePath) {
  let expandedUrl = targetUrl;

  const matchedToken = tokens.find((token) =>
    expandedUrl.includes(token.token)
  );
  if (matchedToken) {
    const { token, rules } = matchedToken;
    rules.forEach(({ match, expandTo }) => {
      if (sourcePath.includes(match)) {
        expandedUrl = targetUrl.replace(token, expandTo);
      }
    });
  }

  return expandedUrl;
}

module.exports = expandVersionedUrl;
