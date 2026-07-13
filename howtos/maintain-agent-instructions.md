# Maintain AI instruction files

This repo includes several files that AI agents and LLMs use when they interact with the codebase or the published documentation. These files drift over time as the repo evolves, so they need periodic maintenance to stay accurate.

## Files covered

| File                                           | Purpose                                                                                               |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `AGENTS.md`                                    | Entry point for AI coding agents. Points to the instruction files below.                              |
| `CLAUDE.md`                                    | Claude-specific entry point. Defers to `AGENTS.md` and adds Claude-only guardrails.                   |
| `.github/copilot-instructions.md`              | GitHub Copilot instructions for code review and Copilot Chat.                                         |
| `.github/instructions/content.instructions.md` | Language, grammar, formatting, and product terminology rules.                                         |
| `.github/instructions/repo.instructions.md`    | File naming, repo structure, PR workflow, and build commands.                                         |
| `static/llms.txt`                              | Curated section index for AI agents consuming the published docs. Committed manually — not generated. |
| `docusaurus.config.js` (plugin section)        | Configuration for `docusaurus-plugin-llms`, which generates `llms-full.txt` and the section files.    |

## Maintenance process

Keeping these files accurate requires the following complementary layers: automated event-driven triggers and periodic human review.

### Layer 1: Event-driven PR label

When a PR touches one of the source files that instruction files consume, a GitHub Actions workflow adds a `review-agent-instructions` label to that PR and posts a short reminder comment. This prompts the PR author to check whether any instruction file needs updating.

The workflow lives at `.github/workflows/review-agent-instructions.yml`. It skips Renovate, Dependabot, and the docs PR automation bot, and posts the reminder comment only once per PR. Reviewers can remove the label when nothing in the instruction files needs to change.

This approach adds no overhead when nothing relevant changes.

### Layer 2: Recurrent audit

The docs team performs a recurrent audit as part of the docs housekeeping tasks:

#### Check instruction files are consistent

1. Check `.github/instructions/repo.instructions.md` is consistent with repo workflows and guidelines in the `howtos/` guides.
2. Check rules in `.github/instructions/content.instructions.md` are consistent with `howtos/technical-writing-styleguide.md`.
3. Check for contradictions across agent instruction files. If two files say different things about the same behavior, reconcile them so agents receive consistent guidance.

#### Run AI-ready benchmarks

1. Run this AI-ready benchmark to assess how well the site's structure, metadata, and content serve AI agents:

```bash
npx afdocs check https://docs.camunda.io --format scorecard
```

You can also use this benchmark: https://buildwithfern.com/agent-score. See [AI-ready documentation research](https://github.com/camunda/documentation-team/issues/507) for more context.

2. Run this AI-search readiness benchmark to audit, optimize, and track whether AI agents can crawl, understand, and cite the site:

```bash
uvx --from geo-optimizer-skill geo audit --url https://docs.camunda.io
```

This runs the [geo-optimizer-skill](https://github.com/Auriti-Labs/geo-optimizer-skill) GEO audit, which scores the site against 8 AI-readiness categories (requires [`uv`](https://docs.astral.sh/uv/getting-started/installation/)).

3. Address or file potential improvements based on the benchmark results.

#### Audit llms.txt files

1. **`llms-full.txt`**: Check the file size. If it grows above 10 MB, agents may truncate it. Consider splitting large sections with additional `customLLMFiles` entries in `docusaurus.config.js`.
2. **`docusaurus-plugin-llms` config** in `docusaurus.config.js`: Check it reflects the current documentation structure: `customLLMFiles` patterns are accurate, `ignoreFiles` is still relevant.
3. **`static/llms.txt`**: Verify the section index links match the current documentation structure. Update this file when major sections are added or removed.
