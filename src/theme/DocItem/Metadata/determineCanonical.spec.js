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

    describe("when the URL is fully qualified", () => {
      beforeEach(() => {
        currentDoc = aCurrentDoc({
          frontMatter: {
            canonicalUrl: "https://docs.camunda.io/docs/welcome/",
          },
        });
      });

      it("returns the value of the canonicalUrl", () => {
        // since we know it's a valid URL, it's a safe canonical

        const result = determineCanonical(currentDoc, currentPlugin);

        expect(result).toEqual("https://docs.camunda.io/docs/welcome/");
      });

      describe("when the URL does not include a trailing slash", () => {
        it("does not append a trailing slash because it might be a non-camunda-docs URL", () => {});
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

      it("returns the value of the canonicalUrl, terminating in a slash", () => {
        // since we know it's a valid URL, it's a safe canonical

        const result = determineCanonical(currentDoc, currentPlugin);

        expect(result).toEqual("/docs/welcome/");
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

      it("returns the value of the canonicalUrl, terminating in a slash", () => {
        // since we know it's a valid URL, it's a safe canonical

        const result = determineCanonical(currentDoc, currentPlugin);

        expect(result).toEqual("/docs/welcome/");
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
        }).toThrow("canonicalUrl does not exist: /docs/welcome.");
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

      it("returns the URL of the matching latest version doc, terminating in a slash", () => {
        const result = determineCanonical(currentDoc, currentPlugin);

        expect(result).toEqual("/docs/components/");
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
        }).toThrow(
          "canonicalId does not exist in latest version: components/components-overview."
        );
      });
    });
  });

  describe("when the current doc has no canonical frontmatter", () => {
    beforeEach(() => {
      currentDoc = aCurrentDoc({
        metadata: {
          id: "components/components-overview",
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

      it("returns the URL of the newest doc with the same id, terminating in a slash", () => {
        const result = determineCanonical(currentDoc, currentPlugin);

        expect(result).toEqual("/components/");
      });

      describe("when the path of the matching doc ends in a slash", () => {
        // this can happen when we specify the `slug`.
        beforeEach(() => {
          currentPlugin.versions[0].docs[0].path += "/";
        });

        it("includes the terminating slash", () => {
          const result = determineCanonical(currentDoc, currentPlugin);

          expect(result).toEqual("/components/");
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

          expect(result).toEqual("/components/");
        });
      });

      describe("when there is also a `next` doc with the same id", () => {
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

          expect(result).toEqual("/components/");
        });
      });
    });

    describe("when there are no valid canonical docs with the same id", () => {
      // we have no way to link it to a known document,
      //  so use a self-referential canonical.

      // This is the only plausible scenario for not finding a valid canonical based on the current doc ID.
      //   We exclude the `next` version from ID lookups, so `next` docs won't find any valid canonicals
      //   if they are brand new or have been moved.
      describe("when the current doc is a next version", () => {
        beforeEach(() => {
          currentDoc.metadata.permalink = "/docs/next/components/";
        });

        it("returns the URL of the current page", () => {
          const result = determineCanonical(currentDoc, currentPlugin);

          expect(result).toEqual("/docs/next/components/");
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
      id: "a/doc/id",
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
