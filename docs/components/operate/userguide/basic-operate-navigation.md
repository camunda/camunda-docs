---
id: basic-operate-navigation
title: Get familiar with Operate
description: "Learn how to navigate Operate and its features."
---

Learn how to navigate Camunda 8 Operate.

## Before you begin

This section and the next section, [variables and incidents](./resolve-incidents-update-variables.md), assume you’ve deployed a process to Zeebe and created at least one process instance, using the [`order-process.bpmn`](/bpmn/operate/order-process.bpmn) process model. If you’re not sure how to deploy processes or create instances, visit our [guides section](/guides/introduction-to-camunda-8.md) to get started with Camunda.

## View a deployed process

To view a deployed process, take the following steps:

1. On the **Dashboard** page, in the **Process Instances by Name** panel, note the list of your deployed processes and running instances.
2. When you click on the name of a deployed process in the **Process Instances by Name** panel, you’ll navigate to a view of that process model and all running instances.
3. From this **Processes** page, you can cancel a single running process instance by clicking the cancel icon under the **Operations** column of the **Process Instances** table.

## Inspect a process instance

Running process instances appear in the **Process Instances** table below the process model. To inspect a specific instance, click the **Process Instance Key**.

Here, observe details about the process instance, including the instance history and the variables attached to the instance. To visualize the performance of process instances, we recommend utilizing [Optimize](/components/optimize/what-is-optimize.md).
