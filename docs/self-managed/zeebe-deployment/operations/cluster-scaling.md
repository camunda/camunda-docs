---
id: cluster-scaling
title: "Cluster scaling"
description: "Scale an existing cluster by adding or removing brokers."
---

Zeebe allows scaling an existing cluster by adding or removing brokers and by adding new partitions. Partitions are automatically redistributed over the set of brokers to spread the load evenly.

Zeebe provides a REST API to manage the cluster scaling. The cluster management API is a custom endpoint available via [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/3.1.x/reference/htmlsingle/#actuator.endpoints). This is accessible via the management port of the gateway.

:::warning
Partition scaling is currently experimental, some functionalities may not work yet. Do not use on a production cluster.
:::

:::important
Partition count can only be increased and not decreased.
:::

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

If you have deployed Zeebe using [Helm](/self-managed/installation-methods/helm/install.md), you can start new brokers by using the `kubectl scale` command. Otherwise, refer to the corresponding installation methods on how to start a new broker.

```
kubectl scale statefulset zeebe-scaling-demo --replicas=6
```

You can see new pods being created when running `kubectl get pods`. The new brokers will be assigned ids `3`, `4`, and `5` respectively.

```
zeebe-scaling-demo-zeebe-0                                        1/1     Running    0          3m24s
zeebe-scaling-demo-zeebe-1                                        1/1     Running    0          3m24s
zeebe-scaling-demo-zeebe-2                                        1/1     Running    0          3m24s
zeebe-scaling-demo-zeebe-3                                        0/1     Init:0/1   0          11s
zeebe-scaling-demo-zeebe-4                                        0/1     Init:0/1   0          11s
zeebe-scaling-demo-zeebe-5                                        0/1     Init:0/1   0          11s
zeebe-scaling-demo-zeebe-gateway-b79b9cdbc-jvbjc                  1/1     Running    0          3m24s
zeebe-scaling-demo-zeebe-gateway-b79b9cdbc-pjgfd                  1/1     Running    0          3m24s
```

### 2. Send scale request to the Zeebe Gateway

Now we should tell Zeebe to re-distribute partitions to the new brokers. For that, send a POST request to the Zeebe Gateway's management endpoint. See [API reference](#api-reference) for more details.

If running on Kubernetes, and if you haven't set up Ingress, you can first port-forward to access the Zeebe Gateway in your local machine:

```
kubectl port-forward svc/camunda-zeebe-gateway 9600:9600
```

Depending on whether you want to add new partitions or not, send the appropriate requests to the gateway (section 2.a or 2.b)

#### 2.a Scale brokers only

Run the following to send the request to the Zeebe Gateway:

```
curl --request POST 'http://localhost:9600/actuator/cluster/brokers' \
-H 'Content-Type: application/json' \
-d '["0", "1", "2", "3", "4", "5"]'
```

Here, `0`, `1`, and `2` are the ids of initial brokers, and `3`, `4`, and `5` are the newly-added brokers.

The response to this request would contain a `changeId`, `currentTopology`, planned changes, and expected topology as shown below:

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

#### 2.b Scaling brokers and partitions

:::warning
Partition scaling is still an experimental feature, it is required to set `ZEEBE_BROKER_EXPERIMENTAL_FEATURES_ENABLEPARTITIONSCALING=true` to enable it.
:::

Run the following to send the request to the Zeebe Gateway to add 3 new brokers to the cluster and set the number of partition to 6.

```
curl -X 'PATCH' \
   'http://localhost:9600/actuator/cluster' \
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

If you don't intend to add new brokers to the cluster, you can skip the `"brokers"` section:

```
curl -X 'PATCH' \
   'http://localhost:9600/actuator/cluster' \
   -H 'accept: application/json' \
   -H 'Content-Type: application/json' \
   -d '{
        "partitions": {
          "count": 6,
          "replicationFactor": 3
        }
      }'
