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
        canonicalUrl: "/docs/welcome",
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
        }).toThrowError("Nonexistent canonicalUrl: /docs/welcome.");
      });
    });
  });

  describe("when the current doc has a canonicalId in its frontmatter", () => {
    beforeEach(() => {
      currentDoc = aCurrentDoc({
        canonicalId: "components/components-overview",
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

/**
 * @returns {CurrentDoc}
 * @param {Partial<FrontMatter>=} frontMatterSpecs
 */
function aCurrentDoc(frontMatterSpecs = {}) {
  return {
    frontMatter: {
      ...frontMatterSpecs,
    },
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
