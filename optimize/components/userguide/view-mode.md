---
id: view-mode
title: View mode
description: "The view mode provides you with all the features to monitor you process."
---

Once you have defined what your dashboard should look like, the view mode provides you with all the features to monitor you process, such as:

- Full-screen: Display the dashboard in full-screen and only see the essential information of your dashboard - the reports - and hide the header, control panel, and footer. While in full-screen mode, you can click on the **Toggle Theme** button to switch between the default light theme and a dark theme.

- Auto-refresh: This feature periodically updates the dashboard with the latest data. You can decide how often the update should be performed by setting a time span reaching from 1 to 60 minutes. An animation indicates when the next update is occurring. If you do not wish to use that feature anymore, you can disable it anytime.

:::note
The refresh rate will not be saved unless it is selected in the [edit mode](./edit-mode.md) of the dashboard.
If it was selected in the view mode, the refresh rate will not be saved when refreshing the dashboard page manually or switching to another page in between.
:::

- Alerts: If the created dashboard exists inside a collection, it is possible to create and manage created alerts for the reports inside the dashboard.

![process performance overview](./img/dashboard-viewMode-monitorFeatures.png)

- Description: A Dashboard can be given a description, which is displayed below the Dashboard name. For descriptions longer than a single line, the **More/Less** button can be used to show or hide the text.

![dashboard description](./img/dashboard-showMoreDescription.png)

To share the dashboard with other people or embed it in a webpage, use the sharing feature of the dashboard. Click on the **Share** button, which opens up a popover. After turning the **Enable sharing** switch on, a link is generated which you can send to people who do not have access to Camunda Optimize, and thus enable them to see the dashboard.

If you applied filters on the dashboard, you can include them in the shared version of the dashboard by enabling the **Share with current filters applied** checkbox. If the checkbox is not checked, the shared dashboard will include the default filters if any have been set.

![sharing](./img/dashboard-sharingPopover.png)

You can also click the **Embed Link** button to copy a code to paste into your webpage. Everyone that views the webpage can then see the content of the dashboard. The shared versions of the dashboard allow only to view the dashboard itself. There is no possibility to alter it or interact with any other features of Optimize. Revoke the sharing anytime by disabling the share switch.

To hide the header of the shared dashboard or specific part of it, add the following parameter to the share URL:

`header : titleOnly / linkOnly / hidden`

For example, to completely hide the header from the shared dashboard, add `header=hidden` as shown:

`http://<dashboard share url>?header=hidden`

## Interacting with reports

To see more details about the report on the dashboard, interact with the reports. The kind of interaction always depends on the report itself.

If the interactions do not suffice to get the desired information, or you want to edit the report, directly access the report by clicking on its title.

## Adding filters in view mode

In the dashboard view mode, there is a **Filters** button which opens a panel that shows all filters available for this dashboard. More filters can be made available in the dashboard edit mode. If the dashboard editor checked the **Allow viewer to add filter values** box for assignee, candidate group, or variable filters, dashboard viewers can add their own values to filter by.

![filters in view mode](./img/filter-viewMode.png)

Filters apply to all process reports on the dashboard. If a report already has filters set, they will be combined with the dashboard filter. For example, if a report has a filter to only show running instances and a dashboard filter for suspended instances is set, the report will only show instances that are both running and suspended. Dashboard filters are not applied to decision reports, external websites, or text tiles.

Variable filters are only applied to reports whose process definition includes the variable. Otherwise, the filter is ignored for that report. Other dashboard filters and filters defined directly on the report are still applied.
