// Plugin to generate a clean Markdown (.md) file for every doc page in every
// built docs version, so that "<page URL without trailing slash>.md" always
// matches the version of the page the reader is looking at.
//
// docusaurus-plugin-llms only reads the "docs" directory (the unreleased
// "next" version) and writes it to build/docs/..., which is the URL space of
// the current release. This plugin works from the docs plugin's loaded
// content instead, so each version gets its own files.
//
// NOTE: This relies on internals of docusaurus-plugin-llms
// (lib/utils: resolvePartialImports, cleanMarkdownContent) so the output stays
// consistent with the files that plugin generates. Revisit when upgrading it.
const { mkdir, readFile, writeFile } = require("node:fs/promises");
const { dirname, join } = require("node:path");
const {
  resolvePartialImports,
  cleanMarkdownContent,
} = require("docusaurus-plugin-llms/lib/utils");

const BATCH_SIZE = 50;

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
          for (const doc of version.docs) {
            if (doc.frontMatter?.draft) continue;
            if (ignoreRegExps.some((re) => re.test(doc.id))) continue;
            jobs.push({
              doc,
              versionLabel: version.label,
              isLast: version.isLast,
            });
          }
        }
      }

      let written = 0;
      let skipped = 0;

      const generate = async ({ doc, versionLabel, isLast }) => {
        const sourcePath = doc.source.replace(/^@site\//, `${siteDir}/`);
        let raw;
        try {
          raw = await readFile(sourcePath, "utf8");
        } catch {
          skipped += 1; // Generated pages without a source file.
          return;
        }
        let content = stripFrontMatter(raw);
        content = await resolvePartialImports(content, sourcePath);
        content = cleanMarkdownContent(content, true, true);

        const permalink = doc.permalink.replace(/\/*$/, "/");
        const pageUrl = `${url}${permalink}`;
        const header = `> Camunda 8 documentation, version ${versionLabel}. HTML version: ${pageUrl}. Documentation index: ${url}/llms.txt`;
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
