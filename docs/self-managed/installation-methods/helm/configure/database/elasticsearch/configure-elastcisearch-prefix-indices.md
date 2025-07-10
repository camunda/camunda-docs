---
id: prefix-elasticsearch-indices
title: "Prefix Elasticsearch indices"
sidebar_label: "Prefix Elasticsearch indices"
description: "Configure Elasticsearch index prefixes to structure your data, and ensure data isolation."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Overview

Elasticsearch prefixes allow you to append a unique identifier to each Elasticsearch index, making it easier to organize and retrieve relevant information by structuring your data. With a consistent prefix, all related indices are easily identifiable, simplifying queries and data management.

Using index prefixes in Camunda ensures data isolation by allowing multiple Camunda instances to run on a shared cluster without accessing each other’s data. This is crucial for maintaining separation in multi-instance and multi-tenant environments, and when testing different configurations.

:::note
Changing the index prefix after a Camunda instance has been running will create new empty indices with the new prefix. There is no built-in migration support between old and new prefixes.
:::

## Usage

<Tabs groupId="featured" defaultValue="envVars" queryString values={
[
{label: 'Environment variables', value: 'envVars' },
{label: 'values.yaml', value: 'valuesYaml' },
{label: 'application.yaml', value: 'applicationYaml' },
]}>
<TabItem value="envVars">

```sh
ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INDEX_PREFIX=custom-zeebe

CAMUNDA_OPERATE_ELASTICSEARCH_INDEXPREFIX=custom
CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_PREFIX=custom-zeebe

CAMUNDA_TASKLIST_ELASTICSEARCH_INDEXPREFIX=custom
CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_PREFIX=custom-zeebe

CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX=custom-optimize
CAMUNDA_OPTIMIZE_ZEEBE_NAME=custom-zeebe
```

</TabItem>
<TabItem value="valuesYaml">

```yaml
global:
  elasticsearch:
    prefix: custom-zeebe

operate:
  env:
    - name: CAMUNDA_OPERATE_ELASTICSEARCH_INDEXPREFIX
      value: custom-webapp

tasklist:
  env:
    - name: CAMUNDA_TASKLIST_ELASTICSEARCH_INDEXPREFIX
      value: custom-webapp

optimize:
  env:
    - name: CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX
      value: custom-optimize
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
  tasklist:
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
```

</TabItem>

</Tabs>
