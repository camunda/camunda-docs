// @ts-check

/**
 * @typedef {import("./determineCanonical").CurrentDoc} CurrentDoc
 * @typedef {import("./determineCanonical").FrontMatter} FrontMatter
 * @typedef {import("./determineCanonical").CurrentPlugin} CurrentPlugin
 * @typedef {import("./determineCanonical").PluginVersion} PluginVersion
 * @typedef {import("./determineCanonical").PluginDoc} PluginDoc
 */

const determineCanonical = require("./determineCanonical");

describe("determineCanonical", () => {
  /** @type {CurrentDoc} */
  let currentDoc;

  /** @type {CurrentPlugin} */
  let currentPlugin;

  describe("when the current doc has a canonicalUrl in its frontmatter", () => {
    beforeEach(() => {
      currentDoc = aCurrentDoc({
        frontMatter: {
          canonicalUrl: "/docs/welcome",
        },
      });

      currentPlugin = aCurrentPlugin({
        versions: [
          aPluginVersion({
            isLast: true,
            name: "8.2",
            docs: [],
          }),
        ],
      });
    });

    describe("when that URL exists in the newest version", () => {
      beforeEach(() => {
        currentPlugin.versions = [
          aPluginVersion({
            isLast: true,
            name: "8.2",
            docs: [aPluginDoc({ path: "/docs/welcome" })],
          }),
          aPluginVersion({
            isLast: false,
            name: "8.1",
            docs: [aPluginDoc({ path: "/docs/welcome-not-the-correct-url" })],
          }),
        ];
      });

      it("returns the value of the canonicalUrl", () => {
        // since we know it's a valid URL, it's a safe canonical

        const result = determineCanonical(currentDoc, currentPlugin);

        expect(result).toEqual("/docs/welcome");
      });
    });

    describe("when that URL exists in a non-newest version", () => {
      beforeEach(() => {
        currentPlugin.versions = [
          aPluginVersion({
            isLast: true,
            name: "8.2",
            docs: [aPluginDoc({ path: "/docs/welcome-not-the-correct-url" })],
          }),
          aPluginVersion({
            isLast: false,
            name: "8.1",
            docs: [aPluginDoc({ path: "/docs/welcome" })],
          }),
        ];
      });

      it("returns the value of the canonicalUrl", () => {
        // since we know it's a valid URL, it's a safe canonical

        const result = determineCanonical(currentDoc, currentPlugin);

        expect(result).toEqual("/docs/welcome");
      });
    });

    describe("when that URL does not exist in any version", () => {
      beforeEach(() => {
        currentPlugin.versions[0].docs = [
          aPluginDoc({ path: "/docs/welcome-to-the-wrong-url" }),
        ];
      });

      it("throws an exception", () => {
        //   because it would be a canonical pointing at a 404.
        //   it probably means you moved a doc, and you should go back
        //   and point the old ones at the new location.

        expect(() => {
          determineCanonical(currentDoc, currentPlugin);
        }).toThrowError("canonicalUrl does not exist: /docs/welcome.");
      });
    });
  });

  describe("when the current doc has a canonicalId in its frontmatter", () => {
    beforeEach(() => {
      currentDoc = aCurrentDoc({
        frontMatter: {
          canonicalId: "components/components-overview",
        },
      });

      currentPlugin = aCurrentPlugin({
        versions: [
          aPluginVersion({
            isLast: true,
            name: "8.2",
            docs: [],
          }),
        ],
      });
    });

    describe("when the latest version has a doc with that ID", () => {
      beforeEach(() => {
        currentPlugin.versions[0].docs = [
          aPluginDoc({
            id: "components/components-overview",
            path: "/docs/components",
          }),
        ];
      });

      it("returns the URL of the matching latest version doc", () => {
        const result = determineCanonical(currentDoc, currentPlugin);

        expect(result).toEqual("/docs/components");
      });
    });

    describe("when the latest version does not have a doc with that ID", () => {
      beforeEach(() => {
        currentPlugin.versions[0].docs = [];
      });

      it("throws an exception", () => {
        //   it probably means you moved a doc, and you should go back
        //   and point the old ones at the new location

        expect(() => {
          determineCanonical(currentDoc, currentPlugin);
        }).toThrowError(
          "canonicalId does not exist in latest version: components/components-overview."
        );
      });
    });
  });

  describe("when the current doc has no canonical frontmatter", () => {
    beforeEach(() => {
      currentDoc = aCurrentDoc({
        metadata: {
          unversionedId: "components/components-overview",
        },
      });

      currentPlugin = aCurrentPlugin({
        versions: [
          aPluginVersion({
            isLast: true,
            name: "8.2",
            docs: [],
          }),
        ],
      });
    });

    describe("when there are other valid canonical docs with with the same id", () => {
      beforeEach(() => {
        currentPlugin.versions = [
          aPluginVersion({
            isLast: true,
            name: "8.2",
            docs: [
              aPluginDoc({
                id: "components/components-overview",
                path: "/components",
              }),
            ],
          }),
        ];
      });

      it("returns the URL of the newest doc with the same id", () => {
        const result = determineCanonical(currentDoc, currentPlugin);

        expect(result).toEqual("/components");
      });

      describe("when the path of the matching doc ends in a slash", () => {
        // this can happen when we specify the `slug`.
        beforeEach(() => {
          currentPlugin.versions[0].docs[0].path += "/";
        });

        it("removes the trailing slash", () => {
          const result = determineCanonical(currentDoc, currentPlugin);

          expect(result).toEqual("/components");
        });
      });

      describe("when multiple newer versions have the same id", () => {
        beforeEach(() => {
          currentPlugin.versions.push(
            aPluginVersion({
              isLast: false,
              name: "8.1",
              docs: [
                aPluginDoc({
                  id: "components/components-overview",
                  path: "/8.1/components",
                }),
              ],
            })
          );
        });

        it("chooses the newest version", () => {
          const result = determineCanonical(currentDoc, currentPlugin);

          expect(result).toEqual("/components");
        });
      });

      describe("when there is a `next` doc with the same id", () => {
        beforeEach(() => {
          currentPlugin.versions.splice(
            0,
            0,
            aPluginVersion({
              isLast: false,
              name: "current",
              docs: [
                aPluginDoc({
                  id: "components/components-overview",
                  path: "/next/components",
                }),
              ],
            })
          );
        });

        it("is not selected as canonical", () => {
          const result = determineCanonical(currentDoc, currentPlugin);

          expect(result).toEqual("/components");
        });
      });
    });

    describe("when there are no valid canonical docs with the same id", () => {
      // we have no way to link it to a known document,
      //  so we're going to hope that redirects send it to the right place,
      //  and that google is okay with that. 🤞

      // This scenario seems impossible. If the current doc is the latest version, it would match
      //   its own ID as the valid canonical. I'm leaving this scenario to prove that I considered it.
      // describe("when the current doc is the latest version", () => {
      //   it("returns the URL for the current doc", () => {});
      // });

      // This scenario also seems impossible. If it is a non-latest version doc, it would also match
      //   its own ID as the valid canonical. I'm leaving this scenario to prove that I considered it.
      // describe("when the current doc is a non-latest version", () => {
      //   it("returns the URL with the version removed", () => {});
      // });

      // This is the only plausible scenario for not finding a valid canonical based on the current doc ID.
      //   We exclude the `next` version from ID lookups, so `next` docs won't find any valid canonicals
      //   if they are brand new or have been moved.
      describe("when the current doc is a next version", () => {
        beforeEach(() => {
          currentDoc.metadata.permalink = "/docs/next/components/";
        });

        it("returns the URL with the version removed", () => {
          const result = determineCanonical(currentDoc, currentPlugin);

          expect(result).toEqual("/docs/components");
        });
      });
    });
  });
});

/**
 * @returns {CurrentDoc}
 * @param {Partial<CurrentDoc>=} specs
 */
function aCurrentDoc(specs = {}) {
  return {
    frontMatter: {},
    metadata: {
      unversionedId: "a/doc/id",
    },
    ...specs,
  };
}

/**
 * @returns {CurrentPlugin}
 * @param {Partial<CurrentPlugin>=} specs
 */
function aCurrentPlugin(specs = {}) {
  return {
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
    ...specs,
  };
}

/**
 * @returns {PluginVersion}
 * @param {Partial<PluginVersion>=} specs
 */
function aPluginVersion(specs = {}) {
  return {
    docs: [],
    isLast: false,
    name: "8.2",
    path: "/docs",
    ...specs,
  };
}

/**
 * @returns {PluginDoc}
 * @param {Partial<PluginDoc>=} specs
 */
function aPluginDoc(specs = {}) {
  return {
    id: "some/doc/id",
    path: "/docs/some/doc/id",
    ...specs,
  };
}
