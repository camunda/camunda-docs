// @ts-check

// Guards the `@apidevtools/json-schema-ref-parser` dependency used by
// sync-hub-api.js. That script only runs from the `update-postman` workflow,
// which triggers on release-tag pushes, not on pull requests — so a breaking
// bump to this dependency would otherwise reach production undetected.
//
// The package ships ESM-only. Jest's own module pipeline can't `require()` it
// (no Babel config transforms node_modules here), even though plain Node can
// via its native require(esm) interop — the same way sync-hub-api.js loads
// it. So this test shells out to a real `node` process instead of importing
// the package directly, to exercise the exact runtime path production uses.

const { execFileSync } = require("child_process");
const path = require("path");

const SPECS = {
  hubsm: path.join(
    __dirname,
    "..",
    "..",
    "api",
    "hubsm",
    "v2",
    "camunda-openapi.yaml"
  ),
  hubsaas: path.join(
    __dirname,
    "..",
    "..",
    "api",
    "hubsaas",
    "v2",
    "camunda-openapi.yaml"
  ),
};

// Mirrors the `RefParser.bundle(specPath)` call in convertHubApiSpec().
const BUNDLE_SNIPPET = `
  const RefParser = require("@apidevtools/json-schema-ref-parser");
  RefParser.bundle(process.argv[1])
    .then((spec) => {
      console.log(JSON.stringify({
        openapi: spec.openapi,
        title: spec.info && spec.info.title,
        pathCount: Object.keys(spec.paths || {}).length,
      }));
    })
    .catch((err) => {
      console.error(err.stack || String(err));
      process.exit(1);
    });
`;

describe("RefParser.bundle on the Hub API specs", () => {
  it.each(Object.entries(SPECS))(
    "bundles the %s spec without throwing",
    (_target, specPath) => {
      const output = execFileSync(
        process.execPath,
        ["-e", BUNDLE_SNIPPET, specPath],
        { encoding: "utf8" }
      );
      const spec = JSON.parse(output);

      expect(spec.openapi).toMatch(/^3\./);
      expect(spec.title).toEqual(expect.any(String));
      expect(spec.pathCount).toBeGreaterThan(0);
    }
  );
});
