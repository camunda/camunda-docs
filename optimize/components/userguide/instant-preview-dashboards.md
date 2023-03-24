---
id: instant-preview-dashboards
title: Instant Preview Dashboards
description: "Use automatically generated dashboards/reports from Optimize to find insights for your processes"
---

Camunda Optimize is a comprehensive process optimization tool that helps businesses to streamline their operations
and improve efficiency. One of the standout features of Camunda Optimize is its ability to automatically generate
dashboards for each process, providing users with clear insights into process performance.

When a process is available in Camunda Optimize, Optimize automatically generates a dashboard for that process. The
dashboards are designed to be intuitive and easy to use and can be accessed from the [process dashboards
page](./process-dashboards.md) by clicking on the desired process.

The data displayed in this dashboard and corresponding reports is coupled with the user's permissions to that
process definition, meaning that the dashboard will include data from all tenants that the user is authorized to see.
Moreover, the dashboard/reports display data from all versions of the process definition in question.

Please note that this dashboard is supplied by the tool and may change when the tool is updated to a new version. These
updates happen automatically, so you don't need to do anything. When you start using a new version of the tool,
you'll automatically see the updated dashboard, ensuring a seamless experience.

The dashboard has a predictable URL so that it can also be embedded into other tools/webpages. The URL has the format
_https://&lt;OPTIMIZE_URL&gt;/dashboard/instant/&lt;PROCESS-DEFINITION-KEY&gt;/_. This URL is stable across Optimize versions,
so there is no need to change it when updating the tool.

:::note
Instant preview dashboards cannot be shared like standard dashboards. If you wish to direct someone to it, please
use the fixed URL as mentioned above. The recipient will need to sign in to Optimize to see the dashboard.
:::
