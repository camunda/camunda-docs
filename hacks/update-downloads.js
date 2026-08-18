#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");
const cheerio = require("cheerio");

const DOWNLOAD_CENTER_BASE_URL = "https://downloads.camunda.cloud/release/";
const GITHUB_API_BASE_URL = "https://api.github.com";
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

    const leftNumber = /^\d+$/.test(leftIdentifier);
    const rightNumber = /^\d+$/.test(rightIdentifier);
    if (leftNumber && rightNumber) {
      return Number(leftIdentifier) - Number(rightIdentifier);
    }
    if (leftNumber !== rightNumber) {
      return leftNumber ? -1 : 1;
    }
    return leftIdentifier.localeCompare(rightIdentifier);
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

function getLatestVersion(entries, { prerelease }) {
  const versions = entries
    .map((entry) => ({
      ...entry,
      parsed: parseVersion(entry.name),
    }))
    .filter(
      (entry) => entry.parsed && Boolean(entry.parsed.prerelease) === prerelease
    )
    .sort((left, right) => compareVersions(right.parsed, left.parsed));

  if (versions.length === 0) {
    const channel = prerelease ? "pre-release" : "stable";
    throw new Error(`Could not find a ${channel} version`);
  }

  return versions[0];
}

function selectAsset(assets, pattern, product, label) {
  const asset = assets.find((candidate) => pattern.test(candidate.name));
  if (!asset) {
    throw new Error(`Missing ${product} asset for ${label}`);
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
    throw new Error("No asset dates found");
  }

  return formatDate(dates[0]);
}

async function fetchText(url, { allowNotFound = false } = {}) {
  const response = await fetch(url);
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

  const response = await fetch(url, { headers });
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

async function fetchModeler() {
  const directory = await fetchDownloadDirectory("camunda-modeler/");
  const stableEntry = getLatestVersion(directory.entries, {
    prerelease: false,
  });
  const stable = await fetchDownloadRelease(
    stableEntry,
    ASSET_DEFINITIONS.modeler,
    "Desktop Modeler"
  );

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
  const stableEntry = getLatestVersion(directory.entries, {
    prerelease: false,
  });
  const experimentalEntry = getLatestVersion(directory.entries, {
    prerelease: true,
  });
  const [stable, experimental] = await Promise.all([
    fetchDownloadRelease(
      stableEntry,
      ASSET_DEFINITIONS.camundaRun(stableEntry.name),
      "Camunda 8 Run"
    ),
    fetchDownloadRelease(
      experimentalEntry,
      ASSET_DEFINITIONS.camundaRun(experimentalEntry.name),
      "Camunda 8 Run experimental"
    ),
  ]);

  return {
    version: stable.version,
    date: stable.date,
    alphaVersion: experimental.version,
    links: {
      mac: {
        stable: stable.links.mac,
        experimental: experimental.links.mac.map((link) => ({
          ...link,
          label: `Alpha ${link.label}`,
        })),
      },
      windows: {
        stable: stable.links.windows,
        experimental: experimental.links.windows.map((link) => ({
          ...link,
          label: "Alpha Windows",
        })),
      },
      linux: {
        stable: stable.links.linux,
        experimental: experimental.links.linux.map((link) => ({
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
  const stableEntry = getLatestVersion(directory.entries, {
    prerelease: false,
  });
  const release = await fetchDownloadRelease(
    stableEntry,
    ASSET_DEFINITIONS.rpaWorker(stableEntry.name),
    "RPA Worker"
  );

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
          throw new Error(
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

async function fetchGithubReleases(repository) {
  return fetchJson(
    `${GITHUB_API_BASE_URL}/repos/${repository}/releases?per_page=100`
  );
}

function selectGithubRelease(releases, { prerelease, assetPrefix }) {
  const candidates = releases
    .map((release) => ({
      ...release,
      parsed: parseVersion(release.tag_name),
    }))
    .filter(
      (release) =>
        !release.draft &&
        release.parsed &&
        Boolean(release.parsed.prerelease) === prerelease &&
        (!assetPrefix ||
          release.assets.some(({ name }) => name.startsWith(assetPrefix)))
    )
    .sort((left, right) => compareVersions(right.parsed, left.parsed));

  if (candidates.length === 0) {
    const channel = prerelease ? "pre-release" : "stable";
    throw new Error(
      `Could not find a ${channel} GitHub release with ${assetPrefix} assets`
    );
  }

  return candidates[0];
}

async function fetchGettingStarted() {
  const releases = await fetchGithubReleases("camunda/camunda");
  const release = selectGithubRelease(releases, {
    prerelease: true,
    assetPrefix: "camunda8-getting-started-bundle-",
  });

  return {
    version: release.tag_name,
    date: formatDate(release.published_at),
    links: getGithubAssetLinks(
      release,
      ASSET_DEFINITIONS.gettingStarted,
      `camunda8-getting-started-bundle-${release.tag_name}-`
    ),
  };
}

async function fetchLatestGithubRelease(repository) {
  const releases = await fetchGithubReleases(repository);
  return selectGithubRelease(releases, {
    prerelease: false,
    assetPrefix: "",
  });
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
    fetchLatestGithubRelease("camunda/camunda"),
    fetchLatestGithubRelease("camunda/connectors"),
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
          label: "View latest release on GitHub",
          url: orchestrationCluster.html_url,
        },
        previousVersions:
          STATIC_DATA.additionalReleases.orchestrationCluster.previousVersions,
      },
      connectors: {
        version: connectors.tag_name,
        date: formatDate(connectors.published_at),
        primaryLink: {
          label: "View latest release on GitHub",
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

updateCatalog({ checkOnly: process.argv.includes("--check") }).catch(
  (error) => {
    console.error(`Download catalog update failed: ${error.message}`);
    process.exitCode = 1;
  }
);
