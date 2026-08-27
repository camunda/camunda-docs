---
id: cluster-scaling
title: "Cluster scaling"
description: "Scale an existing cluster by adding or removing brokers."
---

Zeebe allows scaling an existing cluster by adding or removing brokers and by adding new partitions. Partitions are automatically redistributed over the set of brokers to spread the load evenly.

Zeebe provides a REST API to manage the cluster scaling. The cluster management API is a custom endpoint available via [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/3.1.x/reference/htmlsingle/#actuator.endpoints). This is accessible via the management port of the Zeebe Gateway.

:::important

- Partition count can only be increased and not decreased.
- Backups are disallowed during partition scaling but can be taken before or after. A backup taken before scaling can only be restored to a cluster with the same partition count. After restoring, you can request scaling again to the desired partition count.
- When scaling up the number of partitions, consider the resulting RocksDB size per partition. Allocate **at least 32 MB of RocksDB memory per partition** after scaling. For details, see the [resource planning guide](/components/best-practices/architecture/sizing-self-managed.md).
  :::

## Broker id naming scheme

How brokers are identified and scaled depends on whether the cluster is [zone-aware](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md). By default a cluster is **not zone-aware**.

- **Non-zone-aware** clusters use **integer** broker ids: (`0`, `1`, `2`, ...). They are used as examples in this page.
- **Zone-aware** clusters use **string** broker ids: `${zone}_${n}` (for example, `"zone-a_0"` with double quotes).

## Considerations

- Scaling operations occur while the cluster remains online. During scaling, data is redistributed and new leaders are elected for affected partitions.
- Existing partitions continue processing data, but you may notice temporary performance impacts until scaling completes. Plan scaling ahead of anticipated load increases to minimize disruption.
- When adding new partitions or brokers, partitions are redistributed across both old and new brokers. Depending on the number of brokers and partitions, this may increase the load per broker. Use the API endpoints in [dry run](#dry-run) mode to preview partition distribution.
- Always take a backup before scaling to ensure you can restore if needed.
- Scaling is a planned configuration change. The cluster rejects a new configuration change while another one is still running.
- A dynamic scaling operation does not require a rolling restart. Static configuration changes, such as adding a Physical Tenant, still follow the [provisioning and lifecycle](/self-managed/concepts/physical-tenants/provisioning-and-lifecycle.md) restart procedure.
- Gateway replicas are scaled separately from brokers and partitions. In Helm deployments, adjust `zeebe-gateway.replicas`. Gateway scaling changes shared request capacity but does not change partition placement.

## Scale a cluster with multiple Physical Tenants

<span class="badge badge--platform">Self-Managed only</span>

In a cluster running multiple [Physical Tenants](/self-managed/concepts/physical-tenants/index.md), each tenant owns its own partition group, while brokers, gateways, and the replication factor are shared. Which scaling dimension you change therefore determines whether the operation is tenant-scoped or cluster-wide.

| Dimension                          | Scope        | How to target it                                                                                    |
| ---------------------------------- | ------------ | --------------------------------------------------------------------------------------------------- |
| Partition count                    | Per tenant   | `PATCH /actuator/cluster?physicalTenant={physicalTenantId}`                                         |
| Broker count                       | Cluster-wide | `PATCH /actuator/cluster` or `POST /actuator/cluster/brokers`, without a `physicalTenant` parameter |
| Replication factor                 | Cluster-wide | `PATCH /actuator/cluster`, without a `physicalTenant` parameter                                     |
| Partition join, leave, or priority | Per tenant   | `POST` or `DELETE /actuator/cluster/brokers/{brokerId}/partitions/{partitionId}?physicalTenant=`    |
| Routing state                      | Per tenant   | `PATCH /actuator/cluster/routing-state?physicalTenant={physicalTenantId}`                           |
| Purge                              | Both         | `POST /actuator/cluster/purge`, optionally scoped with `?physicalTenant={physicalTenantId}`         |

Partition ids restart at `1` in every Physical Tenant, so a partition is only identified by its id together with its tenant.

### Scale the partitions of a single Physical Tenant

Send the partition count change with the `physicalTenant` query parameter. Only the named tenant's partition group gains partitions, and every other tenant is left untouched:

```
curl -X 'PATCH' \
   'http://localhost:9600/orchestration/actuator/cluster?physicalTenant=tenant-a' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{ "partitions": { "count": 6 } }'
```

Requests that combine `physicalTenant` with a broker change or a replication factor change are rejected with `400`, because neither dimension has a tenant to scope it to. An unknown `physicalTenant` is rejected with `404`.

:::note
A partition count change sent **without** the `physicalTenant` parameter targets the default Physical Tenant only. Read operations behave differently: `GET /actuator/cluster` without the parameter reports every Physical Tenant. Always pass `physicalTenant` explicitly when you intend to scale a non-default tenant.
:::

### Verify a tenant-scoped scaling operation

Monitor the change with the [monitoring API](#monitoring-api) or `GET /actuator/cluster/changes`, then confirm the result through topology:

```
curl "http://localhost:8080/physical-tenants/tenant-a/v2/topology"
curl "http://localhost:8080/cluster/v2/topology"
```

Confirm that every expected partition has a leader, that the targeted tenant's partition count matches the requested value, and that the other tenants retain their previous partition counts. Cluster-wide topology requires [cluster admin](/components/admin/cluster-admin.md) access.

Because brokers and gateways are shared, a scaling operation for one tenant changes the capacity available to all of them. Compare tenant-scoped and cluster-wide partition, latency, and storage metrics against your pre-scaling baseline before returning the cluster to normal traffic.

## Scale up brokers

The following shows how to scale up a Zeebe cluster using an example of scaling from cluster size 3 to cluster size 6. The target partition count is 6.

This example assumes the cluster was deployed with the following configurations, depending on what we want to scale:

#### Initial State

- scale brokers only:
  - clusterSize 3
  - partitionCount 6
- scale brokers and partitions:
  - clusterSize 3
  - partitionCount 3

#### Target state

- clusterSize 6
- partitionCount 6

### 1. Start new brokers

If you have deployed Zeebe using [Helm](/self-managed/deployment/helm/install/quick-install.md), you can start new brokers by using the `kubectl scale` command. Otherwise, refer to the corresponding installation methods on how to start a new broker.

```
kubectl scale statefulset camunda --replicas=6
```

You can see new pods being created when running `kubectl get pods`. The new brokers will be assigned ids `3`, `4`, and `5` respectively.

```
camunda-zeebe-0                                        1/1     Running    0          3m24s
camunda-zeebe-1                                        1/1     Running    0          3m24s
camunda-zeebe-2                                        1/1     Running    0          3m24s
camunda-zeebe-3                                        0/1     Init:0/1   0          11s
camunda-zeebe-4                                        0/1     Init:0/1   0          11s
camunda-zeebe-5                                        0/1     Init:0/1   0          11s
```

:::info Starting brokers in a zone-aware cluster
On a [zone-aware cluster](#broker-id-naming-scheme), each zone is a separate StatefulSet, so you need to scale brokers in each zone.

:::

### 2. Send scale request to the Zeebe Gateway

Send a POST request to the Zeebe Gateway's management endpoint to add new brokers to the cluster or redistribute partitions. See the [API reference](#api-reference) for details.

If you are running on Kubernetes and haven’t set up Ingress, port-forward to access the Zeebe Gateway on your local machine:

```
kubectl port-forward svc/camunda-zeebe-gateway 9600:9600
```

Choose the appropriate request depending on whether you are adding new partitions (see section 2.a or 2.b).

Verify partition distribution after scaling by calling the endpoints in [dry run](#dry-run) mode.

#### 2.a Scale brokers only

Run the following to send the request to the Zeebe Gateway:

```
curl -X 'PATCH' \
   'http://localhost:9600/orchestration/actuator/cluster' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "brokers": {
          "add": [3,4,5]
        }
      }'
```

Here `3`, `4`, and `5` are the newly-added brokers.

:::note Zone aware clusters
Make sure to use the correct [broker ids](#broker-id-naming-scheme), for example `["zone-a_3", "zone-a_4", "zone-a_5"]`

Brokers from different zones can be added with a single request. Make sure to scale each zone's statefulsets with the required replica count beforehand.
:::

#### 2.b Scaling brokers and partitions

Run the following to send the request to the Zeebe Gateway to add 3 new brokers to the cluster and set the number of partition to 6.

```
curl -X 'PATCH' \
   'http://localhost:9600/orchestration/actuator/cluster' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "brokers": {
          "add": [3,4,5]
        },
        "partitions": {
          "count": 6,
          "replicationFactor": 3
        }
      }'
```

For [zone-aware cluster](#broker-id-naming-scheme) you need to change the broker ids accordingly as outlined in [section 2.a](#2a-scale-brokers-only)

:::warning Changing replication factor in a zone-aware cluster
You cannot change replication factor in a zone-aware cluster with this API. You need to use `PUT /actuator/cluster/partition-distribution/` instead.
:::

#### 2.c Scaling only partitions

If you don't intend to add new brokers to the cluster, you can skip the `"brokers"` section:

```
curl -X 'PATCH' \
   'http://localhost:9600/orchestration/actuator/cluster' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "partitions": {
          "count": 6,
          "replicationFactor": 3
        }
      }'
```

You can omit `replicationFactor` if you don't want to change it.

The response includes a `changeId`, `currentTopology`, planned changes, and the expected topology, as shown below:

```
{
  "changeId": 2,
  "currentTopology": [
    ...<truncated>
  ],
  "plannedChanges": [
    {
      "operation": "BROKER_ADD",
      "brokerId": 3
    },
    {
      "operation": "BROKER_ADD",
      "brokerId": 4
    },
    {
      "operation": "BROKER_ADD",
      "brokerId": 5
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 4,
      "partitionId": 5,
      "priority": 3
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 1,
      "partitionId": 5
    },
    ...<truncated>
  ],
  "expectedTopology": [
    {
      "id": 1,
      "state": "ACTIVE",
      "version": 7,
      "lastUpdatedAt": "2023-12-22T13:37:43.403615966Z",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 1
        }
      ]
    },
    ...<truncated>
  ]
}

```

### 3. Query the Zeebe Gateway to monitor progress of scaling

The scaling operation can take a while because data needs to be moved to the newly-added brokers. Therefore, you have to monitor the status by querying Zeebe and sending the following GET request to the Zeebe Gateway:

```
curl --request GET 'http://localhost:9600/orchestration/actuator/cluster'
```

When the scaling has completed, the `changeId` from the previous response will be marked as completed:

```
{
  "version": 3,
  "brokers": [
    ...
  ],
  "lastChange": {
    "id": 2,
    "status": "COMPLETED",
    "startedAt": "2023-12-22T13:37:43.405094261Z",
    "completedAt": "2023-12-22T13:40:06.90159187Z"
  }
}
```

### 4. (Optional) Verify the partitions are distributed to new brokers

This step is optional, but it is useful when you are testing to see if scaling works as expected.

Port-forward to access the Zeebe Gateway if required:

```
kubectl port-forward svc/camunda-gateway 8080:8080
```

Run the following command to see the current status of the cluster.

If security is enabled, first obtain an access token from your identity provider and export it as `ACCESS_TOKEN`, then include it as a Bearer token in the request header.

```
curl -L 'http://localhost:8080/orchestration/v2/topology' \
-H 'Accept: application/json'
```

The response would show that partitions are distributed to new brokers:

<details>
  <summary>Example response</summary>

```json
{
  "brokers": [
    {
      "nodeId": 0,
      "host": "camunda-zeebe-0.camunda-zeebe",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 5,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 6,
          "role": "follower",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    },
    {
      "nodeId": 1,
      "host": "camunda-zeebe-1.camunda-zeebe",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 2,
          "role": "leader",
          "health": "healthy"
        },
        {
          "partitionId": 6,
          "role": "leader",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    },
    {
      "nodeId": 2,
      "host": "camunda-zeebe-2.camunda-zeebe",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 2,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 3,
          "role": "leader",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    },
    {
      "nodeId": 3,
      "host": "camunda-zeebe-3.camunda-zeebe",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 2,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 3,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 4,
          "role": "leader",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    },
    {
      "nodeId": 4,
      "host": "camunda-zeebe-4.camunda-zeebe",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 3,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 4,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 5,
          "role": "leader",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    },
    {
      "nodeId": 5,
      "host": "camunda-zeebe-5.camunda-zeebe",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 4,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 5,
          "role": "follower",
          "health": "healthy"
        },
        {
          "partitionId": 6,
          "role": "follower",
          "health": "healthy"
        }
      ],
      "version": "8.8.0"
    }
  ],
  "clusterSize": 6,
  "partitionsCount": 6,
  "replicationFactor": 3,
  "gatewayVersion": "8.8.0",
  "clusterId": "clusterId"
}
```

</details>

## Scale down

We will explain how to scale down a Zeebe cluster via an example of scaling from cluster size 6 to cluster size 3. We assume the cluster is running with 6 brokers.

:::warning
Scale down can be performed only on brokers, partition count cannot be decreased
:::

### 1. Send the scale request to the Zeebe Gateway

Now we should tell Zeebe to move partitions away from the brokers that will be removed. For that, we send a POST request to the Zeebe Gateway's management endpoint. See [API reference](#api-reference) for more details.

If you haven't set up Ingress, you can first port-forward to access the Zeebe Gateway in your local machine:

```
kubectl port-forward svc/camunda-zeebe-gateway 9600:9600
```

```
curl -X 'PATCH' \
   'http://localhost:9600/orchestration/actuator/cluster' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "brokers": {
          "remove": [3,4,5]
        }
      }'
```

Similar to scaling up, the response to this request would contain a `changeId`, `currentTopology`, planned changes, and expected topology.

:::warning scaling down a zone-aware cluster
For a zone-aware cluster, the same [changes](#2a-scale-brokers-only) as for scaling up are required.
:::

### 2. Query the Zeebe Gateway to monitor progress of scaling

```
curl --request GET 'http://localhost:9600/orchestration/actuator/cluster'
```

When the scaling has completed, the changeId from the previous response will be marked as completed:

```
{
  "version": 5,
  "brokers": [
    ...<truncated>
  ],
  "lastChange": {
    "id": 4,
    "status": "COMPLETED",
    "startedAt": "2023-12-22T13:43:05.936882692Z",
    "completedAt": "2023-12-22T13:43:41.138424552Z"
  }
}
```

### 3. (Optional) Verify partitions have been moved to the remaining brokers

This step is optional, but it is useful when you are testing to see if scaling worked as expected.

Run the following command to see the current status of the cluster.

If security is enabled, first obtain an access token from your identity provider and export it as `ACCESS_TOKEN`, then include it as a Bearer token in the request header.

```
curl -L 'http://localhost:8080/orchestration/v2/topology' \
-H 'Accept: application/json'
```

The response would show that the partitions are moved away from brokers `3`, `4`, and `5`:

<details>
  <summary>Example response</summary>

```json
{
   "brokers": [{
         "nodeId": 0,
         "host": "camunda-zeebe-0.camunda-zeebe.camunda",
         "port": 26501,
         "partitions": [{
               "partitionId": 1,
               "role": "leader",
               "health": "healthy"
            },
            {
               "partitionId": 2,
               "role": "follower",
               "health": "healthy"
            },
            {
               "partitionId": 3,
               "role": "follower",
               "health": "healthy"
            },
            {
               "partitionId": 4,
               "role": "leader",
               "health": "healthy"
            } {
               "partitionId": 5,
               "role": "follower",
               "health": "healthy"
            },
            {
               "partitionId": 6,
               "role": "follower",
               "health": "healthy"
            }
         ],
         "version": "8.8.0"
      },
      {
         "nodeId": 1,
         "host": "camunda-zeebe-1.camunda-zeebe.camunda",
         "port": 26501,
         "partitions": [{
               "partitionId": 1,
               "role": "follower",
               "health": "healthy"
            },
            {
               "partitionId": 2,
               "role": "leader",
               "health": "healthy"
            },
            {
               "partitionId": 3,
               "role": "follower",
               "health": "healthy"
            },
            {
               "partitionId": 4,
               "role": "follower",
               "health": "healthy"
            },
            {
               "partitionId": 5,
               "role": "leader",
               "health": "healthy"
            },
            {
               "partitionId": 6,
               "role": "leader",
               "health": "healthy"
            }
         ],
         "version": "8.8.0"
      },
      {
         "nodeId": 2,
         "host": "camunda-zeebe-2.camunda-zeebe",
         "port": 26501,
         "partitions": [{
               "partitionId": 1,
               "role": "follower",
               "health": "healthy"
            },
            {
               "partitionId": 2,
               "role": "follower",
               "health": "healthy"
            },
            {
               "partitionId": 3,
               "role": "leader",
               "health": "healthy"
            },
            {
               "partitionId": 4,
               "role": "follower",
               "health": "healthy"
            },
            {
               "partitionId": 5,
               "role": "follower",
               "health": "healthy"
            },
            {
               "partitionId": 6,
               "role": "follower",
               "health": "healthy"
            }
         ],
         "version": "8.8.0"
      },
      {
         "nodeId": 3,
         "host": "camunda-zeebe-3.camunda-zeebe",
         "port": 26501,
         "partitions": [],
         "version": "8.8.0"
      },
      {
         "nodeId": 4,
         "host": "camunda-zeebe-4.camunda-zeebe",
         "port": 26501,
         "partitions": [],
         "version": "8.8.0"
      },
      {
         "nodeId": 5,
         "host": "camunda-zeebe-5.camunda-zeebe",
         "port": 26501,
         "partitions": [],
         "version": "8.8.0"
      }
   ],
   "clusterSize": 3,
   "partitionsCount": 6,
   "replicationFactor": 3,
   "gatewayVersion": "8.8.0",
   "clusterId": "clusterId"
}
```

</details>

### 4. Shut down the brokers when the scaling operation has completed

:::danger
If you shut down brokers before Zeebe has scaled down and moved all partitions away from the brokers, scaling operation would never complete and may result in data loss.
:::

```
kubectl scale statefulset <zeebe-statefulset> --replicas=3
```

When monitoring the pods via `kubectl get pods`, we can see that pods 3, 4, and 5 have been terminated.

```
camunda-zeebe-0                                        1/1     Running     0          9m55s
camunda-zeebe-1                                        1/1     Running     0          9m55s
camunda-zeebe-2                                        1/1     Running     0          9m50s

```

:::note
After scaling down the statefulset, you may have to delete the PVCs manually.
:::

#### Shut down brokers in a zone-aware cluster

On a zone-aware cluster, scale down the StatefulSet of the zone you scaled, once its scaling operation has completed:

```
kubectl scale statefulset <zone-a-statefulset> --replicas=3
```

## API reference

OpenAPI spec for this API can be found [here](https://github.com/camunda/camunda/blob/main/dist/src/main/resources/api/cluster/cluster-api.yaml).

### Reconfiguration API

This API lets you reconfigure a cluster by adding or removing brokers, adding partitions, or changing the `replicationFactor`. You can use this instead of the Scale API.

:::note
This endpoint does not respect the fixed partitioning scheme configured with `zeebe.broker.experimental.partitioning`. When used, partitions are redistributed using the `ROUND_ROBIN` strategy.
:::

#### Request

```
PATCH actuator/cluster
{
  brokers: {
    add: [<brokerIds>]
    remove: [<brokerIds>]
    count: <integer>
    zone: <string>
  }
  {
    partitions: {
      count: <integer>
      replicationFactor: <integer>
    }
  }
}

```

`zone` is only used on zone-aware clusters, together with `count`, to select which zone's broker count is changed. It must be omitted on non-zone-aware clusters. Broker ids in `add` and `remove` follow the [broker id naming scheme](#broker-id-naming-scheme).

The `physicalTenant` query parameter scopes `partitions.count` to a single [Physical Tenant](/self-managed/concepts/physical-tenants/index.md). See [scale a cluster with multiple Physical Tenants](#scale-a-cluster-with-multiple-physical-tenants).

<details>
  <summary>Example request</summary>

```
curl -X 'PATCH' \
   'http://localhost:9600/orchestration/actuator/cluster' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "brokers": {
          "add": [3,4,5]
        },
        "partitions": {
          "count": 6,
          "replicationFactor": 3
        }
      }'
```

</details>

##### Dry run

You can do a dry run without executing the reconfiguration by setting the `dryRun` request parameter to `true`. By default, `dryRun` is set to `false`.

##### Force

:::caution
This is a dangerous operation and must be used with caution. Incorrect use may result in split-brain scenarios or an unhealthy, unrecoverable cluster.
:::

Usually, changes can only be made when all brokers are up. If some brokers are unreachable, you can remove them from the cluster by setting the `force` request parameter to `true`.

This operation is mainly useful for [dual-region setups](/self-managed//concepts/multi-region/dual-region.md). For details, see the [dual-region operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md). Deviations from the process may make the cluster unusable.

:::note
Don’t send more than one `force` request at a time.
:::

Example request:

```
curl -X 'PATCH' \
   'http://localhost:9600/orchestration/actuator/cluster?force=true' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "brokers": {
          "remove": [0,2]
        }
      }'
```

This operation doesn’t redistribute the partitions from the removed brokers. The resulting cluster has fewer replicas for the affected partitions.

### Scale request API

:::note
See also the [Reconfiguration API](#reconfiguration-api).
:::

Use this endpoint to scale a cluster up or down by changing the cluster size and redistributing partitions.

:::note
This endpoint does not respect the fixed partitioning scheme configured with `zeebe.broker.experimental.partitioning`. When used, partitions are redistributed using the `ROUND_ROBIN` strategy.
:::

#### Request

```
POST actuator/cluster/brokers/
[
  <brokerId1>, <brokerId2>,..
]
```

The input is a list of _all_ broker ids that will be in the final cluster after scaling.

On zone-aware clusters, broker ids follow the [broker id naming scheme](#broker-id-naming-scheme).

<details>
  <summary>Example request</summary>

```
curl --request POST 'http://localhost:9600/orchestration/actuator/cluster/brokers' \
-H 'Content-Type: application/json' \
-d '[0, 1, 2, 3]'
```

</details>

##### Dry run

You can also do a dry run without actually executing the scaling by specifying the request parameter `dryRun` to `true` as follows. By default, `dryRun` is set to false:

```
curl --request POST 'http://localhost:9600/orchestration/actuator/cluster/brokers?dryRun=true' \
-H 'Content-Type: application/json' \
-d '[0, 1, 2, 3]'
```

##### Replication factor

The replication factor for all partitions can be changed with the `replicationFactor` request parameter. If not specified, the replication factor remains unchanged.

The new replicas are assigned to the brokers based on the round robin partition distribution strategy.

```
curl --request POST 'http://localhost:9600/orchestration/actuator/cluster/brokers?replicationFactor=4' \
-H 'Content-Type: application/json' \
-d '[0, 1, 2, 3]'
```

##### Force remove brokers

:::caution
This is a dangerous operation and must be used with caution. When not used correctly, split-brain scenarios or unhealthy, unrecoverable clusters may result.
:::

Usually, changes can only be made to a cluster when all brokers are up. When some brokers are unreachable, you may want to remove them from the cluster. You can force remove a set of brokers by setting the request parameter `force` to `true`.

This operation is mainly useful for [dual-region setups](/self-managed//concepts/multi-region/dual-region.md), and additional information can be found in the [dual-region operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md). Any deviations from the described process can result in the cluster being unusable.

:::note
Do not send more than one force request at a time.
:::

The following request force removes all brokers that are _not_ provided in the request body:

```
curl --request POST 'http://localhost:9600/orchestration/actuator/cluster/brokers?force=true' \
-H 'Content-Type: application/json' \
-d '[0, 1, 2]'
```

This operation does not re-distribute the partitions that were in the removed brokers. As a result, the resulting cluster will have a reduced number of replicas for the affected partitions.

#### Response

The response is a JSON object. See detailed specs [here](https://github.com/camunda/camunda/blob/main/dist/src/main/resources/api/cluster/cluster-api.yaml):

```
{
  changeId: <changeId>
  currentTopology: [...]
  plannedChanges: [...]
  expectedTopology: [...]
}
```

- `changeId`: The ID of the changes initiated to scale the cluster. This can be used to monitor the progress of the scaling operation. The ID typically increases so new requests get a higher ID than the previous one.
- `currentTopology`: A list of current brokers and the partition distribution.
- `plannedChanges`: A sequence of operations that has to be executed to achieve scaling.
- `expectedToplogy`: The expected list of brokers and the partition distribution once the scaling is completed.

<details>
  <summary>Example response</summary>

```
{
  "changeId": 2,
  "currentTopology": [
    {
      "id": 1,
      "state": "ACTIVE",
      "version": 0,
      "lastUpdatedAt": "-999999999-01-01T00:00:00+18:00",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 4,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 5,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 2
        }
      ]
    },
    {
      "id": 2,
      "state": "ACTIVE",
      "version": 0,
      "lastUpdatedAt": "-999999999-01-01T00:00:00+18:00",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 4,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 5,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 3
        }
      ]
    },
    {
      "id": 0,
      "state": "ACTIVE",
      "version": 0,
      "lastUpdatedAt": "-999999999-01-01T00:00:00+18:00",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 4,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 5,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 1
        }
      ]
    }
  ],
  "plannedChanges": [
    {
      "operation": "BROKER_ADD",
      "brokerId": 3
    },
    {
      "operation": "BROKER_ADD",
      "brokerId": 4
    },
    {
      "operation": "BROKER_ADD",
      "brokerId": 5
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 4,
      "partitionId": 5,
      "priority": 3
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 5,
      "partitionId": 5,
      "priority": 2
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 1,
      "partitionId": 5
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 2,
      "partitionId": 5
    },
    {
      "operation": "PARTITION_RECONFIGURE_PRIORITY",
      "brokerId": 0,
      "partitionId": 5,
      "priority": 1
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 3,
      "partitionId": 4,
      "priority": 3
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 4,
      "partitionId": 4,
      "priority": 2
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 5,
      "partitionId": 4,
      "priority": 1
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 1,
      "partitionId": 4
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 2,
      "partitionId": 4
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 0,
      "partitionId": 4
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 3,
      "partitionId": 2,
      "priority": 1
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 0,
      "partitionId": 2
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 3,
      "partitionId": 3,
      "priority": 2
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 4,
      "partitionId": 3,
      "priority": 1
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 1,
      "partitionId": 3
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 0,
      "partitionId": 3
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 5,
      "partitionId": 6,
      "priority": 3
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 2,
      "partitionId": 6
    },
    {
      "operation": "PARTITION_RECONFIGURE_PRIORITY",
      "brokerId": 1,
      "partitionId": 6,
      "priority": 1
    },
    {
      "operation": "PARTITION_RECONFIGURE_PRIORITY",
      "brokerId": 0,
      "partitionId": 6,
      "priority": 2
    }
  ],
  "expectedTopology": [
    {
      "id": 1,
      "state": "ACTIVE",
      "version": 7,
      "lastUpdatedAt": "2023-12-22T13:37:43.403615966Z",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 1
        }
      ]
    },
    {
      "id": 2,
      "state": "ACTIVE",
      "version": 6,
      "lastUpdatedAt": "2023-12-22T13:37:43.403558726Z",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 3
        }
      ]
    },
    {
      "id": 3,
      "state": "ACTIVE",
      "version": 8,
      "lastUpdatedAt": "2023-12-22T13:37:43.401971149Z",
      "partitions": [
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 4,
          "state": "ACTIVE",
          "priority": 3
        }
      ]
    },
    {
      "id": 4,
      "state": "ACTIVE",
      "version": 8,
      "lastUpdatedAt": "2023-12-22T13:37:43.40214448Z",
      "partitions": [
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 4,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 5,
          "state": "ACTIVE",
          "priority": 3
        }
      ]
    },
    {
      "id": 5,
      "state": "ACTIVE",
      "version": 8,
      "lastUpdatedAt": "2023-12-22T13:37:43.40345971Z",
      "partitions": [
        {
          "id": 4,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 5,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 3
        }
      ]
    },
    {
      "id": 0,
      "state": "ACTIVE",
      "version": 8,
      "lastUpdatedAt": "2023-12-22T13:37:43.403675185Z",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 5,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 2
        }
      ]
    }
  ]
}
```

</details>

The scaling is executed asynchronously. Use the Query API below to monitor the progress.

### Monitoring API

The current cluster topology and any ongoing scaling operations can be monitored via this endpoint.

#### Request

```
GET actuator/cluster
```

#### Response

The response is a JSON object. See detailed specs [here](https://github.com/camunda/camunda/blob/main/dist/src/main/resources/api/cluster/cluster-api.yaml):

```
{
  version: <version>
  brokers: [...]
  lastChange:  {}
  pendingChange: {}
}
```

- `version`: The version of current cluster topology. The version is updated when the cluster is scaled up or down.
- `brokers`: A list of current brokers and the partition distribution.
- `lastChange`: The details about the last completed scaling operation.
- `pendingChange`: The details about the ongoing scaling operation.

<details>
  <summary>Example response</summary>

```
{
  "version": 6,
  "brokers": [
    {
      "id": 1,
      "state": "ACTIVE",
      "version": 14,
      "lastUpdatedAt": "2023-12-22T13:43:29.718491365Z",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 4,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 5,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 2
        }
      ]
    },
    {
      "id": 2,
      "state": "ACTIVE",
      "version": 12,
      "lastUpdatedAt": "2023-12-22T13:43:30.951499449Z",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 4,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 5,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 3
        }
      ]
    },
    {
      "id": 0,
      "state": "ACTIVE",
      "version": 16,
      "lastUpdatedAt": "2023-12-22T13:43:28.482560705Z",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 1
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 4,
          "state": "ACTIVE",
          "priority": 3
        },
        {
          "id": 5,
          "state": "ACTIVE",
          "priority": 2
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 1
        }
      ]
    }
  ],
  "lastChange": {
    "id": 4,
    "status": "COMPLETED",
    "startedAt": "2023-12-22T13:43:05.936882692Z",
    "completedAt": "2023-12-22T13:43:41.138424552Z"
  },
  "pendingChange": {
    "id": 6,
    "status": "IN_PROGRESS",
    "completed": [],
    "pending": [
      {
        "operation": "BROKER_ADD",
        "brokerId": 3
      },
      {
        "operation": "PARTITION_JOIN",
        "brokerId": 3,
        "partitionId": 3,
        "priority": 2
      },
      {
        "operation": "PARTITION_LEAVE",
        "brokerId": 1,
        "partitionId": 3
      },
      {
        "operation": "PARTITION_RECONFIGURE_PRIORITY",
        "brokerId": 0,
        "partitionId": 3,
        "priority": 1
      },
      {
        "operation": "PARTITION_JOIN",
        "brokerId": 3,
        "partitionId": 6,
        "priority": 2
      },
      {
        "operation": "PARTITION_LEAVE",
        "brokerId": 0,
        "partitionId": 6
      },
      {
        "operation": "PARTITION_RECONFIGURE_PRIORITY",
        "brokerId": 1,
        "partitionId": 6,
        "priority": 3
      },
      {
        "operation": "PARTITION_RECONFIGURE_PRIORITY",
        "brokerId": 2,
        "partitionId": 6,
        "priority": 1
      },
      {
        "operation": "PARTITION_RECONFIGURE_PRIORITY",
        "brokerId": 1,
        "partitionId": 5,
        "priority": 1
      },
      {
        "operation": "PARTITION_RECONFIGURE_PRIORITY",
        "brokerId": 2,
        "partitionId": 5,
        "priority": 2
      },
      {
        "operation": "PARTITION_RECONFIGURE_PRIORITY",
        "brokerId": 0,
        "partitionId": 5,
        "priority": 3
      },
      {
        "operation": "PARTITION_JOIN",
        "brokerId": 3,
        "partitionId": 2,
        "priority": 1
      },
      {
        "operation": "PARTITION_LEAVE",
        "brokerId": 0,
        "partitionId": 2
      },
      {
        "operation": "PARTITION_JOIN",
        "brokerId": 3,
        "partitionId": 4,
        "priority": 3
      },
      {
        "operation": "PARTITION_LEAVE",
        "brokerId": 2,
        "partitionId": 4
      },
      {
        "operation": "PARTITION_RECONFIGURE_PRIORITY",
        "brokerId": 0,
        "partitionId": 4,
        "priority": 2
      }
    ]
  }
}

```

</details>
