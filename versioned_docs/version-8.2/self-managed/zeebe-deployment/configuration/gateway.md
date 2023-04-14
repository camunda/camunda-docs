---
id: gateway-config
title: "Gateway configuration"
sidebar_label: "Gateway configuration"
description: "Analyze how to configure the Zeebe gateway, including byte sizes, time units, paths, and sample YAML snippets."
---

A complete gateway configuration template is available in the [Zeebe repository](https://github.com/camunda/zeebe/blob/main/dist/src/main/config/gateway.yaml.template).

## Conventions

Take the following conventions into consideration when working with the gateway configuration.

### Byte sizes

Buffers and data values referencing sizing must be specified as strings and follow the following format: "10U" where U (unit) must be replaced with KB = Kilobytes, MB = Megabytes or GB = Gigabytes. If unit is omitted then the default unit is simply bytes.

For example, `sendBufferSize = "16MB"` creates a buffer of 16 Megabytes.

### Time units

Timeouts and intervals must be specified either in the standard ISO-8601 format used by `java.time.Duration`, or as strings with the following format: "VU", where:

- V is a numerical value (e.g. 1, 5, 10, etc.)
- U is the unit, one of: ms = Millis, s = Seconds, m = Minutes, or h = Hours

### Paths

Relative paths are resolved relative to the installation directory of the broker.

## Configuration

### zeebe.gateway.network

| Field                | Description                                                                                                                                                                                                                                                                                                                                              | Example value |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| host                 | Sets the host the gateway binds to. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_HOST`.                                                                                                                                                                                                                     | 0.0.0.0       |
| port                 | Sets the port the gateway binds to. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_PORT`.                                                                                                                                                                                                                     | 26500         |
| minKeepAliveInterval | Sets the minimum keep alive interval. This setting specifies the minimum accepted interval between keep alive pings. This value must be specified as a positive integer followed by 's' for seconds, 'm' for minutes, or 'h' for hours. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_MINKEEPALIVEINTERVAL`. | 30s           |
| maxMessageSize       | Sets the maximum size of the incoming and outgoing messages (i.e. commands and events). Apply the same setting on the broker too, see `ZEEBE_BROKER_NETWORK_MAXMESSAGESIZE`. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_MAXMESSAGESIZE`.                                                                  | 4MB           |

#### YAML snippet

```yaml
network:
  host: 0.0.0.0
  port: 26500
  minKeepAliveInterval: 30s
  maxMessageSize: 4MB
```

### zeebe.gateway.cluster

| Field                | Description                                                                                                                                                                                                                                                                                                                                          | Example value                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| initialContactPoints | Sets initial contact points (brokers), which the gateway should contact. The contact points of the internal network configuration must be specified. The format is [HOST:PORT]. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_INITIALCONTACTPOINTS` specifying a comma-separated list of contact points. | [ 192.168.1.22:26502, 192.168.1.32:26502 ] |
| contactPoint         | WARNING: This setting is deprecated! Use initialContactPoints instead. Sets the broker the gateway should initial contact. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_CONTACTPOINT`.                                                                                                                  | 127.0.0.1:26502                            |
| requestTimeout       | Sets the timeout of requests sent to the broker cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_REQUESTTIMEOUT`.                                                                                                                                                                                  | 15s                                        |
| clusterName          | Sets name of the Zeebe cluster to connect to. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_CLUSTERNAME`.                                                                                                                                                                                                | zeebe-cluster                              |
| memberId             | Sets the member id of the gateway in the cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERID`.                                                                                                                                                                                               | gateway                                    |
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

Configure parameters for SWIM protocol which is used to propagate cluster membership information among brokers and gateways.

| Field             | Description                                                                                                                                                                                                                                                                                                                                               | Example value |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| broadcastUpdates  | Configure whether to broadcast member updates to all members. If set to `false`, updates will be gossiped among the members. If set to `true`, the network traffic may increase but reduce the time to detect membership changes. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_BROADCASTUPDATES`. | False         |
| broadcastDisputes | Configure whether to broadcast disputes to all members. If set to `true`, the network traffic may increase but reduce the time to detect membership changes. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_BROADCASTDISPUTES`.                                                                     | True          |
| notifySuspect     | Configure whether to notify a suspect node on state changes. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_NOTIFYSUSPECT`.                                                                                                                                                                         | False         |
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

### zeebe.gateway.cluster.security

| Field                | Description                                                                                                                                                                                  | Example value |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled              | Enables TLS authentication between this gateway and other nodes in the cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_SECURITY_ENABLED`. | False         |
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

| Field | Description                                                                                                                                                                                                                                                                                                                                                                                            | Example value |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| mode  | Controls which authentication mode is active; supported modes are `none` and `identity`. If `identity` is set, authentication will be done using [camunda-identity](/self-managed/identity/what-is-identity.md), which needs to be configured in the corresponding subsection. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_MODE`. | none          |

#### YAML snippet

```yaml
security:
  authentication:
    mode: none
```

### zeebe.gateway.cluster.security.authentication.identity

| Field            | Description                                                                                                                                                                                                 | Example value                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| issuerBackendUrl | The URL to the auth provider backend, used to validate tokens. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_ISSUERBACKENDURL`. | http://keycloak:8080/auth/realms/camunda-platform |
| audience         | The required audience of the auth token. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_AUDIENCE`.                               | zeebe-api                                         |
| type             | The identity auth type to apply, one of `keycloak` or `auth0`. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_TYPE`.             | keycloak                                          |

#### YAML snippet

```yaml
security:
  authentication:
    mode: identity
    identity:
      issuerBackendUrl: http://keycloak:8080/auth/realms/camunda-platform
      audience: zeebe-api
      type: keycloak
```

### zeebe.gateway.cluster.messageCompression

This feature is useful when the network latency between the nodes is very high (for example, when nodes are deployed in different data centers).

When latency is high, the network bandwidth is severely reduced. Hence, enabling compression helps to improve the throughput.

:::caution
When there is no latency enabling this may have a performance impact.
:::

:::note
When this flag is enabled, you must also enable compression in standalone broker configuration.
:::

| Field              | Description                                                                                                                                                                                                                                             | Example value |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| messageCompression | Configure compression algorithm for all messages sent between the gateway and the brokers. Available options are NONE, GZIP, and SNAPPY. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MESSAGECOMPRESSION`. | NONE          |

#### YAML snippet

```yaml
messageCompression: NONE
```

### zeebe.gateway.threads

| Field             | Description                                                                                                                                                                                           | Example value |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| managementThreads | Sets the number of threads the gateway will use to communicate with the broker cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_THREADS_MANAGEMENTTHREADS`. | 1             |

#### YAML snippet

```yaml
threads:
  managementThreads: 1
```

### zeebe.gateway.security

| Field                | Description                                                                                                                                                      | Example value |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled              | Enables TLS authentication between clients and the gateway. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_SECURITY_ENABLED`. | False         |
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

| Field   | Description                                                                                                                                      | Example value |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| enabled | Enables long polling for available jobs. This setting can also be overridden using the environment `variable ZEEBE_GATEWAY_LONGPOLLING_ENABLED`. | True          |

#### YAML snippet

```yaml
longPolling:
  enabled: true
```

### zeebe.gateway.interceptors

Consider reading our documentation on [interceptors](self-managed/zeebe-deployment/interceptors.md) first.

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
            <td>Entry point of the interceptor, a class which must:
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
