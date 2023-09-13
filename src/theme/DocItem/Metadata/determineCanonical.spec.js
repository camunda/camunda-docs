// @ts-check

/**
 * @typedef {import("./determineCanonical").CurrentDoc} CurrentDoc
 * @typedef {import("./determineCanonical").FrontMatter} FrontMatter
 * @typedef {import("./determineCanonical").CurrentVersion} CurrentVersion
 * @typedef {import("./determineCanonical").CurrentPlugin} CurrentPlugin
 * @typedef {import("./determineCanonical").PluginVersion} PluginVersion
 * @typedef {import("./determineCanonical").PluginDoc} PluginDoc
 */

const determineCanonical = require("./determineCanonical");

describe("determineCanonical", () => {
  /** @type {CurrentDoc} */
  let currentDoc;

  /** @type {CurrentVersion} */
  let currentVersion;

  /** @type {CurrentPlugin} */
  let currentPlugin;

  describe("when the current doc has a canonicalUrl in its frontmatter", () => {
    beforeEach(() => {
      currentDoc = aCurrentDoc({
        frontMatter: {
          canonicalUrl: "/docs/welcome",
        },
      });

      currentVersion = aCurrentVersion({
        version: "8.0",
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

        const result = determineCanonical(
          currentDoc,
          currentVersion,
          currentPlugin
        );

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

        const result = determineCanonical(
          currentDoc,
          currentVersion,
          currentPlugin
        );

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
          determineCanonical(currentDoc, currentVersion, currentPlugin);
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

      currentVersion = aCurrentVersion({
        version: "8.0",
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
        const result = determineCanonical(
          currentDoc,
          currentVersion,
          currentPlugin
        );

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
          determineCanonical(currentDoc, currentVersion, currentPlugin);
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

      currentVersion = aCurrentVersion({
        version: "8.0",
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

    describe("when there are newer docs with with the same id", () => {
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
        const result = determineCanonical(
          currentDoc,
          currentVersion,
          currentPlugin
        );

        expect(result).toEqual("/components");
      });

      describe("when the path of the matching doc ends in a slash", () => {
        // this can happen when we specify the `slug`.
        beforeEach(() => {
          currentPlugin.versions[0].docs[0].path += "/";
        });

        it("removes the trailing slash", () => {
          const result = determineCanonical(
            currentDoc,
            currentVersion,
            currentPlugin
          );

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
          const result = determineCanonical(
            currentDoc,
            currentVersion,
            currentPlugin
          );

          expect(result).toEqual("/components");
        });
      });

      describe("when all newer versions have the same id", () => {
        // it("returns the latest version's URL");
        //   which is the one without a version number in it
      });

      // describe("when there is a `next` doc with the same id")
      //   it("is not selected as canonical")
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

      // describe("when there are older docs with the same id")
      //   it("does not select them")
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
 * @returns {CurrentVersion}
 * @param {Partial<CurrentVersion>=} specs
 */
function aCurrentVersion(specs = {}) {
  return {
    pluginId: "default",
    version: "8.1",
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
