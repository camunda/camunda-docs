# SKILLS.md

Catalog of reusable skills — task-shaped operating procedures — that AI agents and contributors can invoke when working in `camunda-docs`. Each skill is a named, self-contained recipe with triggers, inputs, steps, and verification. Skills compose with the rules in `AGENTS.md` and `.github/instructions/`.

This file is intentionally bleeding-edge: it follows the emerging convention of pairing `AGENTS.md` (what the project is) with `SKILLS.md` (what an agent should know how to do).

## Index

- [author-new-page](#skill-author-new-page) — Add a new documentation page to Next and the right sidebar.
- [edit-versioned-page](#skill-edit-versioned-page) — Apply a change to Next and one or more released versions consistently.
- [move-or-rename-page](#skill-move-or-rename-page) — Move or rename a page with redirects.
- [retire-page](#skill-retire-page) — Remove a page and redirect readers to the right replacement.
- [regenerate-api-reference](#skill-regenerate-api-reference) — Refresh OpenAPI-driven reference pages.
- [regenerate-config-reference](#skill-regenerate-config-reference) — Refresh the Camunda Spring Boot starter config reference.
- [add-redirect](#skill-add-redirect) — Add an `.htaccess` redirect at the top of the file.
- [run-link-check](#skill-run-link-check) — Validate internal and external links.
- [verify-build-locally](#skill-verify-build-locally) — Reproduce the production build locally.
- [open-versioned-release-cut](#skill-open-versioned-release-cut) — Steps for cutting a new versioned snapshot.
- [style-pass](#skill-style-pass) — Apply the style guide to a draft.
- [terminology-sweep](#skill-terminology-sweep) — Normalize Camunda product terminology across files.

---

## Skill: author-new-page

**Trigger**: User asks to "add a page", "document a new feature", or "create a new section".

**Inputs**: target section, page title, intended version (Next-only or Next + a release).

**Steps**:

1. Pick the directory under `docs/` (Next) that matches the section. Use kebab-case for the filename and match the page title.
2. Add front matter with `id`, `title`, and `description`. Title in sentence case.
3. Write content following `.github/instructions/content.instructions.md`. Lead with the user goal; place required steps in a numbered list; place optional or reference material in `<details>`.
4. Add the document `id` to `sidebars.js` in the correct position.
5. If the change applies to a released version, repeat in `versioned_docs/version-*/` and `versioned_sidebars/version-*-sidebars.json`.
6. Run `npm run format`.
7. Start `npm run start`, navigate to the new page, confirm it renders and all links resolve.

**Done when**: page renders locally, sidebars include it, Prettier is clean, build does not throw on broken links.

---

## Skill: edit-versioned-page

**Trigger**: A correction, clarification, or feature note that applies to "current and beyond".

**Steps**:

1. Identify the most recent versioned folder from `versions.json` (the first entry).
2. Apply the edit in `/docs/<path>` (Next).
3. Apply the same edit in `versioned_docs/version-<latest>/<path>`.
4. If the issue exists in older supported versions, propagate to those `version-*` folders too. Check `src/versions.js` (`unmaintainedVersions`) to skip versions that are out of support.
5. Run `npm run format` and verify each version of the page renders.

**Done when**: the edit is identical (or version-appropriate) across all maintained versions and Next.

---

## Skill: move-or-rename-page

**Trigger**: Information architecture change, clearer URL, or section restructure.

**Steps**:

1. Move the file to its new location. Update its `id` if the rename should change it.
2. Update the sidebar reference(s) in `sidebars.js` and any `versioned_sidebars/version-*-sidebars.json`.
3. Update inbound links across the repo:
   ```bash
   git grep -nF "<old-path>" -- '*.md' '*.mdx' '*.js' '*.json'
   ```
4. Add a redirect to the **top** of `static/.htaccess` from the old path to the new path. See [add-redirect](#skill-add-redirect).
5. Clear the Docusaurus cache: `npm run docusaurus -- clear`.
6. Run the build and confirm `onBrokenLinks: "throw"` does not fire.

**Done when**: old URL redirects, all in-repo links updated, build is green.

---

## Skill: retire-page

**Trigger**: Page is obsolete, superseded, or describes removed functionality.

**Steps**:

1. Remove the file from `/docs/` and from each `versioned_docs/version-*/` where it applies.
2. Remove its `id` from each affected sidebar file.
3. Add a redirect at the top of `static/.htaccess` pointing to the most relevant replacement page.
4. Update inbound links to point to the replacement directly, rather than relying solely on the redirect.
5. If the topic appears in search synonyms or curated lists (`product-links.txt`, `connectors-element-template-links.txt`), update them.

**Done when**: no broken links, redirect verified, replacement is reachable from prior entry points.

---

## Skill: regenerate-api-reference

**Trigger**: Upstream OpenAPI spec changed, or a new API needs to be added.

**Steps**:

1. Update or add the spec under `api/`.
2. Run the targeted generator:
   - `npm run api:generate:camunda`
   - `npm run api:generate:operate`
   - `npm run api:generate:tasklist`
   - `npm run api:generate:zeebe`
   - `npm run api:generate:adminsm`
3. Inspect the diff. Generated files should not be hand-edited; if output is wrong, fix the spec or the generator under `api/`.
4. Run `npm run format`.

**Done when**: the spec change is the only authored change; generated output is consistent and reviewed.

---

## Skill: regenerate-config-reference

**Trigger**: Camunda Spring Boot starter config changed for a maintained minor version.

**Steps**:

1. Download the latest config metadata: `npm run config-reference:download:camunda-spring-boot-starter:<version>` (for example `8.9`).
2. Generate the markdown: `npm run config-reference:generate:camunda-spring-boot-starter:<version>`.
3. Review the diff for unintended removals.
4. Run `npm run format`.

**Done when**: regenerated pages match upstream config and render in the dev server.

---

## Skill: add-redirect

**Trigger**: Any move, rename, or removal that changes a published URL.

**Steps**:

1. Open `static/.htaccess`.
2. Add a `RedirectMatch` (or equivalent) rule at the **top** of the file. Order matters: top-most rules win.
3. Use a 301 redirect for permanent moves.
4. Test by building the site and visiting the old URL in the preview deployment, or by reading the rule carefully — local dev does not exercise `.htaccess`.

**Done when**: the rule is in place, ordered correctly, and the new URL is the canonical replacement.

---

## Skill: run-link-check

**Trigger**: Before merging changes that touch many links, or after a large move.

**Steps**:

1. Local internal link check: `npm run build` — Docusaurus throws on broken internal links.
2. External link check uses Lychee. Configuration is in `lychee-external-links.toml`. CI runs this on a schedule; reproduce locally with the Lychee CLI if needed.

**Done when**: build passes and any new external link in your change is reachable.

---

## Skill: verify-build-locally

**Trigger**: Before opening a PR with non-trivial structural changes.

**Steps**:

1. `npm run format:check`.
2. `npm test` if JS/TS changed.
3. `npm run build` (or `npm run build:docker` to keep memory usage low).
4. Optional: `npm run serve` to inspect the static output.

**Done when**: build completes without warnings about broken links or MDX errors.

---

## Skill: open-versioned-release-cut

**Trigger**: A new Camunda minor version is being released. Follow `howtos/release-procedure.md` as the source of truth — this skill is a high-level checklist.

**Steps**:

1. Confirm the cut date and version with the release manager.
2. Run the documented Docusaurus version snapshot command per `howtos/release-procedure.md`.
3. Update `versions.json` and `src/versions.js`.
4. Update sidebars and verify the new versioned folder builds cleanly.
5. Open the PR with the `release` label and the appropriate version label.

**Done when**: site builds, version selector shows the new version, prior `Next` content is preserved.

---

## Skill: style-pass

**Trigger**: Editing a draft from a non-native English contributor, or polishing a community PR.

**Steps**:

1. Skim `.github/instructions/content.instructions.md`.
2. Convert headers to sentence case. Remove trailing colons in headers.
3. Replace passive voice with active voice; convert third person or "I/me" to second person.
4. Ensure UI elements are in `**bold**`, not quoted; filenames and identifiers are in `inline code`.
5. Replace "click here", bare URLs, and "please" in instructional steps.
6. Verify Oxford commas, em-dash usage, and that admonitions are limited to `:::warning`, `:::note`, `:::tip`.
7. Run `npm run format`.

**Done when**: the draft conforms to the style guide and renders cleanly.

---

## Skill: terminology-sweep

**Trigger**: A doc set still uses legacy terms ("workflow" instead of "process", "Github" instead of "GitHub", inconsistent casing of product names).

**Steps**:

1. Search:
   ```bash
   git grep -nE "workflow (instance|automation)" -- 'docs' 'versioned_docs'
   git grep -n "Github" -- 'docs' 'versioned_docs'
   git grep -n "ElasticSearch\|Elastic search" -- 'docs' 'versioned_docs'
   ```
2. Replace each hit with the correct term, respecting documented exceptions ("workflow engine", "sequence flow", "process flow").
3. For "upgrade" vs "update", check semantic meaning before replacing — see the rule in `content.instructions.md`.
4. Re-run the searches to confirm zero remaining occurrences (modulo the legitimate exceptions).

**Done when**: terminology is consistent and only legitimate exceptions remain.

---

## Adding a new skill

1. Pick a short, verb-led name (`do-the-thing`).
2. Add an entry to the index above and a section below with **Trigger**, **Inputs** (optional), **Steps**, and **Done when**.
3. Keep skills focused: one task, fewer than ~12 steps. Split larger procedures into composable skills.
4. Cite the source-of-truth doc in `howtos/` rather than duplicating its content.
