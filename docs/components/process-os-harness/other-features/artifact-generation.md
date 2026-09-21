---
id: artifact-generation
title: Generate Camunda artifacts
sidebar_label: Artifact generation
description: "ProcessOS Harness generates BPMN diagrams, DMN tables, Camunda Forms, and job workers from a chosen transformation tier, controlled by run configuration settings."
keywords:
  ["ProcessOS Harness", "artifact generation", "BPMN", "DMN", "job workers"]
---

Artifact generation produces the Camunda files that make a solution executable. It's used across phases rather than only at the end, because both discovery and transformation generate diagrams before anything is implemented.

```text
/process-os-artifact-generation
```

Generated artifacts land in `artifacts/`. For how tiers are resolved and how generation fits the implementation phase, see [implement the Camunda solution](../phases/3-implementation.md).

## What gets generated

| Artifact      | Notes                                                       |
| ------------- | ----------------------------------------------------------- |
| BPMN diagrams | Fully laid out, and generated from the process description. |
| DMN tables    | Generated for the decisions found in the process.           |
| Camunda Forms | Generated as `.form` JSON for user tasks.                   |
| Job workers   | Generated from a blueprint for your target SDK.             |

Every tier carries per-phase companion documents in `transformation/<tier>/`, which generation uses to infer intent. The companion file for a diagram is always at `transformation/<tier>/<stem>.md`.

## Control BPMN generation

BPMN output is shaped by settings in `run.config.yaml`.

| Setting          | Values                      | Effect                                                                                                    |
| ---------------- | --------------------------- | --------------------------------------------------------------------------------------------------------- |
| `size`           | `auto`, `s`, `m`, `l`, `xl` | Controls diagram layout density. Defaults to `auto`.                                                      |
| `width`, `depth` | `s`, `m`, `l`, `xl`         | Per-axis overrides, derived from `size` when unset.                                                       |
| `bpmn-mode`      | `strategic`, `automatable`  | Diagram fidelity. Transformation defaults to `automatable`. This is a different axis from the run `mode`. |
| `decomposition`  | `per-phase`, `single`       | Generates one file per phase, or one combined file.                                                       |
| `edge-cases`     | `standalone`, `skip`        | Gives edge cases their own diagrams, or omits them.                                                       |

Use `strategic` fidelity when a diagram is for a discussion with stakeholders, and `automatable` when it's headed for implementation. Generating a strategic diagram and then trying to execute it is the more common mistake.

## Choose a target SDK

The `target-sdk` setting selects the blueprint for worker generation.

| Value              | Support                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------ |
| `java-spring-boot` | Fully implemented, including blueprint, generated worker layer, and a build gate. Default. |
| `typescript`       | Fully implemented.                                                                         |
| `python`           | Fully implemented.                                                                         |
| `java`             | Reserved. Generation reports each missing capability by name instead of failing.           |
| `csharp`           | Reserved. Generation reports each missing capability by name instead of failing.           |

For a reserved SDK, the BPMN, DMN, and forms bundle is still generated, because that part doesn't depend on the SDK. Only the worker application is skipped.

## Scaffold individual artifacts

You don't have to generate a whole tier to get one file. These skills produce a single artifact on demand.

| Command                                  | What it generates                                                                 |
| ---------------------------------------- | --------------------------------------------------------------------------------- |
| `/process-os-agent-process-scaffolding`  | A Camunda 8 agentic process with an AI Agent connector and an ad-hoc sub-process. |
| `/process-os-form-execution-scaffolding` | A Camunda Form as `.form` JSON for a user task.                                   |

## Review generated files

| Command                          | What it does                                                                                                    |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `/process-os-file-viewer [file]` | Open BPMN, DMN, or form files in a browser-based viewer.                                                        |
| `/process-os-web-modeler-sync`   | Sync explicit file paths with a governed Web Modeler project to create, upload, version, compare, and download. |

BPMN generation uses snapshotting and doesn't overwrite silently, so you can compare a new version against the previous one instead of losing it.

## Reduce generation cost

Several settings trade completeness for speed and tokens, which is useful for demos and large source sets.

| Setting               | Effect when enabled                                                                     |
| --------------------- | --------------------------------------------------------------------------------------- |
| `compact-specialists` | Specialists write bullet-point summaries instead of full tables and sections.           |
| `skip-provenance`     | Skips writing `process-discovery/provenance.md`, which traces findings back to sources. |
| `skip-bpmn-docs`      | Skips the `PROCESSES.md` companion document alongside generated BPMN.                   |
| `skip-review`         | Skips generating the review questions step.                                             |

Be deliberate with `skip-provenance` and `skip-review` on a real project. Provenance is what lets a reviewer check where a finding came from, and review questions are how SMEs catch what discovery got wrong.
