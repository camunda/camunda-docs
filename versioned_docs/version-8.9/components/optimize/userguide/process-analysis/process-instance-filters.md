---
id: process-instance-filters
title: Process instance filters
description: Learn more about process instance date and duration filters.
---

## Process instance date filter

Applying a process instance start or end date filter will result in a report considering only process instances that started or ended within the defined range of dates.

:::note
Reports with a process instance end date filter applied will only consider completed process instances.
:::

As an alternative way to create a process instance start date filter, you can directly select the desired filter interval in the chart itself if your report is visualized as bar or line chart.

## Process instance duration filter

The **Process Instance Duration Filter** allows you to only regard process instances whose execution from start to end took a certain amount of time. For instance, you can filter process instances that took more than three days or less than five seconds.

:::note
This filter shows only completed process instances, since the total duration of running process instances is not yet known.
:::

![Process instance duration filter in Camunda Optimize](./img/duration-filter.png)
