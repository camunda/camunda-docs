// @ts-check

// Guards the `@apidevtools/json-schema-ref-parser` dependency used by
// sync-hub-api.js. That script only runs from the `update-postman` workflow,
// which triggers on release-tag pushes, not on pull requests — so a breaking
// bump to this dependency would otherwise reach production undetected.

const RefParser = require("@apidevtools/json-schema-ref-parser");
const path = require("path");

const SPECS = {
  hubsm: path.join(__dirname, "..", "..", "api", "hubsm", "v2", "camunda-openapi.yaml"),
  hubsaas: path.join(__dirname, "..", "..", "api", "hubsaas", "v2", "camunda-openapi.yaml"),
};

describe("RefParser.bundle on the Hub API specs", () => {
  it.each(Object.entries(SPECS))(
    "bundles the %s spec without throwing",
    async (_target, specPath) => {
      const spec = await RefParser.bundle(specPath);

      expect(spec.openapi).toMatch(/^3\./);
      expect(spec.info?.title).toEqual(expect.any(String));
      expect(Object.keys(spec.paths || {}).length).toBeGreaterThan(0);
    }
  );
});
