---
id: index
title: Migration tools
sidebar_label: Migration tools
description: "Learn about the available migration tools."
---

Camunda is invested in supporting and easing your migration from Camunda 7 to Camunda 8 with migration tools. You can use them in two ways:

- **[Agentic migration](#agentic-migration)** (recommended): An AI coding agent orchestrates the tools by running diagram conversion and code refactoring automatically, so you can focus on reviewing changes and rearchitecting your solution.
- **[Manual migration](#migration-tools)**: Run the individual tools yourself for full control or to handle specific migration tasks independently.

All tools are available as **ready-to-use builds** from the [GitHub releases page](https://github.com/camunda/camunda-7-to-8-migration-tooling/releases).

## Agentic migration

The **Camunda migration agent skill** is an AI-driven orchestrator that configures and runs the migration tools on your behalf:

- Runs the [Diagram Converter](./diagram-converter.md) CLI on your BPMN and DMN files to convert diagram syntax and produce a findings report.
- Runs [OpenRewrite recipes](./code-conversion.md#refactoring-recipes-using-openrewrite) to bulk-convert your Java code.
- Uses AI to resolve what the deterministic tools cannot fix automatically, such as review, warning or task findings in diagrams, TODOs in code, custom delegates, test code, and configuration.
- Validates the result and offers to fix remaining issues, waiting for your review before each change.

You focus on the actual rearchitecture of your solution, while the agent handles the tool calls.

### Install and run

If you use an [Agent Skills](https://agentskills.io/)-compatible AI coding agent (such as Claude Code), install it as follows:

```bash
claude plugin marketplace add camunda/camunda-7-to-8-migration-tooling
claude plugin install camunda-migration
```

:::note Install with other agents
The skill follows the open [Agent Skills](https://agentskills.io/) format and works with any compatible agent. See the [Agentic Migration Skills README](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/agentic-migration-skills) for manual installation.
:::

Run from your Camunda 7 project directory:

```text
/camunda-migration:migrate-c7-to-c8-code
```

The skill asks for your migration scope:

| Scope                                      | What the agent does                                                                 |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| **Code + models** _(recommended, default)_ | Runs Diagram Converter CLI + OpenRewrite + AI cleanup on code and diagrams together |
| **Code only**                              | OpenRewrite + AI on Java code                                                       |
| **Models only**                            | Diagram Converter CLI + AI on BPMN/DMN files                                        |
| **Assessment only**                        | Inventories files and estimates effort without changes                              |

### Agent workflow

1. **Assess migration scope**: Inventories BPMN/DMN diagrams and Java code files, and estimates effort.
2. **Convert diagrams**: Runs the Diagram Converter CLI; AI resolves `REVIEW`, `WARNING`, and `TASK` findings.
3. **Migrate code**: Runs OpenRewrite recipes; AI handles TODOs, edge cases, tests, and configuration.
4. **Validate migration results**: Compiles, runs tests, and searches for remaining C7 references.
5. **Fix remaining issues**: Offers to fix remaining issues, and waits for your review before each change.

## Migration tools

Camunda provides the following tools for manual migration:

| Migration tool                                        | Description                                                                                                                                                                     | GitHub link                                                                                                                      |
| :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **[Diagram Converter](./diagram-converter.md)**       | Gain an initial understanding of migration tasks. Available for local installation (Java or Docker) or [hosted as a free SaaS offering](https://diagram-converter.camunda.io/). | [Migration Tooling – Diagram Converter](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/diagram-converter) |
| **[Data Migrator](./data-migrator/)**                 | Copies Camunda 7 runtime instances and history (audit log) to Camunda 8.                                                                                                        | [Migration Tooling – Data Migrator](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/data-migrator)         |
| **[Code Conversion Utilities](./code-conversion.md)** | Mixture of code mapping tables, code conversion patterns, and automatable refactoring recipes.                                                                                  | [Migration Tooling – Code Conversion](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/code-conversion)     |

## Examples

| Example                                                                                                    | Description                                                       | GitHub link                                                                                                   |
| :--------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **[Simple end-to-end example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example)** | Shows all tools in action for a simple Spring Boot Java solution. | [Camunda 7 to 8 migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example) |
