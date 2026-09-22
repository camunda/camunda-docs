---
id: get-started
title: Install ProcessOS Harness and configure a project
sidebar_label: Get started
description: "Set up the builder workspace, install ProcessOS Harness into your AI coding agent with c8ctl, and configure your first project with process-scope.md and run.config.yaml."
keywords: ["ProcessOS Harness", "install", "c8ctl", "builder workspace"]
---

This page takes you from nothing to a configured ProcessOS Harness project with the journey running. Camunda recommends completing the [organizational setup](project-setup.md) first, and checking the [system requirements](system-requirements.md) before you install.

## (Optional) Understand the builder workspace

The builder workspace is an recommodation for how keep everything you need in one place. You work in your IDE, and ProcessOS Harness adds governance and review around it.

| Part               | What you use it for                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| IDE                | Hosts the project files, a console, and the AI coding agent. Visual Studio Code is a common choice. |
| AI coding agent    | Does the work in each job, and helps you fix problems at any point.                                 |
| Git                | Stores every project artifact, so changes are reviewable and reversible.                            |
| Governance process | Runs on Camunda alongside your IDE, and tells you what to do next.                                  |
| File viewer        | Opens generated BPMN, DMN, and form files for review.                                               |

## Install ProcessOS Harness

:::note Early access requires access
ProcessOS Harness is distributed through repositories available to early access participants. If the commands below report that a repository or plugin can't be found, ask your Camunda account team or Field Delivery Engineer to enable access for your organization.
:::

1. Install or update c8ctl, the Camunda 8 CLI:

   ```bash
   npm install -g @camunda8/cli@latest
   ```

1. Load the ProcessOS Harness plugin:

   ```bash
   c8 load plugin --from https://github.com/camunda/c8ctl-plugin-process-os
   ```

1. Install ProcessOS Harness for your AI coding agent:

   ```bash
   c8 os install claudecode
   ```

   This command downloads the release bundle and extracts it into the current directory.

1. Create a version-controlled project folder:

   ```bash
   git init && git add . && git commit -m "ProcessOS Harness setup"
   ```

1. Start the journey. Launch your AI coding agent, select at least the Opus model with `/model`, then run:

   ```text
   /process-os-governance-start
   ```

### Keep an installation up to date

| Command                          | What it does                  |
| -------------------------------- | ----------------------------- |
| `c8 os update`                   | Update to the latest release. |
| `c8 os install claudecode@1.2.3` | Install a specific version.   |

## Next steps

- Learn how the [governance process](get-started/governance-process.md) guides you between milestones.
- Learn how [review cycles](get-started/review-cycle.md) bring SMEs into each phase.
- Start the first phase, described in [discover the as-is process](phases/1-discovery.md).
