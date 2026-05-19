const fs = require("node:fs");
const path = require("node:path");

const glossaryCache = new Map();

function walk(node, visitor) {
  if (!node || typeof node !== "object") {
    return;
  }

  visitor(node);

  if (Array.isArray(node.children)) {
    node.children.forEach((child) => walk(child, visitor));
  }
}

function slugifyHeading(value) {
  return value
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z0-9#]+;/gi, "")
    .replace(/[']/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function stripInlineMarkdown(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSummary(lines, startIndex) {
  const summaryLines = [];

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      if (summaryLines.length > 0) {
        break;
      }

      continue;
    }

    if (/^#{2,3}\s+/.test(trimmed)) {
      break;
    }

    if (/^(:::|```|<details>|<div|\||- |\d+\. )/.test(trimmed)) {
      if (summaryLines.length > 0) {
        break;
      }

      continue;
    }

    summaryLines.push(trimmed);
  }

  return stripInlineMarkdown(summaryLines.join(" "));
}

function parseGlossaryFile(glossaryPath) {
  if (glossaryCache.has(glossaryPath)) {
    return glossaryCache.get(glossaryPath);
  }

  const terms = new Map();

  if (!fs.existsSync(glossaryPath)) {
    glossaryCache.set(glossaryPath, terms);
    return terms;
  }

  const content = fs.readFileSync(glossaryPath, "utf8");
  const lines = content.split(/\r?\n/);
  let startIndex = 0;

  if (lines[0] === "---") {
    startIndex = 1;
    while (startIndex < lines.length && lines[startIndex] !== "---") {
      startIndex += 1;
    }
    startIndex += 1;
  }

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^###\s+(.*)$/);

    if (!match) {
      continue;
    }

    const title = stripInlineMarkdown(match[1]);
    const slug = slugifyHeading(title);
    const summary = extractSummary(lines, index + 1);

    if (slug && summary) {
      terms.set(slug, { title, summary });
    }
  }

  glossaryCache.set(glossaryPath, terms);
  return terms;
}

function getDocsRoot(sourceFilePath) {
  const normalizedPath = sourceFilePath.split(path.sep).join("/");
  const versionMatch = normalizedPath.match(
    /\/versioned_docs\/(version-[^/]+)\//
  );

  if (versionMatch) {
    return path.join(process.cwd(), "versioned_docs", versionMatch[1]);
  }

  return path.join(process.cwd(), "docs");
}

function normalizeGlossaryRoute(targetPath) {
  return targetPath
    .replace(/^\/docs\/(?:next\/|\d+\.\d+\/)?/, "/")
    .replace(/\/$/, "");
}

function resolveGlossaryTarget(sourceFilePath, url) {
  if (!url || url.startsWith("#") || /^(https?:)?\/\//.test(url)) {
    return null;
  }

  const [targetPath, hash] = url.split("#");

  if (!hash) {
    return null;
  }

  const docsRoot = getDocsRoot(sourceFilePath);
  const normalizedTargetPath = normalizeGlossaryRoute(targetPath);
  let absolutePath;

  if (normalizedTargetPath.startsWith("/")) {
    absolutePath = path.join(docsRoot, normalizedTargetPath.replace(/^\//, ""));
  } else {
    absolutePath = path.resolve(
      path.dirname(sourceFilePath),
      normalizedTargetPath
    );
  }

  if (!path.extname(absolutePath)) {
    absolutePath = `${absolutePath.replace(/\/$/, "")}.md`;
  }

  if (path.basename(absolutePath, path.extname(absolutePath)) !== "glossary") {
    return null;
  }

  return {
    glossaryPath: absolutePath,
    hash,
  };
}

module.exports = function remarkGlossaryTerms() {
  return (tree, file) => {
    const sourceFilePath = file.history && file.history[0];

    if (!sourceFilePath || path.basename(sourceFilePath) === "glossary.md") {
      return;
    }

    walk(tree, (node) => {
      if (node.type !== "link") {
        return;
      }

      const target = resolveGlossaryTarget(sourceFilePath, node.url);

      if (!target) {
        return;
      }

      const glossaryTerms = parseGlossaryFile(target.glossaryPath);
      const term = glossaryTerms.get(target.hash.toLowerCase());

      if (!term) {
        return;
      }

      node.type = "mdxJsxTextElement";
      node.name = "GlossaryTerm";
      node.attributes = [
        { type: "mdxJsxAttribute", name: "href", value: node.url },
        { type: "mdxJsxAttribute", name: "title", value: term.title },
        { type: "mdxJsxAttribute", name: "summary", value: term.summary },
      ];
    });
  };
};
