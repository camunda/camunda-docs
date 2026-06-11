---
title: Install and start Camunda 8 Run
sidebar_label: Install and start
description: Install Camunda 8 Run locally, start it on macOS, Linux, or Windows, and shut it down cleanly.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {C8Run} from "@site/src/components/CamundaDistributions";

<!-- markdownlint-disable MD033 -->

Use this page to install Camunda 8 Run locally, start it on macOS, Linux, or Windows, and shut it down cleanly.

## Prerequisites

- **OpenJDK 21–25**: Required for running Camunda 8 as a Java application.
- **[Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md)**
- **If using Ubuntu**: Ubuntu 22.04 or newer

:::note
After installing OpenJDK, ensure `JAVA_HOME` is set by running `java -version` in a **new** terminal.

If no version of Java is found, follow your chosen installation's instructions for setting `JAVA_HOME` before continuing.
:::

## Install and start Camunda 8 Run

1. Download the latest release of <C8Run/> for your operating system and architecture. Opening the `.tgz` file extracts the Camunda 8 Run script into a new directory.
2. Navigate to the new `c8run` directory.
3. Start Camunda 8 Run by following the steps below, depending on your operating system.

<Tabs groupId="os" defaultValue="maclinux" values={[
{ label: 'Mac OS + Linux', value: 'maclinux' },
{ label: 'Windows', value: 'windows' },
]}>
<TabItem value="maclinux">

Run the helper script:

```bash
./start.sh
```

Or use the CLI command:

```bash
./c8run start
```

</TabItem>
<TabItem value="windows">

Use the CLI command:

```bash
.\c8run.exe start
```

</TabItem>
</Tabs>

If startup is successful, a browser window for Operate will open automatically. Alternatively, you can access Operate at [http://localhost:8080/operate](http://localhost:8080/operate).

:::note
If Camunda 8 Run fails to start, run the [shutdown script](#shut-down-camunda-8-run) to end the current processes, then run the start script again.
:::

For container-based local deployments, see the [developer quickstart with Docker Compose](../docker-compose.md).

For CLI flags and permanent configuration, see [configure Camunda 8 Run](./configuration.md).

## Shut down Camunda 8 Run

To shut down Camunda 8 Run and end all running processes, run the following command from the `c8run` directory:

<Tabs groupId="os-stop" defaultValue="maclinux" values={[
{ label: 'Mac OS + Linux', value: 'maclinux' },
{ label: 'Windows', value: 'windows' },
]}>
<TabItem value="maclinux">

```bash
./shutdown.sh
```

</TabItem>
<TabItem value="windows">

```bash
.\c8run.exe stop
```

</TabItem>
</Tabs>

For Docker Compose environments, use the stop commands in the [developer quickstart with Docker Compose](../docker-compose.md).

## Next steps

- Review [configure Camunda 8 Run](./configuration.md).
- Review [configure secondary storage in Camunda 8 Run](./secondary-storage.md).
- Identify and resolve [common issues when starting, configuring, or using Camunda 8 Run](../c8run-troubleshooting.md).
