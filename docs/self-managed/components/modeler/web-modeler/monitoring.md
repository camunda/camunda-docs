---
id: monitoring
title: "Monitoring"
description: "Web Modeler provides health check and metrics endpoints for monitoring the restapi and websocket components in Self-Managed deployments."
---

Web Modeler Self-Managed consists of two components (`restapi` and `websocket`), each exposing their own endpoints for health monitoring and metrics collection.

## Available endpoints

### `restapi`

The `restapi` component is a Spring Boot application that includes the [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready), providing health check and metrics endpoints out of the box.
These endpoints are served on a separate management port (default: `8091`, configurable via Spring Boot's `MANAGEMENT_SERVER_PORT`).

| Endpoint                         | Description        |
| -------------------------------- | ------------------ |
| `<server>:8091/metrics`          | Prometheus metrics |
| `<server>:8091/health/readiness` | Readiness probe    |
| `<server>:8091/health/liveness`  | Liveness probe     |

### `websocket`

The `websocket` component provides a basic health check endpoint on its default application port (`8060`).

| Endpoint           | Description  |
| ------------------ | ------------ |
| `<server>:8060/up` | Health check |

:::note
The `websocket` component does not expose a metrics endpoint.
:::

## Using probes in Kubernetes

For details on setting Kubernetes probe parameters, see [Kubernetes configure probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes).

**Readiness probe:**

```yaml
readinessProbe:
  httpGet:
    path: /health/readiness
    port: 8091
  initialDelaySeconds: 30
  periodSeconds: 30
```

**Liveness probe:**

```yaml
livenessProbe:
  httpGet:
    path: /health/liveness
    port: 8091
  initialDelaySeconds: 30
  periodSeconds: 30
```
