function removeDuplicateVersionBadge(generatedInfoFilePath) {
  console.log("removing duplicate version badge...");

  import("replace-in-file").then((mod) => {
    const { replaceInFileSync } = mod.default;

    replaceInFileSync({
      files: generatedInfoFilePath,
      from: /<span[^>]*\s*children=\{"Version: [^"]*"\}\s*>\n<\/span>\n/m,
      to: "",
    });
  });
}

module.exports = removeDuplicateVersionBadge;
