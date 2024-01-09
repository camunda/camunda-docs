---
id: update-zeebe
title: "Update Zeebe"
description: "This section describes how to update Zeebe to a new version."
---

## Update

See the [update guide](/self-managed/operational-guides/update-guide/introduction.md) for specific instructions per Zeebe version.

To update a Zeebe cluster, take the following steps:

1. Shut down all Zeebe brokers and other components of the system.
1. Take a [backup](./backups.md) of your Zeebe brokers and Elasticsearch `data` folder if used.
1. Update all Zeebe brokers and gateways to the new version.
1. Restart the system components.

## Partitions admin endpoint

This endpoint allows querying the status of the partitions and performing operations to prepare an update.

The endpoint is available under `http://{zeebe-broker}:{zeebe.broker.network.monitoringApi.port}/actuator/partitions` (default port: `9600`).

It is enabled by default. It can be disabled in the configuration by setting:

```
management.endpoint.partitions.enabled=false
```

### Query the partition status

The status of the partitions can be queried with a `GET` request:

```
/actuator/partitions
```

The response contains all partitions of the broker mapped to the partition-id.

<details>
  <summary>Full Response</summary>
  <p>

```
{
    "1":{
        "role":"LEADER",
        "snapshotId":"399-1-1601275126554-490-490",
        "processedPosition":490,
        "processedPositionInSnapshot":490,
        "streamProcessorPhase":"PROCESSING"
    }
}
```

  </p>
</details>
