const DOWNLOADS = "https://downloads.camunda.cloud/release/";
const GITHUB = "https://api.github.com/repos/";

// A download center directory listing with one subdirectory per version.
const listing = (names) =>
  names.map((name) => `<a href="${name}/">${name}</a>`).join("\n");

// A download center release directory with the given files.
const files = (names, date) =>
  `<table>${names
    .map(
      (name) =>
        `<tr><td><a href="${name}">${name}</a></td><td><time datetime="${date}">${date}</time></td></tr>`
    )
    .join("")}</table>`;

const c8runFiles = (version) =>
  files(
    [
      `camunda8-run-${version}-darwin-aarch64.zip`,
      `camunda8-run-${version}-darwin-x86_64.zip`,
      `camunda8-run-${version}-windows-x86_64.zip`,
      `camunda8-run-${version}-linux-x86_64.tar.gz`,
    ],
    "2026-10-27T10:00:00Z"
  );

const modelerFiles = (version) =>
  files(
    ["mac-arm64.dmg", "mac-x64.dmg", "win-x64.zip", "linux-x64.tar.gz"].map(
      (suffix) => `camunda-modeler-${version}-${suffix}`
    ),
    "2026-10-06T10:00:00Z"
  );

const rpaFiles = (version) =>
  files(
    ["darwin_aarch64", "darwin_amd64", "win32_amd64", "linux_amd64"].map(
      (platform) => `rpa-worker_${version}_${platform}.zip`
    ),
    "2026-04-23T10:00:00Z"
  );

const BUNDLE_SUFFIXES = [
  "darwin-aarch64.zip",
  "darwin-x86_64.zip",
  "windows-x86_64.zip",
  "linux-x86_64.tar.gz",
];

// A GitHub release, optionally with the Getting Started bundle.
const release = (
  tag,
  { bundle = false, date = "2026-10-13T10:00:00Z" } = {}
) => ({
  tag_name: tag,
  draft: false,
  published_at: date,
  html_url: `https://github.com/camunda/camunda/releases/tag/${tag}`,
  assets: bundle
    ? BUNDLE_SUFFIXES.map((suffix) => ({
        name: `camunda8-getting-started-bundle-${tag}-${suffix}`,
        browser_download_url: `https://github.com/camunda/camunda/releases/download/${tag}/camunda8-getting-started-bundle-${tag}-${suffix}`,
      }))
    : [{ name: `camunda-zeebe-${tag}.tar.gz` }],
});

// Mocked fixture data, not the live catalog: a frozen snapshot of release
// metadata from November 2026 (8.10 is GA, the Getting Started bundle last
// shipped with 8.10.4, and no 8.11 alpha is out yet) to exercise the selection
// logic. The script itself reads the live releases on every run.
const NOV_2026_RELEASES = {
  c8run: ["8.9.23", "8.10.0-alpha4", "8.10.0-alpha5", "8.10.6", "8.10.7"],
  modeler: ["5.51.1", "5.52.0"],
  rpa: ["1.3.1", "1.3.2"],
  camunda: [
    release("8.10.8"),
    release("8.9.24"),
    release("8.10.4", { bundle: true }),
    release("8.10.0"),
    release("8.10.0-alpha5", { bundle: true }),
    release("8.10.0-alpha3", { bundle: true }),
    release("8.9.0", { bundle: true }),
  ],
  connectors: [release("8.10.3"), release("8.10.2"), release("8.9.14")],
};

// Mocks `fetch` for the download center and the GitHub API.
function mockFetch(state) {
  const directories = {
    "camunda/c8run/": [state.c8run, c8runFiles],
    "camunda-modeler/": [state.modeler, modelerFiles],
    "rpa-worker/": [state.rpa, rpaFiles],
  };
  const pages = {
    "camunda/camunda": state.camunda,
    "camunda/connectors": state.connectors,
  };
  const respond = (status, body) => ({
    ok: status === 200,
    status,
    text: async () => body,
    json: async () => body,
  });

  global.fetch = jest.fn(async (input) => {
    const url = String(input);
    if (url.startsWith(GITHUB)) {
      const { pathname, searchParams } = new URL(url);
      const repository = pathname.split("/").slice(2, 4).join("/");
      const page = Number(searchParams.get("page") || 1);
      return respond(
        200,
        pages[repository].slice((page - 1) * 100, page * 100)
      );
    }
    if (url === `${DOWNLOADS}camunda-modeler/nightly/`) {
      return respond(200, modelerFiles("nightly"));
    }
    for (const [directory, [versions, render]] of Object.entries(directories)) {
      if (url === `${DOWNLOADS}${directory}`) {
        return respond(200, listing(versions));
      }
      const version = url.slice(`${DOWNLOADS}${directory}`.length, -1);
      if (
        url.startsWith(`${DOWNLOADS}${directory}`) &&
        versions.includes(version)
      ) {
        const missing = state.missing && state.missing[directory] === version;
        return respond(200, missing ? files([], "") : render(version));
      }
    }
    return respond(404, "");
  });
}

