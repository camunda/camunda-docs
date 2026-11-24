const { mkdtemp, mkdir, writeFile } = require("node:fs/promises");
const { tmpdir } = require("node:os");
const { join } = require("node:path");
const { resolvePartialImports, rewriteRelativeLinks } = require("./index.js");

describe("resolvePartialImports", () => {
  let dir;
  beforeAll(async () => {
    dir = await mkdtemp(join(tmpdir(), "page-markdown-"));
    await mkdir(join(dir, "partials"));
    await writeFile(
      join(dir, "partials", "_api.md"),
      '---\ntitle: x\n---\nimport Inner from "./_inner.md";\n\nAPI body <Inner />'
    );
    await writeFile(join(dir, "partials", "_inner.md"), "inner body");
  });

  it("decodes MDX-escaped specifiers and resolves nested partials", async () => {
    const page = join(dir, "page.md");
    const out = await resolvePartialImports(
      'import Api from "./partials/\\_api.md";\n\nBefore\n\n<Api />\n\nAfter',
      page
    );
    expect(out).toContain("API body inner body");
    expect(out).not.toContain("import");
    expect(out).not.toContain("<Api");
  });

  it("removes the import and usage when the partial is missing", async () => {
    const out = await resolvePartialImports(
      'import Gone from "./_gone.md";\n\nText <Gone />',
      join(dir, "page.md")
    );
    expect(out).not.toContain("Gone");
    expect(out).toContain("Text");
  });
});

describe("rewriteRelativeLinks", () => {
  const map = new Map([
    [
      "/site/docs/components/agentic-orchestration/overview.md",
      "/docs/components/agentic-orchestration/overview/",
    ],
  ]);
  const source = "/site/docs/components/components-overview.md";

  it("rewrites relative doc links to absolute .md URLs", () => {
    expect(
      rewriteRelativeLinks(
        "See [overview](./agentic-orchestration/overview.md#intro).",
        source,
        map,
        "https://docs.camunda.io"
      )
    ).toBe(
      "See [overview](https://docs.camunda.io/docs/components/agentic-orchestration/overview.md#intro)."
    );
  });

  it("leaves external, anchor, absolute and unknown links alone", () => {
    const text =
      "[a](https://x.test/a.md) [b](#b) [c](/docs/c/) [d](./missing.md) [e](./img.png)";
    expect(
      rewriteRelativeLinks(text, source, map, "https://docs.camunda.io")
    ).toBe(text);
  });
});
