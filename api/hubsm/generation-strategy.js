const { makeServerDynamic } = require("../make-server-dynamic");
const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");
const { filterByAvailability } = require("../filter-availability");
const path = require("path");

function preGenerateDocs(config) {
  const specFilePath = config.specPath;
  const specDir = path.dirname(specFilePath);

  makeServerDynamic(specFilePath);
  filterByAvailability(specDir, "sm");
}

function postGenerateDocs(config) {
  removeDuplicateVersionBadge(`${config.outputDir}/hub-api.info.mdx`);
}

module.exports = {
  preGenerateDocs,
  postGenerateDocs,
};
