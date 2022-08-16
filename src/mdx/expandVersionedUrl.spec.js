const expandVersionedUrl = require("./expandVersionedUrl");

describe("expandVersionedUrl", () => {
  describe("when in /docs folder", () => {
    it("maps $docs$ to /docs/next", () => {
      const url = "$docs$/some/thing";

      expect(expandVersionedUrl(url)).toEqual("/docs/next/some/thing");
    });
  });
});
