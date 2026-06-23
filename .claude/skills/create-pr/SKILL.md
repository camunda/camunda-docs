---
name: create-pr
description: Use when opening a pull request in camunda-docs. Covers reading the PR template, choosing the correct priority label, and constructing the gh pr create command with --body-file to avoid heredoc quoting issues.
user-invocable: true
argument-hint: "<brief description of the change>"
---

# /create-pr — open a pull request for camunda-docs

Follow these steps in order. Do not skip or reorder them.

## Step 1: Read the PR template

```bash
cat .github/pull_request_template.md
```

This output is your PR body, verbatim. The only permitted change: replace the HTML comment block inside `## Description` with the actual description of the change. Do not modify `## When should this change go live?`, `## PR Checklist`, any checklist items, or any HTML comments outside of `## Description`.

## Step 2: Choose at least one label

Every PR must carry at least one priority label. Pick from this table:

| Label                      | When to use                                                             |
| -------------------------- | ----------------------------------------------------------------------- |
| `bug`                      | Bug fix or correction to existing docs                                  |
| `support`                  | Security concern or urgent release needed                               |
| `available & undocumented` | Feature already shipped but undocumented; should release within a week  |
| `hold`                     | On a specific schedule; assignee coordinates release with the Docs team |
| `alpha`                    | Part of a scheduled alpha release                                       |
| `minor`                    | Part of a scheduled minor release                                       |
| `low prio`                 | No urgency                                                              |

Also add when applicable:

- `deploy` — large or complex changes; triggers a preview at `https://preview.docs.camunda.cloud/pr-<N>/`
- `dx` — docs-infrastructure changes (workflows, npm packages)

## Step 3: Create the PR

Write the body to a temp file: the template contains backticks and special characters that make inline heredocs unreliable. Then pass it with `--body-file`:

```bash
# Write the full template with only the Description section filled in
cat > /tmp/pr-body.md << 'PREOF'
## Description

<your description here>

## When should this change go live?

[paste remaining sections from .github/pull_request_template.md verbatim]
PREOF

gh pr create \
  --title "{type}(scope): {description in present tense}" \
  --body-file /tmp/pr-body.md \
  --label "CHOSEN_LABEL"
```

The title must follow the commit message format: `{type}(scope): {description}`. Valid types: `docs`, `fix`, `feat`, `chore`, `refactor`, `deps`, `ci`. Present tense, 72–120 characters.
