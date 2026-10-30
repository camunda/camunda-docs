const fs = require("fs");
const os = require("os");
const path = require("path");
const { createServer } = require("http");
const {
  CONFIG,
  compareVersions,
  findEntries,
  findPages,
  githubClient,
  insertEntry,
  publishedReleases,
  syncPages,
} = require("./update-process-os-changelog");

const FRONT =
  '---\nid: changelog\ntitle: ProcessOS Harness changelog\ndescription: "Changes."\n---\n\nUse the latest stable release.\n';

// A page with the given section contents, each a list of page-form entries.
const page = (stable = [], alpha = []) =>
  [FRONT, "## Stable", ...stable, "## Alpha", ...alpha].join("\n\n") + "\n";
const PAGE = page();

// An entry as its release asset carries it.
const entry = (version, body = "- A change", date = "2026-11-02") =>
  `## ${version} (${date})\n\n${body}\n`;

// The same entry as the page holds it.
const onPage = (version, body = "- A change", date = "2026-11-02") =>
  version.includes("-alpha.")
    ? `<details>\n<summary>${version} (${date})</summary>\n\n${body}\n\n</details>`
    : `### ${version} (${date})\n\n${body}`;

function release(
  version,
  { date = "2026-11-02", asset = true, draft = false } = {}
) {
  return {
    tag_name: `v${version}`,
    draft,
    published_at: draft ? null : `${date}T09:00:00Z`,
    assets: asset
      ? [{ name: CONFIG.asset, url: `https://api.example.com/${version}` }]
      : [],
  };
}

const fetchFrom = (entries) => async (asset) => {
  const version = asset.url.split("/").pop();
  if (!(version in entries))
    throw new Error(`unexpected download of ${version}`);
  return entries[version];
};

const versions = (page) => findEntries(page).map((e) => e.version);

