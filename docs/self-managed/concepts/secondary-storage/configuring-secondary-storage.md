---
id: configuring-secondary-storage
sidebar_label: "Configure"
title: "Configure secondary storage"
description: "Learn how to configure secondary storage in Camunda Self-Managed environments using Helm, Docker, or manual deployment."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Configure secondary storage to enable features such as Operate, Tasklist, Identity, and search-based REST APIs in Camunda Self-Managed environments.

## Configuration options

You can configure secondary storage using Helm charts, Docker Compose, or manual configuration files.

Camunda uses the `data.secondary-storage` configuration to define which database backend supports advanced web applications and APIs.

:::note
For the latest list of supported relational databases and versions, see the  
[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).
:::

<Tabs groupId="configuration" defaultValue="helm" queryString values={[
{label: 'Helm', value: 'helm' },
{label: 'Docker Compose', value: 'docker-compose' },
{label: 'Manual (application.yaml)', value: 'manual' },
]}>

<TabItem value="helm">

When deploying with Helm, set the secondary storage type, connection details, and rdbms exporters in your `values.yaml` file:

```yaml
orchestration:
  exporters:
    camunda:
      enabled: false
    rdbms:
      enabled: true
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: jdbc:postgresql://hostname:5432/camunda
        username: camunda
        secret:
          existingSecret: camunda-db-secret
          existingSecretKey: password
```

More information about RDBMS in the Camunda Helm chart can be found on this [configuration page](/self-managed/deployment/helm/configure/database/rdbms.md).

For Elasticsearch:
The Camunda Helm chart by default enables the related exporter and doesn't require extra configuration.

```yaml
global:
  elasticsearch:
    enabled: true
    external: true
    auth:
      username: elastic
      secret:
        existingSecret: camunda-db-secret
        existingSecretKey: password
    url:
      protocol: http
      host: hostname
      port: 443

orchestration:
  data:
    secondaryStorage:
      type: elasticsearch
```

More information about Elasticsearch in the Camunda Helm chart can be found on this [configuration page](self-managed/deployment/helm/configure/database/elasticsearch/using-external-elasticsearch.md).

To explicitly disable secondary storage (for example, when running only the Zeebe engine), set:

```yaml
global:
  noSecondaryStorage: true
```

When this flag is set, all secondary-storage-dependent components are automatically disabled.

</TabItem>

<TabItem value="docker-compose">

If you’re using Docker Compose, configure your environment variables within the relevant service definition:

```yaml
environment:
  - CAMUNDA_DATA_SECONDARYSTORAGE_TYPE=rdbms
  - CAMUNDA_DATA_SECONDARYSTORAGE_RDBMS_URL=jdbc:h2:mem:camunda
  - CAMUNDA_DATA_SECONDARYSTORAGE_RDBMS_USERNAME=sa
  - CAMUNDA_DATA_SECONDARYSTORAGE_RDBMS_PASSWORD=
```

For Elasticsearch:

```yaml
environment:
  - CAMUNDA_DATA_SECONDARYSTORAGE_TYPE=elasticsearch
  - CAMUNDA_DATA_SECONDARYSTORAGE_ELASTICSEARCH_URL=http://elasticsearch:9200
```

To disable secondary storage:

```yaml
environment:
  - CAMUNDA_DATA_SECONDARYSTORAGE_TYPE=none
```

</TabItem>

<TabItem value="manual">

In Self-Managed or Camunda 8 Run deployments, you can also configure storage directly in the `application.yaml` file:

```yaml
data:
  secondary-storage:
    type: rdbms
    rdbms:
      url: jdbc:h2:file:./camunda-data/h2db
      username: sa
      password:
```

For Elasticsearch:

```yaml
data:
  secondary-storage:
    type: elasticsearch
    elasticsearch:
      url: http://localhost:9200/
```

</TabItem>

</Tabs>

## Choosing a storage backend

| Scenario                                  | Recommended backend                | Reason                                                        |
| :---------------------------------------- | :--------------------------------- | :------------------------------------------------------------ |
| Local testing or Camunda 8 Run quickstart | H2                                 | Fast, lightweight, and runs entirely in memory or file-based. |
| Production workloads                      | Elasticsearch or a supported RDBMS | Scalable and persistent; designed for concurrent queries.     |
| Debugging and troubleshooting             | H2 or PostgreSQL                   | Easier to inspect and visualize data.                         |

:::note
Starting in 8.9-alpha3, H2 is the default secondary storage for lightweight Camunda 8 Run setups and quickstarts. H2 remains suitable for local testing, demos, and file-based setups, but it is not recommended for production workloads where persistence, scaling, and full analytics are required.

For production use, Operate and Tasklist should run against a persistent secondary storage backend such as a supported RDBMS or Elasticsearch. Consult the [RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md) when choosing a relational database.
:::

:::note
Switching the secondary storage type (for example H2 ⇄ Elasticsearch) in alpha3 does not preserve existing data. The system starts with a fresh secondary store. Also note Operate v2 has limited functionality in 8.9-alpha3 when running against H2. Full Operate support is planned for a later alpha.
:::

## Run without secondary storage

If you want to run the Zeebe engine without secondary storage or web applications, you can use **no secondary storage** mode.

In this mode:

- Operate, Tasklist, Identity, Optimize, and the REST API are disabled.
- The Zeebe engine and primary storage remain active for process execution.
- This configuration is best suited for local development or minimal-resource environments.

See [run without secondary storage](./no-secondary-storage.md) for configuration examples and limitations.
