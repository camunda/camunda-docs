---
id: built-in-tools
title: Camunda Copilot’s built-in tools
sidebar_label: Built-in tools
description: "Use Camunda Copilot’s built-in specialized tools to interact with your BPMN diagrams, forms, and other artifacts."
---

Use Camunda Copilot’s specialized tools to interact with your BPMN diagrams, forms, and other artifacts.

## How Copilot works

Copilot uses specialized AI agents to handle different types of requests:

- **BPMN agent**: Creates and modifies process diagrams.
- **FEEL agent**: Generates and debugs expressions.
- **Form agent**: Builds and validates forms.

Copilot automatically routes your request to the right agent based on what you're asking for, so you don't need to specify which agent to use.

## Access control

Each tool is governed by two layers of access control:

- **Permission** (Read / Write): Based on your [project-level role](copilot-overview.md#permissions). Write tools are hidden from read-only users.
- **Screen availability**: Camunda Copilot automatically disables tools that do not apply to your [current screen or mode](copilot-overview.md#where-copilot-is-available). For example, BPMN editing tools are available on the Design and Implement screens but not in Play mode.

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

:::important

- Documentation search via Kapa AI is only available in SaaS deployments.
- Self-Managed users can configure their own LLM provider but do not have access to the Camunda documentation knowledge base.
  :::
