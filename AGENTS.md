# Agent instructions for camunda-docs

This file provides instructions for all AI agents (Claude Code, GitHub Copilot, OpenAI Codex, and similar tools) working autonomously in this repository.

## Before editing

Read the relevant files in `.github/instructions/`:

- **`content.instructions.md`** — language and grammar, punctuation, formatting, links, product terminology, and the documentation PR review checklist. Read before any Markdown content change.
- **`repo.instructions.md`** — file and repo structure, PR workflow, build and validation commands, and commit message conventions. Applies to all files.

Do not recursively read the full style guide (`/howtos/technical-writing-styleguide.md`) or contributor guide (`/howtos/documentation-guidelines.md`) unless the task requires details not covered by these instruction files.

## Scope

Prefer the smallest safe change that satisfies the user request.

For documentation-only tasks:

- Edit only the files named in the task, plus any sibling files explicitly required by repo conventions (for example, the corresponding versioned file when editing `/docs/`).
- Do not run broad repository searches unless the target files are unknown.
- Do not run baseline validation before editing.
- Do not run security scans unless the task involves code, dependencies, generated artifacts, or security-sensitive configuration.

## Validation

- Format changed files only (`npx prettier --write <files>`).
- Iterate with `npm run start` (lazy per-page compile; smoke-check touched pages).
- Final validation: run a scoped build listing the versions your change touches:

  ```
  DOCS_BUILD_VERSIONS=next,current DOCS_SKIP_API_REFERENCE=true npm run build
  ```

  `DOCS_BUILD_VERSIONS` selects versions (`next` = unreleased, `current` = current release, or literals like `8.8`); `DOCS_SKIP_API_REFERENCE=true` skips the generated TypeScript API reference and should typically be set for local builds. A full build (no env vars) requires more RAM than typical machines have — do not run it locally; CI owns it.

- Links into skipped versions or the skipped API reference are bypassed (rewritten to `pathname://`); all other broken links still fail the scoped build. Cross-version link strictness is owned by the full build in CI.

- Time-box validation setup to a few minutes; if blocked, report what was skipped and why.
