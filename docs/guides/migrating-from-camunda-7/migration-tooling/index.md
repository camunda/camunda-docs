---
id: index
title: Migration tools
sidebar_label: Migration tools
description: "Learn about the available migration tools."
---

Camunda is invested in supporting and easing your migration from Camunda 7 to Camunda 8 with migration tools. You can use them in two ways:

- **[Agentic migration](#agentic-migration)** (recommended): An AI coding agent orchestrates diagram conversion, form migration, and code refactoring automatically, so you can focus on reviewing changes and rearchitecting your solution.
- **[Manual migration](#migration-tools)**: Run the individual tools yourself for full control or to handle specific migration tasks independently.

All tools are available as **ready-to-use builds** from the [GitHub releases page](https://github.com/camunda/camunda-7-to-8-migration-tooling/releases).

## Agentic migration

The **Camunda migration agent skill** is an AI-driven orchestrator that runs the migration tools on your behalf. It converts BPMN, DMN, and static Camunda 7 form definitions, then guides you through findings and required code changes.

### Install

Choose the installation instructions for your AI coding agent.

#### Claude Code

Install the skill with Claude Code:

```bash
claude plugin marketplace add camunda/camunda-7-to-8-migration-tooling
claude plugin install camunda-migration
```

#### GitHub Copilot CLI

Install the skill with GitHub Copilot CLI:

```bash
copilot plugin marketplace add camunda/camunda-7-to-8-migration-tooling
copilot plugin install camunda-migration@camunda
```

#### Other compatible agents

Use GitHub CLI 2.90 or later to install the skill for another compatible agent:

```bash
gh skill install camunda/camunda-7-to-8-migration-tooling migrate-c7-to-c8-code --agent <tool-name>
```

Replace `<tool-name>` with the name of your agent. See the [agent-specific installation commands](https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/agentic-migration-skills/README.md#install-commands-for-other-agents) for supported values. For manual installation paths, see the [Agentic Migration Skills README](https://github.com/camunda/camunda-7-to-8-migration-tooling/blob/main/agentic-migration-skills/README.md#manual-installation).

### Run

From your Camunda 7 project directory, run the migration skill:

```text
/camunda-migration:migrate-c7-to-c8-code
```

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

### Review forms with the migration agent

The migration agent uses the Diagram Converter for static Camunda 7 form files and handles generated Task Forms during the agentic migration flow.

- Every Camunda 7 or generated form must become a standard Camunda 8 form linked from the converted BPMN.
- The agent can create or adapt a standard Camunda 8 form for generated Task Forms. Unsupported validation rules and ambiguous behavior remain explicit review items.
- Use [Build forms with Modeler](/components/modeler/forms/utilizing-forms.md) to create and link a standard Camunda 8 form.

For advanced form migrations, the agent inventories static and generated forms, carries converted form findings into the migration report, and creates or adapts a standard Camunda 8 form when automatic conversion is unsafe.

The agent can consume the flat `analysis-results.json` report produced by the CLI `--json` option or the web interface's **Download JSON** action. It groups findings by category, checks the target platform version, and cross-references model findings with migrated code before suggesting fixes. See [Download JSON analysis results](./diagram-converter.md#download-json-analysis-results).

Before AI-only rewrites or AI cleanup, the agent checks whether the active model is suitable for complex reasoning. If the model is lightweight or cannot be verified, you can switch models or continue with extra review.

If no local BPMN or DMN models are found, the agent can use Diagram Converter engine mode to fetch the latest definitions from a reachable Camunda 7 REST endpoint. It asks for the endpoint and authentication, and does not request engine access when local models are present.

The agent preserves original model files, avoids consuming stale reports or overwriting existing outputs, and records findings and decisions in `MIGRATION_REPORT.md`. It asks before adding deployment wiring for converted resources.

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
