---
id: google-gke-gateway-api
title: "Expose Camunda 8 on GKE with the Gateway API"
sidebar_label: "Gateway API"
description: "Configure the GKE Gateway controller to expose Camunda 8 Self-Managed through the Kubernetes Gateway API and Google Cloud Application Load Balancers."
---

With the [GKE Gateway controller](https://cloud.google.com/kubernetes-engine/docs/concepts/gateway-api), you can expose Camunda 8 Self-Managed through the Kubernetes Gateway API and Google Cloud Application Load Balancers, instead of the classic GKE Ingress.

This guide covers the GKE-specific configuration that complements the general [Gateway API setup](../../configure/ingress/gateway-api-setup.md). For the classic GKE Ingress and its `BackendConfig` health checks, see [Google GKE](google-gke.md).

:::note
The GKE Gateway controller is Google's implementation of the Gateway API. The Camunda Helm chart's Gateway API support is tested with the NGINX Gateway Fabric, so validate this setup in a non-production cluster before you roll it out.
:::

## Prerequisites

- A [VPC-native](https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips) GKE cluster with the HTTP load balancing add-on enabled.
- The Gateway API custom resource definitions (CRDs) and the GKE Gateway controller enabled. Enable both by updating the cluster:

  ```bash
  gcloud container clusters update CLUSTER_NAME --location LOCATION --gateway-api=standard
  ```

- A [proxy-only subnet](https://cloud.google.com/load-balancing/docs/proxy-only-subnets) in the cluster's VPC network when you use a regional or internal GatewayClass.
- The general prerequisites described in [Gateway API setup](../../configure/ingress/gateway-api-setup.md#prerequisites).

## Choose a GatewayClass

The GatewayClass determines which Google Cloud load balancer GKE provisions. Set it with the `global.gateway.className` Helm value. The chart default is `nginx`, so you must change it for GKE.

| GatewayClass                       | Load balancer                               | Use for                                                       |
| ---------------------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| `gke-l7-global-external-managed`   | Global external Application Load Balancer   | External traffic, global routing                              |
| `gke-l7-regional-external-managed` | Regional external Application Load Balancer | External traffic in a single region                           |
| `gke-l7-rilb`                      | Internal Application Load Balancer          | Internal-only traffic, recommended for the Zeebe gRPC gateway |

Regional and internal GatewayClasses require a proxy-only subnet. For the complete list and their capabilities, see the GKE [GatewayClass capabilities](https://cloud.google.com/kubernetes-engine/docs/how-to/gatewayclass-capabilities) reference.

## Configure the Helm chart

Enable the Gateway API integration and set your chosen GatewayClass. The chart then creates the `Gateway`, an `HTTPRoute` per exposed component, and a `GRPCRoute` for the Zeebe gateway.

```yaml
global:
  host: camunda.example.com
  gateway:
    enabled: true
    createGatewayResource: true
    className: gke-l7-global-external-managed
    tls:
      enabled: true
      secretName: camunda-tls
orchestration:
  gateway:
    grpc:
      enabled: true
      host: grpc-camunda.example.com
```

`orchestration.gateway.grpc.enabled` is a separate toggle. Set it to `true` to expose the Zeebe gRPC gateway through a `GRPCRoute`.

When TLS is enabled, the chart configures both the HTTPS and gRPC listeners on port 443 with the same `secretName`. The certificate in that secret must cover both `global.host` and `orchestration.gateway.grpc.host`.

## Configure health checks

On GKE, the Gateway API uses the [`HealthCheckPolicy`](https://cloud.google.com/kubernetes-engine/docs/how-to/configure-gateway-resources#configure_health_checks) resource, not the `BackendConfig` resource used by the classic GKE Ingress.

By default, GKE health-checks the serving port at the `/` path. Several Camunda components serve their health endpoints on a separate management port, so the default health check fails and the load balancer marks the backend unhealthy. Because the load balancer probes the Pod IP directly, set the health check `port` to the component's management container port.

The following `HealthCheckPolicy` targets the Management Identity service on its management port:

```yaml
apiVersion: networking.gke.io/v1
kind: HealthCheckPolicy
metadata:
  name: camunda-identity
  namespace: camunda
spec:
  default:
    config:
      type: HTTP
      httpHealthCheck:
        requestPath: /actuator/health/readiness
        port: 8082
  targetRef:
    group: ""
    kind: Service
    name: camunda-identity
```

The following `HealthCheckPolicy` targets the Zeebe gateway on its management port:

```yaml
apiVersion: networking.gke.io/v1
kind: HealthCheckPolicy
metadata:
  name: camunda-zeebe-gateway
  namespace: camunda
spec:
  default:
    config:
      type: HTTP
      httpHealthCheck:
        requestPath: /actuator/health/readiness
        port: 9600
  targetRef:
    group: ""
    kind: Service
    name: camunda-zeebe-gateway
```

Apply the same pattern to other exposed components, using each component's management port and readiness path. You can confirm both from the component's readiness probe in the rendered chart (`helm template`). A `HealthCheckPolicy` must live in the same namespace as its target service, and that service must also be referenced by a route.

:::note
Resource names depend on your Helm release name. The examples assume a release named `camunda`, which produces services such as `camunda-identity` and `camunda-zeebe-gateway`.
:::

## Enable HTTP/2 for the Zeebe gRPC gateway

The Zeebe gateway uses gRPC, which requires HTTP/2 between the load balancer and the backend. GKE derives the backend protocol from the service `appProtocol` field, but the Helm chart does not set it.

Set `appProtocol` to `kubernetes.io/h2c` on the gRPC port (`26500`) of the `camunda-zeebe-gateway` service. Because the chart has no value for this field, apply it with a Helm [post-renderer](https://helm.sh/docs/topics/advanced/#post-rendering) so it persists across upgrades. The following Kustomize patch sets the field:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: camunda-zeebe-gateway
spec:
  ports:
    - port: 26500
      appProtocol: kubernetes.io/h2c
```

:::warning
Without this `appProtocol`, the load balancer uses HTTP/1.1 to reach the Zeebe gateway and all gRPC requests fail. A plain `kubectl patch` works for a quick test, but a `helm upgrade` reverts it, so use a post-renderer for a durable configuration.
:::

## Separate internal and external exposure

The chart attaches both the HTTP and gRPC listeners to a single `Gateway`, so they share one GatewayClass and one load balancer type. To expose the web applications externally while keeping the Zeebe gRPC gateway internal — the recommended setup, since the Zeebe gateway should not be publicly exposed — manage the gRPC resources yourself.

Disable the chart-managed gRPC route with `orchestration.gateway.grpc.enabled: false`, then create a separate internal `Gateway` with the `gke-l7-rilb` class and your own `GRPCRoute`. For the self-managed pattern, see [scenario D in the Gateway API setup](../../configure/ingress/gateway-api-setup.md#scenario-d-manage-all-resources-yourself).

## Related resources

- [Gateway API setup](../../configure/ingress/gateway-api-setup.md) for the chart-level configuration reference and deployment scenarios.
- [Google GKE](google-gke.md) for the classic GKE Ingress and `BackendConfig` health checks.
- [Kubernetes deployment reference](/self-managed/reference-architecture/kubernetes.md#google-gke) for GKE sizing and load balancer guidance.
- GKE [Configure Gateway resources using Policies](https://cloud.google.com/kubernetes-engine/docs/how-to/configure-gateway-resources) for the full `HealthCheckPolicy` and `GCPBackendPolicy` reference.
