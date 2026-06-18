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

Follow the "Which folders to edit" rules in `repo.instructions.md` §6. Backporting is the PR author's decision — do not backport unless explicitly asked. If asked, use `/backport`.
