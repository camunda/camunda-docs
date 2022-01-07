---
id: creating-reports
title: Creating reports
---

## Overview

Reports offer the ability to view your data from different angles, and thus capture all aspects that influence your processes, show new trends, or depict your current business state.

Each report consists of the [edit mode](#edit-mode) and [view mode](#view-mode) to perform different kinds of actions on it.

## Creating a single report

To create a custom report based on a key performance indicator (KPI) you’d like to analyze, and to incorporate this report into a dashboard, follow the steps below:

1. On the right side of the **Home** page, select **Create New > New Report**. Here we’ll take a look at a single process, though you can also view data from multiple processes.
2. Click the text box under **Select Process** and select the process you’d like to analyze. 
3. Select the type of report you’d like to use on the right side of the **Create new Report** box. As with dashboards, Optimize offers preconfigured templates such as heatmaps and tables. We’ll begin with a heatmap.
4. Click **Create Report**.
5. Set up and customize your report. Begin by naming your report in the text box at the top of the page, pre-filled with **New Report**.
6. In the gray text box to the right, confirm your data source, and select what you’d like to review from the process (in this case, we are viewing flow nodes.) You can also group by topics such as duration or start date.
7. If you’d like, filter the process instance or flow nodes. For example, you can filter by duration, only viewing process instances running for more than seven days.
8. Finally, you have the option to view particular sets of data from the instance, like instance count or absolute value, by selecting the gear icon to the left of your data customization. You can also choose how you’d like to visualize your data in the box beneath **Visualization** (i.e. bar chart, pie chart, etc.). Once you’ve made your selections, click **Save**.

## Process analysis of reports

### Edit mode

The edit mode allows you to configure the report and adjust it to your needs. The following operations are possible within edit mode:

- Rename your report
- Build a report
- Configure your report
- Save the current state with your applied changes
- Cancel changes you already applied to the report

Building a report is the crux of the report edit mode. The building process itself is composed of several steps, which happen in the control panel.

#### Select process definitions

Every report relates to one or multiple process definitions, versions and tenants. You must choose at least one process definition you want to create a report for.

To add a process definition to the report, click **Add** at the top of the **Data Source** section of the report control panel. This opens a dialog showing all process definitions you can use in the report. You can select up to 10 definitions to add to the report. If there are many process definitions, you can use the input field to search for the definition you are looking for.

![Process definition selection in the report builder in Camunda Optimize](./img/report-processDefinitionSelection.png)

For every added process definition, you can set a display name and a specific version or version range. To do so, click on the edit button in the process definition card. There are also buttons to remove the definition from the report or add a copy of the definition.

When editing a process definition, using the version dropdown you can choose between all versions, the latest version or a specific set of versions.

![Process Version selection in the report builder in Camunda Optimize](./img/report-versionSelection.png)

- **All** option: Every process instance across all versions of the process definition will be considered in your report.
- **Always display latest** option: Makes your report always refer to the latest version. Keep in mind that if a new version of the process is deployed, the report will automatically consider process instances of this new version only.
- **Specific version** option: Specify one or multiple existing versions of the process.

Data from older versions is mapped to the most recent version in the selection. Therefore, the report data can seem to be inconsistent, which is due to changes that occurred within the diagram through the different versions, e.g. the old versions do not contain newly added tasks or a part of the diagram was removed because it was considered to be obsolete.

![Process definition selection for a multi-tenancy scenario](./img/tenantSelection.png)

By default, all process instances for the selected process definitions are included in a report. You can reduce this set of process instances by applying a [filter](./additional-features/filters.md).

#### Define the report

In this section of the report builder, you are characterizing the output of the report. Basically, you are defining "I want to view ... grouped by ... visualized as ...". To understand better what "View" and "Group by" mean, you can use the analogy of a graph, where "View" is the y-axis and "Group by" is the x-axis.

First, you need to select which part of the data you want to view. Optimize differentiates between the view (e.g. Process Instance or Flow Node) and the measure (e.g. count or duration): 

1. Raw Data: View just a table with the actual data listed as rows. This can come in handy if you found interesting insights in certain process instances and need detailed information about those instances or you are exploring a process definition with a limited number of instances. This Report type also allows you to inspect raw [object variable values](../../../../self-managed/optimize-deployment/setup/object-variables).
2. Process instance
  * Count: View how many process instances were executed.
  * Duration: View how long the process instances took to complete.
3. Incident
  * Count: View how many incidents occurred on the process.
  * Resolution duration: View how long the incident took to get resolved.
4. Flow node
  * Count: View how often the flow nodes (e.g. tasks) have been executed.
  * Duration: View how long each flow node took to complete.
5. User task
  * Count: View how often each user task has been executed.
  * Duration: View how long each user task took to complete.
6. Variable: View an aggregation of values for a specific numeric variable of the process definition.

It is possible to display both count and duration measures for a single view in the same report.

Subsequently, you need to define how to group the data. Think of it as applying a metric to your input, where you break up the data by date, flow nodes, variable values or other properties. For that, you have different options:

- None: Do not split up the data.
- Flow nodes: Cluster the data by flow nodes.
- User tasks: Cluster the data by user tasks.
- Duration: Cluster the data by duration. Depending on the selected view, this can be the duration of process instances, flow nodes, or user tasks.
- Start date: Group instances together that were started during the same date period or time, e.g. hour, day or month. Depending on the selected view, this can be the start date of process instances, flow nodes, or user tasks.
- End Date: Group instances together that were finished during the same date period or time, e.g. hour, day or month. Depending on the selected view, this can be the start date of process instances, flow nodes, or user tasks.
- Running date of the process instance: Group process instances together that were running during the same date period or time, e.g. hour, day, or month.
- Variable: Process instances with the same value for the selected variable are grouped together.
- Assignee: Only available for user task views. Tasks are grouped together according to their current assignee.
- Candidate group: Only available for user task views. Tasks with the same candidate group are grouped together.
- Process: Only available for process instance reports with multiple definitions. Data from the same process is grouped together.

Finally, define how you want the data to be visualized. Examples are heatmap, table, bar, or line chart.

Not all of the above view, group by, and visualization options can be combined. For instance, if you choose `Flow Node: Count` as view, the data is automatically grouped by flow nodes as no other combination would be valid. All possible combinations can also be found in the following table:

<table class="table table-striped">
  <tr>
    <td><b>View</b></td>
    <td><b>Group By</b></td>
    <td><b>Visualize as</b></td>
  </tr>
  <tr>
    <td>Raw Data</td><td>None</td><td>Table</td>
  </tr>
  <tr>
    <td>Process instance: Count, Process instance: Duration</td><td>None</td><td>Number</td>
  </tr>
  <tr>
    <td>Process instance: Count</td><td>Start Date, End Date, Running Date, Variable, Duration, Process</td><td>Table, Chart</td>
  </tr>
    <tr>
    <td>Process instance: Duration</td><td>Start Date, End Date, Variable, Process</td><td>Table, Chart</td>
  </tr>
  <tr>
    <td>Incident: Count, Incident Duration</td><td>None</td><td>Number</td>
  </tr>
  <tr>
    <td>Incident: Count, Incident Duration</td><td>Flow Nodes</td><td>Table, Chart, Heatmap</td>
  </tr>
  <tr>
    <td>Flow Node: Count, Flow Node: Duration</td><td>Flow Nodes</td><td>Table, Chart, Heatmap</td>
  </tr>
  <tr>
    <td>Flow Node: Count</td><td>Start Date, End Date, Duration, Variable</td><td>Table, Chart</td>
  </tr>
  <tr>
    <td>Flow Node: Duration</td><td>Start Date, End Date, Variable</td><td>Table, Chart</td>
  </tr>
  <tr>
    <td>User Task: Count, User Task: Duration</td><td>User Tasks</td><td>Table, Chart, Heatmap</td>
  </tr>
  <tr>
    <td>User Task: Count, User Task: Duration</td><td>Start Date, End Date, Assignee, Candidate Group</td><td>Table, Chart</td>
  </tr>
  <tr>
    <td>User Task: Count</td><td>Duration</td><td>Table, Chart</td>
  </tr>
  <tr>
    <td>Variable</td><td>None</td><td>Number</td>
  </tr>
</table>

:::note
You might sometimes see a warning message indicating that the data is limited to a certain number of points. This happens because the available stored data, in this case, is very large and it is not possible to display all the data in the selected visualization.
:::

#### Reports with a second "Group by" option

Using the second "Group by" option, it is possible to apply another grouping to your data to display extra details such as dates, variable values, or assignees. This option will be shown below the first "Group by" option if the current report combination supports it. Here is an overview of the reports that supports a second "Group by": 

#### Flow node reports

Flow node names can be applied as a second "Group by". If the report contains multiple process definitions, the data can also be grouped by process as a second "Group by".

#### User task reports

User task names, assignees, and candidate groups can be applied as a second "Group by".
For example, if your report is grouped by assignee/candidate group, it is possible to add another grouping by user task to see which user task your users/group are working on or have completed in the past. If the report contains multiple process definitions, the data can also be grouped by process as a second "Group by".

![Distributed User Task report](./img/distributed-report.png)

Refer to the below table for an overview of all report combinations that support a second "Group by":

<table class="table table-striped">
    <tr>
        <td><b>View</b></td>
        <td><b>Group by</b></td>
        <td><b>Second Group by</b></td>
    </tr>
    <tr>
        <td>User Task Count, Duration</td>
        <td>User Tasks</td>
        <td>Assignee, Candidate Group, Process (only for multi-definition reports)</td>
    </tr>
    <tr>
        <td>User Task Count, Duration</td>
        <td>Start Date, End Date</td>
        <td>Assignee, Candidate Group, User Tasks, Process (only for multi-definition reports)</td>
    </tr> 
    <tr>
        <td>User Task Count, Duration</td>
        <td>Assignee, Candidate Group</td>
        <td>User Tasks, Process (only for multi-definition reports)</td>
    </tr>
    <tr>
        <td>User Task Count</td>
        <td>Duration</td>
        <td>User Tasks, Process (only for multi-definition reports)</td>
    </tr>
</table>

#### Process instance reports

Refer to the below table for the process instance count and duration reports that support a second "Group by":

<table class="table table-striped">
    <tr>
        <td><b>View</b></td>
        <td><b>Group By</b></td>
        <td><b>Second Group by</b></td>
    </tr>
    <tr>
        <td>Process Instance Count, Duration</td>
        <td>Start Date, End Date</td>
        <td>Variable, Process (only for multi-definition reports)</td>
    </tr>
    <tr>
        <td>Process Instance Count, Duration</td>
        <td>Variable</td>
        <td>Start Date, End Date, Process (only for multi-definition reports)</td>
    </tr>
    <tr>
        <td>Process Instance Count</td>
        <td>Running Date, Duration</td>
        <td>Process (only for multi-definition reports)</td>
    </tr>
</table>

The diagram below shows a report grouped by `Start Date` and a boolean variable:

![Distributed process instance report](./img/distributedByVar.png)

#### Duration and variable report aggregation

For duration and variable views, the default aggregation type is the average. You can add and change different aggregations like minimum, maximum, and median in the report configuration panel. Note that the median is an estimate and the other operations are exact values.

![Duration Aggregation Selection](./img/durationAggregation.png)

Reports with multiple aggregations that have a [second "Group by"](#reports-with-a-second-group-by-option) can only be visualized as table.

#### User task duration time

In user task duration reports, you have the opportunity to select which part of the user task's lifecycle you want to see in the report:

* Idle: View how long each user task was considered idle (not claimed by an assignee/user) during its execution.
* Work: View how long each user task was considered to be worked on by assignees/users (claimed by an assignee/user) during its execution.
* Total: View how long each user task took to complete.

It is possible to display and compare multiple user task duration times in the same report. Reports with multiple user task duration times that have a [second "Group by"](#reports-with-a-second-group-by-option) can only be visualized as table.

:::note
User tasks which have been completed yet have no claim operations are evaluated as follows: if the user task was canceled, the task is considered to have been idle whereas user tasks which were completed are considered to have been worked on 
programmatically or via a custom UI, meaning the time between start and end is considered work time. 
:::

#### Target value comparison

Based on flow node duration heatmaps, Optimize allows you to specify a target value for every activity. For example, if a user task has to be completed within one day, you can set the target value to one day. If the time it takes to complete the user task exceeds this target value, the task is highlighted in the heatmap.

To set target values and create a target value comparison heatmap, you need to be in the edit mode of a report which has the following configuration:

<table class="table table-striped">
  <tr>
    <td>View</td><td>Flow Node Duration/User Task Duration</td>
  </tr>
  <tr>
    <td>Group by</td><td>Flow Nodes/User Tasks</td>
  </tr>
  <tr>
    <td>Visualize as</td><td>Heatmap</td>
  </tr>
</table>

If your report has this configuration, a target value button is visible. Clicking on the **Target Value** button for the first time opens an overlay containing the process diagram and a table with all flow nodes. You can also see the actual duration value for every flow node. If you want to set a target value for a flow node, use the number and unit fields in the last column. If the target value number field for a flow node is empty, this flow node has no target value set (the selected time unit is ignored in that case).

![Setting Target Values](./img/targetvalue-2.png)

If you set a target value for a flow node, this target value is represented as a badge on the flow node in the diagram in the upper part of the overlay. You can click on any flow node in the diagram to jump to the target value input field in the table. If you have a User Task report, you can only select user tasks here, as only those are included in the report result. When selecting a target value input field in the table, the corresponding diagram element is highlighted. To save the target value configuration, click **Apply**.

After you save the target values, the normal duration heatmap is replaced with a target value visualization. In this new visualization, flow nodes with an average duration larger than the specified target value are highlighted in red. 

If you mouse over one of the nodes, the tooltip shows the following: 

- The target duration value 
- The actual duration
- The relative percentage the actual value is of the target value
- A button to download a list of process instance IDs that exceed the target value

You can also see the target value as a badge on the diagram.

![Target Value Comparison](./img/targetvalue-1.png)

After the initial target values for a report are set, you can use the target value button to toggle between the target value and the regular duration view mode. If you want to change target values, use the gear button to open the overlay again.

As with any change to a report configuration, to persist target values and show them in the report view mode and on dashboards, you need to save the report using the **Save** button in the upper right corner.

#### Process instance parts

In some cases, you may not be interested in the duration of the whole process instance, but only a certain part of it. For that scenario, there is an additional button called **Process Instance Part** available for every process instance duration view that only shows data for a single process definition. Clicking this button opens an overlay letting you select the start and end of the part of the process instance you are interested in. After confirming the selection, the displayed duration refers to the selected part only instead of the whole instance.

In some cases it can happen that the same activity is executed multiple times in the same process instance, e.g. if the process contains loops or parallel gateways. In such cases, Optimize considers only the part between the start date of the first instance of the start node and the end date of the first instance of the end node.

![Process Instance Part Modal](./img/process-part.png)

#### Configure a report

The configuration panel groups all the settings that can be applied to a report in one place. To see the panel click on the cog button available in the edit mode of any report. Every visualization has different settings that can be configured in the panel.

When you save changes to the report configuration, they apply to the report view mode and any dashboard this report is displayed on.

#### Number

Number reports are any reports that are visualized as a single number (e.g. `Process Instance: Count` grouped by `None` or `Process Instance: Duration` Grouped by `None`).

In number reports, the following configurations are possible:

#### Number precision

Number precision can be configured from the panel to limit the most significant units to be shown.

For example, we have a report that calculates the total process instances duration. When the precision limit is not set, you will see all possible units, e.g.: `1y 5m 2wk 5d 3h 16min 3s 170ms`. In case you are only interested in certain units - e.g. months - you can omit all insignificant units by limiting the precision as shown in the figure below:

![Number report configurations](./img/NumberConfiguration.png)

#### Number goal value (progress bar)

Number reports appear as progress bar when the goal option is enabled from the panel as shown. The baseline and the target value of the progress bar can be also set using the panel.

![Progress Bar Visualization](./img/progressbar.png)

You can toggle between the progress bar and the single number visualization using the same goal line switch.

A red line indicator appears on the progress bar when its value exceeds the goal value. On the right-hand side of the indicator, the bar turns into a darker color to clearly show the exceeded amount.

![Progress Bar Visualization](./img/progressbarExceeded.png)

#### Table settings

In table reports, the following configurations are possible:

#### Show instance count

Displays the total instance count on the right-hand side of the visualization. If you save the report while this option is enabled, the number will also be shown on any Dashboard this report is added to and when the report is shared.

#### Hide, show, and reorder table columns

The table settings allow you to hide specific columns using the configuration menu as shown in the figure below:

![raw data configuration](./img/rawdata.png)

When working with raw data table reports, you can also re-order the table columns using drag-and-drop on the header of the respective column.

#### Sorting by table column

To sort a table by a specific column, click on the header of that column. Doing that will show a small caret icon in the header of the column indicating which column the table is currently sorted by and the direction of this sorting (ascending or descending) as shown:

![Sorting a table in Optimize](./img/sorting.png)

Clicking again on the same column header will reverse the direction of sorting.

Saving the reports will also preserve the applied sorting.

The sorting currently works for all table reports except for:

* Combined table reports
* reports grouped by integer type variables

#### Absolute and relative values

When configuring a count report, you have the opportunity to configure which columns are included in the table. Using the switches for absolute and relative value you can hide or show the corresponding columns.

#### Custom bucket size for date variables

When evaluating a report which is grouped by a date variable and displayed as a table, Optimize offers you the option to select your preferred unit specifying the custom result bucket size from the report configuration menu. The avaiblable units are year, month, week, day, and automatic. The default unit is automatic, which will create evenly spaced result buckets based on the values of the date variable. This configuration option is also available for charts.

#### Custom bucket size and baseline

When evaluating a report which is grouped by duration or a number variable, Optimize offers you the option to specify your preferred result bucket size as well as a custom baseline in the report configuration menu. The bucket size determines the width of one bucket, and the baseline specifies the start of the first bucket.

For example, say a report contains the variable values 0.3, 6, and 13, and you set a bucket size of 5. By default, Optimize would now return a bucket for the values 0.3 to 5.3, one for 5.3 to 10.3, and one for 10.3 to 15.3. You may prefer your bucket start and end points to be a round number, in which case you should set your baseline to 0. With a baseline of 0 and bucket size 5, the result buckets now span 0 to 5, 5 to 10, and 10 to 15.

If these configuration fields are not set, Optimize will by default create evenly spaced result buckets with a range based on the minimum and maximum values of the number variable.

This configuration option is also available for charts.

#### Charts (line, bar, pie)

In bar chart and line chart reports, it is possible to select the color of the graph, add names to the x-axis and y-axis, and edit many other settings as shown in the figure below:

![chart visualization configurations](./img/chartConfiguration.png)

In charts, you can hide/show absolute and relative values that appear in the tooltips.

#### Show instance count

Displays the total instance count on the right-hand side of the visualization. If you save the report while this option is enabled, the number will also be shown on any dashboard this report is added to and when the report is shared.

#### Chart goal line

Optimize allows you to set a goal line in bar chart and line chart visualizations. Using this feature, it is possible to highlight anything above or below a certain value.

A good use case for such functionality is the following example:

First, go to the edit mode of a report and choose the following configuration:

<table class="table table-striped">
  <tr>
    <td>View</td><td>Count Frequency of Process Instance</td>
  </tr>
  <tr>
    <td>Group by</td><td>Start Date of Process Instance: Month</td>
  </tr>
  <tr>
    <td>Visualize as</td><td>Barchart</td>
  </tr>
</table>

Let us say that the number of completed process instances should always be above six. A goal line can be used as follows:

Set the target value input field to six and select the above button. Now if the number of process instances is below six, it will be highlighted in red as shown.

![Bar charts goal line](./img/targetValue.png)

This feature can be also used with every other bar chart and line chart visualization. Here is another example where the target value is used with line chart visualization:

![Line chart goal line](./img/targetline.png)

#### Custom bucket size for date variables

When evaluating a report which is grouped by a date variable and displayed as a chart, Optimize offers you the option to select your preferred unit specifying the custom result bucket size in the report configuration menu. The available units are year, month, week, day, and automatic. The default unit is automatic, which will create evenly spaced result buckets based on the values of the date variable. This configuration option is also available for tables.

#### Custom bucket size and baseline

When evaluating a report which is grouped by duration or a number variable, Optimize offers you the option to specify your preferred result bucket size as well as a custom baseline in the report configuration menu. The bucket size determines the width of one bucket, and the baseline specifies the start of the first bucket.

For example, say a report contains the variable values 0.3, 6, and 13 and you set a bucket size of 5. By default, Optimize would now return a bucket for the values 0.3 to 5.3, one for 5.3 to 10.3, and one for 10.3 to 15.3. You may prefer your bucket start and end points to be a round number, in which case you should set your baseline to 0. With a baseline of 0 and bucket size 5, the result buckets now span 0 to 5, 5 to 10, and 10 to 15.

If these configuration fields are not set, Optimize will by default create evenly spaced result buckets with a range based on the minimum and maximum values of the number variable.

This configuration option is also available for tables.

#### Stacked bar chart

When evaluating a report which has a second "Group by", Optimize offers you the option to stack the bar chart bars instead of displaying them near each other. Stacking bars would be useful when the focus of the chart is to compare the totals (e.g. flow node count/process instance count/etc.) and one part of the totals (e.g. flow node/variable value/etc.)

This configuration option is also available for bar/line charts.

![Stacked bar chart report](./img/stackedBar.png)

#### Bar/line chart

When evaluating a report which has both count and duration measures, Optimize offers you the option to display one of the measures as bars and the other measure as a line. This would help to differentiate between duration and count values displayed in the visualization. By default, the count measure is displayed as bars and the duration as a line. You can also switch between them by using the configuration option shown. 

![Bar/Line chart report](./img/barLine.png)

#### Heatmaps

When enabling absolute or relative values switches, all tooltips for all flow nodes stay visible. This is also possible when you have defined target values. If you save the report in this state, the tooltips will also be shown on any dashboard this report is added to.

![Heatmap tooltips](./img/heatmap.png)

As for charts and table reports, it is possible to display the total instance count on the right-hand side of the visualization. If you save the report while this option is enabled, the number will also be shown on any Dashboard this report is added to and when the report is shared.

### View Mode

Once you have defined what your report should look like, the view mode provides you with different kinds of actions, such as switching to the edit mode by clicking on the edit button or deleting the whole report if you do not have any use for it anymore. To see more details about the report, you can interact with it, e.g. by moving your mouse over individual datapoints in diagrams or zooming in or out of heatmaps. The kind of interaction always depends on the report itself.

To download the data of the report, click **Download CSV**. The downloaded file will include the report information in a table format.

![report sharing popover in Camunda Optimize](./img/report-sharingPopover.png)

To share the report with other people or to embed it in a webpage, use the sharing feature of the report. Click on the share button, which opens up a popover. After enabling the "enable sharing" switch, a link is generated which you can send to people who do not have access to Camunda Optimize and thus enable them to see the report.

You can also use the **Embed Link** button if you wish to insert the report into your webpage. Everyone that views the webpage can then see content of the report. The shared versions of the report allow to view the report itself only. There is no possibility to alter it or interact with any other features of Optimize. You can revoke the sharing any time by disabling the share switch.

If you prefer to hide the header of the shared report or specific part of it, you can do that by adding the following parameter to the share URL:

```
header : titleOnly / linkOnly / hidden 
```
For example, to completely hide the header from the shared report, you can add `header=hidden` as shown:

```
http://<report share url>?header=hidden
```

## Creating a combined report

Occasionally, it is necessary to compare multiple reports or visualize them together in one diagram. This can be achieved by creating a special type of report called a **combined report**. To create a new combined report, visit the homepage and click **Create New > New Report > Combined Process Report**.

![Creating a Combined report](./img/combined-report-create.png)

Then, you are redirected to the combined report builder. There, view the selection panel on the right to select multiple reports to combine.

:::note
If the combined report is inside a collection, only reports in the same collection can be combined. If the combined report is not in a collection, it can only combine reports that are also not in a collection.
:::

A preview of the selected reports will be displayed in the panel on the left.

![combined report builder](./img/combined-report.png)

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
- Same visualization
- Same view but combining user task duration (work, idle, and total). Flow node duration reports are also possible.
- Distributed reports cannot be combined
- Multi-Measure reports including reports containing multiple aggregations or multiple user task duration times cannot be combined.
- Process definition can be different.
- Furthermore, it is possible to combine reports grouped by start date with reports grouped by end date under the condition that the date interval is the same.

Moreover, only the following visualizations are possible to combine and will show up in the combined selection list:

- Bar chart
- Line chart
- Table
- Number

Currently, it is not possible to combine decision reports with each other.

It is also possible to update the name of the report, save it, and add it to a dashboard exactly like the normal report. The combined reports will also show up in the reports list along with the normal reports.

### Configure combined reports

You can configure the combined report using the cog wheel button available on the top right side of the screen. 

For example, in all chart reports, you can change what to show in the tooltips, change the axis names and set a goal line as shown in the figure below.

![Configurations available for combined reports](./img/combined-config.png)