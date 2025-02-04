---
id: camunda-exporter
title: "Camunda Exporter"
sidebar_label: "Camunda Exporter"
description: "Use the Camunda Exporter to export Zeebe records to Elasticsearch/OpenSearch without additional importers or data transformations."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The Camunda Exporter exports Zeebe records directly to Elasticsearch/OpenSearch. Unlike the Elasticsearch and OpenSearch exporters, records are exported in the format required by Operate and Tasklist, and configuring additional importers or data transformations is not required.

Using the Camunda Exporter can increase process instance throughput, and can reduce the latency of changes appearing in Operate and Tasklist.

:::note
When exporting, indexes are created as required, and will not be created twice if they already exist. However, once disabled, they
will not be deleted (that is up to the administrator.) A [retention](./camunda-exporter.md?configuration=retention#options) policy can be configured to automatically delete data after a certain number of days.
:::

## Configuration

Enable the exporter by configuring the `className` in your [broker configuration](/self-managed/zeebe-deployment/configuration/broker.md#zeebebrokerexporters):

```yaml
exporters:
  camundaExporter:
    className: io.camunda.exporter.CamundaExporter
    args:
    # Refer to the table below for the available args options
```

:::note
As the exporter is packaged with Zeebe, it is not necessary to specify a `jarPath`.
:::

Configure the exporter by providing `args`. See the tables below for configuration options and default values, or review the [example YAML configuration](#example).

| Option       | Description                                                                                                         | Default |
| ------------ | ------------------------------------------------------------------------------------------------------------------- | ------- |
| connect      | Refer to [Connect](./camunda-exporter.md?configuration=connect#options) for the connection configuration options.   |         |
| index        | Refer to [Index](./camunda-exporter.md?configuration=index#options) for the index configuration options.            |         |
| bulk         | Refer to [Bulk](./camunda-exporter.md?configuration=bulk#options) for the bulk configuration options.               |         |
| retention    | Refer to [Retention](./camunda-exporter.md?configuration=retention#options) for the retention configuration options |         |
| createSchema | If `true` missing indexes will be created automatically.                                                            | true    |

### Options

<Tabs groupId="configuration" defaultValue="index" queryString
values={[{label: 'Connect', value: 'connect' },{label: 'Security', value: 'security' },{label: 'Index', value: 'index' },{label: 'Bulk', value: 'bulk' },{label: 'Retention', value: 'retention' }]} >

<TabItem value="connect">

:::note
Please refer to [supported environments](/reference/supported-environments.md#camunda-8-self-managed) to find out which
versions of Elasticsearch and/or OpenSearch are supported in a Camunda 8 Self-Managed setup.
:::

| Option         | Description                                                                                                                   | Default                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| type           | the type of the underlying search engine to export to. Accepted values are `elasticsearch` or `opensearch`.                   | elasticsearch               |
| clusterName    | The name of the Elasticsearch/OpenSearch cluster to export to.                                                                | elasticsearch               |
| dateFormat     | Defines a custom date format that should be used for fetching date data from the engine (should be the same as in the engine) | yyyy-MM-dd'T'HH:mm:ss.SSSZZ |
| socketTimeout  | Defines the socket timeout in milliseconds, which is the timeout for waiting for data.                                        |                             |
| connectTimeout | Determines the timeout in milliseconds until a connection is established.                                                     |                             |
| username       | Username used to authenticate.                                                                                                |                             |
| password       | Password used to authenticate.                                                                                                |                             |
| security       | Refer to [Security](./camunda-exporter.md?configuration=security#options) for security configuration.                         |                             |

:::note
If you are using `opensearch` on AWS, the AWS SDK's [DefaultCredentialsProvider](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/auth/credentials/DefaultCredentialsProvider.html) is used for authentication. For more details on configuring credentials, refer to the [AWS SDK documentation](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-chain.html#credentials-default).
:::

</TabItem>

<TabItem value="security">

| Option          | Description                                                                                       | Default |
| --------------- | ------------------------------------------------------------------------------------------------- | ------- |
| enabled         | If `true`, enables the security (ssl) features for the exporter.                                  | false   |
| certificatePath | The file path to the SSL certificate used for secure communication with Elasticsearch/OpenSearch. |         |
| verifyHostname  | If `true`, the hostname of the SSL certificate will be validated.                                 | true    |
| selfSigned      | If `true`, allows the use of self-signed SSL certificates.                                        | false   |

</TabItem>

<TabItem value="index">

| Option                | Description                                                                                                                                                                                 | Default |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| prefix                | This prefix will be appended to every index created by the exporter; must not contain `_` (underscore).                                                                                     |         |
| numberOfShards        | The number of [shards](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules.html#_static_index_settings) used for each created index.                              | 3       |
| numberOfReplicas      | The number of shard [replicas](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules.html#dynamic-index-settings) used for created index.                           | 0       |
| variableSizeThreshold | Defines a threshold for variable size. Variables exceeding this threshold are split into two properties: `FULL_VALUE` (full content, not indexed) and `VALUE` (truncated content, indexed). | 8191    |
| shardsByIndexName     | A map where the key is the index name and the value is the number of shards, allowing you to override the default `numberOfShards` setting for specific indices.                            |         |
| replicasByIndexName   | A map where the key is the index name and the value is the number of replicas, allowing you to override the default `numberOfReplicas` setting for specific indices.                        |         |

</TabItem>

<TabItem value="bulk">

To avoid too many expensive requests to the Elasticsearch/OpenSearch cluster, the exporter performs batch
updates by default. The size of the batch, along with how often it should be flushed (regardless of
size) can be controlled by configuration.

| Option | Description                                                                                                                                                    | Default |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| delay  | Delay, in seconds, before force flush of the current batch. This ensures that even when we have low traffic of records, we still export every once in a while. | `5`     |
| size   | The amount of records a batch should have before we flush the batch.                                                                                           | `1000`  |

With the default configuration, the exporter will aggregate records and flush them to Elasticsearch/OpenSearch:

1. When it has aggregated 1000 records.
2. Five seconds have elapsed since the last flush (regardless of how many
   records were aggregated).

</TabItem>

<TabItem value="retention">

A retention policy can be set up to delete old data.
When enabled, this creates an Index Lifecycle Management (ILM) Policy that deletes the data after the specified
`minimumAge`.
All index templates created by this exporter apply the created ILM Policy.

| Option     | Description                                                                   | Default |
| ---------- | ----------------------------------------------------------------------------- | ------- |
| enabled    | If `true` the ILM Policy is created and applied to the index templates.       | `false` |
| minimumAge | Specifies how old the data must be, before the data is deleted as a duration. | `30d`   |
| policyName | The name of the created and applied ILM policy.                               |         |

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
  # To convert a YAML formatted variable to an environment variable, start with the top-level property and separate every nested property with an underscore (_).
  # For example, the property "zeebe.broker.exporters.camundaExporter.args.index.numberOfShards" would be converted to "ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_INDEX_NUMBEROFSHARDS".
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
