---
id: modes
title: "Cluster mode"
description: "Switch an Orchestration Cluster between processing and recovery mode."
---

A cluster mode change transitions every broker in an Orchestration Cluster between processing and recovery mode. The selected mode determines whether the partitions process data or remain inactive while you restore the cluster from a backup.

A mode change is a cluster configuration change, similar to [cluster scaling](cluster-scaling.md). The API acknowledges the request when it accepts the change, and each broker applies the transition asynchronously.

## Cluster modes

| Mode         | Behavior                                                                                                                                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PROCESSING` | The default broker operational mode. Each broker installs the full set of partition services.                                                                                                                   |
| `RECOVERING` | Each local partition is registered as `inactive` and does not join its Raft group, so the cluster does not elect a leader, process, replicate, or export records. Each broker starts a reduced set of services. |

### Operations available in recovery mode

- Query the cluster state and topology.
- Query the primary storage backup store.
- Restore primary storage from a backup.

## Change the cluster mode

Send a `PATCH` request to the `/mode` endpoint of the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode.api.mdx). The endpoint uses the Orchestration Cluster REST API port, which is `8080` by default.

### Required authorizations

When authorization is enabled, changing the cluster mode requires one of the following permissions:

| Resource type | Permission |
| ------------- | ---------- |
| `SYSTEM`      | `UPDATE`   |
| `BACKUP`      | `RESTORE`  |

For how permissions are granted to users, clients, groups, and roles, see [available resources](/components/concepts/access-control/authorizations.md#available-resources).

### Send the mode change request

To enter recovery mode:

```bash
curl -X PATCH 'http://localhost:8080/v2/mode?mode=RECOVERING' \
  -H 'Accept: application/json'
```

To return to processing mode:

```bash
curl -X PATCH 'http://localhost:8080/v2/mode?mode=PROCESSING' \
  -H 'Accept: application/json'
```

### Request parameters

| Parameter | Required | Description                                                                                                       |
| --------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `mode`    | Yes      | The target mode, either `RECOVERING` or `PROCESSING`.                                                             |
| `dryRun`  | No       | If `true`, validates the request and returns the resulting plan without applying the change. Defaults to `false`. |

### Response

A successful request returns `200` with the ID of the triggered cluster change and the ordered list of operations that will be applied.

Use `dryRun=true` to review the change plan before applying it:

```bash
curl -X PATCH 'http://localhost:8080/v2/mode?mode=RECOVERING&dryRun=true' \
  -H 'Accept: application/json'
```

## Monitor the transition

The mode change request returns before the transition completes. Track the transition after you send the request.

Query the [cluster topology](/apis-tools/orchestration-cluster-api-rest/specifications/get-topology.api.mdx) to see the state of each broker's partitions:

```bash
curl 'http://localhost:8080/v2/topology'
```

While a broker is in recovery mode, its partitions report `role: inactive` and `state: recovering`. After the cluster returns to processing mode, each partition reports `role: leader` or `role: follower` and `state: active`.

You can also query the cluster management API on the management port (`9600` by default) to follow the change by its ID:

```bash
curl 'http://localhost:9600/orchestration/actuator/cluster'
```

## Cluster mode change considerations

- Entering recovery mode stops all processing in the cluster. Plan the change as a maintenance operation, and expect client requests to fail while the cluster is recovering.
- Brokers already in the target mode are not included in the plan. Repeating the same request after the change completes results in an empty plan.
- A mode change is a cluster configuration change, so only one cluster configuration operation can be in progress at a time. You can cancel an active cluster configuration change.
