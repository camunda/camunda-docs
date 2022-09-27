# Versioning

Our documentation is versioned. All sections are versioned together, this includes products that do not have a fixed release cycle (such as Console, Web Modeler, and Connectors).

## Instances: Docs vs Optimize

Due to a difference in version numbers, the documentation is split into [multiple Docusaurus "instances"](https://docusaurus.io/docs/docs-multi-instance). Documentation specific to Optimize lives in the `optimize` instance, and all other documentation lives in the main `docs` instance.

## Structure

Depending on the instance and version, location of source files and sidebar navigation definition varies:

| Instance   | Version(s)         | Source path                                                         | Sidebars path                                                                            |
| ---------- | ------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `docs`     | Next               | [/docs/](../docs/)                                                  | [sidebars.js](../sidebars.js)                                                            |
| `docs`     | 8.0, 1.3, 1.2, ... | [/versioned_docs/version-\*/](../versioned_docs/)                   | [versioned_sidebars/version-\*-sidebars.json](../versioned_sidebars/)                    |
| `optimize` | Next               | [/optimize/](../optimize/)                                          | [optimize_sidebars.js](../optimize_sidebars.js)                                          |
| `optimize` | 3.8.0, 3.7.0, ...  | [/optimize_versioned_docs/version-\*/](../optimize_versioned_docs/) | [/optimize_versioned_sidebars/version-\*-sidebars.json](../optimize_versioned_sidebars/) |

## Create new version

New versions are created as part of the [release process](/howtos/release-procedure.md).

## Further information

The Docusaurus documentation provides a detailed explanation of versioning at [https://v2.docusaurus.io/docs/versioning/](https://v2.docusaurus.io/docs/versioning/).
