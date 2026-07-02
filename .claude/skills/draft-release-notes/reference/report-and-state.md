# Report and state files

Two files in `.release-notes-workspace/` (kept visible on the branch during the cycle; re-add to
`.gitignore` before merging the release PR so they never land in `main`, per the team note):

- `.release-notes-workspace/<version>-<alpha>-report.md` — human-readable, for whoever runs the skill.
- `.release-notes-workspace/<version>-<alpha>-state.json` — machine-readable, for re-run diffing.

The report must let a reader **make a decision at a glance, without opening each epic** (they will still
verify, but the report should already carry your analysis). Multiple tech writers use this — be explicit.

## Golden rules for the report

- **Embed links on every reference.** Any epic, issue, or PR number must be a clickable Markdown link
  (`[#3459](https://github.com/camunda/product-hub/issues/3459)`, `[camunda-docs#9211](url)`). Never leave
  a bare number anywhere — table, docs follow-ups, open questions, proposed actions, all of it.
- **List every in-scope epic**, one row each, ordered Done → Validate → Implement → Define → Discover.
- **Verify, don't ask.** You have the board, the linked PRs/code, and the docs repo (including open PRs).
  Confirm things yourself before writing a question. Only what you genuinely cannot verify becomes an Open
  Question — phrased as a direct, specific question, not "please confirm."

## Status vocabulary (use these exact terms)

| Status                           | Meaning                                                                                                                                                                                                  |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Drafted**                      | A new entry was written this run (say where: release notes / announcement / both).                                                                                                                       |
| **Already documented (<alpha>)** | An entry already exists from a prior alpha — **link the published entry and say which alpha**. Add a one-line delta note (what, if anything, is new for this alpha). Never write a bare "already added". |
| **Needs content**                | Eligible but the PM supplied no release-note content → `release-notes-needed`; raise a Proposed epic action.                                                                                             |
| **No release notes**             | Confirmed no user-facing change → `no-release-notes` (state why).                                                                                                                                        |
| **Not eligible (<phase>)**       | Only Define or Discover epics. Always give the phase as the reason (for example "Discover phase").                                                                                                       |

## Label rule

Propose **`release-notes-added`** whenever you updated **any** changelog file for the epic — release notes
**or** announcements (or both). Adding an announcement counts. Propose `release-notes-needed` /
`no-release-notes` per the status above.

## Report structure (`*-report.md`)

```md
# <version>-<alpha> release notes — status report

_Generated: <date> · Target: <version>-<alpha> · Source: [Product Hub view 31](url) · Branch: `<branch>`_

## Summary

- In scope: N — Done a · Validate b · Implement c · Define d · Discover e
- Outcomes: drafted X · already-documented Y · needs-content Z · no-RN W · not-eligible V
- Documentation: done · in-progress · missing · n/a (with counts)
- Open questions (for the release manager): K · Proposed epic actions: M
- Backport candidates: …

## Epics

Add this **alpha-label legend** right above the table so the label column is self-explanatory:

> Alpha label: **version** = confirmed for this release · **target** = committed/targeted · **potential** = candidate, may still slip (drafted, but lower confidence).

| Epic         | Title | Phase | Alpha label | Summary & rationale                                                                                                                                                       | Change & location                     | RN label (now to proposed)  | Docs                         |
| ------------ | ----- | ----- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | --------------------------- | ---------------------------- |
| [#NNNN](url) | …     | Done  | version     | 1-2 lines: what changed, and why it routed to release notes / announcement / neither. For not-eligible, give the phase. If unresolved, add `see OQ#n` or `see Action #n`. | Release notes, [§anchor](file#anchor) | none to release-notes-added | Done ([camunda-docs#…](url)) |
```

- **Summary & rationale** is the most important column: what the epic changed, and _why_ it routed to
  release notes vs. announcements vs. nothing. For `Already documented`, summarize what shipped in which
  alpha (with the published link) and the alpha delta. For `Not eligible`, give the reason.
- Cross-reference unresolved items inline (`⚠ see OQ#2`, `see Action #1`) so a reader can jump to the
  detail and back.

