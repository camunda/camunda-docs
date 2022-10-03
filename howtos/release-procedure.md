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

Minor releases to Camunda Platform 8 happen twice a year in April and October, and the documentation is versioned on the same cadence.

To prepare for a minor release, you'll need to create a new version.

### Create new version

The versioning process copies a snapshot of the current documentation from the un-versioned source to a new versioned source location.

Because we are using [multiple docusaurus docs instances](./versioning.md#instances-docs-vs-optimize), we technically create _two_ new versions at time of product release: one for the main documentation, and one for the Optimize documentation.

Docusaurus creates the new versions in `versioned_docs` and `optimize_versioned_docs`. The contents in `docs` and `optimize` immediately become the documentation for the _next_ release.

To create the new versions:

1. Make the `./hacks/cutNewVersions` shell file executable, if it isn't already:

   ```bash
   > chmod +x ./hacks/cutNewVersions.sh
   ```

2. Update [the versions at the top of the `./hacks/cutNewVersions.sh` file](../hacks/cutNewVersions.sh#L4-L8).
3. Run the `./hacks/`cutNewVersions.sh` script:

   ```bash
   > ./hacks/cutNewVersions.sh
   ```

4. Add a record correlating the two versions to [`src/mdx/expandVersionedUrl.js`](../src/mdx/expandVersionedUrl.js#L20-L27).

   - The `versionMappings` variable maps Optimize versions to main docs versions:

   ```javascript
   const versionMappings = [
     // 👋 When cutting a new version, add a new mapping here!
     {
       docsVersion: "8.0",
       optimizeVersion: "3.8.0",
     },
     { docsVersion: "1.3", optimizeVersion: "3.7.0" },
   ];
   ```

   - Add the new mapping as the first position of the array.

5. Create a PR with the changes and merge to `main`. Confirm no build issues before moving to the release steps.

### Release the new version

Use the GitHub UI and follow the instructions below:

1. Navigate to https://github.com/camunda/camunda-platform-docs/releases and click **Draft a new release**
2. Click **Choose a tag** and create a new tag representing the minor release. The title with autopopulate.
3. Click **Autogenerate release notes**. The **Describe this release** field will fill with PRs included in this release.
4. Click **Publish release**.

The build process for [publish-prod](https://github.com/camunda/camunda-platform-docs/actions/workflows/publish-prod.yaml) will kick off which could take around 30 min to finish. If publish-prod is successful, the updates will appear on [docs.camunda.io](https://docs.camunda.io).
