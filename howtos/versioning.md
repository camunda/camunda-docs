# Versioning

Our documentation is versioned. All sections are versioned together, this includes products that do not have a fixed release cycle (such as Console, Web Modeler, and Connectors).

## Structure

Depending on the version, location of source files and sidebar navigation definition varies:

| Instance | Version(s)         | Source path                                       | Sidebars path                                                         |
| -------- | ------------------ | ------------------------------------------------- | --------------------------------------------------------------------- |
| `docs`   | Next               | [/docs/](../docs/)                                | [sidebars.js](../sidebars.js)                                         |
| `docs`   | 8.7, 8.6, 8.5, ... | [/versioned_docs/version-\*/](../versioned_docs/) | [versioned_sidebars/version-\*-sidebars.json](../versioned_sidebars/) |

## Create new version

New versions are created as part of the [release process](/howtos/release-procedure.md).

## Archiving a version

Docusaurus builds the documentation for all versions in the project, even those that are no longer supported. With a large number of versions, this can slow down the build process significantly. We archive versions that are no longer supported to speed up build workflows.

Our current policy is to support versions for 18 months. Any version older than 18 months is suitable for archiving.

When a version is archived, it is removed from the main docs, isolated on a branch named `unsupported/x.xx` where `x.xx` is the version, and deployed to the URLs `https://unsupported.docs.camunda.io/x.xx/` and `https://stage.unsupported.docs.camunda.io/x.xx/`.

### Archival steps

See [this 8.3 archival issue](https://github.com/camunda/camunda-docs/issues/5564) and [this 8.4 archival issue](https://github.com/camunda/camunda-docs/issues/6628) for an example of all required steps.

#### Step 1: Make sure the new archive version is not published in main

On the `main` docs branch, configure the `publish-prod` workflow to ignore tags for the archived version. See [this PR](https://github.com/camunda/camunda-docs/pull/5567) as an example.

**Warning**: You must do this before publishing a production release for the archived version, to avoid accidentally publishing the archived version as the main docs.

#### Step 2: Create the new archived version branch

Create a new branch named `unsupported/x.xx` where `x.xx` is the version to be archived. The branch should be created from the latest commit on the `main` branch.

For example, for the 8.5 docs archival, you would create a new branch named `unsupported/8.5`.

#### Step 3: Create and publish the unsupported branch

1. On the `unsupported/x.xx` branch:
   1. Confirm the version number to be archived at the top of the `./hacks/isolateVersion/allSteps.sh` script.
   2. Run the `./hacks/isolateVersion/allSteps.sh` script. This automates a handful of basic steps; see the script for more details.
      - For the sake of review-ability, consider breaking these changes into multiple PRs. See [this very large PR](https://github.com/camunda/camunda-docs/pull/5586) and [this much smaller PR](https://github.com/camunda/camunda-docs/pull/5587) as examples.
   3. Make the manual changes described by the output of the `allSteps.sh` script in a new PR. See [this PR](https://github.com/camunda/camunda-docs/pull/6586) as an example. You may need to remove generated API reference docs, and tidy up any broken links in this step.
   4. Merge these PRs.
   5. After they're all merged, confirm that these changes publish to the associated staging location: `https://stage.unsupported.docs.camunda.io/x.xx/`.
   6. Publish the production release for the archived version, by adding a tag to the HEAD of the `unsupported/x.xx` branch.
      1. Create a new tag after the last one for that version. Name the tag `x.xx.0` where `x.xx` is the version number. For example, for the 8.4 archival, as `8.4.30` was the last tag used, we created a new `8.4.31` to use for the archival.
      2. **Important** Choose the `unsupported/x.xx` branch as the target.
      3. **Important** Deselect the `Set as the latest release` option.

#### Step 4: Remove the archived version from the main docs

On the `main` branch:

1. Remove the archived version from the docs.
   1. Open a smaller, reviewable PR that logically removes the version, and links to the external unsupported version in the top navigation bar. [Example](https://github.com/camunda/camunda-docs/pull/5597).
   2. Open a second larger PR that physically removes the source files. [Example](https://github.com/camunda/camunda-docs/pull/5601).
2. [Publish a new patch release of the main docs](./release-procedure.md#perform-a-patch-release).
3. Check and confirm the archived version is no longer available in the main docs.

Congratulations! You should now have removed the archived version from the docs, and published the archived version to `https://unsupported.docs.camunda.io/x.xx`.

### Archived for posterity: 8.3 archival steps

Note that there was a difference in the process between 8.3 and 8.4 archival, so these 8.3 steps simply remain for posterity.

1. Create a new branch named `unsupported/x.xx` where `x.xx` is the version to be archived. The branch should be created from the latest commit on the `main` branch.
2. On the `main` branch:
   1. Configure the `publish-prod` workflow to ignore tags for the archived version. See [this PR](https://github.com/camunda/camunda-docs/pull/5567) as an example.
      - It's important to do this before publishing a production release for the archived version, to avoid accidentally publishing the archived version as the main docs.
3. On the `unsupported/x.xx` branch:
   1. Confirm the version number to be archived at the top of the `./hacks/isolateVersion/allSteps.sh` script.
   2. Run the `./hacks/isolateVersion/allSteps.sh` script. This automates a handful of basic steps; see the script for more details.
      - For the sake of review-ability, consider breaking these changes into multiple PRs. See [this very large PR](https://github.com/camunda/camunda-docs/pull/5586) and [this much smaller PR](https://github.com/camunda/camunda-docs/pull/5587) as examples.
   3. Make the manual changes described by the output of the `allSteps.sh` script. See [this PR](https://github.com/camunda/camunda-docs/pull/5587) as an example.
   4. After they're all merged, confirm that these changes publish to the associated staging location: `https://stage.unsupported.docs.camunda.io/x.xx/`.
   5. Publish the production release for the archived version, by adding a tag to the HEAD of the `unsupported/x.xx` branch.
      - Name the tag `x.xx.0` where `x.xx` is the version number.
      - Choose the `unsupported/x.xx` branch as the target.
      - Deselect the `Set as the latest release` option.
4. On the `main` branch:
   1. Remove the archived version from the docs.
      1. Open a smaller, reviewable PR that logically removes the version, and links to the external unsupported version in the top navigation bar. [Example](https://github.com/camunda/camunda-docs/pull/5597).
      2. Open a second larger PR that physically removes the source files. [Example](https://github.com/camunda/camunda-docs/pull/5601).
   2. [Publish a new patch release of the main docs](./release-procedure.md#perform-a-patch-release).

## Further information

The Docusaurus documentation provides a detailed explanation of versioning at [https://v2.docusaurus.io/docs/versioning/](https://v2.docusaurus.io/docs/versioning/).
