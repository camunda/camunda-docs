---
id: what-is-optimize
title: What is Optimize?
description: "Leverage process data and analyze areas for improvement."
---

:::note
New to Optimize? Visit our introductory guide to [Optimize]($docs$/guides/improve-processes-with-optimize/) to get started.
:::

Camunda 8 is built to handle three key aspects of process automation:

- Design
- Automate
- Improve

Users can design process flows through our [Modeler]($docs$/components/modeler/about-modeler/). In a production scenario, users can deploy through Desktop Modeler, Web Modeler, or programmatically. A user can use [Tasklist]($docs$/components/tasklist/introduction-to-tasklist/) to review and complete tasks, and [Operate]($docs$/components/operate/operate-introduction) to view and analyze process instances.

Beyond these design and automate cornerstones lies an important component to leverage our process data and analyze areas for improvement: Optimize.

Geared toward business stakeholders, Optimize offers business intelligence tooling for Camunda enterprise customers. By leveraging data collected during process execution, users can collaboratively access reports, share process intelligence, analyze bottlenecks, and examine areas in business processes for improvement.

![process performance dashboard](./img/dashboard-sharingPopover.png)

As process instances run through the server, Optimize makes REST API calls to the Camunda server, collecting new historical data and storing it in its Elasticsearch database. This enables users to independently analyze reports and dashboards, gaining actionable insights without affecting runtime.

Optimize goes beyond traditional business intelligence tools, guiding users toward continuous process improvement by understanding their goals. It facilitates the rapid identification of constraints within an individual's or organization's system.

Explore Optimize for a closer look at process performance dashboards, review heatmaps for instance durations, and visualize activity instances compared to total process instances. In the following sections, we'll guide you through using and analyzing Optimize.
