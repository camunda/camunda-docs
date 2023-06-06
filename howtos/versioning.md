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

### Sidebar drift

Several sections of the sidebar navigation are shared across the Optimize and main sections of the docs: Components, Self-Managed, and APIs & Clients. To preserve a consistent user experience in the docs, the structure of sidebars should always match across instances for these sections. When it doesn't match, the user will experience sections of navigation appearing and disappearing depending on which doc they're reading.

It's likely that the structure will drift over time. To resolve the drift, see [the docs on generating sidebars](../hacks/generateOptimizeSidebars.md).

## Create new version

New versions are created as part of the [release process](/howtos/release-procedure.md).

## Archiving a version

Docusaurus builds the documentation for all versions in the project, even those that are no longer supported. With a large number of versions, this can slow down the build process significantly. We archive versions that are no longer supported to speed up build workflows.

Our current policy is to support versions for 18 months. Any version older than 18 months is suitable for archiving.

When a version is archived, it is removed from the main docs, isolated on a branch named `unsupported/x.xx` where `x.xx` is the version, and deployed to the URLs `https://unsupported.docs.camunda.io/x.xx/` and `https://stage.unsupported.docs.camunda.io/x.xx/`.

### Archival steps

1. Create a new branch named `unsupported/x.xx` where `x.xx` is the version to be archived. The branch should be created from the latest commit on the `main` branch.
2. On the `main` branch:
   1. Configure the `publish-prod` workflow to ignore tags for the archived version. See [this PR](https://github.com/camunda/camunda-platform-docs/pull/2172) as an example.
      - It's important to do this before publishing a production release for the archived version, to avoid accidentally publishing the archived version as the main docs.
3. On the `unsupported/x.xx` branch:
   1. Confirm the version number(s) to be archived at the top of the `./hacks/isolateVersion/allSteps.sh` script.
   2. Run the `./hacks/isolateVersion/allSteps.sh` script. This automates a handful of basic steps; see the script for more details.
      - For the sake of review-ability, you might consider breaking these changes into multiple PRs. See [this very large PR](https://github.com/camunda/camunda-platform-docs/pull/2165) and [this much smaller PR](https://github.com/camunda/camunda-platform-docs/pull/2166) as examples.
   3. Make the manual changes described by the output of the `allSteps.sh` script. See [this PR](https://github.com/camunda/camunda-platform-docs/pull/2167) as an example.
   4. After they're all merged, confirm that these changes publish to the associated staging location: `https://stage.unsupported.docs.camunda.io/x.xx/`.
   5. Publish the production release for the archived version, by adding a tag to the HEAD of the `unsupported/x.xx` branch.
      - Name the tag `x.xx.0` where `x.xx` is the version number.
      - Choose the `unsupported/x.xx` branch as the target.
      - Deselect the `Set as the latest release` option.
4. On the `main` branch:
   1. Remove the archived version from the docs.
   2. Link to the external unsupported version in the top navigation bar.

## Further information

The Docusaurus documentation provides a detailed explanation of versioning at [https://v2.docusaurus.io/docs/versioning/](https://v2.docusaurus.io/docs/versioning/).
