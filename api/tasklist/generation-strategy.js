const removeDuplicateVersionBadge = require("../remove-duplicate-version-badge");
const { makeServerDynamic } = require("../make-server-dynamic");

function preGenerateDocs(config) {
  fixImproperlyFormattedBreaks(config.specPath);
  makeServerDynamic(config.specPath);
}

function postGenerateDocs(config) {
  removeDuplicateVersionBadge(`${config.outputDir}/tasklist-rest-api.info.mdx`);
}

module.exports = {
  preGenerateDocs,
  postGenerateDocs,
};

function fixImproperlyFormattedBreaks(specPath) {
  // The source spec has many `<br>` tags in it, which is valid HTML,
  //   but docusaurus does not like it. Make them `<br/>` instead.
  console.log("fixing break tags...");
  (async () => {
    const { replaceInFileSync } = await import("replace-in-file");
    replaceInFileSync({
      files: specPath,
      from: /<br>/g,
      to: "<br/>",
    });
  })();
}
