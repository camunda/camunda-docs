#!/usr/bin/env node

/**
 * Adds an entry to the ProcessOS Harness changelog page for every published
 * ProcessOS release the page is missing.
 *
 * Every camunda/process-os release, alpha and stable, carries its entry as the
 * release asset `docs-changelog.md`: a `## <version> (<yyyy-mm-dd>)` heading
 * followed by the changes, already escaped for MDX. This script:
 * 1. Finds the changelog page in `docs/` and in every `versioned_docs/` version
 * 2. Lists the published releases of camunda/process-os
 * 3. Inserts each missing version's entry into its section, newest first
 *
 * The page has two sections, `## Stable` and `## Alpha`. A stable entry is
 * inserted as a `### <version> (<yyyy-mm-dd>)` heading; an alpha entry as a
 * `<details>` block, collapsed by default, with the heading as its summary.
 * The entry's own headings move down one level to sit below either.
 *
 * Rules:
 * - An entry already on a page is never rewritten, so an edit made on the
 *   page by hand survives every later run, and a second run changes nothing.
 * - Releases older than the oldest one with a `docs-changelog.md` asset were
 *   published before entries existed and get a placeholder entry.
 * - A newer release without the asset fails the run, since its placeholder
 *   would never be replaced. No page is written when any error occurs.
 *
 * camunda/process-os is private, so GITHUB_TOKEN must be able to read its
 * contents and releases.
 */

const fs = require("fs");
const path = require("path");

const CONFIG = {
  repository: "camunda/process-os",
  asset: "docs-changelog.md",
  // The page, relative to `docs/` and to each `versioned_docs/version-*/`.
  page: "components/process-os-harness/changelog.md",
  placeholder: "No changelog available for this release.",
  // The `## ` headings of the page's sections.
  sections: { stable: "Stable", alpha: "Alpha" },
};

const V = String.raw`\d+\.\d+\.\d+(?:-alpha\.\d+)?`;
const VERSION = /^(\d+)\.(\d+)\.(\d+)(?:-alpha\.(\d+))?$/;
const RELEASE_TAG = new RegExp(String.raw`^v(${V})$`);
// The heading an asset starts with.
const ASSET_HEADING = new RegExp(String.raw`^## (${V})(?=[ \t]|\r?$)`, "m");
// An entry on the page is identified by its heading or its summary alone: an
// HTML comment marker is a syntax error in MDX.
const PAGE_ENTRY = new RegExp(
  String.raw`^(?:### (${V})(?=[ \t]|\r?$)|<details>\r?\n<summary>(${V})(?=[ \t<]))`,
  "gm"
);

/**
 * Order two release versions by semver precedence: `1.1.0-alpha.2` < `1.1.0`.
 */
function compareVersions(a, b) {
  const pa = VERSION.exec(a);
  const pb = VERSION.exec(b);
  if (!pa || !pb) throw new Error(`Not a release version: ${!pa ? a : b}`);
  for (let i = 1; i <= 3; i++) {
    if (Number(pa[i]) !== Number(pb[i])) return Number(pa[i]) - Number(pb[i]);
  }
  if (pa[4] === pb[4]) return 0;
  if (pa[4] === undefined) return 1;
  if (pb[4] === undefined) return -1;
  return Number(pa[4]) - Number(pb[4]);
}

const isAlpha = (version) => version.includes("-alpha.");

/**
 * Every entry on a page, in page order.
 */
function findEntries(page) {
  return [...page.matchAll(PAGE_ENTRY)].map((m) => ({
    version: m[1] ?? m[2],
    offset: m.index,
  }));
}

/**
 * The version an asset's heading names, or undefined.
 */
function assetVersion(asset) {
  return ASSET_HEADING.exec(asset)?.[1];
}

/**
 * Turn an asset into the form its section holds, with LF line endings.
 */
