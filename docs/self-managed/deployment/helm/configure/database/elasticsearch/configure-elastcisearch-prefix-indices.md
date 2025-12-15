---
id: prefix-elasticsearch-indices
sidebar_label: Prefix Elasticsearch/OpenSearch indices
title: Helm chart Elasticsearch/OpenSearch indices prefix
description: "Configure Elasticsearch/OpenSearch index prefixes to structure your data, and ensure data isolation."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Overview

Elasticsearch and OpenSearch prefixes allow you to append a unique identifier to each index, making it easier to organize and retrieve relevant information by structuring your data. With a consistent prefix, all related indices are easily identifiable, simplifying queries and data management.

Using index prefixes in Camunda ensures data isolation by allowing multiple Camunda instances to run on a shared cluster without accessing each other's data. This is crucial for maintaining separation in multi-instance and multi-tenant environments, and when testing different configurations.

:::note
Changing the index prefix after a Camunda instance has been running will create new empty indices with the new prefix. There is no built-in migration support between old and new prefixes.
:::

## Understanding Camunda exporters

Camunda 8.8 and later uses two different exporters that each have their own index prefix configuration:

### Camunda Exporter (default)

The **Camunda Exporter** is the unified exporter enabled by default. It creates unified Camunda indices used by the Orchestration Cluster (Operate and Tasklist functionality).

- **Helm configuration**: `orchestration.index.prefix`
- **Default value**: `""` (empty string, meaning no prefix)
- **Controlled by**: `orchestration.exporters.camunda.enabled: true` (default)

### Legacy Zeebe Exporter

The **Legacy Zeebe Exporter** creates `zeebe-record` indices. This exporter is disabled by default but is still required when Optimize is enabled, as Optimize reads from the zeebe-record indices.

- **Helm configuration**: `global.elasticsearch.prefix` or `global.opensearch.prefix`
- **Default value**: `zeebe-record`
- **Controlled by**: `orchestration.exporters.zeebe.enabled: false` (default)

:::info When is the legacy Zeebe Exporter needed?
The legacy Zeebe Exporter is automatically enabled when:
- Optimize is enabled (`optimize.enabled: true`)
- You explicitly enable it (`orchestration.exporters.zeebe.enabled: true`)
- Data migration from pre-8.8 versions is required
:::

## Configuration reference

| Configuration | Default | Used By | Purpose |
|---------------|---------|---------|---------|
| `orchestration.index.prefix` | `""` | Camunda Exporter, Orchestration Cluster | Prefix for unified Camunda indices |
| `global.elasticsearch.prefix` | `zeebe-record` | Legacy Zeebe Exporter | Prefix for zeebe-record indices (consumed by Optimize) |
| `global.opensearch.prefix` | `zeebe-record` | Legacy Zeebe Exporter | Prefix for zeebe-record indices when using OpenSearch |

### Optimize-specific configuration

When using custom prefixes with Optimize, you must also configure Optimize to know where to find the zeebe-record indices:

| Environment Variable | Purpose |
|---------------------|---------|
| `CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX` | Prefix for Optimize's own indices (Elasticsearch) |
| `CAMUNDA_OPTIMIZE_OPENSEARCH_SETTINGS_INDEX_PREFIX` | Prefix for Optimize's own indices (OpenSearch) |
| `CAMUNDA_OPTIMIZE_ZEEBE_NAME` | Must match `global.elasticsearch.prefix` or `global.opensearch.prefix` |

## Usage

<Tabs groupId="featured" defaultValue="valuesYaml" queryString values={
[
{label: 'values.yaml', value: 'valuesYaml' },
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yaml', value: 'applicationYaml' },
]}>
<TabItem value="valuesYaml">

### Basic configuration (without Optimize)

If you are not using Optimize, you only need to configure the Camunda Exporter prefix:

<Tabs groupId="database" defaultValue="elasticsearch" values={
[
{label: 'Elasticsearch', value: 'elasticsearch' },
{label: 'OpenSearch', value: 'opensearch' },
]}>
<TabItem value="elasticsearch">

```yaml
orchestration:
  index:
    prefix: custom-camunda  # Unified Camunda indices prefix
```

