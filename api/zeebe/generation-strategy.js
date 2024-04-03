const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");

const outputDir = "docs/apis-tools/zeebe-api-rest/specifications";
function preGenerateDocs() {
  // noop
}

function postGenerateDocs() {
  removeDuplicateVersionBadge(`${outputDir}/zeebe-rest-api.info.mdx`);
}

module.exports = {
  outputDir,
  preGenerateDocs,
  postGenerateDocs,
};
