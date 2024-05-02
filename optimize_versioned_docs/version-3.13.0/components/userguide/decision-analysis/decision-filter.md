---
id: decision-filter
title: Filters
description: Narrow down your view on the decision by creating reports based on a subset of all decision evaluations.
---

<span class="badge badge--platform">Camunda 7 only</span>

You can enhance your decision reports in Camunda Optimize by applying filters, similar to [process analysis filters](../process-analysis/filters.md).

To refine your decision reports, utilize filters for the [evaluation date](#evaluation-date-filter) or [input and output variables](../process-analysis/variable-filters.md):

![Decision Report with open filter list in Camunda Optimize](./img/report-with-filterlist-open.png)

## Evaluation date filter

Applying an evaluation date filter narrows down the report to consider only decision evaluations within the specified date range. Remember, only one evaluation date filter can be defined per report.

You can set a fixed or relative filter, similar to [process instance date filters](../process-analysis/metadata-filters.md#date-filters). Check the process filter guide for more details.

Alternatively, use your mouse to create an evaluation date filter by selecting the desired area if your report is presented as a bar or line chart.

![Zooming into a section of the chart](./img/zoom-in.png)

## Variable filter

Utilize the input or output variable filter to focus on decisions with specific variable values. For example, you can analyze decisions where the output variable **Classification** is **budget**. Create an output variable filter, choose the **Classification** variable, and check the **budget** option.

For various ways to specify value ranges based on variable types, explore the [variable filter section](../process-analysis/variable-filters.md) in the filter guide.
