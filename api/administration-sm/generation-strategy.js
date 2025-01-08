const { makeServerDynamic } = require("../make-server-dynamic");
const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");

const outputDir = "docs/apis-tools/administration-sm-api/specifications";
const specFile = "api/administration-sm/administration-sm-openapi.yaml";

function preGenerateDocs() {
  makeServerDynamic(specFile);
}

function postGenerateDocs() {
  removeDuplicateVersionBadge(
    `${outputDir}/administration-api-self-managed.info.mdx`
  );
}

module.exports = {
  outputDir,
  preGenerateDocs,
  postGenerateDocs,
};
