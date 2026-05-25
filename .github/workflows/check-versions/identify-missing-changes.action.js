const fs = require("fs");
const { identifyMissingChanges } = require("./identify-missing-changes");

const versionConfigRaw = process.env.VERSION_CONFIG || "";

// Read changed files from a file path (passed as CLI arg) to avoid
// exceeding ARG_MAX when the PR touches many files.
const changedFilesPath = process.argv[2];
const changedFilesRaw = changedFilesPath
  ? fs.readFileSync(changedFilesPath, "utf8")
  : process.env.CHANGED_FILES || "[]";

const versionConfig = JSON.parse(versionConfigRaw.trim());
const changedFiles = JSON.parse(changedFilesRaw.trim());

const results = identifyMissingChanges(versionConfig, changedFiles);

// Output the result as JSON to the standard output
console.log(JSON.stringify(results));
