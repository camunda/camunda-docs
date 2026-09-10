const { makeServerDynamic } = require("../make-server-dynamic");
const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");
const { filterSaaSOnly } = require("./filter-saas-only");
const path = require("path");

function preGenerateDocs(config) {
  const specFilePath = config.specPath;
  const specDir = path.dirname(specFilePath);

  makeServerDynamic(specFilePath);
  filterSaaSOnly(specDir);
}

function postGenerateDocs(config) {
  removeDuplicateVersionBadge(`${config.outputDir}/hub-api.info.mdx`);
}

module.exports = {
  preGenerateDocs,
  postGenerateDocs,
};
