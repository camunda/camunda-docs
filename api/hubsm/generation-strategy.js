const { makeServerDynamic } = require("../make-server-dynamic");
const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");
const { filterSelfManagedOnly } = require("./filter-sm-only");
const path = require("path");

function preGenerateDocs(config) {
  const specFilePath = config.specPath;
  const specDir = path.dirname(specFilePath);

  makeServerDynamic(specFilePath);
  filterSelfManagedOnly(specDir);
}

function postGenerateDocs(config) {
  removeDuplicateVersionBadge(`${config.outputDir}/hub-api.info.mdx`);
}

module.exports = {
  preGenerateDocs,
  postGenerateDocs,
};
