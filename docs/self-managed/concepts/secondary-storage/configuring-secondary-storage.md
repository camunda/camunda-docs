---
id: configuring-secondary-storage
sidebar_label: "Configure"
title: "Configure secondary storage"
description: "Learn how to configure secondary storage in Camunda Self-Managed environments using Helm, Docker, or manual deployment."
---

Configure secondary storage to enable features such as Operate, Tasklist, Identity, and search-based REST APIs in Camunda Self-Managed environments.

Camunda uses the `data.secondary-storage` configuration to define which database backend supports advanced web applications and APIs.  
This section explains how to configure secondary storage through different deployment methods and how to disable it when running the Zeebe engine alone.

## Configuration options

You can configure secondary storage using **Helm charts**, **Docker Compose**, or **manual configuration files**.

### Helm

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

You can switch to Elasticsearch by using:

```yaml
data:
  secondary-storage:
    type: elasticsearch
    elasticsearch:
      url: http://elasticsearch:9200/
```

To explicitly disable secondary storage (for example, when running only the Zeebe engine), you can set:

```yaml
global:
  noSecondaryStorage: true
```

When this flag is set, all secondary-storage-dependent components are automatically disabled.

### Docker Compose

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
  - CAMUNDA_DATA_SECONDSTORAGE_TYPE=elasticsearch
  - CAMUNDA_DATA_SECONDSTORAGE_ELASTICSEARCH_URL=http://elasticsearch:9200
```

To disable secondary storage:

```yaml
environment:
  - CAMUNDA_DATA_SECONDARYSTORAGE_TYPE=none
```

### Manual configuration (application.yaml)

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

## Choosing a storage backend

| Scenario                                  | Recommended backend              | Reason                                                        |
| ----------------------------------------- | -------------------------------- | ------------------------------------------------------------- |
| Local testing or Camunda 8 Run quickstart | H2                               | Fast, lightweight, and runs entirely in memory or file-based. |
| Production workloads                      | Elasticsearch or supported RDBMS | Scalable and persistent; designed for concurrent queries.     |
| Debugging and troubleshooting             | H2 or PostgreSQL                 | Easier to inspect and visualize data.                         |

:::note
Camunda 8 Run uses H2 for **testing and development only**.  
Operate and Tasklist require full RDBMS or Elasticsearch support in later versions.
:::

## Running without secondary storage

If you want to run the Zeebe engine without secondary storage or web applications, use **no secondary storage mode**.

In this mode:

- Operate, Tasklist, Identity, Optimize, and the REST API are disabled.
- The Zeebe engine and primary storage remain active for process execution.
- This configuration is best suited for local development or minimal-resource environments.

See [Run without secondary storage](./no-secondary-storage.md) for configuration examples and limitations.

## Next steps

- [Run without secondary storage](./no-secondary-storage.md)  
  Configure Zeebe to run without secondary storage and understand the components that are disabled in this mode.
- [Manage secondary storage data](./managing-secondary-storage.md)  
  Learn best practices for maintaining data integrity, configuring replicas, and performing backups.
