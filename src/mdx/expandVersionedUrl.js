// @ts-check

// Note: these type definitions are only checked within an editor. We aren't set up
//   for type-checking in the build (yet!) but having these types defined helped me write this code.
/**
 * @typedef {object} VersionMapping
 * @property {string} docsVersion
 * @property {string} optimizeVersion
 *
 * @typedef {object} Token
 * @property {string} token
 * @property {Array<TokenRule>} rules
 *
 * @typedef {object} TokenRule
 * @property {string} match
 * @property {string} expandTo
 */

/** @type {Array<VersionMapping>} */
const versionMappings = [
  // 👋 When cutting a new version, add a new mapping here!
  {
    docsVersion: "8.2",
    optimizeVersion: "3.10.0",
  },
  {
    docsVersion: "8.1",
    optimizeVersion: "3.9.0",
  },
  {
    docsVersion: "8.0",
    optimizeVersion: "3.8.0",
  },
  { docsVersion: "1.3", optimizeVersion: "3.7.0" },
];

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
