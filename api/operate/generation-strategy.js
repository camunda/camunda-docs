const { makeServerDynamic } = require("../make-server-dynamic");
const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");

function preGenerateDocs(config) {
  makeServerDynamic(config.specPath);
}

function postGenerateDocs(config) {
  removeDuplicateVersionBadge(
    `${config.outputDir}/operate-public-api.info.mdx`
  );
}

module.exports = {
  preGenerateDocs,
  postGenerateDocs,
};
