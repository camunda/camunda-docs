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
    docsVersion: "8.3",
    optimizeVersion: "3.11.0",
  },
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
  {
    docsVersion: "1.3",
    optimizeVersion: "3.7.0",
  },
];

/** @type {Array<UnsupportedVersion>} */
const unsupportedVersions = [
  // 👋 When archiving a version, move it from the above array into here, and edit it!
  { label: "1.2", urlSuffix: "1.2" },
  { label: "1.1", urlSuffix: "1.1" },
  { label: "1.0", urlSuffix: "1.0" },
  { label: "0.26", urlSuffix: "0.26" },
  { label: "0.25", urlSuffix: "0.25" },
];

module.exports = {
  versionMappings,
  unsupportedVersions,
};
