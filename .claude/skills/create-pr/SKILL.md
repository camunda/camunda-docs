---
name: create-pr
description: Use when opening a pull request in camunda-docs. Covers reading the PR template, marking applicable checklist items, choosing labels, constructing the gh pr create command with --body-file, and adding the PR to the Documentation Team project.
user-invocable: true
argument-hint: "<brief description of the PR>"
---

# /create-pr — open a pull request for camunda-docs

Follow these steps in order. Do not skip or reorder them.

## Step 0: Verify branch state

1. Check the current branch:

```bash
git branch --show-current
```

If the result is `main`, derive a short kebab-case branch name from the PR description (e.g. `docs/add-connector-timeout-config`), then create it, switch to it, and push:

```bash
git checkout -b <derived-branch-name>
git push -u origin HEAD
```

Then continue to Step 1.

2. Check whether the branch has an upstream:

```bash
git status -sb
```

If the output shows `## <branch>...origin/<branch>`, the branch is already pushed. Proceed to Step 1. Otherwise push it now:

```bash
git push -u origin HEAD
```

## Step 1: Read the PR template

1. Read the PR template at `.github/pull_request_template.md`:

```bash
cat .github/pull_request_template.md
```

2. Replace the HTML comment block inside `## Description` with the description of the changes the PR introduces.

3. In `## When should this change go live?` and `## PR Checklist`, check (`[x]`) the items that apply to this PR. Do not add, remove, or reword any checklist items or HTML comments in these sections.

## Step 2: Add labels

1. List all the available labels in the repo:

```bash
gh label list
```

2. Add any labels that apply to this PR to communicate the component, version, and priority. PRs without labels may be triaged slowly.

3. Add the `deploy` label to trigger a preview site deployment. Do this only for large or complex changes, or when the PR author explicitly requests it.

## Step 3: Create the PR

1. Write the body to a temp file: the template contains backticks and special characters that make inline heredocs unreliable.

2. Pass it with `--body-file` and capture the URL from stdout:

```bash
cat > /tmp/pr-body.md << 'PREOF'
[full PR body here]
PREOF

PR_URL=$(gh pr create \
  --title "..." \
  --body-file /tmp/pr-body.md \
  --label "CHOSEN_LABEL")
echo "$PR_URL"
```

3. Follow the commit message conventions in `.github/instructions/repo.instructions.md` § 4 (Code formatting and commits) for the PR title format.

4. Add the PR to the Documentation Team GitHub project using the URL captured above:

```bash
gh pr edit "$PR_URL" --add-project "Documentation Team"
```
