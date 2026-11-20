---
name: docs-shorturl
description: Use when someone needs a short URL (docs.camunda.io/p/<slug>) for a docs page or section, for example for a product, course, or printed material. Takes a docs link, proposes a stable slug, confirms it with the user, adds the record to product-links.txt and the redirect to static/.htaccess, and opens a PR.
user-invocable: true
argument-hint: "<docs link, optionally with #anchor>"
---

# /docs-shorturl — add a short URL

Short URLs are human-readable links of the form `https://docs.camunda.io/p/<slug>`. Products, courses, and print materials link to them so the destination can change without a product release.

The person running this skill may not be on the docs team and may not know how the docs repository works. Do the repository work yourself and talk to them in plain language. Don't mention `.htaccess`, redirect rules, frontmatter, versions, or release processes unless they ask. The docs team reviews the PR and handles anything else.

## Input

A single docs link, for example `https://docs.camunda.io/docs/components/saas/clusters/#auto-pause`, with or without an `#anchor`. Ask for it if missing. Do not accept a slug as input. You create the slug.

## Steps

### 1. Resolve the target

1. Convert the link to a repo path. `/docs/<path>/` maps to `docs/<path>.md` or `docs/<path>/index.md`. `/docs/next/<path>/` maps to `docs/next/...`. Find the file.
   - If it doesn't exist, check `static/.htaccess` for a redirect whose source matches the link. The page may have moved or been renamed. Follow the redirect chain to the current page.
   - If the page moved, or the `#anchor` no longer exists in the current page, tell the user in plain terms ("that page was renamed, here is the current one"), find the current equivalent anchor, and use the current page and anchor for the target and slug. The user confirms them in step 3. Never base the slug on the stale link.
   - If you can't find a current equivalent, stop and tell the user.
2. Read the file's frontmatter `id`. If there is none, use the filename without extension. For an `index.md`, use the parent folder name.
3. If there is an `#anchor`, confirm a matching heading exists in the file (or an explicit `{#anchor}` ID). Warn the user if you can't verify it.
4. Build the redirect target as a site-root-relative path, such as `/docs/components/saas/clusters/#auto-pause`. Keep the version segment from the link the user gave (`/docs/next/...` stays `next`).

### 2. Propose a slug

Prefer the **anchor** when one was given. Use the **doc file ID** only when there is no anchor, or when the anchor is too generic to give enough context on its own.

- `<anchor>` (anchor given and specific enough, for example `#auto-pause` becomes `auto-pause`)
- `<doc-id>-<anchor>` (anchor given but too generic, for example `#overview`, `#prerequisites`, `#limitations`, `#configuration`)
- `<doc-id>` (no anchor)

An anchor is specific enough if someone reading only the slug could tell roughly what it links to. Judge by meaning, not length.

Rules:

- Lowercase, hyphen-separated, no slashes, no `p/` prefix.
- Prefer identifiers that survive renames. The doc `id` and heading anchors are more stable than page titles, product names, or feature marketing names. Don't pull words from the page title, the sidebar label, or the surrounding prose.
- Don't add product names (Console, Operate, Optimize, Zeebe, and so on), version numbers, or branding to the slug yourself. Use the anchor or doc ID as written, even if it contains a product or feature name. A specific anchor is always the recommended slug. If the anchor or doc ID contains a product or feature name, you may mention it and offer a neutral alternative, but list it second, never as the recommended option.
- If the doc ID is used and is too generic to be unique or meaningful (for example, `index`, `overview`, `introduction`), use the parent folder name plus the doc ID.
- Keep it short. Drop repeated words (`clusters-clusters`).

Search for conflicts before proposing:

```bash
grep -n "p/<slug>" product-links.txt static/.htaccess
```

If the slug already exists, tell the user and propose a different one.

### 3. Confirm with the user

Use AskUserQuestion. Show the full short URL and the page it will open. Offer the slug from step 2 as the recommended option (first), with an alternative if you have one. If the link was stale, state the current page in the question. The user can always type their own through "Other".

- **Confirmed:** continue to step 4.
- **Rejected:** ask the user what slug they want to use. Validate it against the slug rules and the conflict check, then continue.

Do not edit any file before the slug is confirmed.

### 4. Create a branch

Start from a clean `main` so the PR contains only the short URL change:

```bash
git status --short
git fetch origin main
git switch -c docs/short-url-<slug> origin/main
```

- If `git status --short` shows uncommitted changes, stop and ask the user how to proceed. Never stash, discard, or include unrelated changes.
- If the branch name already exists, append `-2`, `-3`, and so on.

### 5. Add the record to `product-links.txt`

Under the `# Short URLs` heading, add one line with the full short URL. Keep the list alphabetical and keep the blank line before `# Full paths`.

```
https://docs.camunda.io/p/<slug>
```

### 6. Add the redirect to `static/.htaccess`

Under the "Short URLs" banner in section 1 (Universal rules), add the rule after the existing `^p/...` rules, keeping them alphabetical by slug:

```
RewriteRule ^p/<slug>/?$ <target> [R=301,NE,L]
```

- `NE` (no escape) is required so that an `#anchor` isn't URL-encoded. Keep it on every rule for consistency.
- Do not add the rule to any other section.

### 7. Commit and push

Follow the commit conventions in `.github/instructions/repo.instructions.md` § 4.

```bash
git add product-links.txt static/.htaccess
git commit -m "docs(short-url): add <slug> short URL"
git push -u origin HEAD
```

### 8. Open the PR

Open the PR with `/docs-create-pr`, which reads the PR template and applies labels. Apply these settings:

- **Title:** `docs(short-url): add <slug> short URL`.
- **Description:** explain what the PR does in plain sentences. Cover: it adds a short URL, what the short URL is (`https://docs.camunda.io/p/<slug>`), the page it redirects to (and the section, if any), and that it makes two changes: a record in `product-links.txt` under `# Short URLs`, and a redirect in `static/.htaccess` under the "Short URLs" banner. Add why it's needed if the user said.
- **When should this change go live?:** check "There is **no urgency** with this change".
- **PR Checklist:** check the commit history item and the technical writer review item. Leave the other items as they are.
- **Labels:** `dx` and `low prio`.
- **Reviewer:** pass `--reviewer camunda/tech-writers` to `gh pr create`.

Do not add a `deploy` label. Do not backport. Short URL rules are unversioned.

### 9. Report

Tell the user, in plain language:

- The short URL and the page it opens.
- The PR link.
- That the docs team will review it and let them know when it's live. Don't explain the release or maintenance process.

## Rules

- Edit only `product-links.txt` and `static/.htaccess`, and commit only those two files.
- Open the PR only after the slug is confirmed. Never push to `main` directly.
- Don't tell the user to do follow-up docs maintenance, such as updating rules when a version is released. The docs team handles that in internal processes.
- Changing an existing short URL's target is fine. Removing one is not, because products may link to it.
