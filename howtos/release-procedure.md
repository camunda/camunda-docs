# Release & publish procedure

The complete documentation is fully versioned. This means that there will be no static content that is the same across all versions. The documentation contains a drop down menu to set the version including `Next`, a version-less preview.

## Perform a patch release

Patch releases for docs can happen nearly any time, barring significant infrastructure changes. Currently, it's recommended to either ask for a release in #ask-documentation (internal Camunda employees only) or include a release date in the PR.

Issues or PRs labeled `Bug` will be prioritized and released as soon as possible, but may not be immediate.

To perform a patch release, confirm what is on `main` via staging at [stage.docs.camunda.io](https://stage.docs.camunda.io) is ready for release.

Then use the GitHub UI and follow the instructions below:

1. Navigate to https://github.com/camunda/camunda-platform-docs/releases and click **Draft a new release**
2. Click **Choose a tag** and create a new tag representing the next patch release. The title with autopopulate.
3. Click **Autogenerate release notes**. The **Describe this release** field will fill with PRs included in this release.
4. Click **Publish release**.

The build process for [publish-prod](https://github.com/camunda/camunda-platform-docs/actions/workflows/publish-prod.yaml) will kick off which could take around 30 min to finish. If publish-prod is successful, the updates will appear on [docs.camunda.io](https://docs.camunda.io).

## Perform a minor release

Minor releases to Camunda Platform 8 happen twice a year in April and October.

To prepare for a minor release, you'll need to create a new verison.

### Create new version

Technically, the current contents are frozen in `docs` and copied to `versioned_docs` with the corresponding version.

(TODO: expand these notes)

- Link to multi-instance version explanation to explain why the process is more involved now
- Step 1: make the ./hacks/cutNewVersions shell file executable, if it isn't already:
  - `chmod +x ./hacks/cutNewVersions.sh`
- Step 2: Update the versions in ./hacks/cutNewVersions.sh
- Step 3: run cutNewVersions:
  - `./hacks/cutNewVersions.sh`
- Step 4: Manually update src/mdx/expandVersionedUrl.js to include new version mapping
  - specifically, add an item to `versionMappings` variable

Create a PR with the changes and merge to `main`, confirming no build issues before moving to the release steps.

### Release the new version

Use the GitHub UI and follow the instructions below:

1. Navigate to https://github.com/camunda/camunda-platform-docs/releases and click **Draft a new release**
2. Click **Choose a tag** and create a new tag representing the minor release. The title with autopopulate.
3. Click **Autogenerate release notes**. The **Describe this release** field will fill with PRs included in this release.
4. Click **Publish release**.

The build process for [publish-prod](https://github.com/camunda/camunda-platform-docs/actions/workflows/publish-prod.yaml) will kick off which could take around 30 min to finish. If publish-prod is successful, the updates will appear on [docs.camunda.io](https://docs.camunda.io).