describe("update-process-os-changelog", () => {
  test("orders an alpha below its stable release", () => {
    const sorted = [
      "1.1.0",
      "1.0.0",
      "1.1.0-alpha.10",
      "1.1.0-alpha.2",
      "0.9.0",
    ].sort(compareVersions);
    expect(sorted).toEqual([
      "0.9.0",
      "1.0.0",
      "1.1.0-alpha.2",
      "1.1.0-alpha.10",
      "1.1.0",
    ]);
  });

  test("ignores headings that are not entries", () => {
    const p = page(
      ["### Release channels", onPage("1.0.0")],
      [onPage("1.1.0-alpha.1")]
    );
    expect(versions(p)).toEqual(["1.0.0", "1.1.0-alpha.1"]);
  });

  test("adds a first entry to the end of its section", () => {
    expect(insertEntry(PAGE, entry("1.0.0"))).toBe(page([onPage("1.0.0")]));
    expect(insertEntry(PAGE, entry("1.1.0-alpha.1"))).toBe(
      page([], [onPage("1.1.0-alpha.1")])
    );
  });

  test("collapses an alpha entry and moves its headings down a level", () => {
    const body = "### Features\n\n- Add a thing";
    expect(insertEntry(PAGE, entry("1.1.0-alpha.1", body))).toBe(
      page([], [onPage("1.1.0-alpha.1", "#### Features\n\n- Add a thing")])
    );
    expect(insertEntry(PAGE, entry("1.1.0", body))).toBe(
      page([onPage("1.1.0", "#### Features\n\n- Add a thing")])
    );
  });

  test("inserts between existing entries of a section, newest first", () => {
    const p = page(
      [onPage("1.1.0"), onPage("1.0.0")],
      [onPage("1.2.0-alpha.2"), onPage("1.1.0-alpha.1")]
    );
    expect(insertEntry(p, entry("1.0.1"))).toBe(
      page(
        [onPage("1.1.0"), onPage("1.0.1"), onPage("1.0.0")],
        [onPage("1.2.0-alpha.2"), onPage("1.1.0-alpha.1")]
      )
    );
    expect(insertEntry(p, entry("1.2.0-alpha.1"))).toBe(
      page(
        [onPage("1.1.0"), onPage("1.0.0")],
        [
          onPage("1.2.0-alpha.2"),
          onPage("1.2.0-alpha.1"),
          onPage("1.1.0-alpha.1"),
        ]
      )
    );
  });

  test("refuses a page without the entry's section", () => {
    const p = FRONT + "\n## Stable\n";
    expect(() => insertEntry(p, entry("1.1.0-alpha.1"))).toThrow(
      'The page has no "## Alpha" section'
    );
  });

  test("keeps a CRLF page CRLF", () => {
    const p = page([onPage("1.0.0")]).replace(/\n/g, "\r\n");
    const out = insertEntry(
      insertEntry(p, entry("1.1.0")),
      entry("1.2.0-alpha.1")
    );
    expect(out).not.toMatch(/(?<!\r)\n/);
    expect(versions(out)).toEqual(["1.1.0", "1.0.0", "1.2.0-alpha.1"]);
  });

  test("skips drafts and tags that are not release versions", () => {
    const rows = [
      release("1.0.0"),
      release("1.1.0", { draft: true }),
      { ...release("1.0.1"), tag_name: "nightly" },
    ];
    expect(publishedReleases(rows).map((r) => r.version)).toEqual(["1.0.0"]);
  });

  test("fills an empty page, with placeholders before the first asset", async () => {
    const releases = [
      release("1.0.0", { asset: false, date: "2026-10-13" }),
      release("1.1.0-alpha.1"),
    ];
    const { pages, added, errors } = await syncPages({
      pages: [PAGE],
      releases,
      fetchAsset: fetchFrom({ "1.1.0-alpha.1": entry("1.1.0-alpha.1") }),
    });
    expect(errors).toEqual([]);
    expect(added).toEqual([["1.1.0-alpha.1", "1.0.0"]]);
    expect(pages[0]).toBe(
      page(
        [onPage("1.0.0", CONFIG.placeholder, "2026-10-13")],
        [onPage("1.1.0-alpha.1")]
      )
    );
  });

  test("refuses a release newer than the first asset that has none", async () => {
    const releases = [
      release("1.2.0-alpha.1", { asset: false }),
      release("1.1.0-alpha.1"),
    ];
    const { errors } = await syncPages({
      pages: [PAGE],
      releases,
      fetchAsset: fetchFrom({ "1.1.0-alpha.1": entry("1.1.0-alpha.1") }),
    });
    expect(errors).toEqual([
      `1.2.0-alpha.1: published without ${CONFIG.asset}`,
    ]);
  });

  test("leaves a hand-edited entry untouched", async () => {
    const edited = "### 1.0.0 (2026-10-13)\n\nRewritten by a technical writer.";
    const { pages, added } = await syncPages({
      pages: [page([edited])],
      releases: [release("1.0.0"), release("1.1.0")],
      fetchAsset: fetchFrom({ "1.1.0": entry("1.1.0") }),
    });
    expect(added).toEqual([["1.1.0"]]);
    expect(pages[0]).toBe(page([onPage("1.1.0"), edited]));
  });

  test("changes nothing on a second run", async () => {
    const releases = [release("1.0.0"), release("1.1.0-alpha.1")];
    const fetchAsset = fetchFrom({
      "1.0.0": entry("1.0.0"),
      "1.1.0-alpha.1": entry("1.1.0-alpha.1"),
    });
    const first = await syncPages({ pages: [PAGE], releases, fetchAsset });
    const second = await syncPages({
      pages: first.pages,
      releases,
      fetchAsset,
    });
    expect(second.added).toEqual([[]]);
    expect(second.pages[0]).toBe(first.pages[0]);
  });

  test("refuses an asset headed with another version", async () => {
    const { errors } = await syncPages({
      pages: [PAGE],
      releases: [release("1.1.0")],
      fetchAsset: fetchFrom({ "1.1.0": entry("1.0.0") }),
    });
    expect(errors).toEqual([`1.1.0: ${CONFIG.asset} is headed 1.0.0`]);
  });

  test("updates several pages and downloads each asset once", async () => {
    let downloads = 0;
    const { pages } = await syncPages({
      pages: [PAGE, PAGE],
      releases: [release("1.1.0")],
      fetchAsset: async () => {
        downloads++;
        return entry("1.1.0");
      },
    });
    expect(pages[0]).toBe(pages[1]);
    expect(downloads).toBe(1);
  });

  test("finds the page in docs and in each versioned folder that has it", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "changelog-"));
    const write = (p) => {
      fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
      fs.writeFileSync(path.join(root, p), PAGE);
    };
    write(path.join("docs", CONFIG.page));
    write(path.join("versioned_docs", "version-8.10", CONFIG.page));
    fs.mkdirSync(path.join(root, "versioned_docs", "version-8.9"));
    expect(findPages(root)).toEqual([
      path.join("docs", CONFIG.page),
      path.join("versioned_docs", "version-8.10", CONFIG.page),
    ]);
    fs.rmSync(root, { recursive: true, force: true });
  });

  test("pages through releases and downloads assets as octet-stream", async () => {
    const seen = [];
    const server = createServer((req, res) => {
      seen.push([req.url, req.headers.accept, req.headers.authorization]);
      if (req.url.startsWith("/repos/o/r/releases")) {
        const page = Number(
          new URL(req.url, "http://x").searchParams.get("page")
        );
        res.setHeader("content-type", "application/json");
        return res.end(
          JSON.stringify(
            Array.from({ length: page === 1 ? 100 : 3 }, (_, i) => ({ id: i }))
          )
        );
      }
      res.end("## 1.0.0 (2026-10-13)");
    });
    await new Promise((resolve) => server.listen(0, "localhost", resolve));
    try {
      const api = `http://localhost:${server.address().port}`;
      const client = githubClient("test-token", api);
      expect((await client.listReleases("o/r")).length).toBe(103);
      expect(await client.fetchAsset({ url: `${api}/assets/1` })).toBe(
        "## 1.0.0 (2026-10-13)"
      );
      expect(seen.map(([url]) => url)).toEqual([
        "/repos/o/r/releases?per_page=100&page=1",
        "/repos/o/r/releases?per_page=100&page=2",
        "/assets/1",
      ]);
      expect(seen[2][1]).toBe("application/octet-stream");
      expect(seen.every(([, , auth]) => auth === "Bearer test-token")).toBe(
        true
      );
    } finally {
      server.close();
    }
  });
});
