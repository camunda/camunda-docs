---
id: health
title: "Health status"
description: "This document analyzes health status checks and responses."
---

## Broker

The Zeebe Broker exposes three HTTP endpoints to query its health status:

- Startup check
- Ready check
- Health check

### Startup check

Startup check endpoint is exposed via `http://{zeebe-broker-host}:9600/actuator/health/startup`.
This endpoint returns a 200 response. If it is not ready, it will return a 503 error.

A broker has successfully started when:

- The broker has found other brokers in the cluster.
- All partitions owned by this broker have started and participate in replication.
- Other necessary services have started.

A successful startup does not mean the broker is ready to process requests.
The broker is ready only after startup has successfully completed.

### Ready check

Ready check endpoint is exposed via `http://{zeebe-broker-host}:9600/actuator/health/readiness`.
This endpoint returns a 200 response. If it is not ready, it will return a 503 error.

A broker is ready when it installs all necessary services to start processing in all partitions.
If a broker is ready, it doesn't mean it's the leader for the partitions.
It means it is participating in the replication and can be either a leader or a follower of all the partitions that are assigned to it.
Once it is ready, it never becomes unready again.

A ready check is useful, for example, to use as a `readinessProbe` in a Kubernetes configuration to control when a pod can be restarted for rolling update.
Depending on the cluster configuration, restarting one pod before the previous one is ready might make the system unavailable because the quorum of replicas is not available.
By configuring a `readinessProbe` that uses the ready check endpoint, we can inform Kubernetes when it is safe to proceed with the rolling update.

### Health check

Health check endpoint is exposed via `http://{zeebe-broker-host}:9600/actuator/health/status`.
This endpoint returns a 200 response if the broker is healthy. If it is not healthy, it will return a 503 error.
A broker is never healthy before it is ready.
Unlike ready check, a broker can become unhealthy after it is healthy.
Hence, it gives a better status of a running broker.

A broker is healthy when it can process processes, accept commands, and perform all its expected tasks.
If it is unhealthy, it may mean three things:

- **It is only temporarily unhealthy**: For example, due to environmental circumstances such as temporary I/O issues.
- **It is partially unhealthy**: One or more partitions could be unhealthy, while the rest of them are able to process processes.
- **It is completely dead**

[Metrics](metrics.md) give more insight into which partition is healthy or unhealthy.
When a broker becomes unhealthy, it's recommended to check the logs to see what went wrong.

(The default broker port can be configured using environment variables - respectively `MANAGEMENT_SERVER_PORT` and `MANAGEMENT_SERVER_ADDRESS` - or system properties - respectively `-Dmanagement.server.port=` or `-Dmanagement.server.address=` - to configure them)

## Gateway

The Zeebe Gateway exposes three HTTP endpoints to query its health status:

- Health status - `http://{zeebe-gateway}:9600/actuator/health`
- Startup probe - `http://{zeebe-gateway}:9600/actuator/health/startup`
- Liveness probe - `http://{zeebe-gateway}:9600/actuator/health/liveness`

(The default port can be changed in the configuration: `{zeebe.gateway.monitoring.port}`)

### Health status

The gateway is **healthy** if it:

- Started successfully
- Has sufficient free memory and disk space to work with
- Is able to respond to requests within a defined timeout
- Is aware of other nodes in the cluster
- Is aware of leaders for partitions
- All its partitions are healthy

The gateway is **degraded** if it also meets the **healthy** standards above, with the exception that at least **one** partition is healthy instead of **all** partitions.

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

- `UNKNOWN` (HTTP status code 200)
- `UP` (HTTP status code 200)
- `DOWN` (HTTP status code 503)
- `OUT_OF_SERVICE` (HTTP status code 503)

If details are enabled (default), the response will also contain additional details.

### Customization

Health indicators are set to sensible defaults. For specific use cases, it might be necessary to [customize health indicators](../configuration/gateway-health-probes.md).
