---
name: scan-product-hub
description: Use when asked to scan, review, or re-check the Product Hub board for a Camunda minor or alpha release, to find what still needs to go into the release notes, announcements, or What's new page, or to report which epics changed since the last scan. Read-only. Reports in the conversation, writes no files.
user-invocable: true
argument-hint: "<version or alpha, e.g. 8.11-alpha1 or 8.11>"
---

# /scan-product-hub — what does this release still need in the docs?

Scan the Product Hub board (https://github.com/orgs/camunda/projects/9) for one release and tell the user which epics need an entry in the release notes, announcements, or What's new page. Run it again at any time to get the current status and what changed since the last scan.

- **Read-only.** Do not edit docs, add labels, or comment on epics unless the user asks.
- **No files.** Show every report in the conversation. Do not write report or state files.
- **Verify, do not guess.** If an epic is unclear, list it as a question for the user.

## Step 1: Pick the target

1. The user must specify the release (`8.11-alpha1`, `8.11`). If they did not, ask which version or alpha to scan and wait for the answer. Do not guess or infer it from the board.
2. On a rescan, reuse the target from the previous scan in the conversation unless the user names a different one.
3. Match epics by label `version:`, `target:`, or `potential:` followed by the target. For an alpha, match that alpha only (`8.11-alpha1`). For a minor, match the minor and all of its alphas (`8.11`, `8.11.0`, `8.11-alpha*`). The `potential:` labels are lower confidence. Note them as such.
4. Derive the docs folder by removing the dot from the version and adding `0` (`8.11` → `docs/reference/announcements-release-notes/8110/`). Files: `<dir>-release-notes.md`, `<dir>-announcements.md`, `whats-new-in-<ver>.md` (for example `whats-new-in-811.md`). If the folder does not exist, tell the user the minor has not been scaffolded yet and stop.
5. State the target back in one line before scanning.

## Step 2: Fetch the epics

The board has about 2,000 items and the query pages through all of them, so expect it to take under a minute. It needs the `read:project` scope. If `gh auth status` does not list it, ask the user to run `gh auth refresh -h github.com -s read:project`.

Save the query below in a temporary file and replace `<target-regex>` in the filter (for example `8\\.11`):

```graphql
query ($endCursor: String) {
  organization(login: "camunda") {
    projectV2(number: 9) {
      items(first: 100, after: $endCursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          status: fieldValueByName(name: "Status") {
            ... on ProjectV2ItemFieldSingleSelectValue {
              name
            }
          }
          content {
            ... on Issue {
              number
              title
              url
              state
              repository {
                nameWithOwner
              }
              assignees(first: 3) {
                nodes {
                  login
                }
              }
              labels(first: 50) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
```

```bash
gh api graphql --paginate -F query=@<query-file> --jq '.data.organization.projectV2.items.nodes[]
  | select(.content.number != null)
  | {n: .content.number, t: .content.title, url: .content.url, repo: .content.repository.nameWithOwner,
     phase: .status.name, assignee: (.content.assignees.nodes[0].login // null),
     labels: [.content.labels.nodes[].name]}
  | select(any(.labels[]; test("^(version|target|potential):<target-regex>")))'
```

Then, for each in-scope epic, read the body and comments with `gh issue view <n> -R <repo> --json body,comments,labels`. Run these in parallel batches.

## Step 3: Classify each epic

For each epic, work out four things.

**1. Is it a candidate?** By board phase:

| Phase            | Candidate                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| Validate, Done   | Yes                                                                                                                  |
| Implement        | Maybe. Epics here (especially `potential:`) may need an entry, but this needs a human decision. Flag, do not decide. |
| Define, Discover | No. List it and state the phase as the reason.                                                                       |

**2. What do the release labels say?** Rely on these labels on the epic:

| Label                  | Meaning                                                                                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `no-release-notes`     | No entry is needed. Mark `No entry needed` and say the label is the reason.                                                                                                                                |
| `release-notes-needed` | The epic is a candidate. Read the epic description for a `## Release Notes` section. If it has content → `Ready to draft`. If it is missing or empty → `Action needed: PM must add Release Notes section`. |
| `release-notes-added`  | The epic must have an entry in the release notes page. Search the target files (see below). If found → `Already in docs`. If not found → `Action needed: label says added, but no entry found`.            |
| none of the above      | Unlabeled. If it is a Validate or Done candidate, flag `Action needed: no release label` and ask the user whether it needs one.                                                                            |

If an epic has more than one of these labels, report the conflict as a question. Never infer an entry from the body or comments alone. Read the comments for scope changes, descopes, and renames that the Release Notes section may not reflect.

**3. Is the entry really in the docs?** Search the target folder's files for the epic number or its title. The live files are the source of truth. For an epic spread across alphas, note what is already documented and ask the user what is new in this alpha.

**4. Where does it belong?** Follow `.github/instructions/repo.instructions.md` section 7:

- **Announcements:** supported-environment changes, breaking changes, deprecations, removals, or anything that needs action before upgrading.
- **Release notes:** every notable feature or enhancement. Put it in the section for the tag where it first appears (alpha1, alpha2, GA).
- **What's new:** only features significant enough to influence an upgrade decision. Flag these as candidates. Do not decide for the user.
- An epic can belong in more than one place. If the placement is unclear, ask the user.

If helpful, check `camunda/camunda-docs` (including open PRs) for related feature documentation and mention it. Do not count other repositories as documentation.

## Step 4: Report in the conversation

Keep it short enough to read at a glance. Link every epic (`[#1234](url)`). Use this layout:

1. **Header:** the target, the scan time, and counts by outcome.
2. **Needs action:** a table of the epics that still need an entry or a decision, sorted by priority (`Action needed` first, then `Ready to draft`, then Implement-phase epics flagged for a human decision).

   | Epic | Phase | Confidence | Where it goes | Status | Next step |
   | ---- | ----- | ---------- | ------------- | ------ | --------- |

   Confidence is `version`, `target`, or `potential`.

3. **Already in docs / no entry needed / not eligible:** one line per epic, with the reason.
4. **Questions for you:** decisions the skill cannot make (placement, naming, suspect epics, epics that left the board).
5. **Snapshot:** a compact block for the next rescan (see below).

Do not draft entries in this step. Afterwards, offer to draft the `Ready to draft` ones. If the user accepts, match the structure of the live target file and follow `.github/instructions/content.instructions.md`. Never touch `<!-- RELEASE_LINKS_PLACEHOLDER -->` or `versioned_docs/`.

### Snapshot block

End every report with a fenced block listing one line per in-scope epic, so the next scan can compare against it:

```text
snapshot 8.11-alpha1 2026-10-20
#1234 | Validate | target | release-notes-needed | Ready to draft | rn:a1b2c3 | in-docs:no
#1250 | Define | potential | none | Not eligible | rn:none | in-docs:no
```

`rn` is the first 6 characters of a hash of the epic's release-notes section (`rn:none` if there is no section). A changed hash means the PM edited the content. Hash it with `shasum`.

## Step 5: Rescan

When the user asks again ("review the board", "what changed since last time", "rescan"), run Steps 1 to 4 again, then compare against the **most recent snapshot block in this conversation**. If there is none, say this is the first scan and ask whether the user wants to paste a snapshot from an earlier session. Snapshots live only in the conversation. Nothing is saved between sessions unless the user keeps the block.

Open the report with **What changed since the last scan**, listing only differences:

- **New** in scope.
- **Removed** from scope (labels dropped). Keep it in the report and ask the user what to do, especially if it already has an entry in the docs.
- **Phase** moved (for example `Implement → Validate`), and whether it became a candidate.
- **Release label** changed (for example `release-notes-needed` → `release-notes-added`).
- **Confidence** changed (`potential` → `target`).
- **Release-note content** appeared or changed (`rn` hash differs).
- **Newly documented** (an entry now exists in the docs).
- **Reopened or closed** epics.

If nothing changed, say so in one line and still show the current status table. Then show the full current status. Finish with a new snapshot block.
