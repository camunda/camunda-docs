// @ts-check

// Note: these type definitions are only checked within an editor. We aren't set up
//   for type-checking in the build (yet!) but having these types defined helped me write this code.
/**
 * @typedef {object} VersionMapping
 * @property {string} docsVersion
 * @property {string} optimizeVersion
 *
 * @typedef {object} UnsupportedVersion
 * @property {string} label
 * @property {string} urlSuffix
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
];

module.exports = {
  versionMappings,
};
