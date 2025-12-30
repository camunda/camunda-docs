---
id: prefix-elasticsearch-indices
sidebar_label: Prefix Elasticsearch/OpenSearch indices
title: Helm chart Elasticsearch/OpenSearch indices prefix
description: "Elasticsearch and OpenSearch prefixes allow you to append a unique identifier to each index, making it easier to organize."
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
CAMUNDA_DATA_EXPORTERS_ELASTICSEARCH_ARGS_INDEX_PREFIX=custom-zeebe

# unified camunda indices prefix
CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_INDEXPREFIX=custom-camunda

# optimize indices prefix
CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX=custom-optimize
CAMUNDA_OPTIMIZE_ZEEBE_NAME=custom-zeebe
```

### OpenSearch

```sh
# zeebe-records indices prefix
CAMUNDA_DATA_EXPORTERS_OPENSEARCH_ARGS_INDEX_PREFIX=custom-zeebe

# unified camunda indices prefix
CAMUNDA_DATA_SECONDARYSTORAGE_OPENSEARCH_INDEXPREFIX=custom-camunda

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
camunda:
  data:
    exporters:
      elasticsearch:
        args:
          index:
            prefix: custom-zeebe # zeebe-records indices prefix
    secondary-storage:
      elasticsearch:
        index-prefix: custom-camunda # unified camunda indices prefix
```

### OpenSearch

```yaml
camunda:
  data:
    exporters:
      opensearch:
        args:
          index:
            prefix: custom-zeebe # zeebe-records indices prefix
    secondary-storage:
      opensearch:
        index-prefix: custom-camunda # unified camunda indices prefix
```

</TabItem>

</Tabs>
