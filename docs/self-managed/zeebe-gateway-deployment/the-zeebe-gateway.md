---
id: zeebe-gateway
title: "Zeebe Gateway"
sidebar_label: "Overview"
description: "The Zeebe Gateway is a component of the Zeebe cluster."
---

## What is the Zeebe Gateway?

The Zeebe Gateway is a component of the Zeebe cluster; it can be considered the contact point for the Zeebe cluster which allows Zeebe clients to communicate with Zeebe brokers inside a Zeebe cluster. For more information about the Zeebe broker, visit our [additional documentation](../../components/zeebe/technical-concepts/architecture.md#brokers).

To summarize, the Zeebe broker is the main part of the Zeebe cluster, which does all the heavy work like processing, replicating, exporting, and everything based on partitions. The Zeebe Gateway acts as a load balancer and router between Zeebe’s processing partitions.

![Zeebe gateway overview](assets/zeebe-gateway-overview.png)

To interact with the Zeebe cluster, the Zeebe client sends a command as a gRPC message to the Zeebe Gateway (to port `26500` by default). Given the gateway supports gRPC, the user can use several clients in different languages to interact with the Zeebe cluster. For more information, read our [overview](../../apis-clients/working-with-apis-clients.md).

:::note
Be aware Zeebe brokers divide data into partitions (shards), and use RAFT for replication. Read more on RAFT [here](../../components/zeebe/technical-concepts/clustering.md#raft-consensus-and-replication-protocol).
:::

When the Zeebe Gateway receives a valid gRPC message, it is translated to an internal binary format and forwarded to one of the partition leaders inside the Zeebe cluster. The command type and values can determine to which partition the command is forwarded.

For example, creating a new process instance is sent in a round-robin fashion to the different partitions. If the command relates to an existing process instance, the command must be sent to the same partition where it was first created (determined by the key).

To determine the current leader for the corresponding partition, the gateway must maintain the topology of the Zeebe cluster. The gateway(s) and broker(s) form a cluster using gossip protocol to distribute information.

## Why do we have it and what problems does it solve?

The Zeebe Gateway protects the brokers from external sources. It allows the creation of a demilitarized zone ([DMZ](<https://en.wikipedia.org/wiki/DMZ_(computing)>)) and the Zeebe Gateway is the only contact point.

The Zeebe Gateway also allows you to easily create clients in your language of choice while keeping the client implementation as thin as possible. The clients can be kept thin, since the gateway takes care of the cluster topology and forwards the requests to the right partitions. There are already several client implementations available, officially-supported, and community-maintained. Check the list [here](../../apis-clients/working-with-apis-clients.md).

The gateway can be run and scaled independently of the brokers, which means it translates the messages, distributes them to the correct partition leaders, and separates the concerns of the applications. For example, if your system encounters a spike of incoming requests, and you have set up enough partitions on the broker side up front, but not enough gateways to handle the load, you can easily scale them up.

## Embedded versus standalone

The Zeebe Gateway can be run in two different ways: embedded and standalone.

### Embedded

Running the gateway in embedded mode means it will run as part of the Zeebe broker. The broker will accept gRPC client messages via the embedded gateway and distribute the translated requests inside the cluster. This means the request accepted by the embedded gateway does not necessarily go to the same broker, where the embedded gateway is running.

The embedded gateway is useful for development and testing purposes, and to reduce the burden of deploying and running multiple applications. For example, in [zeebe-process-test](https://github.com/camunda/zeebe-process-test) an embedded gateway is used to accept the client commands and write directly to the engine.

:::note Be aware
If the gateway is running in the embedded mode, it will consume resources from the broker, which might impact the performance of the system.
:::

### Standalone

Running the gateway in standalone mode means the gateway will be executed as its own application. This is the recommended way for production use cases, and it is the default (and only option) in the Helm charts. As mentioned, this allows separation of concerns, especially as the gateway can be scaled independently of the broker based on the current workload.

## Configuration

The Zeebe Gateway can be configured similarly to the broker via the `application.yaml` file or environment variables. Find a detailed `application.yaml` with comments [here](https://github.com/camunda/zeebe/blob/main/dist/src/main/config/gateway.yaml.template).

In the following sections, we provide tables with environment variables, application properties, a description, and their corresponding default values. We also describe a few use cases for each type of configuration.

The configuration properties follow some conventions, especially the types for byte sizes and time units, check out the [application.yaml](https://github.com/camunda/zeebe/blob/main/dist/src/main/config/gateway.yaml.template), which describes this in detail.

For deploying purposes, it is easier to use environment variables. The following sections outline usage of these variables. As Helm is the recommended way to deploy Camunda Platform 8, we will explain some configuration options here as well. Find more information about possible Zeebe gateway Helm chart configurations [here](https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform/README.md#zeebe-gateway).

### Network configuration

The network configuration allows configuration of the host and port details for the gateway.

| Environment variable                         | Application.yaml property                    | Description                                                                                                                                                                         | Default value |
| -------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `ZEEBE_GATEWAY_NETWORK_HOST`                 | `zeebe.gateway.network.host`                 | Sets the host the gateway binds to.                                                                                                                                                 | `0.0.0.0`     |
| `ZEEBE_GATEWAY_NETWORK_PORT`                 | `zeebe.gateway.network.port`                 | Sets the port the gateway binds to.                                                                                                                                                 | `26500`       |
| `ZEEBE_GATEWAY_NETWORK_MINKEEPALIVEINTERVAL` | `zeebe.gateway.network.minKeepAliveInterval` | This setting specifies the minimum accepted interval between keep alive requests. If clients send keep-alive requests at a smaller rate, they are forcefully closed by the gateway. | `30s`         |

### Cluster configuration

As mentioned, the gateway needs to connect to the Zeebe brokers.

It is important to configure the cluster's initial contact point to the Zeebe brokers. You may set only one of the Zeebe brokers, but keep in mind that resiliency will be lower than using all the Zeebe brokers available. The corresponding environment variable is called `ZEEBE_GATEWAY_CLUSTER_INITIALCONTACTPOINTS`.

It is necessary to use the same cluster name for the broker and gateway. Otherwise, a connection will not be possible. The related configuration property is `zeebe.gateway.cluster.clusterName` and as an environment variable, it is called `ZEEBE_GATEWAY_CLUSTER_CLUSTERNAME`.

If you use the Helm charts, both properties are configured for you already.

| Environment variable                         | Application.yaml property                    | Description                                                                                                           | Default value       |
| -------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `ZEEBE_GATEWAY_CLUSTER_INITIALCONTACTPOINTS` | `zeebe.gateway.cluster.initialContactPoints` | Sets brokers the gateway should initial contact.                                                                      | `[127.0.0.1:26502]` |
| `ZEEBE_GATEWAY_CLUSTER_REQUESTTIMEOUT`       | `zeebe.gateway.cluster.requestTimeout`       | Sets the timeout of requests sent to the broker cluster.                                                              | `15s`               |
| `ZEEBE_GATEWAY_CLUSTER_CLUSTERNAME`          | `zeebe.gateway.cluster.clusterName`          | Sets the name of the Zeebe cluster to connect to. This must be the same as the clustername configured in the brokers. | `zeebe-cluster`     |
| `ZEEBE_GATEWAY_CLUSTER_MEMBERID`             | `zeebe.gateway.cluster.memberId`             | Sets the member id of the gateway in the cluster. This can be any unique string.                                      | `gateway`           |
| `ZEEBE_GATEWAY_CLUSTER_HOST`                 | `zeebe.gateway.cluster.host`                 | Sets the host the gateway node binds to for internal cluster communicatio.                                            | `0.0.0.0`           |
| `ZEEBE_GATEWAY_CLUSTER_PORT`                 | `zeebe.gateway.cluster.port`                 | Sets the port the gateway node binds to for internal cluster communication.                                           | `26502`             |

### Membership configuration

To configure how the gateway connects and distributes information with other nodes (brokers or gateways) via SWIM, the following properties can be used. It might be useful to increase timeouts for setups that encounter a high latency between nodes.

| Environment variable                                 | Application.yaml property                            | Description                                                                                          | Default value |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------- |
| `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_BROADCASTUPDATES`  | `zeebe.gateway.cluster.membership.broadcastUpdates`  | Configure whether to broadcast member updates to all members.                                        | `false`       |
| `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_BROADCASTDISPUTES` | `zeebe.gateway.cluster.membership.broadcastDisputes` | Configure whether to broadcast disputes to all members.                                              | `true`        |
| `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_NOTIFYSUSPECT`     | `zeebe.gateway.cluster.membership.notifySuspect`     | Configure whether to notify a suspect node on state changes.                                         | `false`       |
| `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_GOSSIPINTERVAL`    | `zeebe.gateway.cluster.membership.gossipInterval`    | Sets the interval at which the membership updates are sent to a random member.                       | `250ms`       |
| `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_GOSSIPFANOUT`      | `zeebe.gateway.cluster.membership.gossipFanout`      | Sets the number of members to which membership updates are sent at each gossip interval.             | `2`           |
| `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_PROBEINTERVAL`     | `zeebe.gateway.cluster.membership.probeInterval`     | Sets the interval at which to probe a random member.                                                 | `1s`          |
| `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_PROBETIMEOUT`      | `zeebe.gateway.cluster.membership.probeTimeout`      | Sets the timeout for a probe response.                                                               | `100ms`       |
| `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_SUSPECTPROBES`     | `zeebe.gateway.cluster.membership.suspectProbes`     | Sets the number of probes failed before declaring a member is suspect.                               | `3`           |
| `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_FAILURETIMEOUT`    | `zeebe.gateway.cluster.membership.failureTimeout`    | Sets the timeout for a suspect member declared dead.                                                 | `10s`         |
| `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_SYNCINTERVAL`      | `zeebe.gateway.cluster.membership.syncInterval`      | Sets the interval at which this member synchronizes its membership information with a random member. | `10s`         |

### Cluster security configuration

The cluster security configuration options allow securing communication between the gateway and other nodes in the cluster.

:::note

You can read more about intra-cluster security on [its dedicated page](../zeebe-deployment/security/secure-cluster-communication.md).

:::

| Environment variable                                  | Application.yaml property                             | Description                                                                     | Default value |
| ----------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------- | ------------- |
| `ZEEBE_GATEWAY_CLUSTER_SECURITY_ENABLED`              | `zeebe.gateway.cluster.security.enabled`              | Enables TLS authentication between this gateway and other nodes in the cluster. | `false`       |
| `ZEEBE_GATEWAY_CLUSTER_SECURITY_CERTIFICATECHAINPATH` | `zeebe.gateway.cluster.security.certificateChainPath` | Sets the path to the certificate chain file.                                    |               |
| `ZEEBE_GATEWAY_CLUSTER_SECURITY_PRIVATEKEYPATH`       | `zeebe.gateway.cluster.security.privateKeyPath`       | Sets the path to the private key file location.                                 |               |

### Message compression

To configure the compression algorithm for all messages sent between the gateway and
the brokers, the following property can be set. Available options are NONE, GZIP, and SNAPPY.
This feature is useful when the network latency between the nodes is very high (for example, when nodes are deployed in different data centers). When latency is high, the network bandwidth is severely reduced. Therefore, enabling compression helps improve the throughput. You need to decide between reducing bandwidth or reducing resources required for compression.

:::note
When there is no latency enabling, this may have a performance impact. Additionally, when this flag is enabled, you must also enable compression in the standalone broker configuration.
:::

| Environment variable                       | Application.yaml property                  | Description                                                                                                                                                     | Default value |
| ------------------------------------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `ZEEBE_GATEWAY_CLUSTER_MESSAGECOMPRESSION` | `zeebe.gateway.cluster.messageCompression` | Configure compression algorithm for all messages sent between the brokers and between the broker and the gateway. Available options are NONE, GZIP, and SNAPPY. | `NONE`        |

### Threads configuration

To handle many concurrent incoming requests, the user can do two things: scale the deployed gateways (if the standalone mode is in use), or increase the used resources and threads.

The Zeebe Gateway uses one thread by default, but this should be set to a higher number if the gateway doesn’t exhaust its available resources and doesn’t keep up with the load. The corresponding environment variables look like this: `ZEEBE_GATEWAY_THREADS_MANAGEMENTTHREADS`.
During benchmarking and when increasing the thread count, it may also make sense to increase the given resources, which are quite small in the Helm chart.

For high availability and redundancy, two Zeebe Gateways are deployed by default with the Helm charts. To change that amount, set `zeebe-gateway.replicas=2` to a different number. Increasing the number of gateway replicas to more than one enables the possibility for quick failover; in the case one gateway dies, the remaining gateway(s) can handle the traffic.

To explore how the gateway behaves, or what it does, metrics can be consumed. By default, the gateway exports Prometheus metrics, which can be scrapped under `:9600/actuator/prometheus`.

| Environment variable                      | Application.yaml property                 | Description                                                                             | Default value |
| ----------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------- | ------------- |
| `ZEEBE_GATEWAY_THREADS_MANAGEMENTTHREADS` | `zeebe.gateway.threads.managementThreads` | Sets the number of threads the gateway will use to communicate with the broker cluster. | `1`           |

### Client security configuration

The client security configuration options allow securing the communication between a gateway and clients.

:::note

You can read more about client-gateway security on [its dedicated page](../zeebe-deployment/security/secure-client-communication.md).

:::

| Environment variable                          | Application.yaml property                     | Description                                                 | Default value |
| --------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------- | ------------- |
| `ZEEBE_GATEWAY_SECURITY_ENABLED`              | `zeebe.gateway.security.enabled`              | Enables TLS authentication between clients and the gateway. | `false`       |
| `ZEEBE_GATEWAY_SECURITY_CERTIFICATECHAINPATH` | `zeebe.gateway.security.certificateChainPath` | Sets the path to the certificate chain file.                |               |
| `ZEEBE_GATEWAY_SECURITY_PRIVATEKEYPATH`       | `zeebe.gateway.security.privateKeyPath`       | Sets the path to the private key file location.             |               |

### Long-polling configuration

It's possible to configure gateway long-polling behavior. Read more on long-polling behavior [here](../../components/concepts/job-workers.md#long-polling).

| Environment variable                | Application.yaml property           | Description                              | Default value |
| ----------------------------------- | ----------------------------------- | ---------------------------------------- | ------------- |
| `ZEEBE_GATEWAY_LONGPOLLING_ENABLED` | `zeebe.gateway.longPolling.enabled` | Enables long polling for available jobs. | `true`        |

### Interceptors configuration

It is possible to intercept requests in the gateway, which can be configured via environment variables or the `application.yaml` file. For more details, read about [interceptors](../../self-managed/zeebe-deployment/interceptors.md).

| Environment variable                     | Application.yaml property                  | Description                                                                                                                                                                                       | Default value |
| ---------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `ZEEBE_GATEWAY_INTERCEPTORS_0_ID`        | `zeebe.gateway.interceptors.[0].id`        | The identifier for this interceptor.                                                                                                                                                              |               |
| `ZEEBE_GATEWAY_INTERCEPTORS_0_JARPATH`   | `zeebe.gateway.interceptors.[0].jarPath`   | The path (relative or absolute) to the `JAR` file containing the interceptor class and its dependencies.                                                                                          |               |
| `ZEEBE_GATEWAY_INTERCEPTORS_0_CLASSNAME` | `zeebe.gateway.interceptors.[0].className` | The entry point of the interceptor, a class which must: <br/>- Implement io.grpc.ServerInterceptor<br/>- Have public visibility<br/>- Have a public default constructor (i.e. no-arg constructor) |               |
