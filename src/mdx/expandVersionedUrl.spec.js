const expandVersionedUrl = require("./expandVersionedUrl");

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

  describe("when source is from optimize docs", () => {
    const targetUrl = "$docs$/some/thing";

    it.each([
      [
        "/Users/monkeypants/camunda-docs/optimize/what-is-optimize.md",
        "/docs/next/some/thing",
      ],

      [
        "/Users/monkeypants/camunda-docs/optimize_versioned_docs/version-3.10.0/what-is-optimize.md",
        "/docs/some/thing",
      ],
      [
        "/Users/monkeypants/camunda-docs/optimize_versioned_docs/version-3.7.0/what-is-optimize.md",
        "/docs/1.3/some/thing",
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
        "/Users/monkeypants/camunda-docs/versioned_docs/version-8.2/what-is-optimize.md",
        "/optimize/some/thing",
      ],
      [
        "/Users/monkeypants/camunda-docs/versioned_docs/version-1.3/what-is-optimize.md",
        "/optimize/3.7.0/some/thing",
      ],
    ])("when in %s it expands to %s", (sourcePath, expandedUrl) => {
      expect(expandVersionedUrl(targetUrl, sourcePath)).toEqual(expandedUrl);
    });
  });
});
