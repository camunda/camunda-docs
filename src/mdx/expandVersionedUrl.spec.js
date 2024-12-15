const expandVersionedUrl = require("./expandVersionedUrl");
const { versionMappings } = require("../versions");

describe("expandVersionedUrl", () => {
  describe("unexpandable URLs", () => {
    const sourcePath =
      "/Users/monkeypants/camunda-docs/optimize/what-is-optimize.md";

    it.each(["/a/path/without/tokens", "$a$/path/with/unknown/tokens"])(
      "does not expand the URL %s",
      (targetUrl) => {
        expect(expandVersionedUrl(targetUrl, sourcePath)).toEqual(targetUrl);
      }
    );
  });

  const [currentVersionMapping, olderVersionMapping] = versionMappings;

  describe("when source is from optimize docs", () => {
    const targetUrl = "$docs$/some/thing";

    it.each([
      [
        "/Users/monkeypants/camunda-docs/optimize/what-is-optimize.md",
        "/docs/next/some/thing",
      ],

      [
        `/Users/monkeypants/camunda-docs/optimize_versioned_docs/version-${currentVersionMapping.optimizeVersion}/what-is-optimize.md`,
        "/docs/some/thing",
      ],
      [
        `/Users/monkeypants/camunda-docs/optimize_versioned_docs/version-${olderVersionMapping.optimizeVersion}/what-is-optimize.md`,
        `/docs/${olderVersionMapping.docsVersion}/some/thing`,
      ],
    ])("when in %s it expands to %s", (sourcePath, expandedUrl) => {
      expect(expandVersionedUrl(targetUrl, sourcePath)).toEqual(expandedUrl);
    });
  });

  describe("when source is from main docs", () => {
    const targetUrl = "$optimize$/some/thing";

    it.each([
      [
        "/Users/monkeypants/camunda-docs/docs/what-is-optimize.md",
        "/optimize/next/some/thing",
      ],
      [
        `/Users/monkeypants/camunda-docs/versioned_docs/version-${currentVersionMapping.docsVersion}/what-is-optimize.md`,
        "/optimize/some/thing",
      ],
      [
        `/Users/monkeypants/camunda-docs/versioned_docs/version-${olderVersionMapping.docsVersion}/what-is-optimize.md`,
        `/optimize/${olderVersionMapping.optimizeVersion}/some/thing`,
      ],
    ])("when in %s it expands to %s", (sourcePath, expandedUrl) => {
      expect(expandVersionedUrl(targetUrl, sourcePath)).toEqual(expandedUrl);
    });
  });
});
