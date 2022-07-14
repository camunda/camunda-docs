---
id: decision-filter
title: Filters
description: Narrow down your view on the decision by creating reports based on a subset of all decision evaluations.
---

<span class="badge badge--platform">Camunda Platform 7 only</span>

Similar to [filters for process analysis](../process-analysis/filters.md), you can define filters for your decision reports.

You can filter by the [evaluation date](#evaluation-date-filter) of the decision, or by [input and output variables](../process-analysis/variable-filters.md). This screenshot shows how to add a filter to your decision report:

![Decision Report with open filter list in Camunda Optimize](./img/report-with-filterlist-open.png)

## Evaluation date filter

Applying an evaluation date filter will result in the report considering only decision evaluations which occurred within the defined date range. Only one evaluation date filter can be defined for any report.

Like the [process instance date filters](../process-analysis/metadata-filters.md#date-filters), you can define a fixed or relative filter. Read the appropriate section in the process filter guide for details about the differences.

As an alternative way to create an evaluation date filter, you can use your mouse to select the area you want to create the filter for if your report is visualized as a bar or line chart.

![Zooming into a section of the chart](./img/zoom-in.png)

## Variable filter

Using the input or output variable filter retrieves only those decisions where the evaluation had certain variable values as either input or output. For example, assume you want to analyze only those decision evaluations where the output variable **Classification** had the value **budget**. You can achieve this by creating an output variable filter, selecting the **Classification** variable from the input and check the **budget** option.

Depending on the variable type, different ways to specify the value range are available. Read the [variable filter section](../process-analysis/variable-filters.md) in the filter guide to see all possible options.
