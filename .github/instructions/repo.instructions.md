---
applyTo: "**"
---

**When to use:** All files. Read this before any change to understand repo structure, PR workflow, and commit conventions. The full guidelines live at `/howtos/documentation-guidelines.md`.

## 1. File and repo structure

- Name Markdown files in **kebab-case** matching the page title (for example, `introduction-to-camunda-8.md`). Avoid non-alphanumeric characters in file names.
- Place static images in `static/img/`. Place version-sensitive images in an `img/` subdirectory alongside the doc file.
- Place BPMN files in `static/bpmn/<section>/`.
- The "Next" (unreleased) docs live in `/docs/`. Versioned docs live in `/versioned_docs/version-*/`.
- Sidebar navigation is managed in `sidebars.js` (Next) and `versioned_sidebars/version-*-sidebars.json` (versioned).
- When edits apply to the current version and beyond, make them in both the most recent versioned folder **and** the Next (`/docs/`) folder.

## 2. Adding, moving, or removing pages

- **Adding a page**: add the document ID to the corresponding sidebars file.
- **Moving a page**: update the sidebar file(s) to reflect the new location, then add a redirect rule to the **top** of `static/.htaccess`.
- **Removing a page**: remove it from the sidebar file(s) and add a redirect rule to the top of `static/.htaccess` pointing users to relevant content.

## 3. PR workflow

All changes must be done in a separate branch with a PR. See `/howtos/documentation-guidelines.md` for the full process.

- Keep the PR in **draft** while actively working on it. Removing draft status signals it is ready for review.
- Use **labels** to communicate the component, version, and priority. PRs without labels may be triaged slowly.
- Add the **`deploy` label** to trigger a preview site deployment — recommended for large or complex changes.
- A separate issue is not required if you know exactly what change needs to be made.

## 4. Review process

Most PRs require two reviews: a **technical writing review** and a **review from the relevant engineering team**. Assign reviewers based on the PR template, or tag `@camunda/tech-writers` for writing review. See the full reviewer/DRI list in `/howtos/documentation-guidelines.md#review-process`.

## 5. Code formatting and commits

- Code formatting is validated by **Prettier**. Run `npm run format` locally before submitting a PR.
- Commit messages must follow the format: `{type}(scope): {description}`.
  - Valid types: `build`, `ci`, `deps`, `docs`, `feat`, `fix`, `perf`, `refactor`, `style`, `test`, `chore`.
  - Keep the commit message header between 72–120 characters.
  - Write the description in present tense (for example, "Add start event to BPMN symbol support matrix").

