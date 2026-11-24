#!/usr/bin/env node

/**
 * Generates `src/data/downloads.json` from release metadata. The nightly
 * "Update download catalog" workflow reruns this script and replaces the whole
 * file, so a hand edit to the JSON lasts only until the next run. Change the
 * selection here, or `STATIC_DATA` for fixed values, instead.
 */

const fs = require("fs").promises;
const path = require("path");
const cheerio = require("cheerio");

const DOWNLOAD_CENTER_BASE_URL = "https://downloads.camunda.cloud/release/";
const GITHUB_API_BASE_URL = "https://api.github.com";
const REQUEST_TIMEOUT_MS = 30_000;
const OUTPUT_PATH = path.join(__dirname, "..", "src", "data", "downloads.json");

const STATIC_DATA = {
  desktopModeler: {
    nightlyLabel: "Nightly",
    docsLink: "/docs/components/modeler/desktop-modeler/",
    previousVersions:
      "https://downloads.camunda.cloud/release/camunda-modeler/",
  },
  camundaRun: {
    docsLink:
      "/docs/self-managed/quickstart/developer-quickstart/c8run/install-start/",
    previousVersions: "https://downloads.camunda.cloud/release/camunda/c8run/",
  },
  rpaWorker: {
    docsLink: "/docs/components/rpa/getting-started/",
    previousVersions: "https://downloads.camunda.cloud/release/rpa-worker/",
  },
  additionalReleases: {
    orchestrationCluster: {
      previousVersions: "https://github.com/camunda/camunda/releases",
    },
    connectors: {
      previousVersions: "https://github.com/camunda/connectors/releases",
    },
    enterprise: {
      primaryLink: {
        label: "Browse enterprise downloads",
        url: "https://downloads.camunda.cloud/enterprise-release/",
      },
    },
  },
};

const ASSET_DEFINITIONS = {
  modeler: {
    mac: [
      { label: "Apple Silicon (.dmg)", pattern: /-mac-arm64\.dmg$/ },
      { label: "Intel (.dmg)", pattern: /-mac-x64\.dmg$/ },
    ],
    windows: [{ label: "Windows (x64)", pattern: /-win-x64\.zip$/ }],
    linux: [{ label: "Linux (x64)", pattern: /-linux-x64\.tar\.gz$/ }],
  },
  modelerNightly: {
    mac: [
      {
        label: "Nightly Apple Silicon",
        pattern: /camunda-modeler-nightly-mac-arm64\.dmg$/,
      },
      {
        label: "Nightly Intel",
        pattern: /camunda-modeler-nightly-mac-x64\.dmg$/,
      },
    ],
    windows: [
      {
        label: "Nightly Windows",
        pattern: /camunda-modeler-nightly-win-x64\.zip$/,
      },
    ],
    linux: [
      {
        label: "Nightly Linux",
        pattern: /camunda-modeler-nightly-linux-x64\.tar\.gz$/,
      },
    ],
  },
  camundaRun: (version) => ({
    mac: [
      {
        label: "Apple Silicon",
        pattern: new RegExp(
          `camunda8-run-${escapeRegExp(version)}-darwin-aarch64\\.zip$`
        ),
      },
      {
        label: "Intel",
        pattern: new RegExp(
          `camunda8-run-${escapeRegExp(version)}-darwin-x86_64\\.zip$`
        ),
      },
    ],
    windows: [
      {
        label: "Windows (x64)",
        pattern: new RegExp(
          `camunda8-run-${escapeRegExp(version)}-windows-x86_64\\.zip$`
        ),
      },
    ],
    linux: [
      {
        label: "Linux (x64)",
        pattern: new RegExp(
          `camunda8-run-${escapeRegExp(version)}-linux-x86_64\\.tar\\.gz$`
        ),
      },
    ],
  }),
  rpaWorker: (version) => ({
    mac: [
      {
        label: "Apple Silicon",
        pattern: new RegExp(
          `rpa-worker_${escapeRegExp(version)}_darwin_aarch64\\.zip$`
        ),
      },
      {
        label: "Intel",
        pattern: new RegExp(
          `rpa-worker_${escapeRegExp(version)}_darwin_amd64\\.zip$`
        ),
      },
    ],
    windows: [
      {
        label: "Windows (x64)",
        pattern: new RegExp(
          `rpa-worker_${escapeRegExp(version)}_win32_amd64\\.zip$`
        ),
      },
    ],
    linux: [
      {
        label: "Linux (x64)",
        pattern: new RegExp(
          `rpa-worker_${escapeRegExp(version)}_linux_amd64\\.zip$`
        ),
      },
    ],
  }),
  gettingStarted: {
    mac: [
      {
        label: "Apple Silicon",
        suffix: "darwin-aarch64.zip",
      },
      {
        label: "Intel",
        suffix: "darwin-x86_64.zip",
      },
    ],
    windows: [
      {
        label: "Windows (x64)",
        suffix: "windows-x86_64.zip",
      },
    ],
    linux: [
      {
        label: "Linux (x64)",
        suffix: "linux-x86_64.tar.gz",
      },
    ],
  },
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseVersion(value) {
  const match = value.match(/^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/);
  if (!match) {
    return null;
  }

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] || null,
    value,
  };
}

