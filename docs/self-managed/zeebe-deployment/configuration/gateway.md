---
id: gateway-config
title: "Gateway configuration"
sidebar_label: "Gateway configuration"
description: "Let's analyze how to configure the Zeebe gateway"
---

A complete gateway configuration template is available in the [Zeebe repo](https://github.com/camunda/zeebe/blob/main/dist/src/main/config/gateway.yaml.template).

## Conventions

Take the following conventions into consideration when working with the gateway configuration.

### Byte sizes

For buffers and others must be specified as strings and follow the following format: "10U" where U (unit) must be replaced with KB = Kilobytes, MB = Megabytes or GB = Gigabytes. If unit is omitted then the default unit is simply bytes.

Example:
`sendBufferSize = "16MB"` (creates a buffer of 16 Megabytes)

### Time units

Timeouts, intervals, and the likes, must be specified either in the standard ISO-8601 format used by java.time.Duration, or as strings with the following format: "VU", where:

- V is a numerical value (e.g. 1, 5, 10, etc.)
- U is the unit, one of: ms = Millis, s = Seconds, m = Minutes, or h = Hours

### Paths

Relative paths are resolved relative to the installation directory of the broker.

## Configuration

### zeebe.gateway.network

<table name="network" id="network">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>host</td>
            <td>Sets the host the gateway binds to. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_HOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>port</td>
            <td>Sets the port the gateway binds to. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_PORT`.</td>
            <td>26500</td>
        </tr>
        <tr>
            <td>minKeepAliveInterval</td>
            <td>Sets the minimum keep alive interval. This setting specifies the minimum accepted interval between keep alive pings. This value must be specified as a positive integer followed by 's' for seconds, 'm' for minutes or 'h' for hours. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_MINKEEPALIVEINTERVAL`.</td>
            <td>30s</td>
        </tr>
        <tr>
            <td>maxMessageSize</td>
            <td>Sets the maximum size of the incoming and outgoing messages (i.e. commands and events). Apply the same setting on the broker too, see `ZEEBE_BROKER_NETWORK_MAXMESSAGESIZE`. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_NETWORK_MAXMESSAGESIZE`.</td>
            <td>4MB</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
network:
  host: 0.0.0.0
  port: 26500
  minKeepAliveInterval: 30s
  maxMessageSize: 4MB
```

### zeebe.gateway.cluster

<table name="cluster" id="cluster">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>initialContactPoints</td>
            <td>Sets initial contact points (brokers), which the gateway should contact to. The contact points of the internal network configuration must be specified. The format is [HOST:PORT]. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_INITIALCONTACTPOINTS` specifying a comma-separated list of contact points.</td>
            <td>[ 192.168.1.22:26502, 192.168.1.32:26502 ]</td>
        </tr>
        <tr>
            <td>contactPoint</td>
            <td><b>WARNING: This setting is deprecated! Use initialContactPoints instead.</b> Sets the broker the gateway should initial contact. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_CONTACTPOINT`.</td>
            <td>127.0.0.1:26502</td>
        </tr>
        <tr>
            <td>requestTimeout</td>
            <td>Sets the timeout of requests send to the broker cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_REQUESTTIMEOUT`.</td>
            <td>15s</td>
        </tr>
        <tr>
            <td>clusterName</td>
            <td>Sets name of the Zeebe cluster to connect to. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_CLUSTERNAME`.</td>
            <td>zeebe-cluster</td>
        </tr>
        <tr>
            <td>memberId</td>
            <td>Sets the member id of the gateway in the cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERID`.</td>
            <td>gateway</td>
        </tr>
        <tr>
            <td>host</td>
            <td>Sets the host the gateway node binds to for internal cluster communication. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_HOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>port</td>
            <td>Sets the port the gateway node binds to for internal cluster communication. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_PORT`.</td>
            <td>26502</td>
        </tr>
        <tr>
            <td>advertisedHost</td>
            <td>Controls the advertised host; if omitted defaults to the host. This is particularly useful if your gateway stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_ADVERTISEDHOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>advertisedPort</td>
            <td>Controls the advertised port; if omitted defaults to the port. This is particularly useful if your gateway stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_ADVERTISEDPORT`.</td>
            <td>25602</td>
        </tr>
    </tbody>
</table>

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

<table name="membership" id="membership">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>broadcastUpdates</td>
            <td>Configure whether to broadcast member updates to all members. If set to false updates will be gossiped among the members. If set to true the network traffic may increase but it reduce the time to detect membership changes. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_BROADCASTUPDATES`.</td>
            <td>False</td>
        </tr>
        <tr>
            <td>broadcastDisputes</td>
            <td>Configure whether to broadcast disputes to all members. If set to true the network traffic may increase but it reduce the time to detect membership changes. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_BROADCASTDISPUTES`.</td>
            <td>True</td>
        </tr>
        <tr>
            <td>notifySuspect</td>
            <td>Configure whether to notify a suspect node on state changes. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_NOTIFYSUSPECT`.</td>
            <td>False</td>
        </tr>
        <tr>
            <td>gossipInterval</td>
            <td>Sets the interval at which the membership updates are sent to a random member. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_GOSSIPINTERVAL`.</td>
            <td>250ms</td>
        </tr>
        <tr>
            <td>gossipFanout</td>
            <td>Sets the number of members to which membership updates are sent at each gossip interval. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_GOSSIPFANOUT`.</td>
            <td>2</td>
        </tr>
        <tr>
            <td>probeInterval</td>
            <td>Sets the interval at which to probe a random member. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_PROBEINTERVAL`.</td>
            <td>1s</td>
        </tr>
        <tr>
            <td>probeTimeout</td>
            <td>Sets the timeout for a probe response. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_PROBETIMEOUT`.</td>
            <td>100ms</td>
        </tr>
        <tr>
            <td>suspectProbes</td>
            <td>Sets the number of probes failed before declaring a member is suspect. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_SUSPECTPROBES`.</td>
            <td>3</td>
        </tr>
        <tr>
            <td>failureTimeout</td>
            <td>Sets the timeout for a suspect member is declared dead. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_FAILURETIMEOUT`.</td>
            <td>10s</td>
        </tr>
        <tr>
            <td>syncInterval</td>
            <td>Sets the interval at which this member synchronizes its membership information with a random member. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MEMBERSHIP_SYNCINTERVAL`.</td>
            <td>10s</td>
        </tr>
    </tbody>
</table>

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

<table name="security" id="security">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>enabled</td>
            <td>Enables TLS authentication between this gateway and other nodes in the cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_SECURITY_ENABLED`.</td>
            <td>False</td>
        </tr>
        <tr>
            <td>certificateChainPath</td>
            <td>Sets the path to the certificate chain file. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_SECURITY_CERTIFICATECHAINPATH`.</td>
            <td></td>
        </tr>
        <tr>
            <td>privateKeyPath</td>
            <td>Sets the path to the private key file location. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_SECURITY_PRIVATEKEYPATH`.</td>
            <td></td>
        </tr>
        <tr>
            <td>authentication</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>mode</td>
            <td>Controls which authentication mode is active, supported modes are 'none' and 'identity'. If 'identity' is set, authentication will be done using [camunda-identity](https://docs.camunda.io/docs/self-managed/identity/what-is-identity/), which needs to be configured in the corresponding subsection. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_MODE`.</td>
            <td>none</td>
        </tr>
        <tr>
            <td>identity</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>issuerBackendUrl</td>
            <td>The URL to the auth provider backend, used to validate tokens. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_ISSUERBACKENDURL`.</td>
            <td>http://keycloak:8080/auth/realms/camunda-platform</td>
        </tr>
        <tr>
            <td>audience</td>
            <td>The required audience of the auth token. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_AUDIENCE`.</td>
            <td>zeebe-api</td>
        </tr>
        <tr>
            <td>type</td>
            <td>The identity auth type to apply, one of `keycloak` or `auth0`. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_TYPE`.</td>
            <td>keycloak</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
security:
  enabled: false
  certificateChainPath: null
  privateKeyPath: null
  authentication:
    mode: none
    identity:
    issuerBackendUrl: http://keycloak:8080/auth/realms/camunda-platform
    audience: zeebe-api
    type: keycloak
```

### zeebe.gateway.cluster.messageCompression

This feature is useful when the network latency between the nodes is very high (for example when nodes are deployed in different data centers).

When latency is high, the network bandwidth is severely reduced. Hence enabling compression helps to improve the throughput.

:::caution
When there is no latency enabling this may have a performance impact.
:::

:::note
When this flag is enables, you must also enable compression in standalone broker configuration.
:::

<table name="messageCompression" id="messageCompression">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>messageCompression</td>
            <td>Configure compression algorithm for all messages sent between the gateway and the brokers. Available options are NONE, GZIP and SNAPPY. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_CLUSTER_MESSAGECOMPRESSION`.</td>
            <td>NONE</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
messageCompression: NONE
```

### zeebe.gateway.threads

<table name="threads" id="threads">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>managementThreads</td>
            <td>Sets the number of threads the gateway will use to communicate with the broker cluster. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_THREADS_MANAGEMENTTHREADS`.</td>
            <td>1</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
threads:
  managementThreads: 1
```

### zeebe.gateway.security

<table name="security" id="security">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>enabled</td>
            <td>Enables TLS authentication between clients and the gateway. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_SECURITY_ENABLED`.</td>
            <td>False</td>
        </tr>
        <tr>
            <td>certificateChainPath</td>
            <td>Sets the path to the certificate chain file. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_SECURITY_CERTIFICATECHAINPATH`.</td>
            <td></td>
        </tr>
        <tr>
            <td>privateKeyPath</td>
            <td>Sets the path to the private key file location. This setting can also be overridden using the environment variable `ZEEBE_GATEWAY_SECURITY_PRIVATEKEYPATH`.</td>
            <td></td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
security:
  enabled: false
  certificateChainPath:
  privateKeyPath:
```

### zeebe.gateway.longPolling

<table name="longPolling" id="longPolling">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>enabled</td>
            <td>Enables long polling for available jobs. This setting can also be overridden using the environment `variable ZEEBE_GATEWAY_LONGPOLLING_ENABLED`.</td>
            <td>True</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
longPolling:
  enabled: true
```

### zeebe.gateway.interceptors

Consider reading our documentation on interceptors first.

Each interceptor should be configured with the values described below:

<table name="interceptors" id="interceptors">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example Value</th>
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
              <li>implement [io.grpc.ServerInterceptor](https://grpc.github.io/grpc-java/javadoc/io/grpc/ServerInterceptor.html)</li>
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
