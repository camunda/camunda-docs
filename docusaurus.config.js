const { unmaintainedVersions } = require("./src/versions");
const { currentVersion } = require("./src/versions");

// Predict next version (e.g. 8.9 -> 8.10) for "next" page permalink hints.
const [_currentMajor, _currentMinor] = currentVersion.split(".").map(Number);
const nextVersion = `${_currentMajor}.${_currentMinor + 1}`;

const docsSiteUrl = process.env.DOCS_SITE_URL || "https://docs.camunda.io";
const docsSitebaseUrl = process.env.DOCS_SITE_BASE_URL || "/";
const { themes } = require("prism-react-renderer");
const { GlobExcludeDefault } = require("@docusaurus/utils");

// Selective build mode (DOCS_BUILD_VERSIONS="next" or "next,current,8.8"):
// builds only the listed docs versions and skips LLM file generation.
// Identifiers: "next" = unreleased docs, "current" = current release
// (src/versions.js); otherwise pass a literal version, e.g. "8.8".
// CI and release builds must use the full build (all versions).
const buildVersions = process.env.DOCS_BUILD_VERSIONS
  ? process.env.DOCS_BUILD_VERSIONS.split(",").map((v) => {
      const version = v.trim();
      if (version === "next") return "current";
      if (version === "current") return currentVersion;
      return version;
    })
  : null;
const partialBuild = buildVersions !== null;

// DOCS_SKIP_API_REFERENCE=true excludes the auto-generated TypeScript API
// reference (~4,700 pages across next + 8.9, roughly half of all docs pages)
// from the build. Prose-doc changes never need it. Local/agent use only.
const skipApiReference = process.env.DOCS_SKIP_API_REFERENCE === "true";

// Links pointing into content excluded by a scoped build (skipped versions,
// skipped API reference) cannot resolve. Instead of downgrading broken-link
// checks globally, neutralize exactly those links with the `pathname://`
// bypass protocol (via markdown.preprocessor, which runs before Docusaurus
// resolves source-file links), so broken-link checking stays strict
// ("throw") for all in-scope content.
const skippedLinkPrefixes = [
  ...(partialBuild
    ? require("./versions.json")
        .filter((v) => !buildVersions.includes(v))
        .flatMap((v) => [`/docs/${v}/`, `versioned_docs/version-${v}/`])
    : []),
  ...(skipApiReference ? ["apis-tools/typescript/api-reference"] : []),
];

function bypassOutOfScopeLinks({ fileContent }) {
  if (!skippedLinkPrefixes.some((prefix) => fileContent.includes(prefix))) {
    return fileContent;
  }
  const bypass = (url) =>
    !url.startsWith("pathname://") &&
    skippedLinkPrefixes.some((prefix) => url.includes(prefix))
      ? `pathname://${url}`
      : url;
  return fileContent
    .replace(/(\]\()\s*([^\s)]+)/g, (m, open, url) => `${open}${bypass(url)}`)
    .replace(
      /(^\[[^\]]+\]:\s*)(\S+)/gm,
      (m, def, url) => `${def}${bypass(url)}`
    );
}

