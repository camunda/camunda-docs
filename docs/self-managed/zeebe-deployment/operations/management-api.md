---
id: management-api
title: "Management API"
description: "Additional cluster management API"
---

Besides the [gRPC API](/apis-clients/grpc.md) for process instance execution, Zeebe Gateway also exposes an HTTP endpoint for cluster management operations. This API is not expected to be used by a normal user, but by a privileged user such as a cluster administrator. It is exposed via a different port which is configured using configuration `server.port` (or via environment variable SERVER_PORT). By default, this is set to `9600`.

The API is a custom endpoint available via [Spring boot actuators](https://docs.spring.io/spring-boot/docs/2.0.x/reference/html/production-ready-endpoints.html). For additional configurations such as security, please refer to the Spring Boot documentation.

Following operations are available now:

- [Rebalancing](/self-managed/zeebe-deployment/operations/rebalancing.md)
- [Pause and Resume Exporting](#exporting-api)

## Exporting API

This is used:

- As a debugging tool.
- When taking a backup of Camunda Platform 8 (see [Backup & Restore](/self-managed/backup-restore/backup-and-restore.md)).

### Pause Exporting

To pause exporting on all partitions, send the following request to the gateway's management endpoint.

```
POST actuator/exporting/pause
```

When a successful response is received, all partitions have paused exporting. If the request fails, some partitions may have paused exporting. So it is important to either retry until success or revert the partial pause by resuming exporting.

### Resume Exporting

After the exporting is paused, it must be resumed eventually. Otherwise, it could lead to the cluster being unavailable. To resume exporting, send the following request to the gateway's management endpoint.

```
POST actuator/exporting/resume
```

When a successful response is received, all partitions have resumed exporting. If the request fails, only some partitions may have resumed exporting, so it is important to retry them until successful.
