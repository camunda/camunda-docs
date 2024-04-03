const replace = require("replace-in-file");

// const outputDir = "docs/apis-tools/tasklist-api-rest/specifications";
const outputDir = "api/tasklist/docs";
function preGenerateDocs() {
  fixImproperlyFormattedBreaks();
  makeServerDynamic();
}

function postGenerateDocs() {
  // noop...for now. Once this moves to the versioned docs, we'll need to scrub the version badge.
}

module.exports = {
  outputDir,
  preGenerateDocs,
  postGenerateDocs,
};

const specFile = "api/tasklist/tasklist-openapi.yaml";
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

function makeServerDynamic() {
  // The source spec has a hardcoded generated server URL.
  //   We can make it dynamic so that the user can edit it and get more accurate code samples.
  console.log("making server dynamic....");

  // Note that `v1` is included in this path.
  const dynamicServerDefinition = `  - url: "{schema}://{host}:{port}"
    variables:
      host:
        default: localhost
        description: The hostname of the API server.
      port:
        default: "8080"
        description: The port of the API server.
      schema:
        default: http
        description: The schema of the API server.`;
  replace.sync({
    files: specFile,
    // This regex includes the following `description` line, which becomes inaccurate when we make the server dynamic.
    from: /^. - url:.*\n.   description:.*$/m,
    to: dynamicServerDefinition,
  });
}
