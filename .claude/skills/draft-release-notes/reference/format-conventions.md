# Format conventions

These are the repo conventions observed across alpha release PRs (8.8 → 8.10). **The live target file is
the final authority on layout** — read it and match it. Where past releases were inconsistent, the
recommended standard is called out so this skill nudges toward best practice without "fixing" unrelated
existing content.

## File locations (per version)

Version `X.Y` → dir `XY0` under `docs/reference/announcements-release-notes/`:

| Version | Dir    | Release notes           | Announcements           | What's new            |
| ------- | ------ | ----------------------- | ----------------------- | --------------------- |
| 8.10    | `8100` | `8100-release-notes.md` | `8100-announcements.md` | `whats-new-in-810.md` |
| 8.9     | `890`  | `890-release-notes.md`  | `890-announcements.md`  | `whats-new-in-89.md`  |

A new minor's PR also touches `overview.md`, the previous version's announcements, `sidebars.js`, and the
`versioned_docs/` copies — **out of scope for a routine alpha run** (that's the minor-setup PR).

## Release-note entry format

Each alpha is a `## X.Y.0-alphaN` section with a date table, then `### <category>` groupings, then
`#### <feature>` entries:

```md
## 8.10.0-alpha3

| Release date | Changelog(s)                                                                                        | Blog |
| :----------- | :-------------------------------------------------------------------------------------------------- | :--- |
| 07 July 2026 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.10.0-alpha3)</li></ul> | -    |

### Operate

#### Wait states

<!-- https://github.com/camunda/camunda/issues/45040 -->

<div class="release"><span class="badge badge--medium" title="This feature affects Operate">Operate</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster API">Orchestration Cluster API</span></div>

Operate now shows what an active process instance is waiting for. …

<p class="link-arrow">[Wait states](/components/wait-states/overview.md)</p>
```

- **Source-link comment** `<!-- <epic/issue/PR URL> -->` directly under the `####` heading — this is the
  traceability back to the epic. Multiple sources allowed (comma/newline-separated).
- **Component badges** inside `<div class="release">…</div>` — describe _which products_ the feature
  affects. Use `badge--long` for long names, `badge--medium` for short, `title="This feature affects X"`.
  Common values: Self-Managed, SaaS, Orchestration Cluster, Orchestration Cluster API, Operate, Tasklist,
  Web Modeler, Desktop Modeler, Connectors, Optimize, IDP, Camunda Hub, Console, AI agents, Agentic
  orchestration, Java client, Spring SDK, Helm charts. `Early access` (`badge--medium`) for EA features.
- Categories (the `###`) group features, e.g. _Agentic orchestration, APIs & tools, Camunda Hub, IDP,
  Integrations, Modeler, Operate, Optimize, Orchestration Cluster, Helm chart deployment_. Reuse a
  category that already exists in the section; otherwise add a sensible one matching past usage.
- `<p class="link-arrow">[Text](/path.md)</p>` for the "learn more" link to the feature docs.
- If the feature has breaking impact, add a `:::note breaking changes:::` admonition linking to the
  announcements section.
- Release notes use `class=` (not `className=`) — match the file.

## Announcement entry format

Grouped under `## <category>` (8.10 style) with change-type badges. Each entry:

```md
<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### <Title>

<description of the change>

**Action:** <what the user must do before/when upgrading>

<p className="link-arrow">[Link](/path.md)</p>

</div>
</div>
```

- Change-type badges: `badge--new` (New) · `badge--change` (Change) · `badge--breaking-change`
  (Breaking change) · `badge--deprecated` (Deprecated).
- Announcements use `className=` (JSX) — match the file.
- Keep the required section headers even when empty, with a placeholder note
  (`:::note Changes for 8.10 will be added here as the 8.10 documentation is updated.:::`) and the
  commented-out template scaffolding — per the handbook rule. Don't delete empty sections.
- Supported-environment changes (DB/JDK/ES/OS versions, regions) and breaking/deprecation key changes
  live here; cross-link to `supported-environments.md` / update guides where relevant.

## Do-not-touch

- `<!-- RELEASE_LINKS_PLACEHOLDER -->` and the `### Technical Changelogs…` `<details>` block — a bot
  ("🔗 Auto-update release links in release notes") maintains these. Leave them alone.

## Branch / PR / label conventions (for `/create-pr`, Step 9)

Past runs were inconsistent (`8.10-alpha2-release-notes`, `8.10alpha1-release-notes`,
`8-8-alpha6-release-notes`, `89-alpha5-release-notes`; titles `docs(release): …` vs `8.10 alpha1 release
notes`). **Recommended standard:**

- **Branch:** `<version>-<alpha>-release-notes` → e.g. `8.10-alpha3-release-notes`.
- **PR title:** `docs(release): <version>-<alpha> release notes` → e.g. `docs(release): 8.10-alpha3 release notes`.
- **PR body:**

  ```
  ## Description

  8.10-alpha3 release notes as per https://github.com/orgs/camunda/projects/9/views/31.
  Closes <docs tracking issue if one exists>.
  ```

  (plus the standard `.github/pull_request_template.md` checklist)

- **Labels:** `release docs`, `deploy`, and the version label (e.g. `8.10.0-alpha3`).
- **Reviewer:** `@camunda/tech-writers`.
- **Base:** `main`. Add the PR to the `Documentation Team` project (see `/create-pr`).

## Primary release managers (for "who to ask" defaults)

Historically `mesellings`, `giorgionaps`, `alexronquillo`, `afgambin`. Use as suggestions only.
