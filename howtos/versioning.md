# Versioning

Our documentation is versioned. All sections are versioned together, this includes products that do not have a fixed release cycle (such as Cloud Console).

## Structure

### Contents

The latest version of the documentation can be found in the folder [docs](../docs). All contents in this folder will be visible by default after a release of the documentation. It is therefore the latest version.

Older versions can be found in the folder [versioned_docs](../versioned_docs). All subfolders represent a separate version.

### Navigation

The navigation of the documentation is configured via 'sidebars.js'. Again, a distinction is made between the latest and older versions:

- Latest: [sidebars.js](../sidebars.js)
- Versioned: each version under [versioned_sidebars](../versioned_sidebars)

### Adjustments

The name for the latest version can be set via [docusaurus.config.js](../docusaurus.config.js):

```json
presets: [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": require.resolve("./sidebars.js"),
          // Please change this to your repo.
          "editUrl":
            "https://github.com/camunda-cloud/camunda-cloud-documentation/edit/master/",
          // disableVersioning: isVersioningDisabled,
          "lastVersion": "current",
          // onlyIncludeVersions:
          //   !isVersioningDisabled && (isDev || isDeployPreview)
          //     ? ["current", ...versions.slice(0, 2)]
          //     : undefined,
          "versions": {
            "current": {
              "label": `latest`,
            },
          },
        },
        "blog": {
          "showReadingTime": true,
          // Please change this to your repo.
          "editUrl":
            "https://github.com/camunda-cloud/camunda-cloud-documentation/edit/master/blog/",
        },
        "theme": {
          "customCss": require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
```

## Create new version

This step usually happens after a release has been created. Technically, the current contents are frozen in `docs` and copied to `versioned_docs` with the corresponding version. The process can be triggered by this Docusraus command:

```bash
npm run docusaurus docs:version 0.26

```

## Further information

The Docusaurus documentation provides a detailed explanation of versioning at [https://v2.docusaurus.io/docs/versioning/](https://v2.docusaurus.io/docs/versioning/).
