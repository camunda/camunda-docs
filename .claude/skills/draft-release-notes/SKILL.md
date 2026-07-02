---
name: draft-release-notes
description: Use when drafting or updating the release notes (and related announcements) for an upcoming Camunda alpha release in camunda-docs. Reads the next-alpha scope from Product Hub view 31, reads each epic to draft accurate entries that follow the Lamppost handbook guidelines and repo conventions, verifies coverage, and produces a progressive end-to-end report (epics, phases, draft status, documentation status, open questions) plus proposed epic-label/comment actions for the release manager to approve. Re-runnable across days — only updates what changed.
user-invocable: true
argument-hint: "[version-alpha, e.g. 8.10-alpha3 — optional; auto-detected from Product Hub view 31 if omitted]"
---

# /draft-release-notes — draft & maintain alpha release notes for camunda-docs

This skill grounds the **manual** release-notes process the Documentation Team already follows. It does
not invent a new process. Work through the steps **in order**. Accuracy and verification matter more than
speed — when unsure, **flag an Open Question, never wing it.**

## Sources of truth (never hardcode these — read them at runtime)

| What                                                            | Source of truth                                             | How to read it                                                                                                                                                                                               |
| --------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What goes in announcements vs. release notes vs. what's new** | Lamppost handbook: _Managing announcements & release notes_ | Lamppost MCP → app `handbook`, path `departments/products/engineering/managing-announcements-release-notes/index.md`. Fallback: repo `.github/instructions/repo.instructions.md` §7.                         |
| **General docs style/grammar/links**                            | `.github/instructions/content.instructions.md`              | Read before writing prose.                                                                                                                                                                                   |
| **Which epics are in scope**                                    | Product Hub board, **view 31 ("Next Alpha")**               | GitHub GraphQL (Step 3). Never assume the alpha or the label set — read the live view filter.                                                                                                                |
| **The exact entry format/structure**                            | The **live target file** for this version                   | Read `<version-dir>/<version-dir>-release-notes.md` and `-announcements.md` and match their existing structure. See `reference/format-conventions.md` for the conventions, but the live file wins on layout. |

Read `reference/decision-rules.md`, `reference/format-conventions.md`, and `reference/report-and-state.md`
before you start — they hold the eligibility matrix, entry formats, and report/state schema.

## Step 0: Preconditions

1. Confirm `gh` has the `read:project` scope (needed for the board):
   ```bash
   gh auth status 2>&1 | grep -o 'read:project' || echo "MISSING read:project — run: gh auth refresh -h github.com -s read:project"
   ```
   If missing, stop and ask the user to run `gh auth refresh -h github.com -s read:project` in their terminal.
2. Read the two guideline sources above (handbook page + `repo.instructions.md` §7). These define the
   line between announcements and release notes; you will apply them when routing every entry.

## Step 1: Determine the target alpha

1. If the user passed a `version-alpha` argument (e.g. `8.10-alpha3`), use it.
2. Otherwise auto-detect from view 31, whose filter names the alpha labels:
   ```bash
   gh api graphql -f query='query{organization(login:"camunda"){projectV2(number:9){view(number:31){name filter}}}}'
   ```
   The filter looks like `label:"target:8.10-alpha3","version:8.10-alpha3","potential:8.10-alpha3"`.
   Extract the version (`8.10`) and alpha (`alpha3`) from those labels.
3. Derive the file paths (strip dots from the version and append `0`):
   - `8.10` → dir `8100` → `docs/reference/announcements-release-notes/8100/8100-release-notes.md`,
     `8100-announcements.md`, `whats-new-in-810.md`.
   - Confirm these files exist. **If the version dir/pages do NOT exist, stop — do not proceed.** This is
     the first alpha of a new minor, and setting up a new minor's docs scaffolding (`overview.md`,
     `sidebars.js`, `versioned_docs/` copies, and the previous version's pages) is a separate one-time
     task this skill intentionally does **not** handle. Tell the user verbatim:

     > This looks like the first alpha of a new minor (`<version>`). Creating a new minor's docs
     > scaffolding — the new release-notes/announcements/what's-new pages, the `overview.md` version row,
     > the `sidebars.js` entry, and the `versioned_docs/` + previous-version updates — is a separate
     > one-time setup task I don't handle here (see the alpha1 precedent, e.g. PR #8740). Please complete
     > that setup first, then re-run me to draft the per-alpha entries.

     A routine alpha run **only appends** entries to the existing `<XY0>-release-notes.md` (and
     `-announcements.md` when needed). It never touches `overview.md`, `sidebars.js`, `versioned_docs/`,
     or any other version's files.

4. State the detected target back to the user (e.g. "Target: 8.10-alpha3, files under `8100/`") before
   proceeding.

## Step 2: Set up workspace + branch (idempotent)