```

  <details>

    <summary> Example response</summary>

```json
{
  "changeId": 2,
  "currentTopology": [
    {
      "id": 1,
      "state": "ACTIVE",
      "version": 0,
      "lastUpdatedAt": "0001-01-01T00:00:00.000+0000",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 2,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 3,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 1,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "id": 2,
      "state": "ACTIVE",
      "version": 0,
      "lastUpdatedAt": "0001-01-01T00:00:00.000+0000",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 1,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 2,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 3,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "id": 0,
      "state": "ACTIVE",
      "version": 0,
      "lastUpdatedAt": "0001-01-01T00:00:00.000+0000",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 3,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 1,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 2,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        }
      ]
    }
  ],
  "plannedChanges": [
    {
      "operation": "BROKER_ADD",
      "brokerId": 3,
      "brokers": []
    },
    {
      "operation": "BROKER_ADD",
      "brokerId": 4,
      "brokers": []
    },
    {
      "operation": "BROKER_ADD",
      "brokerId": 5,
      "brokers": []
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 3,
      "partitionId": 2,
      "priority": 1,
      "brokers": []
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 0,
      "partitionId": 2,
      "brokers": []
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 3,
      "partitionId": 3,
      "priority": 2,
      "brokers": []
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 4,
      "partitionId": 3,
      "priority": 1,
      "brokers": []
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 1,
      "partitionId": 3,
      "brokers": []
    },
    {
      "operation": "PARTITION_LEAVE",
      "brokerId": 0,
      "partitionId": 3,
      "brokers": []
    },
    {
      "operation": "PARTITION_BOOTSTRAP",
      "brokerId": 3,
      "partitionId": 4,
      "priority": 3,
      "brokers": []
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 4,
      "partitionId": 4,
      "priority": 2,
      "brokers": []
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 5,
      "partitionId": 4,
      "priority": 1,
      "brokers": []
    },
    {
      "operation": "PARTITION_BOOTSTRAP",
      "brokerId": 4,
      "partitionId": 5,
      "priority": 3,
      "brokers": []
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 5,
      "partitionId": 5,
      "priority": 2,
      "brokers": []
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 0,
      "partitionId": 5,
      "priority": 1,
      "brokers": []
    },
    {
      "operation": "PARTITION_BOOTSTRAP",
      "brokerId": 5,
      "partitionId": 6,
      "priority": 3,
      "brokers": []
    },
    {
      "operation": "AWAIT_REDISTRIBUTION",
      "brokerId": 5,
      "brokers": []
    },
    {
      "operation": "AWAIT_RELOCATION",
      "brokerId": 5,
      "brokers": []
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 0,
      "partitionId": 6,
      "priority": 2,
      "brokers": []
    },
    {
      "operation": "PARTITION_JOIN",
      "brokerId": 1,
      "partitionId": 6,
      "priority": 1,
      "brokers": []
    }
  ],
  "expectedTopology": [
    {
      "id": 1,
      "state": "ACTIVE",
      "version": 4,
      "lastUpdatedAt": "2025-07-04T08:10:22.984+0000",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 2,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 3,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 1,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "id": 2,
      "state": "ACTIVE",
      "version": 0,
      "lastUpdatedAt": "0001-01-01T00:00:00.000+0000",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 1,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 2,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 3,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "id": 3,
      "state": "ACTIVE",
      "version": 8,
      "lastUpdatedAt": "2025-07-04T08:10:22.982+0000",
      "partitions": [
        {
          "id": 2,
          "state": "ACTIVE",
          "priority": 1,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 2,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 4,
          "state": "ACTIVE",
          "priority": 3,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "id": 4,
      "state": "ACTIVE",
      "version": 8,
      "lastUpdatedAt": "2025-07-04T08:10:22.983+0000",
      "partitions": [
        {
          "id": 3,
          "state": "ACTIVE",
          "priority": 1,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 4,
          "state": "ACTIVE",
          "priority": 2,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 5,
          "state": "ACTIVE",
          "priority": 3,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "id": 5,
      "state": "ACTIVE",
      "version": 8,
      "lastUpdatedAt": "2025-07-04T08:10:22.983+0000",
      "partitions": [
        {
          "id": 4,
          "state": "ACTIVE",
          "priority": 1,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 5,
          "state": "ACTIVE",
          "priority": 2,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 3,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "id": 0,
      "state": "ACTIVE",
      "version": 8,
      "lastUpdatedAt": "2025-07-04T08:10:22.984+0000",
      "partitions": [
        {
          "id": 1,
          "state": "ACTIVE",
          "priority": 3,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 5,
          "state": "ACTIVE",
          "priority": 1,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        },
        {
          "id": 6,
          "state": "ACTIVE",
          "priority": 2,
          "config": {
            "exporting": {
              "exporters": [
                {
                  "id": "CamundaExporter",
                  "state": "ENABLED"
                }
              ]
            }
          }
        }
      ]
    }
  ]
}
```

  </details>
### 3. Query the Zeebe Gateway to monitor progress of scaling

The scaling operation can take a while because data needs to be moved to the newly-added brokers. Therefore, you have to monitor the status by querying Zeebe and sending the following GET request to the Zeebe Gateway:

```
curl --request GET 'http://localhost:9600/actuator/cluster'
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
kubectl port-forward svc/camunda-zeebe-gateway 8080:8080
```

Run the following command to see the current status of the cluster:

```
curl -L 'http://localhost:8080/v2/topology' \
-H 'Accept: application/json'
```

The response would show that partitions are distributed to new brokers:

<details>
  <summary>Example response for broker scaling</summary>

```json
{
  "brokers": [
    {
      "nodeId": 0,
      "host": "zeebe-scaling-demo-zeebe-0.zeebe-scaling-demo-zeebe.zeebe-scaling-demo",
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
      "host": "zeebe-scaling-demo-zeebe-1.zeebe-scaling-demo-zeebe.zeebe-scaling-demo",
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
      "host": "zeebe-scaling-demo-zeebe-2.zeebe-scaling-demo-zeebe.zeebe-scaling-demo",
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
      "host": "zeebe-scaling-demo-zeebe-3.zeebe-scaling-demo-zeebe.zeebe-scaling-demo",
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
      "host": "zeebe-scaling-demo-zeebe-4.zeebe-scaling-demo-zeebe.zeebe-scaling-demo",
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
      "host": "zeebe-scaling-demo-zeebe-5.zeebe-scaling-demo-zeebe.zeebe-scaling-demo",
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
  "gatewayVersion": "8.8.0"
}
```

</details>

<details>

    <summary> Example response for scaling brokers and partitions </summary>

```json
{
  "brokers": [
    {
      "nodeId": 2,
      "host": "zeebe-scaling-demo-zeebe-2.zeebe-scaling-demo-core",
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
          "partitionId": 3,
          "role": "leader",
          "health": "healthy"
        }
      ],
      "version": "8.8.0-SNAPSHOT"
    },
    {
      "nodeId": 1,
      "host": "zeebe-scaling-demo-zeebe-1.zeebe-scaling-demo-core",
      "port": 26501,
      "partitions": [
        {
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
          "partitionId": 6,
          "role": "follower",
          "health": "healthy"
        }
      ],
      "version": "8.8.0-SNAPSHOT"
    },
    {
      "nodeId": 0,
      "host": "zeebe-scaling-demo-zeebe-0.zeebe-scaling-demo-core",
      "port": 26501,
      "partitions": [
        {
          "partitionId": 1,
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
      "version": "8.8.0-SNAPSHOT"
    },
    {
      "nodeId": 3,
      "host": "zeebe-scaling-demo-zeebe-3.zeebe-scaling-demo-core",
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
      "version": "8.8.0-SNAPSHOT"
    },
    {
      "nodeId": 5,
      "host": "zeebe-scaling-demo-zeebe-5.zeebe-scaling-demo-core",
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
          "role": "leader",
          "health": "healthy"
        }
      ],
      "version": "8.8.0-SNAPSHOT"
    },
    {
      "nodeId": 4,
      "host": "zeebe-scaling-demo-zeebe-4.zeebe-scaling-demo-core",
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
      "version": "8.8.0-SNAPSHOT"
    }
  ],
  "clusterSize": 6,
  "partitionsCount": 6,
  "replicationFactor": 3,
  "gatewayVersion": "8.8.0-SNAPSHOT",
  "lastCompletedChangeId": "2"
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
curl --request POST 'http://localhost:9600/actuator/cluster/brokers' \
-H 'Content-Type: application/json' \
-d '["0", "1", "2"]'
```

Here `0`,`1`, and `2` are the brokers that should remain after scaling down. Brokers `3`, `4`, and `5` will be shut down after scaling down.

Similar to scaling up, the response to this request would contain a `changeId`, `currentTopology`, planned changes, and expected topology.

### 2. Query the Zeebe Gateway to monitor progress of scaling

```
curl --request GET 'http://localhost:9600/actuator/cluster'
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

Run the following command to see the current status of the cluster:

```
curl -L 'http://localhost:8080/v2/topology' \
-H 'Accept: application/json'
```

The response would show that the partitions are moved away from brokers `3`, `4`, and `5`:

<details>
  <summary>Example response</summary>

```json
{
   "brokers": [{
         "nodeId": 0,
         "host": "zeebe-scaling-demo-zeebe-0.zeebe-scaling-demo-zeebe.zeebe-scaling-demo",
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
         "host": "zeebe-scaling-demo-zeebe-1.zeebe-scaling-demo-zeebe.zeebe-scaling-demo",
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
         "host": "zeebe-scaling-demo-zeebe-2.zeebe-scaling-demo-zeebe.zeebe-scaling-demo",
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
         "host": "zeebe-scaling-demo-zeebe-3.zeebe-scaling-demo-zeebe.zeebe-scaling-demo",
         "port": 26501,
         "partitions": [],
         "version": "8.8.0"
      },
      {
         "nodeId": 4,
         "host": "zeebe-scaling-demo-zeebe-4.zeebe-scaling-demo-zeebe.zeebe-scaling-demo",
         "port": 26501,
         "partitions": [],
         "version": "8.8.0"
      },
      {
         "nodeId": 5,
         "host": "zeebe-scaling-demo-zeebe-5.zeebe-scaling-demo-zeebe.zeebe-scaling-demo",
         "port": 26501,
         "partitions": [],
         "version": "8.8.0"
      }
   ],
   "clusterSize": 3,
   "partitionsCount": 6,
   "replicationFactor": 3,
   "gatewayVersion": "8.8.0"
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
zeebe-scaling-demo-zeebe-0                                        1/1     Running     0          9m55s
zeebe-scaling-demo-zeebe-1                                        1/1     Running     0          9m55s
zeebe-scaling-demo-zeebe-2                                        1/1     Running     0          9m50s
zeebe-scaling-demo-zeebe-gateway-b79b9cdbc-8vvnf                  1/1     Running     0          9m38s
zeebe-scaling-demo-zeebe-gateway-b79b9cdbc-dkk9v                  1/1     Running     0          9m38s

```

:::note
After scaling down the statefulset, you may have to delete the PVCs manually.
:::

## Considerations

1. Scaling up or down involves moving data around and choosing new leaders for the moved partitions. Hence, it can have a slight impact on the system, depending on the load when the scaling is executed. The ideal strategy is to scale in advance when you anticipate a higher load.
2. To make use of this feature, we recommend to provision more partitions than required when you set up the cluster.

## API reference

OpenAPI spec for this API can be found [here](https://github.com/camunda/camunda/blob/main/dist/src/main/resources/api/cluster/cluster-api.yaml).

### Scale request API

To scale up or down, use the following request to change the cluster size and redistribute the partitions.

:::note
This endpoint does not respect the **fixed** partitioning scheme configured via `zeebe.broker.experimental.partitioning`. When this endpoint is used, the partitions are redistributed using `ROUND_ROBIN` strategy.
:::

#### Request

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

##### Dry run

You can also do a dry run without actually executing the scaling by specifying the request parameter `dryRun` to `true` as follows. By default, `dryRun` is set to false:

```
curl --request POST 'http://localhost:9600/actuator/cluster/brokers?dryRun=true' \
-H 'Content-Type: application/json' \
-d '["0", "1", "2", "3"]'
```

##### Replication factor

The replication factor for all partitions can be changed with the `replicationFactor` request parameter. If not specified, the replication factor remains unchanged.

The new replicas are assigned to the brokers based on the round robin partition distribution strategy.

```
curl --request POST 'http://localhost:9600/actuator/cluster/brokers?replicationFactor=4' \
-H 'Content-Type: application/json' \
-d '["0", "1", "2", "3"]'
```

##### Force remove brokers

:::caution
This is a dangerous operation and must be used with caution. When not used correctly, split-brain scenarios or unhealthy, unrecoverable clusters may result.
:::

Usually, changes can only be made to a cluster when all brokers are up. When some brokers are unreachable, you may want to remove them from the cluster. You can force remove a set of brokers by setting the request parameter `force` to `true`.

This operation is mainly useful for [dual-region setups](/self-managed//concepts/multi-region/dual-region.md), and additional information can be found in the [dual-region operational procedure](/self-managed/installation-methods/helm/operational-tasks/dual-region-ops.md). Any deviations from the described process can result in the cluster being unusable.

:::note
Do not send more than one force request at a time.
:::

The following request force removes all brokers that are _not_ provided in the request body:

```
curl --request POST 'http://localhost:9600/actuator/cluster/brokers?force=true' \
-H 'Content-Type: application/json' \
-d '["0", "1", "2"]'
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
