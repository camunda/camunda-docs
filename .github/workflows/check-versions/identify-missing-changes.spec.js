// @ts-check

const { identifyMissingChanges } = require("./identify-missing-changes");

/** @type {Array<import("./identify-missing-changes").VersionConfig>} */
let versionConfig;
/** @type {Array<string>} */
let changedFiles;

describe("identifyMissingChanges", () => {
  describe("when changed in one version", () => {
    describe("when a suggested version is also changed", () => {
      it("does not recommend changes", () => {
        versionConfig = [
          { version: "next", source: "a/", suggestions: ["b/"] },
        ];
        changedFiles = ["a/file.md", "b/file.md"];

        const result = identifyMissingChanges(versionConfig, changedFiles);

        expect(result.length).toEqual(0);
      });
    });

    describe("when a suggested version is not changed", () => {
      it("recommends a change", () => {
        versionConfig = [
          { version: "next", source: "a/", suggestions: ["b/"] },
        ];
        changedFiles = ["a/file.md"];

        const result = identifyMissingChanges(versionConfig, changedFiles);

        expect(result.length).toEqual(1);
        expect(result[0].source).toEqual("a/");
        expect(result[0].suggestion).toEqual("b/");
        expect(result[0].files.length).toEqual(1);
      });

      it("scrubs the source folder from the suggestion", () => {
        versionConfig = [
          { version: "next", source: "a/", suggestions: ["b/"] },
        ];
        changedFiles = ["a/file.md"];

        const result = identifyMissingChanges(versionConfig, changedFiles);

        expect(result.length).toEqual(1);
        expect(result[0].files[0]).toEqual("file.md");
      });
    });

    describe("when multiple changes are missing", () => {
      it("recommends changes for all for the missing versions", () => {
        versionConfig = [
          { version: "next", source: "a/", suggestions: ["b/", "c/"] },
        ];
        changedFiles = ["a/file.md"];

        const result = identifyMissingChanges(versionConfig, changedFiles);

        expect(result.length).toEqual(2);
        expect(result[0].source).toEqual("a/");
        expect(result[0].suggestion).toEqual("b/");
        expect(result[0].files.length).toEqual(1);
        expect(result[0].files[0]).toEqual("file.md");

        expect(result[1].source).toEqual("a/");
        expect(result[1].suggestion).toEqual("c/");
        expect(result[1].files.length).toEqual(1);
        expect(result[1].files[0]).toEqual("file.md");
      });
    });
  });
});