1. Create the persistent, gitignored workspace if absent and define paths:
   ```bash
   mkdir -p .release-notes-workspace
   ```
   - Report: `.release-notes-workspace/<version>-<alpha>-report.md`
   - State: `.release-notes-workspace/<version>-<alpha>-state.json`
2. If a state file already exists, **this is a re-run** — load it (Step 8 governs re-run behavior).
3. Sync `main` and create or switch to the release-notes branch (named per convention):
   ```bash
   git fetch origin main
   # First run: create off main. Re-run: just switch to it.
   git rev-parse --verify <version>-<alpha>-release-notes 2>/dev/null \
     && git switch <version>-<alpha>-release-notes \
     || git switch -c <version>-<alpha>-release-notes origin/main
   ```
   Branch name convention: `8.10-alpha3-release-notes` (see `reference/format-conventions.md`).
   Do **not** commit or open a PR in this skill — that is Step 9 / `/create-pr`.

## Step 3: Discover the in-scope epics

Read all Product Hub items, keep those carrying any of the three alpha labels, and capture each epic's
**Status (phase)** and labels. Use the paginating helper pattern (the board has ~2000 items):

```bash
# Page through projectV2(number:9).items; for each node capture:
#   fieldValueByName("Status") -> phase (Discover/Define/Implement/Validate/Done)
#   content(Issue): number,title,url,state,repository, labels(first:30)
# Keep nodes whose labels intersect {version|target|potential}:<version>-<alpha>.
```

Record, per epic: number, title, url, **phase**, **alpha-label tier** (`version`/`target`/`potential`),
`docsRequired:*` label (hint only), and any existing `release-notes-*` label.

## Step 4: Analyze each epic

For every in-scope epic (process **all** of them — the report lists every epic, drafted or not):

1. **Read the whole epic** — body **and all comments** — via GraphQL. Also capture the **assignee** (first
   line of action for any epic question) and likely **SMEs** (human, non-bot commenters who discuss the
   feature). The PM-supplied `## Release Notes` section is the **required basis** for any draft; read the
   comments to **verify and refine it for accuracy** (scope changes, descopes, decisions, renames live
   there). Reading the full epic is for verification only — it is **not** grounds to author a release note
   the PM never supplied.
2. **Decide the release-note action** using the matrix in `reference/decision-rules.md`:
   - Eligible by phase+label **and** the PM supplied release-note content → **draft** (from that content,
     refined for accuracy).
   - Eligible but no usable release-note content → **flag `release-notes-needed`** + a Proposed epic action;
     do **not** invent an entry.
   - **Already documented in a prior alpha** (entry exists / `release-notes-added` present) → verify what
     shipped in which alpha (with the **published link**), determine this alpha's delta, and either draft
     the delta if certain or raise a Proposed epic action asking what's shipping. See decision-rules §1.
   - Not eligible (**Define or Discover phase only**) → **list only, and state the phase** as the reason.
   - Internal/tech epics with no user-facing change → candidate **`no-release-notes`** (verify in content).
   - Propose **`release-notes-added`** if you wrote into **any** changelog file (release notes _or_
     announcements).
3. **Assess documentation status** (do **not** trust `docsRequired:*` alone) — see `reference/decision-rules.md`:
   - Traverse the epic's **sub-issues**; isolate those in `camunda/camunda-docs`.
   - If none, **search the docs repo — including open PRs** — for a related page/PR before concluding
     anything is missing.
   - Classify: **Done** (related doc task/PR found and closed/merged → link it) · **In progress**
     (related doc PR still open → link the open PR for follow-up) · **Missing** (none found → flag follow-up).
   - You do **not** need to verify the docs cover every change — relatedness + closed/merged is enough.
   - **Embed the link** for every doc issue/PR you cite.
4. **Route to announcements if applicable** — supported-environment changes, breaking changes, and
   deprecations belong in announcements (per the handbook), in addition to any release-note entry.
5. **Flag backport candidates** — if an entry (usually an announcement: a supported-environment change or
   deprecation) **also** applies to a released version (those listed in `versions.json`), do **not** edit
   any `versioned_docs/` or other-version file here. Record it in the report's **Backport candidates** list
   with the target version(s) and recommend running `/backport`. See `reference/decision-rules.md` §4. The
   in-development version's own alpha entries are never backported (they version automatically at GA).
6. **Verify, then record unknowns** (decision-rules §5): resolve uncertainty yourself first (linked PRs,
   code, docs repo incl. open PRs). Only genuine unknowns become questions — direct and specific, never
   "please confirm". Route each: **Open Question** (a decision for the release manager) vs. **Proposed epic
   action** (a request/question for the epic; **tag only the assignee** in the comment, and list any SMEs
   from the comments in a separate column).

## Step 5: Draft the entries

For each epic marked **draft**, write entries into the **live files**, matching their existing structure
exactly (`reference/format-conventions.md`):

