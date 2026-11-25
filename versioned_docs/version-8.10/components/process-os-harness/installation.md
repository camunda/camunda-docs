---
id: installation
title: Install ProcessOS Harness and configure a project
sidebar_label: Installation
description: "Install ProcessOS Harness into your AI coding agent with c8ctl, and configure your first project with process-scope.md and run.config.yaml."
keywords: ["ProcessOS Harness", "install", "c8ctl"]
---

Install ProcessOS Harness for your AI coding agent with the Camunda 8 CLI, configure a version-controlled project, and start the governed development journey.

:::note Before you begin
Camunda recommends completing the [organizational setup](setup/project-setup.md) and checking the [system requirements](setup/system-requirements.md) before installing ProcessOS Harness.
:::

## Install ProcessOS Harness

:::note For Camunda Enterprise customers and active partners
ProcessOS Harness is available to Camunda Enterprise customers and Camunda partners with a signed Camunda partner agreement. To download it, you need access to the [Camunda Download Center (Enterprise Releases)](https://downloads.camunda.cloud/enterprise-release/) with your Camunda Enterprise credentials. If you don't have credentials, contact your Customer Success Manager or Partner Manager.
:::

### Choose a target

ProcessOS Harness ships one bundle per AI coding agent. Every bundle carries the same skills, rules, and hooks, generated into the layout that agent expects. A `<target>` is the label of the bundle that matches your AI coding agent. Use it in the `c8 os install` command and as the name of the archive you download, because an agent only discovers skills in its own directory.

| AI coding agent       | Target       | Skills directory  |
| --------------------- | ------------ | ----------------- |
| Claude Code (via CLI) | `claudecode` | `.claude/skills/` |
| GitHub Copilot CLI    | `copilotcli` | `.github/skills/` |

Only one bundle can be installed at a time. To move to a different agent, run `c8 os switch <target> --zip <file.zip>`, which removes the current bundle before installing the new one.

### Install

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

1. Download the ProcessOS Harness archive for your AI coding agent from the [Camunda Download Center (Enterprise Releases)](https://downloads.camunda.cloud/enterprise-release/). There is one archive per target, named after the target, for example `claudecode.zip` for Claude Code or `copilotcli.zip` for GitHub Copilot CLI, as listed in the [target table](#choose-a-target).

1. Install ProcessOS Harness from the archive:

   ```bash
   c8 os install <target> --zip /path/to/<target>.zip
   ```

   Replace `<target>` with the label of your AI coding agent from the [target table](#choose-a-target).

1. Initialize a version-controlled project:

   ```bash
   git init && git add . && git commit -m "chore(job) commit process-os-harness setup"
   ```

1. Decide which Camunda cluster runs the governance process. For a SaaS or Self-Managed cluster, have the cluster URL and API client credentials ready. For SaaS, see [manage API clients](/components/saas/clusters/manage-api-clients.md). To learn how ProcessOS Harness uses the cluster, see [select clusters with c8ctl profiles](#select-clusters-with-c8ctl-profiles).



1. Start the journey. Launch your AI coding agent, select a smart model (e.g. Opus or similar), then run:

   ```text
   /process-os-governance-start
   ```

   The agent asks for the type of the governance cluster and connects to it with a `c8ctl` profile.

### Keep an installation up to date

To install a newer archive, download it from the Camunda Download Center (Enterprise Releases) and run `c8 os switch`. The `c8 os install` command doesn't run while a distribution is installed. To see what changed in each release, read the [changelog](changelog.md).

| Command                                      | What it does                                                     |
| -------------------------------------------- | ---------------------------------------------------------------- |
| `c8 os switch <claudecode> --zip <file.zip>` | Remove the current installation, then install the given archive. |
| `c8 os uninstall`                            | Remove the installation, and restore the files it replaced.      |

## Select clusters with c8ctl profiles

ProcessOS Harness uses `c8ctl` profiles to keep the governance cluster and the target cluster apart.

A `c8ctl` profile stores the address and the credentials of one Camunda cluster. ProcessOS Harness names a profile with `--profile` on each `c8ctl` command, so every command reaches the intended cluster. A profile only routes commands. It doesn't share project files, copy data between clusters, or deploy anything.

| Cluster            | Profile                                                                                                                                                                        | When ProcessOS Harness uses it                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Governance cluster | Local cluster: the built-in `local` profile. SaaS or Self-Managed cluster: a profile you create and name.                                                                      | When you run `/process-os-governance-start`, and for every governance step after it.        |
| Target cluster     | Local cluster (default): a profile named `Camunda<version>`, for example `Camunda8.10`. SaaS or Self-Managed cluster: an existing profile, for example the governance profile. | When the agent deploys the generated solution, or checks that the solution can be deployed. |

To learn how `c8ctl` resolves profiles, see [credential resolution](/apis-tools/c8ctl/getting-started.md#credential-resolution).

### Connect the governance cluster

`/process-os-governance-start` asks which type of cluster runs the governance process: **local**, **saas**, or **self-managed**.

- **local**: The agent uses the built-in `local` profile. It checks that a local Camunda 8 Run cluster is running, and offers to start it if not.
- **saas** or **self-managed**: The agent asks for a profile name. If the profile doesn't exist, create it, then confirm to the agent:

  ```bash
  c8 add profile <profile-name> --baseUrl=<cluster-url> --clientId=<client-id> --clientSecret=<client-secret>
  ```

  The agent then checks that it can reach the cluster with this profile. For all profile options, see [add a profile](/apis-tools/c8ctl/command-reference.md#add).

Credentials stay in `c8ctl`. ProcessOS Harness stores only the cluster type and the profile name in `.camunda/governance.json`. Project initialization adds this file to `.gitignore`, so each working copy keeps its own record.

Changing the active profile with `c8 use profile` doesn't move a project to another governance cluster. To connect a project to a different governance cluster, run `/process-os-governance-start --reconnect`.

### Understand how the target cluster is selected

The target cluster runs the Camunda version set by `camunda-version` in `run.config.yaml`. The agent selects it in two situations:

| Situation                                                                   | Target cluster                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Deployment, in the [implementation phase](build/phases/3-implementation.md) | By default, the agent starts a local Camunda 8 Run cluster of the project's version and adds the `Camunda<version>` profile for it. For a SaaS or Self-Managed target cluster, the agent uses an existing profile, for example the governance profile, and confirms that the cluster runs the project's version. If the agent uses the governance profile, the governance cluster and the target cluster are the same cluster. |
| Check after the agent generates the solution                                | The agent prefers the `Camunda<version>` profile. If that profile is missing or can't reach a cluster, the agent uses another profile that reaches a cluster.                                                                                                                                                                                                                                                                  |

The built-in `local` profile and the `Camunda<version>` profile both point to `http://localhost:8080/v2`. With a local governance cluster, both profiles reach the same local Camunda 8 Run cluster.

A check after generation can deploy the generated solution to the governance cluster when no `Camunda<version>` profile reaches a cluster. To keep test deployments off a shared governance cluster, start a local cluster and add the profile before the implementation phase:

```bash
c8 cluster start <version>
c8 add profile Camunda<version> --baseUrl=http://localhost:8080/v2
```

## Next steps

- If several builders work on one project, [use ProcessOS as a team](setup/project-setup.md#use-processos-as-a-team).
- Learn how the [governance process](build/governance-process.md) guides you between milestones.
- Learn how [review cycles](build/review-cycle.md) bring SMEs into each phase.
- Start the first phase, described in [discover the as-is process](build/phases/1-discovery.md).
