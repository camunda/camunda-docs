---
id: monitoring
title: "Monitoring"
description: "Web Modeler provides health check and metrics endpoints for monitoring the restapi, webapp, and websocket components in Self-Managed deployments."
---

Web Modeler Self-Managed consists of three components (`restapi`, `webapp`, and `websocket`), each exposing their own endpoints for health monitoring and metrics collection.

## Available endpoints

### `restapi`

The `restapi` component is a Spring Boot application that includes the [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready), providing health check and metrics endpoints out of the box.
These endpoints are served on a separate management port (default: `8091`).

| Endpoint                         | Description        |
| -------------------------------- | ------------------ |
| `<server>:8091/metrics`          | Prometheus metrics |
| `<server>:8091/health/readiness` | Readiness probe    |
| `<server>:8091/health/liveness`  | Liveness probe     |

### `webapp`

The `webapp` component is a Node.js application that exposes health check and metrics endpoints on a dedicated management port (default: `8071`).

| Endpoint                         | Description        |
| -------------------------------- | ------------------ |
| `<server>:8071/metrics`          | Prometheus metrics |
| `<server>:8071/health/readiness` | Readiness probe    |
| `<server>:8071/health/liveness`  | Liveness probe     |

### `websocket`

The `websocket` component provides a basic health check endpoint on its default application port (`8060`).

| Endpoint           | Description  |
| ------------------ | ------------ |
| `<server>:8060/up` | Health check |

:::note
The `websocket` component does not expose a metrics endpoint.
:::

## Using probes in Kubernetes

**Readiness probe:**

```yaml
readinessProbe:
  httpGet:
    path: /health/readiness
    port: 8071
  initialDelaySeconds: 30
  periodSeconds: 30
```

**Liveness probe:**

```yaml
livenessProbe:
  httpGet:
    path: /health/liveness
    port: 8071
  initialDelaySeconds: 30
  periodSeconds: 30
```
