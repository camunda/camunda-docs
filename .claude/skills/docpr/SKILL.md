---
name: docpr
description: Use when opening or updating a camunda-docs PR. Covers new-page vs. edit decisions, which versions to update, sidebar registration, backport conventions, and PR checklist. Distinct from the `camunda-docs` skill in camunda/skills, which is about querying docs.camunda.io as a knowledge source.
user-invocable: true
argument-hint: "<brief description of the documentation change>"
---

# /docpr — camunda-docs PR workflow

Guides a docs contribution end-to-end: scoping the change, editing the right version folders, registering sidebars, and opening a PR that passes review.

## 1. New page or edit?

- **Edit an existing page** if the feature already has a doc page. Check `docs/` by file path or title first.
- **Create a new page** only when no existing page covers the topic. New pages require sidebar registration (see section 3). Moved or removed pages require a redirect in `static/.htaccess` (see section 4).

## 2. Which folders to update

Camunda maintains 18 months of minor versions. Active folders in this repo:

| Folder                        | When to update                                    |
| ----------------------------- | ------------------------------------------------- |
| `docs/`                       | Change applies to the **upcoming** (Next) release |
| `versioned_docs/version-8.9/` | Current released version                          |
| `versioned_docs/version-8.8/` | Backport to 8.8                                   |
| `versioned_docs/version-8.7/` | Backport to 8.7                                   |

**Decision rule:**

- Feature not yet released → edit `docs/` only.
- Feature in the current release and beyond → edit `versioned_docs/version-8.9/` **and** `docs/`.
- Bug fix or clarification to an already-released version → edit the affected `versioned_docs/version-*/` folder(s) and, if still relevant, `docs/`.

Doc IDs can differ across versions — the same page may have been renamed when a section was restructured. Verify the actual filename in each version folder before copying content or links.

## 3. Sidebar registration (new pages only)

Adding a page requires a sidebar entry in every version where it exists:

- **Next (`docs/`)** — add the doc ID to `sidebars.js`
- **Versioned** — add the doc ID to `versioned_sidebars/version-<N>-sidebars.json`

The doc ID is the file path relative to its docs root, without the `.md` extension. For example, a file at `docs/components/modeler/bpmn/tasks/user-task.md` has the doc ID `components/modeler/bpmn/tasks/user-task`.

Navbar entries with `type: "doc"` in `docusaurus.config.js` resolve the same doc ID across every version, including Next. If a new page is linked from the navbar, confirm the doc ID exists in every version or the build will fail.

## 4. Redirects (moves and removes only)

Add a redirect rule to the **top** of `static/.htaccess` when moving or deleting a page. Point to the most relevant existing page so users aren't left at a 404.

## 5. Validation

Run before committing:

```bash
npm run format         # Always — fixes Prettier issues
npm run build          # When adding/moving/removing pages, editing sidebars,
                       # changing link targets, touching docusaurus.config.js or static/.htaccess
```

Skip `npm run build` for small content edits that don't affect page structure or links — it is slow.

## 6. PR checklist

1. Branch off `main`: `git checkout -b <branch-name> main`
2. Fill in the PR description using the template at `.github/pull_request_template.md`. Edit only the **Description** section unless explicitly asked to change other sections.
3. Open the PR as a **draft** while actively working. Remove draft status only when ready for review.
4. Apply labels to communicate component, version, and priority. PRs without labels may be triaged slowly.
5. Add the **`deploy` label** for large or complex changes to trigger a preview at `https://preview.docs.camunda.cloud/pr-<N>/`.
6. Add `@camunda/tech-writers` as reviewer for grammar and style, unless you are working with an embedded writer.

## 7. Commit messages

Format: `{type}(scope): {description}` — header between 72 and 120 characters.

Valid types: `docs`, `fix`, `feat`, `chore`, `refactor`, `style`.

Examples:

- `docs(connectors): add REST connector polling configuration guide`
- `fix(operate): correct filter description for process instance variables`
