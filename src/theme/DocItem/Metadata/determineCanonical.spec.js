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
  });
});
