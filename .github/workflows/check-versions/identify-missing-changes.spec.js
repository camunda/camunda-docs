// @ts-check

const { identifyMissingChanges } = require("./identify-missing-changes");

/** @type {Array<import("./identify-missing-changes").VersionConfig>} */
let versionConfig;
/** @type {Array<string>} */
let changedFiles;

describe("identifyMissingChanges", () => {
  it("does stuff", () => {
    versionConfig = [{ version: "next", source: "things", suggestions: [] }];
    changedFiles = [];

    const result = identifyMissingChanges(versionConfig, changedFiles);

    expect(result.length).toEqual(1);
  });
});
