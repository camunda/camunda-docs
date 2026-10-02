---
id: artifact-generation
title: Generate Camunda artifacts
sidebar_label: Artifact generation
description: "ProcessOS Harness generates BPMN diagrams, DMN tables, Camunda Forms, and job workers from a chosen transformation tier, controlled by run configuration settings."
keywords:
  ["ProcessOS Harness", "artifact generation", "BPMN", "DMN", "job workers"]
---

Artifact generation produces the Camunda files that make a solution executable. It's used across phases rather than only at the end, because both discovery and transformation generate diagrams before anything is implemented.

## What gets generated

| Artifact      | Notes                                                       |
| ------------- | ----------------------------------------------------------- |
| BPMN diagrams | Fully laid out, and generated from the process description. |
| DMN tables    | Generated for the decisions found in the process.           |
| Camunda Forms | Generated as `.form` JSON for user tasks.                   |
| Job workers   | Generated from a blueprint for your target SDK.             |
