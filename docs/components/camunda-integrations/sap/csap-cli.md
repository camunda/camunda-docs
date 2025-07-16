---
id: csap-cli
title: CSAP CLI command line utility
description: "Learn about CSAP, the CLI to configure all SAP integration artifacts for deployment."
---

The [Camunda SAP Integration CLI](/reference/glossary.md#csap-cli) (`csap`) is a command-line tool designed to simplify the setup of Camunda's SAP integration modules. It provides a streamlined process for configuring and building these modules for deployment.

## Features

- Distributed as a standalone binary - no local installation required.
- Interactive prompts for configuration.
- Command-line switches for automation.
- Support for multiple SAP integration modules.
- Automatic handling of dependencies and build processes.
- Compatibility with Camunda SaaS deployments.

## Supported modules

The CLI supports the following SAP integration modules:

1. **SAP OData connector**: Facilitates interaction with SAP S/4HANA or ECC systems from a BPMN model.
2. **SAP RFC connector**: Allows querying BAPIs and Remote Function Modules on SAP ECC systems.
3. **BTP plugin**: Enables rendering task forms in Fiori and provides BTP integration.
4. **All modules**: Configures all available modules.

## Installation

To use the CLI, download the binary matching your operating system and architecture from the [releases](https://github.com/camunda/sap-csap-cli/releases) section of its repository:

1. Check your build system meets the following requirements:
   1. [Node.js](https://nodejs.org/en) >= 20 (this includes the required `npm`)
   1. (Windows) tell `npm` to use `cmd` as the shell script executor:  
      `$> npm config set script-shell cmd`
   1. The [transient requirements for SAP's `mbt`](https://sap.github.io/cloud-mta-build-tool/makefile/) (Cloud MTA Build Tool), specifically `make`
1. Navigate to the [releases](https://github.com/camunda/sap-csap-cli/releases) page.
1. Download the binary for your platform:
   - For Linux: `csap-x86_64-unknown-linux-gnu`
   - For macOS (Intel): `csap-x86_64-apple-darwin`
   - For macOS (Apple Silicon): `csap-aarch64-apple-darwin`
   - For Windows: `csap-x86_64-pc-windows-msvc.exe`
1. Place the binary in a directory included in your system's `PATH` for easy access.

### Example for Linux/macOS

```bash
chmod +x csap-x86_64-unknown-linux-gnu
mv csap-x86_64-unknown-linux-gnu /usr/local/bin/csap
```

### Example for Windows

1. Rename the binary to `csap.exe` if necessary.
2. Add the directory containing `csap.exe` to your system's `PATH`.

## Usage

The CLI provides a `setup` command to prepare one of Camunda's SAP integration modules for deployment. You can run the command interactively or provide all required options as command-line switches.

### Authentication token

Under the hood, `csap` uses the GitHub API to query for releases. The [GitHub API has a rate limit](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api) for unauthenticated requests. It is thus advisable to provide a GitHub access token to the environment `csap` is run in.

#### Local use

A personal GitHub access token can be obtained in multiple ways. Either [statically by generating one](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) or dynamically by using the `gh` CLI to log in (`gh auth login`), which in turn produces an access token.

Then, inject the token into your (shell) environment as the variable `GH_TOKEN`. `csap` will automatically pick up the token from `GH_TOKEN` and use it for subsequent requests.

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

If your CI/CD environment isn't GitHub, like [local use](#local-use) an access token from GitHub must be obtained to authenticate requests to the GitHub API from `csap`.

For GitHub actions/pipelines, all runs are provided a `GITHUB_TOKEN` automatically. Declare this to the respective run of `csap` via the `env` YAML declaration:

```yaml
jobs:
  your-job:
  # ...
  steps:
    - run: |
        csap setup --for #...
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Review csap's [GitHub action for pull requests](https://github.com/camunda/sap-csap-cli/blob/ad10ecf8017ab18e2d4fbd2089f7fb5d1d17fa12/.github/workflows/pr.yml#L46) as an example.

### Interactive mode

Run the following command to start the interactive setup:

```bash
csap setup
```

The CLI will guide you through prompts to collect all required inputs, including the SAP integration module, Camunda version, deployment method, and credentials.

### Command-line options

All prompts are also available as command-line switches, allowing you to automate the setup process. Below is the full list of options:

#### Command syntax

```bash
csap setup [options]
```

#### Options

| Option           | Type   | Description                                                                                           | Default value                                          |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `--for`          | string | Specifies the SAP integration module to set up. Choices: `btp-plugin`, `odata`, `rfc`, `all`.         | `odata`                                                |
| `--camunda`      | string | Specifies the Camunda version. Choices: `8.7`, `8.6`, `8.5`.                                          | `8.7`                                                  |
| `--deployment`   | string | Specifies the Camunda deployment option. Choices: `SaaS`. (`SM` for self managed currently disabled.) | `SaaS`                                                 |
| `--btpRoute`     | string | (For `btp-plugin` or `all`) Specifies the BTP route to reach the plugin. This is SAP/BTP specific.    | `camunda-btp-plugin.cfapps.eu10-004.hana.ondemand.com` |
| `--clusterId`    | string | Specifies the Camunda cluster ID.                                                                     | (Prompted if not provided)                             |
| `--region`       | string | Specifies the Camunda cluster region.                                                                 | `bru-2`                                                |
| `--clientId`     | string | Specifies the Camunda API client OAuth2 client ID.                                                    | (Prompted if not provided)                             |
| `--clientSecret` | string | Specifies the Camunda API Client OAuth2 client Secret.                                                | (Prompted if not provided)                             |
| `--to`           | string | Target directory for setup artifacts                                                                  | os-dependent `tmp` directory                           |

## Environment variables

The CLI can detect Camunda API credentials from environment variables. If these variables are set, the CLI will reuse them without prompting for input.

| Environment variable     | Description               |
| ------------------------ | ------------------------- |
| `CAMUNDA_CLUSTER_ID`     | Camunda cluster ID        |
| `CAMUNDA_CLIENT_ID`      | Camunda API client ID     |
| `CAMUNDA_CLIENT_SECRET`  | Camunda API client secret |
| `CAMUNDA_CLUSTER_REGION` | Camunda cluster region    |

### Examples

#### Example 1: Interactive setup

```bash
$> csap setup

# ...

? SAP integration module (odata)
  BTP plugin
❯ OData connector
  RFC connector
  All modules
```

This will guide you through the setup process interactively.

#### Example 2: Automating setup for the BTP plugin

```bash
$> csap setup --for btp-plugin \
  --camunda 8.7 \
  --deployment SaaS \
  --btpRoute my-btp-route.cfapps.eu10-004.hana.ondemand.com \
  --clusterId 64ecb347-dd50-49c9-ace2-20c9f6b0798d
  --region syd-2
  --clientId dIsfmFEB47_-Dt2uMlYdw-B_72stz.Yh \
  --clientSecret WzIQFJkxd2xopI7lOGArJ0815kC3SvU5ke~lI4did8k0RMG353DiVDPBPEW1-tuD7

# ...
```

This command sets up the BTP plugin for Camunda version 8.7 with all required options provided as command-line arguments.

#### Example 3: Setting up all modules, reusing credentials from environment

```bash
$> csap setup --for all \
  --camunda 8.6 \
  --deployment SaaS \

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

This command sets up all available SAP integration modules for Camunda version 8.6.

## Deploying modules

After each Camunda SAP integration module is set up with `csap`, it is ready for deployment. We consider `csap` to be the kitchen of the deployment lifecycle: it brings all the ingredients together, cooks the meal, plates it, and has it ready to serve.

Bringing the meal from the kitchen to the table, which translates to how to deploy the module to BTP, should be the responsibility of the SAP practice - along with getting the deployed SAP integration module into the application lifecycle management of the organization.