function comparePrereleaseIdentifiers(left, right) {
  const leftNumericSuffix = left.match(/^(.*?)(\d+)$/);
  const rightNumericSuffix = right.match(/^(.*?)(\d+)$/);

  if (
    leftNumericSuffix &&
    rightNumericSuffix &&
    leftNumericSuffix[1] === rightNumericSuffix[1]
  ) {
    return Number(leftNumericSuffix[2]) - Number(rightNumericSuffix[2]);
  }

  const leftNumber = /^\d+$/.test(left);
  const rightNumber = /^\d+$/.test(right);
  if (leftNumber && rightNumber) {
    return Number(left) - Number(right);
  }
  if (leftNumber !== rightNumber) {
    return leftNumber ? -1 : 1;
  }
  return left.localeCompare(right);
}

function compareVersions(left, right) {
  for (const key of ["major", "minor", "patch"]) {
    if (left[key] !== right[key]) {
      return left[key] - right[key];
    }
  }

  if (!left.prerelease && right.prerelease) {
    return 1;
  }
  if (left.prerelease && !right.prerelease) {
    return -1;
  }
  if (!left.prerelease && !right.prerelease) {
    return 0;
  }

  const leftIdentifiers = left.prerelease.split(/[.-]/);
  const rightIdentifiers = right.prerelease.split(/[.-]/);

  for (
    let index = 0;
    index < Math.max(leftIdentifiers.length, rightIdentifiers.length);
    index++
  ) {
    const leftIdentifier = leftIdentifiers[index];
    const rightIdentifier = rightIdentifiers[index];

    if (leftIdentifier === undefined) {
      return -1;
    }
    if (rightIdentifier === undefined) {
      return 1;
    }
    if (leftIdentifier === rightIdentifier) {
      continue;
    }

    return comparePrereleaseIdentifiers(leftIdentifier, rightIdentifier);
  }

  return 0;
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid release date: ${value}`);
  }

  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function parseDirectoryEntries(html, directoryUrl) {
  const $ = cheerio.load(html);

  return $("a[href]")
    .map((_, element) => {
      const href = $(element).attr("href");
      const name = $(element).text().trim();

      if (!href || !name || name === ".." || href === "..") {
        return null;
      }

      return {
        name,
        url: new URL(href, directoryUrl).toString(),
        isDirectory: href.endsWith("/"),
      };
    })
    .get()
    .filter(Boolean);
}

function parseAssets(html, directoryUrl) {
  const $ = cheerio.load(html);

  return $("tr")
    .map((_, row) => {
      const link = $(row).find("a[href]").first();
      const href = link.attr("href");
      const name = link.text().trim();
      const date = $(row).find("time[datetime]").attr("datetime");

      if (!href || !name || name === ".." || href.endsWith("/")) {
        return null;
      }

      return {
        name,
        url: new URL(href, directoryUrl).toString(),
        date: date || null,
      };
    })
    .get()
    .filter(Boolean);
}

// The release channels a catalog row can show:
// - "stable": the newest version without a pre-release suffix, such as 8.10.7.
// - "alpha": the newest pre-release, such as 8.11.0-alpha1, but only while it
//   is newer than the newest stable version. Once its minor ships, the alpha is
//   outdated, so there is no alpha to show until the next minor's first alpha.
// - "any": the newest version of either channel, for an artifact that ships
//   with some alphas and some stable releases. A stable release then
//   supersedes the alphas before it.
const CHANNELS = ["stable", "alpha", "any"];

// How many of the newest releases to try when a release is missing assets, for
// example while it is still being uploaded, before the update fails.
const MAX_RELEASE_ATTEMPTS = 3;

class MissingAssetError extends Error {}

function rankVersions(entries, channel, getName = (entry) => entry.name) {
  if (!CHANNELS.includes(channel)) {
    throw new Error(`Unknown release channel: ${channel}`);
  }

  const versions = entries
    .map((entry) => ({
      ...entry,
      parsed: parseVersion(getName(entry)),
    }))
    .filter((entry) => entry.parsed)
    .sort((left, right) => compareVersions(right.parsed, left.parsed));
  const newestStable = versions.find((entry) => !entry.parsed.prerelease);

  return versions.filter((entry) => {
    if (channel === "stable") {
      return !entry.parsed.prerelease;
    }
    if (channel === "alpha") {
      return (
        Boolean(entry.parsed.prerelease) &&
        (!newestStable ||
          compareVersions(entry.parsed, newestStable.parsed) > 0)
      );
    }
    return true;
  });
}

// Loads the newest release of the channel. A release that is missing assets is
// skipped with a warning, so the row keeps its previous release instead of
// failing the whole update. Returns null when the "alpha" channel has nothing
// newer than the stable release, or when none of its alphas has all assets:
// the alpha row is optional, so it is hidden rather than failing the update.
async function selectRelease(entries, { channel, product, getName, load }) {
  const candidates = rankVersions(entries, channel, getName);
  if (candidates.length === 0) {
    if (channel === "alpha") {
      return null;
    }
    throw new Error(`Could not find a ${channel} ${product} release`);
  }

  const attempts = candidates.slice(0, MAX_RELEASE_ATTEMPTS);
  for (const candidate of attempts) {
    try {
      return await load(candidate);
    } catch (error) {
      if (!(error instanceof MissingAssetError)) {
        throw error;
      }
      console.warn(
        `::warning::Skipping ${product} ${candidate.parsed.value}: ${error.message}`
      );
    }
  }

  const skipped = attempts
    .map((candidate) => candidate.parsed.value)
    .join(", ");
  if (channel === "alpha") {
    console.warn(
      `::warning::Hiding the ${product} alpha: none of ${skipped} has all assets`
    );
    return null;
  }

  throw new Error(
    `None of the newest ${channel} ${product} releases has all assets: ${skipped}`
  );
}

function selectAsset(assets, pattern, product, label) {
  const asset = assets.find((candidate) => pattern.test(candidate.name));
  if (!asset) {
    throw new MissingAssetError(`Missing ${product} asset for ${label}`);
  }

  return {
    label,
    url: asset.url,
  };
}

function buildLinks(assets, definitions, product) {
  return Object.fromEntries(
    Object.entries(definitions).map(([operatingSystem, candidates]) => [
      operatingSystem,
      candidates.map(({ label, pattern }) =>
        selectAsset(assets, pattern, product, label)
      ),
    ])
  );
}

function getEarliestAssetDate(assets) {
  const dates = assets
    .map((asset) => asset.date)
    .filter(Boolean)
    .sort();

  if (dates.length === 0) {
    throw new MissingAssetError("No asset dates found");
  }

  return formatDate(dates[0]);
}

function fetchWithTimeout(url, options = {}) {
  return fetch(url, {
    ...options,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

async function fetchText(url, { allowNotFound = false } = {}) {
  const response = await fetchWithTimeout(url);
  if (allowNotFound && response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`);
  }

  return response.text();
}

