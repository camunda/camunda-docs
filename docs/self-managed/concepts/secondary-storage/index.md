---
id: index
title: "Secondary storage"
description: "Learn how secondary storage works in Camunda Self-Managed environments, how it interacts with the Zeebe engine, and how to configure or manage it effectively."
---

import DataFlowImg from '../img/diagram-secondary-storage-data-flow.png';

Camunda uses a layered storage model that separates workflow execution data from data used by web applications and APIs.

## About secondary storage

Secondary storage is one of the two complementary layers in Camunda’s data model:

| Layer             | Purpose                                                                                                                           | Technologies you can use                                                         |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| Primary storage   | Persists real-time workflow execution state managed by [Zeebe](/self-managed/components/orchestration-cluster/zeebe/overview.md). | RocksDB (embedded in Zeebe)                                                      |
| Secondary storage | Stores workflow, decision, and task data for querying, visualization, and API access.                                             | Elasticsearch/OpenSearch, RDBMS (including H2 and external relational databases) |

:::note
Secondary storage is not a duplicate of primary data. It represents exported workflow and decision data optimized for querying and visualization.
:::

### Supported storage options

Camunda supports multiple secondary storage backends.  
For the latest list of supported database versions, see the  
[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).

| Database type            | Availability         | Use case                                                                                                                                                                                          |
| :----------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Elasticsearch/OpenSearch | General availability | Secondary storage for indexing, search, and analytics.                                                                                                                                            |
| RDBMS                    | 8.9-alpha1+          | Secondary storage for relational database deployments. See the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md) for supported vendors and versions. |

:::info OpenSearch support
Camunda 8 supports both [Amazon OpenSearch](https://aws.amazon.com/opensearch-service) and the open-source [OpenSearch](https://opensearch.org/) distribution.
:::

### Data flow

The following diagram shows how secondary storage fits into the Camunda data flow.

<img src={DataFlowImg} alt="Camunda data flow showing secondary storage" class="img-noborder img-transparent"/>

1. The Zeebe broker executes workflow instances and stores state in primary storage.
1. The exporter, part of Zeebe, streams workflow and task data to secondary storage.
1. Applications such as Operate, Tasklist, and the REST API read data from secondary storage.

## Choosing a secondary storage backend

Camunda supports multiple secondary storage backends, and the right choice depends on your workload and operational constraints.

For guidance on supported vendors, versions, and configuration, see:

- [Elasticsearch and OpenSearch](/self-managed/components/orchestration-cluster/core-settings/concepts/elasticsearch-and-opensearch.md)
- [RDBMS configuration](/self-managed/deployment/helm/configure/database/rdbms.md)
- [RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)

:::note
The documentation is intentionally descriptive rather than prescriptive. Use benchmarking and sizing based on your own workload to choose the secondary storage backend that best meets your requirements.
:::

Learn how to configure secondary storage in Self-Managed environments using Helm, Docker, or manual deployment.

<p><a href="./configuring-secondary-storage" class="link-arrow">Configure secondary storage</a></p>

:::note
Although you should use secondary storage in nearly all production environments, you can choose to disable secondary storage in limited scenarios, such as lightweight development environments, specialized technical use cases, or resource-constrained deployments. See [run without secondary storage](no-secondary-storage.md).
:::

## Manage secondary storage

Learn about best practices for data management, backups, and monitoring to ensure data integrity and performance.

Effective secondary storage management ensures stability, scalability, and data integrity across your Camunda environment. By following Camunda best practices, you can avoid data corruption, maintain compliance, and ensure your orchestration environment remains performant and reliable.

<p><a href="./managing-secondary-storage" class="link-arrow">Manage secondary storage</a></p>
