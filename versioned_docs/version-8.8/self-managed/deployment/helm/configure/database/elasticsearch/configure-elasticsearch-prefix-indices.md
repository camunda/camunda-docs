---
id: prefix-elasticsearch-indices
sidebar_label: Prefix Elasticsearch and OpenSearch indices
title: Configure Elasticsearch and OpenSearch index prefixes
description: "Configure Elasticsearch and OpenSearch index prefixes to organize indices and isolate data when multiple Camunda instances share a cluster."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Camunda components store operational data in Elasticsearch or OpenSearch indices. By default, Camunda uses the standard index names created by each exporter.

Configure an index prefix when you need to:

- Organize indices by grouping related indices under a consistent naming pattern.
- Isolate data when multiple Camunda instances share the same Elasticsearch or OpenSearch cluster, so they don’t write to or read from each other’s indices.
- Avoid index name collisions in multi-instance environments (for example, separate dev/test/prod installations using one shared cluster).

:::warning
Changing an index prefix after a Camunda instance has been running creates new, empty indices with the new prefix. Camunda does not provide built‑in migration support between old and new prefixes.

If Elasticsearch/OpenSearch Expoter indices and unified Camunda indices use the same Elasticsearch/OpenSearch cluster, you must use different index prefixes.

Do not reuse the same prefix for:

- Elasticsearch/OpenSearch Expoter indices (legacy exporter): `zeebe.broker.exporters.{elasticsearch|opensearch}.args.index.prefix`
- Unified Camunda indices (secondary storage): `camunda.data.secondary-storage.{elasticsearch|opensearch}.index-prefix`

In particular, do not configure `camunda.data.secondary-storage.{elasticsearch|opensearch}.index-prefix` (or `CAMUNDA_DATA_SECONDARYSTORAGE_{ELASTICSEARCH|OPENSEARCH}_INDEXPREFIX`) to `zeebe-record`, because `zeebe-record` is the default value of `zeebe.broker.exporters.{elasticsearch|opensearch}.args.index.prefix` for Elasticsearch/OpenSearch Expoter indices.

Reusing a shared prefix can cause Zeebe ILM/ISM policies and wildcard index patterns (for example, `custom*`) to also match Orchestration Cluster indices, which may lead to unexpected data loss.

Also make sure one prefix does not include the other. For example, `custom` and `custom-zeebe` can still conflict because wildcard patterns like `custom*` match both.
:::

## Exporters and index prefixes

Starting with Camunda 8.8, index prefixes are configured per exporter. Camunda uses two exporters, and each exporter has its own index prefix configuration.

### Camunda Exporter (default)

The Camunda Exporter is enabled by default. It creates unified Camunda indices used by the Orchestration Cluster (Operate and Tasklist).

- **Helm configuration**: `orchestration.index.prefix`
- **Default value**: `""` (empty string, meaning no prefix)
- **Controlled by**: `orchestration.exporters.camunda.enabled: true` (default)

### Legacy Zeebe Exporter

The Legacy Zeebe Exporter creates `zeebe-record` indices. This exporter is disabled by default. Optimize reads from the `zeebe-record` indices. When Optimize is enabled, the Legacy Zeebe Exporter is automatically enabled to provide these indices.

- **Helm configuration**: `global.elasticsearch.prefix` or `global.opensearch.prefix`
- **Default value**: `zeebe-record`
- **Controlled by**: `orchestration.exporters.zeebe.enabled: false` (default)

:::info When the Legacy Zeebe Exporter is used
The legacy Zeebe Exporter is automatically enabled when:

- Optimize is enabled (`optimize.enabled: true`)
- You explicitly enable it (`orchestration.exporters.zeebe.enabled: true`)
- Data migration from pre-8.8 versions is required
  :::

## Configuration reference

| Configuration                 | Default        | Used By                                 | Purpose                                                  |
| ----------------------------- | -------------- | --------------------------------------- | -------------------------------------------------------- |
| `orchestration.index.prefix`  | `""`           | Camunda Exporter, Orchestration Cluster | Prefix for unified Camunda indices                       |
| `global.elasticsearch.prefix` | `zeebe-record` | Legacy Zeebe Exporter                   | Prefix for `zeebe-record` indices (consumed by Optimize) |
| `global.opensearch.prefix`    | `zeebe-record` | Legacy Zeebe Exporter                   | Prefix for `zeebe-record` indices when using OpenSearch  |

### Optimize-specific configuration

