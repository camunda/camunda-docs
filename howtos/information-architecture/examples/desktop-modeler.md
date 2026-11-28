# Worked example: Desktop Modeler

> **Status: draft exercise.** Applies the [framework](../README.md) and [templates](../templates/) to the [Desktop Modeler docs](https://docs.camunda.io/docs/next/components/modeler/desktop-modeler/) (`docs/components/modeler/desktop-modeler/`) to test whether the templates hold up on real content. No docs are moved or edited. This is a proposal to react to.

## Summary of findings

- The section has **12 top-level pages and 9 nested pages** (element templates, additional configuration, settings). Content is generally good, but page types are **mixed or ambiguous** and the sidebar is organized by an ad hoc order, not by what the reader wants to do.
- **No concept pages exist.** The only explanation of what Desktop Modeler is lives in the landing page (`index.md`), which also carries features, download, and getting started.
- **Tutorial, how-to, and reference content are interleaved.** For example, `utilize-forms` is a tutorial with a time estimate and a how-to, and `projects` is a concept plus a how-to plus an example.
- **The first-run path is split across five pages** (install, model, connect, deploy, start instance), each ending with an informal `:::note` next step. This is one tutorial in disguise.
- **Reference content is scattered** (flags, settings, search paths, telemetry, plugin API) and not labeled as reference.
- Front matter is inconsistent: some pages lack `id`, `sidebar_label`, or `keywords`.

## Page-by-page classification

| Current page                                    | Current title                   | Detected type                | Issue                                                                                                                       | Proposed type and location                                                                                       |
| ----------------------------------------------- | ------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `index.md`                                      | Desktop Modeler                 | Landing + concept + download | Mixes four jobs                                                                                                             | **Landing page** `desktop-modeler.md`, plus **concept** `concepts/what-is-desktop-modeler.md`                    |
| `install-the-modeler.md`                        | Install Desktop Modeler         | How-to                       | Broken tab markup (the Linux `TabItem` is outside `Tabs`); platform steps are interleaved in one list                       | **How-to** `how-to/install-desktop-modeler.md`                                                                   |
| `model-your-first-diagram.md`                   | Model your first diagram        | Tutorial                     | Numbering is all `1.`; images are not indented under steps; links to unrelated guides mid-steps; no prerequisites or result | **Tutorial** `get-started/get-started-desktop-modeler.md` (merged, see below)                                    |
| `connect-to-camunda-8.md`                       | Connect to Camunda 8            | How-to                       | Self-Managed handled by link-out; next step as a `:::note`                                                                  | **How-to** `how-to/connect-to-camunda.md`                                                                        |
| `deploy-diagram.md`                             | Deploy a diagram                | How-to                       | Very short; duplicates the tutorial path                                                                                    | **How-to** `how-to/deploy-a-diagram.md` and tutorial steps                                                       |
| `start-instance.md`                             | Start a new process instance    | How-to                       | No intro; no verify step                                                                                                    | **How-to** `how-to/start-a-process-instance.md` and tutorial steps                                               |
| `projects.md`                                   | Projects                        | Concept + how-to             | Explains projects, gives a Java example, then shows how to deploy and run                                                   | Split: **concept** `concepts/projects.md`, **how-to** `how-to/work-with-projects.md`                             |
| `utilize-forms.md`                              | Utilize forms                   | Tutorial                     | "Utilize" is not a verb pattern; has `About` and `Quickstart` instead of the tutorial structure; badges for level and time  | **Tutorial** `get-started/build-your-first-form.md` (or how-to `how-to/create-and-link-a-form.md`)               |
| `use-connectors.md`                             | Use connectors                  | How-to + concept             | Explains fetching behavior and shows how to disable                                                                         | **How-to** `how-to/use-connectors.md`; behavior details to `concepts/connector-template-fetching.md`             |
| `credentials.md`                                | Use credentials                 | How-to + reference           | Contains a permission matrix table                                                                                          | **How-to** `how-to/use-credentials.md`; table to `reference/credential-chooser-reference.md`                     |
| `task-testing.md`                               | Task testing                    | How-to                       | Starts with a link to itself (`../task-testing.md`); prerequisites are good                                                 | **How-to** `how-to/test-a-task.md`                                                                               |
| `element-templates/using-templates.md`          | Using templates                 | How-to                       | Title is a noun phrase                                                                                                      | **How-to** `how-to/use-element-templates.md`                                                                     |
| `element-templates/configuring-templates.md`    | Configuring templates           | How-to + reference           | Search paths plus remote sources                                                                                            | **How-to** `how-to/configure-element-template-sources.md`                                                        |
| `element-templates/hosting-template-sources.md` | Host an element template source | How-to + concept             | Explains loading and caching                                                                                                | **How-to** `how-to/host-an-element-template-source.md`; caching to concept                                       |
| `flags/flags.md`                                | Flags                           | Reference + how-to           | Configuration how-to followed by flags table and examples                                                                   | **Reference** `reference/flags-reference.md`; short how-to `how-to/configure-flags.md`                           |
| `settings/settings.md`                          | Settings                        | Reference                    | Fine                                                                                                                        | **Reference** `reference/settings-reference.md`                                                                  |
| `search-paths/search-paths.md`                  | Search paths                    | Reference                    | Fine                                                                                                                        | **Reference** `reference/search-paths-reference.md`                                                              |
| `telemetry/telemetry.md`                        | Telemetry                       | Reference                    | Event catalog                                                                                                               | **Reference** `reference/telemetry-events-reference.md`                                                          |
| `plugins/plugins.md`                            | Plugins                         | Tutorial + reference         | Developer guide in one page                                                                                                 | **How-to** `how-to/develop-a-plugin.md` (extension track)                                                        |
| `custom-lint-rules/custom-lint-rules.md`        | Custom lint rules               | How-to                       | Short and fine                                                                                                              | **How-to** `how-to/add-custom-lint-rules.md`                                                                     |
| `troubleshooting.md`                            | Troubleshooting                 | How-to (FAQ, 19 sections)    | One long page mixing unrelated problems                                                                                     | **How-to** `how-to/troubleshoot-desktop-modeler.md` (split into connection problems and others when next edited) |

## Proposed folder tree

Applies [folder-structure.md](../templates/folder-structure.md), plus one adaptation (see [learnings](#learnings-for-the-templates)).

```text
docs/components/modeler/desktop-modeler/
├── desktop-modeler.md                                  # Landing page
├── get-started-with-desktop-modeler.md                 # Get started: install check, model, connect, deploy, start (merges 4 pages)
├── about/
│   ├── about-desktop-modeler.md                        # About landing page (from index.md)
│   ├── projects.md                                     # Concept (from projects.md)
│   └── connector-template-fetching.md                  # Concept (from use-connectors.md)
├── install-desktop-modeler.md                          # How-tos sit in the feature folder
├── connect-to-camunda.md
├── deploy-a-diagram.md
├── start-a-process-instance.md
├── build-your-first-form.md                            # From utilize-forms
├── work-with-projects.md
├── use-connectors.md
├── use-credentials.md
├── test-a-task.md
├── use-element-templates.md
├── configure-element-template-sources.md
├── host-an-element-template-source.md
├── configure-flags.md
├── add-custom-lint-rules.md
├── develop-a-plugin.md
├── troubleshoot-desktop-modeler.md
├── reference/
│   ├── flags-reference.md
│   ├── settings-reference.md
│   ├── search-paths-reference.md
│   ├── telemetry-events-reference.md
│   └── credential-chooser-reference.md
└── img/
```

Self-Managed connection pages (`docs/self-managed/components/modeler/desktop-modeler/`) stay where they are. The `connect-to-camunda` how-to links to them with a tab for SaaS and Self-Managed, per the how-to template.

## Proposed sidebar

```js
{
  type: "category",
  label: "Desktop Modeler",
  link: { type: "doc", id: "components/modeler/desktop-modeler/desktop-modeler" },
  items: [
    "components/modeler/desktop-modeler/get-started-with-desktop-modeler",
    {
      type: "category",
      label: "About",
      link: { type: "doc", id: "components/modeler/desktop-modeler/about/about-desktop-modeler" },
      items: [
        "components/modeler/desktop-modeler/about/projects",
        "components/modeler/desktop-modeler/about/connector-template-fetching",
      ],
    },
    { type: "category", label: "How-tos", items: [/* the 16 how-to pages above */] },
    { type: "category", label: "Reference", items: [/* the 5 pages above */] },
  ],
}
```

## Draft landing page

Replaces `index.md`. Written from the [landing page template](../templates/landing-page.md). Not saved as a docs file.

```md
---
id: desktop-modeler
title: Desktop Modeler
sidebar_label: Desktop Modeler
description: "Model, validate, deploy, and test BPMN, DMN, and Forms for Camunda 7 and 8 in a desktop application that works alongside your IDE."
keywords: [desktop modeler, camunda modeler, bpmn, dmn, forms]
---

import PageDescription from '@site/src/components/PageDescription';
import AoGrid from '../../react-components/\_ao-card';

<PageDescription />

<span class="badge badge--cloud">Camunda 7 and 8</span>

## About Desktop Modeler

Desktop Modeler (also known as Camunda Modeler) is a desktop application for modeling BPMN, DMN, and Forms. It works with files on your local file system, so you can keep your diagrams next to your code and use your own version control and IDE.

Use it to design executable diagrams, validate them with lint rules, and deploy and test them against a Camunda cluster without leaving the application.

[Learn what Desktop Modeler is](./about/about-desktop-modeler.md)

## Get started

<AoGrid columns={3} ao={[
{
link: "./get-started-with-desktop-modeler/",
title: "Get started with Desktop Modeler",
image: IconPlay,
description: "Model, deploy, and run your first process.",
},
{
link: "./build-your-first-form/",
title: "Build your first form",
image: IconFormsImg,
description: "Design a form and link it to a user task.",
},
]} />

## Learn the fundamentals

<AoGrid columns={3} ao={[
{ link: "./about/projects/", title: "Projects", image: IconProjectsImg, description: "Group BPMN, DMN, forms, and code, and get project-aware editing and deployment." },
{ link: "./about/connector-template-fetching/", title: "Connector template fetching", image: IconConnectorsImg, description: "How Desktop Modeler discovers and caches connector templates." },
]} />

## Build and configure

<AoGrid columns={3} ao={[
{ link: "./install-desktop-modeler/", title: "Install Desktop Modeler", image: IconDownloadImg, description: "Install on Windows, macOS, or Linux." },
{ link: "./connect-to-camunda/", title: "Connect to Camunda", image: IconClusterImg, description: "Connect to SaaS or a Self-Managed cluster." },
{ link: "./test-a-task/", title: "Test a task", image: IconPlay, description: "Run one task without running the whole process." },
{ link: "./use-connectors/", title: "Use connectors", image: IconConnectorsImg, description: "Apply connector templates to tasks." },
{ link: "./use-credentials/", title: "Use credentials", image: IconCredentialsImg, description: "Select or create credentials from the properties panel." },
{ link: "./develop-a-plugin/", title: "Develop a plugin", image: IconCodeImg, description: "Extend the application." },
]} />

## Reference

<AoGrid columns={3} ao={[
{ link: "./reference/flags-reference/", title: "Flags", image: IconDocsImg, description: "Command-line and file-based flags." },
{ link: "./reference/settings-reference/", title: "Settings", image: IconDocsImg, description: "Application settings and settings file." },
{ link: "./reference/search-paths-reference/", title: "Search paths", image: IconDocsImg, description: "Where Desktop Modeler looks for templates and plugins." },
{ link: "./reference/telemetry-events-reference/", title: "Telemetry events", image: IconDocsImg, description: "Events the application can send." },
]} />

## Explore further resources

<p><a href="https://camunda.com/download/modeler/" class="link-arrow" target="_blank">Download Desktop Modeler</a></p>
<p><a href="https://github.com/camunda/camunda-modeler" class="link-arrow" target="_blank">View the source code</a></p>
<p><a href="https://github.com/camunda/camunda-modeler/issues" class="link-arrow" target="_blank">Report an issue</a></p>
```

## Draft: merged Get started page (outline)

Applies the [how-to guide template](../templates/how-to-guide.md). Merges `model-your-first-diagram`, `connect-to-camunda-8`, `deploy-diagram`, and `start-instance`. The existing text is reused, not rewritten.

| Section          | Content                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| About this guide | Audience: developers new to Camunda. Outcome: a BPMN process running on a cluster, in about 15 minutes                                                        |
| Prerequisites    | Desktop Modeler [installed](../../../../docs/components/modeler/desktop-modeler/install-the-modeler.md); a Camunda 8 cluster (SaaS) and an API client         |
| Steps            | 1. Create a BPMN diagram. 2. Add a task and an end event. 3. Save the file. 4. Add a connection (SaaS tab, Self-Managed tab). 5. Deploy. 6. Start an instance |
| Result           | Link to the instance in Operate, and how to verify it ran                                                                                                     |
| Next steps       | Build your first form; Use connectors; Understand projects                                                                                                    |

Content removed from the Get started page and relocated: task and event explanations (link to BPMN concept pages), the Linux install variants (how-to), and the "orchestrate human tasks" cross-link (Next steps).

## Learnings for the templates

1. **Tools versus features.** The folder tree was written for a feature. Desktop Modeler is a product surface with an extension track (plugins, flags, lint rules). It fit by treating extension pages as how-to and reference, with no new folder. If more tool-like areas behave this way, add a short "Applying to a tool or application" note to `folder-structure.md`.
2. **A Get started page often spans multiple existing pages.** The how-to guide template assumes one page. Merging is the main reorganization cost and needs redirects for four URLs. Consider whether a guide with more than about 8 steps needs its own template or a short folder.
3. **Title patterns need a list of exceptions.** Titles like `Flags`, `Settings`, and `Telemetry` are noun phrases that are correct for reference pages. The framework title pattern `<Feature> reference` would rename them, and it is not obvious that renaming gains much. Decide whether the `reference` suffix is required or only recommended.
4. **Prerequisites.** `task-testing` shows a good prerequisites section (version, connection type). The templates should recommend version and connection requirements as the first prerequisite item.
5. **Next steps as notes.** Several pages end with a `:::note` containing one next step. The templates' `## Next steps` section replaces it, and writers need a short rule to convert them.
6. **Permission and behavior tables.** `credentials` has a reference table inside a how-to. Rule of thumb: if a table has more than 5 rows or is looked up after first read, move it to reference.
7. **Versioning cost.** Applying this to a released version requires copying the new tree to each `versioned_docs/` folder and sidebar, and redirects in `static/.htaccess`. Recommend applying new structure to `docs/` (next) only, and do not backport.
8. **Front matter audit.** Add a lint check (or Vale rule) that every page has `id`, `title`, `description`, and that the title matches its type pattern.

## Suggested next steps

- Agree on the open questions in the framework README, using this example as evidence.
- Decide whether to implement the restructure for Desktop Modeler as a follow-up PR (moves, redirects to `static/.htaccess`, sidebar change, merged Get started page).
- Repeat this exercise on a second area (for example, Connectors or Operate) to test whether the tree generalizes.
