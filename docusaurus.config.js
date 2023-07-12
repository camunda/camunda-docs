module.exports = {
  title: "Camunda Platform 8 Docs",
  tagline: "Documentation for all components of Camunda Platform 8",
  // url: "https://camunda-cloud.github.io",
  url: "https://unsupported.docs.camunda.io",
  // baseUrl: "/camunda-cloud-documentation/",
  baseUrl: "/1.0/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "camunda", // Usually your GitHub org/user name.
  projectName: "camunda-platform-docs", // Usually your repo name.
  trailingSlash: true,
  // do not delete the following 'noIndex' line as it is modified for staging
  noIndex: false,
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
  ],
  scripts: [],
  themeConfig: {
    announcementBar: {
      id: "camunda8",
      content:
        '🚨 This version of Camunda Platform 8 is no longer actively maintained. For up-to-date documentation, see <b><a target="_blank" rel="noopener noreferrer" href="https://docs.camunda.io">the latest version</a></b>.',
      backgroundColor: "#FFC600",
      textColor: "#434343",
      isCloseable: false,
    },
    prism: {
      additionalLanguages: ["java", "protobuf"],
    },
    navbar: {
      title: "Camunda Platform 8 Docs",
      logo: {
        alt: "Camunda Platform 8 Docs",
        src: "img/black-C.png",
      },
      items: [
        {
          type: "docsVersion",
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
            ...["0.25", "0.26"].map((version) => ({
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
              href: "https://signup.camunda.com/accounts?utm_source=unsupported.docs.camunda.io&utm_medium=referral&utm_content=footer",
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
              label: "Slack",
              href: "https://camunda.com/slack",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/camunda",
            },
            {
              label: "GitHub",
              href: "https://github.com/camunda/camunda-platform-docs",
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
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          lastVersion: "1.0",
          includeCurrentVersion: false,
          versions: {
            "1.0": {
              label: "1.0",
              path: "/",
              noIndex: true,
              banner: "unmaintained",
            },
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          // exclude everything from sitemap
          ignorePatterns: ["**"],
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
};
