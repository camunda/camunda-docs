const { makeServerDynamic } = require("../make-server-dynamic");

// const outputDir = "docs/apis-tools/tasklist-api-rest/specifications";
const outputDir = "api/operate/docs";
const specFile = "api/operate/operate-openapi.yaml";

function preGenerateDocs() {
  makeServerDynamic(specFile);
}

function postGenerateDocs() {
  // noop...for now. Once this moves to the versioned docs, we'll need to scrub the version badge.
}

module.exports = {
  outputDir,
  preGenerateDocs,
  postGenerateDocs,
};
