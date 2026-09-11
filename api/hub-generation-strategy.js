const path = require("path");
const { makeServerDynamic } = require("./make-server-dynamic");
const removeDuplicateVersionBadge = require("./remove-duplicate-version-badge");
const { filterByAvailability } = require("./filter-availability");

function createHubGenerationStrategy(environment) {
  function preGenerateDocs(config) {
    const specFilePath = config.specPath;
    const specDir = path.dirname(specFilePath);

    makeServerDynamic(specFilePath);
    filterByAvailability(specDir, environment);
  }

  function postGenerateDocs(config) {
    removeDuplicateVersionBadge(`${config.outputDir}/hub-api.info.mdx`);
  }

  return { preGenerateDocs, postGenerateDocs };
}

module.exports = createHubGenerationStrategy;
