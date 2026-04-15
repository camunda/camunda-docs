---
applyTo: "**"
---

**When to use:** All files. Read this before any change to understand repo structure and commit conventions.

## 1. File and repo structure

- Name Markdown files in **kebab-case** matching the page title (for example, `introduction-to-camunda-8.md`). Avoid non-alphanumeric characters in file names.
- Place static images in `static/img/`. Place version-sensitive images in an `img/` subdirectory alongside the doc file.
- Place BPMN files in `static/bpmn/<section>/`.
- The "Next" (unreleased) docs live in `/docs/`. Versioned docs live in `/versioned_docs/version-*/`.
- Sidebar navigation is managed in `sidebars.js` (Next) and `versioned_sidebars/version-*-sidebars.json` (versioned).
- When edits apply to the current version and beyond, make them in both the most recent versioned folder **and** the Next (`/docs/`) folder.
- Add redirect rules to the top of `static/.htaccess` when moving or removing pages.

## 2. Code formatting and commits

- Code formatting is validated by **Prettier**. Run `npm run format` locally before submitting a PR.
- Commit messages must follow the format: `{type}(scope): {description}`.
  - Valid types: `build`, `ci`, `deps`, `docs`, `feat`, `fix`, `perf`, `refactor`, `style`, `test`, `chore`.
  - Keep the commit message header between 72–120 characters.
  - Write the description in present tense (for example, "Add start event to BPMN symbol support matrix").
