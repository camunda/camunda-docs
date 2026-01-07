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

### Elasticsearch

```sh
# zeebe-records indices prefix
ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INDEX_PREFIX=custom-zeebe

# unified camunda indices prefix
CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_INDEXPREFIX=custom-camunda

# only if the operate importer is enabled
CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_INDEXPREFIX=custom-zeebe
# only if the tasklist importer is enabled
CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_PREFIX=custom-zeebe

# optimize indices prefix
CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX=custom-optimize
CAMUNDA_OPTIMIZE_ZEEBE_NAME=custom-zeebe
```

### OpenSearch

```sh
# zeebe-records indices prefix
ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_INDEX_PREFIX=custom-zeebe

# unified camunda indices prefix
CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_INDEXPREFIX=custom-camunda

# only if the operate importer is enabled
CAMUNDA_OPERATE_ZEEBEOPENSEARCH_INDEXPREFIX=custom-zeebe
# only if the tasklist importer is enabled
CAMUNDA_TASKLIST_ZEEBEOPENSEARCH_PREFIX=custom-zeebe

# optimize indices prefix
CAMUNDA_OPTIMIZE_OPENSEARCH_SETTINGS_INDEX_PREFIX=custom-optimize
CAMUNDA_OPTIMIZE_ZEEBE_NAME=custom-zeebe
```

</TabItem>
<TabItem value="valuesYaml">

### Elasticsearch

```yaml
global:
  elasticsearch:
    prefix: custom-zeebe # zeebe-records indices prefix

orchestration:
  index:
    prefix: custom-camunda # unified camunda indices prefix
  env:
    # only if the importer is enabled
    - name: CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_INDEXPREFIX
      value: custom-zeebe
    # only if the importer is enabled
    - name: CAMUNDA_TASKLIST_ELASTICSEARCH_INDEXPREFIX
      value: custom-zeebe

optimize:
  env:
    - name: CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX
      value: custom-optimize
    - name: CAMUNDA_OPTIMIZE_ZEEBE_NAME
      value: custom-zeebe
```

### OpenSearch

```yaml
global:
  opensearch:
    prefix: custom-zeebe # zeebe-records indices prefix

orchestration:
  index:
    prefix: custom-camunda # unified camunda indices prefix
  env:
    # only if the importer is enabled
    - name: CAMUNDA_OPERATE_ZEEBEOPENSEARCH_INDEXPREFIX
      value: custom-zeebe
    # only if the importer is enabled
    - name: CAMUNDA_TASKLIST_OPENSEARCH_INDEXPREFIX
      value: custom-zeebe

optimize:
  env:
    - name: CAMUNDA_OPTIMIZE_OPENSEARCH_SETTINGS_INDEX_PREFIX
      value: custom-optimize
    - name: CAMUNDA_OPTIMIZE_ZEEBE_NAME
      value: custom-zeebe
```

</TabItem>
<TabItem value="applicationYaml">

### Elasticsearch

```yaml
zeebe:
  broker:
    exporters:
      elasticsearch:
        args:
          index:
            prefix: custom-zeebe # zeebe-records indices prefix
camunda:
  data:
    secondary-storage:
      elasticsearch:
        index-prefix: custom-camunda # unified camunda indices prefix
  operate: # only if operate importer is enabled
    zeebeElasticsearch:
      prefix: custom-zeebe
  tasklist: # only if tasklist importer is enabled
    zeebeElasticsearch:
      prefix: custom-zeebe
```

### OpenSearch

```yaml
zeebe:
  broker:
    exporters:
      opensearch:
        args:
          index:
            prefix: custom-zeebe # zeebe-records indices prefix
camunda:
  data:
    secondary-storage:
      opensearch:
        index-prefix: custom-camunda # unified camunda indices prefix
  operate: # only if operate importer is enabled
    zeebeOpensearch:
      prefix: custom-zeebe
  tasklist: # only if tasklist importer is enabled
    zeebeOpensearch:
      prefix: custom-zeebe
```

</TabItem>

</Tabs>
