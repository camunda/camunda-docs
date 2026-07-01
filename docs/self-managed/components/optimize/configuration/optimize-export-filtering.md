---
id: optimize-export-filtering
title: "Optimize export filtering"
description: "Configure which processes and variables the Elasticsearch and OpenSearch exporters send to Optimize to reduce storage costs and scope analytics data."
---

Starting with Camunda 8.9, you can configure the Elasticsearch and OpenSearch exporters to filter what data they write for Optimize. Use these filters to reduce Optimize's impact on Elasticsearch or OpenSearch storage and CPU, or to scope Optimize reports to only the processes and variables that matter for your analytics.

:::note
Exporter-side filters require Camunda 8.9 or later. On earlier versions, exporters always write a complete, unfiltered event stream.
:::

## How export filtering works

The Elasticsearch and OpenSearch exporters run inside Zeebe brokers and write raw engine events to export indices. Optimize reads those indices and builds its own analytics indices.

Export filters run **inside the exporter** and permanently drop matching records from the exported stream. Optimize cannot import data that was never exported, and dropped records cannot be recovered later — even if you relax the filters afterward.

**These filters affect Optimize only.** Operate and Tasklist read through the Camunda Exporter, so their data stays intact regardless of what you configure here.

## Process definition filtering

Use process definition filters to include or exclude entire processes from Optimize. Records tied to excluded processes — including process instances, variables, and incidents — are dropped before they reach Optimize's import indices.

This is useful when you have high-volume processes that don't need analytics in Optimize.

| Goal                           | Option                   | Example value                           |
| ------------------------------ | ------------------------ | --------------------------------------- |
| Export only specific processes | `bpmnProcessIdInclusion` | `[order-fulfillment, invoice-approval]` |
| Exclude specific processes     | `bpmnProcessIdExclusion` | `[high-volume-batch-job]`               |

Exclusion wins over inclusion when both lists contain a matching ID. Value types without a `bpmnProcessId` (such as `DEPLOYMENT` and `DECISION`) are not affected by these filters.

**Example — include only analytics-relevant processes:**

```yaml
camunda:
  data:
    exporters:
      elasticsearch:
        args:
          index:
            bpmnProcessIdInclusion:
              - order-fulfillment
              - invoice-approval
              - customer-onboarding
```

## Variable filtering

Variables are the largest contributor to Optimize's storage and CPU costs: Optimize stores a variable roughly 14x more expensively than the raw export (up to 29x for high-cardinality string variables). There are three levers, from most to least aggressive.

### Disable all variable export

Set `variable: false` to stop the exporter from writing any variable records to Optimize indices. This is the most impactful option: it also recovers exporter throughput, because the variable write path is the bottleneck at maximum load.

```yaml
camunda:
  data:
    exporters:
      elasticsearch:
        args:
          index:
            variable: false
```

### Filter by variable name

Use name-based inclusion and exclusion lists to export only the variables you need. You can match by exact name, prefix (`startsWith`), or suffix (`endsWith`). Exclusion wins over inclusion when both rules match the same variable name.

| Goal                       | Options                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| Include specific variables | `variableNameInclusionExact`, `variableNameInclusionStartWith`, `variableNameInclusionEndWith` |
| Exclude specific variables | `variableNameExclusionExact`, `variableNameExclusionStartWith`, `variableNameExclusionEndWith` |

**Example — export only `customer`-prefixed variables and `orderId`:**

```yaml
camunda:
  data:
    exporters:
      elasticsearch:
        args:
          index:
            variableNameInclusionStartWith:
              - customer
            variableNameInclusionExact:
              - orderId
```

### Filter by variable type

Drop variables by inferred JSON type to exclude large payloads such as objects or arrays. Valid types are `String`, `Number`, `Boolean`, `Object`, and `Null`.

| Goal                        | Options                      |
| --------------------------- | ---------------------------- |
| Include specific types only | `variableValueTypeInclusion` |
| Exclude specific types      | `variableValueTypeExclusion` |

**Example — drop object and null variables:**

```yaml
camunda:
  data:
    exporters:
      elasticsearch:
        args:
          index:
            variableValueTypeExclusion:
              - Object
              - Null
```

## Trade-offs

Filtered data is permanently unavailable in Optimize:

- **Process filtering:** Excluded processes don't appear in Optimize reports. If you later re-enable a process, Optimize shows a permanent gap for the period when it was excluded — records from that window were never exported.
- **Variable filtering:** Filtered variables are unavailable in Optimize reports, including variable filters, variable-based grouping, and raw-data variable columns.

For guidance on non-retroactivity, changing filters on running clusters, and safely applying filters mid-stream, see [Camunda 8 system configuration](./system-configuration-platform-8.md#exporter-side-filters-and-optimize-data-completeness).

## OpenSearch

The same filter options are available for the OpenSearch exporter. Replace `camunda.data.exporters.elasticsearch` with `camunda.data.exporters.opensearch` in the configuration. See [OpenSearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md) for the full option reference.

## Full option reference

For a complete list of filter options and their defaults, see:

- [Elasticsearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md#configuration)
- [OpenSearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md#configuration)