- **Release notes** → add a `#### <feature title>` under the correct `### <category>` within the
  `## <version>.0-<alpha>` section. Include the **source-link HTML comment** to the epic
  (`<!-- https://github.com/camunda/product-hub/issues/NNNN -->`), the component `<div class="release">…</div>`
  badges, concise prose/bullets, and a `<p class="link-arrow">[…](/path.md)</p>` to the feature docs.
- **Announcements** → only for env/breaking/deprecation changes, using the announcement `div`/badge
  format (`badge--change` / `badge--breaking-change` / `badge--deprecated` / `badge--new`) and an
  `**Action:**` line.

Rules:

- Write to the **existing alpha section** if present (e.g. `## 8.10.0-alpha3` may already exist) — append
  within it; do not duplicate the section.
- Follow `content.instructions.md` for language/links. Keep entries factual and grounded in the epic.
- **Never** touch the `<!-- RELEASE_LINKS_PLACEHOLDER -->` block (a bot maintains release links).
- **Never** fabricate features, links, or behavior. If a doc link target doesn't exist yet, flag it.

## Step 6: Verify (mandatory)

Before reporting, verify each drafted entry:

- Routed correctly (release note vs announcement) per the handbook guidelines.
- Has a source-link comment back to its epic; component/change badges are sensible.
- Internal doc links resolve to real files in the repo (check the path exists); external links are real.
- Prose matches `content.instructions.md`.
- `npm run build` is **not** required for a draft run; note it as skipped. (Run it only before the PR if
  the user asks, per repo build triggers.)
  Anything that fails or is uncertain → fix if clear, otherwise downgrade to an **Open Question**.

## Step 7: Write the report + state

Write both files to `.release-notes-workspace/` per `reference/report-and-state.md` (follow that schema
exactly). The report must let a reader decide **at a glance**, so:

- Master table with **every** in-scope epic, including the **Summary & rationale** column (what changed +
  why it routed to release notes/announcements/neither; for not-eligible, the reason; cross-reference
  unresolved items inline as `⚠ see OQ#n` / `see Action #n`).
- Use the exact **status vocabulary** (Drafted / Already documented (alpha) + link / Needs content /
  No release notes / Not eligible (reason)).
- **Embed a link on every epic/issue/PR reference**, everywhere in the report.
- Separate **Open Questions** (release-manager decisions) from **Proposed epic actions** (labels + epic
  comments tagging the assignee + SMEs) — _proposed only, not applied_.

## Step 8: Re-run behavior (read the prior report + state FIRST)

When a state file already exists, this is a re-run — **read the prior `*-report.md` and `*-state.json`
before anything else** so you know what was done and what to verify. Then follow the re-run procedure in
`reference/report-and-state.md` (§ Re-run):

- Re-fetch the board and re-read each epic; compare to stored state.
- Phase/tier change (e.g. moved into eligibility, `potential`→`target`) → re-evaluate and draft/update;
  note the movement. PM content changed (`content_hash`) → update the entry. Unchanged + already drafted →
  leave as-is (don't rewrite/reorder).
- Re-verify last run's open questions / proposed actions: was the label applied, the changelog added, the
  comment answered? Resolved → act on it and close out; still open → carry forward without duplicating.
- New epic in view 31 → add. Epic dropped from view 31 → keep its row, mark it, raise an Open Question.
- Preserve human edits to the live files — only add/adjust what changed. Regenerate report + state.

## Step 9: Hand-off (no outward-facing writes here)

1. Summarize to the user: counts by phase and outcome (drafted / already-documented / needs-content /
   no-RN / not-eligible), docs follow-ups, and the **Open Questions** (release-manager decisions).
2. Present the **Proposed epic actions**: labels to set, plus the exact comment to post in each epic.
   **Tag only the assignee** in the comment (the first line of action; may not be a PM). List any SMEs
   found in the comments in a separate "Other SMEs to consider" column, not in the comment body. Avoid em
   dashes in comment text. The skill does **not** apply labels or post comments itself (per design). Apply
   them only if the user says so.
3. For opening the PR, defer to **`/create-pr`** with these conventions (don't duplicate that logic here):
   - Title: `docs(release): <version>-<alpha> release notes`
   - Body: `<version>-<alpha> release notes as per https://github.com/orgs/camunda/projects/9/views/31.`
     plus `Closes <docs tracking issue>` if one exists.
   - Labels: `release docs`, `deploy`, and the version label (e.g. `8.10.0-alpha3`).
   - Reviewer: `@camunda/tech-writers`.

## Guardrails

- Read-only on epics by default; **never** label/comment/close epics without explicit user approval.
- Only edit the in-development version's files under `docs/`. **Never** touch `versioned_docs/`, other
  versions' pages, the release-link placeholder, or unrelated docs — flag backport candidates instead and
  defer to `/backport`.
- Prefer the smallest correct change; match the surrounding file's conventions.
- Cite sources in the report (epic URLs, doc PR URLs) so the user can verify every claim.
