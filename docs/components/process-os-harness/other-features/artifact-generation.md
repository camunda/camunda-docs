---
id: artifact-generation
title: Generate Camunda artifacts
sidebar_label: Artifact generation
description: "ProcessOS Harness generates BPMN diagrams, DMN tables, Camunda Forms, and job workers from a chosen transformation tier, controlled by run configuration settings."
keywords:
  ["ProcessOS Harness", "artifact generation", "BPMN", "DMN", "job workers"]
---

WORK IN PROGRESS!

Artifact generation produces the Camunda files that make a solution executable. It's used across phases rather than only at the end, because both discovery and transformation generate diagrams before anything is implemented.

## What gets generated

| Artifact      | Notes                                                       |
| ------------- | ----------------------------------------------------------- |
| BPMN diagrams | Fully laid out, and generated from the process description. |
| DMN tables    | Generated for the decisions found in the process.           |
| Camunda Forms | Generated as `.form` JSON for user tasks.                   |
| Job workers   | Generated from a blueprint for your target SDK.             |

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
