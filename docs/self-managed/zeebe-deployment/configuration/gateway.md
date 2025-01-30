---
id: gateway-config
title: "Gateway configuration"
sidebar_label: "Gateway configuration"
description: "Analyze how to configure the Zeebe Gateway, including byte sizes, time units, paths, and sample YAML snippets."
---

The Zeebe Gateway can be configured similarly to the broker via the `application.yaml` file or environment variables. A complete gateway configuration template is available in the [Zeebe repository](https://github.com/camunda/camunda/blob/main/dist/src/main/config/gateway.yaml.template).

:::info Configure an embedded gateway
If you're configuring a gateway that is embedded inside a broker (i.e. you've set [`zeebe.broker.gateway.enable`](./broker.md#zeebebrokergateway)), then you must use `zeebe.broker.gateway.*` instead of `zeebe.gateway.*` for any of the configuration options below. For environment variables this means you must use `ZEEBE_BROKER_GATEWAY_*` instead of `ZEEBE_GATEWAY_*`.
:::

## Conventions

Take the following conventions into consideration when working with the gateway configuration.

### Byte sizes

Buffers and data values referencing sizing must be specified as strings and follow the following format: "10U" where U (unit) must be replaced with KB = Kilobytes, MB = Megabytes or GB = Gigabytes. If unit is omitted then the default unit is simply bytes.

For example, `sendBufferSize = "16MB"` creates a buffer of 16 Megabytes.

### Time units

Timeouts and intervals must be specified either in the standard ISO-8601 format used by `java.time.Duration`, or as strings with the following format: "VU", where:

- V is a numerical value (e.g. 1, 5, 10, etc.)
- U is the unit, one of: ms = Milliseconds, s = Seconds, m = Minutes, or h = Hours

### Paths

Relative paths are resolved relative to the installation directory of the broker.

## Configuration

We provide tables with environment variables, application properties, a description, and corresponding default values in the following sections. We also describe a few use cases for each type of configuration.

Configuration names are noted as the **header** of each documented section, while the **field** values represent properties to set the configuration.

For deploying purposes, it is easier to use environment variables. The following sections outline usage of these variables. As Helm is the recommended way to deploy Camunda 8, we will explain some configuration options here as well. Find more information about possible Zeebe Gateway Helm chart [configurations](https://artifacthub.io/packages/helm/camunda/camunda-platform#zeebe-gateway-parameters).

:::note
The Zeebe Gateway is a Spring Boot application. As such, [many common Spring Boot properties will work out of the box](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html).

Additionally, its REST server is a reactive Spring Boot server (powered by WebFlux), and can be configured using the standard `server.*` properties, as well as the usual WebFlux properties. Its management server (for example, where actuator endpoints live) is configured as a child application context, and is also a reactive WebFlux server. It can be configured via `management.server.*` properties.
:::

### server

The `server` configuration allows you to configure the main REST server. Below are a few common ones, but you can find a more exhaustive list [in the official Spring documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#appendix.application-properties.server).

| Field | Description                                                                                                               | Example value |
| ----- | ------------------------------------------------------------------------------------------------------------------------- | ------------- |
| host  | Sets the host the REST server binds to. This setting can also be overridden using the environment variable `SERVER_HOST`. | 0.0.0.0       |
| port  | Sets the port the REST server binds to. This setting can also be overridden using the environment variable `SERVER_PORT`. | 8080          |

#### server.compression

| Field   | Description                                                                                                                                                 | Example value |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled | If true, enables compression of responses for the REST API. This setting can also be overridden using the environment variable `SERVER_COMPRESION_ENABLED`. | false         |

#### server.ssl

Allows you to configure the SSL security for the REST server.

| Field                   | Description                                                                                                                                                                     | Example value |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled                 | If true, enables TLS for the REST API. This setting can also be overridden using the environment variable `SERVER_SSL_ENABLED`.                                                 | false         |
| certificate             | The path to a PEM encoded certificate. This setting can also be overridden using the environment variable `SERVER_SSL_CERTIFICATE`.                                             |               |
| certificate-private-key | The path to a PKCS1 or PKCS8 private key for the configured certificate. This setting can also be overridden using the environment variable `SERVER_SSL_CERTIFICATEPRIVATEKEY`. |               |

#### YAML snippet

```yaml
server:
  host: 0.0.0.0
  port: 8080
  compression:
    enabled: true
  ssl:
    enabled: true
    certificate: /path/to/my/cert.pem
    certificate-private-key: /path/to/my/private.key
```

### spring.webflux

| Field     | Description                                                                                                                                                                                                                                                     | Example value |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| base-path | The context path prefix for all REST API requests. For example, if you configure `/zeebe`, then the client's REST address would be `http://localhost:8080/zeebe`. This setting can also be overridden using the environment variable `SPRING_WEBFLUX_BASEPATH`. | `/`           |

#### YAML snippet

```yaml
spring.webflux:
  base-path: /
```

### management.server

The `management.server` configuration allows you to configure the management server.

| Field     | Description                                                                                                                                                                                                                                                                           | Example value |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| host      | Sets the host the management server binds to. This setting can also be overridden using the environment variable `MANAGEMENT_SERVER_HOST`.                                                                                                                                            | 0.0.0.0       |
| port      | Sets the port the management server binds to. This setting can also be overridden using the environment variable `MANAGEMENT_SERVER_PORT`.                                                                                                                                            | 8080          |
| base-path | The context path prefix for all management endpoints. For example, if you configure `/zeebe`, your actuator endpoints will be at `http://localhost:9600/zeebe/actuator/configprops`. This setting can also be overridden using the environment variable `MANAGEMENT_SERVER_BASEPATH`. | `/`           |

#### YAML snippet

```yaml
management.server:
  host: 0.0.0.0
  port: 9600
  base-path: /
```

### zeebe.gateway.network

The network configuration allows configuration of the host and port details for the gateway.

| Field                | Description                                                                                                                                                                                                                                                                                                                                              | Example value |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| host                 | Sets the host the gateway binds to. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_HOST`.                                                                                                                                                                                                                     | 0.0.0.0       |
| port                 | Sets the port the gateway binds to. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_PORT`.                                                                                                                                                                                                                     | 26500         |
| minKeepAliveInterval | Sets the minimum keep alive interval. This setting specifies the minimum accepted interval between keep alive pings. This value must be specified as a positive integer followed by 's' for seconds, 'm' for minutes, or 'h' for hours. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_MINKEEPALIVEINTERVAL`. | 30s           |
| maxMessageSize       | Sets the maximum size of the incoming and outgoing messages (i.e. commands and events). Apply the same setting on the broker too, see `ZEEBE_BROKER_NETWORK_MAXMESSAGESIZE`. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_MAXMESSAGESIZE`.                                                                  | 4MB           |
| socketReceiveBuffer  | Sets the size of the socket's receive buffer for the gateway. If omitted defaults to 1MB. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_SOCKETRECEIVEBUFFER`.                                                                                                                                                | 4MB           |
| socketSendBuffer     | Sets the size of the socket's send buffer for the gateway. If omitted defaults to 1MB. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_SOCKETSENDBUFFER`.                                                                                                                                                      | 4MB           |

#### YAML snippet

```yaml
network:
  host: 0.0.0.0
  port: 26500
  minKeepAliveInterval: 30s
  maxMessageSize: 4MB
  socketReceiveBuffer: 4MB
  socketSendBuffer: 4MB
```

### zeebe.gateway.cluster

As mentioned, the gateway needs to connect to the Zeebe brokers.

It is important to configure the cluster's initial contact point to the Zeebe brokers. You may set only one of the Zeebe brokers, but keep in mind that resiliency will be lower than using all the Zeebe brokers available. The corresponding environment variable is called `ZEEBE_GATEWAY_CLUSTER_INITIALCONTACTPOINTS`.

It is necessary to use the same cluster name for the broker and gateway. Otherwise, a connection will not be possible. The related configuration property is `zeebe.gateway.cluster.clusterName` and as an environment variable, it is called `ZEEBE_GATEWAY_CLUSTER_CLUSTERNAME`.

If you use the Helm charts, both properties are configured for you already.

| Field                | Description                                                                                                                                                                                                                                                                                                                                          | Example value                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| initialContactPoints | Sets initial contact points (brokers), which the gateway should contact. The contact points of the internal network configuration must be specified. The format is [HOST:PORT]. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_INITIALCONTACTPOINTS` specifying a comma-separated list of contact points. | [ 192.168.1.22:26502, 192.168.1.32:26502 ] |
| contactPoint         | WARNING: This setting is deprecated! Use initialContactPoints instead. Sets the broker the gateway should initial contact. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_CONTACTPOINT`.                                                                                                                  | 127.0.0.1:26502                            |
| requestTimeout       | Sets the timeout of requests sent to the broker cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_REQUESTTIMEOUT`.                                                                                                                                                                                  | 15s                                        |
| clusterName          | Sets name of the Zeebe cluster to connect to. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_CLUSTERNAME`.                                                                                                                                                                                                | zeebe-cluster                              |
| memberId             | Sets the member ID of the gateway in the cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERID`.                                                                                                                                                                                               | gateway                                    |
| host                 | Sets the host the gateway node binds to for internal cluster communication. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_HOST`.                                                                                                                                                                         | 0.0.0.0                                    |
| port                 | Sets the port the gateway node binds to for internal cluster communication. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_PORT`.                                                                                                                                                                         | 26502                                      |
| advertisedHost       | Controls the advertised host; if omitted defaults to the host. This is particularly useful if your gateway stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_ADVERTISEDHOST`.                                                                                                         | 0.0.0.0                                    |
| advertisedPort       | Controls the advertised port; if omitted defaults to the port. This is particularly useful if your gateway stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_ADVERTISEDPORT`.                                                                                                         | 25602                                      |

#### YAML snippet

```yaml
cluster:
  initialContactPoints: 127.0.0.1:26502
  contactPoint: 127.0.0.1:26502
  requestTimeout: 15s
  clusterName: zeebe-cluster
  memberId: gateway
  host: 0.0.0.0
  port: 26502
  advertisedHost: 0.0.0.0
  advertisedPort: 25602
```

### zeebe.gateway.cluster.membership

To configure how the gateway connects and distributes information with other nodes (brokers or gateways) via SWIM, the following properties can be used. It might be useful to increase timeouts for setups that encounter a high latency between nodes.

| Field             | Description                                                                                                                                                                                                                                                                                                                                               | Example value |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| broadcastUpdates  | Configure whether to broadcast member updates to all members. If set to `false`, updates will be gossiped among the members. If set to `true`, the network traffic may increase but reduce the time to detect membership changes. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_BROADCASTUPDATES`. | false         |
| broadcastDisputes | Configure whether to broadcast disputes to all members. If set to `true`, the network traffic may increase but reduce the time to detect membership changes. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_BROADCASTDISPUTES`.                                                                     | true          |
| notifySuspect     | Configure whether to notify a suspect node on state changes. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_NOTIFYSUSPECT`.                                                                                                                                                                         | false         |
| gossipInterval    | Sets the interval at which the membership updates are sent to a random member. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_GOSSIPINTERVAL`.                                                                                                                                                      | 250ms         |
| gossipFanout      | Sets the number of members to which membership updates are sent at each gossip interval. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_GOSSIPFANOUT`.                                                                                                                                              | 2             |
| probeInterval     | Sets the interval at which to probe a random member. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_PROBEINTERVAL`.                                                                                                                                                                                 | 1s            |
| probeTimeout      | Sets the timeout for a probe response. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_PROBETIMEOUT`.                                                                                                                                                                                                | 100ms         |
| suspectProbes     | Sets the number of probes failed before declaring a member is suspect. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_SUSPECTPROBES`.                                                                                                                                                               | 3             |
| failureTimeout    | Sets the timeout for a suspect member is declared dead. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_FAILURETIMEOUT`.                                                                                                                                                                             | 10s           |
| syncInterval      | Sets the interval at which this member synchronizes its membership information with a random member. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_SYNCINTERVAL`.                                                                                                                                  | 10s           |

#### YAML snippet

```yaml
membership:
  broadcastUpdates: false
  broadcastDisputes: true
  notifySuspect: false
  gossipInterval: 250ms
  gossipFanout: 2
  probeInterval: 1s
  probeTimeout: 100ms
  suspectProbes: 3
  failureTimeout: 10s
  syncInterval: 10s
```

### zeebe.gateway.cluster.configManager.gossip

Configure the parameters used to propagate the dynamic cluster configuration across brokers and gateways.

| Field              | Description                                                                                                                                                                                                     | ExampleValue |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| syncDelay          | Sets the interval between two synchronization requests to other members of the cluster. This setting can also be overridden using the environment variable ZEEBE_GATEWAY_CLUSTER_CONFIGMANAGER_GOSSIP_SYNCDELAY | 10s          |
| syncRequestTimeout | Sets the timeout for the synchronization requests. This setting can also be overridden using the environment variable ZEEBE_GATEWAY_CLUSTER_CONFIGMANAGER_GOSSIP_SYNCREQUESTTIMEOUT                             | 2s           |
| gossipFanout       | Sets the number of cluster members the configuration is gossiped to. This setting can also be overridden using the environment variable ZEEBE_GATEWAY_CLUSTER_CONFIGMANAGER_GOSSIP_GOSSIPFANOUT                 | 2            |

#### YAML snippet

```yaml
configManager:
  gossip:
    syncDelay: 10s
    syncRequestTimeout: 2s
    gossipFanout: 2
```

### zeebe.gateway.cluster.security

The cluster security configuration options allow securing communication between the gateway and other nodes in the cluster.

:::note

You can read more about intra-cluster security on [its dedicated page](../security/secure-cluster-communication.md).

:::

| Field                | Description                                                                                                                                                                                  | Example value |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled              | Enables TLS authentication between this gateway and other nodes in the cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_SECURITY_ENABLED`. | false         |
| certificateChainPath | Sets the path to the certificate chain file. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_SECURITY_CERTIFICATECHAINPATH`.                       |               |
| privateKeyPath       | Sets the path to the private key file location. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_SECURITY_PRIVATEKEYPATH`.                          |               |

#### YAML snippet

```yaml
security:
  enabled: false
  certificateChainPath: null
  privateKeyPath: null
```

### zeebe.gateway.cluster.security.authentication

| Field | Description                                                                                                                                                                                                                                                                                                                                                                                     | Example value |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| mode  | Controls which authentication mode is active; supported modes are `none` and `identity`. If `identity` is set, authentication will be done using [camunda-identity](/self-managed/identity/what-is-identity.md), which needs to be configured in the corresponding subsection. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_SECURITY_AUTHENTICATION_MODE`. | none          |

#### YAML snippet

```yaml
security:
  authentication:
    mode: none
```

### zeebe.gateway.cluster.security.authentication.identity

:::note
The Zeebe configuration properties for Camunda Identity are deprecated as of version `8.4.0`. Use the dedicated
Camunda Identity properties or the [corresponding environment variables](../../identity/deployment/configuration-variables.md#core-configuration).
:::

| Field            | Description                                                                                                                                                                                          | Example value                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| issuerBackendUrl | The URL to the auth provider backend, used to validate tokens. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_ISSUERBACKENDURL`. | http://keycloak:18080/auth/realms/camunda-platform |
| audience         | The required audience of the auth token. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_AUDIENCE`.                               | zeebe-api                                          |
| type             | The identity auth type to apply, one of `keycloak` or `auth0`. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_TYPE`.             | keycloak                                           |
| baseUrl          | The URL to the Identity instance. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_BASEURL`.                                       | http://identity:8084                               |

#### YAML snippet

```yaml
security:
  authentication:
    mode: identity
    identity:
      issuerBackendUrl: http://keycloak:18080/auth/realms/camunda-platform
      audience: zeebe-api
      type: keycloak
```

### zeebe.gateway.cluster.messageCompression

To configure the compression algorithm for all messages sent between the gateway and
the brokers, the following property can be set. Available options are NONE, GZIP, and SNAPPY.
This feature is useful when the network latency between the nodes is very high (for example, when nodes are deployed in different data centers).

When latency is high, the network bandwidth is severely reduced. Therefore, enabling compression helps improve the throughput. You need to decide between reducing bandwidth or reducing resources required for compression.

:::caution
When this flag is enabled, you must also enable compression in the standalone broker configuration. When there is no latency enabling, this may have a performance impact.
:::

| Field              | Description                                                                                                                                                                                                                                             | Example value |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| messageCompression | Configure compression algorithm for all messages sent between the gateway and the brokers. Available options are NONE, GZIP, and SNAPPY. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MESSAGECOMPRESSION`. | NONE          |

#### YAML snippet

```yaml
messageCompression: NONE
```

### zeebe.gateway.threads

To handle many concurrent incoming requests, the user can do two things: scale the deployed gateways (if the standalone mode is in use), or increase the used resources and threads.

The Zeebe Gateway uses one thread by default, but this should be set to a higher number if the gateway doesn’t exhaust its available resources and doesn’t keep up with the load. The corresponding environment variables look like this: `ZEEBE_GATEWAY_THREADS_MANAGEMENTTHREADS`.
During benchmarking and when increasing the thread count, it may also make sense to increase the given resources, which are quite small in the Helm chart.

For high availability and redundancy, two Zeebe Gateways are deployed by default with the Helm charts. To change that amount, set `zeebe-gateway.replicas=2` to a different number. Increasing the number of gateway replicas to more than one enables the possibility for quick failover; in the case one gateway dies, the remaining gateway(s) can handle the traffic.

To explore how the gateway behaves, or what it does, metrics can be consumed. By default, the gateway exports Prometheus metrics, which can be scrapped under `:9600/actuator/prometheus`.

| Field             | Description                                                                                                                                                                                           | Example value |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| managementThreads | Sets the number of threads the gateway will use to communicate with the broker cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_THREADS_MANAGEMENTTHREADS`. | 1             |

#### YAML snippet

```yaml
threads:
  managementThreads: 1
```

### zeebe.gateway.security

The client security configuration options allow securing the communication between a gateway and clients.

:::note

You can read more about client-gateway security on [its dedicated page](../security/secure-client-communication.md).

:::

| Field                | Description                                                                                                                                                      | Example value |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled              | Enables TLS authentication between clients and the gateway. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_SECURITY_ENABLED`. | false         |
| certificateChainPath | Sets the path to the certificate chain file. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_SECURITY_CERTIFICATECHAINPATH`.   |               |
| privateKeyPath       | Sets the path to the private key file location. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_SECURITY_PRIVATEKEYPATH`.      |               |

#### YAML snippet

```yaml
security:
  enabled: false
  certificateChainPath:
  privateKeyPath:
```

### zeebe.gateway.longPolling

It's possible to configure gateway long-polling behavior. Read more on long-polling behavior [here](../../../components/concepts/job-workers.md#long-polling).

| Field             | Description                                                                                                                                                                                                                                     | Example value |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled           | Enables long polling for available jobs. This setting can also be overridden using the environment `variable ZEEBE_GATEWAY_LONGPOLLING_ENABLED`.                                                                                                | true          |
| timeout           | Set the timeout for long polling in milliseconds. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_LONGPOLLING_TIMEOUT`.                                                                                       | 10000         |
| probeTimeout      | Set the probe timeout for long polling in milliseconds. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_LONGPOLLING_PROBETIMEOUT`.                                                                            | 10000         |
| minEmptyResponses | Set the number of minimum empty responses, a minimum number of responses with jobCount of 0 infers that no job are available. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_LONGPOLLING_MINEMPTYRESPONSES`. | 3             |

#### YAML snippet

```yaml
longPolling:
  enabled: true
  timeout: 10000
  probeTimeout: 10000
  minEmptyResponses: 3
```

### zeebe.gateway.interceptors

It is possible to intercept requests in the gateway, which can be configured via environment variables or the `application.yaml` file. For more details, read about [interceptors](/self-managed/zeebe-deployment/zeebe-gateway/interceptors.md).

Each interceptor should be configured with the values described below:

<table name="interceptors" id="interceptors">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>Identifier for this interceptor. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_INTERCEPTORS_0_ID`.</td>
            <td></td>
        </tr>
        <tr>
            <td>jarPath</td>
            <td>Path (relative or absolute) to the JAR file containing the interceptor class and its dependencies. All classes must be compiled for the same language version as Zeebe or lower. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_INTERCEPTORS_0_JARPATH`.</td>
            <td></td>
        </tr>
        <tr>
            <td>className</td>
            <td>
              Entry point of the interceptor, a class which must:
              <li>implement <a href="https://grpc.github.io/grpc-java/javadoc/io/grpc/ServerInterceptor.html">io.grpc.ServerInterceptor</a></li>
              <li>have public visibility</li>
              <li>have a public default constructor (i.e. no-arg constructor)</li>
        This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_INTERCEPTORS_0_CLASSNAME`.
        </td>
            <td></td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
interceptors:
  id: null
  jarPath: null
  className: null
```

### zeebe.gateway.filters

It is possible to filter REST API requests in the gateway, which can be configured via environment variables or the `application.yaml` file. For more details, read about [filters](/self-managed/zeebe-deployment/zeebe-gateway/filters.md).

Each filter should be configured with the values described below:

<table name="filters" id="filters">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>Identifier for this filter. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_FILTERS_0_ID`.</td>
            <td></td>
        </tr>
        <tr>
            <td>jarPath</td>
            <td>Path (relative or absolute) to the JAR file containing the filter class and its dependencies. All classes must be compiled for the same language version as Zeebe or lower. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_FILTERS_0_JARPATH`.</td>
            <td></td>
        </tr>
        <tr>
            <td>className</td>
            <td>
              Entry point of the filter, a class which must:
              <li>implement <a href="https://www.javadoc.io/doc/jakarta.servlet/jakarta.servlet-api/6.0.0/jakarta.servlet/jakarta/servlet/Filter.html">jakarta.servlet.Filter</a></li>
              <li>have public visibility</li>
              <li>have a public default constructor (i.e. no-arg constructor)</li>
        This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_FILTERS_0_CLASSNAME`.
        </td>
            <td></td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
filters:
  id: null
  jarPath: null
  className: null
```

### zeebe.gateway.multiTenancy

Multi-tenancy in Zeebe can be configured with the following configuration properties.
Multi-tenancy is disabled by default.
Read more [in the multi-tenancy documentation](../../../self-managed/concepts/multi-tenancy.md).

:::note
For now, multi-tenancy is only supported in combination with Identity.
To use multi-tenancy, you must set [`authentication.mode`](#zeebegatewayclustersecurityauthentication) to `'identity'` and specify the
`camunda.identity.baseUrl` property or the [corresponding Camunda Identity environment variable](../../identity/deployment/configuration-variables.md#core-configuration)
as well.
:::

:::note
If you are using an embedded gateway, refer to the [broker configuration guide](./broker.md#multitenancy-configuration).
:::

| Field   | Description                                                                                                                                     | Example value |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled | Enables multi-tenancy for the cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_MULTITENANCY_ENABLED`. | true          |

#### YAML snippet

```yaml
multiTenancy:
  enabled: true
```
