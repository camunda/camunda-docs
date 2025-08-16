const fs = require("fs");
const metadataNext = require("./spring-configuration-metadata.json");
const metadataForVersion = {};

function getOutputDir(version) {
  if (version === undefined) {
    return "docs/apis-tools/spring-zeebe-sdk";
  } else {
    return `versioned_docs/version-${version}/apis-tools/spring-zeebe-sdk`;
  }
}
const getMetadata = (version) => {
  if (version === undefined) {
    return metadataNext;
  } else {
    return metadataForVersion[version];
  }
};
const getFilename = (version) => {
  return "properties-reference.md";
};
const preGenerateDocs = async (generationConfig) => {};
const postGenerateDocs = async (generationConfig) => {};

module.exports = {
  getOutputDir,
  getMetadata,
  getFilename,
  preGenerateDocs,
  postGenerateDocs,
};
