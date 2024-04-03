const replace = require("replace-in-file");
const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");
const { makeServerDynamic } = require("../make-server-dynamic");

const outputDir = "docs/apis-tools/tasklist-api-rest/specifications";
const specFile = "api/tasklist/tasklist-openapi.yaml";

function preGenerateDocs() {
  fixImproperlyFormattedBreaks();
  makeServerDynamic(specFile);
}

function postGenerateDocs() {
  removeDuplicateVersionBadge(`${outputDir}/tasklist-rest-api.info.mdx`);
}

module.exports = {
  outputDir,
  preGenerateDocs,
  postGenerateDocs,
};

function fixImproperlyFormattedBreaks() {
  // The source spec has many `<br>` tags in it, which is valid HTML,
  //   but docusaurus does not like it. Make them `<br/>` instead.
  console.log("fixing break tags...");
  replace.sync({
    files: specFile,
    from: /<br>/g,
    to: "<br/>",
  });
}
