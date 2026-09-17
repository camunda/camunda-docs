---
id: get-started
title: Install ProcessOS Harness and configure a project
sidebar_label: Get started
description: "Set up the builder workspace, install ProcessOS Harness into your AI coding agent with c8ctl, and configure your first project with process-scope.md and run.config.yaml."
keywords: ["ProcessOS Harness", "install", "c8ctl", "builder workspace"]
---

This page takes you from nothing to a configured ProcessOS Harness project with the journey running. Complete the [organizational setup](project-setup.md) first, and check the [system requirements](system-requirements.md) before you install.

## Understand the builder workspace

The builder workspace keeps everything you need in one place. You work in your IDE, and ProcessOS Harness adds governance and review around it.

| Part               | What you use it for                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| IDE                | Hosts the project files, a console, and the AI coding agent. Visual Studio Code is a common choice. |
| AI coding agent    | Does the work in each job, and helps you fix problems at any point.                                 |
| Git                | Stores every project artifact, so changes are reviewable and reversible.                            |
| Governance process | Runs on Camunda alongside your IDE, and tells you what to do next.                                  |
| File viewer        | Opens generated BPMN, DMN, and form files for review.                                               |

Two properties follow from this setup. You keep full flexibility inside each iteration, because you can act freely in the project and call any skill directly. The engagement stays fully auditable, because files live in Git and the process state lives in Camunda.

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

   This command downloads the release bundle, extracts it into the current directory, and records every installed file in `.process-os.yaml`. Installed files are added to `.gitignore` automatically, so they're never committed.

1. Create a version-controlled project folder:

   ```bash
   git init && git add . && git commit -m "ProcessOS Harness setup"
   ```

1. Start the journey. Launch your AI coding agent, select at least the Opus model with `/model`, then run:

   ```text
   /process-os-governance-start
   ```

If you'd rather have the agent walk you through the prerequisites first, run `/process-os-onboarding`.

### Keep an installation up to date

| Command                              | What it does                                        |
| ------------------------------------ | --------------------------------------------------- |
| `c8 os update`                       | Update to the latest release.                       |
| `c8 os install claudecode@1.2.3`     | Install a specific version.                         |
| `c8 os switch claudecode --ref main` | Switch to a different platform target or reference. |

To install without c8ctl, download the archive for your platform from the [ProcessOS Harness releases page](https://github.com/camunda/process-os/releases) and extract it into your project directory, following the agent skills documentation for your platform.

## Configure your project

Once ProcessOS Harness is installed, initialize the project:

```text
/process-os-project-initialization
```

This creates two configuration files. You can edit either one at any time before you run a skill.

| File               | Contents                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `process-scope.md` | Business identity and business prose: process name, description, organization, scope, success criteria, data sources, stakeholders, pain points, and context.       |
| `run.config.yaml`  | Technical run configuration: discovery specialists, iteration limits, run mode, target Camunda version, target SDK, and BPMN generation and transformation options. |

Two settings in `run.config.yaml` shape how much you're asked during a run.

| Setting          | Values                      | Effect                                                                                                           |
| ---------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `mode`           | `interactive`, `unattended` | `interactive` pauses at every review gate. `unattended` accepts recommendations and chains phases automatically. |
| `max-iterations` | Number                      | Caps discovery iterations before results are approved automatically. Defaults to `5`.                            |

:::warning
Quote the Camunda version in `run.config.yaml`. An unquoted `8.10` is a YAML float and truncates to `8.1`.
:::

Each project is isolated and keeps its memory private, and you build it on your local machine. There's no shared memory between projects and no multi-project management in this release.

## Plan cost and time

ProcessOS Harness runs many agent iterations, so a journey has a real token cost. Plan for roughly $300 to $600 in tokens and six to eight hours for one journey from discovery through implementation.

Treat this as a planning input rather than a fixed price. Your run `mode` and iteration limits directly influence both figures, and a process more complex than average moves them up.

## Next steps

- Learn how the [governance process](get-started/governance-process.md) guides you between milestones.
- Learn how [review cycles](get-started/review-cycle.md) bring SMEs into each phase.
- Start the first phase, described in [discover the as-is process](phases/discovery.md).
