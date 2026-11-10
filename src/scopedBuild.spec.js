const {
  bypassOutOfScopeLinks,
  resolveBuildVersions,
  stubApiSpecification,
} = require("./scopedBuild");

describe("resolveBuildVersions", () => {
  it("resolves aliases and removes duplicate versions", () => {
    expect(
      resolveBuildVersions("next,current,8.9,current", "8.10", [
        "8.10",
        "8.9",
        "8.8",
      ])
    ).toEqual(["current", "8.10", "8.9"]);
  });

  it("rejects unsupported versions", () => {
    expect(() =>
      resolveBuildVersions("8.7", "8.10", ["8.10", "8.9", "8.8"])
    ).toThrow('DOCS_BUILD_VERSIONS contains unsupported version "8.7".');
  });
});

describe("bypassOutOfScopeLinks", () => {
  const scope = {
    partialBuild: true,
    buildVersions: ["8.10"],
    skipGeneratedReferences: false,
  };

  it("bypasses root-relative docs links in a scoped build", () => {
    expect(
      bypassOutOfScopeLinks({
        ...scope,
        fileContent: "[release notes](/docs/reference/release-notes.md)",
      })
    ).toBe("[release notes](pathname:///docs/reference/release-notes.md)");
  });

  it("bypasses links to excluded versions", () => {
    expect(
      bypassOutOfScopeLinks({
        ...scope,
        fileContent:
          "[old release](versioned_docs/version-8.9/reference/release-notes.md)",
      })
    ).toBe(
      "[old release](pathname://versioned_docs/version-8.9/reference/release-notes.md)"
    );
  });

  it("keeps relative links strict", () => {
    expect(
      bypassOutOfScopeLinks({
        ...scope,
        fileContent: "[current page](./release-notes.md)",
      })
    ).toBe("[current page](./release-notes.md)");
  });

  it("bypasses generated TypeScript API reference links when excluded", () => {
    expect(
      bypassOutOfScopeLinks({
        ...scope,
        partialBuild: false,
        skipGeneratedReferences: true,
        fileContent:
          "[type](apis-tools/typescript/api-reference/interfaces/Foo.md)",
      })
    ).toBe(
      "[type](pathname://apis-tools/typescript/api-reference/interfaces/Foo.md)"
    );
  });
});

describe("stubApiSpecification", () => {
  const fileContent = [
    "---",
    "id: get-topology",
    'title: "Get cluster topology"',
    'sidebar_label: "Get cluster topology"',
    'sidebar_class_name: "get api-method"',
    "api: eJztW+ty2zYWfhWU",
    "hide_send_button: true",
    "---",
    "",
    "<ApiTabs />",
    "",
  ].join("\n");

  it("keeps the page identity and drops generated content", () => {
    expect(
      stubApiSpecification({
        filePath:
          "/docs/apis-tools/zeebe-api-rest/specifications/get-topology.api.mdx",
        fileContent,
      })
    ).toBe(
      [
        "---",
        "id: get-topology",
        'title: "Get cluster topology"',
        'sidebar_label: "Get cluster topology"',
        'sidebar_class_name: "get api-method"',
        "---",
        "",
        "Generated API reference skipped in this build.",
        "",
      ].join("\n")
    );
  });

  it("ignores other docs", () => {
    expect(
      stubApiSpecification({
        filePath: "/docs/apis-tools/zeebe-api-rest/zeebe-api-rest-overview.md",
        fileContent,
      })
    ).toBeNull();
  });
});
