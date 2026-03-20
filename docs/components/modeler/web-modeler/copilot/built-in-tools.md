---
id: built-in-tools
title: Built-in tools
sidebar_label: Built-in tools
description: "Overview of the built-in tool capabilities available to Camunda Copilot."
---

Camunda Copilot uses specialized tools to interact with your BPMN diagrams, forms, and other artifacts. This page provides a high-level overview of what Copilot can do through its built-in tools.

For a general introduction, see [Camunda Copilot overview](copilot-overview.md).

## Access control

Each tool is governed by two layers of access control:

- **Permission** (Read / Write): Based on your [project-level role](copilot-overview.md#project-level-permissions). Write tools are hidden from read-only users.
- **Screen availability**: Camunda Copilot automatically disables tools that do not apply to your [current screen or mode](copilot-overview.md#screen-based-tool-availability). For example, BPMN editing tools are available on the Design and Implement screens but not in Play mode.

## BPMN tools

Camunda Copilot can work with BPMN diagrams in the following ways:

- **Query and inspect**: Retrieve the current BPMN XML, look up elements by ID or type, list sequence flows, get a process summary, find paths between elements, and check element positions or overlaps.
- **Create and modify**: Add, update, delete, and move BPMN elements. Convert BPMN representations between formats and ensure Zeebe extensions are correctly configured.
- **Layout**: Position elements, shift elements to create space, auto-layout newly inserted elements, and clean up diagram shapes after deletions.
- **Validate**: Check BPMN XML structure and Zeebe compatibility, and receive errors, warnings, and repair suggestions.

## Form tools

Camunda Copilot can work with Camunda Forms in the following ways:

- **Query and inspect**: Validate form JSON structure, summarize form fields and requirements, and retrieve form bindings from user tasks.
- **Create and modify**: Update form JSON by adding, modifying, or removing components, and bind forms to user tasks.

## Modeler tools

Camunda Copilot can interact with the Web Modeler UI in the following ways:

- **Artifact synchronization**: Sync BPMN, DMN, and Form state between the backend context and the UI.
- **File management**: List, read, and create project files.
- **Element templates**: Search available connector and element templates, and retrieve their configurable properties.
- **Validation feedback**: Retrieve BPMN lint errors, deployment errors, and form validation errors.

## Integration tools

Camunda Copilot can connect to external services:

- **Documentation search**: Search Camunda documentation and knowledge base for product, modeling, and best-practice guidance.

:::note

- Documentation search via Kapa AI is only available in SaaS deployments.
- Self-Managed users can configure their own LLM provider but do not have access to the Camunda documentation knowledge base.
  :::
