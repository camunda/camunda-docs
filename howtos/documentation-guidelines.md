# Documentation Guidelines

## PRs for every change

All changes have to be done in a separate Branch. As soon as the changes are done please open a PR. A Github Action runs with every commit to a Branch and checks if the documentation can be build (including a broken links check).

PRs should be in a draft status while being actively worked. Removing a PR from draft status indicates they are ready for review (by a technical writer).

## Labeling PRs

PRs can be labeled “hold” by engineering teams for any reason, including ongoing conversations, coordination across teams or departments, or anything that’s not obvious within the discussion or description of the PR.

PRs labeled “bug” will be merged and released as immediately as possible.

## Not all PRs require an issue

In the spirit of "Always Progress", if you are confident you know what change needs to be made a separate issue on the topic is not required. However, if you have an idea that needs to go into the backlog, creating an issue instead of a PR is the best way to go.

## Structure

- Name Markdown files according to the title. This makes it easier to find a file. Example: **Introduction to Camunda 8** --> `introduction-to-camunda-8.md`. Avoid non-alphanumeric characters in titles. Use the file name as internal document id to reference in [the appropriate sidebars file](#sidebar-navigation).
- Sub categories have to be placed in their own sub directories. Example: Guides/Update Guide can be found in `docs/guides/update-guide`.

## Instances: Docs vs Optimize vs Interactive API Explorers

Due to a difference in version numbers, the documentation is split into [multiple Docusaurus "instances"](https://docusaurus.io/docs/docs-multi-instance):

- Optimize documentation lives in the `optimize` instance.
- Each API with an interactive explorer based on an OpenAPI spec lives in its own instance.
- The remaining documentation lives in the main `docs` instance.

## Versions

[The Optimize and Docs instances of the documentation](#instances-docs-vs-optimize-vs-interactive-api-explorers) each contain documentation for multiple versions:

| Instance   | Version(s)               | Source path                                                         |
| ---------- | ------------------------ | ------------------------------------------------------------------- |
| `docs`     | Next                     | [/docs/](../docs/)                                                  |
| `docs`     | 8.1, 8.0, 1.3, ...       | [/versioned_docs/version-\*/](../versioned_docs/)                   |
| `optimize` | Next                     | [/optimize/](../optimize/)                                          |
| `optimize` | 3.9.0, 3.8.0, 3.7.0, ... | [/optimize_versioned_docs/version-\*/](../optimize_versioned_docs/) |

When edits are intended to apply to both the current version _and beyond_, they should be made in both the most recent versioned folder and the "Next" version folder.

### Version alignment

Specific Optimize versions are aligned with Camunda versions as follows:

| Camunda version | Optimize version |
| --------------- | ---------------- |
| 8.1             | 3.9.0            |
| 8.0             | 3.8.0            |
| 1.3             | 3.7.0            |

### Interactive API Explorer versions

The instances associated with an interactive API explorer only contain one version. Each of these instances live in the `/api/` root folder, in a folder named for the API.

## Sidebar navigation

[Sidebar navigation](https://docusaurus.io/docs/sidebar) of the documentation is managed in the sidebars files. [Each instance of the documentation](#instances-docs-vs-optimize) has its own sidebars file:

| Instance   | Version(s)               | Sidebars path                                                                             |
| ---------- | ------------------------ | ----------------------------------------------------------------------------------------- |
| `docs`     | Next                     | [/docs/sidebars.js](../sidebars.js)                                                       |
| `docs`     | 8.1, 8.0, 1.3, ...       | [/versioned_sidebars/version-\*-sidebars.json](../versioned_sidebars/)                    |
| `optimize` | Next                     | [/optimize/sidebars.js](../optimize_sidebars.js)                                          |
| `optimize` | 3.9.0, 3.8.0, 3.7.0, ... | [/optimize_versioned_sidebars/version-\*-sidebars.json/](../optimize_versioned_sidebars/) |

### Sidebar items

The large object in each sidebars file contains two different types of items:

- Items within the same [documentation instance](#instances-docs-vs-optimize) are [linked by the path to the target .md file](https://github.com/camunda/camunda-docs/blob/89993fbc1446c203324f38139ae7eb40e19b14ac/versioned_sidebars/version-8.1-sidebars.json#L5):
  ```json
  "guides/introduction-to-camunda",
  ```
- Items in the opposite [documentation instance](#instances-docs-vs-optimize) are [linked by an object containing the title and URL of the target document](https://github.com/camunda/camunda-docs/blob/89993fbc1446c203324f38139ae7eb40e19b14ac/versioned_sidebars/version-8.1-sidebars.json#L331-L335):
  ```json
  {
    "type": "link",
    "label": "What is Optimize?",
    "href": "/optimize/components/what-is-optimize/"
  },
  ```

> **Note**
> The "next" versions of the docs are JavaScript rather than JSON. As such, [cross-instance sidebar items in these files](https://github.com/camunda/camunda-docs/blob/main/sidebars.js#L266) call a helper function instead of emitting the entire cross-instance object for each item.

### Synchronization of sidebars

Several sections of the sidebar navigation are shared across the Optimize and main sections of the docs: Components, Self-Managed, and APIs & Clients. For these sections, the structure of the sidebars should always match across instances. [When they drift](./versioning.md#sidebar-drift), it appears to the user as differences in the sidebar navigation depending on which page they're viewing.

Any PRs that make a structural change to one of the instance's sidebars file in a shared section should make the same structural change to the other instance's sidebars file. This typically appears as a link to the target .md file in one file, and an object containing the target title and URL in the other file.

> **Note**
> Changes outside of the shared sections do not need to be synchronized to the corresponding Optimize sidebars file.

## Internal links

When linking internally from one document to another, follow these guidelines:

- if the source and target document are within the same instance (i.e. both are in `docs` or both are in `optimize`):
  - Use a relative path to the target markdown file if it is in the same subtree as the source file. [See example](https://github.com/camunda/camunda-docs/blob/930a0c384b48be27d0bc66216015404f67716f61/docs/components/console/introduction-to-console.md?plain=1#L10).
  - Use an absolute path to the target markdown file if it is in a different subtree than the source file. [See example](https://github.com/camunda/camunda-docs/blob/930a0c384b48be27d0bc66216015404f67716f61/docs/apis-tools/community-clients/spring.md?plain=1#L8).
  - Always include the `.md` extension in the path.
- if the source and target document are in different instances (i.e. one is in `docs` and the other is in `optimize`):
  - If the source is in `docs` and the target is in `optimize`, use the `$optimize$` token to prefix the URL. [See example](https://github.com/camunda/camunda-docs/blob/930a0c384b48be27d0bc66216015404f67716f61/docs/guides/setting-up-development-project.md?plain=1#L17).
  - If the source is in `optimize` and the target is in `docs`, use the `$docs$` token to prefix the URL. [See example](https://github.com/camunda/camunda-docs/blob/930a0c384b48be27d0bc66216015404f67716f61/optimize/components/what-is-optimize.md?plain=1#L8).
  - Use the browser-facing _URL_ to the target document, instead of the path to the target's `.md` file.
  - Do not include the `.md` extension on the target path.

## Adding a new documentation page

1. Select the corresponding directory.
2. Add the document id to [the corresponding sidebars file](#sidebar-navigation). [Example](https://github.com/camunda/camunda-docs/blob/main/versioned_sidebars/version-8.1-sidebars.json#L47):
   ```json
   " components/components-overview",
   ```
3. If the doc is [in one of the shared sections](#synchronization-of-sidebars), add a parallel change to [the other instance's corresponding sidebars file](#sidebar-navigation). [Example](https://github.com/camunda/camunda-docs/blob/main/optimize_versioned_sidebars/version-3.9.0-sidebars.json#L3-L7):
   ```json
   {
     "type": "link",
     "label": "Overview Components",
     "href": "/docs/components/"
   },
   ```

## Moving an existing page

1. Identify the page, pages, or directory and relocate it in the file structure.
2. Update [the corresponding sidebars file(s)](#sidebar-navigation) to fit the new location.
3. If the doc is [in one of the shared sections](#synchronization-of-sidebars), update [the opposite instance's corresponding sidebars file(s)](#sidebar-navigation).
4. Add necessary redirect/rewrite rules to the top of `.htaccess`.

See [Redirect rules](#redirect-rules) for information on testing `.htaccess` rules.

## Remove an existing page

1. Identify the page, pages, or directory and delete it in the file structure.
2. Update [the corresponding sidebars file(s)](#sidebar-navigation).
3. If the doc is [in one of the shared sections](#synchronization-of-sidebars), update [the opposite instance's corresponding sidebars file(s)](#sidebar-navigation).
4. Add necessary redirect/rewrite rules to the top of `.htaccess` to redirect users to appropriate relevant content on another page.

See [Redirect rules](#redirect-rules) for information on testing `.htaccess` rules.

## Redirect rules

The `build-docs` workflow of each PR runs a step to verify that all links present in the production sitemap are still valid. If your build fails on a link validation step, it likely means you moved a doc and did not add a redirect rule that matches the original path. See [the Guide to Writing Redirect Rules](moving-content#redirect-rules.md) for information on writing and testing redirect rules.

## Screenshot automation

In an effort to automate screenshots across Camunda 8 documentation, the following teams execute uniform steps when incorporating images and diagrams:

:::note
Given the following procedures, teams will respond to screenshot updates and suggestions from community members by manually adjusting appropriate screenshots.
:::

**Modeler**
Visit the [Modeler screenshot automation repo](https://github.com/camunda/camunda-docs-modeler-screenshots/blob/main/README.md) for details on updating screenshots and scripting new screenshots.

**Zeebe**
Currently, Zeebe diagrams are stored as BPMN in a [repository](https://github.com/camunda/camunda-docs/tree/main/media-src/product-manuals/zeebe), and as diagrams within Google Drive. This Google Drive is organized according to the structure of documentation in `camunda-docs`.

:::note
When saving diagrams, we should not take manual screenshots. Rather, authors should incorporate diagrams directly via **Download > PNG image (.png)**.
:::

Keep the following guidelines in mind when creating Zeebe diagrams:

- The standardized font is **Arial**. Font size may vary based on diagram size.
- The standardized colors for diagrams are **`#0d8dba`** and **orange** with the default background color of **white**.
- Rectangular diagrams should be around **500x1200px**, and square diagrams should be around **500x500px**.
- There should be no more than **nine** elements per diagram. Otherwise, complex processes may be broken into more than one diagram.

**Operate**

Find [automation code here](https://github.com/camunda/operate/tree/master/client/e2e-playwright/docs-screenshots). These test files must be adjusted to change screenshots.

A new screenshot run can be triggered manually using [GitHub actions](https://github.com/camunda/operate/tree/master/client/e2e-playwright/docs-screenshots).
The screenshots can then be downloaded from the workflow.

**Tasklist**
Tasklist screenshot automation is currently in the backlog.

**Optimize**
Most of the screenshots in the user guide can be updated automatically:

1. Check out the [camunda-optimize](https://github.com/camunda/camunda-optimize) repository.
2. In the `/client` directory of the `camunda-optimize` repository, start the frontend development setup by running `yarn run start-backend` and `yarn start`.
3. Wait for the data to be generated and imported and then run `yarn run screenshots`.

On a technical level, the Optimize team takes screenshots within their [end-to-end test cases](https://github.com/camunda/camunda-optimize/blob/master/client/e2e/tests/Dashboard.js#L33).

## Review Process

After the proposed change is finished open a GitHub PR and assign at least one reviewer, it is good to pick a reviewer who is expert in the matter of the change. If unsure about who to pick choose one of the corresponding team representatives, and they will take care of delegating the issue:

- Console: @ultraschuppi
- Modeler: @camunda/modeling-dev
- Zeebe: @npepinpe
- Operate/Tasklist: @ralfpuchert
- Optimize: @RomanJRW
- Connectors: @camunda/connectors
- Self-Managed/Distribution: @camunda/distribution
- DevEx: @akeller
- Product Management: @felix-mueller
- Documentation: @christinaausley
- Documentation infrastructure: @pepopowitz
- Fallback: @akeller

As a reviewer feel free to merge any PR which you feel comfortable with after your review. If you have questions, concerns, or feel that you are not the right person to review the PR please make this transparent to the PR author so they can clarify this.

[versioned-source]: https://github.com/camunda/camunda-docs/tree/main/versioned_docs
[next-source]: https://github.com/camunda/camunda-docs/tree/main/docs
[versioned-sidebars]: https://github.com/camunda/camunda-docs/tree/main/versioned_sidebars
[next-sidebars]: https://github.com/camunda/camunda-docs/blob/main/sidebars.js
