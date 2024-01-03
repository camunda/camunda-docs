const { identifyMissingChanges } = require("./identify-missing-changes");

const versionConfigRaw = process.env.VERSION_CONFIG || "";
const changedFilesRaw = process.env.CHANGED_FILES || "";

const versionConfig = JSON.parse(versionConfigRaw.trim());
const changedFiles = JSON.parse(changedFilesRaw.trim());

const results = identifyMissingChanges(versionConfig, changedFiles);

// Output the result as JSON to the standard output
console.log(JSON.stringify(results));
