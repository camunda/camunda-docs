# Versioning

Our documentation is versioned. All sections are versioned together, this includes products that do not have a fixed release cycle (such as Console, Web Modeler, and Connectors).

## Structure

Depending on the version, location of source files and sidebar navigation definition varies:

| Instance | Version(s)              | Source path                                       | Sidebars path                                                         |
| -------- | ----------------------- | ------------------------------------------------- | --------------------------------------------------------------------- |
| `docs`   | Next                    | [/docs/](../docs/)                                | [sidebars.js](../sidebars.js)                                         |
| `docs`   | 8.9, 8.8, 8.7, 8.6, ... | [/versioned_docs/version-\*/](../versioned_docs/) | [versioned_sidebars/version-\*-sidebars.json](../versioned_sidebars/) |

## Create new version

New versions are created as part of the [release process](/howtos/release-procedure.md).

## Archiving a version

Docusaurus builds the documentation for all versions in the project, even those that are no longer maintained. With a large number of versions, this can slow down the build process significantly. We archive versions that are no longer maintained to speed up build workflows.

Our current policy is to support versions for 18 months. Any version older than 18 months is suitable for archiving.

When a version is archived, it is removed from the main docs, isolated on a branch named `unsupported/x.xx` where `x.xx` is the version, and deployed to the URLs `https://unsupported.docs.camunda.io/x.xx/` and `https://stage.unsupported.docs.camunda.io/x.xx/`.

### Prerequisites

This process relies on automations to take care of the bulk of the archiving work on your behalf. To run those automations, you'll need the following dependencies:

- Bash
- Make
- Python 3.12+

Additionally, you'll also need to configure your Git email and name in your development environment with `git config`.

### Create a GitHub issue

Create a new GitHub issue to track your progress:

```
## Overview

With the latest release, <VERSION> has reached end of maintenance.
We will archive <VERSION> docs to an unsupported, standalone instance.

This issue tracks related activities.

## Activities

- [ ] Ignore <VERSION> when deploying prod (reference link)
- [ ] Create new `unsupported/<VERSION>` branch (reference link)
- [ ] Ran automated scripts to isolate the <VERSION> docs (reference link)
- [ ] Manually fix links (reference link)
- [ ] Deploy isolated version (reference link)
- [ ] Logically remove <VERSION> from main (reference link)
- [ ] Physically remove <VERSION> from main (reference link)
```

### Set your archive version environment variable

Set the archived version in an environment variable:

```sh
export ARCHIVED_VERSION=8.x  # use the real minor version number
```

All future steps will use this environment variable and should, therefore, be run from the same shell. Otherwise, you need to export this environment variable again. You can always verify it's set with `echo`:

```sh
echo $ARCHIVED_VERSION
```

### Make sure the new archive version is not published in main

From `main`, create a branch for step one:

```sh
git checkout main
git pull
git checkout -b archive-step-1
```

Run the `ignore-version-prod` automation:

```sh
make -C hacks/archiveVersion ignore-version-prod
```

This updates `publish-prod.yaml` to ignore tags for the archived minor version and any patches during future production releases.

Commit and submit a PR.

### Create the new archived version branch

From the latest commit on `main`, create a new `unsupported/8.x` branch for the archived version:

```sh
git checkout main
git pull
git checkout -b unsupported/$ARCHIVED_VERSION
```

You now have a branch named `unsupported/8.x` (using your actual minor version).

### Create and publish the unmaintained branch

On the `unsupported/8.x` branch, isolate the archived version:

```sh
make -C hacks/archiveVersion isolate-version
```

This automates a handful of basic steps to remove all other versions of the documentation and prepare the site for being published as unsupported. See the scripts in `hacks/isolateVersion` for more details.

This creates a large set of commits. Push them to remote, but **don't open a PR**. You can review the changes at https://github.com/camunda/camunda-docs/commits/unsupported/8.6/ (Change the version to your archived version.)

> **Warning:** Do not merge this branch into `main`! This branch will persist indefinitely alongside `main` and will never be merged. Instead, it will be used to deploy to unsupported.docs.camunda.io.

### Fix links and redirects

Preprocess the docs to automate common changes that need to be made against the isolated version:

```sh
make -C hacks/archiveVersion preprocess
```

