---
id: cluster-scaling
title: "Cluster scaling"
description: "Scale an existing cluster by adding or removing brokers."
---

:::warning
This is an experimental feature, and therefore we do not recommend using it in production.
:::

Zeebe allows scaling an existing cluster by adding or removing brokers. Partitions are automatically redistributed over the new set of brokers to spread the load evenly.

Zeebe provides a REST API to manage the cluster scaling. The cluster management API is a custom endpoint available via [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/3.1.x/reference/htmlsingle/#actuator.endpoints). This is accessible via the management port of the gateway.

## Configuration

- This is an experimental feature. To use the feature, set `ZEEBE_BROKER_EXPERIMENTAL_FEATURES_ENABLEDYNAMICCLUSTERTOPOLOGY` to `true`.

:::warning
Do not turn off this feature after the cluster is scaled. If you turn off the feature and restart the cluster without updating the configuration, the cluster will use the original configuration and this can result in data loss.
:::

## Scaling API

To scale up, start new brokers and use the scaling API below to add the new brokers to the cluster and distribute data to them.

:::warning
This endpoint does not respect the **fixed** partitioning scheme configured via `zeebe.broker.experimental.partitioning`. When this endpoint is used, the partitions are redistributed using ROUND_ROBIN strategy.
:::

### Request

```
POST actuator/cluster/brokers/
[
  <brokerId1>, <brokerId2>,..
]
```

The input is a list of _all_ broker ids that will be in the final cluster after scaling:

<details>
  <summary>Example request</summary>

```
curl --request POST 'http://localhost:9600/actuator/cluster/brokers' \
-H 'Content-Type: application/json' \
-d '["0", "1", "2", "3"]'
```

</details>

### Response

The response is a JSON object:

```
{
  changeId: <changeId>
  currentTopology: [...]
  plannedChanges: [...]
  expectedTopology: [...]
}
```

- `changeId`: Id of the changes initiated to scale the cluster. This can be used to monitor the progress of the scaling operation. The id typically increases so new requests get a higher id than the previous one.
- `currentTopology`: A list of current brokers and the partition distribution.
- `plannedChanges`: A sequence of operations that has to be executed to achieve scaling.
- `expectedToplogy`: The expected list of brokers and the partition distribution once the scaling is completed.

The scaling is executed asynchronously. Use the Query API below to monitor the progress.

## Query API

The current cluster topology and any ongoing scaling operations can be monitored via the query endpoint.

### Request

```
GET actuator/cluster
```

### Response

```
{
  version: <version>
  brokers: [...]
  change:  {}
}
```

- `version`: The version of current cluster topology. The version is updated when the cluster is scaled up or down.
- `brokers`: A list of current brokers and the partition distribution.
- `change`: The details about any ongoing scaling operations or the last completed scaling operation.

<details>
  <summary>Example response</summary>

```
{
  "version": 2,
  "brokers": [
    {
      "id": 1,
      "state": "ACTIVE",
      "version": 4,
      "lastUpdatedAt": "2023-11-03T16:57:16.479167471Z",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 2
        },
        ...
      ]
    },
    ...
  ],
  "change": {
    "id": 2,
    "status": "IN_PROGRESS",
    "completed": [
         {
        "operation": "BROKER_ADD",
        "brokerId": 4,
        "completedAt": "2023-11-03T16:53:09Z"
      },
      {
        "operation": "PARTITION_JOIN",
        "brokerId": 4,
        "partitionId": 5,
        "priority": 3,
        "completedAt": "2023-11-03T16:53:41Z"
      },
      ...
    ],
    "pending": [
      {
        "operation": "PARTITION_JOIN",
        "brokerId": 3,
        "partitionId": 3,
        "priority": 2
      },
      ...
    ]
  }
}

```

</details>

## Examples

### Scale up

To scale a cluster of size 3 to cluster of size 6, first start the new brokers. If you have deployed Zeebe in Kubernetes, you can use the command `kubectl scale statefulset` to start new brokers:

```
kubectl scale statefuleset <zeebe-statefulset> --replicas=6
```

The command above starts new brokers, but the new brokers are not part of the cluster yet. To actually scale the cluster, send the following request to the Zeebe cluster:

```
curl --request POST 'http://zeebe-gateway:9600/actuator/cluster/brokers' \
-H 'Content-Type: application/json' \
-d '["0", "1", "2", "3", "4", "5"]'
```

Here, `0`, `1`, and `2` are the existing brokers, and `3`, `4`, and `5` are the newly-added brokers.

You can then use the Query API to monitor the progress of scaling.

### Scale down

To scale down the cluster back to size `3`, first move all data from the to-be removed brokers:

```
curl --request POST 'http://zeebe-gateway:9600/actuator/cluster/brokers' \
-H 'Content-Type: application/json' \
-d '["0", "1", "2"]'
```

The above command moves all data to the given the brokers `0`, `1`, and `2`. Use the Query API to monitor the progress. Once the change is marked as COMPLETED, shut down the brokers. If you have deployed Zeebe in Kubernetes, you can run the following command to shut down brokers `3`, `4`, and `5`:

```
kubectl scale statefuleset <zeebe-statefulset> --replicas=3
```
