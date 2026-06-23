---
name: create-pr
description: Use when opening a pull request in camunda-docs. Covers reading the PR template, marking applicable checklist items, choosing labels, constructing the gh pr create command with --body-file, and adding the PR to the Documentation Team project.
user-invocable: true
argument-hint: "<brief description of the change>"
---

# /create-pr — open a pull request for camunda-docs

Follow these steps in order. Do not skip or reorder them.

## Step 1: Read the PR template

```bash
cat .github/pull_request_template.md
```

This output is your PR body with two types of changes allowed:

1. Replace the HTML comment block inside `## Description` with the actual description of the change.
2. In `## When should this change go live?` and `## PR Checklist`: check (`[x]`) the items that apply to this PR. Do not add, remove, or reword any checklist items or HTML comments in these sections.

## Step 2: Choose labels

```bash
gh label list
```

Add labels to communicate the component, version, and priority. PRs without labels may be triaged slowly. Select whatever applies to this PR from the available list; include at least one priority label. Also add the `deploy` label for large or complex changes — it triggers a preview at `https://preview.docs.camunda.cloud/pr-<N>/`.

## Step 3: Create the PR

Write the body to a temp file: the template contains backticks and special characters that make inline heredocs unreliable. Then pass it with `--body-file`:

```bash
# Write the full template with the Description filled in and applicable checklist items checked
cat > /tmp/pr-body.md << 'PREOF'
[full PR body here]
PREOF

gh pr create \
  --title "..." \
  --body-file /tmp/pr-body.md \
  --label "CHOSEN_LABEL"
```

For the PR title format, follow the commit message conventions in `.github/instructions/repo.instructions.md` § 4 (Code formatting and commits).

## Step 4: Add to the Documentation Team GitHub Project

```bash
gh pr edit <PR-number> --add-project "Documentation Team"
```

Both PRs and issues should appear in the team's board and backlog.