async function fetchJson(url) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "camunda-docs-download-catalog",
  };
  const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }

  const response = await fetchWithTimeout(url, { headers });
  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status}`);
  }

  return response.json();
}

async function fetchDownloadDirectory(directoryPath) {
  const directoryUrl = new URL(directoryPath, DOWNLOAD_CENTER_BASE_URL);
  const html = await fetchText(directoryUrl);
  return {
    url: directoryUrl.toString(),
    entries: parseDirectoryEntries(html, directoryUrl),
  };
}

async function fetchDownloadAssets(directoryUrl) {
  const html = await fetchText(directoryUrl);
  return parseAssets(html, directoryUrl);
}

async function fetchDownloadRelease(releaseEntry, definitions, product) {
  const releaseUrl = new URL(releaseEntry.url);
  const assets = await fetchDownloadAssets(releaseUrl);

  return {
    version: releaseEntry.name,
    date: getEarliestAssetDate(assets),
    links: buildLinks(assets, definitions, product),
  };
}

function fetchLatestDownloadRelease(
  directory,
  { channel, product, definitions }
) {
  return selectRelease(directory.entries, {
    channel,
    product,
    load: (entry) =>
      fetchDownloadRelease(entry, definitions(entry.name), product),
  });
}

async function fetchModeler() {
  const directory = await fetchDownloadDirectory("camunda-modeler/");
  const stable = await fetchLatestDownloadRelease(directory, {
    channel: "stable",
    product: "Desktop Modeler",
    definitions: () => ASSET_DEFINITIONS.modeler,
  });

  const manifestUrl = new URL(
    "latest-mac.yml",
    `${DOWNLOAD_CENTER_BASE_URL}camunda-modeler/${stable.version}/`
  );
  const manifest = await fetchText(manifestUrl, { allowNotFound: true });
  if (manifest) {
    const releaseDate = manifest.match(
      /^releaseDate:\s*['"]?([^'"\r\n]+)['"]?\s*$/m
    );
    if (releaseDate) {
      stable.date = formatDate(releaseDate[1]);
    }
  }

  const nightlyUrl = new URL(
    "nightly/",
    `${DOWNLOAD_CENTER_BASE_URL}camunda-modeler/`
  );
  const nightlyAssets = await fetchDownloadAssets(nightlyUrl);

  return {
    ...stable,
    nightlyLabel: STATIC_DATA.desktopModeler.nightlyLabel,
    links: {
      mac: {
        stable: stable.links.mac,
        experimental: buildLinks(
          nightlyAssets,
          ASSET_DEFINITIONS.modelerNightly,
          "Desktop Modeler nightly"
        ).mac,
      },
      windows: {
        stable: stable.links.windows,
        experimental: buildLinks(
          nightlyAssets,
          ASSET_DEFINITIONS.modelerNightly,
          "Desktop Modeler nightly"
        ).windows,
      },
      linux: {
        stable: stable.links.linux,
        experimental: buildLinks(
          nightlyAssets,
          ASSET_DEFINITIONS.modelerNightly,
          "Desktop Modeler nightly"
        ).linux,
      },
    },
    docsLink: STATIC_DATA.desktopModeler.docsLink,
    previousVersions: STATIC_DATA.desktopModeler.previousVersions,
  };
}

async function fetchCamundaRun() {
  const directory = await fetchDownloadDirectory("camunda/c8run/");
  const [stable, experimental] = await Promise.all([
    fetchLatestDownloadRelease(directory, {
      channel: "stable",
      product: "Camunda 8 Run",
      definitions: ASSET_DEFINITIONS.camundaRun,
    }),
    fetchLatestDownloadRelease(directory, {
      channel: "alpha",
      product: "Camunda 8 Run experimental",
      definitions: ASSET_DEFINITIONS.camundaRun,
    }),
  ]);
  // Without an alpha newer than the stable release, the row has no alpha links
  // and no alphaVersion.
  const experimentalLinks = experimental
    ? experimental.links
    : { mac: [], windows: [], linux: [] };

  return {
    version: stable.version,
    date: stable.date,
    alphaVersion: experimental ? experimental.version : undefined,
    links: {
      mac: {
        stable: stable.links.mac,
        experimental: experimentalLinks.mac.map((link) => ({
          ...link,
          label: `Alpha ${link.label}`,
        })),
      },
      windows: {
        stable: stable.links.windows,
        experimental: experimentalLinks.windows.map((link) => ({
          ...link,
          label: "Alpha Windows",
        })),
      },
      linux: {
        stable: stable.links.linux,
        experimental: experimentalLinks.linux.map((link) => ({
          ...link,
          label: "Alpha Linux",
        })),
      },
    },
    docsLink: STATIC_DATA.camundaRun.docsLink,
    previousVersions: STATIC_DATA.camundaRun.previousVersions,
  };
}

async function fetchRpaWorker() {
  const directory = await fetchDownloadDirectory("rpa-worker/");
  const release = await fetchLatestDownloadRelease(directory, {
    channel: "stable",
    product: "RPA Worker",
    definitions: ASSET_DEFINITIONS.rpaWorker,
  });

  return {
    ...release,
    docsLink: STATIC_DATA.rpaWorker.docsLink,
    previousVersions: STATIC_DATA.rpaWorker.previousVersions,
  };
}

function getGithubAssetLinks(release, definitions, prefix) {
  return Object.fromEntries(
    Object.entries(definitions).map(([operatingSystem, candidates]) => [
      operatingSystem,
      candidates.map(({ label, suffix }) => {
        const asset = release.assets.find(
          ({ name }) => name.startsWith(prefix) && name.endsWith(suffix)
        );
        if (!asset) {
          throw new MissingAssetError(
            `Missing Getting Started asset for ${label} in ${release.tag_name}`
          );
        }
        return {
          label,
          url: asset.browser_download_url,
        };
      }),
    ])
  );
}

const githubReleases = new Map();

// Reads every page, so an artifact whose newest release is older than the
// latest 100 releases, such as a discontinued one, stays selectable.
function fetchGithubReleases(repository) {
  if (!githubReleases.has(repository)) {
    githubReleases.set(
      repository,
      (async () => {
        const releases = [];
        for (let page = 1; ; page++) {
          const batch = await fetchJson(
            `${GITHUB_API_BASE_URL}/repos/${repository}/releases?per_page=100&page=${page}`
          );
          releases.push(...batch);
          if (batch.length < 100) {
            return releases;
          }
        }
      })()
    );
  }

  return githubReleases.get(repository);
}

function selectGithubRelease(
  releases,
  { channel, product, assetPrefix, load = (release) => release }
) {
  return selectRelease(
    releases.filter(
      (release) =>
        !release.draft &&
        (!assetPrefix ||
          release.assets.some(({ name }) => name.startsWith(assetPrefix)))
    ),
    {
      channel,
      product,
      getName: (release) => release.tag_name,
      load,
    }
  );
}

async function fetchGettingStarted() {
  const releases = await fetchGithubReleases("camunda/camunda");
  // The bundle ships with some alphas and some stable releases.
  return selectGithubRelease(releases, {
    channel: "any",
    product: "Getting Started bundle",
    assetPrefix: "camunda8-getting-started-bundle-",
    load: (release) => ({
      version: release.tag_name,
      date: formatDate(release.published_at),
      links: getGithubAssetLinks(
        release,
        ASSET_DEFINITIONS.gettingStarted,
        `camunda8-getting-started-bundle-${release.tag_name}-`
      ),
    }),
  });
}

async function fetchLatestGithubRelease(repository, product) {
  const releases = await fetchGithubReleases(repository);
  return selectGithubRelease(releases, { channel: "stable", product });
}

async function buildCatalog() {
  const [gettingStarted, desktopModeler, camundaRun, rpaWorker] =
    await Promise.all([
      fetchGettingStarted(),
      fetchModeler(),
      fetchCamundaRun(),
      fetchRpaWorker(),
    ]);
  const [orchestrationCluster, connectors] = await Promise.all([
    fetchLatestGithubRelease("camunda/camunda", "Orchestration Cluster"),
    fetchLatestGithubRelease("camunda/connectors", "Connectors"),
  ]);

  return {
    gettingStarted,
    desktopModeler,
    camundaRun,
    rpaWorker,
    additionalReleases: {
      orchestrationCluster: {
        version: orchestrationCluster.tag_name,
        date: formatDate(orchestrationCluster.published_at),
        primaryLink: {
          label: "View release on GitHub",
          url: orchestrationCluster.html_url,
        },
        previousVersions:
          STATIC_DATA.additionalReleases.orchestrationCluster.previousVersions,
      },
      connectors: {
        version: connectors.tag_name,
        date: formatDate(connectors.published_at),
        primaryLink: {
          label: "View release on GitHub",
          url: connectors.html_url,
        },
        previousVersions:
          STATIC_DATA.additionalReleases.connectors.previousVersions,
      },
      enterprise: STATIC_DATA.additionalReleases.enterprise,
    },
  };
}

async function updateCatalog({ checkOnly }) {
  const catalog = await buildCatalog();
  const serializedCatalog = `${JSON.stringify(catalog, null, 2)}\n`;
  let currentCatalog = null;

  try {
    currentCatalog = await fs.readFile(OUTPUT_PATH, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  if (currentCatalog === serializedCatalog) {
    console.log("Download catalog is up to date.");
    return false;
  }

  if (checkOnly) {
    throw new Error("Download catalog is stale.");
  }

  await fs.writeFile(OUTPUT_PATH, serializedCatalog, "utf8");
  console.log(`Updated ${path.relative(process.cwd(), OUTPUT_PATH)}.`);
  return true;
}

if (require.main === module) {
  updateCatalog({ checkOnly: process.argv.includes("--check") }).catch(
    (error) => {
      console.error(`Download catalog update failed: ${error.message}`);
      process.exitCode = 1;
    }
  );
}

module.exports = {
  buildCatalog,
  compareVersions,
  MissingAssetError,
  rankVersions,
  selectRelease,
};
