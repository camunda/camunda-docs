---
id: c8run
title: "Local installation with C8Run"
sidebar_label: "C8Run"
description: "Install and run a local Camunda 8 environment via a downloadable script."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::note
C8Run is not supported for production use.
:::

The Camunda 8 Run Distribution, or C8Run, allows you to set up a local installation environment of Camunda 8 via a downloadable script. This page guides you through the manual installation of the Camunda 8 on a local or virtual machine.

## Prerequisites

- OpenJDK 21+
- Desktop Modeler

:::note
After installing OpenJDK, ensure `JAVA_HOME` is set by running `java -version` in a **new** terminal.

If no version of Java is found, follow your chosen installation's instructions for setting `JAVA_HOME` before continuing.
:::

## Install and start C8Run

1. Download the [latest release of C8run](https://github.com/camunda/camunda/releases/tag/c8run-8.6.0-alpha3) for your operating system and architecture. Opening the .tgz file will extract the C8Run script into a new directory.
2. Navigate to the new C8Run directory.
3. Start C8Run by running `./start.sh` (or `.\c8run.exe start` on Windows) in your terminal.

When successful, a new Operate window will open automatically.

:::note
If C8Run fails to start, run the [shutdown script](#shut-down-c8run) to end the current processes before running the start script again.
:::

### Configuration options

The following command line arguments are available:

| Argument     | Description                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `--config`   | Applies the specified Zeebe [`application.yaml`](/self-managed/zeebe-deployment/configuration/configuration.md). _Not available on Windows._ |
| `--detached` | Starts C8Run as a detached process. The process is detached by default on Windows.                                                           |

## Access Camunda components

All C8Run components can be accessed with the username/password combination `demo`/`demo`.

Tasklist and Operate are available at:

- Tasklist: `http://localhost:8080/tasklist`
- Operate: `http://localhost:8080/operate`

The following components do not have a web interface, but the URLs may be required for any additional configuration:

- Zeebe Gateway: `http://localhost:26500`
- Connectors: `http://localhost:8085`

:::note
The Connectors URL displays a login page, but cannot be logged into.
:::

### Deploy diagrams from Desktop Modeler

To [deploy diagrams](/self-managed/modeler/desktop-modeler/deploy-to-self-managed.md) from Desktop Modeler, the following configuration is required:

- **Target:** Self-Managed
- **Cluster endpoint:** `http://localhost:26500`, the location of your Zeebe Gateway
- **Authentication:** None

A success notification will display when complete. [Start a new process instance](/components/modeler/desktop-modeler/start-instance.md) to view your running process in Operate.

### Use built-in and custom Connectors

Desktop Modeler [automatically fetches](/components/modeler/desktop-modeler/use-connectors.md/#automatic-connector-template-fetching) templates for pre-built Connectors. [Custom Connectors](/components/connectors/custom-built-connectors/connector-sdk.md) can also be added to your C8Run distribution.

To add a custom Connector:

1. Place the Connector's .jar file in the `/custom_connectors` folder contained in the C8Run directory.
2. Place the element template in the appropriate folder for your installation. See [Search Paths](/components/modeler/desktop-modeler/search-paths/search-paths.md) for more information.

Once configured correctly, your Connectors will be available for use in Modeler.

## Shut down C8Run

To shut down C8Run and end all running processes, run `./shutdown.sh` (or `.\c8run.exe stop` on Windows) from the C8Run directory.
