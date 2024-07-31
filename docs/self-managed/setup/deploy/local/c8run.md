---
id: c8run
title: "C8 Run installation on local machine"
sidebar_label: "C8Run"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page guides you through the manual installation of the Camunda 8 on a local or virtual machine.

## Prerequisites

- Operating system:
  - Linux
  - Windows/macOS
- Java Virtual Machine, see [supported environments](/reference/supported-environments.md) for version details

Make sure to configure the web applications to use a port that is available. By default the web applications like Operate and Tasklist listen both to port 8080.

## Getting dependencies

<Tabs groupId="dependencies" defaultValue="windows" queryString values={[{label: 'Windows', value: 'windows' },{label: 'Linux', value: 'linux' }]} >
<TabItem value="windows">

OpenJDK 21: https://www.oracle.com/java/technologies/downloads/?er=221886#jdk21-windows

</TabItem>
<TabItem value="linux">
<Tabs groupId="linuxDistro" defaultValue="ubuntu" queryString values={[{label: 'Ubuntu', value: 'ubuntu' },{label: 'RHEL', value: 'rhel' },{label: 'Other', value: 'other'}]} >
<TabItem value="ubuntu">

```
apt install -y openjdk-21-jdk
```

</TabItem>
<TabItem value="rhel">

```
yum install -y openjdk-21-jdk
```

</TabItem>

</Tabs>
</TabItem>
</Tabs>

## Accessing each web component

- Tasklist: http://localhost:8080/tasklist
- Operate: http://localhost:8080/operate

## Accessing components without a web interface

The following components do not have a web interface to log into, however, the urls may be important as configuration parameters.

- Zeebe Gateway: http://localhost:26500
- Connectors: http://localhost:8085

## How to run C8Run

Download the tgz file of the latest c8run release. Link

```bash
wget ...
tar -xzf file.tgz
cd ...
```

```bash
./start.sh
```

This script will start 3 processes:

1. Elasticsearch
2. Connectors runtime
3. Zeebe, tasklist, operate monojar

and each process will have a corresponding `.pid` file inside the `internal` folder. These files contain a process id so that the `shutdown.sh` will use so that it can shutdown the application.

```bash
./shutdown.sh
```

## Custom connectors

In c8run, there is an empty folder in `./custom_connectors` where you can put in `.jar` files of custom connectors.

Then, make sure you have the element template located in the appropriate folder:
https://docs.camunda.io/docs/next/components/modeler/desktop-modeler/search-paths/

- Linux `~/.camunda/element-templates`
- Mac OS `~/Library/Application Support/camunda-modeler/resources/element-templates`

## Gotchas

- Connectors currently has a login page that is misleading to users. This component is not intended to be logged into.
- The script runs 3 processes that will poll along an interval to ensure it's healthy. If there's an issue, and the program doesn't start, try running `./shutdown.sh` and `./start.sh` again.
