# Decision rules

These encode how the Documentation Team decides what to draft. Apply them exactly. When a case is
ambiguous, record an **Open Question** instead of guessing.

## 1. Release-note draft eligibility (phase × alpha-label)

Every in-scope epic carries one alpha label and sits in one board phase. Eligibility is decided by
**phase only**:

| Phase         | Eligible to draft?     |
| ------------- | ---------------------- |
| **Done**      | ✅ draft               |
| **Validate**  | ✅ draft               |
| **Implement** | ✅ draft (all of them) |
| **Define**    | 🚫 never draft         |
| **Discover**  | 🚫 never draft         |

In one line: **draft every epic in Done, Validate, and Implement; never draft Define or Discover.** The
alpha label does **not** gate drafting any more. It only signals confidence, so note it in the report:

- `version:<alpha>` confirmed for this release.
- `target:<alpha>` committed/targeted for this release.
- `potential:<alpha>` candidate that may still slip, so draft it but flag the lower confidence.

### Content gate (applies to every "eligible" epic)

"Eligible" means _allowed_ to draft — but you only draft from **PM-supplied** release-note content:

- **The PM-supplied `## Release Notes` section (or equivalent release-note content the PM wrote in the
  epic) is the required basis for a draft.** Draft _from_ it. Then read the **whole epic incl. comments**
  to **verify and refine it for accuracy** — comments often record scope changes, descopes, decisions, and
  renames, so the supplied text may need correcting to match what actually shipped. The full-epic read is
  for verification, **not** a license to author a release note the PM never provided.
- **No PM-supplied release-note content → do NOT draft.** Flag **`release-notes-needed`** and propose a
  PM-mention comment asking for a changelog/draft. **Never infer or fabricate an entry** from body/comments
  alone, even if you think you understand the change.
- Eligible but clearly **no user-facing change** (internal/tech epic) → candidate for **`no-release-notes`**;
  confirm from the content before proposing that label.

### The `release-notes-added` label means "a changelog file was updated"

Propose **`release-notes-added`** whenever you wrote into **any** changelog file for the epic — the release
notes **or** the announcements (or both). An announcement-only entry still earns `release-notes-added`.

### Already documented in a prior alpha (the multi-alpha epic case)

An epic can ship across several alphas (e.g. part in alpha1, part in alpha2, part in alpha3). If an entry
already exists from a prior alpha (often signalled by an existing `release-notes-added` label), **do not
write a bare "already added".** Instead:

1. **Verify what shipped in which alpha.** Read the existing entries in the release-notes file, match them
   to the epic (source-link comments, epic comments, linked PRs/issues), and get the **published link** to
   each already-shipped entry (e.g. `https://docs.camunda.io/docs/next/reference/announcements-release-notes/<dir>/<dir>-release-notes/#<anchor>`).
2. **Determine this alpha's delta** — what (if anything) is new for the alpha you're drafting. Use the
   epic's linked PRs, merge dates vs. the alpha cut date, and comments.
3. **Act on what you can prove:**
   - If you can determine the new-for-this-alpha content with confidence → **draft it**.
   - If you cannot → **do not guess**. Raise a **Proposed epic action**: a comment for the epic that (a)
     notes the `release-notes-added` label, (b) links the entries already published in the prior alpha(s),
     (c) states your findings, and (d) asks the assignee (+ any SMEs) **exactly what is shipping in this
     alpha** so the notes can reflect it. Record the status as `Already documented (<alpha>)` with the
     published link and a one-line delta note.

## 2. Announcements vs. release notes vs. what's new (route per Lamppost handbook)

Read the handbook page at runtime; this is the summary you apply:

- **Release notes** — notable **new and enhanced features** that don't disrupt a user's normal journey.
  This is the default home for shipped feature work.
- **Announcements** — **supported-environment changes** (OpenJDK, Spring Boot, Elasticsearch/OpenSearch,
  Keycloak, DB versions, Docker tags, Helm chart versions, …) and **key changes** (**breaking changes**
  and **deprecations**) — anything that **requires action before upgrading**. An epic can produce **both**
  a release-note entry and an announcement (cross-link them).
- **What's new** — curated upgrade highlights only. Do **not** auto-populate it during a routine alpha run
  unless the user asks; flag candidates instead.

Routing test for each shipping change:

