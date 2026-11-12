#!/usr/bin/env node
/**
 * Post-build step: rewrite internal links in the generated LLM files to
 * absolute URLs.
 *
 * docusaurus-plugin-llms copies link targets verbatim from the source
 * Markdown, so the output contains links such as `/components/foo.md` or
 * `../bar/baz.md` that cannot be resolved outside the browser. This script
 * resolves each internal link against the page it came from and replaces it
 * with the page's absolute URL (https://docs.camunda.io/docs/.../page/).
 *
 * It processes:
 *   - build/docs/**\/*.md  (per-page Markdown; each file knows its source page)
 *   - build/llms-full.txt  (sections are matched back to their per-page file)
 *
 * It is a no-op when the llms output is absent (e.g. DOCS_SKIP_LLMS_TXT=true).
 * Run via `npm run postbuild` (npm invokes it automatically after `build`).
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SITE_DIR = path.resolve(__dirname, "..");
const BUILD_DIR = path.join(SITE_DIR, "build");
const META_DIR = path.join(
  SITE_DIR,
  ".docusaurus",
  "docusaurus-plugin-content-docs",
  "default"
);
const SITE_URL = (
  process.env.DOCS_SITE_URL || "https://docs.camunda.io"
).replace(/\/+$/, "");
const BASE_URL = (process.env.DOCS_SITE_BASE_URL || "/").replace(/\/+$/, "");
const FULL_FILE = path.join(BUILD_DIR, "llms-full.txt");
const MD_ROOT = path.join(BUILD_DIR, "docs");

/**
 * The plugin emits URLs as /docs/<route> whichever version the docs/ folder
 * is published under, so key everything on the version-neutral route and
 * build links the same way. (`.docusaurus` may also hold stale metadata from
 * earlier builds with other permalinks for the same source.)
 */
const toRoute = (permalink) =>
  permalink.replace(/^\/docs(?:\/next)?(?=\/|$)/, "").replace(/\/$/, "");

