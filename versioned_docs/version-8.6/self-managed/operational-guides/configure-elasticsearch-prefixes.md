---
id: prefix-elasticsearch-indices
title: "Prefix Elasticsearch indicies"
sidebar_label: "Prefix Elasticsearch indicies"
description: "Configure elasticsearch prefix indicies."
---

## Overview

Using Elasticsearch index prefixes in Camunda provides key benefits, specially for multi-instance and multi-tenant environments. It ensure data isolation by allowing multiple Camunda instances to run on a shared cluster without accessing each other’s data. This is crucial for maintaining separation in multi-tenancy and testing different configurations.
Additionally, prefixes help structure data by appending a unique identifier to each index, making it easier to organize and retrieve relevant information. With a consistent prefix, all related indices are easily identifiable, simplifying queries and data management.

:::note
Changing the index prefix after a Camunda instance has been running will create new empty indices with the new prefix, and there is no built-in migration support between old and new prefixes.
:::

## Usage

<Tabs groupId="featured" defaultValue="new" queryString values={
[
{label: 'Environment Variables', value: 'envVars' },
{label: 'values.yaml', value: 'valuesYaml' },
{label: 'application.yaml', value: 'applicationYaml' },
]}>
<TabItem value="envVars">

```
ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INDEX_PREFIX=custom-zeebe

CAMUNDA_OPERATE_ELASTICSEARCH_INDEXPREFIX=custom
CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_PREFIX=custom-zeebe

CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX=custom-optimize
CAMUNDA_OPTIMIZE_ZEEBE_NAME=custom-zeebe

CAMUNDA_TASKLIST_ELASTICSEARCH_INDEXPREFIX=custom
CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_PREFIX=custom-zeebe
```

</TabItem>
<TabItem value="valuesYaml">

```yaml
elasticsearch:
  prefix: custom-zeebe

operate:
  env:
    - name: CAMUNDA_OPERATE_ELASTICSEARCH_INDEXPREFIX
      value: custom-operate
    - name: CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_PREFIX
      value: custom-zeebe
  migration:
    env:
      - name: CAMUNDA_OPERATE_ELASTICSEARCH_INDEXPREFIX
        value: custom-operate
      - name: CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_PREFIX
        value: custom-zeebe

optimize:
  env:
    - name: CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX
      value: custom-optimize
  migration:
    env:
      - name: CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX
        value: custom-optimize
      - name: CAMUNDA_OPTIMIZE_ZEEBE_NAME
        value: custom-zeebe

tasklist:
  env:
    - name: CAMUNDA_TASKLIST_ELASTICSEARCH_INDEXPREFIX
      value: custom-tasklist
    - name: CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_PREFIX
      value: custom-zeebe
```

</TabItem>
<TabItem value="applicationYaml">

```yaml
zeebe:
  broker:
    exporters:
      elasticsearch:
        args:
          index:
            prefix: custom-zeebe
camunda:
  operate:
    elasticsearch:
      indexPrefix: custom
    zeebeElasticsearch:
      prefix: custom-zeebe
  optimize:
    elasticsearch:
      settings:
        index:
          prefix: custom-optimize
    zeebeElasticsearch:
      prefix: custom-zeebe
  tasklist:
    elasticsearch:
      indexPrefix: custom
    zeebeElasticsearch:
      prefix: custom-zeebe
```

</TabItem>

</Tabs>
