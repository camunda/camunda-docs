# Documentation Guidelines

## PRs for every change

All changes must be done in a separate branch. As soon as the changes are done please open a PR. A Github Action runs with every commit to a branch and checks if the documentation can be built (including a broken links check).

PRs should be in draft status while being actively worked or have a clear written status in the description or comment. Removing a PR from draft status indicates that it is ready for review (by a technical writer).

## Labels

PRs should be labeled to help the Documentation Team quickly triage, review, and merge PRs according to urgency and priority.

Labels include identifiers for teams/components, minor and alpha releases, support engagements, etc. When opening a PR or issue, do your best to use labels that communicate the component, version, and or priority.

PRs can be labeled “hold” for any reason, including ongoing conversations, coordination across teams or departments, or anything that’s not obvious within the discussion or description of the PR.

PRs and issues without labels may be at risk for slow triage.

### Preview site label - `deploy`

Adding a `deploy` label to a PR will trigger its deployment to a preview site, which will be linked in the PR description. We recommend using the `deploy` label for large or complex docs changes.

## Not all PRs require an issue

In the spirit of "Always Progress," if you are confident you know what change needs to be made, a separate issue on the topic is not required. However, if you have an idea that needs to go into the backlog, creating an issue instead of a PR is the best way to go.

## Structure

