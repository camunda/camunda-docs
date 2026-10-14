---
id: index
title: Migration tools
sidebar_label: Migration tools
description: "Learn about the available migration tools."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Camunda is invested in supporting and easing your migration from Camunda 7 to Camunda 8 with migration tools. You can use them in two ways:

- **[Agentic migration](#agentic-migration)** (recommended): An AI coding agent uses the Diagram Converter for models and forms, lets you select an AI-first or recipe-assisted Java migration path, and migrates your tests to Camunda Process Test (CPT).
- **[Manual migration](#manual-migration)**: Run the individual tools yourself for full control or to handle specific migration tasks independently.

All tools are available as **ready-to-use builds** from the [GitHub releases page](https://github.com/camunda/camunda-7-to-8-migration-tooling/releases).

## Compare agentic migration and deterministic tools

This table shows which migration tasks agentic migration covers, compared with the deterministic tools that you run yourself in a [manual migration](#manual-migration). Agentic migration also runs these tools, such as the Diagram Converter, where they apply.

| Task                                                           | Agentic migration | Deterministic tools |
| :------------------------------------------------------------- | :---------------: | :-----------------: |
| Inventory Java code and tests, and estimate effort             |        ✅         |         ❌          |
| Analyze and convert BPMN, DMN, and Camunda 7 forms             |        ✅         |         ✅          |
| Create Camunda 8 forms from generated task forms               |        ✅         |         ❌          |
| Migrate Java client code, delegates, and external task workers |        ✅         |         ✅          |
| Migrate process and decision tests to CPT                      |        ✅         |         ❌          |
| Validate the migration and compare test results with Camunda 7 |        ✅         |         ❌          |
| Migrate runtime instances, history, and identity data          |        ❌         |         ✅          |
| Produce the same result for the same input                     |        ❌         |         ✅          |
| Run without an AI coding agent                                 |        ❌         |         ✅          |

## Agentic migration

The **Camunda migration agent skill** is an AI-driven orchestrator that uses the Diagram Converter CLI as the default for BPMN, DMN, and static Camunda 7 form conversion. After it inventories your Java code, you select either an AI-first, pattern-guided path or an optional recipe-assisted path. It also [migrates your process tests](#migrate-process-tests) to CPT.

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

[AWS Transform](https://docs.aws.amazon.com/transform/latest/userguide/custom.html), Amazon's agentic modernization service, runs the same skill as a custom transformation. Instead of installing the skill per developer, you publish it once to your organization's registry and run it with the [`atx` CLI](https://docs.aws.amazon.com/transform/latest/userguide/custom-get-started.html) (Node.js 22 or later, with configured AWS credentials). The source and test projects must be Git repositories with at least one commit.

Check out the tooling and create the transformation from the skill:

```bash
git clone https://github.com/camunda/camunda-7-to-8-migration-tooling.git
cd camunda-7-to-8-migration-tooling/agentic-migration-skills

# Save a private draft to validate first (drafts expire after 30 days)
atx custom def save-draft -n "camunda-7-to-camunda-8-migration" \
  --description "Migrate your Camunda 7 project to Camunda 8" \
  --sd skills/migrate-c7-to-c8-code/

# Run the draft against a test project using the version ID returned above.
cd /path/to/test-camunda-7-project
atx custom def exec -n "camunda-7-to-camunda-8-migration" \
  --tv <draft-version-id> \
  -p . \
  -c "<build-command>"

# Publish the tested draft to your organization for anyone with the required IAM permissions
cd /path/to/camunda-7-to-8-migration-tooling/agentic-migration-skills
atx custom def publish -n "camunda-7-to-camunda-8-migration" \
  --tv <draft-version-id>
```

Replace `<build-command>` with the command for your project, such as `mvn verify` for Maven or `./gradlew build` for Gradle. After you validate the draft, run the published transformation from the project directory. Running by name uses the latest published version, so you don't pass a version ID:

```bash
atx custom def exec -n "camunda-7-to-camunda-8-migration" -p . -c "<build-command>"
```

</TabItem>
</Tabs>

The skill asks for your migration scope:

| Scope                                      | What the agent does                                                                                                                           |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Code + models** _(recommended, default)_ | Uses the Diagram Converter CLI as the default for BPMN, DMN, and Camunda 7 forms, then lets you select a Java migration path after inventory. |
| **Code only**                              | Inventories Java code, then lets you select an AI-first or recipe-assisted path.                                                              |
| **Models only**                            | Uses the Diagram Converter CLI as the default for BPMN, DMN, and Camunda 7 forms.                                                             |
| **Assessment only**                        | Inventories files and estimates effort without changes.                                                                                       |

### Select a Java migration path

After the inventory, select the path that fits your codebase and review capacity:

| Path                                                    | Use when                                                                                               |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **AI-first, pattern-guided** (preferred starting point) | You have a capable coding model and can review source-to-output mappings and behavior.                 |
| **Recipe-assisted** (optional)                          | You have repeated, supported, primarily syntactic transformations, or need a deterministic first diff. |

Run both paths on representative Java code before you use one across a broad migration. A recipe-assisted path can add scaffolding, generated names, TODOs, and cleanup. Neither path guarantees lower token use, cost, or migration time. See [Code Conversion](./code-conversion.md#choose-your-migration-approach) for detailed selection guidance.

### Migrate process tests

The skill migrates Camunda 7 tests to [Camunda Process Test](/apis-tools/testing/getting-started.md) (CPT) in the **Code + models** and **Code only** scopes. A test is in scope when it runs a BPMN process or a DMN decision on a Camunda 7 engine. Test migration needs Camunda 8.9 or later. With target 8.8, the skill lists the tests as **Report only**.

| Camunda 7 tests                                                                                                     | What the skill does          |
| :------------------------------------------------------------------------------------------------------------------ | :--------------------------- |
| Engine test support (`ProcessEngineRule`, `ProcessEngineExtension`, `ProcessEngineTestCase`) and camunda-bpm-assert | Migrates to CPT              |
| Spring Boot and Spring process tests                                                                                | Migrates to CPT              |
| DMN decision tests (`DmnEngineRule`, `DecisionService`)                                                             | Migrates to CPT              |
| Scenario tests (camunda-platform-scenario)                                                                          | Migrates to CPT              |
| Tests that drive a running Camunda 7 engine through REST or the external task client                                | Migrates to CPT              |
| BDD layers such as Cucumber and JGiven, Arquillian, CDI, and Quarkus extension tests                                | Reports for manual migration |
| CMMN tests and tests that depend on engine internals                                                                | Reports for manual redesign  |

The skill also migrates the mocks in these tests, such as camunda-platform-7-mockito and `Mocks` registrations, and by default mocks the same components in CPT. The **Test Inventory** in `MIGRATION_REPORT.md` lists each test with its handling. Tests that the skill doesn't migrate appear as **Report only**, with the reason. Unit tests that don't run an engine, such as delegate or worker unit tests, aren't part of test migration. The skill updates them as ordinary code.

If at least one test can be migrated, the skill asks after the inventory whether to run the tests:

| Option                        | What the skill does                                                                                                                                                                             |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Run tests** _(recommended)_ | Runs the Camunda 7 tests before it changes any code, test, or model, and records the results as a baseline. Migrates the tests, runs the CPT tests, and compares the results with the baseline. |
| **Migrate tests only**        | Migrates and compiles the tests, but runs no tests. `MIGRATION_REPORT.md` marks the tests as not verified, reports `NOT READY`, and lists the steps to verify them later.                       |

With **Run tests**, the skill migrates and freezes the tests before it migrates the production code. The validation gate in `MIGRATION_REPORT.md` reports `NOT READY` unless these safeguards hold:

- Each Camunda 7 test that passed maps to a CPT test that passes, or you approve its removal.
- A frozen test changes only with your approval.
- A new mock replaces behavior that ran for real on Camunda 7 only with your approval.
- Two CPT runs give the same results.
- The CPT tests cover at least the process elements that the Camunda 7 tests covered, if your project measured Camunda 7 coverage.

The **Test Parity** table in `MIGRATION_REPORT.md` lists each Camunda 7 test with its result and the results of its CPT tests. CPT starts the Camunda 8 runtime in Docker by default, so running the tests needs Docker or a [remote runtime](/apis-tools/testing/configuration.md#remote-runtime).

### Agent workflow

1. **Assess migration scope**: Inventories BPMN/DMN diagrams, Camunda 7 `.form` files, Java code files, and Camunda 7 tests, and estimates effort. If the agent can migrate tests, it asks whether to [run them](#migrate-process-tests).
2. **Convert models and forms**: Runs the Diagram Converter CLI as the default. Review converted models and `REVIEW`, `WARNING`, and `TASK` findings. Do not use AI-only model conversion as the default because model capability can materially affect output and silently change model semantics.
3. **Select and migrate code**: After inventory, select an AI-first, pattern-guided path or an optional recipe-assisted path. AI-first migration reads source code and patterns directly. Recipe-assisted migration produces a deterministic first diff for repeated, supported, primarily syntactic transformations, then needs AI or manual cleanup. The agent also migrates the in-scope tests to CPT.
4. **Validate migration results**: Compiles, runs tests, searches for remaining C7 references, verifies converted forms and model findings, and reviews source-to-output mappings and behavior. With **Run tests**, it compares the CPT test results with the Camunda 7 baseline in the **Test Parity** table. With **Migrate tests only**, it compiles the tests but runs no test suite.
5. **Fix remaining issues**: Offers to fix remaining issues, and waits for your review before each change.

The agent also handles static and generated Camunda 7 forms by creating or adapting standard Camunda 8 forms and linking them from the converted BPMN models. Unsupported validation rules and ambiguous behavior are flagged for review.

The agent can use the flat `analysis-results.json` report generated by the CLI's `--json` option or the web interface's **Download JSON** action. It groups findings by category, checks the target platform version, and cross-references model findings with migrated code before suggesting fixes. See [Download JSON analysis results](./diagram-converter.md#download-json-analysis-results).

Before it uses AI for Java changes or model findings, the agent checks whether the active model is suitable for complex reasoning. Select a capable model, but review remains mandatory because model quality materially affects the output.

If it finds no local BPMN or DMN models, the agent can use the Diagram Converter's engine mode to retrieve the latest definitions from an accessible Camunda 7 REST endpoint. It asks for the endpoint and authentication details and does not request engine access when local models are available.

The agent preserves the original model files, avoids using stale reports or overwriting existing output, and records findings and decisions in `MIGRATION_REPORT.md`. It asks for confirmation before adding deployment configuration for the converted resources.

## Manual migration

Camunda provides the following tools for manual migration:

| Migration tool                                        | Description                                                                                                                                                                            | GitHub link                                                                                                                     |
| :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **[Diagram Converter](./diagram-converter.md)**       | Analyze and convert BPMN, DMN, and Camunda 7 form files. Available for local installation (Java or Docker) or [hosted as a free SaaS offering](https://diagram-converter.camunda.io/). | [Migration Tooling: Diagram Converter](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/diagram-converter) |
| **[Data Migrator](./data-migrator/)**                 | Copies Camunda 7 runtime instances and history (audit log) to Camunda 8.                                                                                                               | [Migration Tooling: Data Migrator](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/data-migrator)         |
| **[Code Conversion Utilities](./code-conversion.md)** | Mixture of code mapping tables, code conversion patterns, and automatable refactoring recipes.                                                                                         | [Migration Tooling: Code Conversion](https://github.com/camunda/camunda-7-to-8-migration-tooling/tree/main/code-conversion)     |

## Examples

| Example                                                                                                    | Description                                                       | GitHub link                                                                                                   |
| :--------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **[Simple end-to-end example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example)** | Shows all tools in action for a simple Spring Boot Java solution. | [Camunda 7 to 8 migration example](https://github.com/camunda-community-hub/camunda-7-to-8-migration-example) |
