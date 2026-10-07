---
id: csap-cli
title: CSAP c8ctl plugin
description: "Use the CSAP plugin for c8ctl to configure all SAP integration artifacts for deployment."
---

The [Camunda SAP Integration CLI](/reference/glossary.md#csap-cli) (CSAP) is a plugin for [c8ctl](/apis-tools/c8ctl/getting-started.md) that simplifies the setup of Camunda's SAP integration modules. It provides a streamlined process for configuring and building these modules for deployment.

:::warning
The standalone `csap` binary is deprecated and replaced by the `c8ctl-plugin-csap-cli` plugin. The plugin offers the same functionality. It is a Node.js port of the original tool, so you no longer need Deno. See [migrate from the `csap` binary](#migrate-from-the-csap-binary).
:::

## Features

- Runs as a c8ctl plugin - no separate binary required.
- Interactive prompts for configuration.
- Command-line flags for automation.
- Support for multiple SAP integration modules.
- Automatic handling of dependencies and build processes.
- Compatibility with Camunda SaaS deployments.

## Supported modules

The plugin supports the following SAP integration modules:

| Module              | Flag value | Description                                                                |
| ------------------- | ---------- | -------------------------------------------------------------------------- |
| SAP OData connector | `odata`    | Facilitates interaction with SAP S/4HANA or ECC systems from a BPMN model. |
| SAP RFC connector   | `rfc`      | Allows querying BAPIs and Remote Function Modules on SAP ECC systems.      |
| All modules         | `all`      | Configures all available modules.                                          |

The plugin supports Camunda 8.7, 8.8, and 8.9. Support for Camunda 8.6 is deprecated.

The plugin downloads the OData and RFC connectors from the [sap-connectors](https://github.com/camunda/sap-connectors) repository. The plugin source code is available in the [c8ctl-plugin-csap-cli](https://github.com/camunda/c8ctl-plugin-csap-cli) repository.

## Prerequisites

Check your build system meets the following requirements:

- [c8ctl](/apis-tools/c8ctl/getting-started.md#install) is installed.
- [Node.js](https://nodejs.org/en) 22 or later.
- (Windows) `npm` uses `cmd` as the shell script executor: `npm config set script-shell cmd`.

## Installation

Load the plugin into c8ctl from its Git repository:

```bash
c8ctl load plugin --from https://github.com/camunda/c8ctl-plugin-csap-cli
```

To pin a specific branch or tag, append `#` and the name:

```bash
c8ctl load plugin --from https://github.com/camunda/c8ctl-plugin-csap-cli#v1.2.3
```

To verify the installation, run `c8ctl help`. The `csap-setup` command appears under **Plugin Commands**. To manage the plugin afterward, see [extend c8ctl with plugins](/apis-tools/c8ctl/plugins.md#manage-plugins).

## Usage

The plugin provides a `csap-setup` command to prepare one of Camunda's SAP integration modules for deployment. You can run the command interactively or provide all required options as command-line flags.

### Authentication token

Under the hood, the plugin uses the GitHub API to query for releases. The [GitHub API has a rate limit](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api) for unauthenticated requests. It is thus advisable to provide a GitHub access token to the environment you run the plugin in.

#### Local use

A personal GitHub access token can be obtained in multiple ways. Either [statically by generating one](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) or dynamically by using the `gh` CLI to log in (`gh auth login`), which in turn produces an access token.

Then, inject the token into your (shell) environment as the variable `GH_TOKEN`. The plugin automatically picks up the token from `GH_TOKEN` and uses it for subsequent requests.

Windows (Command Prompt)

```shell
for /f "delims=" %i in ('gh auth token') do set GH_TOKEN=%i
```

Windows (PowerShell)

```shell
$env:GH_TOKEN = (gh auth token)
```

Linux/macOS (bash)

```shell
export GH_TOKEN=$(gh auth token)
```

#### CI/CD use

If your CI/CD environment isn't GitHub, you must obtain a GitHub access token, as with [local use](#local-use), to authenticate the plugin's requests to the GitHub API.

For GitHub Actions, all runs are provided a `GITHUB_TOKEN` automatically. Declare it for the respective run of `c8ctl csap-setup` with the `env` YAML declaration:

```yaml
jobs:
  your-job:
  # ...
  steps:
    - run: |
        c8ctl csap-setup --for #...
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Interactive mode

Run the following command to start the interactive setup:

```bash
c8ctl csap-setup
```

The plugin guides you through prompts to collect all required inputs, including the SAP integration module, Camunda version, deployment method, and credentials.

### Command-line options

All prompts are also available as command-line flags, allowing you to automate the setup process.

#### Command syntax

```bash
c8ctl csap-setup [options]
```

#### Options

| Option           | Type   | Description                                                                                              | Default value                |
| ---------------- | ------ | -------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `--for`          | string | Specifies the SAP integration module to set up. Choices: `odata`, `rfc`, `all`.                          | (Prompted if not provided)   |
| `--camunda`      | string | Specifies the Camunda version. Choices: `8.10`, `8.9`, `8.8`, `8.7`, `8.6` (deprecated).                         | (Prompted if not provided)   |
| `--deployment`   | string | Specifies the Camunda deployment option. Choices: `SaaS`. (`SM` for self-managed is currently disabled.) | (Prompted if not provided)   |
| `--clusterId`    | string | Specifies the Camunda cluster ID.                                                                        | (Prompted if not provided)   |
| `--region`       | string | Specifies the Camunda cluster region, for example, `bru-2`.                                              | (Prompted if not provided)   |
| `--clientId`     | string | Specifies the Camunda API client OAuth2 client ID.                                                       | (Prompted if not provided)   |
| `--clientSecret` | string | Specifies the Camunda API client OAuth2 client secret.                                                   | (Prompted if not provided)   |
| `--to`           | string | Target directory for setup artifacts.                                                                    | OS-dependent `tmp` directory |

## Environment variables

The plugin can detect Camunda API credentials from environment variables. If these variables are set, the plugin reuses them without prompting for input. Flags take precedence over environment variables.

| Environment variable     | Description               |
| ------------------------ | ------------------------- |
| `CAMUNDA_CLUSTER_ID`     | Camunda cluster ID        |
| `CAMUNDA_CLIENT_ID`      | Camunda API client ID     |
| `CAMUNDA_CLIENT_SECRET`  | Camunda API client secret |
| `CAMUNDA_CLUSTER_REGION` | Camunda cluster region    |

### Examples

#### Example 1: Interactive setup

```bash
$> c8ctl csap-setup

# ...

? SAP integration module
❯ OData connector
  RFC connector
  All modules
```

This guides you through the setup process interactively.

#### Example 2: Setting up all modules, reusing credentials from environment

```bash
$> c8ctl csap-setup --for all \
  --camunda 8.8 \
  --deployment SaaS

# ...

i Camunda API credentials found in environment. Reusing
┌────────────────────────┬──────────┐
│ (idx)                  │ Values   │
├────────────────────────┼──────────┤
│ CAMUNDA_CLUSTER_ID     │ "***5ee" │
│ CAMUNDA_CLIENT_ID      │ "***icQ" │
│ CAMUNDA_CLIENT_SECRET  │ "***XEq" │
│ CAMUNDA_CLUSTER_REGION │ "***d-1" │
└────────────────────────┴──────────┘
```

This command sets up all available SAP integration modules for Camunda version 8.8.

## Migrate from the `csap` binary

To migrate from the deprecated `csap` binary to the c8ctl plugin, install the plugin and replace `csap setup` with `c8ctl csap-setup` in your scripts and pipelines.

1. Install c8ctl and [load the plugin](#installation).
1. Replace `csap setup` with `c8ctl csap-setup` in your scripts and CI/CD pipelines.
1. Remove the `csap` binary from your `PATH`.

All flags and environment variables keep their names and meaning. The default values for `--for`, `--camunda`, and `--deployment` can differ from the `csap` binary, so pass them explicitly in non-interactive runs.

## Deploying modules

After each Camunda SAP integration module is set up with `c8ctl csap-setup`, it is ready for deployment. The plugin prints `in directory <path>` after every successful run. Use this path for the deployment.

For the OData and RFC connectors, run `cf deploy <directory-printed-by-csap-setup>`.

Deploying the module to BTP and integrating it into the application lifecycle management of your organization is the responsibility of your SAP practice. To learn more, see the deployment sections of the [OData connector](./odata-connector.md) and [RFC connector](./rfc-connector.md) pages.
