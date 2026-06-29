---
name: backport
description: Use when applying a docs change to one or more older versioned releases. Covers finding equivalent files across versions, handling doc ID divergence, updating versioned sidebars, and PR conventions for backports.
user-invocable: true
argument-hint: "<description of the change to backport, or the PR/branch it came from>"
---

# /backport — backport a docs change to older versions

**Only proceed when the PR author has explicitly requested a backport.** Do not decide to backport on their behalf. If it is unclear which versions to target, ask before touching any files.

Applies an existing change (already made in `docs/` or a versioned folder) to one or more older versioned releases.

## 1. Identify what to backport

Before touching any file, confirm:

- **What changed**: list the files modified in the source change (content edits, new pages, sidebar additions, `.htaccess` redirects).
- **Why it applies to older versions**: bug fixes, clarifications, and corrections to already-shipped features are backport candidates. Content for unreleased features is not.
- **Which versions**:
  - Use `versions.json` in the repo root to identify maintained versions.
  - For each candidate version, verify that the feature was available in that release by checking release context (for example, release notes or the release timeline). Do not rely only on file presence.
  - Do not backport to unmaintained versions. If a user explicitly requests one, explain that no `versioned_docs/version-<N>/` folder exists for it.

## 2. Find the equivalent file in each target version

Doc IDs can diverge across versions: the same conceptual page may have been renamed or moved when a section was restructured. Do not assume a path from one version exists in another.

For each target version:

1. Check whether the source file path exists in `versioned_docs/version-<N>/`.
2. If not, search by page title or a distinctive heading or paragraph from the source file.
3. If the page does not exist in that version at all, skip that version for this file and note the gap.

## 3. Apply the change

- Copy the content edit faithfully. Do not adapt for version differences unless the content references a feature or API that did not exist in that version.
- If the source change added a **new page**: create the file in the target version folder and add its doc ID to `versioned_sidebars/version-<N>-sidebars.json` at the same position in the hierarchy. Also copy any co-located image or asset files (for example, an `img/` or `assets/` subdirectory alongside the page). Images referenced by the page must exist in each version folder where the page lives.
- If the source change added a **redirect** to `static/.htaccess`: the redirect already covers all versions (`.htaccess` is not versioned). No action needed.
- If the source change updated a **sidebar entry** (rename, reorder): apply the equivalent edit to `versioned_sidebars/version-<N>-sidebars.json`.

## 4. Validation

Follow the build and validation rules in `repo.instructions.md`, section 5.

## 5. Commit and PR conventions

Follow the commit rules in `repo.instructions.md`, section 4, with the following specifications:

**Commit message**: same format as any other change, but call out the version in the scope. For example:

```
docs(version-8.8): backport REST connector polling guide from 8.9
fix(version-8.7,version-8.8): correct filter description for process instance variables
```

**PR description**: state clearly which versions are included and link to the source PR or commit. For example:

```
Backports #9050 to 8.8 and 8.7. Applies the corrected filter description for process instance variables. No structural changes; content-only edit.
```

**Labels**: apply the version labels for each version included in the backport (for example, `version:8.8`, `version:8.7`) in addition to any component label.