module.exports = {
  // https://docusaurus.io/blog/releases/3.6#adoption-strategy
  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
    },
    experimental_faster: true,
  },
  title: "Camunda 8 Docs",
  tagline:
    "Start orchestrating your processes with Camunda 8 SaaS or Self-Managed",
  // url: "https://camunda-cloud.github.io",
  url: docsSiteUrl,
  // baseUrl: "/camunda-cloud-documentation/",
  baseUrl: docsSitebaseUrl,
  customFields: {
    canonicalUrlRoot: docsSiteUrl,
    currentVersion,
    nextVersion,
  },
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "camunda", // Usually your GitHub org/user name.
  projectName: "camunda-docs", // Usually your repo name.
  trailingSlash: true,
  // do not delete the following 'noIndex' line as it is modified for production
  noIndex: true,
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "alternate",
        type: "text/markdown",
        href: `${docsSiteUrl}/llms.txt`, // Use absolute URL to bypass link checker
        title: "LLM-friendly documentation index",
      },
    },
  ],
  plugins: [
    // This custom Osano plugin must precede the gtm-plugin.
    "./static/plugins/osano",
    [
      "./static/plugins/gtm",
      {
        containerId: "GTM-KQGNSTS",
        tagManagerUrl:
          process.env.TAG_MANAGER_URL || "https://ssgtm.camunda.io",
      },
    ],
    "./static/plugins/bpmn-js",
    [
      // Operate API docs generation
      "@camunda8/docusaurus-plugin-openapi-docs",
      {
        id: "api-operate-openapi",
        docsPluginId: "default",
        config: {
          operate: {
            specPath: "api/operate/operate-openapi.yaml",
            outputDir: "docs/apis-tools/operate-api/specifications",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            hideSendButton: true,
            version: "1",
            label: "Unused but required field",
            baseUrl: "Unused but required field",
            versions: {
              8.7: {
                specPath: "api/operate/version-8.7/operate-openapi.yaml",
                outputDir:
                  "versioned_docs/version-8.7/apis-tools/operate-api/specifications",
                label: "Unused but required field",
                baseUrl: "Unused but required field",
              },
            },
          },
        },
      },
    ],
    [
      // Tasklist REST API docs generation
      "@camunda8/docusaurus-plugin-openapi-docs",
      {
        id: "api-tasklist-openapi",
        docsPluginId: "default",
        config: {
          tasklist: {
            specPath: "api/tasklist/tasklist-openapi.yaml",
            outputDir: "docs/apis-tools/tasklist-api-rest/specifications",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            hideSendButton: true,
            version: "1",
            label: "Unused but required field",
            baseUrl: "Unused but required field",
            versions: {
              8.7: {
                specPath: "api/tasklist/version-8.7/tasklist-openapi.yaml",
                outputDir:
                  "versioned_docs/version-8.7/apis-tools/tasklist-api-rest/specifications",
                label: "Unused but required field",
                baseUrl: "Unused but required field",
              },
            },
          },
        },
      },
    ],
    [
      // Administration Self-Managed REST API docs generation
      "@camunda8/docusaurus-plugin-openapi-docs",
      {
        id: "api-adminsm-openapi",
        docsPluginId: "default",
        config: {
          adminsm: {
            // This API is no longer supported from 8.10. Since this is required, I'm using 8.9 values.
            // To generate docs for older versions, run `npm run api:generate -- adminsm <version>`.
            specPath:
              "api/administration-sm/version-8.9/administration-sm-openapi.yaml",
            outputDir:
              "versioned_docs/version-8.9/apis-tools/administration-sm-api/specifications",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            hideSendButton: true,
            version: "1",
            label: "Unused but required field",
            baseUrl: "Unused but required field",
            versions: {
              8.9: {
                specPath:
                  "api/administration-sm/version-8.9/administration-sm-openapi.yaml",
                outputDir:
                  "versioned_docs/version-8.9/apis-tools/administration-sm-api/specifications",
                label: "Unused but required field",
                baseUrl: "Unused but required field",
              },
              8.8: {
                specPath:
                  "api/administration-sm/version-8.8/administration-sm-openapi.yaml",
                outputDir:
                  "versioned_docs/version-8.8/apis-tools/administration-sm-api/specifications",
                label: "Unused but required field",
                baseUrl: "Unused but required field",
              },
              8.7: {
                specPath:
                  "api/administration-sm/version-8.7/administration-sm-openapi.yaml",
                outputDir:
                  "versioned_docs/version-8.7/apis-tools/administration-sm-api/specifications",
                label: "Unused but required field",
                baseUrl: "Unused but required field",
              },
            },
          },
        },
      },
    ],
    [
      // Orchestration Cluster REST API docs generation
      "@camunda8/docusaurus-plugin-openapi-docs",
      {
        id: "api-camunda-openapi",
        docsPluginId: "default",
        config: {
          camunda: {
            specPath: "api/camunda/v2/camunda-openapi.yaml",
            outputDir:
              "docs/apis-tools/orchestration-cluster-api-rest/specifications",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            hideSendButton: true,
            sdkExamples: [
              {
                lang: "TypeScript",
                highlight: "typescript",
                operationMapPath:
                  ".sdk-repos/orchestration-cluster-api-js/examples/operation-map.json",
                autoImports: true,
                defaultImports:
                  "import { createCamundaClient } from '@camunda8/orchestration-cluster-api';",
              },
              {
                lang: "Python",
                highlight: "python",
                operationMapPath:
                  ".sdk-repos/orchestration-cluster-api-python/examples/operation-map.json",
                autoImports: true,
                defaultImports:
                  "from camunda_orchestration_sdk import CamundaClient",
              },
              {
                lang: "C#",
                highlight: "csharp",
                operationMapPath:
                  ".sdk-repos/orchestration-cluster-api-csharp/examples/operation-map.json",
                autoImports: true,
                defaultImports: "using Camunda.Orchestration.Sdk;",
              },
              {
                lang: "Rust",
                highlight: "rust",
                operationMapPath:
                  ".sdk-repos/orchestration-cluster-api-rust/examples/operation-map.json",
                autoImports: true,
                defaultImports: "use camunda_orchestration_sdk::CamundaClient;",
              },
              {
                lang: "Go",
                highlight: "go",
                operationMapPath:
                  ".sdk-repos/orchestration-cluster-api-go/examples/operation-map.json",
                autoImports: true,
                defaultImports:
                  'import (\n\tcamunda "github.com/camunda/orchestration-cluster-api-go"\n\topenapi "github.com/camunda/orchestration-cluster-api-go/client"\n)',
              },
            ],
            version: "1",
            label: "Unused but required field",
            baseUrl: "Unused but required field",
            versions: {
              8.9: {
                specPath: "api/camunda/version-8.9/camunda-openapi.yaml",
                outputDir:
                  "versioned_docs/version-8.9/apis-tools/orchestration-cluster-api-rest/specifications",
                label: "Unused but required field",
                baseUrl: "Unused but required field",
                sdkExamples: [
                  {
                    lang: "TypeScript",
                    highlight: "typescript",
                    operationMapPath:
                      ".sdk-repos/version-8.9/orchestration-cluster-api-js/examples/operation-map.json",
                    autoImports: true,
                    defaultImports:
                      "import { createCamundaClient } from '@camunda8/orchestration-cluster-api';",
                  },
                  {
                    lang: "Python",
                    highlight: "python",
                    operationMapPath:
                      ".sdk-repos/version-8.9/orchestration-cluster-api-python/examples/operation-map.json",
                    autoImports: true,
                    defaultImports:
                      "from camunda_orchestration_sdk import CamundaClient",
                  },
                  {
                    lang: "C#",
                    highlight: "csharp",
                    operationMapPath:
                      ".sdk-repos/version-8.9/orchestration-cluster-api-csharp/examples/operation-map.json",
                    autoImports: true,
                    defaultImports: "using Camunda.Orchestration.Sdk;",
                  },
                ],
              },
              8.8: {
                specPath: "api/camunda/version-8.8/camunda-openapi.yaml",
                outputDir:
                  "versioned_docs/version-8.8/apis-tools/orchestration-cluster-api-rest/specifications",
                label: "Unused but required field",
                baseUrl: "Unused but required field",
              },
              8.7: {
                specPath: "api/camunda/version-8.7/camunda-openapi.yaml",
                outputDir:
                  "versioned_docs/version-8.7/apis-tools/camunda-api-rest/specifications",
                label: "Unused but required field",
                baseUrl: "Unused but required field",
              },
            },
          },
        },
      },
    ],
    [
      // Zeebe REST API docs generation
      "@camunda8/docusaurus-plugin-openapi-docs",
      {
        id: "api-zeebe-openapi",
        docsPluginId: "default",
        config: {
          zeebe: {
            specPath: "inactive",
            outputDir: "docs/apis-tools/zeebe-api-rest/specifications",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            hideSendButton: true,
            version: "1",
            label: "Unused but required field",
            baseUrl: "Unused but required field",
            versions: {
              8.7: {
                specPath: "api/zeebe/version-8.7/zeebe-openapi.yaml",
                outputDir:
                  "versioned_docs/version-8.7/apis-tools/zeebe-api-rest/specifications",
                label: "Unused but required field",
                baseUrl: "Unused but required field",
              },
            },
          },
        },
      },
    ],
    [
      // Hub API Self-Managed docs generation
      "@camunda8/docusaurus-plugin-openapi-docs",
      {
        id: "api-hubsm-openapi",
        docsPluginId: "default",
        config: {
          hubsm: {
            specPath: "api/hubsm/v2/camunda-openapi.yaml",
            outputDir: "docs/apis-tools/hub-api-sm/specifications",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            hideSendButton: true,
            version: "0.1.0",
            label: "Unused but required field",
            baseUrl: "Unused but required field",
          },
        },
      },
    ],
    [
      // Hub API SaaS docs generation
      "@camunda8/docusaurus-plugin-openapi-docs",
      {
        id: "api-hubsaas-openapi",
        docsPluginId: "default",
        config: {
          hubsaas: {
            specPath: "api/hubsaas/v2/camunda-openapi.yaml",
            outputDir: "docs/apis-tools/hub-api-saas/specifications",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            hideSendButton: true,
            version: "0.1.0",
            label: "Unused but required field",
            baseUrl: "Unused but required field",
          },
        },
      },
    ],
    [
      // RSS feed for security notices
      "./static/plugins/notices-feed",
      {
        url: docsSiteUrl,
        contextPath: docsSitebaseUrl,
        maxItems: 50,
      },
    ],
    // Docusaurus plugin for LLM training and AI agent consumption.
    // The plugin generates both a full markdown file and a metadata-only .llms.txt file for each doc,
    // excluding the content of code blocks and optionally excluding content from imports.
    // The plugin also generates a root-level llms.md file that lists all docs with links, which can be used as a single source of truth for the documentation content.
    // Skipped in partial builds: it re-reads and re-processes every doc in postBuild.
    ...(partialBuild
      ? []
      : [
          [
            "docusaurus-plugin-llms",
            {
              generateLLMsTxt: false,
              generateLLMsFullTxt: true,
              docsDir: "docs",
              excludeImports: true,
              removeDuplicateHeadings: true,
              processingBatchSize: 50,
              addMdExtension: true,
              generateMarkdownFiles: true,
              preserveDirectoryStructure: true,
              ignoreFiles: ["apis-tools/*/specifications/*"],
              title: "Camunda 8 Documentation",
              description:
                "Process orchestration platform for automating workflows across people, systems, and devices. Supports BPMN, DMN, connectors, and agentic AI orchestration.",
              customLLMFiles: [
                {
                  filename: "llms-guides.txt",
                  title: "Camunda 8 Guides",
                  description:
                    "Getting started guides, tutorials, and walkthroughs for Camunda 8.",
                  includePatterns: ["guides/*"],
                  fullContent: false,
                },
                {
                  filename: "llms-components.txt",
                  title: "Camunda 8 Components",
                  description:
                    "Console, Modeler, Zeebe, Operate, Tasklist, Optimize, Connectors, and agentic orchestration.",
                  includePatterns: ["components/*"],
                  fullContent: false,
                },
                {
                  filename: "llms-apis-tools.txt",
                  title: "Camunda 8 APIs & Tools",
                  description:
                    "REST APIs, SDKs, clients, CLI, and developer tooling.",
                  includePatterns: ["apis-tools/*"],
                  fullContent: false,
                },
                {
                  filename: "llms-self-managed.txt",
                  title: "Camunda 8 Self-Managed",
                  description:
                    "Deployment, configuration, upgrade, and operations for Self-Managed installations.",
                  includePatterns: ["self-managed/*"],
                  fullContent: false,
                },
                {
                  filename: "llms-reference.txt",
                  title: "Camunda 8 Reference",
                  description:
                    "Release notes, announcements, glossary, licenses, dependencies, and supported environments.",
                  includePatterns: ["reference/*"],
                  fullContent: false,
                },
              ],
            },
          ],
        ]),
  ],
  scripts: [
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      "data-website-id": "1a0b2863-2767-4583-9d33-ded0095731e7",
      "data-project-name": "Camunda",
      "data-project-color": "#000000",
      "data-button-hide": "true",
      "data-project-logo":
        "https://avatars.githubusercontent.com/u/2443838?s=200&v=4",
      "data-modal-disclaimer":
        "Camunda 8 docs AI is trained on Camunda 8 documentation, forum posts, product blogs, and more. You must check and validate generated content and code before using in your environment as responses can be inaccurate. If you have feedback please give a thumbs up or down as we continue to improve the AI.",
      "data-modal-example-questions": `What's new in Camunda ${currentVersion}?,What's Camunda SaaS vs Self-Managed?`,
      "data-search-mode-enabled": "true",
      "data-button-border": "1px solid #555555",
      "data-user-analytics-cookie-enabled": "false",
      "data-mcp-enabled": "true",
      "data-mcp-server-url": "https://camunda-docs.mcp.kapa.ai",
      async: true,
    },
  ],
  themeConfig: {
    colorMode: {
      defaultMode: "light",
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    announcementBar: {
      id: "camunda8",
      content:
        '📣 <b><a target="_blank" rel="noopener noreferrer" href="https://signup.camunda.com/accounts?utm_source=docs.camunda.io&utm_medium=referral&utm_content=banner">Sign up</a></b> for a free account to start orchestrating your business processes today.',
      backgroundColor: "#171717",
      textColor: "#fff",
      isCloseable: true,
    },

    prism: {
      additionalLanguages: ["java", "protobuf", "csharp", "bash", "rust"],
      theme: themes.palenight,
      darkTheme: themes.dracula,
    },
    navbar: {
      title: "Camunda 8 Docs",
      logo: {
        alt: "Camunda 8 Docs",
        src: "img/logo-camunda-black.svg",
        srcDark: "img/logo-light.svg",
      },
      items: [
        {
          type: "docsVersionDropdown",
          position: "left",
          dropdownItemsAfter: [
            {
              type: "html",
              value: '<hr class="dropdown-separator">',
            },
            {
              type: "html",
              className: "dropdown-unmaintained-versions",
              value: "<b>Unmaintained versions</b>",
            },
            ...unmaintainedVersions.map((version) => ({
              label: version.label,
              href: `https://unsupported.docs.camunda.io/${version.urlSuffix}/`,
            })),
          ],
        },
        {
          type: "doc",
          docId: "guides/introduction-to-camunda",
          label: "Get started",
          position: "left",
        },
        {
          type: "doc",
          docId: "guides/build-with-ai/overview",
          label: "Build with AI",
          position: "left",
        },
        {
          type: "doc",
          docId: "components/components-overview",
          label: "Using Camunda",
          position: "left",
        },
        {
          type: "doc",
          docId: "self-managed/about-self-managed",
          label: "Self-Managed",
          position: "left",
        },
        {
          type: "doc",
          docId: "apis-tools/working-with-apis-tools",
          label: "APIs & tools",
          position: "left",
        },
        {
          type: "doc",
          docId: "reference/overview",
          label: "Reference",
          position: "left",
        },
        {
          type: "dropdown",
          label: "Help",
          position: "right",
          className: "help-icon-btn",
          items: [
            {
              label: "Support",
              href: "https://camunda.com/services/enterprise-support-guide/",
            },
            {
              label: "Downloads",
              to: "/downloads",
            },
            {
              label: "Academy",
              href: "https://academy.camunda.com/",
            },
            {
              label: "Community",
              href: "https://community.camunda.com/",
            },
            {
              label: "Forum",
              href: "https://forum.camunda.io/",
            },
            {
              label: "Blog",
              href: "https://camunda.com/blog/",
            },
            {
              label: "Roadmap",
              href: "https://roadmap.camunda.com/",
            },
          ],
        },
        {
          type: "html",
          position: "right",
          value:
            '<button class="button button--secondary button--md kapa-open" onclick="if(window.Kapa&&window.Kapa.open){window.Kapa.open({});} return false;" title="Ask AI" aria-label="Ask AI"><img src="/img/ai-star.png" alt="" style="height:1em;width:1em;margin-right:6px;vertical-align:middle;" />Ask AI</button>',
        },
        {
          to: "build-with-camunda",
          position: "right",
          className: "button button--primary button--md try-free",
          label: "Try Free",
          title: "Try Free",
          "aria-label": "Try Free",
        },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "Camunda.com",
        src: "img/logo-light.svg",
        href: "https://camunda.com",
      },
      links: [
        {
          title: "About",
          items: [
            {
              label: "Try free",
              to: "/build-with-camunda",
            },
            {
              label: "Support and feedback",
              to: "docs/reference/contact",
            },
            {
              label: "Docs MCP server",
              to: "docs/reference/mcp-docs",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              html: `<a href="https://twitter.com/camunda" target="_blank" rel="noreferrer noopener"><img src= "/img/twitter.svg" alt="Camunda on Twitter" class="footer-logos" /></a> <a href="https://github.com/camunda" target="_blank" rel="noreferrer noopener"><img src= "/img/github-mark-white.svg" alt="Camunda on GitHub" class="footer-logos" /></a>`,
            },
            {
              label: "Forum",
              href: "https://forum.camunda.io/",
            },
            {
              label: "Contribute",
              href: "https://camunda.com/developers/how-to-contribute/",
            },
            {
              label: "Subscribe",
              href: "https://camunda.com/developers/developer-community-updates/",
            },
          ],
        },
        {
          title: "Camunda",
          items: [
            {
              label: "Downloads",
              to: "/downloads",
            },
            {
              label: "Camunda Hub",
              href: "https://hub.camunda.io",
            },
            {
              label: "Status",
              href: "https://status.camunda.io",
            },
            {
              label: "Blog",
              href: "https://camunda.com/blog/tag/camunda-platform-8/",
            },
            {
              label: "Release policy",
              to: "docs/reference/announcements-release-notes/release-policy",
            },
          ],
        },
        {
          title: "Legal",
          items: [
            {
              label: "Privacy Statement",
              href: "https://legal.camunda.com/privacy-and-data-protection",
            },
            {
              html: `<a class="footer__link-item" href="#" onclick="Osano.cm.showDrawer('osano-cm-dom-info-dialog-open')">Cookie Preferences</a>`,
            },
            {
              label: "Licenses",
              to: "docs/reference/licenses",
            },
            {
              label: "Security notices",
              to: "docs/reference/notices",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Camunda`,
    },
    algolia: {
      // These keys are for our new standalone algolia instance!
      apiKey: "68db7725a8410eace68419c29385ad1e",
      appId: "6KYF3VMCXZ",
      indexName: "camunda-v3",
      placeholder: "Search Camunda 8 docs",
    },
    languageTabs: [
      {
        highlight: "bash",
        language: "curl",
        logoClass: "curl",
      },
      {
        highlight: "java",
        language: "java",
        logoClass: "java",
        variant: "okhttp",
        variants: ["okhttp", "unirest"],
      },
      {
        highlight: "javascript",
        language: "nodejs",
        logoClass: "nodejs",
        variant: "native",
        variants: ["native", "axios", "request", "unirest"],
      },
      {
        highlight: "csharp",
        language: "csharp",
        logoClass: "csharp",
        variant: "RestSharp",
        variants: ["restsharp", "httpclient", "", " "],
      },
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
        variant: "requests",
        variants: ["requests", "http.client"],
      },
      {
        highlight: "go",
        language: "go",
        logoClass: "go",
        variant: "native",
        variants: ["native", ""],
      },
    ],
    mermaid: {
      options: {
        theme: "base",
        themeVariables: {
          fontFamily:
            '"Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: "16px",
        },
      },
      theme: {
        light: "neutral",
      },
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/camunda/camunda-docs/edit/main/",
          remarkPlugins: [
            require("./static/plugins/terminology/remark-glossary-terms"),
          ],
          lastVersion:
            partialBuild && !buildVersions.includes(currentVersion)
              ? buildVersions[buildVersions.length - 1]
              : currentVersion,
          // 👋 When cutting a new version, remove the banner for maintained versions by adding an entry. Remove the entry to versions >18 months old.
          versions: {
            current: {
              label: "8.10 (unreleased)",
            },
            8.8: {
              banner: "none",
            },
            8.7: {
              banner: "none",
            },
          },
          docItemComponent: "@theme/ApiItem",
          // Partial builds only compile the selected docs versions, skipping
          // the other versioned snapshots (a major memory driver).
          ...(partialBuild ? { onlyIncludeVersions: buildVersions } : {}),
          // Optionally exclude the generated TypeScript API reference, which
          // makes up roughly half of all docs pages.
          ...(skipApiReference
            ? {
                exclude: [
                  ...GlobExcludeDefault,
                  "apis-tools/typescript/api-reference/**",
                ],
                // The excluded dir backs an autogenerated "API Reference"
                // sidebar category (also in versioned sidebars JSON, which
                // cannot be made conditional). An empty category fails the
                // build, so substitute a link to the always-present SDK page.
                sidebarItemsGenerator: async (args) => {
                  if (
                    args.item.dirName === "apis-tools/typescript/api-reference"
                  ) {
                    return [
                      {
                        type: "doc",
                        id: "apis-tools/typescript/typescript-sdk",
                      },
                    ];
                  }
                  return args.defaultSidebarItemsGenerator(args);
                },
              }
            : {}),
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: [
            "/docs/**/assets/**",
            "/docs/**/tags/**",
            "/docs/next/**",
            "/docs/8.7/**",
            "/docs/8.8/**",
          ],
        },
      },
    ],
  ],
  markdown: {
    mermaid: true,
    ...(skippedLinkPrefixes.length > 0
      ? { preprocessor: bypassOutOfScopeLinks }
      : {}),
  },
  themes: [
    "@camunda8/docusaurus-theme-openapi-docs",
    "@saucelabs/theme-github-codeblock",
    "@docusaurus/theme-mermaid",
  ],
  clientModules: [require.resolve("./src/scripts/mermaid_icons.js")],
};
