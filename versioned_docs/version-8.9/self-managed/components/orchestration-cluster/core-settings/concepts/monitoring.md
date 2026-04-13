---
id: monitoring
title: "Monitoring"
description: "The Orchestration Cluster includes the Spring Boot Actuator, which provides health checks, metrics, and other monitoring endpoints out of the box.  "
---

The Orchestration Cluster includes the [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready), which provides health checks, metrics, and other monitoring endpoints out of the box.

## Default configuration

By default, the Orchestration Cluster uses the following Actuator configuration (differences noted inline):

```yaml
# Disable default health indicators
# https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-health-indicators
management.health.defaults.enabled: false

# Enable Kubernetes health groups
# https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-kubernetes-probes
management.health.probes.enabled: true # (Operate)
management.endpoint.health.probes.enabled: true # (Tasklist)

# Expose selected Actuator endpoints
management.endpoints.web.exposure.include: health, prometheus, loggers, usage-metrics, backup(s)
```

Operate uses `backup`, while Tasklist uses `backups`.

## Available endpoints

With this configuration, the following endpoints are available in the Orchestration Cluster:

- `<server>:9600/actuator/prometheus` – Prometheus metrics
- `<server>:9600/actuator/health/liveness` – Liveness probe
- `<server>:9600/actuator/health/readiness` – Readiness probe

You can override these defaults by adjusting the configuration parameters.

## Using probes in Kubernetes

For details on setting Kubernetes probe parameters, see [Kubernetes configure probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes).

**Readiness probe:**

```yaml
readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 9600
  initialDelaySeconds: 30
  periodSeconds: 30
```

**Liveness probe:**

```yaml
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 9600
  initialDelaySeconds: 30
  periodSeconds: 30
```
