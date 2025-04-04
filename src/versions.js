// @ts-check

// Note: these type definitions are only checked within an editor. We aren't set up
//   for type-checking in the build (yet!) but having these types defined helped me write this code.
/**
 * @typedef {object} UnsupportedVersion
 * @property {string} label
 * @property {string} urlSuffix
 */

const currentVersion = "8.7";

/** @type {Array<UnsupportedVersion>} */
const unsupportedVersions = [
  // 👋 When archiving a version, move it from the above array into here, and edit it!
  //   `label` appears in the top navbar version selector.
  //   `urlSuffix` gets appended to the target `unsupported.docs.camunda.io/` URL.
  { label: "8.2 / 3.10.0", urlSuffix: "8.2" },
  { label: "8.1 / 3.9.0", urlSuffix: "8.1" },
  { label: "8.0 / 3.8.0", urlSuffix: "8.0" },
  { label: "1.3 / 3.7.0", urlSuffix: "1.3" },
  { label: "1.2", urlSuffix: "1.2" },
  { label: "1.1", urlSuffix: "1.1" },
  { label: "1.0", urlSuffix: "1.0" },
  { label: "0.26", urlSuffix: "0.26" },
  { label: "0.25", urlSuffix: "0.25" },
];

module.exports = {
  currentVersion,
  unsupportedVersions,
};
