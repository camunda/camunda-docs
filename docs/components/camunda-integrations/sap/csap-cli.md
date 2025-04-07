---
id: csap-cli
title: CSAP setup command line utility
description: "Learn about CSAP, a CLI to configure all SAP integration artifacts for deployment."
---

The Camunda SAP Integration CLI (`csap`) is a command-line tool designed to simplify the setup of Camunda's SAP integration modules. It provides a streamlined process for configuring and building these modules for deployment.

## Features

- Distributed as a standalone binary. No local Deno installation required.
- Interactive prompts for configuration.
- Command-line switches for automation.
- Support for multiple SAP integration modules.
- Automatic handling of dependencies and build processes.
- Compatibility with Camunda SaaS deployments.

## Supported modules

The CLI supports the following SAP integration modules:

1. **BTP plugin**: Enables rendering task forms in Fiori and provides BTP integration.
2. **OData Connector**: Facilitates interaction with S/4HANA or ECC systems from a BPMN model.
3. **RFC Connector**: Allows querying BAPIs and Remote Function Modules on SAP ECC systems.
4. **All Modules**: Configures all available modules.

## Installation

To use the CLI, download the binary matching your operating system and architecture from the [releases](https://github.com/camunda/csap-cli/releases) section of its repository:

1. Navigate to the [releases](https://github.com/camunda/csap-cli/releases) page.
2. Download the binary for your platform:
   - For Linux: `csap-x86_64-unknown-linux-gnu`
   - For macOS (Intel): `csap-x86_64-apple-darwin`
   - For macOS (Apple Silicon): `csap-aarch64-apple-darwin`
   - For Windows: `csap-x86_64-pc-windows-msvc.exe`
3. Place the binary in a directory included in your system's `PATH` for easy access.

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

### Interactive mode

Run the following command to start the interactive setup:

```bash
csap setup
```

The CLI will prompt you for all necessary inputs, such as the SAP integration module, Camunda version, deployment option, and credentials.

### Command-line options

All prompts are also available as command-line switches, allowing you to automate the setup process. Below is the full list of options:

#### Command syntax

```bash
csap setup [options]
```

#### Options

| Option           | Type   | Description                                                                                           | Default value              |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------- | -------------------------- |
| `--for`          | string | Specifies the SAP integration module to set up. Choices: `btp-plugin`, `odata`, `rfc`, `all`.         | `odata`                    |
| `--camunda`      | string | Specifies the Camunda version. Choices: `8.7`, `8.6`, `8.5`.                                          | `8.7`                      |
| `--deployment`   | string | Specifies the Camunda deployment option. Choices: `SaaS`. (`SM` for self managed currently disabled.) | `SaaS`                     |
| `--btpRoute`     | string | (For `btp-plugin` or `all`) Specifies the BTP route to reach the plugin. This is SAP/BTP specific.    | `camunda-btp-plugin`       |
| `--clusterId`    | string | Specifies the Camunda Cluster ID.                                                                     | (Prompted if not provided) |
| `--region`       | string | Specifies the Camunda Cluster Region.                                                                 | `bru-2`                    |
| `--clientId`     | string | Specifies the Camunda API Client OAuth2 Client ID.                                                    | (Prompted if not provided) |
| `--clientSecret` | string | Specifies the Camunda API Client OAuth2 Client Secret.                                                | (Prompted if not provided) |

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
