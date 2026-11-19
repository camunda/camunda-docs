# Feature folder structure template

> **Status: draft proposal.** Every new feature gets the same folder tree, so readers, writers, and AI agents can predict where content lives.

## Principles

- **One folder per feature.** The folder name is the feature name in kebab-case.
- **One landing page per feature**, named after the folder, as the sidebar category link.
- **Subfolders map to Diátaxis types**: `get-started/`, `concepts/`, `how-to/`, `reference/`. Omit a folder if it would be empty. Do not create folders with a single page unless more are planned.
- **One page, one type**, named by the title pattern in the [framework](../README.md#1-content-types-diátaxis-adapted).
- **Co-located assets**: images and diagrams live in `img/` beside the pages that use them (see the [repo instructions](../../../.github/instructions/repo.instructions.md)).
- **Reusable snippets** live in `react-components/` with a leading underscore (for example, `_prerequisites.md`).
- **Kebab-case file names** that match the page title.

## Tree

```text
docs/<area>/<feature>/
├── <feature>.md                         # Landing page (landing-page.md template)
├── get-started/
│   └── get-started-<feature>.md         # Tutorial (tutorial.md template)
├── concepts/
│   ├── what-is-<feature>.md             # Concept: what it is, why, how it works
│   └── <feature>-architecture.md        # Concept: optional, deeper mechanics
├── how-to/
│   ├── install-<feature>.md             # How-to: install or enable (if applicable)
│   ├── configure-<feature>.md           # How-to: configure
│   ├── <verb>-<object>.md               # How-to: one file per user task
│   └── troubleshoot-<feature>.md        # How-to: diagnose and fix common problems
├── reference/
│   └── <feature>-reference.md           # Reference: properties, options, limits
├── img/                                 # Screenshots and diagrams
└── react-components/                    # Reusable snippets (_name.md, _name.jsx)
```

## Page inventory (minimum viable feature docs)

| Page                                   | Type         | Required?                                         | Notes                                   |
| -------------------------------------- | ------------ | ------------------------------------------------- | --------------------------------------- |
| `<feature>.md`                         | Landing page | Yes                                               | Entry point and sidebar category link   |
| `concepts/what-is-<feature>.md`        | Concept      | Yes                                               | Shared definition. Link from everywhere |
| `get-started/get-started-<feature>.md` | Tutorial     | Recommended                                       | Skip only if the feature is trivial     |
| `how-to/<verb>-<object>.md`            | How-to       | Yes                                               | At least one per primary user goal      |
| `reference/<feature>-reference.md`     | Reference    | If the feature has options, limits, or properties |                                         |

## Sidebar mapping

Mirror the folders in `sidebars.js` (and the versioned sidebars when releasing):

```js
{
  type: "category",
  label: "<Feature>",
  link: { type: "doc", id: "<area>/<feature>/<feature>" },
  items: [
    "<area>/<feature>/get-started/get-started-<feature>",
    {
      type: "category",
      label: "Concepts",
      items: ["<area>/<feature>/concepts/what-is-<feature>"],
    },
    {
      type: "category",
      label: "How-to guides",
      items: ["<area>/<feature>/how-to/configure-<feature>"],
    },
    {
      type: "category",
      label: "Reference",
      items: ["<area>/<feature>/reference/<feature>-reference"],
    },
  ],
}
```

## Applying to existing features

Do not restructure existing features as part of adopting templates. When an existing feature is next substantially edited:

1. Classify each page by type using the [decision guide](../README.md#which-type-is-my-page).
2. Split mixed-type pages.
3. Move pages into the tree and add [redirects](../../../.github/instructions/repo.instructions.md) to `static/.htaccess`.

## Example: mapping the agentic orchestration docs

Current content is a flat folder. Under this proposal it would map as follows (illustrative only):

| Current page                        | Proposed location                                    | Type      |
| ----------------------------------- | ---------------------------------------------------- | --------- |
| `agentic-orchestration-overview.md` | `concepts/what-is-agentic-orchestration.md`          | Concept   |
| `ai-agents.md`                      | `concepts/ai-agents.md`                              | Concept   |
| `build-agents.md`                   | `how-to/build-ai-agents.md`                          | How-to    |
| `add-tool-to-ai-agent.md`           | `how-to/add-tool-to-ai-agent.md`                     | How-to    |
| `model-recommendations-agentic.md`  | `reference/model-recommendations.md`                 | Reference |
| `agent-states-and-metrics.md`       | `reference/agent-states-and-metrics.md` (or concept) | Reference |
