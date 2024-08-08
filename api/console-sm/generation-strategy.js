const { makeServerDynamic } = require("../make-server-dynamic");
const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");

const outputDir = "docs/apis-tools/console-sm-api/specifications";
const specFile = "api/console-sm/console-sm-openapi.yaml";

function preGenerateDocs() {
  makeServerDynamic(specFile);
}

function postGenerateDocs() {
  removeDuplicateVersionBadge(`${outputDir}/console-sm-admin-api.info.mdx`);
}

module.exports = {
  outputDir,
  preGenerateDocs,
  postGenerateDocs,
};
