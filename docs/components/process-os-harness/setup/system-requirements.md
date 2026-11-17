---
id: system-requirements
title: System requirements
sidebar_label: System requirements
description: "Learn about the system requirements for running ProcessOS Harness."
keywords:
  [
    "ProcessOS Harness",
    "system requirements",
    "Claude Code",
    "Copilot CLI",
    "bundle",
    "c8ctl",
  ]
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## Overview

ProcessOS Harness requires the following:

- A Camunda cluster to run the [governance process](#governance-process).
- A [Git-compatible version control system](#project-version-control) to store your projects.
- A supported [AI coding agent](#ai-coding-agent) to do the re-engineering work.
- A [builder client](#builder-client) with local tooling, where the agent runs.

![System overview: the builder client hosts the AI coding agent and a local Camunda server, syncs status with the ProcessOS governance process on the enterprise Camunda server, uses VCS and an AI platform, and generates a ProcessOS solution deployed back to the enterprise Camunda server.](../img/process-os-system-requirements.excalidraw.svg)

:::note
Agentic tooling is flexible by nature, so ProcessOS Harness may run on more systems than the ones listed here. These are the configurations Camunda currently tests, and the goal is to keep ProcessOS Harness independent of any specific AI coding agent or AI platform.
:::

## Governance process

The governance process needs a Camunda cluster that's reachable across your organization, because it holds ProcessOS project state and orchestrates SME feedback.

| Requirement | Supported                                              |
| ----------- | ------------------------------------------------------ |
| Camunda 8   | A supported release of Camunda 8 SaaS or Self-Managed. |

## Project version control

ProcessOS projects are stored in repositories, so managing one requires a Git-compatible version control system. You can host it internally or use a provider such as GitHub.

## AI coding agent

ProcessOS Harness drives an AI coding agent to do the work of re-engineering.

| Aspect          | Supported                                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| AI coding agent | Currently supported are **Claude Code CLI** and **GitHub Copilot CLI**, each installed as a [bundles](#processos-bundles).                    |
| AI platform     | Platforms such as Amazon Bedrock, Azure OpenAI, and Ollama, where the coding agent supports them.                                             |
| Models          | Models natively used by a supported coding agent. Anthropic Claude models are tested the most, with Opus or smarter alternatives recommended. |

:::note
Other agents may be supported in future releases, but aren't yet tested exhaustively. Please get in contact if you need support for additional AI coding agents.
:::

The agent needs these permissions in your environment:

- Outbound network access, for example `curl` and `wget`.
- Write access within the ProcessOS project Git repository.
- Permission to execute bash commands and scripts.

## Builder client

The AI coding agent runs on the builder's own computer (Windows, macOS, or Unix). The following tools are required in the `latest` version:

| Requirement        | Details                                                                                                               | When to install                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| AI coding agent    | See [AI coding agent](#ai-coding-agent).                                                                              | Before [installation](../installation.md#install-processos-harness) |
| Camunda Modeler    | For editing BPMN and DMN files during review.                                                                         | Before [installation](../installation.md#install-processos-harness) |
| Node.js            | Used as scripting language by ProcessOS Harness skills.                                                               | Before [installation](../installation.md#install-processos-harness) |
| Git and GitHub CLI | `git`, and the `gh` CLI for the GitHub discovery specialist.                                                          | Before [installation](../installation.md#install-processos-harness) |
| Maven              | For Java workers only.                                                                                                | Before [installation](../installation.md#install-processos-harness) |
| c8ctl              | The Camunda 8 CLI, used to deploy and manage Camunda resources and clusters. Available as `c8ctl` and its alias `c8`. | During [installation](../installation.md#install-processos-harness) |
| Camunda c8run      | A local cluster started with `c8run`, used to validate generated solutions.                                           | During ProcessOS run                                                |

## Generated solutions

Solutions generated by ProcessOS Harness use the following technologies.

| Component         | Technology                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Workers           | Target SDKs: Spring Boot; TypeScript; Python                                                                  |
| Camunda artifacts | `.bpmn`, `.dmn`, and `.form` files for the latest Camunda 8 version.                                          |
| AI platforms      | As supported by [agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md). |
