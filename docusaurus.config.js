const versionedLinks = require("./src/mdx/versionedLinks");

module.exports = {
  title: "Camunda 8 Docs",
  tagline: "Documentation for all components of Camunda 8",
  // url: "https://camunda-cloud.github.io",
  url: "https://docs.camunda.io",
  // baseUrl: "/camunda-cloud-documentation/",
  baseUrl: "/",
  customFields: {
    canonicalUrlRoot: "https://docs.camunda.io",
  },
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "camunda", // Usually your GitHub org/user name.
  projectName: "camunda-docs", // Usually your repo name.
  trailingSlash: true,
  // do not delete the following 'noIndex' line as it is modified for staging
  noIndex: true,
  plugins: [
    //        ["@edno/docusaurus2-graphql-doc-generator",
    //          {
    //            schema: "http://localhost:8080/tasklist/graphql",
    //            rootPath: "./docs/", // docs will be generated under (rootPath/baseURL)
    //            baseURL: "apis-tools/tasklist-api",
    //            linkRoot: "/docs/",
    //            loaders: {
    //              UrlLoader: "@graphql-tools/url-loader"
    //            }
    //          },
    //        ],
    [
      require.resolve("docusaurus-gtm-plugin"),
      {
        id: "GTM-KQGNSTS", // GTM Container ID
      },
    ],
    "./static/plugins/bpmn-js",
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "optimize",
        path: "optimize",
        routeBasePath: "optimize",
        beforeDefaultRemarkPlugins: [versionedLinks],
        sidebarPath: require.resolve("./optimize_sidebars.js"),
        editUrl: "https://github.com/camunda/camunda-docs/edit/main/",
        versions: {
          "3.11.0": {
            label: "8.3 / 3.11.0",
          },
          "3.10.0": {
            banner: "none",
          },
          "3.9.0": {
            banner: "none",
          },
          // surprising, yes, but true: 3.8 should show unsupported banner, but 3.7 should not.
          "3.7.0": {
            banner: "none",
          },
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "api-operate-docs",
        path: "api/operate",
        routeBasePath: "api/operate",
        sidebarPath: require.resolve("./api/operate/operate_sidebars.js"),
        editUrl: "https://github.com/camunda/camunda-docs/edit/main/",
        lastVersion: "current",
        versions: {
          current: {
            label: "1.0",
            path: "",
          },
        },
        docLayoutComponent: "@theme/DocPage",
        docItemComponent: "@theme/ApiItem",
      },
    ],
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "api-operate-openapi",
        docsPluginId: "api-operate-docs",
        config: {
          operate: {
            specPath: "api/operate/operate-openapi.yaml", // Path to designated spec file
            outputDir: "api/operate/docs", // Output directory for generated .mdx docs
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            hideSendButton: true,
          },
        },
      },
    ],
  ],
  scripts: [],
  themeConfig: {
    announcementBar: {
      id: "camunda8",
      content:
        '📣 <b><a target="_blank" rel="noopener noreferrer" href="https://signup.camunda.com/accounts?utm_source=docs.camunda.io&utm_medium=referral&utm_content=banner">Sign-Up</a></b> for a free account to start orchestrating business processes today.',
      backgroundColor: "#14D890",
      textColor: "#000",
      isCloseable: true,
    },
    prism: {
      additionalLanguages: ["java", "protobuf", "csharp"],
    },
    navbar: {
      title: "Camunda 8 Docs",
      logo: {
        alt: "Camunda 8 Docs",
        src: "img/black-C.png",
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
              className: "dropdown-unsupported-versions",
              value: "<b>Unsupported versions</b>",
            },
            ...["1.2", "1.1", "1.0", "0.26", "0.25"].map((version) => ({
              label: version,
              href: `https://unsupported.docs.camunda.io/${version}/`,
            })),
          ],
        },
        {
          type: "doc",
          docId: "guides/introduction-to-camunda",
          label: "Guides",
          position: "left",
        },
        {
          type: "doc",
          docId: "components/components-overview",
          label: "Components",
          position: "left",
        },
        {
          type: "doc",
          docId: "apis-tools/working-with-apis-tools",
          label: "APIs & Tools",
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
          docId: "reference/overview",
          label: "Reference",
          position: "left",
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
              label: "How to use our docs",
              to: "meta",
            },
            {
              label: "Try free",
              href: "https://signup.camunda.com/accounts?utm_source=docs.camunda.io&utm_medium=referral&utm_content=footer",
            },
            {
              label: "Contact",
              to: "contact",
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
              label: "Developer resources",
              href: "https://camunda.com/developers/",
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
              label: "Console",
              href: "https://camunda.io",
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
              label: "Release cycle",
              to: "docs/reference/release-policy",
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
              html: `<a class="osano-footer-link-docu" href="#" onclick="Osano.cm.showDrawer('osano-cm-dom-info-dialog-open')">Cookie Preferences</a>`,
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
      apiKey: "d701d38126d1a43866047d3ab97680d1",
      appId: "6KYF3VMCXZ",
      indexName: "camunda",
    },
    languageTabs: [
      {
        highlight: "bash",
        language: "curl",
        logoClass: "bash",
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
        highlight: "go",
        language: "go",
        logoClass: "go",
        variant: "native",
        variants: ["native", "", " ", "  "],
      },
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
        variant: "requests",
        variants: ["requests", "http.client"],
      },
      {
        highlight: "csharp",
        language: "csharp",
        logoClass: "csharp",
        variant: "RestSharp",
        variants: ["restsharp", "httpclient"],
      },
    ],
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/camunda/camunda-docs/edit/main/",
          beforeDefaultRemarkPlugins: [versionedLinks],
          // 👋 When cutting a new version, remove the banner for maintained versions by adding an entry. Remove the entry to versions >18 months old.
          versions: {
            8.2: {
              banner: "none",
            },
            8.1: {
              banner: "none",
            },
          },
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
            "/docs/1.3/**",
            "/docs/8.0/**",
            "/docs/8.1/**",
            "/docs/8.2/**",
            "/optimize/3.7.0/**",
            "/optimize/3.8.0/**",
            "/optimize/3.9.0/**",
            "/optimize/3.10.0/**",
            "/optimize/next/**",
          ],
        },
      },
    ],
  ],
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve("swc-loader"),
      options: {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          target: "es2017",
        },
        module: {
          type: isServer ? "commonjs" : "es6",
        },
      },
    }),
  },
  themes: ["docusaurus-theme-openapi-docs"],
};
