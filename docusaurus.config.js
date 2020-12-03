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
  themeConfig: {
    navbar: {
      title: "Camunda Cloud Docs",
      logo: {
        alt: "Camunda Cloud Docs",
        src: "img/camunda-cloud-logo.png",
      },
      items: [
        {
          type: "docsVersionDropdown",
          position: "left",
          // dropdownActiveClassDisabled: true,
          // dropdownItemsAfter: [
          //   {
          //     to: "/versions",
          //     label: "All versions",
          //   },
          // ],
        },
        {
          type: "doc",
          docId: "guides/introcution-to-camunda-cloud",
          // to: "docs/guides/",
          // activeBasePath: "docs/guides/",
          label: "Guides",
          position: "left",
        },
        {
          type: "doc",
          docId: "product-manuals/overview",
          // to: "docs/product-manuals/",
          // activeBasePath: "docs/product-manuals",
          label: "Product Manuals",
          position: "left",
        },
        {
          type: "doc",
          docId: "reference/overview",
          // to: "docs/reference/",
          // activeBasePath: "docs/reference",
          label: "Reference",
          position: "left",
        },
        {
          type: "doc",
          docId: "samples/overview",
          // to: "docs/samples/",
          // activeBasePath: "docs/samples",
          label: "Samples",
          position: "left",
        },
        {
          to: "contact",
          activeBasePath: "contact",
          label: "Contact",
          position: "right",
        },
        { href: "https://zeebe.io/blog/", label: "Blog", position: "left" },
        {
          href: "https://camunda.io",
          label: "Cloud Console",
          position: "right",
        },
        {
          href: "https://github.com/camunda-cloud/camunda-cloud-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "docs/guides",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Slack",
              href: "https://zeebe-io.slack.com/",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/camunda",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              href: "https://camunda.com/blog/",
            },
            {
              label: "GitHub",
              href: "https://github.com/camunda-cloud/camunda-cloud-docs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Camunda`,
    },
    algolia: {
      apiKey: "f1b2a46296ae374b7f5a5c627341c354",
      indexName: "camunda",
      searchParameters: {}, // Optional (if provided by Algolia)
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
      },
    ],
  ],
};
