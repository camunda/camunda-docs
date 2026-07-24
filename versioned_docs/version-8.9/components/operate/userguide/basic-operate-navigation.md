---
id: basic-operate-navigation
title: Get familiar with Operate
description: "Learn how to navigate Operate and its features."
---

Learn how to navigate Camunda 8 Operate.

## Before you begin

This section and the next section, [Resolve incidents and update variables](./resolve-incidents-update-variables.md), assume you’ve deployed a process to Zeebe and created at least one process instance, using the [`order-process.bpmn`](/bpmn/operate/order-process.bpmn) process model. If you’re not sure how to deploy processes or create instances, visit our [guides section](/guides/introduction-to-camunda-8.md) to get started with Camunda.

## View a deployed process

To view a deployed process, take the following steps:

1. On the **Dashboard** page, in the **Process Instances by Name** panel, note the list of your deployed processes and running instances. The dashboard only displays processes with active instances, so processes without running or incident instances are not shown.
2. When you click on the name of a deployed process in the **Process Instances by Name** panel, you’ll navigate to a view of that process model and all running instances.
3. From this **Processes** page, you can cancel a single running process instance by clicking the cancel icon under the **Operations** column of the **Process Instances** table.

## Inspect a process instance

Running process instances appear in the **Process Instances** table below the process model. To inspect a specific instance, click the **Process Instance Key**.

The process instance page has three parts:

- A header showing the process instance's key, version, and state.
- A process diagram showing the instance's current progress.
- A bottom panel with tabs, including **Details**, **Incidents** (shown only when the instance has an incident), and **Variables**.

Click an element in the diagram to select it, then use the tabs in the bottom panel to inspect its details, incidents, and variables. In earlier versions, an element's details and incidents appeared in a metadata popover when you clicked it; the popover is now replaced by the **Details** and **Incidents** tabs. To visualize process instance performance, use [Optimize](/components/optimize/what-is-optimize.md).

## Navigate to a called process instance

When a call activity in the diagram calls another process, double-click the call activity element to jump directly to the called process instance.

Double-click navigation only works when the process instance has called exactly one process instance in total. If it has called more than one — for example, through multiple call activities, or a call activity that ran more than once — double-clicking does nothing.

For a reliable way to find a called process instance, take the following steps:

1. Click the call activity element to select it.
2. Open the **Details** tab.
3. In the row labeled **Called Process Instance**, click the link — shown as the called process's name and instance key — to navigate to that instance.

If the call activity has called more than one process instance, the **Details** tab shows a **View all** link instead of a single link. This link filters the **Processes** page by the whole process instance, so it shows every instance it has called, including from other call activities — not only the one you selected.