/** Load `source` (e.g. docs/a/b.md) <-> route (e.g. /a/b) for every doc. */
function loadDocMetadata() {
  const bySource = new Map();
  const byRoute = new Map();
  for (const name of fs.readdirSync(META_DIR)) {
    if (!name.startsWith("site-") || !name.endsWith(".json")) continue;
    const meta = JSON.parse(fs.readFileSync(path.join(META_DIR, name), "utf8"));
    if (!meta.source || !meta.permalink) continue;
    const source = meta.source.replace(/^@site\//, "");
    if (!source.startsWith("docs/")) {
      // Docs in versioned_docs/ are only link targets (cross-version links).
      // Stale metadata may hold other permalinks, so keep the first seen.
      if (source.startsWith("versioned_docs/") && !bySource.has(source)) {
        bySource.set(source, { source, url: meta.permalink });
      }
      continue;
    }
    // The llms plugin only reads `docs/`; its URLs are /docs/<route>.
    const entry = { source, route: toRoute(meta.permalink) };
    entry.url = `/docs${entry.route}`;
    bySource.set(source, entry);
    byRoute.set(entry.route, entry);
  }
  return { bySource, byRoute };
}

const ABSOLUTE_SCHEME = /^[a-zA-Z][a-zA-Z0-9+.-]*:/;

/**
 * Resolve one link target found in the page whose source file is
 * `sourceFile` (site-relative, e.g. docs/a/b.md), or null when the page is
 * unknown (then only links that do not depend on it are resolved). Returns
 * the rewritten target, or null to leave it unchanged.
 */
function resolveLink(target, sourceFile, meta) {
  if (!target || /^[#<]/.test(target) || target.startsWith("//")) return null;
  if (ABSOLUTE_SCHEME.test(target)) return null;

  const match = /^([^#?]*)([?#].*)?$/.exec(target);
  const filePart = match[1];
  const suffix = match[2] || "";
  const origin = `${SITE_URL}${BASE_URL}`;

  if (/\.mdx?$/.test(filePart)) {
    // `/x/y.md` is relative to the docs root (or names a versioned_docs file).
    // Other targets are relative to the source file, falling back to the docs
    // root as Docusaurus does.
    let entry;
    if (filePart.startsWith("/")) {
      entry =
        meta.bySource.get(path.posix.join("docs", filePart)) ||
        meta.bySource.get(filePart.slice(1));
    } else if (sourceFile) {
      entry =
        meta.bySource.get(
          path.posix.join(path.posix.dirname(sourceFile), filePart)
        ) || meta.bySource.get(path.posix.join("docs", filePart));
    }
    return entry ? `${origin}${entry.url}${suffix}` : null;
  }

  // Site-root paths (`/downloads`, `/docs/...`, `/bpmn/x.bpmn`).
  if (filePart.startsWith("/")) return `${origin}${target}`;

  // Extensionless relative links are URL-relative. Pages are served with a
  // trailing slash, so resolve against the page's own URL directory.
  if (sourceFile && /^\.\.?\//.test(filePart)) {
    const page = meta.bySource.get(sourceFile);
    if (!page || !page.route) return null;
    const resolved = path.posix.join(`/docs${page.route}/`, filePart);
    const route = resolved.replace(/^\/docs/, "").replace(/\/$/, "");
    if (meta.byRoute.has(route))
      return `${origin}${resolved.replace(/\/?$/, "/")}${suffix}`;
  }
  return null;
}

const LINK_RE = /(!?\[[^\]]*\]\()([^)\s]+)((?:\s+"[^"]*")?\))/g;

function rewriteContent(content, sourceFile, meta, stats) {
  return content.replace(LINK_RE, (whole, open, target, close) => {
    if (open.startsWith("!")) return whole;
    const out = resolveLink(target, sourceFile, meta);
    if (out === null) {
      if (!ABSOLUTE_SCHEME.test(target) && !/^[#<]/.test(target)) {
        stats.unresolved.push(
          `${sourceFile || "(unmatched section)"}: ${target}`
        );
      }
      return whole;
    }
    stats.rewritten++;
    return `${open}${out}${close}`;
  });
}

module.exports = { resolveLink, rewriteContent, loadDocMetadata };

if (require.main === module) {
  main();
}

function main() {
  if (!fs.existsSync(FULL_FILE)) {
    console.log("[llms-absolute-links] no llms output found, skipping.");
    return;
  }
  const meta = loadDocMetadata();
  const stats = { rewritten: 0, unresolved: [] };
  // Page-body fingerprints -> page. `exact` keys the normalized text;
  // `loose` ignores block order, which the plugin occasionally shuffles.
  // A fingerprint shared by several pages is ambiguous and never used.
  const exact = new Map();
  const loose = new Map();
  const AMBIGUOUS = null;
  const addKey = (map, key, entry) =>
    map.set(key, map.has(key) && map.get(key) !== entry ? AMBIGUOUS : entry);

  // 1. Per-page Markdown files.
  const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(dir, e.name);
      return e.isDirectory() ? walk(p) : p.endsWith(".md") ? [p] : [];
    });
  for (const file of walk(MD_ROOT)) {
    const route = "/" + path.relative(MD_ROOT, file).replace(/\.md$/, "");
    const entry = meta.byRoute.get(route);
    if (!entry) continue;
    const original = fs.readFileSync(file, "utf8");
    // llms-full.txt sometimes keeps a page's description paragraph and
    // sometimes drops it, so index the page body both ways.
    const body = stripPageHeader(original);
    for (const variant of [body, body.replace(/^> [^\n]*\n+/, "")]) {
      const norm = normalizeBody(variant);
      addKey(exact, norm, entry);
      addKey(loose, looseKey(norm), entry);
    }
    const updated = rewriteContent(original, entry.source, meta, stats);
    if (updated !== original) fs.writeFileSync(file, updated);
  }
  console.log(
    `[llms-absolute-links] per-page files: ${stats.rewritten} links rewritten`
  );

  // 2. llms-full.txt: match each section back to its page.
  if (fs.existsSync(FULL_FILE)) {
    const full = fs.readFileSync(FULL_FILE, "utf8");
    const parts = full.split(/\n---\n\n(?=## )/);
    let matched = 0;
    const unmatched = [];
    const before = stats.rewritten;
    const out = parts.map((part, i) => {
      const m = /(^|\n)## [^\n]*\n\n/.exec(part);
      if (!m) return part;
      const head = part.slice(0, m.index + m[0].length);
      const body = part.slice(head.length);
      const norm = normalizeBody(body);
      const entry = exact.get(norm) || loose.get(looseKey(norm));
      if (!entry) {
        unmatched.push(head.trim().split("\n").pop());
        return head + rewriteContent(body, null, meta, stats);
      }
      matched++;
      return head + rewriteContent(body, entry.source, meta, stats);
    });
    fs.writeFileSync(FULL_FILE, out.join("\n---\n\n"));
    console.log(
      `[llms-absolute-links] llms-full.txt: ${parts.length} sections, ${matched} matched, ${
        stats.rewritten - before
      } links rewritten`
    );
    if (unmatched.length) {
      console.warn(
        `[llms-absolute-links] ${unmatched.length} sections not matched (only links that do not depend on the page were rewritten), e.g.:\n  ` +
          unmatched.slice(0, 10).join("\n  ")
      );
    }
  }
  if (stats.unresolved.length) {
    console.warn(
      `[llms-absolute-links] ${stats.unresolved.length} internal links could not be resolved, e.g.:\n  ` +
        stats.unresolved.slice(0, 10).join("\n  ")
    );
  }
}

/** Remove the `# Title` line the plugin adds to per-page files. */
function stripPageHeader(text) {
  return text.replace(/^# [^\n]*\n+/, "");
}

/** Order-insensitive fingerprint of normalized text. */
function looseKey(norm) {
  return crypto
    .createHash("sha1")
    .update(norm.split(" ").sort().join(" "))
    .digest("hex");
}

/** Normalize so a per-page body and its llms-full.txt section compare equal. */
function normalizeBody(text) {
  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "") // per-page files quote the description
    .replace(/\]\([^)]*\)/g, "]()") // ignore link targets (rewritten or not)
    .replace(/\s+/g, " ")
    .trim();
}
