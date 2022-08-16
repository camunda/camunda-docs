const expandVersionedUrl = require("./expandVersionedUrl");

describe("expandVersionedUrl", () => {
  describe("unexpandable URLs", () => {
    const sourcePath =
      "/Users/monkeypants/camunda-platform-docs/optimize/what-is-optimize.md";

    it.each(["/a/path/without/tokens", "$a$/path/with/unknown/tokens"])(
      "does not expand the URL %s",
      (targetUrl) => {
        expect(expandVersionedUrl(targetUrl, sourcePath)).toEqual(targetUrl);
      }
    );
  });

  // describe("token syntax", () => {
  //   it("lets me specify $docs$/ with a trailing slash")
  //   it("lets me specify $docs$ without a trailing slash")
  // })

  describe("when source is from optimize docs", () => {
    const targetUrl = "$docs$/some/thing";

    it.each([
      [
        "/Users/monkeypants/camunda-platform-docs/optimize/what-is-optimize.md",
        "/docs/next/some/thing",
      ],
      [
        "/Users/monkeypants/camunda-platform-docs/optimize_versioned_docs/version-3.8.0/what-is-optimize.md",
        "/docs/some/thing",
      ],
      [
        "/Users/monkeypants/camunda-platform-docs/optimize_versioned_docs/version-3.7.0/what-is-optimize.md",
        "/docs/1.3/some/thing",
      ],
    ])("when in %s it expands to %s", (sourcePath, expandedUrl) => {
      expect(expandVersionedUrl(targetUrl, sourcePath)).toEqual(expandedUrl);
    });
  });

  describe("when source is from main docs", () => {
    // it("expands $optimize$ to /optimize", () => {
    //   const url = "$optimize$/some/thing";
    //   expect(expandVersionedUrl(url)).toEqual("/optimize/some/thing");
    // });
  });
});
