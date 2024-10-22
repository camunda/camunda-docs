---
id: camunda-exporter
title: "Camunda exporter"
sidebar_label: "Camunda Exporter"
description: "The common camunda exporter exporting zeebe records to harmonized web-apps indices ."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The Camunda Exporter replaces the old Elasticsearch and Opensearch exporters. Previously, these exporters mainly
exported raw records from Zeebe streams into several indices. Camunda webapps (e.g., Operate, Tasklist) then imported
and transformed these records into useful forms. The Camunda Exporter aims to write records directly into
Elasticsearch/Opensearch in the form needed by the webapps, eliminating the need for additional importing or
transformation. This increases process instance throughput and reduces the latency of changes appearing
in Operate and Tasklist webapps by cutting off the importer from the data pipeline.

:::note
The indexes are created as required, and will not be created twice if they already exist. However, once disabled, they
will not be deleted (that is up to the administrator.) Similarly, data is never deleted by the exporter, and must be
deleted by the administrator when it is safe to do so.
A [retention](#retention) policy can be configured to automatically delete data after a certain number of days.
:::

## Configuration

:::note
As the exporter is packaged with Zeebe, it is not necessary to specify a `jarPath`.
:::

The exporter can be enabled by configuring it with the `classpath` in the broker settings.

For example:

```yaml
exporters:
  camundaExporter:
    className: io.camunda.exporter.CamundaExporter
    args:
    # Refer to the table below for the available args options
```

The exporter can be configured by providing `args`. The table below explains all the different
options, and the default values for these options:

| Option       | Description                                                              | Default |
|--------------|--------------------------------------------------------------------------|---------|
| connect      | Refer to [Connect](#connect) for the connection configuration options.   |         |
| index        | Refer to [Index](#index) for the index configuration options.            |         |
| bulk         | Refer to [Bulk](#bulk) for the bulk configuration options.               |         |
| retention    | Refer to [Retention](#retention) for the retention configuration options |         |
| createSchema | If `true` missing indexes will be created automatically.                 | true    |

<Tabs groupId="configuration" defaultValue="index" queryString
values={[{label: 'Connect', value: 'connect' },{label: 'Security', value: 'security' },{label: 'Index', value: 'index' },{label: 'Bulk', value: 'bulk' },{label: 'Retention', value: 'retention' }]} >

<TabItem value="connect">

:::note
Please refer to [supported environments](/reference/supported-environments.md#camunda-8-self-managed) to find out which
versions of Elasticsearch and/or Opensearch are supported in a Camunda 8 Self-Managed setup.
:::

| Option         | Description                                                                                                                   | Default                     |
|----------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------|
| type           | the type of the underlying search engine to export to. Accepted values are `elasticsearch` or `opensearch`.                   | elasticsearch               |
| clusterName    | The name of the elasticsearch/opensearch cluster to export to.                                                                | elasticsearch               |
| dateFormat     | Defines a custom date format that should be used for fetching date data from the engine (should be the same as in the engine) | yyyy-MM-dd'T'HH:mm:ss.SSSZZ |
| socketTimeout  | Defines the socket timeout in milliseconds, which is the timeout for waiting for data.                                        |                             |
| connectTimeout | Determines the timeout in milliseconds until a connection is established.                                                     |                             |
| username       | Username used to authenticate                                                                                                 |                             |
| password       | Password used to authenticate                                                                                                 |                             |
| security       | Refer to [Security](#security) for security configuration                                                                     |                             |

</TabItem>

<TabItem value="security">

| Option          | Description                                                                                       | Default |
|-----------------|---------------------------------------------------------------------------------------------------|---------|
| enabled         | If `true`, enables the security (ssl) features for the exporter.                                  | false   |
| certificatePath | The file path to the SSL certificate used for secure communication with Elasticsearch/Opensearch. |         |
| verifyHostname  | If `true`, the hostname of the SSL certificate will be validated.                                 | true    |
| selfSigned      | If `true`, allows the use of self-signed SSL certificates.                                        | false   |

</TabItem>

<TabItem value="index">

| Option                | Description                                                                                                                                                                                 | Default |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| prefix                | This prefix will be appended to every index created by the exporter; must not contain `_` (underscore).                                                                                     |         |
| numberOfShards        | The number of [shards](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules.html#_static_index_settings) used for each new record index created.                   | 3       |
| numberOfReplicas      | The number of shard [replicas](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules.html#dynamic-index-settings) used for each new record index created.           | 0       |
| variableSizeThreshold | Defines a threshold for variable size. Variables exceeding this threshold are split into two properties: `FULL_VALUE` (full content, not indexed) and `VALUE` (truncated content, indexed). | 8191    |
| shardsByIndexName     | A map where the key is the index name and the value is the number of shards, allowing you to override the default `numberOfShards` setting for specific indices.                            |         |
| replicasByIndexName   | A map where the key is the index name and the value is the number of replicas, allowing you to override the default `numberOfReplicas` setting for specific indices.                        |         |

</TabItem>

<TabItem value="bulk">

To avoid too many expensive requests to the Elasticsearch/Opensearch cluster, the exporter performs batch
updates by default. The size of the batch, along with how often it should be flushed (regardless of
size) can be controlled by configuration.

| Option | Description                                                                                                                                                    | Default |
|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| delay  | Delay, in seconds, before force flush of the current batch. This ensures that even when we have low traffic of records, we still export every once in a while. | `5`     |
| size   | The amount of records a batch should have before we flush the batch                                                                                            | `1000`  |

With the default configuration, the exporter will aggregate records and flush them to Elasticsearch/Opensearch:

1. When it has aggregated 1000 records.
    2. Five seconds have elapsed since the last flush (regardless of how many records were aggregated).

</TabItem>

<TabItem value="retention">

A retention policy can be set up to delete old data.
When enabled, this creates an Index Lifecycle Management (ILM) Policy that deletes the data after the specified
`minimumAge`.
All index templates created by this exporter apply the created ILM Policy.

| Option     | Description                                                                  | Default |
|------------|------------------------------------------------------------------------------|---------|
| enabled    | If `true` the ILM Policy is created and applied to the index templates       | `false` |
| minimumAge | Specifies how old the data must be, before the data is deleted as a duration | `30d`   |
| policyName | The name of the created and applied ILM policy                               |         |

:::note
The duration can be specified in days `d`, hours `h`, minutes `m`, seconds `s`, milliseconds `ms`, and/or nanoseconds
`nanos`.
:::

</TabItem>
</Tabs>

## Example

Here is an example configuration of the exporter:

```yaml
---
exporters:
  # Camunda Exporter ----------
  # An example configuration for the camunda exporter:
  #
  # These setting can also be overridden using the environment variables "ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_..."
  #
  camundaExporter:
    className: io.camunda.exporter.CamundaExporter

    args:
      connect:
        type: elasticsearch
        url: http://localhost:9200
        clusterName: elasticsearch
        dateFormat: yyyy-MM-dd'T'HH:mm:ss.SSSZZ
        socketTimeout: 1000
        connectTimeout: 1000
        username: elastic
        password: changeme
        security:
          enabled: false
          certificatePath: /path/to/certificate
          verifyHostname: true
          selfSigned: false

      bulk:
        delay: 5
        size: 1000

      index:
        prefix:
        numberOfShards: 3
        numberOfReplicas: 0

      retention:
        enabled: false
        minimumAge: 30d
        policyName: camunda-retention-policy

      createSchema: true
```
