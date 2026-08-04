---
id: modes
title: "Cluster mode"
description: "Switch an orchestration cluster between processing and recovery mode."
---

A cluster mode change transitions every broker of an orchestration cluster between processing mode and recovery mode. The mode determines whether the cluster's partitions process data or are deactivated so the cluster can be restored from a backup.

A mode change is a cluster configuration change, like [cluster scaling](cluster-scaling.md). The request is acknowledged as soon as the change is accepted, and the transition itself is applied asynchronously on each broker.

## Cluster modes

| Mode         | Behavior                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `PROCESSING` | The default broker operational mode.                                                                                            |
| `RECOVERING` | All partitions are deactivated. No processing takes place, and only a restricted set of read-only operations remains available. |

## What happens on a broker in recovery mode

In recovery mode there is no processing at all, and only a partial set of services is registered on the broker.

- **Partitions are deactivated.** Each local partition is registered as `inactive` and does not join its Raft group. No leader is elected, and no records are processed, replicated, or exported.
- **Only a partial set of services is registered.** Instead of the full partition installation, each broker starts a reduced set of services.

### What can be done in recovery mode

- Cluster state querying, topology requests
- Primary storage backup store querying
- Primary storage restore from a backup

## Change the cluster mode

Send a `PATCH` request to the `/mode` endpoint of the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode.api.mdx), available on the REST API port of the Orchestration Cluster (`8080` by default).

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

| Parameter | Required | Description                                                                                                           |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `mode`    | Yes      | The target mode, either `RECOVERING` or `PROCESSING`.                                                                 |
| `dryRun`  | No       | If `true`, the request is only validated and the resulting plan is returned without applying it. Defaults to `false`. |

### Response

A successful request returns `200` with the ID of the triggered cluster change and the ordered list of operations that will be applied.

Use `dryRun=true` to review this plan before applying it:

```bash
curl -X PATCH 'http://localhost:8080/v2/mode?mode=RECOVERING&dryRun=true' \
  -H 'Accept: application/json'
```

## Monitor the transition

The mode change request returns before the transition has completed, so track its progress after sending it.

Query the [cluster topology](/apis-tools/orchestration-cluster-api-rest/specifications/get-topology.api.mdx) to see the state of each broker's partitions:

```bash
curl 'http://localhost:8080/v2/topology'
```

While a broker is in recovery mode, its partitions report `role: inactive` and `state: recovering`. After the cluster returns to processing mode, partitions report `role: leader/follower` and `state: active`.

You can also query the cluster management API on the management port (`9600` by default) to follow the change by its ID:

```bash
curl 'http://localhost:9600/orchestration/actuator/cluster'
```

## Considerations

- Entering recovery mode stops all processing in the cluster. Plan the change as a maintenance operation, and expect client requests to fail while the cluster is recovering.
- Brokers that are already in the target mode are not included in the plan, so repeating a request that has already been applied results in an empty plan.
- Mode change is considered a cluster configuration change, meaning that only one operation can be in-flight. You can always cancel a cluster configuration change
