function resolveBuildVersions(value, currentVersion, versionedVersions) {
  if (!value) return null;

  const supportedVersions = new Set([
    "current",
    currentVersion,
    ...versionedVersions,
  ]);
  const buildVersions = [
    ...new Set(
      value.split(",").map((value) => {
        const version = value.trim();

        if (version === "next") return "current";
        if (version === "current") return currentVersion;

        return version;
      })
    ),
  ];

  for (const version of buildVersions) {
    if (!supportedVersions.has(version)) {
      throw new Error(
        `DOCS_BUILD_VERSIONS contains unsupported version "${version}". ` +
          `Use next, current, or one of: ${versionedVersions.join(", ")}.`
      );
    }
  }

  return buildVersions;
}

function bypassOutOfScopeLinks({
  fileContent,
  partialBuild,
  skipGeneratedReferences,
  buildVersions,
}) {
  const bypass = (url) => {
    const path = url.split(/[?#]/, 1)[0];
    const rootRelativeDocLink = path.startsWith("/docs/");
    const skippedVersionLink = buildVersions
      ? [...path.matchAll(/versioned_docs\/version-(\d+\.\d+)\//g)].some(
          ([, version]) => !buildVersions.includes(version)
        )
      : false;
    const skippedGeneratedReference =
      skipGeneratedReferences &&
      path.includes("apis-tools/typescript/api-reference");

    // Root-relative docs links may resolve to another version. A scoped build
    // cannot establish their target version, so CI validates these links.
    if (
      (partialBuild && (rootRelativeDocLink || skippedVersionLink)) ||
      skippedGeneratedReference
    ) {
      return `pathname://${url}`;
    }

    return url;
  };

  return fileContent
    .replace(
      /(\]\()\s*([^\s)]+)/g,
      (match, open, url) => `${open}${bypass(url)}`
    )
    .replace(
      /(^\[[^\]]+\]:\s*)(\S+)/gm,
      (match, definition, url) => `${definition}${bypass(url)}`
    );
}

const apiSpecificationPage =
  /[\\/]apis-tools[\\/][^\\/]+[\\/]specifications[\\/][^\\/]+\.mdx$/;
const keptSpecificationFrontMatter =
  /^(id|title|sidebar_label|sidebar_position|sidebar_class_name):/;

// Sidebars list OpenAPI pages by doc ID, so they cannot be excluded. Keep the
// page (ID, sidebar entry, link target) and drop its costly generated content.
function stubApiSpecification({ filePath, fileContent }) {
  if (!apiSpecificationPage.test(filePath)) return null;

  const frontMatter = fileContent.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontMatter) return null;

  const kept = frontMatter[1]
    .split("\n")
    .filter((line) => keptSpecificationFrontMatter.test(line));

  return `---\n${kept.join("\n")}\n---\n\nGenerated API reference skipped in this build.\n`;
}

module.exports = {
  bypassOutOfScopeLinks,
  resolveBuildVersions,
  stubApiSpecification,
};
