---
id: configuring-secondary-storage
sidebar_label: "Configure"
title: "Configure secondary storage"
description: "Learn how to configure secondary storage in Camunda Self-Managed environments using Helm, Docker, or manual deployment."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Configure secondary storage to enable features such as Operate, Tasklist, Identity, and search-based REST APIs in Camunda Self-Managed environments.

Use "secondary storage" as the general concept. The backend can be a supported RDBMS or a document-store backend such as Elasticsearch or OpenSearch, depending on your deployment requirements.

## Configuration options

You can configure secondary storage using Helm charts, Docker Compose, or manual configuration files.

Camunda uses the `data.secondary-storage` configuration to define which secondary storage backend supports Orchestration Cluster web applications and APIs (for example, Operate, Tasklist, Identity, and search endpoints).

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

When deploying with Helm, set the secondary storage type, connection details, and exporter settings in your `values.yaml` file.

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

If you choose Elasticsearch as the secondary storage backend, configure it as follows:

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

More information about Elasticsearch in the Camunda Helm chart can be found on this [configuration page](/self-managed/deployment/helm/configure/database/elasticsearch/using-external-elasticsearch.md).

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

If you choose Elasticsearch as the secondary storage backend:

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

If you choose Elasticsearch as the secondary storage backend:

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

- Local testing or Camunda 8 Run quickstart: H2 is fast, lightweight, and runs entirely in memory or file-based.
- Production workloads: Use a supported RDBMS or document-store backend. Choose based on operational needs and validate with [benchmarking and sizing guidance](/components/best-practices/architecture/sizing-your-environment.md).
- Debugging and troubleshooting: H2 or PostgreSQL are often easier to inspect and visualize.

:::note
Starting in 8.9, H2 is the default secondary storage for lightweight Camunda 8 Run setups and quickstarts. H2 remains suitable for local testing, demos, and file-based setups, but it is not recommended for production workloads where persistence, scaling, and full analytics are required.

For production use, Orchestration Cluster applications and APIs (including Operate, Tasklist, Identity, and search endpoints) should run against a persistent secondary storage backend such as a supported RDBMS or a document-store backend (Elasticsearch/OpenSearch). Both are valid production choices when supported for your deployment. Consult the [RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md) when choosing a relational database, and [supported environments](/reference/supported-environments.md) for Elasticsearch/OpenSearch versions.
:::

:::note
Switching between secondary storage backend families (document-store and RDBMS) is not a supported in-place migration path. Plan migration as a fresh secondary-store setup, and validate the procedure in a non-production environment before rollout. For upgrade planning, see [prepare for upgrade](/self-managed/upgrade/prepare-for-upgrade.md).
:::

## Run without secondary storage

If you want to run the Zeebe engine without secondary storage or web applications, you can use **no secondary storage** mode.

In this mode:

- Operate, Tasklist, Identity, Optimize, and the REST API are disabled.
- The Zeebe engine and primary storage remain active for process execution.
- This configuration is best suited for local development or minimal-resource environments.

See [run without secondary storage](./no-secondary-storage.md) for configuration examples and limitations.
