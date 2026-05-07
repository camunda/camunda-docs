---
applyTo: "**"
---

**When to use:** All files. Read this before any change to understand repo structure, PR workflow, and commit conventions. Read the full guidelines at `/howtos/documentation-guidelines.md`.

## 1. File and repo structure

This is a **Docusaurus 3** documentation site for **Camunda 8**, published at https://docs.camunda.io.

To determine the exact Docusaurus version used by this site, check the `@docusaurus/core` dependency in the repo's `package.json`.

| Path                        | Contents                                                            |
| --------------------------- | ------------------------------------------------------------------- |
| `docs/`                     | "Next" (unreleased) documentation                                   |
| `versioned_docs/version-*/` | Versioned documentation snapshots                                   |
| `static/`                   | Static assets served at site root (images, BPMN files, `.htaccess`) |
| `sidebars.js`               | Sidebar navigation for "Next" docs                                  |
| `versioned_sidebars/`       | Sidebar navigation for versioned docs                               |
| `src/`                      | Custom React components, pages, and CSS                             |
| `api/`                      | OpenAPI spec generation scripts                                     |
| `howtos/`                   | Internal contributor guides and style guide                         |

- Name Markdown files in **kebab-case** matching the page title (for example, `introduction-to-camunda-8.md`). Avoid non-alphanumeric characters in file names.
- Place static images in `static/img/`. Place version-sensitive images in an `img/` subdirectory alongside the doc file.
- Place BPMN files in `static/bpmn/<section>/`.
- **Do not** modify `package-lock.json`, generated API docs in `docs/apis-tools/*/specifications/`, or versioned docs unless explicitly asked to.

## 2. Adding, moving, or removing pages

- **Adding a page**: add the document ID to the corresponding sidebars file.
- **Moving a page**: update the sidebar file(s) to reflect the new location, then add a redirect rule to the **top** of `static/.htaccess`.
- **Removing a page**: remove it from the sidebar file(s) and add a redirect rule to the top of `static/.htaccess` pointing users to relevant content.

## 3. PR workflow

- Keep the PR in **draft** while actively working on it. Removing draft status signals it is ready for review.
- Use **labels** to communicate the component, version, and priority. PRs without labels may be triaged slowly.
- Add the **`deploy` label** to trigger a preview site deployment. Recommended for large or complex changes.

## 4. Code formatting and commits

- Code formatting is validated by **Prettier**. Run `npm run format` locally before submitting a PR.
- Commit messages must follow the format: `{type}(scope): {description}`.
  - Valid types: `build`, `ci`, `deps`, `docs`, `feat`, `fix`, `perf`, `refactor`, `style`, `test`, `chore`.
  - Keep the commit message header between 72–120 characters.
  - Write the description in present tense (for example, "Add start event to BPMN symbol support matrix").

## 5. Build and validation

These are the main commands for working with the repo:

- `npm install`: Install dependencies.
- `npm run start`: Start local dev server.
- `npm run build`: Generate a static build.
- `npm run format`: Validate Prettier formatting.

- Always run `npm run build` before submitting changes to catch broken links, invalid Markdown, and build errors.
- **Do not** run `npm run build` speculatively during exploration. It is slow. Use it only to validate final changes.

## 6. Versioning

- The "Next" (unreleased) docs live in `/docs/`. Versioned docs live in `/versioned_docs/version-*/`.
- Sidebar navigation is managed in `sidebars.js` (Next) and `versioned_sidebars/version-*-sidebars.json` (versioned).
- When edits apply to the current version and beyond, make them in both the most recent versioned folder **and** the Next (`/docs/`) folder.
