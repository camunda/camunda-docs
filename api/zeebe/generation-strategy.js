const replace = require("replace-in-file");

const outputDir = "docs/apis-tools/zeebe-api-rest/specifications";
function preGenerateDocs() {
  // noop
}

function postGenerateDocs() {
  removeDuplicateVersionBadge();
}

module.exports = {
  outputDir,
  preGenerateDocs,
  postGenerateDocs,
};

function removeDuplicateVersionBadge() {
  // The generator adds a version badge to the Introduction file, but
  //   we already have a version badge from the main docs layout.
  console.log("removing duplicate version badge...");
  replace.sync({
    files:
      "docs/apis-tools/zeebe-api-rest/specifications/zeebe-rest-api.info.mdx",
    from: /^.*Version: .*$/m,
    to: "",
  });
}
