const { makeServerDynamic } = require("../make-server-dynamic");
const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");

const outputDir = "docs/apis-tools/operate-api/specifications";
const specFile = "api/operate/operate-openapi.yaml";

function preGenerateDocs() {
  makeServerDynamic(specFile);
}

function postGenerateDocs() {
  removeDuplicateVersionBadge(`${outputDir}/operate-public-api.info.mdx`);
}

module.exports = {
  outputDir,
  preGenerateDocs,
  postGenerateDocs,
};
