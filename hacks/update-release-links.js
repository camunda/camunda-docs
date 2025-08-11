#!/usr/bin/env node

/**
 * Automation script to fetch GitHub releases and update release notes markdown files
 *
 * This script:
 * 1. Searches for all release notes markdown files in the repository following patterns (by convention)
 * 2. For each file, extracts the version from the filename or path structure
 * 3. Fetches releases from repositories configured for that version
 * 4. Updates release notes links between placeholder comment tags
 *
 * Configuration:
 * - CONFIG.targetVersions: Array of version strings (e.g., ['8.6', '8.7']) to process
 * - CONFIG.repositories: GitHub repositories to fetch releases from
 * - CONFIG.releaseLinksTag: Comment placeholder where release links should be inserted
 */

const fs = require("fs").promises;
const path = require("path");

// Configuration
const CONFIG = {
  repositories: [
    { owner: "camunda", repo: "camunda", name: "Camunda 8 core" },
    { owner: "camunda", repo: "connectors", name: "Connectors" },
  ],

  // Target minor versions to process (format: "major.minor")
  targetVersions: ["8.6", "8.7"],

  // Tag to identify where release links should be placed
  releaseLinksTag: "<!-- RELEASE_LINKS_PLACEHOLDER -->",
};

/**
 * Fetch releases from GitHub API with optimized pagination
 */
async function fetchReleases(
  owner,
  repo,
  maxReleases = 1000,
  githubToken = null
) {
  const releases = [];
  let page = 1;
  const perPage = 100; // Maximum allowed by GitHub API

  // Set up headers with optional authentication
  const headers = {
    "User-Agent": "camunda-docs-release-notes-updater-script",
  };

  if (githubToken) {
    headers["Authorization"] = `Bearer ${githubToken}`;
  }

  try {
    while (releases.length < maxReleases) {
      const url = `https://api.github.com/repos/${owner}/${repo}/releases?page=${page}&per_page=${perPage}`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch releases for ${owner}/${repo}: ${response.statusText}`
        );
      }

      const pageReleases = await response.json();

      // If no more releases, break the loop
      if (pageReleases.length === 0) {
        break;
      }

      // Filter out alpha releases and pre-releases as we go
      const filteredReleases = pageReleases.filter((release) => {
        return (
          !release.prerelease &&
          !release.tag_name.includes("alpha") &&
          !release.tag_name.includes("beta") &&
          !release.tag_name.includes("rc")
        );
      });

      releases.push(...filteredReleases);

      // If we got less than perPage releases, we've reached the end
      if (pageReleases.length < perPage) {
        break;
      }

      page++;
    }

    return releases;
  } catch (error) {
    console.error(
      `Error fetching releases for ${owner}/${repo}:`,
      error.message
    );
    return [];
  }
}

/**
 * Parse version from tag name (e.g., "8.7.0" -> { major: 8, minor: 7, patch: 0 })
 */
function parseVersion(tagName) {
  const match = tagName.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return null;

  return {
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3]),
    full: tagName,
  };
}

/**
 * Check if a version should be processed based on configuration
 */
function shouldProcessVersion(major, minor) {
  const versionString = `${major}.${minor}`;
  return CONFIG.targetVersions.includes(versionString);
}

/**
 * Find all release notes files using known patterns
 */
async function findReleaseNotesFiles() {
  const files = [];

  // Define the known patterns for release notes files
  const patterns = [
    "docs/reference/announcements-release-notes/*/*-release-notes.md",
    "versioned_docs/version-*/reference/announcements-release-notes/*/*-release-notes.md",
    "**/release-notes.md",
  ];

  try {
    for (const pattern of patterns) {
      // Use Node.js 20+ built-in glob support
      for await (const filePath of fs.glob(pattern)) {
        const version = extractVersionFromPath(filePath);
        if (version && shouldProcessVersion(version.major, version.minor)) {
          files.push({
            version: `${version.major}${version.minor}0`,
            filePath: filePath,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error finding release notes files:", error.message);
  }

  return files;
}

/**
 * Extract version information from file path
 */
function extractVersionFromPath(filePath) {
  // Try to extract from filename (e.g., "860-release-notes.md")
  const filenameMatch = path
    .basename(filePath)
    .match(/^(\d+)(\d)0-release-notes\.md$/);
  if (filenameMatch) {
    return {
      major: parseInt(filenameMatch[1]),
      minor: parseInt(filenameMatch[2]),
    };
  }

  return null;
}

/**
 * Generate the changelog links HTML for a specific version
 */
function generateChangelogLinks(releases, version) {
  const relevantReleases = releases.filter((repoReleases) => {
    return repoReleases.releases.some((release) => {
      const releaseVersion = parseVersion(release.tag_name);
      return (
        releaseVersion &&
        releaseVersion.major === version.major &&
        releaseVersion.minor === version.minor
      );
    });
  });

  if (relevantReleases.length === 0) return "";

  const allReleaseLinks = [];

  relevantReleases.forEach((repoReleases) => {
    // Get all releases for this version, sorted by patch version descending
    const allReleases = repoReleases.releases
      .filter((release) => {
        const releaseVersion = parseVersion(release.tag_name);
        return (
          releaseVersion &&
          releaseVersion.major === version.major &&
          releaseVersion.minor === version.minor
        );
      })
      .sort((a, b) => {
        const versionA = parseVersion(a.tag_name);
        const versionB = parseVersion(b.tag_name);
        return versionB.patch - versionA.patch; // Sort by patch version descending
      });

    // Create one <li> item per release
    allReleases.forEach((release) => {
      const repoName =
        repoReleases.repo === "camunda" ? "Camunda" : "Connectors";

      // Format the publication date (DD.MM.YYYY)
      const publishedDate = new Date(release.published_at);
      const formattedDate = publishedDate.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      allReleaseLinks.push(
        `<li>[${repoName} ${release.tag_name} (${formattedDate})](https://github.com/${repoReleases.owner}/${repoReleases.repo}/releases/tag/${release.tag_name})</li>`
      );
    });
  });

  return `<ul>${allReleaseLinks.join("")}</ul>`;
}

