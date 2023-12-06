---
id: combined-process-reports
title: Combined process reports
description: Occasionally, it is necessary to compare multiple reports or visualize them together in one diagram.
---

<span class="badge badge--platform">Camunda 7 only</span>

## Creating a combined process report

Occasionally, it is necessary to compare multiple reports or visualize them together in one diagram. This can be achieved by creating a special type of report called a **combined process report**. To create a new combined process report, visit the homepage and click **Create New > New Report > Combined Process Report**.

![Creating a Combined process report](./img/combined-report-create.png)

Then, you are redirected to the combined process report builder. There, view the selection panel on the right to select multiple reports to combine.

:::note
If the combined process report is inside a collection, only reports in the same collection can be combined. If the combined process report is not in a collection, it can only combine reports that are also not in a collection.
:::

A preview of the selected reports will be displayed in the panel on the left.

![combined process report builder](./img/combined-report.png)

For example, combining two reports with a table visualization results in the following view:

![Combining two reports with a table visualization](./img/table-report.png)

And combining two reports with line chart visualization results in the following view:

![Combining two reports with line chart visualization](./img/area-chart-report.png)

You can change the color of chart reports by clicking on the color box near the name of the report.

You can also drag items in the list of selected reports to change their order in the report view.

:::note
Not all reports can be combined with each other given differences in their configurations, e.g. a different visualization, may make them incompatible. Therefore, when selecting a report, only the other reports that are combinable with the selected one will appear.
:::

Only reports that match the following criteria can be combined:
- Same group by
- Same visualization. Only the following visualizations are possible to combine and will show up in the combined selection list:
  - Bar chart
  - Line chart
  - Table
  - Number
- Same view but combining user task duration (work, idle, and total). Flow node duration reports are also possible.
- Process definition can be different.
- Furthermore, it is possible to combine reports grouped by start date with reports grouped by end date under the condition that the date interval is the same.

The following limitations do apply to combining reports:
- It is not possible to combine decision reports.
- Distributed reports cannot be combined
- Multi-measure reports, including reports containing multiple aggregations or multiple user task duration times, cannot be combined.


It is also possible to update the name of the report, save it, and add it to a dashboard exactly like the normal report. The combined process reports will also show up in the reports list along with the normal reports.

### Configure combined process reports

You can configure the combined process report using the cog wheel button available on the top right side of the screen.

For example, in all chart reports, you can change what to show in the tooltips, change the axis names, and set a goal line as shown in the figure below.

![Configurations available for combined process reports](./img/combined-config.png)
