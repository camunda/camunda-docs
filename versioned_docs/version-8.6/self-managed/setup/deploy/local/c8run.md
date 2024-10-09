---
id: c8run
title: "Local installation with Camunda 8 Run"
sidebar_label: "Camunda 8 Run"
keywords: ["C8Run"]
description: "Use the Camunda 8 Run single application script to set up a local development environment."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::note
Camunda 8 Run is not supported for production use.
:::

The Camunda 8 Run script allows you to install and start a simplified, single-application Camunda configuration in a local development environment. This page guides you through using Camunda 8 Run on a local or virtual machine.

Camunda 8 Run includes the following:

- Zeebe
- Operate
- Tasklist
- Connectors
- Elasticsearch

## Prerequisites

- OpenJDK 21+
- [Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md)

To use Camunda 8 Run with the Camunda REST API, cookie authentication is also required. See the [Operate API documentation](/apis-tools/operate-api/authentication.md#authentication-via-cookie-self-managed-only) for an example of cookie authentication.

:::note
After installing OpenJDK, ensure `JAVA_HOME` is set by running `java -version` in a **new** terminal.

If no version of Java is found, follow your chosen installation's instructions for setting `JAVA_HOME` before continuing.
:::

## Install and start Camunda 8 Run

1. Download the [latest release of Camunda 8 Run](https://github.com/camunda/camunda/releases/tag/c8run-8.6.0) for your operating system and architecture. Opening the .tgz file extracts the Camunda 8 Run script into a new directory.
2. Navigate to the new `c8run` directory.
3. Start Camunda 8 Run by running `./start.sh` (or `.\c8run.exe start` on Windows) in your terminal.

When successful, a new Operate window automatically opens.

:::note
If Camunda 8 Run fails to start, run the [shutdown script](#shut-down-camunda-8-run) to end the current processes, then run the start script again.
:::

### Configuration options

The following command line arguments are available:

| Argument     | Description                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `--config`   | Applies the specified Zeebe [`application.yaml`](/self-managed/zeebe-deployment/configuration/configuration.md). _Not available on Windows._ |
| `--detached` | Starts Camunda 8 Run as a detached process. The process is detached by default on Windows.                                                   |

## Access Camunda components

All Camunda 8 Run components can be accessed using the username/password combination `demo`/`demo`.

Tasklist and Operate are available at:

- Tasklist: http://localhost:8080/tasklist
- Operate: http://localhost:8080/operate

The following components do not have a web interface, but the URLs may be required for additional configuration:

- Zeebe Gateway: http://localhost:26500
- Connectors: http://localhost:8085

:::note
The Connectors URL displays a login page, but cannot be logged into.
:::

### Deploy diagrams from Desktop Modeler

Make sure you have installed [Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md) before continuing.

To [deploy diagrams](/self-managed/modeler/desktop-modeler/deploy-to-self-managed.md) from Desktop Modeler, the following configuration is required:

- **Target:** Self-Managed
- **Cluster endpoint:** `http://localhost:26500`, the location of your Zeebe Gateway
- **Authentication:** None

A success notification displays when complete. [Start a new process instance](/components/modeler/desktop-modeler/start-instance.md) to view your running process in Operate.

### Use built-in and custom Connectors

Desktop Modeler [automatically fetches](/components/modeler/desktop-modeler/use-connectors.md/#automatic-connector-template-fetching) templates for pre-built Connectors. [Custom Connectors](/components/connectors/custom-built-connectors/connector-sdk.md) can also be added to your Camunda 8 Run distribution.

To add a custom Connector:

1. Place the Connector's .jar file in the `/custom_connectors` folder contained in the `/c8run` directory.
2. Place the element template in the appropriate folder for your installation. See [Search Paths](/components/modeler/desktop-modeler/search-paths/search-paths.md) for more information.

Once configured correctly, your Connectors are available for use in Modeler.

## Shut down Camunda 8 Run

To shut down Camunda 8 Run and end all running processes, run `./shutdown.sh` (or `.\c8run.exe stop` on Windows) from the C8Run directory.
