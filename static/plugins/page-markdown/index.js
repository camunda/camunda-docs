// Plugin to generate a clean Markdown (.md) file for every doc page in every
// built docs version, so that "<page URL without trailing slash>.md" always
// matches the version of the page the reader is looking at.
//
// docusaurus-plugin-llms only reads the "docs" directory (the unreleased
// "next" version) and writes it to build/docs/..., which is the URL space of
// the current release. This plugin works from the docs plugin's loaded
// content instead, so each version gets its own files.
//
// NOTE: This relies on an internal of docusaurus-plugin-llms
// (lib/utils: cleanMarkdownContent) so the output stays consistent with the
// files that plugin generates. Revisit when upgrading it.
const { mkdir, readFile, writeFile } = require("node:fs/promises");
const { dirname, join, resolve } = require("node:path");
const { cleanMarkdownContent } = require("docusaurus-plugin-llms/lib/utils");

const BATCH_SIZE = 50;

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Inline Markdown imports (`import Foo from "./_foo.mdx"` plus `<Foo />`).
// Any .md/.mdx import is inlined, not only underscore-prefixed partials, since
// docs also import shared content such as react-components/licensing.md.
// docusaurus-plugin-llms has an equivalent, but it treats the specifier as a
// literal path, so MDX-escaped specifiers such as "./partials/\_api.md" fail
// to resolve. Decode the escapes before resolving, at every nesting level.
async function resolvePartialImports(
  content,
  filePath,
  rewrite = (text) => text,
  chain = new Set()
) {
  const importRegex =
    /^\s*import\s+(?:(\w+)|{\s*(\w+)\s*})\s+from\s+(['"])([^'"]+\.mdx?)\3;?\s*$/gm;
  const imports = new Map();
  for (const match of content.matchAll(importRegex)) {
    imports.set(match[1] || match[2], match[4]);
  }

  let resolved = content;
  for (const [name, rawSpecifier] of imports) {
    const specifier = rawSpecifier.replace(/\\(.)/g, "$1");
    const importLine = new RegExp(
      `^\\s*import\\s+(?:${escapeRegex(name)}|{\\s*${escapeRegex(name)}\\s*})\\s+from\\s+['"]${escapeRegex(rawSpecifier)}['"];?\\s*$`,
      "gm"
    );
    const removeUsage = new RegExp(
      `<${escapeRegex(name)}(?:\\s+[^>]*)?\\s*\\/?>(?:[\\s\\S]*?<\\/${escapeRegex(name)}>)?`,
      "g"
    );
    const partialPath = resolve(dirname(filePath), specifier);
    resolved = resolved.replace(importLine, "");
    try {
      if (chain.has(partialPath)) throw new Error("circular import");
      // Nested partials are inlined (and their links rebased) first. Then
      // rebase this partial's own links, which are relative to ITS directory,
      // before it is inserted into a page in a different directory.
      const partial = rewrite(
        await resolvePartialImports(
          stripFrontMatter(await readFile(partialPath, "utf8")),
          partialPath,
          rewrite,
          new Set(chain).add(partialPath)
        ),
        partialPath
      );
      const usage = new RegExp(
        `<${escapeRegex(name)}\\s*(?:[^>]*?)(?:/>|>[^<]*</${escapeRegex(name)}>)`,
        "g"
      );
      resolved = resolved.replace(usage, () => partial.trim());
    } catch (err) {
      console.warn(
        `[page-markdown] Could not resolve partial ${specifier} from ${filePath}: ${err.message}`
      );
      resolved = resolved.replace(removeUsage, "");
    }
  }
  return resolved;
}

// Document links such as "./agentic-orchestration/overview.md" (relative to
// the source file) or "/reference/glossary.md" (relative to the version's
// content root) are written against the source tree, but the export lives at
// the page's permalink, so they would point at missing files. Rewrite those
// that resolve to another doc in the same version to that doc's absolute .md
// URL. External URLs, anchors and static assets are left alone.
function rewriteDocLinks(
  content,
  sourcePath,
  { sourceToPermalink, contentRoot, siteUrl }
) {
  return content.replace(
    /\]\(([^)\s]+)((?:\s+"[^"]*")?)\)/g,
    (whole, target, title) => {
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)) return whole;
      const [pathPart, hash = ""] = target.split(/(?=#)/);
      if (!/\.mdx?$/.test(pathPart)) return whole;
      const decoded = decodeURI(pathPart);
      const absolute = decoded.startsWith("/")
        ? resolve(contentRoot, `.${decoded}`)
        : resolve(dirname(sourcePath), decoded);
      const permalink = sourceToPermalink.get(absolute);
      if (!permalink) return whole;
      return `](${siteUrl}${permalink.replace(/\/+$/, "")}.md${hash}${title})`;
    }
  );
}

// <PageDescription /> renders the page's description (front matter, or the
// first paragraph when unset) as a paragraph. Inline that text instead of
// leaving the component tag in the export. Also drops its import line, which
// would otherwise survive when the page imports nothing else.
function inlinePageDescription(content, description) {
  return content
    .replace(
      /^\s*import\s+PageDescription\s+from\s+['"][^'"]*PageDescription['"];?\s*$/gm,
      ""
    )
    .replace(
      /<PageDescription\s*\/>|<PageDescription>\s*<\/PageDescription>/g,
      () => (description ?? "").trim()
    );
}

// Convert a simple glob (supports "*") to a RegExp matched against doc IDs.
function globToRegExp(glob) {
  const escaped = glob
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*");
  return new RegExp(`^${escaped}$`);
}

function stripFrontMatter(content) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

// Permalinks include baseUrl, outDir does not.
function outputPathFor(permalink, baseUrl) {
  const base = baseUrl.replace(/\/+$/, "");
  let path = permalink.startsWith(base)
    ? permalink.slice(base.length)
    : permalink;
  path = path.replace(/^\/+|\/+$/g, "");
  return `${path || "index"}.md`;
}

module.exports = function pageMarkdownPlugin(context, opts = {}) {
  const { ignore = [] } = opts;
  const ignoreRegExps = ignore.map(globToRegExp);

  return {
    name: "page-markdown",

    async postBuild({ plugins, outDir, siteConfig }) {
      const { siteDir } = context;
      const { baseUrl, url } = siteConfig;
      const jobs = [];

      for (const plugin of plugins) {
        if (plugin.name !== "docusaurus-plugin-content-docs") continue;
        for (const version of plugin.content?.loadedVersions ?? []) {
          const sourceToPermalink = new Map();
          const contentRoot = resolve(siteDir, version.contentPath);
          for (const doc of version.docs) {
            sourceToPermalink.set(
              doc.source.replace(/^@site\//, `${siteDir}/`),
              doc.permalink
            );
          }
          for (const doc of version.docs) {
            if (doc.frontMatter?.draft) continue;
            if (ignoreRegExps.some((re) => re.test(doc.id))) continue;
            jobs.push({
              doc,
              versionLabel: version.label,
              isLast: version.isLast,
              linkContext: { sourceToPermalink, contentRoot, siteUrl: url },
            });
          }
        }
      }

      let written = 0;
      let skipped = 0;

      const generate = async ({ doc, versionLabel, isLast, linkContext }) => {
        const sourcePath = doc.source.replace(/^@site\//, `${siteDir}/`);
        let raw;
        try {
          raw = await readFile(sourcePath, "utf8");
        } catch {
          skipped += 1; // Generated pages without a source file.
          return;
        }
        let content = stripFrontMatter(raw);
        const rewrite = (text, fromPath) =>
          rewriteDocLinks(text, fromPath, linkContext);
        content = inlinePageDescription(content, doc.description);
        content = await resolvePartialImports(content, sourcePath, rewrite);
        content = cleanMarkdownContent(content, true, true);
        content = rewrite(content, sourcePath);

        const permalink = doc.permalink.replace(/\/*$/, "/");
        const pageUrl = `${url}${permalink}`;
        const header = `> Camunda 8 documentation, version ${versionLabel}. HTML version: ${pageUrl}. Documentation index: ${url}${baseUrl.replace(/\/+$/, "")}/llms.txt`;
        const output = `# ${doc.title}\n\n${header}\n\n${content.trim()}\n`;

        const outPaths = [outputPathFor(doc.permalink, baseUrl)];
        if (isLast) {
          // docusaurus-plugin-llms builds the .md links in llms-*.txt from the
          // source file path, which differs from the permalink when a doc sets
          // a custom slug. Also write the file there so those links resolve.
          const relSource = doc.source
            .replace(/^@site\/(versioned_docs\/version-[^/]+|docs)\//, "")
            .replace(/\.mdx?$/, "");
          const alias = `docs/${relSource}.md`;
          if (!outPaths.includes(alias)) outPaths.push(alias);
        }
        for (const relPath of outPaths) {
          const outPath = join(outDir, relPath);
          await mkdir(dirname(outPath), { recursive: true });
          await writeFile(outPath, output, "utf8");
        }
        written += 1;
      };

      for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
        await Promise.all(jobs.slice(i, i + BATCH_SIZE).map(generate));
      }

      console.log(
        `[page-markdown] Wrote ${written} Markdown files (${skipped} skipped, no source file).`
      );
    },
  };
};

// Exposed for unit tests.
module.exports.resolvePartialImports = resolvePartialImports;
module.exports.rewriteDocLinks = rewriteDocLinks;
module.exports.inlinePageDescription = inlinePageDescription;
