---
id: basic-operate-navigation
title: Getting familiar with Operate
description: "Learn how to navigate Operate and its features."
---

:::note
This section and the next section, [variables and incidents](./resolve-incidents-update-variables.md), assumes you’ve deployed a process to Zeebe and created at least one process instance.

If you’re not sure how to deploy processes or create instances, visit our [guides section](/guides/introduction-to-camunda-8.md) to get started with Camunda.
:::

In the following sections, we’ll use the same [`order-process.bpmn`](/bpmn/operate/order-process.bpmn) process model.

## View a deployed process

To view a deployed process, take the following steps:

1. In the **Process Instances by Name** panel on your dashboard, note the list of your deployed processes and running instances.

![operate-view-process](./img/get-familiar-with-operate/operate-introduction.png)

2. When you click on the name of a deployed process in the **Process Instances by Name** panel, you’ll navigate to a view of that process model and all running instances.

![operate-view-process](./img/get-familiar-with-operate/operate-view-process.png)

3. From this **Processes** tab, you can cancel a single running process instance by clicking the cancel icon under **Operations** next to the process.

![operate-cancel-process-instance](./img/get-familiar-with-operate/operate-view-process-cancel.png)

## Inspect a process instance

Running process instances appear in the **Instances** section below the process model. To inspect a specific instance, click the **Process Instance Key**.

![operate-inspect-instance](./img/get-familiar-with-operate/operate-process-instance-id.png)

Here, observe details about the process instance, including the instance history and the variables attached to the instance.

![operate-view-instance-detail](./img/get-familiar-with-operate/operate-view-instance-detail.png)

To visualize the performance of process instances, we recommend utilizing [Optimize]($optimize$/components/what-is-optimize).