Read the docstring in `hacks/archiveVersion/2-preprocess.py` for details.

Review and commit the changes.

#### Manually fix links

Unfortunately, there will likely be other broken links you'll need to fix manually:

1. Run `npm run build` to discover and resolve remaining build errors.
2. Submit a PR targeting `unsupported/8.x` (not `main`). The build pipeline will show the remaining broken links.

#### Manually remove redirects

Next, you'll need to remove irrelevant redirects from `.htaccess`. The unsupported site for the archived version is only concerned with that version's redirects.

As a rule of thumb, remove everything except redirects belonging to the archived version. For example, if you're archiving version 8.6:

```txt
RewriteRule ^docs/8.6/components/console/manage-plan/upgrade-to-starter-plan/?$ /docs/8.6/components/console/manage-plan/upgrade-to-enterprise-plan/ [R=301,L]
```

Should be kept and rewritten as:

```txt
RewriteRule ^docs/components/console/manage-plan/upgrade-to-starter-plan/?$ /8.6/docs/components/console/manage-plan/upgrade-to-enterprise-plan/ [R=301,L]
```

### Merge all PRs

Merge all the pull requests submitted so far. Then, confirm these changes are successfully published to the associated staging location: `https://stage.unsupported.docs.camunda.io/8.x/`.

### Publish the production release for the archived version

Look up the last tag for the archived version:

```sh
git ls-remote --tags origin "$ARCHIVED_VERSION.*" | awk '{print $2}' | sed 's#refs/tags/##' | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -n1
```

1. Go to https://github.com/camunda/camunda-docs/releases.
2. Click **Draft a new release**.
3. Click **Select tag**.
4. Click **Create new tag**.
5. Enter the next tag for the archived version. (If the last tag was `8.7.100`, use `8.7.101`.)
6. **(IMPORTANT)** Choose `unsupported/8.x` as the target branch.
7. Use the new tag for the title.
8. Click **Generate release notes**.
9. **(IMPORTANT)** Deselect **Set as the latest release**.

#### Step 4: Remove the archived version from the main docs

On the `main` branch:

1. Remove the archived version from the docs.
   1. Open a smaller, reviewable PR that logically removes the version, and links to the external unsupported version in the top navigation bar. [Example](https://github.com/camunda/camunda-docs/pull/5597).
   2. Open a second larger PR that physically removes the source files. [Example](https://github.com/camunda/camunda-docs/pull/5601).
2. [Publish a new patch release of the main docs](./release-procedure.md#perform-a-patch-release).
3. Check and confirm the archived version is no longer available in the main docs.

Congratulations! You should now have removed the archived version from the docs, and published the archived version to `https://unsupported.docs.camunda.io/x.xx`.

### Reference

<details>
    <summary>Previous archival issues</summary>

- [8.6 archival](https://github.com/camunda/camunda-docs/issues/8659)
- [8.5 archival](https://github.com/camunda/camunda-docs/issues/7077)
- [8.4 archival](https://github.com/camunda/camunda-docs/issues/6628)
- [8.3 archival](https://github.com/camunda/camunda-docs/issues/5564)

</details>
<details>
    <summary>8.3 archival steps (for posterity)</summary>

Note that there was a difference in the process between 8.3 and 8.4 archival, so these 8.3 steps remain here for reference/posterity.

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
      1. Open a smaller, reviewable PR that logically removes the version, and links to the external unmaintained version in the top navigation bar. [Example](https://github.com/camunda/camunda-docs/pull/5597).
      2. Open a second larger PR that physically removes the source files. [Example](https://github.com/camunda/camunda-docs/pull/5601).
   2. [Publish a new patch release of the main docs](./release-procedure.md#perform-a-patch-release).

</details>
<details>
    <summary>Isolate version reference materials</summary>

- 8.5 archival video (old): You can view a video of the 8.5 archival process in the documentation team Google Drive folder (requires access to Teams > Documentation > Processes > Archival > Archival steps).
- [Very large PR](https://github.com/camunda/camunda-docs/pull/5586)
- [Much smaller PR](https://github.com/camunda/camunda-docs/pull/5587)

</details>

## Further information

The Docusaurus documentation provides a detailed explanation of versioning at [https://v2.docusaurus.io/docs/versioning/](https://v2.docusaurus.io/docs/versioning/).
