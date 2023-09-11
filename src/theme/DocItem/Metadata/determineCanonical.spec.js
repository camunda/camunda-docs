// @ts-check

/**
 * @typedef {import("./determineCanonical").Doc} Doc
 */

const determineCanonical = require("./determineCanonical");

describe("determineCanonical", () => {
  describe("when the current doc has a canonicalUrl in its frontmatter", () => {
    it("returns the value of the canonicalUrl", () => {
      /** @type Doc */
      const doc = {
        frontMatter: {
          canonicalUrl: "/docs/welcome/",
        },
      };

      const result = determineCanonical(doc);

      expect(result).toEqual("/docs/welcome/");
    });

    describe("when that URL exists in a newer version", () => {
      // it("returns the value of the canonicalUrl");
    });

    describe("when that URL does not exist in a newer version", () => {
      // it("throws an exception");
    });
  });

  describe("when the current doc has a canonicalId in its frontmatter", () => {
    describe("when the current version has a doc with that ID", () => {
      // it("returns the URL of the matching current version doc");
    });

    describe("when the current version does not have a doc with that ID", () => {
      // it("throws an exception");
    });
  });

  describe("when the current doc has no canonical frontmatter", () => {
    describe("when there are newer docs with with the same id", () => {
      describe("when one version newer has the same id", () => {
        // it("returns the versioned URL of that one version newer");
      });

      describe("when all newer versions have the same id", () => {
        // it("returns the current version's URL");
      });

      // maybe something about gaps between matching IDs? e.g. in v1, 2, not 3, not 4, back in 5
    });

    describe("when there are no newer docs with the same id", () => {
      describe("when the current doc is the latest version", () => {
        // it("returns the URL for the current doc");
      });

      describe("when the current doc is a non-latest version", () => {
        // it("returns the URL with the version removed");
      });
    });
  });
});
