---
id: management-api
title: "Management API"
description: "Zeebe Gateway also exposes an HTTP endpoint for cluster management operations."
---

Besides the [gRPC API](/apis-tools/grpc.md) for process instance execution, Zeebe Gateway also exposes an HTTP endpoint for cluster management operations. This API is not expected to be used by a typical user, but by a privileged user such as a cluster administrator. It is exposed via a different port and configured using configuration `server.port` (or via environment variable SERVER_PORT). By default, this is set to `9600`.

The API is a custom endpoint available via [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/2.0.x/reference/html/production-ready-endpoints.html). For additional configurations such as security, refer to the Spring Boot documentation.

The following operations are currently available:

- [Rebalancing](/self-managed/zeebe-deployment/operations/rebalancing.md)
- [Pause and resume exporting](#exporting-api)

## Exporting API

Exporting API is used:

- As a debugging tool.
- When taking a backup of Camunda 8 (see [backup and restore](/self-managed/backup-restore/backup-and-restore.md)).

### Pause exporting

To pause exporting on all partitions, send the following request to the gateway's management endpoint.

```
POST actuator/exporting/pause
```

When all partitions pause exporting, a successful response is received. If the request fails, some partitions may have paused exporting. Therefore, it is important to either retry until success or revert the partial pause by resuming exporting.

### Resume exporting

After exporting is paused, it must eventually be resumed. Otherwise, the cluster could become unavailable. To resume exporting, send the following request to the gateway's management endpoint:

```
POST actuator/exporting/resume
```

When all partitions have resumed exporting, a successful response is received. If the request fails, only some partitions may have resumed exporting. Therefore, it is important to retry until successful.
