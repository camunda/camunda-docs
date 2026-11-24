const {
  markdownUrlFor,
  aiPrompt,
  askAiQuery,
  aiChatUrl,
  pageLinkOptions,
  mcpOptions,
} = require("./urls");

const ORIGIN = "https://docs.camunda.io";

describe("markdownUrlFor", () => {
  it("replaces the trailing slash with .md", () => {
    expect(markdownUrlFor("/docs/components/foo/", ORIGIN)).toBe(
      "https://docs.camunda.io/docs/components/foo.md"
    );
  });

  it("handles paths without a trailing slash", () => {
    expect(markdownUrlFor("/docs/components/foo", ORIGIN)).toBe(
      "https://docs.camunda.io/docs/components/foo.md"
    );
  });

  it("handles the /docs/ root", () => {
    expect(markdownUrlFor("/docs/", ORIGIN)).toBe(
      "https://docs.camunda.io/docs.md"
    );
  });

  it("keeps the version prefix", () => {
    expect(markdownUrlFor("/docs/8.9/components/foo/", ORIGIN)).toBe(
      "https://docs.camunda.io/docs/8.9/components/foo.md"
    );
    expect(markdownUrlFor("/docs/next/components/foo/", ORIGIN)).toBe(
      "https://docs.camunda.io/docs/next/components/foo.md"
    );
  });

  it("keeps a /pr-123/ base URL", () => {
    expect(
      markdownUrlFor(
        "/pr-123/docs/components/foo/",
        "https://preview.docs.camunda.cloud"
      )
    ).toBe("https://preview.docs.camunda.cloud/pr-123/docs/components/foo.md");
  });
});

describe("aiChatUrl", () => {
  const mdUrl = "https://docs.camunda.io/docs/components/foo.md";

  it("builds a Claude URL with an encoded prompt", () => {
    const url = aiChatUrl("claude", mdUrl, "8.10");
    expect(url.startsWith("https://claude.ai/new?q=")).toBe(true);
    const q = new URL(url).searchParams.get("q");
    expect(q).toBe(aiPrompt(mdUrl, "8.10"));
    expect(q).toContain(mdUrl);
    expect(q).toContain("version 8.10");
  });

  it("builds a ChatGPT URL with an encoded prompt", () => {
    const url = aiChatUrl("chatgpt", mdUrl, "8.10");
    expect(url.startsWith("https://chatgpt.com/?q=")).toBe(true);
    expect(new URL(url).searchParams.get("q")).toBe(aiPrompt(mdUrl, "8.10"));
  });

  it("encodes special characters so the URL stays intact", () => {
    const url = aiChatUrl("claude", "https://x.test/a b&c=d.md", "8.10");
    expect(new URL(url).searchParams.get("q")).toContain("a b&c=d.md");
    expect(url.split("?")).toHaveLength(2);
  });

  it("omits the version when unknown", () => {
    expect(aiPrompt(mdUrl)).not.toContain("version");
  });

  it("throws for an unknown provider", () => {
    expect(() => aiChatUrl("other", mdUrl, "8.10")).toThrow();
  });
});

describe("pageLinkOptions", () => {
  const customFields = {
    canonicalUrlRoot: "https://docs.camunda.io",
    currentVersion: "8.10",
    nextVersion: "8.11",
  };
  const base = { baseUrl: "/", customFields };

  it("offers a pinned and a rolling link on the latest version", () => {
    const [pinned, rolling] = pageLinkOptions({
      ...base,
      pathname: "/docs/components/foo/",
      versionName: "8.10",
      isLast: true,
      versionLabel: "8.10",
    });
    expect(pinned.url).toBe(
      "https://docs.camunda.io/docs/8.10/components/foo/"
    );
    expect(rolling.url).toBe("https://docs.camunda.io/docs/components/foo/");
    expect(rolling.label).toBe("Copy page link (latest)");
  });

  it("offers a pinned and a rolling link on next", () => {
    const [pinned, rolling] = pageLinkOptions({
      ...base,
      pathname: "/docs/next/components/foo/",
      versionName: "current",
      isLast: false,
      versionLabel: "Next",
    });
    expect(pinned.url).toBe(
      "https://docs.camunda.io/docs/8.11/components/foo/"
    );
    expect(rolling.url).toBe(
      "https://docs.camunda.io/docs/next/components/foo/"
    );
  });

  it("offers a single link on older versions", () => {
    const options = pageLinkOptions({
      ...base,
      pathname: "/docs/8.9/components/foo/",
      versionName: "8.9",
      isLast: false,
      versionLabel: "8.9",
    });
    expect(options).toHaveLength(1);
    expect(options[0].url).toBe(
      "https://docs.camunda.io/docs/8.9/components/foo/"
    );
    expect(options[0].label).toBe("Copy page link (8.9)");
  });

  it("respects a /pr-123/ base URL", () => {
    const [pinned] = pageLinkOptions({
      baseUrl: "/pr-123/",
      customFields: {
        ...customFields,
        canonicalUrlRoot: "https://preview.docs.camunda.cloud",
      },
      pathname: "/pr-123/docs/components/foo/",
      versionName: "8.10",
      isLast: true,
      versionLabel: "8.10",
    });
    expect(pinned.url).toBe(
      "https://preview.docs.camunda.cloud/pr-123/docs/8.10/components/foo/"
    );
  });
});

describe("mcpOptions", () => {
  const options = mcpOptions("https://example.mcp.test");

  it("returns the four connect entries", () => {
    expect(options.map((o) => o.key)).toEqual([
      "mcp",
      "mcp-vscode",
      "mcp-claude-code",
      "mcp-codex",
    ]);
  });

  it("copies the bare URL for generic clients", () => {
    expect(options[0]).toMatchObject({
      action: "copy",
      value: "https://example.mcp.test",
    });
  });

  it("builds a VSCode install deep link with encoded config", () => {
    const { action, value } = options[1];
    expect(action).toBe("open");
    expect(value.startsWith("vscode:mcp/install?")).toBe(true);
    expect(
      JSON.parse(decodeURIComponent(value.slice("vscode:mcp/install?".length)))
    ).toEqual({
      name: "camunda-docs",
      type: "http",
      url: "https://example.mcp.test",
    });
  });

  it("builds CLI commands for Claude Code and Codex", () => {
    expect(options[2].value).toBe(
      "claude mcp add --transport http camunda-docs https://example.mcp.test"
    );
    expect(options[3].value).toBe(
      "codex mcp add camunda-docs --url https://example.mcp.test"
    );
  });
});

describe("askAiQuery", () => {
  it("includes the page URL and version", () => {
    const q = askAiQuery("https://docs.camunda.io/docs/foo/", "8.9");
    expect(q).toContain("https://docs.camunda.io/docs/foo/");
    expect(q).toContain("version 8.9");
  });

  it("omits the version when unknown", () => {
    expect(askAiQuery("https://x.test/", undefined)).not.toContain("version");
  });
});
