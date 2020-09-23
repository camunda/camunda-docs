module.exports = {
  title: "Camunda Cloud Docs",
  tagline: "Camunda Cloud, Zeebe, Operate, Tasklist",
  url: "https://camunda-cloud.github.io",
  baseUrl: "/camunda-cloud-documentation/",
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
          to: "docs/guides/",
          activeBasePath: "docs/guides/",
          label: "Guides",
          position: "left",
        },
        {
          to: "docs/product-manuals/",
          activeBasePath: "docs/product-manuals",
          label: "Product Manuals",
          position: "left",
        },
        {
          to: "docs/reference/",
          activeBasePath: "docs/reference",
          label: "Reference",
          position: "left",
        },
        {
          to: "docs/samples/",
          activeBasePath: "docs/samples",
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