</TabItem>
<TabItem value="opensearch">

```yaml
global:
  elasticsearch:
    enabled: false
  opensearch:
    enabled: true

orchestration:
  index:
    prefix: custom-camunda  # Unified Camunda indices prefix
```

</TabItem>
</Tabs>

### Full configuration (with Optimize)

When Optimize is enabled, you need to configure both exporter prefixes and Optimize's environment variables:

<Tabs groupId="database" defaultValue="elasticsearch" values={
[
{label: 'Elasticsearch', value: 'elasticsearch' },
{label: 'OpenSearch', value: 'opensearch' },
]}>
<TabItem value="elasticsearch">

```yaml
global:
  elasticsearch:
    enabled: true
    prefix: custom-zeebe  # Legacy Zeebe Exporter prefix (read by Optimize)

orchestration:
  index:
    prefix: custom-camunda  # Camunda Exporter prefix

optimize:
  enabled: true
  env:
    - name: CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX
      value: custom-optimize  # Optimize's own indices
    - name: CAMUNDA_OPTIMIZE_ZEEBE_NAME
      value: custom-zeebe  # Must match global.elasticsearch.prefix
```

</TabItem>
<TabItem value="opensearch">

```yaml
global:
  elasticsearch:
    enabled: false
  opensearch:
    enabled: true
    prefix: custom-zeebe  # Legacy Zeebe Exporter prefix (read by Optimize)

orchestration:
  index:
    prefix: custom-camunda  # Camunda Exporter prefix

optimize:
  enabled: true
  env:
    - name: CAMUNDA_OPTIMIZE_OPENSEARCH_SETTINGS_INDEX_PREFIX
      value: custom-optimize  # Optimize's own indices
    - name: CAMUNDA_OPTIMIZE_ZEEBE_NAME
      value: custom-zeebe  # Must match global.opensearch.prefix
  migration:
    env:
      - name: CAMUNDA_OPTIMIZE_OPENSEARCH_SETTINGS_INDEX_PREFIX
        value: custom-optimize
      - name: CAMUNDA_OPTIMIZE_ZEEBE_NAME
        value: custom-zeebe
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="envVars">

### Elasticsearch

```sh
# Camunda Exporter - unified Camunda indices prefix
CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_INDEXPREFIX=custom-camunda

# Legacy Zeebe Exporter - zeebe-record indices prefix (for Optimize)
ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INDEX_PREFIX=custom-zeebe

# Optimize indices prefix (when Optimize is enabled)
CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX=custom-optimize
CAMUNDA_OPTIMIZE_ZEEBE_NAME=custom-zeebe
```

### OpenSearch

```sh
# Camunda Exporter - unified Camunda indices prefix
CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_INDEXPREFIX=custom-camunda

# Legacy Zeebe Exporter - zeebe-record indices prefix (for Optimize)
ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_INDEX_PREFIX=custom-zeebe

# Optimize indices prefix (when Optimize is enabled)
CAMUNDA_OPTIMIZE_OPENSEARCH_SETTINGS_INDEX_PREFIX=custom-optimize
CAMUNDA_OPTIMIZE_ZEEBE_NAME=custom-zeebe
```

</TabItem>
<TabItem value="applicationYaml">

### Elasticsearch

```yaml
camunda:
  data:
    secondary-storage:
      elasticsearch:
        index-prefix: custom-camunda  # Camunda Exporter prefix

zeebe:
  broker:
    exporters:
      elasticsearch:
        args:
          index:
            prefix: custom-zeebe  # Legacy Zeebe Exporter prefix
```

### OpenSearch

```yaml
camunda:
  data:
    secondary-storage:
      opensearch:
        index-prefix: custom-camunda  # Camunda Exporter prefix

zeebe:
  broker:
    exporters:
      opensearch:
        args:
          index:
            prefix: custom-zeebe  # Legacy Zeebe Exporter prefix
```

</TabItem>

</Tabs>

## Related resources

- [Use external Elasticsearch](/self-managed/deployment/helm/configure/database/elasticsearch/using-external-elasticsearch.md)
- [Use external OpenSearch](/self-managed/deployment/helm/configure/database/opensearch/using-external-opensearch.md)