function loadScript() {
  jest.resetModules();
  return require("./update-downloads");
}

describe("update-downloads", () => {
  let warn;

  beforeEach(() => {
    warn = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    warn.mockRestore();
    delete global.fetch;
  });

  test("ranks versions per channel", () => {
    const { rankVersions } = loadScript();
    const names = (entries, channel) =>
      rankVersions(
        entries.map((name) => ({ name })),
        channel
      ).map((entry) => entry.name);
    const versions = ["8.10.0-alpha5", "8.10.7", "8.11.0-alpha1", "notes"];

    expect(names(versions, "stable")).toEqual(["8.10.7"]);
    expect(names(versions, "alpha")).toEqual(["8.11.0-alpha1"]);
    expect(names(versions, "any")).toEqual([
      "8.11.0-alpha1",
      "8.10.7",
      "8.10.0-alpha5",
    ]);
    expect(() => names(versions, "nightly")).toThrow(
      "Unknown release channel: nightly"
    );
  });

  test("has no alpha once the alpha's minor is stable", () => {
    const { rankVersions } = loadScript();
    const entries = ["8.10.0-alpha5", "8.10.7"].map((name) => ({ name }));

    expect(rankVersions(entries, "alpha")).toEqual([]);
  });

  test("skips a release that is missing assets", async () => {
    const { MissingAssetError, selectRelease } = loadScript();
    const entries = ["1.0.0", "1.1.0", "1.2.0"].map((name) => ({ name }));
    const load = async (entry) => {
      if (entry.name === "1.2.0") {
        throw new MissingAssetError("Missing Tool asset for Linux");
      }
      return entry.name;
    };

    await expect(
      selectRelease(entries, { channel: "stable", product: "Tool", load })
    ).resolves.toBe("1.1.0");
    expect(warn).toHaveBeenCalledWith(
      "::warning::Skipping Tool 1.2.0: Missing Tool asset for Linux"
    );
  });

  test("fails on other errors and after too many incomplete releases", async () => {
    const { MissingAssetError, selectRelease } = loadScript();
    const entries = ["1.0.0", "1.1.0", "1.2.0", "1.3.0"].map((name) => ({
      name,
    }));
    const select = (error) =>
      selectRelease(entries, {
        channel: "stable",
        product: "Tool",
        load: async () => {
          throw error;
        },
      });

    await expect(select(new Error("Request failed"))).rejects.toThrow(
      "Request failed"
    );
    await expect(select(new MissingAssetError("Missing"))).rejects.toThrow(
      "None of the newest stable Tool releases has all assets: 1.3.0, 1.2.0, 1.1.0"
    );
    await expect(
      selectRelease([], { channel: "stable", product: "Tool" })
    ).rejects.toThrow("Could not find a stable Tool release");
    await expect(
      selectRelease([], { channel: "alpha", product: "Tool" })
    ).resolves.toBeNull();
    await expect(
      selectRelease([{ name: "2.0.0-alpha1" }], {
        channel: "alpha",
        product: "Tool",
        load: async () => {
          throw new MissingAssetError("Missing");
        },
      })
    ).resolves.toBeNull();
  });

  test("builds the catalog from the November 2026 release snapshot", async () => {
    mockFetch(NOV_2026_RELEASES);
    const catalog = await loadScript().buildCatalog();

    expect(catalog.gettingStarted.version).toBe("8.10.4");
    expect(catalog.gettingStarted.links.linux[0].url).toBe(
      "https://github.com/camunda/camunda/releases/download/8.10.4/camunda8-getting-started-bundle-8.10.4-linux-x86_64.tar.gz"
    );
    expect(catalog.camundaRun.version).toBe("8.10.7");
    expect(catalog.camundaRun.alphaVersion).toBeUndefined();
    expect(catalog.camundaRun.links.mac.experimental).toEqual([]);
    expect(catalog.desktopModeler.version).toBe("5.52.0");
    expect(catalog.rpaWorker.version).toBe("1.3.2");
    expect(catalog.additionalReleases.orchestrationCluster.version).toBe(
      "8.10.8"
    );
    expect(catalog.additionalReleases.connectors.version).toBe("8.10.3");
  });

  test("shows the next minor's alpha and then its stable release", async () => {
    mockFetch({
      ...NOV_2026_RELEASES,
      c8run: [...NOV_2026_RELEASES.c8run, "8.11.0-alpha1"],
      camunda: [release("8.11.0-alpha1"), ...NOV_2026_RELEASES.camunda],
    });
    let catalog = await loadScript().buildCatalog();

    expect(catalog.camundaRun.version).toBe("8.10.7");
    expect(catalog.camundaRun.alphaVersion).toBe("8.11.0-alpha1");
    expect(catalog.camundaRun.links.linux.experimental).toEqual([
      {
        label: "Alpha Linux",
        url: `${DOWNLOADS}camunda/c8run/8.11.0-alpha1/camunda8-run-8.11.0-alpha1-linux-x86_64.tar.gz`,
      },
    ]);
    expect(catalog.additionalReleases.orchestrationCluster.version).toBe(
      "8.10.8"
    );

    mockFetch({
      ...NOV_2026_RELEASES,
      c8run: [...NOV_2026_RELEASES.c8run, "8.11.0-alpha5", "8.11.0"],
      camunda: [
        release("8.11.0"),
        release("8.11.0-alpha5"),
        ...NOV_2026_RELEASES.camunda,
      ],
    });
    catalog = await loadScript().buildCatalog();

    expect(catalog.camundaRun.version).toBe("8.11.0");
    expect(catalog.camundaRun.alphaVersion).toBeUndefined();
    expect(catalog.additionalReleases.orchestrationCluster.version).toBe(
      "8.11.0"
    );
    expect(catalog.gettingStarted.version).toBe("8.10.4");
  });

  test("keeps the previous release while a new one is uploading", async () => {
    mockFetch({
      ...NOV_2026_RELEASES,
      c8run: [...NOV_2026_RELEASES.c8run, "8.10.8"],
      missing: { "camunda/c8run/": "8.10.8" },
    });
    const catalog = await loadScript().buildCatalog();

    expect(catalog.camundaRun.version).toBe("8.10.7");
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("Skipping Camunda 8 Run 8.10.8")
    );
  });

  test("hides the alpha while the first alpha of a minor is uploading", async () => {
    mockFetch({
      ...NOV_2026_RELEASES,
      c8run: [...NOV_2026_RELEASES.c8run, "8.11.0-alpha1"],
      missing: { "camunda/c8run/": "8.11.0-alpha1" },
    });
    const catalog = await loadScript().buildCatalog();

    expect(catalog.camundaRun.version).toBe("8.10.7");
    expect(catalog.camundaRun.alphaVersion).toBeUndefined();
    expect(catalog.camundaRun.links.mac.experimental).toEqual([]);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining(
        "Hiding the Camunda 8 Run experimental alpha: none of 8.11.0-alpha1"
      )
    );
  });

  test("finds the bundle beyond the newest 100 releases", async () => {
    const newer = Array.from({ length: 150 }, (_, index) =>
      release(`8.10.${100 + index}`)
    );
    mockFetch({
      ...NOV_2026_RELEASES,
      camunda: [...newer, ...NOV_2026_RELEASES.camunda],
    });
    const catalog = await loadScript().buildCatalog();

    expect(catalog.gettingStarted.version).toBe("8.10.4");
    const camundaPages = global.fetch.mock.calls
      .map(([input]) => String(input))
      .filter((url) => url.startsWith(`${GITHUB}camunda/camunda/`));
    expect(camundaPages).toHaveLength(2);
  });
});
