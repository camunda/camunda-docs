---
id: gateway-health-probes
title: "Gateway health probes"
description: "This section outlines health status, probes, and responsiveness."
---

The health status for a standalone gateway is available at `{zeebe-gateway}:9600/actuator/health`.

The following health indicators are enabled by default:

- **Gateway Started** - Checks if the gateway is running (i.e. not currently starting and not yet shut down).
- **Gateway Responsive** - Checks if the gateway can handle a request within a given timeout.
- **Gateway Cluster Awareness** - Checks if the gateway is aware of other nodes in the cluster.
- **Gateway Partition Leader Awareness** - Checks if the gateway is aware of partition leaders in the cluster.
- **Disk Space** - Checks that the free disk space is greater than 10 MB.
- **Memory** - Checks that at least 10% of max memory (heap) is still available.

Health indicators are set to sensible defaults. For specific use cases, it might be necessary to customize health probes.

## Startup probe

The started probe is available at `{zeebe-gateway}:9600/actuator/health/startup`.

In the default configuration this is merely an alias for the **Gateway Started** health indicator. Other configurations are possible (see below).

## Liveness probe

The liveness probe is available at `{zeebe-gateway}:9600/actuator/health/liveness`.

It is based on the health indicators mentioned above.

In the default configuration, the liveness probe is comprised of the following health indicators:

- **Gateway Started** - Checks if the gateway is running (i.e. not currently starting and not yet shut down).
- **Liveness Gateway Responsive** - Checks if the gateway can handle a request within an ample timeout, but will only report a `DOWN` health status after the underlying health indicator is down for more than 10 minutes.
- **Liveness Gateway Cluster Awareness** - Based on gateway cluster awareness, but will only report a `DOWN` health status after the underlying health indicator is down for more than five minutes.
- **Liveness Gateway Partition Leader Awareness** - Based on gateway partition leader awareness, but will only report a `DOWN` health status after the underlying health indicator is down for more than five minutes.
- **Liveness Disk Space** - Checks that the free disk space is greater than 1 MB.
- **Liveness Memory** - Checks that at least 1% of max memory (heap) is still available.

:::note
Health indicators with the _liveness_ prefix are intended to be customized for the liveness probe. This allows defining tighter thresholds (e.g. for free memory 1% for liveness vs. 10% for health), as well as adding tolerance for short downtimes (e.g. gateway has no awareness of other nodes in the cluster for more than five minutes).
:::

## Customizing health probes

Global settings for all health indicators:

- `management.health.defaults.enabled=true` - Enables (default) or disables all health indicators.
- `management.endpoint.health.show-details=always/never` - Toggles whether a summary or details (default) of the health indicators will be returned.

### Startup probe

Settings for started probe:

- `management.endpoint.health.group.startup.show-details=never` - Toggles whether a summary (default) or details of the startup probe will be returned.
- `management.endpoint.health.group.startup.include=gatewayStarted` - Defines which health indicators are included in the startup probe.

### Liveness probe

Settings for liveness probe:

- `management.endpoint.health.group.liveness.show-details=never` - Toggles whether a summary (default) or details of the liveness probe will be returned.
- `management.endpoint.health.group.liveness.include=gatewayStarted,livenessGatewayResponsive,livenessGatewayClusterAwareness,livenessGatewayPartitionLeaderAwareness,livenessDiskSpace,livenessMemory` - Defines which health indicators are included in the liveness probe.

:::note
The individual contributing health indicators of the liveness probe can be configured as well (see below).
:::

### Gateway started

Settings for gateway started health indicator:

- `management.health.gateway-started.enabled=true` - Enables (default) or disables this health indicator.

### Gateway responsive

Settings for gateway responsiveness health indicator:

- `management.health.gateway-responsive.enabled=true` - Enables (default) or disables this health indicator.
- `management.health.gateway-responsive.requestTimeout=500ms` - Defines the timeout for the request; if the test completes before the timeout, the health status is `UP`, otherwise it is `DOWN`.
- `management.health.liveness.gateway-responsive.requestTimeout=5s` - Defines the timeout for the request for liveness probe; if the request completes before the timeout, the health status is `UP`.
- `management.health.liveness.gateway-responsive.maxdowntime=10m` - Defines the maximum downtime before the liveness health indicator for responsiveness will flip.

### Gateway cluster awareness

Settings for gateway cluster awareness health indicator:

- `management.health.gateway-clusterawareness.enabled=true` - Enables (default) or disables this health indicator (and its liveness counterpart).
- `management.health.liveness.gateway-clusterawareness.maxdowntime=5m` - Defines the maximum downtime before the liveness health indicator for cluster awareness will flip. In other words, this health indicator will report `DOWN` after the gateway was unaware of other members in the cluster for more than five minutes.

### Gateway partition leader awareness

Settings for gateway partition leader awareness health indicator:

- `management.health.gateway-partitionleaderawareness.enabled=true` - Enables (default) or disables this health indicator (and its liveness counterpart).
- `management.health.liveness.gateway-partitionleaderawareness.maxdowntime=5m` - Defines the maximum downtime before the liveness health indicator for partition leader awareness will flip. In other words, this health indicator will report `DOWN` after the gateway was unaware of partition leaders for more than five minutes.

### Disk space

This is arguably the least critical health indicator given the standalone gateway does not write to disk. The only exception may be the writing of log files, which depend on the log configuration.

Settings for disk space health indicator:

- `management.health.diskspace.enabled=true` - Enables (default) or disables this health indicator (and its liveness counterpart).
- `management.health.diskspace.threshold=10MB` - Defines the threshold for the required free disk space.
- `management.health.diskspace.path=.` - Defines the path for which the free disk space is examined.
- `management.health.liveness.diskspace.threshold=1MB` - Defines the threshold for the required free disk space for liveness.
- `management.health.liveness.diskspace.path=.` - Defines the path for which the free disk space for liveness is examined.

### Memory

This health indicator examines free memory (heap).

Settings for memory health indicator:

- `management.health.memory.enabled=true` - Enables (default) or disables this health indicator (and its liveness counterpart).
- `management.health.memory.threshold=0.1` - Defines the threshold for the required free memory. The default is 0.1 which is interpreted as 10% of max memory.
- `management.health.liveness.memory.threshold=0.01` - Defines the threshold for the required free memory for liveness. The default is 0.01 which is interpreted as 10 of max memory.
