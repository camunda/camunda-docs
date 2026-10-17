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

For documentation-only changes, prefer lightweight validation first:

- Run formatting only for the changed files if a targeted command is available.
- Run a scoped docs build only after final changes, and only when the build trigger conditions in `repo.instructions.md` apply or the user explicitly asks for a build:

  ```
  DOCS_BUILD_VERSIONS=next,current DOCS_SKIP_GENERATED_REFERENCES=true DOCS_SKIP_LLMS_TXT=true DOCUSAURUS_NO_PERSISTENT_CACHE=true DOCUSAURUS_SSG_WORKER_THREAD_COUNT=4 npm run build
  ```

  List only the versions your change touches. Flags and caveats: `howtos/setup.md` → "Scoped builds". Do not run the full build locally. It needs more memory than typical machines have. CI owns and executes it.

- If full validation is too slow or unavailable, state what validation was skipped and why.

Do not spend more than a few minutes on validation setup for small Markdown-only changes. If validation setup is slow or blocked, make the requested edit and report the limitation.
