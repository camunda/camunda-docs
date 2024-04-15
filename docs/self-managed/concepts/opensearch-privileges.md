---
id: opensearch-privileges
title: "OpenSearch privileges"
---

If you implement Camunda 8 with OpenSearch as a service provider, you must configure OpenSearch with the following [permissions](https://opensearch.org/docs/latest/security/access-control/permissions/) and [default-action-groups](https://opensearch.org/docs/latest/security/access-control/default-action-groups/) in mind:

Action groups are a set of permissions.
Permission have the `cluster|indices`: prefix all other are action groups.

## Cluster

- `cluster_monitor` - necessary for health check
- `cluster:admin/reindex/rethrottle` - necessary to archive and migrate indices
- `cluster_manage_pipelines` - necessary to migrate indices
- `manage_snapshots` - necessary to take backups
- `indices:admin/index_template/put` - necessary to create and manage index schema on start up and migration
- `indices:admin/index_template/get` - necessary to create and manage index schema on start up and migration
- `indices:admin/index_template/delete` - necessary to create and manage index schema on start up and migration
- `indices:data/read/scroll/clear` - necessary to search with paging
- `cluster_manage_templates` - necessary to create and manage index schema on start up
- `cluster_manage_index_templates` - necessary to create and manage index schema on start up

## Indices

- `data_access` - necessary to query and read
- `get` - necessary to read
- `delete` - necessary to create, archive and migrate data
- `create_index` - necessary to create index schema and archive
- `search` - necessary to query
- `manage` - necessary to create index schema, archive and migrate

## Index State Management

Add in the cluster section of permissions for using index state management (ISM):

- `cluster:admin/opendistro/ism/managedindex/add`
- `cluster:admin/opendistro/ism/managedindex/change`
- `cluster:admin/opendistro/ism/managedindex/remove`
- `cluster:admin/opendistro/ism/policy/write`
- `cluster:admin/opendistro/ism/policy/get`
- `cluster:admin/opendistro/ism/policy/delete`