When you use a custom prefix for `zeebe-record` indices and Optimize is enabled, you must also configure Optimize to use the same prefixes. If these values do not match the exporter prefix exactly, Optimize can start but does not display process data.

| Environment Variable                                   | Purpose                                                                |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| `CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX` | Prefix for Optimize's own indices (Elasticsearch)                      |
| `CAMUNDA_OPTIMIZE_OPENSEARCH_SETTINGS_INDEX_PREFIX`    | Prefix for Optimize's own indices (OpenSearch)                         |
| `CAMUNDA_OPTIMIZE_ZEEBE_NAME`                          | Must match `global.elasticsearch.prefix` or `global.opensearch.prefix` |

## Configure index prefixes

<Tabs groupId="featured" defaultValue="valuesYaml" queryString values={
[
{label: 'values.yaml', value: 'valuesYaml' },
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yaml', value: 'applicationYaml' },
]}>
<TabItem value="valuesYaml">

### Basic configuration (without Optimize)

If Optimize is not enabled, configure only the Camunda Exporter prefix.

<Tabs groupId="database" defaultValue="elasticsearch" values={
[
{label: 'Elasticsearch', value: 'elasticsearch' },
{label: 'OpenSearch', value: 'opensearch' },
]}>
<TabItem value="elasticsearch">

```yaml
orchestration:
  index:
    prefix: custom-camunda # Unified Camunda indices prefix
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
    prefix: custom-camunda # Unified Camunda indices prefix
```

</TabItem>
</Tabs>

### Full configuration (with Optimize)

When Optimize is enabled, configure:

- The Legacy Zeebe Exporter prefix (`global.elasticsearch.prefix` or `global.opensearch.prefix`)
- The Camunda Exporter prefix (`orchestration.index.prefix`)
- Optimize environment variables so Optimize can find the correct indices

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
    prefix: custom-zeebe # Legacy Zeebe Exporter prefix (read by Optimize)

orchestration:
  index:
    prefix: custom-camunda # Camunda Exporter prefix

optimize:
  enabled: true
  env:
    - name: CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX
      value: custom-optimize # Optimize's own indices
    - name: CAMUNDA_OPTIMIZE_ZEEBE_NAME
      value: custom-zeebe # Must match global.elasticsearch.prefix
```

</TabItem>
<TabItem value="opensearch">

```yaml
global:
  elasticsearch:
    enabled: false
  opensearch:
    enabled: true
    prefix: custom-zeebe # Legacy Zeebe Exporter prefix (read by Optimize)

orchestration:
  index:
    prefix: custom-camunda # Camunda Exporter prefix

optimize:
  enabled: true
  env:
    - name: CAMUNDA_OPTIMIZE_OPENSEARCH_SETTINGS_INDEX_PREFIX
      value: custom-optimize # Optimize's own indices
    - name: CAMUNDA_OPTIMIZE_ZEEBE_NAME
      value: custom-zeebe # Must match global.opensearch.prefix
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

s
For example, recommended:

```bash
ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INDEX_PREFIX=custom-zeebe
CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_INDEXPREFIX=custom-camunda
```

Not allowed (will cause conflicts):

```bash
ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INDEX_PREFIX=shared-prefix
CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_INDEXPREFIX=shared-prefix
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

For example, recommended:

```bash
ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_INDEX_PREFIX=custom-zeebe
CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_INDEXPREFIX=custom-camunda
```

Not allowed (will cause conflicts):

```bash
ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_INDEX_PREFIX=shared-prefix
CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_INDEXPREFIX=shared-prefix
```

</TabItem>
<TabItem value="applicationYaml">

### Elasticsearch

```yaml
camunda:
  data:
    secondary-storage:
      elasticsearch:
        index-prefix: custom-camunda # Camunda Exporter prefix

zeebe:
  broker:
    exporters:
      elasticsearch:
        args:
          index:
            prefix: custom-zeebe # Legacy Zeebe Exporter prefix
```

### OpenSearch

```yaml
camunda:
  data:
    secondary-storage:
      opensearch:
        index-prefix: custom-camunda # Camunda Exporter prefix

zeebe:
  broker:
    exporters:
      opensearch:
        args:
          index:
            prefix: custom-zeebe # Legacy Zeebe Exporter prefix
```

</TabItem>

</Tabs>

## References

- [Use external Elasticsearch](/self-managed/deployment/helm/configure/database/elasticsearch/using-external-elasticsearch.md)
- [Use external OpenSearch](/self-managed/deployment/helm/configure/database/using-external-opensearch.md)
