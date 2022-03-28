---
id: install
title: "Local installation"
sidebar_label: "Install"
---

This page guides you through the initial installation of the Zeebe broker and next steps for development purposes.

## Prerequisites

- Operating system:
  - Linux
  - Windows/MacOS (development only, not supported for production)
- Java Virtual Machine:
  - Oracle Hotspot 11, or
  - Open JDK 11

## Download a distribution

Download the latest Zeebe release from the [GitHub release page](https://github.com/camunda-cloud/zeebe/releases).

Once you've downloaded a distribution, extract it into a folder of your choice. 

To extract the Zeebe distribution and start the broker, **Linux users** can type the following:

```bash
tar -xzf zeebe-distribution-X.Y.Z.tar.gz -C zeebe/
./bin/broker
```

For **Windows users**, take the following steps:

1. Download the `.zip` package.
2. Extract the package using your preferred unzip tool.
3. Open the extracted folder.
4. Navigate to the `bin` folder.
5. Start the broker by double-clicking on the `broker.bat` file.

Once the Zeebe broker has started, it should produce the following output:

```
bash
23:39:13.246 [] [main] INFO  io.camunda.zeebe.broker.system - Scheduler configuration: Threads{cpu-bound: 2, io-bound: 2}.
23:39:13.270 [] [main] INFO  io.camunda.zeebe.broker.system - Version: X.Y.Z
23:39:13.273 [] [main] INFO  io.camunda.zeebe.broker.system - Starting broker with configuration {
```

## Next steps

As a next step, you can install Camunda Modeler.

Camunda Modeler is an open-source desktop BPMN modeling application created specifically for Zeebe. This application gives developers powerful features to design and deploy automated processes, human workflows, decision tables, and decision requirement diagrams using the globally-recognized [BPMN](https://camunda.com/bpmn/) and [DMN](https://camunda.com/dmn/) standards.

Get started with Camunda Modeler using our [installation guide](/components/modeler/camunda-modeler/install-the-modeler.md).
