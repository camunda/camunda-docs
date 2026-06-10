const { makeServerDynamic } = require("../make-server-dynamic");
const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");

function preGenerateDocs(config) {
  makeServerDynamic(config.specPath);
}

function postGenerateDocs(config) {
  removeDuplicateVersionBadge(
    `${config.outputDir}/hub-public-api-v-2.info.mdx`
  );
}

module.exports = {
  preGenerateDocs,
  postGenerateDocs,
};
