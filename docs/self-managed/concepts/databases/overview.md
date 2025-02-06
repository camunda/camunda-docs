---
id: overview
title: "Overview"
description: "An overview about possible databases"
---

To service applications like Operate, Tasklist and the Camunda REST API with data, Camunda 8 requires a database. This database stores data for all processes, processInstances, decisions, tasks, users etc.

Camunda 8 supports the following databases:

## Document based databases

TODO: Add more text about behavior and limitations?

Document based databases like ElasticSearch and OpenSearch

## Relational databases

TODO: Decide which minimal version is supported

Currently, the following relational databases are officially supported:

- PostgreSQL (17+)
- Oracle (23+)
- MariaDB (11.6+)
- H2 (2.3)

To use and configure an RDBMS as storage backend, follow the instructions in the [Configuration](./relational-db/configuration.md) section.

### Limitations

When using a relational database as storage backend, the following limitations apply:

#### Variables

[The Camunda REST API](./../../../../apis-tools/camunda-api-rest/camunda-api-rest-overview) allows to fetch and filter for [Variables](./../../../../apis-tools/camunda-api-rest/specifications/get-variable).
To keep the API performant, the following comparison operations are only applied on the first 4000 characters of a String or JSON variable value:

- equals
- notEquals
- in
- notIn

The LIKE operator is not affected by this limitation.
