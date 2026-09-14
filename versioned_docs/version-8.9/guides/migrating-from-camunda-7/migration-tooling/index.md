---
id: index
title: Migration tools
sidebar_label: Migration tools
description: "Learn about the available migration tools."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Camunda is invested in supporting and easing your migration from Camunda 7 to Camunda 8 with migration tools. You can use them in two ways:

- **[Agentic migration](#agentic-migration)** (recommended): An AI coding agent orchestrates diagram conversion, form migration, and code refactoring automatically, so you can focus on reviewing changes and rearchitecting your solution.
- **[Manual migration](#manual-migration)**: Run the individual tools yourself for full control or to handle specific migration tasks independently.

All tools are available as **ready-to-use builds** from the [GitHub releases page](https://github.com/camunda/camunda-7-to-8-migration-tooling/releases).

## Agentic migration

The **Camunda migration agent skill** is an AI-driven orchestrator that runs the migration tools on your behalf. It converts BPMN, DMN, and static Camunda 7 form definitions, then guides you through findings and required code changes.

You can run the skill with an AI coding agent such as Claude Code or GitHub Copilot CLI, or publish it to your organization as an [AWS Transform](https://docs.aws.amazon.com/transform/latest/userguide/custom.html) custom transformation. The setup and run command differ by agent, but the migration flow is the same.

### Set up and run

Set up your agent, then run the skill from your Camunda 7 project directory. Every agent runs the same [agent workflow](#agent-workflow).

<Tabs groupId="agentic-migration-agent">
<TabItem value="claude-code" label="Claude Code">

Install the skill:

```bash
claude plugin marketplace add camunda/camunda-7-to-8-migration-tooling
claude plugin install camunda-migration
```

Run it:

```text
/camunda-migration:migrate-c7-to-c8-code
```

</TabItem>
<TabItem value="copilot-cli" label="GitHub Copilot CLI">

Install the skill:

```bash
copilot plugin marketplace add camunda/camunda-7-to-8-migration-tooling
copilot plugin install camunda-migration@camunda
```

Run it:

```text
/camunda-migration:migrate-c7-to-c8-code
```

</TabItem>
<TabItem value="other-agents" label="Other compatible agents">

Use GitHub CLI 2.90 or later to install the skill:

```bash
gh skill install camunda/camunda-7-to-8-migration-tooling migrate-c7-to-c8-code --agent <tool-name>
```

Replace `<tool-name>` with the name of your agent. See the [agent-specific installation commands](https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/agentic-migration-skills/README.md#install-commands-for-other-agents) for supported values. For manual installation paths, see the [Agentic Migration Skills README](https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/agentic-migration-skills/README.md#manual-installation).

Then run the `migrate-c7-to-c8-code` skill from your project directory using your agent's command.

</TabItem>
<TabItem value="aws-transform" label="AWS Transform">

[AWS Transform](https://docs.aws.amazon.com/transform/latest/userguide/custom.html), Amazon's agentic modernization service, runs the same skill as a custom transformation. Instead of installing the skill per developer, you publish it once to your organization's registry and run it with the [`atx` CLI](https://docs.aws.amazon.com/transform/latest/userguide/custom-get-started.html) (Node.js 22 or later, with configured AWS credentials).

Check out the tooling and create the transformation from the skill:

```bash
git clone https://github.com/camunda/camunda-7-to-8-migration-tooling.git
cd camunda-7-to-8-migration-tooling/agentic-migration-skills

# Save a private draft to validate first (drafts expire after 30 days)
atx custom def save-draft -n "camunda-7-to-camunda-8-migration" \
  --description "Migrate your Camunda 7 project to Camunda 8" \
  --sd skills/migrate-c7-to-c8-code/

# Publish to your organization for anyone with the required IAM permissions
atx custom def publish -n "camunda-7-to-camunda-8-migration" \
  --sd skills/migrate-c7-to-c8-code/
```

Run the published transformation. Running by name uses the latest published version, so you don't pass a version ID:

```bash
atx custom def exec -n "camunda-7-to-camunda-8-migration" -p . -c "mvn verify"
```

</TabItem>
</Tabs>

The skill asks for your migration scope:

| Scope                                      | What the agent does                                                                                 |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| **Code + models** _(recommended, default)_ | Runs Diagram Converter CLI + OpenRewrite + AI cleanup on code, BPMN/DMN models, and Camunda 7 forms |
| **Code only**                              | OpenRewrite + AI on Java code                                                                       |
| **Models only**                            | Diagram Converter CLI + AI on BPMN/DMN models and Camunda 7 forms                                   |
| **Assessment only**                        | Inventories files and estimates effort without changes                                              |

### Agent workflow

1. **Assess migration scope**: Inventories BPMN/DMN diagrams, Camunda 7 `.form` files, and Java code files, and estimates effort.
2. **Convert models and forms**: Runs the Diagram Converter CLI; AI groups and resolves `REVIEW`, `WARNING`, and `TASK` findings.
3. **Migrate code**: Runs OpenRewrite recipes; AI handles TODOs, edge cases, tests, and configuration.
4. **Validate migration results**: Compiles, runs tests, searches for remaining C7 references, and verifies converted forms and model findings.
5. **Fix remaining issues**: Offers to fix remaining issues, and waits for your review before each change.

The agent also handles static and generated Camunda 7 forms by creating or adapting standard Camunda 8 forms and linking them from the converted BPMN models. Unsupported validation rules and ambiguous behavior are flagged for review.

The agent can use the flat `analysis-results.json` report generated by the CLI’s `--json` option or the web interface’s **Download JSON** action. It groups findings by category, checks the target platform version, and cross-references model findings with migrated code before suggesting fixes. See [Download JSON analysis results](./diagram-converter.md#download-json-analysis-results).

Before performing AI-only rewrites or cleanup, the agent checks whether the active model is suitable for complex reasoning. If the model is lightweight or its suitability cannot be verified, you can switch models or continue with additional review.

If it finds no local BPMN or DMN models, the agent can use the Diagram Converter’s engine mode to retrieve the latest definitions from an accessible Camunda 7 REST endpoint. It asks for the endpoint and authentication details and does not request engine access when local models are available.

The agent preserves the original model files, avoids using stale reports or overwriting existing output, and records findings and decisions in `MIGRATION_REPORT.md`. It asks for confirmation before adding deployment configuration for the converted resources.

## Manual migration

Camunda provides the following tools for manual migration:

| Migration tool                                        | Description                                                                                                                                                                            | GitHub link                                                                                                                      |
| :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **[Diagram Converter](./diagram-converter.md)**       | Analyze and convert BPMN, DMN, and Camunda 7 form files. Available for local installation (Java or Docker) or [hosted as a free SaaS offering](https://diagram-converter.camunda.io/). | [Migration Tooling – Diagram Converter](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/diagram-converter) |
| **[Data Migrator](./data-migrator/)**                 | Copies Camunda 7 runtime instances and history (audit log) to Camunda 8.                                                                                                               | [Migration Tooling – Data Migrator](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/data-migrator)         |
| **[Code Conversion Utilities](./code-conversion.md)** | Mixture of code mapping tables, code conversion patterns, and automatable refactoring recipes.                                                                                         | [Migration Tooling – Code Conversion](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/code-conversion)     |

## Examples

| Example                                                                                                    | Description                                                       | GitHub link                                                                                                   |
| :--------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **[Simple end-to-end example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example)** | Shows all tools in action for a simple Spring Boot Java solution. | [Camunda 7 to 8 migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example) |
