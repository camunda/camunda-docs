## --

## Prerequisites

- OpenJDK 21+
- Desktop Modeler

:::note
After installing OpenJDK, ensure `JAVA_HOME` is set by running `java -version` in a **new** terminal.

If no version of Java is found, follow your chosen installation's instructions for setting `JAVA_HOME` before continuing.
:::

## Install and start C8Run

1. Download and extract the [latest release of C8run](link to tgz). This .tgz file will extract the C8Run script into a new directory.
2. Navigate to the new C8Run directory.
3. Start C8Run by running `./start.sh` (or `./start.bat` on Windows) in your terminal.

When successful, a new Operate window will open automatically.

:::note
If C8Run fails to start, run [`./shutdown.sh`](#shut-down-c8run) to end the current process before running `./start.sh` again.
:::
