---
id: flow-node-filters
title: Flow node filters
description: Take a closer look at flow node status filters, flow node date filters, flow node duration filters, and more.
---

## Flow node filter

Retrieve only those process instances that executed certain flow nodes within your process by using the `Flow Node Filter`. Selecting several values at once means that all the selected flow nodes need to have been executed at least once in the process instance lifetime. At the top of the flow node filter modal you can see a preview of the filter you are about to create. You can also filter process instances where certain flow nodes were not executed.

![Flow node filter in Camunda Optimize](./img/flownode-filter.png)

## Flow node selection

In flow node and user tasks reports, all flow nodes are included in the result by default. This could result in many table rows or chart entries which makes the visualization hard to read. This filter allows you to specify which flow nodes are included and deselect the ones that are not relevant to the report.

![Specifying which nodes are included in the report](./img/flowNodeSelection.png)

## Flow node status filter

Some flow nodes can take a relatively long time to complete (e.g. user tasks or long-running service tasks). By default, a report includes all flow nodes in the calculations, whether they are currently running, canceled, or already completed. You can change this behavior by adding a flow node status filter as a [flow node data filter](./filters.md#filter-behavior).

Adding one of the flow node status options will filter both instances and flow nodes according to the selected status:

- For instance reports: The filter will only include instances that have at least one flow node matching the filter criteria. This behavior can be seen if you are in variable, incident, or raw data reports.
- For flow node reports: Flow nodes that do not match the filter criteria will be excluded from the results.

This behavior can be seen if you are in flow nodes or user task reports.

Here are the possible options for this filter:

- Running flow nodes only: Your report will only collect information from flow nodes that are currently running.
- Completed flow nodes only: Considers only successfully completed flow nodes.
- Canceled flow nodes only: Considers only canceled flow nodes.
- Completed or canceled flow nodes only: Considers all completed flow nodes regardless of whether they were canceled or not.

:::note
For incident reports, flow node status filters always behave as instance filters and do not filter flow nodes.
:::

## Flow node date filter

Similar to process instance date filters, flow node date filters allow you to filter the report based on flow node start or end dates.

:::note
Reports with a flow node end date filter will only consider data from completed flow nodes.
:::

This filter type can be applied either as a [process instance](./filters.md#filter-behavior) or as a [flow node](./filters.md#filter-behavior) filter:

- When applied as a process instance filter, you are required to select the flow nodes that are to be relevant to the filter, yielding a report which will only consider those process instances where one or more of the selected flow nodes match the configured filter.

![Flow Node date filter](./img/flowNode-date-filter.png)

- When added as a flow node filter, there is no flow node selection. The resulting report automatically only includes data from those flow nodes which match the given filter.

## Flow node duration filter

If the **Flow Node Duration Filter** is applied as an instance filter, it will only regard process instances where one or more flow nodes took a certain amount of time for their execution. For instance, you can filter process instances where a flow node took more than three days or less than five seconds.

If applied as a flow node filter, it will filter flow nodes and only show the flow nodes that were selected in the filter.

![Flow Node duration filter in Camunda Optimize](./img/flowNode-duration-filter.png)

:::note
For incident reports, flow node duration filters always behave as instance filters regardless of where they were defined.
:::
