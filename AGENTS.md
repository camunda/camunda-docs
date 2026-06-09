# Agent instructions for camunda-docs

This file provides instructions for AI agents (Claude Code, OpenAI Codex, and similar tools) working autonomously in this repository.

Read and follow `.github/copilot-instructions.md` and associated instruction files before making any changes.
They are the source of truth for contribution standards. They apply to all AI agents.

## Release documentation: where content belongs

Each minor release has three files under `docs/reference/announcements-release-notes/<version>/`:

| File                         | Purpose                                       | What goes here                                                                                                                                                                                         |
| ---------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<version>-announcements.md` | Advance notice for operators and developers   | Breaking changes, deprecations, removed APIs, supported environment changes (OS, DB, K8s versions). Anything that **requires action before upgrading**.                                                |
| `<version>-release-notes.md` | Chronological record of what shipped and when | Every notable feature, enhancement, and fix, organized by release tag (alpha1, alpha2, GA). New entries go in the section for the release tag where the feature first appeared.                        |
| `whats-new-in-<version>.md`  | Upgrade decision aid and narrative highlights | Selected features that represent significant value or important behavioral change worth calling out to upgraders. Not a complete list — curated highlights only. Cross-references the other two files. |

**Decision guide for a new feature entry:**

- Does it break existing behavior or require upgrade action? → **announcements** (and optionally release notes)
- Did it ship in a specific alpha or GA tag? → **release notes** (always)
- Is it significant enough to influence an upgrade decision? → **what's new** (optional, curated)

Most features belong in **release notes**. Only notable highlights belong in **what's new**. Announcements are reserved for breaking/required-action items.
