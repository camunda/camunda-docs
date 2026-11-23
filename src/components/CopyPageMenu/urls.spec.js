const { markdownUrlFor, aiPrompt, aiChatUrl } = require("./urls");

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
