---
id: install
title: "Local installation"
sidebar_label: "Install"
---

This page guides you through the initial installation of the Zeebe broker and Camunda Modeler for development purposes.

## Prerequisites

- Operating System:
  - Linux
  - Windows/MacOS (development only, not supported for production)
- Java Virtual Machine:
  - Oracle Hotspot 11, or
  - Open JDK 11

## Download a distribution

You can always download the latest Zeebe release from the [Github release page](https://github.com/zeebe-io/zeebe/releases).

Once you have downloaded a distribution, extract it into a folder of your choice. To extract the Zeebe distribution and start the broker, **Linux users** can type:

```bash
tar -xzf zeebe-distribution-X.Y.Z.tar.gz -C zeebe/
./bin/broker
```

**Windows users** can download the `.zip` package and extract it using their favorite unzip tool. They can then open the extracted folder, navigate to the `bin` folder and start the broker by double-clicking on the `broker.bat` file.

Once the Zeebe broker has started, it should produce the following output:

```
bash
23:39:13.246 [] [main] INFO  io.zeebe.broker.system - Scheduler configuration: Threads{cpu-bound: 2, io-bound: 2}.
23:39:13.270 [] [main] INFO  io.zeebe.broker.system - Version: X.Y.Z
23:39:13.273 [] [main] INFO  io.zeebe.broker.system - Starting broker with configuration {
```

## Install the Camunda Modeler

The Camunda Modeler is an open-source desktop BPMN modeling application created specifically for Zeebe.

[You can download the most recent Camunda Modeler release here.](https://camunda.com/download/modeler/)
