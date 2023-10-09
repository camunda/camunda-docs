---
id: instant-preview-dashboards
title: Instant preview dashboards
description: "Use automatically generated dashboards and reports from Optimize to find insights for your processes."
---

Camunda Optimize is a comprehensive process optimization tool that helps businesses streamline their operations
and improve efficiency. One of the standout features of Optimize is its ability to automatically generate
dashboards for each process, providing users with clear insights into process performance.

Optimize imports each process deployed to Camunda and automatically creates a dashboard.
The dashboards are designed to be intuitive and easy to use and can be accessed from the [process dashboards page](./process-dashboards.md) by clicking on the desired process.

The data displayed in this dashboard (and its corresponding reports) is coupled with the user's permissions to that
process definition, meaning the dashboard will include data from all tenants that the user is authorized to see.
Moreover, the dashboards and reports display data from all versions of the process definition in question.

The dashboard has a predictable URL so it can also be embedded into other tools and web pages. The URL has the format
_https://&lt;OPTIMIZE_URL&gt;/dashboard/instant/&lt;BPMN-PROCESS-ID&gt;/_. This URL is stable across Optimize versions,
so there is no need to change it when updating Optimize.

:::note
Instant preview dashboards cannot be shared like standard dashboards. To share it, share the URL. The recipient will need to sign in to Optimize to see the dashboard.
:::
