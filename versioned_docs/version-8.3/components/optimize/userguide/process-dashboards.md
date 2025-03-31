---
id: process-dashboards
title: Process dashboards
description: "The process dashboards section gives you an overview of all the processes and their status on a single page."
---

## Overview

The **Process Default Dashboards and KPIs** section gives you an overview of all the processes and their status on a single page.
This section also allows you to set a process owner and take responsibility of a process, viewing time, and quality KPIs to track process performance. Additionally, a **Adoption Dashboard** can be found at the top of the page, which integrates data from all processes in one view.
![Processes page](./img/processOverview.png)

## Set time and quality KPIs

KPIs are single number reports, which have a target set. A report can be configured as a KPI report through the report configuration panel and the classification to a time or quality KPI happens internally in Optimize based on the measure selected.
Once a report is configured as KPI, its status can be seen on the **Dashboards** page. Hovering over its status allows previewing more specific information in regard to the KPIs, such as the target set, the actual current value of the single number report and a link to it. If a user accesses a report via this link and does not have authorization to view it, they will not be able to see any data in the report view.
![Set time and quality KPIs](./img/kpiConfiguration.png)

## Configuring process owner and digests

The process can be configured by clicking the **Configure** option selected from the three dots menu displayed on the right side when hovering over the process. From this modal, you can change the owner of the process, as well as enable/disable the process digest. The process digest is a scheduled email report summarizing the current and previous state of the KPI reports for that process. It will be emailed to the owner of that process at [globally configurable regular intervals](/self-managed/optimize-deployment/configuration/system-configuration.md#digest). Note that process digests are an alpha feature.
![Configure Process](./img/configureProcess.png)

## KPI import scheduler

Since users might be dealing with hundreds or even thousands of KPIs, a scheduler has been developed which updates the KPI values on a given interval. The default interval in which the KPIs get updates is 10 minutes.
To change this interval, please modify the configuration value for **entity.kpiRefreshInterval**. For more information please visit the relevant [configuration section](/self-managed/optimize-deployment/configuration/system-configuration.md).

## Limitations

Since the updates on the KPIs will appear on the process overview page after the given KPI import scheduler interval has passed, changes such as creation, update and deletion of KPIs will show with a delay. In case you wish to make these changes apparent more promptly, you can set the kpi scheduler interval to a lower value as described above.

Additionally, it is worth mentioning that for the evaluation of the KPI reports, the default timezone of the machine on which Optimize is being run on will be used.
