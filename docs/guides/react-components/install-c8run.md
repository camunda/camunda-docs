## --

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
If C8Run fails to start, run the [shutdown script](/self-managed/setup/deploy/local/c8run.md/#shut-down-c8run) to end the current processes before running the start script again.
:::

For more information and local configuration options, see the [C8Run distribution guide](/self-managed/setup/deploy/local/c8run.md).
