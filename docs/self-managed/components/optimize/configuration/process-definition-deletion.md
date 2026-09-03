---
id: process-definition-deletion
title: "Process definition data deletion"
description: "Configure Optimize to process asynchronous process definition data deletion requests."
---

Optimize processes [process definition data deletion](/apis-tools/optimize-api/delete-process-definition-data.md) requests asynchronously, using a persisted job registry and a background dispatcher.

## Job registry dispatcher

The dispatcher polls the job registry for queued deletion requests and executes them in the background.

The dispatcher is disabled by default. Enable it on only one Optimize instance per cluster. Enabling it on more than one instance can lead to race conditions, such as the same job running more than once.

See the [job registry dispatcher settings](./system-configuration.md#job-registry-dispatcher-settings) for the available configuration.

## Deleted process definition cache

As long as a process definition deletion job record exists in the job registry, Optimize suppresses reimporting data for that process definition.
To minimize the impact of the suppression check on the import path and on Elasticsearch/OpenSearch, the suppression is backed by a cache of the most recently deleted process definition IDs, sized by `caches.deletedProcessDefinitions.maxSize`.

If more process definitions have pending or completed deletions than fit in this cache, the oldest ones fall out of suppression and their data can be reimported.

See the [deleted process definition cache settings](./system-configuration.md#deleted-process-definition-cache-settings) for the available configuration.
