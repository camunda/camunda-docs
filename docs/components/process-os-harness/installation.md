---
id: installation
title: Install ProcessOS Harness and configure a project
sidebar_label: Installation
description: "Install ProcessOS Harness into your AI coding agent with c8ctl, and configure your first project with process-scope.md and run.config.yaml."
keywords: ["ProcessOS Harness", "install", "c8ctl"]
---

This page takes you from nothing to a configured ProcessOS project with the journey running. Camunda recommends completing the [organizational setup](setup/project-setup.md) first, checking the [system requirements](setup/system-requirements.md).

## Install ProcessOS Harness

:::note For Camunda Enterprise customers only
ProcessOS Harness is only available to Camunda Enterprise customers. To download it, you need access to the [enterprise download center](https://downloads.camunda.cloud/enterprise-release/) with your Camunda Enterprise credentials. If you don't have credentials, contact your Customer Success Manager.
:::

1. Install or update c8ctl, the Camunda 8 CLI:

   ```bash
   npm install -g @camunda8/cli@latest
   ```

   This installs both `c8ctl` and its shorter alias `c8`. The commands on this page use `c8`. If another `c8` command, such as the `c8` code coverage tool, takes precedence in your `PATH`, use `c8ctl` instead.

1. Load the ProcessOS Harness plugin:

   ```bash
   c8 load plugin @camunda8/c8ctl-plugin-process-os
   ```

1. Create and enter a project folder:

   ```bash
   mkdir -p <my-project> && cd <my-project>
   ```

1. Download the ProcessOS Harness archive for your AI coding agent from the [enterprise download center](https://downloads.camunda.cloud/enterprise-release/). There is one archive per agent, for example `claudecode.zip` for Claude Code or `copilotcli.zip` for GitHub Copilot CLI, as listed in the [ProcessOS Bundle mapping](setup/system-requirements.md#processos-bundle-mapping).

1. Install ProcessOS Harness from the archive:

   ```bash
   c8 os install <target> --zip /path/to/<target>.zip
   ```

1. Initialize a version-controlled project:

   ```bash
   git init && git add . && git commit -m "chore(job) commit process-os-harness setup"
   ```

1. Start the journey. Launch your AI coding agent, select a smart model (e.g. Opus or similar), then run:

   ```text
   /process-os-governance-start
   ```

### Keep an installation up to date

To install a newer archive, download it from the enterprise download center and run `c8 os switch`. The `c8 os install` command doesn't run while a distribution is installed.

| Command                                      | What it does                                                     |
| -------------------------------------------- | ---------------------------------------------------------------- |
| `c8 os switch <claudecode> --zip <file.zip>` | Remove the current installation, then install the given archive. |
| `c8 os uninstall`                            | Remove the installation, and restore the files it replaced.      |

## Next steps

- Learn how the [governance process](build/governance-process.md) guides you between milestones.
- Learn how [review cycles](build/review-cycle.md) bring SMEs into each phase.
- Start the first phase, described in [discover the as-is process](build/phases/1-discovery.md).
