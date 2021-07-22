module.exports = {
  title: "Camunda Cloud Docs",
  tagline: "Camunda Cloud, Zeebe, Operate, Tasklist",
  // url: "https://camunda-cloud.github.io",
  url: "https://docs.camunda.io",
  // baseUrl: "/camunda-cloud-documentation/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "camunda-cloud", // Usually your GitHub org/user name.
  projectName: "camunda-cloud-documentation", // Usually your repo name.
  trailingSlash: false,
  plugins: [
    //    ["@edno/docusaurus2-graphql-doc-generator",
    //      {
    //        schema: "http://localhost:8080/tasklist/graphql",
    //        rootPath: "./docs/", // docs will be generated under (rootPath/baseURL)
    //        baseURL: "reference/tasklist-api",
    //        linkRoot: "/docs/"
    //      },
    //    ],
    [
      require.resolve("docusaurus-gtm-plugin"),
      {
        id: "GTM-KQGNSTS", // GTM Container ID
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: "Camunda Cloud Docs",
      logo: {
        alt: "Camunda Cloud Docs",
        src: "img/camunda-cloud-gradient.png",
      },
      items: [
        {
          type: "docsVersionDropdown",
          position: "left",
        },
        {
          type: "doc",
          docId: "guides/introduction-to-camunda-cloud",
          label: "Guides",
          position: "left",
        },
        {
          type: "doc",
          docId: "product-manuals/overview",
          label: "Product Manuals",
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
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "docs/guides",
            },
            {
              label: "Licenses",
              to: "docs/reference/licenses",
            },
            {
              label: "Notices",
              to: "docs/reference/notices",
            },
            {
              label: "Release cycle",
              to: "docs/reference/release-policy",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Slack",
              href: "https://zeebe-slack-invite.herokuapp.com/",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/camunda",
            },
            {
              label: "GitHub",
              href: "https://github.com/camunda-cloud/camunda-cloud-documentation",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Contact",
              to: "contact",
            },
            {
              label: "Cloud Console",
              href: "https://camunda.io",
            },
            {
              label: "Status",
              href: "https://status.camunda.io",
            },
            {
              label: "Blog",
              href: "https://camunda.com/blog/category/camunda-cloud/",
            },
            {
              label: "Privacy Statement",
              href: "https://camunda.com/legal/privacy/",
            },
            {
              html: `<a class="osano-footer-link-docu" href="#" onclick="Osano.cm.showDrawer('osano-cm-dom-info-dialog-open')">Cookie Preferences</a>`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Camunda`,
    },
    algolia: {
      apiKey: "f1b2a46296ae374b7f5a5c627341c354",
      indexName: "camunda",
      contextualSearch: true, // useful for versioned docs (https://docusaurus.io/docs/search#contextual-search)
      searchParameters: {}, // Optional (if provided by Algolia)
    },
    // Disabling Dark Mode
    // https://github.com/camunda-cloud/camunda-cloud-documentation/issues/125
    //
    colorMode: {
      // "light" | "dark"
      defaultMode: "light",

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: false,

      // Dark/light switch icon options
      switchConfig: {
        // Icon for the switch while in dark mode
        darkIcon: "🌙",

        // CSS to apply to dark icon,
        // React inline style object
        // see https://reactjs.org/docs/dom-elements.html#style
        darkIconStyle: {
          marginLeft: "2px",
        },

        // Unicode icons such as '\u2600' will work
        // Unicode with 5 chars require brackets: '\u{1F602}'
        lightIcon: "\u{1F602}",

        lightIconStyle: {
          marginLeft: "1px",
        },
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
          editUrl:
            "https://github.com/camunda-cloud/camunda-cloud-documentation/edit/master/",
          // disableVersioning: isVersioningDisabled,
          lastVersion: "current",
          // onlyIncludeVersions:
          //   !isVersioningDisabled && (isDev || isDeployPreview)
          //     ? ["current", ...versions.slice(0, 2)]
          //     : undefined,
          versions: {
            current: {
              label: `latest`,
            },
          },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/camunda-cloud/camunda-cloud-documentation/edit/master/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          //cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: "weekly",
          priority: 0.5,
        },
      },
    ],
  ],
};
