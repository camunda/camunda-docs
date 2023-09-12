// @ts-check

/**
 * @typedef {import("./determineCanonical").CurrentDoc} CurrentDoc
 * @typedef {import("./determineCanonical").CurrentVersion} CurrentVersion
 * @typedef {import("./determineCanonical").CurrentPlugin} CurrentPlugin
 */

const determineCanonical = require("./determineCanonical");

describe("determineCanonical", () => {
  describe("when the current doc has a canonicalUrl in its frontmatter", () => {
    /** @type CurrentDoc */
    const currentDoc = {
      frontMatter: {
        canonicalUrl: "/docs/welcome",
      },
    };

    /** @type CurrentVersion */
    const currentVersion = {
      pluginId: "default",
      version: "8.1",
    };

    describe("when that URL exists in a newer version", () => {
      /** @type CurrentPlugin */
      const currentPlugin = {
        path: "/docs",
        versions: [
          {
            docs: [
              {
                id: "welcome",
                path: "/docs/welcome",
              },
            ],
            isLast: true,
            name: "8.2",
            path: "/docs",
          },
        ],
      };

      it("returns the value of the canonicalUrl", () => {
        // since we know it's a valid URL, it's a safe canonical

        const result = determineCanonical(
          currentDoc,
          currentVersion,
          currentPlugin
        );

        expect(result).toEqual("/docs/welcome");
      });
    });

    describe("when that URL does not exist in a newer version", () => {
      /** @type CurrentPlugin */
      const currentPlugin = {
        path: "/docs",
        versions: [
          {
            docs: [
              {
                id: "welcome",
                path: "/docs/wrong-welcome-url",
              },
            ],
            isLast: true,
            name: "8.2",
            path: "/docs",
          },
        ],
      };

      it("throws an exception", () => {
        //   because it would be a canonical pointing at a 404.
        //   it probably means you moved a doc, and you should go back
        //   and point the old ones at the new location.

        expect(() => {
          determineCanonical(currentDoc, currentVersion, currentPlugin);
        }).toThrowError("Nonexistent canonicalUrl: /docs/welcome.");
      });
    });
  });

  describe("when the current doc has a canonicalId in its frontmatter", () => {
    describe("when the latest version has a doc with that ID", () => {
      // it("returns the URL of the matching latest version doc");
      //   which is the one without a version number in it
    });

    describe("when the latest version does not have a doc with that ID", () => {
      // it("throws an exception");
      //   it probably means you moved a doc, and you should go back
      //   and point the old ones at the new location
    });
  });

  describe("when the current doc has no canonical frontmatter", () => {
    describe("when there are newer docs with with the same id", () => {
      describe("when one version newer has the same id", () => {
        // it("returns the versioned URL of that one version newer");
        //   because it's better for us to group as many canonicals as we can
        //   instead of pointing them at dead URLs
      });

      describe("when all newer versions have the same id", () => {
        // it("returns the latest version's URL");
        //   which is the one without a version number in it
      });

      // maybe something about gaps between matching IDs? e.g. in v1, 2, not 3, not 4, back in 5
      //   in that case I'd want to send it to the newest version with the same id
      //   but that logic is likely covered by the previous test
    });

    describe("when there are no newer docs with the same id", () => {
      describe("when the current doc is the latest version", () => {
        // it("returns the URL for the current doc");
      });

      describe("when the current doc is a non-latest version", () => {
        // it("returns the URL with the version removed");
        //   because we have any way to link it to a known document.
        //   and we're going to hope that redirects send it to the right place,
        //    and that google is okay with that.
      });
    });
  });
});
