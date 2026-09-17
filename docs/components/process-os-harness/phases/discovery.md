---
id: discovery
title: Discover the as-is process
sidebar_label: Discovery
description: "The discovery phase runs parallel specialists across internal and public sources to build a faithful as-is process description and BPMN, then closes gaps with SMEs."
keywords: ["ProcessOS Harness", "discovery", "discovery specialists", "as-is"]
---

Discovery builds a faithful picture of how a process runs today. ProcessOS Harness researches your organizational knowledge with parallel specialists, generates as-is process descriptions and BPMN diagrams, and closes the remaining gaps with SMEs.

Discovery quality sets the ceiling for everything that follows. A transformation can only be as good as the as-is process it starts from, so treat this phase as the one worth extra iterations.

## Run discovery

```text
/process-os-process-discovery
```

The skill runs iteratively. Specialists fan out in parallel, results are assessed for coverage, and the run repeats until coverage is good enough or the iteration limit in `run.config.yaml` is reached.

## Discovery specialists

A specialist is a skill that tells the AI coding agent how to extract insights from one kind of source. ProcessOS Harness ships with three built-in specialists.

| Specialist   | What it searches                                                   |
| ------------ | ------------------------------------------------------------------ |
| `web`        | Public web, API documentation, and product documentation.          |
| `filesystem` | Local files, including Markdown, PDF, BPMN, CSV, and spreadsheets. |
| `github`     | Issues, pull requests, and commit history. Requires the `gh` CLI.  |

Activate specialists through the `specialists` setting in `run.config.yaml`. The `source-mode` setting controls how the filesystem specialist treats the files you list: `hint` reads them first and then searches more broadly, while `allowlist` reads only those files.

### Add client-specific specialists

Specialists for your own systems, such as SAP, Salesforce, or an internal knowledge base, ship as plugins from a git repository your organization owns.

```text
/process-os-discovery-plugin install <git-repo-url> [<ref>]
/process-os-discovery-plugin update <name>
```

Installed plugins land in `.camunda/plugins/`, and their specialists run alongside the built-ins on the next discovery run.

## Choose the right data sources

Discovery succeeds or fails on what you point it at. Favor sources that describe how the process actually runs over sources that describe how it's supposed to run.

- Prefer primary artifacts, such as exported legacy process definitions, production configuration, and real forms, over summary slide decks.
- Include the systems the process touches, not just the process description, so integration points surface early.
- Provide recent material. Documentation describing a version of the process no longer in use produces a confident but wrong as-is model.
- Name the known gaps in `process-scope.md`. Telling ProcessOS Harness what's missing is more useful than letting it infer the gap later.

Check what you're allowed to share before you point a specialist at a source, described in [handle project data safely](../best-practices/data-handling.md).

## Map the system context

After discovery has produced output, map the external systems and manual artifacts the process integrates with:

```bash
/process-os-system-context
```

The skill only reads discovery documents and as-is BPMN files, and never edits them. It produces `system-context-overview.bpmn` with one collapsed pool per external system, `system-context-linked.bpmn` with a per-activity integration map, and a `system-context.md` index.

Use `--input` and `--output` to read from or write to a different directory. Both default to `process-discovery`.

## Close gaps with SMEs

Discovery produces open questions wherever your sources are silent. Collect answers and fold them back in:

```text
/process-os-sme-feedback
/process-os-process-discovery --feedback
/process-os-review-answer-application
```

The phase ends when SMEs sign off on the as-is process. For how the review loop works in detail, see [review generated results with SMEs](../get-started/review-cycle.md).

## Next step

Continue with [transform the process to a to-be design](transformation.md).
