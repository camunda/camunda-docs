---
id: c8run
title: "Local installation with C8Run"
sidebar_label: "C8Run"
description: "Install Camunda 8 locally via an automated script."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The Camunda 8 Run Distribution, or C8Run, allows you to set up a local installation environment of Camunda 8 via a downloadable script. This page guides you through the manual installation of the Camunda 8 on a local or virtual machine.

## Prerequisites

- OpenJDK 21+
- Desktop Modeler

:::note
After installing OpenJDK, ensure `JAVA_HOME` is set by running `java -version` in a **new** terminal.

If no version of Java is found, follow your chosen installation's instructions for setting `JAVA_HOME` before continuing.
:::

## Install and start C8Run

1. Download the [latest release of C8run](link to tgz). Opening this .tgz file will extract the C8Run script into a new directory.
2. Navigate to the new C8Run directory.
3. Start C8Run by running `./start.sh` (or `./start.bat` on Windows) in your terminal.

When successful, a new Operate window will open automatically.

:::note
If C8Run fails to start, run [`./shutdown.sh`](#shut-down-c8run) to end the current process before running `./start.sh` again.
:::

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

To [deploy diagrams](/docs/self-managed/modeler/desktop-modeler/deploy-to-self-managed.md) from Desktop Modeler, the following configuration is required:

- **Target:** Self-Managed
- **Cluster endpoint:** `http://localhost:26500`, the location of your Zeebe Gateway
- **Authentication:** Basic
- **Username/Password:** `demo`/`demo`

![The default credentials to deploy a diagram to Zeebe](./img/c8run-deploy-diagram.png)

A success notification will display when complete. [Start a new process instance](/docs/components/modeler/desktop-modeler/start-instance.md) to view your running process in Operate.

### Use built-in and custom Connectors

Desktop Modeler [automatically fetches](components/modeler/desktop-modeler/use-connectors/#fetch-camunda-8-connector-templates-automatically) templates for pre-built Connectors. [Custom Connectors](/docs/components/connectors/custom-built-connectors/connector-sdk.md) can also be added to your C8Run distribution.

To add a custom Connector:

1. Place the Connector's .jar file in the `/custom_connectors` folder contained in the C8Run directory.
2. Place the element template in the appropriate folder for your installation. See [Search Paths](/docs/components/modeler/desktop-modeler/search-paths/search-paths.md) for more information.

Once configured correctly, your Connectors will be available for use in Modeler.

## Shut down C8Run

To shut down C8Run and end all running processes, run `./shutdown.sh` from the C8Run directory.