function formatEntry(asset) {
  const [heading, ...rest] = asset.replace(/\r\n/g, "\n").trim().split("\n");
  const title = heading.replace(/^## /, "");
  const body = rest
    .join("\n")
    .trim()
    .replace(/^(#{1,5}) /gm, "#$1 ");
  if (!isAlpha(assetVersion(asset))) return `### ${title}\n\n${body}`;
  return `<details>\n<summary>${title}</summary>\n\n${body}\n\n</details>`;
}

/**
 * Where a section's content starts and ends on a page.
 */
function findSection(page, name) {
  const heading = new RegExp(String.raw`^## ${name}[ \t]*\r?$`, "m").exec(page);
  if (!heading) throw new Error(`The page has no "## ${name}" section`);
  const start = heading.index + heading[0].length;
  const next = /^## /m.exec(page.slice(start));
  return { start, end: next ? start + next.index : page.length };
}

/**
 * Insert one entry into its section, newest first: before the first entry
 * in that section with a lower version, or at the end of the section.
 * Nothing else on the page moves.
 */
function insertEntry(page, asset) {
  const version = assetVersion(asset);
  if (!version) throw new Error("Entry has no version heading");
  const section = CONFIG.sections[isAlpha(version) ? "alpha" : "stable"];
  const { start, end } = findSection(page, section);
  const eol = page.includes("\r\n") ? "\r\n" : "\n";
  const text = formatEntry(asset).split("\n").join(eol);
  const next = findEntries(page).find(
    (e) =>
      e.offset >= start &&
      e.offset < end &&
      compareVersions(e.version, version) < 0
  );
  if (next) {
    return (
      page.slice(0, next.offset) + text + eol + eol + page.slice(next.offset)
    );
  }
  const before = page.slice(0, end).replace(/(\r?\n)+$/, "");
  const after = end < page.length ? eol + page.slice(end) : "";
  return before + eol + eol + text + eol + after;
}

/**
 * Reduce a GitHub Releases listing to the published ProcessOS releases,
 * newest first.
 */
function publishedReleases(releases) {
  return releases
    .filter((r) => !r.draft && r.published_at)
    .map((r) => ({ release: r, match: RELEASE_TAG.exec(r.tag_name ?? "") }))
    .filter(({ match }) => match)
    .map(({ release, match }) => ({
      version: match[1],
      date: release.published_at.slice(0, 10),
      asset:
        (release.assets ?? []).find((a) => a.name === CONFIG.asset) ?? null,
    }))
    .sort((a, b) => compareVersions(b.version, a.version));
}

/**
 * Decide, per missing version, whether it gets its asset or the placeholder.
 * The cutoff is the oldest release that has an asset.
 */
function planPage(releases, present) {
  const cutoff =
    releases
      .filter((r) => r.asset)
      .map((r) => r.version)
      .sort(compareVersions)[0] ?? null;
  const plan = [];
  const errors = [];
  for (const r of releases) {
    if (present.has(r.version)) continue;
    if (!r.asset && cutoff !== null && compareVersions(r.version, cutoff) > 0) {
      errors.push(`${r.version}: published without ${CONFIG.asset}`);
      continue;
    }
    plan.push(r);
  }
  return { plan, errors };
}

/**
 * Bring every page up to date with the published releases.
 *
 * @param {object} opts
 * @param {string[]} opts.pages Page contents.
 * @param {object[]} opts.releases Rows from `GET /repos/{repo}/releases`.
 * @param {(asset: object) => Promise<string>} opts.fetchAsset
 * @returns {Promise<{pages: string[], added: string[][], errors: string[]}>}
 */
async function syncPages({ pages, releases, fetchAsset }) {
  const published = publishedReleases(releases);
  const cache = new Map();
  const entryFor = async (r) => {
    if (!r.asset)
      return `## ${r.version} (${r.date})\n\n${CONFIG.placeholder}\n`;
    if (!cache.has(r.version)) cache.set(r.version, await fetchAsset(r.asset));
    const entry = cache.get(r.version);
    const version = assetVersion(entry);
    if (version !== r.version) {
      throw new Error(
        `${r.version}: ${CONFIG.asset} is headed ${version ?? "with no version"}`
      );
    }
    return entry;
  };
  const out = [];
  const added = [];
  const errors = [];
  for (const page of pages) {
    const present = new Set(findEntries(page).map((e) => e.version));
    const { plan, errors: planErrors } = planPage(published, present);
    errors.push(...planErrors);
    let next = page;
    for (const r of plan) {
      try {
        next = insertEntry(next, await entryFor(r));
      } catch (error) {
        errors.push(error.message);
      }
    }
    out.push(next);
    added.push(plan.map((r) => r.version));
  }
  return { pages: out, added, errors: [...new Set(errors)] };
}

/**
 * The changelog page in `docs/` and in every versioned docs folder that has
 * one, relative to the repository root.
 */
function findPages(root) {
  const candidates = [path.join("docs", CONFIG.page)];
  const versioned = path.join(root, "versioned_docs");
  if (fs.existsSync(versioned)) {
    for (const dir of fs.readdirSync(versioned).sort()) {
      candidates.push(path.join("versioned_docs", dir, CONFIG.page));
    }
  }
  return candidates.filter((p) => fs.existsSync(path.join(root, p)));
}

/**
 * A minimal GitHub REST client. Assets are downloaded through their API
 * `url`, not `browser_download_url`: only the API url accepts a token for a
 * private repository's assets.
 */
function githubClient(token, api = "https://api.github.com") {
  const headers = {
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "camunda-docs-process-os-changelog-updater-script",
  };
  const get = async (url, accept) => {
    const response = await fetch(url, {
      headers: { ...headers, Accept: accept },
    });
    if (!response.ok) {
      throw new Error(`GET ${url}: ${response.status} ${response.statusText}`);
    }
    return response;
  };
  return {
    async listReleases(repository) {
      const all = [];
      for (let page = 1; ; page++) {
        const response = await get(
          `${api}/repos/${repository}/releases?per_page=100&page=${page}`,
          "application/vnd.github+json"
        );
        const batch = await response.json();
        all.push(...batch);
        if (batch.length < 100) return all;
      }
    },
    async fetchAsset(asset) {
      const response = await get(asset.url, "application/octet-stream");
      return response.text();
    },
  };
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error(`GITHUB_TOKEN must be able to read ${CONFIG.repository}`);
  }
  const root = process.cwd();
  const files = findPages(root);
  if (files.length === 0) {
    throw new Error(`No changelog page found at docs/${CONFIG.page}`);
  }

  const client = githubClient(token);
  console.log(`🔍 Fetching releases of ${CONFIG.repository}...`);
  const releases = await client.listReleases(CONFIG.repository);

  const pages = files.map((f) => fs.readFileSync(path.join(root, f), "utf8"));
  const result = await syncPages({
    pages,
    releases,
    fetchAsset: client.fetchAsset,
  });
  if (result.errors.length) {
    for (const error of result.errors) console.error(`❌ ${error}`);
    throw new Error("No page was written");
  }

  files.forEach((file, i) => {
    if (result.pages[i] !== pages[i]) {
      fs.writeFileSync(path.join(root, file), result.pages[i]);
    }
    const added = result.added[i];
    console.log(
      `${file}: ${added.length ? `added ${added.join(", ")}` : "up to date"}`
    );
  });
}

if (require.main === module) {
  main().catch((error) => {
    console.error("❌ Script failed:", error.message);
    process.exit(1);
  });
}

module.exports = {
  CONFIG,
  compareVersions,
  findEntries,
  findPages,
  formatEntry,
  githubClient,
  insertEntry,
  planPage,
  publishedReleases,
  syncPages,
};
