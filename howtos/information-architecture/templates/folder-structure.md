# Feature folder structure template

> **Status: draft proposal.** Every new feature gets the same folder tree, so readers, writers, and AI agents can predict where content lives.

## Principles

- **One folder per feature.** The folder name is the feature name in kebab-case.
- **One landing page per feature**, named after the folder, as the sidebar category link.
- **About is a folder** with its own landing page. It holds the concept pages.
- **How-tos are not a folder.** How-to pages sit in the feature folder and are grouped as "How-tos" in the sidebar.
- **Reference is a folder** for reference pages. There is no reference page template.
- **Optional Get started page** at the root of the feature folder. Write it with the how-to guide template.
- Omit a folder if it would be empty. Do not create folders with a single page unless more are planned.
- **One page, one type**, named by the title pattern in the [framework](../README.md#1-content-types-diátaxis-adapted).
- **Co-located assets**: images and diagrams live in `img/` beside the pages that use them (see the [repo instructions](../../../.github/instructions/repo.instructions.md)).
- **Reusable snippets** live in `react-components/` with a leading underscore (for example, `_prerequisites.md`).
- **Kebab-case file names** that match the page title.

## Tree

```text
docs/<area>/<feature>/
├── <feature>.md                         # Landing page (landing-page.md template)
├── get-started-with-<feature>.md        # Get started, optional (how-to-guide.md template)
├── about/                               # About: a folder with its own landing page
│   ├── about-<feature>.md               # About landing page
│   ├── <concept-name>.md                # Concept (concept.md template)
│   └── <concept-name>.md                # One page per concept
├── install-<feature>.md                 # How-to: install or enable (if applicable)
├── configure-<feature>.md               # How-to: configure
├── <verb>-<object>.md                   # How-to: one file per user task
├── troubleshoot-<feature>.md            # How-to: diagnose and fix common problems
├── reference/                           # Reference pages, no template
│   └── <name>.md                        # Properties, options, limits
├── img/                                 # Screenshots and diagrams
└── react-components/                    # Reusable snippets (_name.md, _name.jsx)
```

## Page inventory (minimum viable feature docs)

| Page                       | Type         | Template     | Required?                                         | Notes                                     |
| -------------------------- | ------------ | ------------ | ------------------------------------------------- | ----------------------------------------- |
| `<feature>.md`             | Landing page | landing-page | Yes                                               | Entry point and sidebar category link     |
| `about/about-<feature>.md` | Landing page | landing-page | Yes, if the feature has concept pages             | Landing page of the About folder          |
| `about/<concept-name>.md`  | Concept      | concept      | At least one                                      | Shared definition. Link from everywhere   |
| `get-started-with-*.md`    | How-to       | how-to-guide | Optional                                          | Skip if the feature is trivial            |
| `<verb>-<object>.md`       | How-to       | how-to-guide | Yes                                               | At least one per primary user goal        |
| `reference/<name>.md`      | Reference    | None         | If the feature has options, limits, or properties | Follows the reference rules in the README |

## Sidebar mapping

Mirror the structure in `sidebars.js` (and the versioned sidebars when releasing):

```js
{
  type: "category",
  label: "<Feature>",
  link: { type: "doc", id: "<area>/<feature>/<feature>" },
  items: [
    "<area>/<feature>/get-started-with-<feature>",
    {
      type: "category",
      label: "About",
      link: { type: "doc", id: "<area>/<feature>/about/about-<feature>" },
      items: ["<area>/<feature>/about/<concept-name>"],
    },
    {
      type: "category",
      label: "How-tos",
      items: [
        "<area>/<feature>/install-<feature>",
        "<area>/<feature>/configure-<feature>",
        "<area>/<feature>/troubleshoot-<feature>",
      ],
    },
    {
      type: "category",
      label: "Reference",
      items: ["<area>/<feature>/reference/<name>"],
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

| Current page                        | Proposed location                                     | Type      |
| ----------------------------------- | ----------------------------------------------------- | --------- |
| `agentic-orchestration-overview.md` | `about/about-agentic-orchestration.md`                | Landing   |
| `ai-agents.md`                      | `about/ai-agents.md`                                  | Concept   |
| `build-agents.md`                   | `build-ai-agents.md`                                  | How-to    |
| `add-tool-to-ai-agent.md`           | `add-tool-to-ai-agent.md`                             | How-to    |
| `model-recommendations-agentic.md`  | `reference/model-recommendations.md`                  | Reference |
| `agent-states-and-metrics.md`       | `reference/agent-states-and-metrics.md` (or `about/`) | Reference |
