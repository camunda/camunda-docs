### Prerequisites

- OpenJDK 21+
- [Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md)

:::note
After installing OpenJDK, ensure `JAVA_HOME` is set by running `java -version` in a **new** terminal.

If no version of Java is found, follow your chosen installation's instructions for setting `JAVA_HOME` before continuing.
:::

### Install and start Camunda 8 Run

import {C8Run} from "@site/src/components/CamundaDistributions";

1. Download the latest release of <C8Run/> for your operating system and architecture. Opening the .tgz file extracts the Camunda 8 Run script into a new directory.
2. Navigate to the new `c8run` directory.
3. Start Camunda 8 Run by running `./start.sh` (or `.\c8run.exe start` on Windows) in your terminal.

When successful, a new Operate window automatically opens.

:::note
If Camunda 8 Run fails to start, run the [shutdown script](/self-managed/quickstart/developer-quickstart/c8run.md#shut-down-camunda-8-run) to end the current processes, then run the start script again.
:::

For more information and local configuration options, see the [Camunda 8 Run installation guide](/self-managed/quickstart/developer-quickstart/c8run.md).
