### Prerequisites

- [Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md)

### Install and start Camunda 8 Run

import {C8Run} from "@site/src/components/CamundaDistributions";

1. Download the latest release of <C8Run/> for your operating system and architecture. Opening the .tgz file extracts the Camunda 8 Run script into a new directory.
2. Navigate to the new `c8run` directory.
3. Start Camunda 8 Run by running `./start.sh` (or `.\c8run.exe start` on Windows) in your terminal.

When successful, a new Operate window automatically opens.

:::note
If Camunda 8 Run fails to start, run the [shutdown script](/self-managed/quickstart/developer-quickstart/c8run/install-start.md#shut-down-camunda-8-run) to end the current processes, then run the start script again.
:::

:::note
Starting with 8.10.0-alpha2, Camunda 8 Run no longer requires Java to start.
Camunda 8 Run starts with H2 as the default secondary storage. Elasticsearch is still supported but must be explicitly enabled in `c8run/configuration/application.yaml`.
:::

For more information and local configuration options, see the [Camunda 8 Run installation guide](/self-managed/quickstart/developer-quickstart/c8run/install-start.md).
