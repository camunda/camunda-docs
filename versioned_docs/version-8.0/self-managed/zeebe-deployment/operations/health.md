---
id: health
title: "Health status"
description: "This document analyzes health status checks and responses."
---

## Gateway

Zeebe gateway exposes three HTTP endpoints to query its health status:

- Health status - `http://{zeebe-gateway}:9600/health`
- Startup probe - `http://{zeebe-gateway}:9600/actuator/health/startup`
- Liveness probe - `http://{zeebe-gateway}:9600/actuator/health/liveness`

(The default port can be changed in the configuration: `{zeebe.gateway.monitoring.port}`)

### Health status

The gateway is healthy if it:

- Started successfully
- Has sufficient free memory and disk space to work with
- Is able to respond to requests within a defined timeout
- Is aware of other nodes in the cluster
- Is aware of leaders for partitions

### Startup probe

The gateway starts if it finished its boot sequence successfully and is ready to receive requests. It no longer starts when it initiates the shutdown sequence.

The started probe can be used as Kubernetes startup probe.

### Liveness probe

The gateway is live if it:

- Started successfully
- Has a minimal amount of free memory and disk space to work with
- Is able to respond to requests within a defined timeout, or misses the timeout for less than 10 minutes
- Is aware of other nodes in the cluster, or lost awareness of other nodes for less than five minutes
- Is aware of leaders for partitions, or lost awareness of partition leaders for less than five minutes

The liveness probe can be used as Kubernetes liveness probe.

### Status responses

Each endpoint returns a status which can be one of the following:

- `UNKNWON` (HTTP status code 200)
- `UP` (HTTP status code 200)
- `DOWN` (HTTP status code 503)
- `OUT_OF_SERVICE` (HTTP status code 503)

If details are enabled (default), the response will also contain additional details.

### Customization

Health indicators are set to sensible defaults. For specific use cases, it might be necessary to [customize health indicators](../configuration/gateway-health-probes.md).
