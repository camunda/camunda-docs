---
id: csap-cli
title: csap setup command line utility
description: "Learn about csap, a cli to configure all SAP integration artifacts for deployment"
---

# Camunda SAP Integration CLI (csap)

The Camunda SAP Integration CLI (`csap`) is a command-line tool designed to simplify the setup of Camunda's SAP integration modules. It provides a streamlined process for configuring and building these modules ready for deployment.

## Features

- Distributed as a standalone binary—no local Deno installation required.
- Interactive prompts for configuration.
- Command-line switches for automation.
- Support for multiple SAP integration modules.
- Automatic handling of dependencies and build processes.
- Compatibility with Camunda SaaS deployments.

## Supported Modules

The CLI supports the following SAP integration modules:

1. **BTP Plugin**: Enables rendering task forms in Fiori and provides BTP integration.
2. **OData Connector**: Facilitates interaction with S/4HANA or ECC systems from a BPMN model.
3. **RFC Connector**: Allows querying BAPIs and Remote Function Modules on SAP ECC systems.
4. **All Modules**: Configures all available modules.

## Installation

To use the CLI, download the binary matching your operating system and architecture from the [Releases](https://github.com/camunda/csap-cli/releases) section of its repository.

### Steps:

1. Navigate to the [Releases](https://github.com/camunda/csap-cli/releases) page.
2. Download the binary for your platform:
   - For Linux: `csap-x86_64-unknown-linux-gnu`
   - For macOS (Intel): `csap-x86_64-apple-darwin`
   - For macOS (Apple Silicon): `csap-aarch64-apple-darwin`
   - For Windows: `csap-x86_64-pc-windows-msvc.exe`
3. Place the binary in a directory included in your system's `PATH` for easy access.

### Example for Linux/macOS:

```bash
chmod +x csap-x86_64-unknown-linux-gnu
mv csap-x86_64-unknown-linux-gnu /usr/local/bin/csap
```

### Example for Windows:

1. Rename the binary to `csap.exe` if necessary.
2. Add the directory containing `csap.exe` to your system's `PATH`.

## Usage

The CLI provides a `setup` command to prepare one of Camunda's SAP integration modules for deployment. You can run the command interactively or provide all required options as command-line switches.

### Interactive Mode

Run the following command to start the interactive setup:

```bash
csap setup
```

The CLI will prompt you for all necessary inputs, such as the SAP integration module, Camunda version, deployment option, and credentials.

### Command-Line Options

All prompts are also available as command-line switches, allowing you to automate the setup process. Below is the full list of options:

#### Command Syntax

```bash
csap setup [options]
```

#### Options

| Option           | Type   | Description                                                                                           | Default Value              |
| ---------------- | ------ | ----------------------------------------------------------------------------------------------------- | -------------------------- |
| `--for`          | string | Specifies the SAP integration module to set up. Choices: `btp-plugin`, `odata`, `rfc`, `all`.         | `odata`                    |
| `--camunda`      | string | Specifies the Camunda version. Choices: `8.7`, `8.6`, `8.5`.                                          | `8.7`                      |
| `--deployment`   | string | Specifies the Camunda deployment option. Choices: `SaaS`. (`SM` for self managed currently disabled.) | `SaaS`                     |
| `--btpRoute`     | string | (For `btp-plugin` or `all`) Specifies the BTP route to reach the plugin. This is SAP/BTP specific.    | `camunda-btp-plugin`       |
| `--clusterId`    | string | Specifies the Camunda Cluster ID.                                                                     | (Prompted if not provided) |
| `--region`       | string | Specifies the Camunda Cluster Region.                                                                 | `bru-2`                    |
| `--clientId`     | string | Specifies the Camunda API Client OAuth2 Client ID.                                                    | (Prompted if not provided) |
| `--clientSecret` | string | Specifies the Camunda API Client OAuth2 Client Secret.                                                | (Prompted if not provided) |

## Environment Variables

The CLI can detect Camunda API credentials from environment variables. If these variables are set, the CLI will reuse them without prompting for input.

| Environment Variable     | Description               |
| ------------------------ | ------------------------- |
| `CAMUNDA_CLUSTER_ID`     | Camunda Cluster ID        |
| `CAMUNDA_CLIENT_ID`      | Camunda API Client ID     |
| `CAMUNDA_CLIENT_SECRET`  | Camunda API Client Secret |
| `CAMUNDA_CLUSTER_REGION` | Camunda Cluster Region    |

### Examples

#### Example 1: Interactive Setup

```bash
csap setup
```

This will guide you through the setup process interactively.

#### Example 2: Automating Setup for the BTP Plugin

```bash
csap setup --for btp-plugin --camunda 8.7 --deployment SaaS --btpRoute my-btp-route --clusterId my-cluster-id --region my-region --clientId my-client-id --clientSecret my-client-secret
```

This command sets up the BTP Plugin for Camunda version 8.7 with all required options provided as command-line arguments.

#### Example 3: Setting Up All Modules

```bash
csap setup --for all --camunda 8.6 --deployment SaaS --clusterId my-cluster-id --region my-region --clientId my-client-id --clientSecret my-client-secret
```

This command sets up all available SAP integration modules for Camunda version 8.6.
