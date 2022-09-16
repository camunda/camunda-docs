# Release Procedure

## General

The complete documentation is fully versioned. This means that there will be no static content that is the same across all versions. The documentation contains a drop down menu to set the version including `Next`, a version-less preview.

## Perform a patch release

Patch releases for docs can happen nearly any time, barring significant infrastructure changes. It's current best to ask for a release in #ask-documentation or include a release date in the PR.

Issues or PRs labeled `Bug` will be prioritized and released as soon as possible, but may not be immediate.

To perform a patch release, use the GitHub UI.

### MR Phase 3: After the release

- RM: Create new Release Branch. Naming Pattern: `release_${major-version}_${minor-version}`, example: `release_0_26`.
- RM: Create a new version in the documentation: `npm run docusaurus docs:version ${major-version}.${minor-version}`. This freezes the current state of the documentation. New content is added to the newly created version.
- RM: Open Draft PR with the name `Release ${major-version}.${minor-version}`.
- RM: Communicate new Release Branch via Slack.

## Make changes to old versions (C)

### C Phase 1: Preparation

- PT: Create Github Issue with a short description of the changes.
- PT: Create a new branch. Naming Pattern: `${product}_${issue-number}`
- PT: Create Draft-PR (name: `${product} / #${issue-number} / ${title}`), link issue and make changes.
- PT: Once the draft PR is ready for review, convert it to PR.
- PT and DEVEX: Review and approve.
- AUTO: Merge Branch to Master.

### C Phase 2: Publish Release

- RM: Create new GIT release.
- AUTO: Build master and put it live.

### C Phase 3: After the release

- PT: Merge changes to the current release branch.

## Changes to the current Release Branch (RB)

- PT: Create Github Issue with a short description of the changes.
- PT: New branch from the Release Branch. Naming: `release_${major-version}_${minor-version}_${product}_${issue-number}`
- PT: Create Draft-PR (name: `Release ${major-version}.${minor-version} / ${product} / #${issue-number} / ${title}`), link issue and make changes
- PT: Once the draft PR is ready for review, convert to PR.
- PT and DEVEX: Review and approve.
- AUTO: Merge Branch to Release Branch.