```md
## Drafted entries (links)

- <category> → <entry title> ([#epic](url)) → [release notes §anchor](file#anchor)
- <category> → <entry title> ([#epic](url)) → [announcement §anchor](file#anchor)

## Documentation status (every reference linked)

- Done: [#epic](url) → [camunda-docs#…](url) (merged)
- In progress: [#epic](url) → [camunda-docs#… (open)](url)
- Missing (no doc issue/PR found — verified via sub-issues + open/closed PR search): [#epic](url), …
- N/A: [#epic](url) (no docs needed — reason)

## Open questions (decisions for the release manager)

Only items you could not resolve by verification. Each links its epic.

1. [#NNNN](url) — <direct, specific question for the person running the skill>.

## Proposed epic actions (NOT applied, for your approval)

Labels to set, and questions to post in the epic. **Tag only the assignee in the comment.** Put any SMEs
you found in the comments in a separate column so the release manager can decide whether to loop them in.
Do not use em dashes in the comment text.
| Epic | Label to add | Comment to post (tag the assignee only) | Other SMEs to consider |
| ---- | ------------ | --------------------------------------- | ---------------------- |
| [#NNNN](url) | release-notes-needed | "@assignee, <specific request or question with your findings and links>" | @sme1, @sme2 |

## Backport candidates (flag only — run `/backport`)

| Entry / change | Applies to released version(s) | Source epic | Note |
```

### Open Questions vs. Proposed epic actions (which goes where)

- **Open Question**: a decision **the release manager** (skill runner) must make, for example a naming
  choice, category placement, or whether a niche feature should be public.
- **Proposed epic action**: something best answered or owned **by the epic team**, for example a request
  for missing release-note content, or a "what exactly is shipping in this alpha?" question. Post it in the
  epic and **tag only the assignee** (the first line of action). List any **SMEs** you found in the
  comments in the separate "Other SMEs to consider" column, not in the comment body. Always include your
  findings (what you verified, with published links) so the ask is concrete.

## State (`*-state.json`)

```json
{
  "version": "8.10",
  "alpha": "alpha3",
  "branch": "8.10-alpha3-release-notes",
  "view": "https://github.com/orgs/camunda/projects/9/views/31",
  "generated_at": "<date>",
  "release_notes_file": "docs/reference/announcements-release-notes/8100/8100-release-notes.md",
  "announcements_file": "docs/reference/announcements-release-notes/8100/8100-announcements.md",
  "epics": [
    {
      "number": 3459,
      "url": "https://github.com/camunda/product-hub/issues/3459",
      "title": "Multi-Variable Filtering",
      "phase": "Validate",
      "alpha_label": "target",
      "assignee": "bojtospeter",
      "smes": ["..."],
      "summary": "<what changed + routing rationale>",
      "status": "Drafted", // Drafted | Already documented (alphaN) | Needs content | No release notes | Not eligible (reason)
      "change": {
        "release_notes": true,
        "announcement": false,
        "anchor": "#multi-variable-filtering"
      },
      "already_documented": null, // or { "alpha": "alpha2", "published_url": "...", "delta": "..." }
      "rn_label_current": null,
      "rn_label_proposed": "release-notes-added",
      "content_hash": "<hash of the PM RN content used, to detect changes on re-run>",
      "docs": { "status": "Missing", "refs": [] },
      "open_questions": [], // release-manager decisions
      "proposed_action": null, // { "label": "...", "comment": "...", "tag": ["assignee","sme"] }
      "backport_candidate": null
    }
  ]
}
```

`backport_candidate`: `null` or `{ "change": "...", "applies_to": ["8.9"], "note": "..." }`. Released
versions come from `versions.json` — never hardcode.

## Re-run (read this file first)

On re-run, **read the prior report + state before doing anything else**, then:

1. Re-fetch the board (view 31) and re-read each epic.
2. For each epic, compare to stored state:
   - **Phase/tier changed** (e.g. moved into eligibility, or `potential`→`target`) → re-evaluate and draft
     or update; note the movement in the summary.
   - **PM content changed** (`content_hash` differs) → update the drafted entry.
   - **Unchanged + already drafted** → leave the live entry as-is (don't rewrite or reorder).
   - **Open question / proposed action from last run** → re-verify: was the label applied, the changelog
     added, or a comment answered? If resolved, close it out and act on the answer; if still open, carry it
     forward (don't duplicate).
   - **New epic** in view 31 → add it. **Epic dropped** from view 31 → keep its row, mark it, and raise an
     Open Question (don't silently delete an already-drafted entry).
3. Regenerate the report and state to reflect the current run; keep the history readable (what changed
   since last run).

```

```
