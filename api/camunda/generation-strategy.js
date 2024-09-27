const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");
// const replace = require("replace-in-file");
const outputDir = "docs/apis-tools/camunda-api-rest/specifications";
// const specFile = "api/camunda/camunda-openapi.yaml";

function preGenerateDocs() {}

function postGenerateDocs() {
  removeDuplicateVersionBadge(`${outputDir}/camunda-8-rest-api.info.mdx`);
}

module.exports = {
  outputDir,
  preGenerateDocs,
  postGenerateDocs,
};
