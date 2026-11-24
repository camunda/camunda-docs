const { mkdtemp, mkdir, writeFile } = require("node:fs/promises");
const { tmpdir } = require("node:os");
const { dirname, join } = require("node:path");
const { resolvePartialImports, rewriteDocLinks } = require("./index.js");

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

describe("rewriteDocLinks", () => {
  const ctx = {
    sourceToPermalink: new Map([
      [
        "/site/docs/components/agentic-orchestration/overview.md",
        "/docs/components/agentic-orchestration/overview/",
      ],
      ["/site/docs/reference/glossary.md", "/docs/reference/glossary/"],
    ]),
    contentRoot: "/site/docs",
    siteUrl: "https://docs.camunda.io",
  };
  const source = "/site/docs/components/components-overview.md";

  it("rewrites relative doc links to absolute .md URLs", () => {
    expect(
      rewriteDocLinks(
        "See [overview](./agentic-orchestration/overview.md#intro).",
        source,
        ctx
      )
    ).toBe(
      "See [overview](https://docs.camunda.io/docs/components/agentic-orchestration/overview.md#intro)."
    );
  });

  it("resolves root-absolute doc links against the content root", () => {
    expect(
      rewriteDocLinks(
        "[AI agent](/reference/glossary.md#ai-agent)",
        source,
        ctx
      )
    ).toBe(
      "[AI agent](https://docs.camunda.io/docs/reference/glossary.md#ai-agent)"
    );
  });

  it("leaves external, anchor, asset and unknown links alone", () => {
    const text =
      "[a](https://x.test/a.md) [b](#b) [c](/docs/c/) [d](./missing.md) [e](./img.png) [f](/img/x.png) [g](//cdn.test/a.md)";
    expect(rewriteDocLinks(text, source, ctx)).toBe(text);
  });
});

describe("resolvePartialImports link rebasing and naming", () => {
  let dir;
  beforeAll(async () => {
    dir = await mkdtemp(join(tmpdir(), "page-markdown-"));
    await mkdir(join(dir, "configuration", "partials"), { recursive: true });
    await mkdir(join(dir, "shared"));
    await writeFile(
      join(dir, "configuration", "partials", "_licensing.md"),
      "See [licensing](../licensing.md)."
    );
    await writeFile(join(dir, "shared", "licensing.md"), "License body");
  });

  it("inlines imports that have no underscore in the file name", async () => {
    const out = await resolvePartialImports(
      'import Licensing from "../shared/licensing.md";\n\n<Licensing />',
      join(dir, "configuration", "properties.md")
    );
    expect(out).toContain("License body");
  });

  it("rebases links in a partial against the partial's own directory", async () => {
    const rewrite = (text, fromPath) =>
      text.replace(/\]\(([^)]+)\)/g, (_, target) => {
        const abs = join(dirname(fromPath), target);
        return `](ABS:${abs.replace(dir, "")})`;
      });
    const out = await resolvePartialImports(
      'import L from "./partials/_licensing.md";\n\n<L />',
      join(dir, "configuration", "properties.md"),
      rewrite
    );
    expect(out).toContain("ABS:/configuration/licensing.md");
  });
});
