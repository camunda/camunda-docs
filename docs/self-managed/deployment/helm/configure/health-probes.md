---
id: health-probes
sidebar_label: Health probes
title: Configure health probes
description: Turn the startup, readiness, and liveness probes of Camunda components on or off, and change their endpoint and timing with Helm values.
---

Each Camunda component in the Helm chart has `startupProbe`, `readinessProbe`, and `livenessProbe` values. With these values, you can turn a probe on or off and change its endpoint or timing.

By default, the chart enables only the readiness probe of each component. The startup and liveness probes are off.

## Default probe endpoints

For each probe, Kubernetes sends an HTTP GET request to a container port and path. The following table lists the values prefix, the default port, and the default `probePath` of each probe.

| Component              | Values prefix           | Port   | Startup `probePath`          | Readiness `probePath`        | Liveness `probePath`        |
| ---------------------- | ----------------------- | ------ | ---------------------------- | ---------------------------- | --------------------------- |
| Orchestration Cluster  | `orchestration`         | `9600` | `/actuator/health/startup`   | `/actuator/health/readiness` | `/actuator/health/liveness` |
| Management Identity    | `identity`              | `8082` | `/actuator/health`           | `/actuator/health`           | `/actuator/health`          |
| Connectors             | `connectors`            | `8080` | `/actuator/health/readiness` | `/actuator/health/readiness` | `/actuator/health/liveness` |
| Optimize               | `optimize`              | `8090` | `/api/readyz`                | `/api/readyz`                | `/api/readyz`               |
| Camunda Hub REST API   | `camundaHub.restapi`    | `8091` | `/health/liveness`           | `/health/readiness`          | `/health/liveness`          |
| Camunda Hub WebSockets | `camundaHub.websockets` | `8060` | `/up`                        | `/up`                        | `/up`                       |

The following rules apply:

- The `scheme` value defaults to `HTTP`. For Connectors and Optimize, the default is empty. When you enable TLS for the component, the chart uses `HTTPS` for an empty `scheme`. Otherwise, it uses `HTTP`. See [Connectors TLS](./orchestration-tls-modes.md#connectors-tls) and [Optimize TLS](./orchestration-tls-modes.md#optimize-tls).
- The Orchestration Cluster, Connectors, Optimize, and Camunda Hub REST API probes use the `contextPath` value of the component as a path prefix. For Camunda Hub, that value is `camundaHub.contextPath`. Management Identity and Camunda Hub WebSockets probes use `probePath` only.
- Camunda Hub inherits its probe defaults from the `webModeler.restapi` and `webModeler.websockets` values. Values you set under `camundaHub.restapi` and `camundaHub.websockets` take precedence. The chart merges both sets of values key by key. You set only the keys you want to change.

## Probe values

Every probe accepts the same values. The key of a value has three parts: the values prefix from [Default probe endpoints](#default-probe-endpoints), the probe name, and the value name. For example, `orchestration.readinessProbe.periodSeconds`.

| Value                 | Default                                                                     | Description                                                                                                                                  |
| --------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`             | `false` for `startupProbe` and `livenessProbe`, `true` for `readinessProbe` | Adds the probe to the container when `true`.                                                                                                 |
| `scheme`              | `HTTP`. Empty for Connectors and Optimize.                                  | Protocol of the request, `HTTP` or `HTTPS`.                                                                                                  |
| `probePath`           | See [Default probe endpoints](#default-probe-endpoints).                    | Path of the request.                                                                                                                         |
| `initialDelaySeconds` | `30`. `10` for Camunda Hub WebSockets.                                      | Seconds to wait after the container starts before the first probe.                                                                           |
| `periodSeconds`       | `30`                                                                        | Seconds between probes.                                                                                                                      |
| `successThreshold`    | `1`                                                                         | Consecutive successes that mark the probe as successful again after a failure.                                                               |
| `failureThreshold`    | `5`                                                                         | Consecutive failures before Kubernetes marks the pod as not ready (readiness probe) or restarts the container (startup and liveness probes). |
| `timeoutSeconds`      | `1`                                                                         | Seconds after which a probe request counts as failed.                                                                                        |

The timing values match the fields of the same name in the [Kubernetes probe configuration](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes).

## Tune a probe

Set only the values you want to change. The chart keeps the defaults for all other values.

The following example enables the startup probe of the Orchestration Cluster. Kubernetes restarts the container if the probe fails 30 times in a row, 10 seconds apart. Until the startup probe succeeds, Kubernetes doesn't run the readiness and liveness probes.

```yaml
orchestration:
  startupProbe:
    enabled: true
    periodSeconds: 10
    failureThreshold: 30
```

To change a Camunda Hub probe, set the value under `camundaHub`. The following example raises the timeout of the Camunda Hub REST API readiness probe to five seconds:

```yaml
camundaHub:
  restapi:
    readinessProbe:
      timeoutSeconds: 5
```
