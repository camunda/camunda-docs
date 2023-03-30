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

#### YAML snippet

```yaml
network:
      host: 0.0.0.0
      port: 26500
      minKeepAliveInterval: 30s
      maxMessageSize: 4MB
```

### zeebe.gateway.cluster

#### YAML snippet

```yaml
cluster:
    initialContactPoints: - 127.0.0.1:26502
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

#### YAML snippet

```yaml
messageCompression: 
```

### zeebe.gateway.threads

#### YAML snippet

```yaml
threads:
    managementThreads: 1
```

### zeebe.gateway.security

#### YAML snippet

```yaml
security:
    enabled: false
    certificateChainPath: null
```

### zeebe.gateway.longPolling

#### YAML snippet

```yaml
longPolling:
    enabled: true
```

### zeebe.gateway.interceptors

#### YAML snippet

```yaml
interceptors:
    id: null
    jarPath: null
    className: null
```
