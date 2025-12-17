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

When deploying with Helm, set the secondary storage type and connection details in your `values.yaml` file:

```yaml
data:
  secondary-storage:
    type: rdbms
    rdbms:
      url: jdbc:h2:mem:camunda
      username: sa
      password:
```

To configure Elasticsearch instead:

```yaml
data:
  secondary-storage:
    type: elasticsearch
    elasticsearch:
      url: http://elasticsearch:9200/
```

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
H2 is suitable for testing and local development only.  
For production use, Operate and Tasklist require a persistent secondary storage backend such as a supported RDBMS or Elasticsearch.  
Consult the [RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md) when choosing a relational database.
:::

## Run without secondary storage

If you want to run the Zeebe engine without secondary storage or web applications, you can use **no secondary storage** mode.

In this mode:

- Operate, Tasklist, Identity, Optimize, and the REST API are disabled.
- The Zeebe engine and primary storage remain active for process execution.
- This configuration is best suited for local development or minimal-resource environments.

See [run without secondary storage](./no-secondary-storage.md) for configuration examples and limitations.
