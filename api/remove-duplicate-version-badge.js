const replace = require("replace-in-file");

function removeDuplicateVersionBadge(generatedInfoFilePath) {
  // The generator adds a version badge to the Introduction file, but
  //   we already have a version badge from the main docs layout.
  console.log("removing duplicate version badge...");
  replace.sync({
    files: generatedInfoFilePath,
    from: /^.*Version: .*$/m,
    to: "",
  });
}

module.exports = removeDuplicateVersionBadge;
