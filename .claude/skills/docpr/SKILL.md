---
name: docpr
description: Use when opening or updating a camunda-docs PR. Covers new-page vs. edit decisions and which versions to update. Distinct from the `camunda-docs` skill in camunda/skills, which is about querying docs.camunda.io as a knowledge source.
user-invocable: true
argument-hint: "<brief description of the documentation change>"
---

# /docpr — camunda-docs PR workflow

For sidebar registration, redirects, validation commands, PR workflow, and commit conventions, follow `repo.instructions.md` (§2–§6). This skill covers the two decisions that come before those steps.

## 1. New page or edit?

- **Edit an existing page** if the feature already has a doc page. Check `docs/` by file path or title first.
- **Create a new page** only when no existing page covers the topic.

## 2. Which versions to update

Check `src/versions.js` (`currentVersion`) and `versions.json` for the live version list. The table below reflects the current state but will go stale when a new version ships.

| Folder                        | When to update                                    |
| ----------------------------- | ------------------------------------------------- |
| `docs/`                       | Change applies to the **upcoming** (Next) release |
| `versioned_docs/version-8.9/` | Current released version                          |
| `versioned_docs/version-8.8/` | Previous version                                  |
| `versioned_docs/version-8.7/` | Previous version                                  |

**Decision rule:**

- Feature not yet released → edit `docs/` only.
- Feature in the current release and beyond → edit the most recent `versioned_docs/version-*/` folder **and** `docs/`.
- Bug fix or clarification to an already-released version → edit the affected `versioned_docs/version-*/` folder(s) and, if still relevant, `docs/`. To apply the same fix to multiple older versions, use `/backport`.

Doc IDs can differ across versions — the same page may have been renamed when a section was restructured. Verify the actual filename in each version folder before copying content or links.
