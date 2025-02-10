---
id: instance-state-filters
title: Instance state filters
description: By default, a report considers all process instances, regardless of whether they are still running. This behavior can be adjusted with the Running Instances Only and Completed Instances Only filters.
---

## Running completed instances only filter

By default, a report considers all process instances, regardless of whether they are still running. This behavior can be adjusted with the **Running Instances Only** and **Completed Instances Only** filters. Be aware that setting one of those filters (e.g. **Running Instances Only**) while the other one is already set (e.g. **Completed Instances Only**), will show a warning message since these two filters are incompatible with each other and will not show any data.

## Canceled instances only filter

If the **Canceled Instances Only Filter** is applied, the report will only consider those instances which were terminated before completion, either
internally or externally. Be aware that adding this filter along with the **Running Instances Only** will show a warning message since these filters are incompatible and will not show any data.

## Non canceled instances only filter

As opposed to the **Canceled Instances Only Filter**, applying the **Non Canceled Instances Only** filter will make Optimize query only those instances which were _not_ canceled during
their execution. This means only active and completed instances are considered. Externally or internally terminated instances are not included in the report.

## Suspended and non suspended instances only filter

By default, a report considers all process instances, regardless of whether they are [suspended]($docs$/components/best-practices/operations/operating-camunda-c7#suspending-specific-service-calls) or not. Adding this filter makes it possible to only evaluate process instances that are in the suspension state. Note that if you have enabled history cleanup, this might affect the accuracy of this filer given the suspension state is imported from historic data.