- Name markdown files according to the title. This makes it easier to find a file. Example: **Introduction to Camunda 8** --> `introduction-to-camunda-8.md`. Avoid non-alphanumeric characters in titles. Use the file name as an internal document ID to reference in [the appropriate sidebars file](#sidebar-navigation).
- Subcategories have to be placed in their own sub-directories. Example: `Guides` > `Get started with Spring` can be found in `/guides/getting-started-java-spring.md`.

## Versions

Different versions are sourced from different paths:

| Instance | Version(s)         | Source path                                       |
| -------- | ------------------ | ------------------------------------------------- |
| `docs`   | Next               | [/docs/](../docs/)                                |
| `docs`   | 8.7, 8.6, 8.5, ... | [/versioned_docs/version-\*/](../versioned_docs/) |

When edits are intended to apply to both the current version _and beyond_, they should be made in both the most recent versioned folder and the "Next" version folder.

### Interactive API Explorer versions

There is a separate source spec for each version of each API Explorer. Each API's source spec lives in the `/api/` root folder, in a folder named for the API. Next versions of the spec live in the root of that folder; older versions of the spec live in child folders named by version number.

## Sidebar navigation

[Sidebar navigation](https://docusaurus.io/docs/sidebar) of the documentation is managed in the sidebars files. [Each version of the documentation](#versions) has its own sidebars file:

| Instance | Version(s)         | Sidebars path                                                          |
| -------- | ------------------ | ---------------------------------------------------------------------- |
| `docs`   | Next               | [/docs/sidebars.js](../sidebars.js)                                    |
| `docs`   | 8.7, 8.6, 8.5, ... | [/versioned_sidebars/version-\*-sidebars.json](../versioned_sidebars/) |

### Sidebar file type

JavaScript is a better format for a sidebars file, because it allows us to import sub-trees from a file defined somewhere else; however Docusaurus only supports a JSON sidebars file for the "next" version of the docs. Numbered versions of the docs are required to be JSON rather than JavaScript.

As such, when a new version is cut, it results in unused sidebar sub-tree `.js` files scattered throughout the codebase. Be aware that these exist, to avoid attempting to change a sidebars file that has no effect.

## Internal links

When linking internally from one document to another, follow these guidelines:

- Always include the `.md` extension in the path.
- Use a relative path to the target markdown file if it is in the same subtree as the source file. [See example](https://github.com/camunda/camunda-docs/blob/930a0c384b48be27d0bc66216015404f67716f61/docs/components/console/introduction-to-console.md?plain=1#L10).
- Use an absolute path to the target markdown file if it is in a different subtree than the source file. [See example](https://github.com/camunda/camunda-docs/blob/930a0c384b48be27d0bc66216015404f67716f61/docs/apis-clients/community-clients/spring.md?plain=1#L8).
  - Refrain from using `/docs/<version>` when using an absolute path. See note below.

> [!NOTE]
> If you add/edit a link that goes to `docs/path/file.md`, and you see the error `[all.markdownLinksDontCrossVersions] Exclude the docs/ prefix in markdown links, unless you intend to link only to vNext. Consider using [...](/path/file.md) instead of [...](docs/path/file.md).` ([example](https://github.com/camunda/camunda-docs/pull/5606#discussion_r2052977180)), you have two options:
>
> 1. Consider using `[...](/path/file.md)` instead of `[...](docs/path/file.md)`. For example, `/components/components-overview.md` rather than `/docs/components/components-overview.md`. The latter will force Docusaurus to link to the _vNext_ documentation, instead of the current version.
> 2. If you're linking to vNext on purpose, just ignore the linting error. It won't prevent a green PR.

## Adding a new documentation page

1. Select the corresponding directory.
2. Add the document id to [the corresponding sidebars file](#sidebar-navigation). [Example](https://github.com/camunda/camunda-docs/blob/main/versioned_sidebars/version-8.1-sidebars.json#L47):
   ```json
   " components/components-overview",
   ```

## Moving an existing page

1. Identify the page, pages, or directory and relocate it in the file structure.
2. Update [the corresponding sidebars file(s)](#sidebar-navigation) to fit the new location.
3. Add necessary redirect/rewrite rules to the top of `.htaccess`.

See [Redirect rules](#redirect-rules) for information on testing `.htaccess` rules.

## Remove an existing page

1. Identify the page, pages, or directory and delete it in the file structure.
2. Update [the corresponding sidebars file(s)](#sidebar-navigation).
3. Add necessary redirect/rewrite rules to the top of `.htaccess` to redirect users to appropriate relevant content on another page.

See [Redirect rules](#redirect-rules) for information on testing `.htaccess` rules.

## Redirect rules

The `build-docs` workflow of each PR runs a step to verify that all links present in the production sitemap are still valid. If your build fails on a link validation step, it likely means you moved a doc and did not add a redirect rule that matches the original path. See [the Guide to Writing Redirect Rules](moving-content.md#redirect-rules) for information on writing and testing redirect rules.

## BPMN files

When adding BPMN files, place these files in the `static/bpmn` folder and reference them in your documentation appropriately. If a dedicated folder does not yet exist in the `static/bpmn` folder for the section of documentation you want to add BPMN files to, create one.

For example, a BPMN diagram in the **APIs & tools** section is placed in `static/bpmn/apis-tools` and referenced in the documentation as `/bpmn/apis-tools/gettingstarted_quickstart_advanced.bpmn`.

## Screenshot automation

In an effort to automate screenshots across Camunda 8 documentation, the following teams execute uniform steps when incorporating images and diagrams:

:::note
Given the following procedures, teams will respond to screenshot updates and suggestions from community members by manually adjusting appropriate screenshots.
:::

:::note
When generating screenshots, remove any personal identifiable information. If a username must be included, ensure this is "My organization".
:::

**Modeler**
Visit the [Modeler screenshot automation repo](https://github.com/camunda/camunda-docs-modeler-screenshots/blob/main/README.md) for details on updating screenshots and scripting new screenshots.

**Zeebe**
Currently, Zeebe diagrams are stored as BPMN in a [repository](https://github.com/camunda/camunda-docs/tree/main/media-src/product-manuals/zeebe), and as diagrams within Google Drive. This Google Drive is organized according to the structure of documentation in `camunda-docs`.

:::note
When saving diagrams, do not take manual screenshots. Rather, incorporate diagrams directly by clicking **Download > PNG image (.png)**.
:::

Keep the following guidelines in mind when creating Zeebe diagrams:

- The standardized font is **Arial**. Font size may vary based on diagram size.
- The standardized colors for diagrams are **`#0d8dba`** and **orange** with the default background color of **white**.
- Rectangular diagrams should be around **500x1200px**, and square diagrams should be around **500x500px**.
- There should be no more than **nine** elements per diagram. Otherwise, complex processes may be broken into more than one diagram.

**Operate**

Find [automation code here](https://github.com/camunda/camunda/tree/main/operate/client/e2e-playwright/docs-screenshots). These test files must be adjusted to change screenshots.

A new screenshot run can be triggered manually using [GitHub actions](https://github.com/camunda/camunda/tree/main/operate/client/e2e-playwright/docs-screenshots).
The screenshots can then be downloaded from the workflow.

**Tasklist**
Tasklist screenshot automation is currently in the backlog.

**Optimize**
Most of the screenshots in the user guide can be updated automatically:

1. Check out the [camunda-optimize](https://github.com/camunda/camunda-optimize) repository.
2. In the `/client` directory of the `camunda-optimize` repository, start the frontend development setup by running `yarn run start-backend` and `yarn start`.
3. Wait for the data to be generated and imported and then run `yarn run screenshots`.

On a technical level, the Optimize team takes screenshots within their [end-to-end test cases](https://github.com/camunda/camunda-optimize/blob/master/client/e2e/tests/Dashboard.js#L33).

## Review process

After the proposed change is finished, open a GitHub PR and assign reviewers based on your PR template. Most PRs require a technical writing review and a review from the relevant engineering team.

If unsure about who to pick, choose one of the corresponding team representatives, and they will take care of delegating the issue:

- Console: @ultraschuppi
- Desktop Modeler: @camunda/modeling-dev
- Web Modeler: @marcosbarbero @wollefitz
- Zeebe: @npepinpe
- Operate: @ThorbenLindhauer
- Tasklist: @camunda/human-task-orchestration
- Optimize: @RomanJRW
- Connectors: @camunda/connectors
- Self-Managed/Distribution: @camunda/distribution
- InfEx: @camunda/infrastructure-experience
- Identity: @kevinCamunda
- Product Management:
  - Core Orchestration and Core Platform topics: @felix-mueller
  - Task Automation: @crobbins215
  - Business Application Integration: @toco-cam
  - Embedded Intelligence, Onboarding and Migration: @bastiankoerber
  - Fallback: @bastiankoerber
- Documentation: @camunda/tech-writers
- Fallback: @MaxTru

As a reviewer, feel free to merge any PR you feel comfortable with after your review. If you have questions or concerns or feel that you are not the right person to review the PR, please make this transparent to the PR author so they can clarify.

[versioned-source]: https://github.com/camunda/camunda-docs/tree/main/versioned_docs
[next-source]: https://github.com/camunda/camunda-docs/tree/main/docs
[versioned-sidebars]: https://github.com/camunda/camunda-docs/tree/main/versioned_sidebars
[next-sidebars]: https://github.com/camunda/camunda-docs/blob/main/sidebars.js
