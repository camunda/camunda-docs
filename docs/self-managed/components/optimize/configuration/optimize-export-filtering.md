---
id: optimize-export-filtering
title: "Optimize export filtering"
description: "Configure which processes and variables the Elasticsearch and OpenSearch exporters send to Optimize to reduce storage costs and scope analytics data."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Filter which processes and variables the [Elasticsearch](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md) and [OpenSearch](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md) exporters write for Optimize to reduce storage costs and scope analytics data.

:::note
Exporter-side filters require Camunda 8.9 or later. On earlier versions, exporters always write a complete, unfiltered event stream.
:::

## How export filtering works

The Elasticsearch and OpenSearch exporters run inside Zeebe brokers and write raw engine events to export indices. Optimize reads those indices and builds its own analytics indices.

Export filters run **inside the exporter** and permanently drop matching records from the exported stream. Optimize cannot import data that was never exported, and dropped records cannot be recovered later, even if you relax the filters afterward.

**These filters affect Optimize only.** Operate and Tasklist read through the Camunda Exporter, so their data stays intact regardless of what you configure here.

## Process definition filtering

Use process definition filters to include or exclude entire processes from Optimize. Records tied to excluded processes (including process instances, variables, and incidents) are dropped before they reach Optimize's import indices.

This is useful when you have high-volume processes that don't need analytics in Optimize.

| Goal                           | Option                   | Example value                           |
| ------------------------------ | ------------------------ | --------------------------------------- |
| Export only specific processes | `bpmnProcessIdInclusion` | `[order-fulfillment, invoice-approval]` |
| Exclude specific processes     | `bpmnProcessIdExclusion` | `[high-volume-batch-job]`               |

Exclusion wins over inclusion when both lists contain a matching ID. Value types without a `bpmnProcessId` (such as `DEPLOYMENT` and `DECISION`) are not affected by these filters.

**Example: include only analytics-relevant processes:**

<Tabs groupId="exporter-type" defaultValue="elasticsearch" queryString values={[{label: 'Elasticsearch', value: 'elasticsearch'},{label: 'OpenSearch', value: 'opensearch'}]}>
<TabItem value="elasticsearch">

```yaml
camunda:
  data:
    exporters:
      elasticsearch:
        args:
          index:
            bpmnProcessIdInclusion:
              - orderProcess
            bpmnProcessIdExclusion:
              - debugProcess
```

</TabItem>
<TabItem value="opensearch">

```yaml
camunda:
  data:
    exporters:
      opensearch:
        args:
          index:
            bpmnProcessIdInclusion:
              - orderProcess
            bpmnProcessIdExclusion:
              - debugProcess
```

</TabItem>
</Tabs>

## Variable filtering

Variables are the largest contributor to Optimize's storage and CPU costs: Optimize stores a variable roughly 14x more expensively than the raw export (up to 29x for high-cardinality string variables). There are three levers, from most to least aggressive.

### Disable all variable export

Set `variable: false` to stop the exporter from writing any variable records to Optimize indices. This is the most impactful option: it also recovers exporter throughput, because the variable write path is the bottleneck at maximum load.

<Tabs groupId="exporter-type" defaultValue="elasticsearch" queryString values={[{label: 'Elasticsearch', value: 'elasticsearch'},{label: 'OpenSearch', value: 'opensearch'}]}>
<TabItem value="elasticsearch">

```yaml
camunda:
  data:
    exporters:
      elasticsearch:
        args:
          index:
            variable: false
```

</TabItem>
<TabItem value="opensearch">

```yaml
camunda:
  data:
    exporters:
      opensearch:
        args:
          index:
            variable: false
```

</TabItem>
</Tabs>

### Filter by variable name

Use name-based inclusion and exclusion lists to export only the variables you need. You can match by exact name, prefix (`startsWith`), or suffix (`endsWith`). Exclusion wins over inclusion when both rules match the same variable name.

| Goal                       | Options                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| Include specific variables | `variableNameInclusionExact`, `variableNameInclusionStartWith`, `variableNameInclusionEndWith` |
| Exclude specific variables | `variableNameExclusionExact`, `variableNameExclusionStartWith`, `variableNameExclusionEndWith` |

**Example: include `business_`-prefixed variables but exclude `business_debug`:**

<Tabs groupId="exporter-type" defaultValue="elasticsearch" queryString values={[{label: 'Elasticsearch', value: 'elasticsearch'},{label: 'OpenSearch', value: 'opensearch'}]}>
<TabItem value="elasticsearch">

```yaml
camunda:
  data:
    exporters:
      elasticsearch:
        args:
          index:
            variableNameInclusionStartWith:
              - business_
            variableNameExclusionStartWith:
              - business_debug
```

</TabItem>
<TabItem value="opensearch">

```yaml
camunda:
  data:
    exporters:
      opensearch:
        args:
          index:
            variableNameInclusionStartWith:
              - business_
            variableNameExclusionStartWith:
              - business_debug
```

</TabItem>
</Tabs>

### Filter by variable type

Drop variables by inferred JSON type to exclude large payloads such as objects or arrays. Valid types are `String`, `Number`, `Boolean`, `Object`, and `Null`.

| Goal                        | Options                      |
| --------------------------- | ---------------------------- |
| Include specific types only | `variableValueTypeInclusion` |
| Exclude specific types      | `variableValueTypeExclusion` |

**Example: include only objects and strings, then exclude objects:**

<Tabs groupId="exporter-type" defaultValue="elasticsearch" queryString values={[{label: 'Elasticsearch', value: 'elasticsearch'},{label: 'OpenSearch', value: 'opensearch'}]}>
<TabItem value="elasticsearch">

```yaml
camunda:
  data:
    exporters:
      elasticsearch:
        args:
          index:
            variableValueTypeInclusion:
              - Object
              - String
            variableValueTypeExclusion:
              - Object
```

</TabItem>
<TabItem value="opensearch">

```yaml
camunda:
  data:
    exporters:
      opensearch:
        args:
          index:
            variableValueTypeInclusion:
              - Object
              - String
            variableValueTypeExclusion:
              - Object
```

</TabItem>
</Tabs>

## Trade-offs

Filtered data is permanently unavailable in Optimize:

- **Process filtering:** Excluded processes don't appear in Optimize reports. If you later re-enable a process, Optimize shows a permanent gap for the period when it was excluded, because records from that window were never exported.
- **Variable filtering:** Filtered variables are unavailable in Optimize reports, including variable filters, variable-based grouping, and raw-data variable columns.

For guidance on non-retroactivity, changing filters on running clusters, and safely applying filters mid-stream, see [Camunda 8 system configuration](./system-configuration-platform-8.md#exporter-side-filters-and-optimize-data-completeness).