1. Does it change a supported environment, break behavior, or deprecate something? → **Announcement**
   (+ release note if it's also a feature). Mark breaking/deprecation with the right badge and an
   `**Action:**` line.
2. Is it a new/enhanced feature? → **Release note.**
3. Unsure which? → **Open Question.**

## 3. Documentation status (never trust the label alone)

Official, public-facing documentation lives **only in `camunda/camunda-docs`**. Other repos (e.g.
`camunda/skills`) are **not** documentation — never count them toward docs status. You may cite such a PR
only as _evidence_ about an epic's scope, clearly labelled as not-docs.

The `docsRequired:*` board label (`no` / `simple` / `complex` / `pending`) is only a **hint** — labels are
often stale or unfollowed. Determine real status from evidence:

1. Read the epic's **sub-issues**; keep those in `camunda/camunda-docs`.
2. If none, **search** the docs repo for a related PR/page (by feature name, component, epic reference).
3. Classify:
   - **Done** — a related doc task/PR exists and is **closed/merged** → record it + link. (You do **not**
     need to verify it covers every change — relatedness + closed/merged is sufficient.)
   - **In progress** — a related doc PR exists but is **still open** → record **In progress** + link the
     open PR so the release manager can follow up with the team.
   - **Missing** — no related documentation found anywhere → **flag for follow-up**.
   - **N/A** — change needs no docs (e.g. confirmed internal/tech) → say so.
4. If the label and the evidence disagree (e.g. label `pending` but docs merged), trust the evidence and
   **note the discrepancy**.

## 4. Backport candidates (flag only — never backport here)

The version you are drafting for is the **in-development version** (the alpha's version). It lives only
under `docs/` and is **never backported** — it becomes versioned automatically when that minor reaches GA.
Do not hardcode which version this is; derive it:

- **Released versions** = the entries in the repo's `versions.json` (e.g. read it at runtime).
- **In-development version** = the version of the target alpha (the one under `docs/` with no
  `versioned_docs/version-<x>/` copy).

A **backport candidate** is an entry whose change _also_ applies to one or more **released** versions —
most commonly an **announcement** (a supported-environment change or a deprecation that also affects an
older, still-maintained version). Feature release notes are normally specific to the in-dev version and are
**not** backport candidates.

When you spot one:

- **Do not** edit any `versioned_docs/` file or any other version's pages in this skill.
- **Flag it** in the report's **Backport candidates** list: the entry, and which released version(s) it
  likely applies to.
- Recommend running the **`/backport`** skill to perform the cross-version sync
  (`docs/<ver>/` + `versioned_docs/version-<ver>/`). Actual backporting is out of scope here.
- If you're unsure whether it applies to older versions, raise it as an Open Question instead.

## 5. Verify first; then split unknowns into Open Questions vs. Proposed epic actions

**Verify before you ask.** You have the board, the epic's linked PRs and code, and the docs repo
(including open PRs). Resolve uncertainty yourself first — e.g. check whether a supported-version is
already in the announcements / `supported-environments.md`, whether a doc PR is open, what a linked PR
actually changed. Do **not** ask the release manager to "confirm" something you are positioned to verify.
Only genuine unknowns become questions, and each question must be **direct and specific** (and link its
epic).

Route each remaining unknown:

- **Open Question** — a decision **the release manager** (the person running the skill) must make:
  - Naming choice or category placement (e.g. epic says "Test Studio", docs say "Play").
  - Whether a niche/internal-looking feature should be published at all.
  - An epic in Done/Validate that looks suspect (e.g. `potential:` with **no implementing PRs**).
  - An epic that left view 31 between runs but already has a drafted entry.
  - A referenced doc link target that doesn't exist yet.
- **Proposed epic action** — something the **epic team** owns or must answer:
  - Missing PM release-note content → request a changelog.
  - "What exactly is shipping in this alpha?" for a multi-alpha epic (include your findings + published
    links).
    Post it in the epic, tagging the **assignee** first (the first line of action — it may not be a PM), plus
    any **SMEs** you identified from the comments who could answer or supply the content.

**Always state the reason for `Not eligible`.** Never list an epic as not-eligible without saying why
(e.g. "potential + Implement", "Discover phase") so any reader understands why nothing was drafted.

Both lists go in the report and the hand-off summary, with every epic/issue/PR reference linked.
