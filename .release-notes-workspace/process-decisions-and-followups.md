# Release-notes skill — next steps (for the PR description)

Notable follow-ons to this work, to include under "Next steps" in the PR description. **Not committed**
(gitignored). Started 2026-06-30.

## Note for the team (workspace files)

For now, the `.release-notes-workspace/` files (report + state) are **visible/tracked on the release-notes
branch** so reviewers can see them during the test run. **Before merging the release PR**, add
`.release-notes-workspace/` back to `.gitignore` so these working files are **never merged to `main`** —
they remain available **locally** to give each skill re-run its prior history/context.

## Next steps

- **Separate skill to scaffold a new minor's docs.** This skill handles routine alpha runs only; it stops
  when it detects the first alpha of a new minor. A follow-up skill (e.g. `/setup-new-minor-docs`) could
  create the new release-notes/announcements/what's-new pages, the `overview.md` version row, the
  `sidebars.js` entry, and the `versioned_docs/` + previous-version updates (cf. PR #8740).