/**
 * Update release notes file with missing release links
 */
async function updateReleaseNotesFile(filePath, releases) {
  try {
    const content = await fs.readFile(filePath, "utf8");

    // Extract version from file path using the same logic as findReleaseNotesFiles
    const version = extractVersionFromPath(filePath);
    if (!version) {
      console.log(`⚠️  Skipping ${filePath}: Cannot parse version from path`);
      return false;
    }

    // Check if the placeholder tag exists in the file
    if (!content.includes(CONFIG.releaseLinksTag)) {
      console.log(
        `⚠️  Skipping ${filePath}: Could not find release links placeholder (${CONFIG.releaseLinksTag}) in ${filePath}`
      );
      return false;
    }

    // Generate the latest changelog links for this version
    const newChangelogLinks = generateChangelogLinks(releases, version);

    if (newChangelogLinks) {
      // Create the content to replace the placeholder with
      const replacementContent = `${CONFIG.releaseLinksTag}\n${newChangelogLinks}\n${CONFIG.releaseLinksTag}`;

      // Use regex to find and replace content between placeholder tags
      const placeholderRegex = new RegExp(
        `${CONFIG.releaseLinksTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${CONFIG.releaseLinksTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
        "g"
      );

      const updatedContent = content.replace(
        placeholderRegex,
        replacementContent
      );

      // Check if the content has actually changed
      if (updatedContent !== content) {
        await fs.writeFile(filePath, updatedContent, "utf8");
        console.log(
          `✅ Updated release links in ${filePath} (new releases detected)`
        );
        return true;
      } else {
        console.log(`📋 Changelog links are already up to date in ${filePath}`);
      }
    } else {
      console.log(
        `📋 No stable releases found for version ${version.major}.${version.minor} in ${filePath}`
      );
    }

    return false;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log("🚀 Starting release links update automation...");
  console.log(`🎯 Target versions: ${CONFIG.targetVersions.join(", ")}`);

  // Get GitHub token from environment variables (for GitHub Actions or local development)
  const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (githubToken) {
    console.log("🔑 Using GitHub token for authentication");
  } else {
    console.log(
      "⚠️  No GitHub token found - using unauthenticated requests (rate limited)"
    );
  }

  // Fetch releases from all repositories
  console.log("📡 Fetching releases from GitHub...");
  const allReleases = [];

  for (const repo of CONFIG.repositories) {
    console.log(`  Fetching releases for ${repo.owner}/${repo.repo}...`);
    const releases = await fetchReleases(
      repo.owner,
      repo.repo,
      500,
      githubToken
    );
    allReleases.push({
      ...repo,
      releases: releases,
    });
    console.log(`  Found ${releases.length} stable releases`);
  }

  // Find all release notes files
  console.log("📂 Finding release notes files...");
  const releaseNotesFiles = await findReleaseNotesFiles();
  console.log(`Found ${releaseNotesFiles.length} release notes files:`);
  releaseNotesFiles.forEach((file) => console.log(`  - ${file.filePath}`));

  // Update each file
  console.log("📝 Checking and updating release notes files...");
  let totalUpdated = 0;

  for (const file of releaseNotesFiles) {
    console.log(`\nProcessing ${file.filePath}...`);
    const updated = await updateReleaseNotesFile(file.filePath, allReleases);
    if (updated) {
      totalUpdated++;
    }
  }

  console.log(`\n✅ Automation completed! Updated ${totalUpdated} files.`);
}

// Run the script
main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exit(1);
});
