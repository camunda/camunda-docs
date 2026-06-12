---
id: gateway-api-setup
sidebar_label: With Gateway API
title: Configure the Helm chart with Gateway API
description: Set up and configure the Kubernetes Gateway API for Camunda 8 Self-Managed Helm deployments.
---

Use this guide to configure the Camunda 8 Helm chart with the Kubernetes Gateway API instead of a traditional Ingress controller.

The Gateway API provides a modern way to manage inbound traffic in Kubernetes clusters. It improves on the Ingress API in the following ways:

- Separates cluster operators, who manage Gateway resources, from application teams, who manage HTTPRoute resources.
- Enables fine-grained traffic configuration without relying on controller-specific annotations.

:::note
The Ingress-NGINX controller is planned to reach end of life in March 2026 (see [the Kubernetes announcement on Ingress-NGINX retirement](https://www.kubernetes.dev/blog/2025/11/12/ingress-nginx-retirement/)). Plan a migration to the Gateway API where it fits your use case.

If you decide not to adopt the Gateway API, you can migrate to a different Ingress controller and continue using the Ingress API. This remains a supported approach.
:::

## Prerequisites

Ensure the following are installed in your cluster before enabling the Gateway API in the Helm chart:

- Gateway API CRDs
- A Gateway API controller

See the [list of Gateway API implementations](https://gateway-api.sigs.k8s.io/implementations/) for available controllers. In testing, we use the [NGINX Gateway Fabric](https://github.com/nginx/nginx-gateway-fabric).

## Deployment scenarios

Choose the scenario that matches your cluster setup.

### Scenario A: Gateway and Camunda in the same namespace (default)

This is the simplest setup. The chart creates the Gateway resource alongside all Camunda components in the same Kubernetes namespace. No cross-namespace configuration is needed.

Use this scenario when you're deploying a single Camunda installation and have full control of the namespace.

```yaml
global:
  host: "camunda.example.com"
  gateway:
    enabled: true
    createGatewayResource: true
    className: nginx
```

The chart creates:

- A `Gateway` resource in the release namespace, referencing the `nginx` GatewayClass
- An `HTTPRoute` and optionally a `GRPCRoute` per enabled component, all referencing the Gateway by name in the same namespace
- A `ReferenceGrant` in the release namespace (permits any routes in the same namespace to reach Camunda services)

### Scenario B: Shared Gateway in a different namespace

Use this scenario when a shared Gateway already exists in a separate namespace (for example, `shared-infra`) and multiple teams or Camunda releases attach their routes to it. This is common in platform-as-a-service setups where a central networking team manages all Gateways.

```yaml
global:
  host: "camunda.example.com"
  gateway:
    enabled: true
    createGatewayResource: false
    name: shared-gateway
    namespace: shared-infra
    className: nginx
```

`global.gateway.name` sets the Gateway name in the `parentRefs` of every Route. `global.gateway.namespace` adds the cross-namespace reference so Kubernetes can locate the Gateway in `shared-infra`. Both are required when the shared Gateway has a different name or namespace than the Camunda release.

The chart creates:

- `HTTPRoute` and `GRPCRoute` resources in the release namespace, with `parentRefs[].namespace: shared-infra`
- A `ReferenceGrant` in the release namespace

The chart does **not** create or modify the Gateway in `shared-infra`. Before deploying, ask your cluster administrator to configure the Gateway to accept routes from your release namespace by setting `spec.listeners[].allowedRoutes.namespaces` on the Gateway in `shared-infra`.

The simplest option is `from: All`, which accepts routes from any namespace:

```yaml
spec:
  listeners:
    - name: http
      port: 80
      protocol: HTTP
      allowedRoutes:
        namespaces:
          from: All
```

For tighter control, use `from: Selector` with a namespace label. Kubernetes automatically applies the `kubernetes.io/metadata.name` label to all namespaces (Kubernetes 1.21 and later):

```yaml
allowedRoutes:
  namespaces:
    from: Selector
    selector:
      matchLabels:
        kubernetes.io/metadata.name: <your-camunda-namespace>
```

### Scenario C: Use a pre-existing Gateway in the same namespace

Use this scenario when a Gateway already exists in your release namespace (for example, managed by a separate Helm release or your platform team) and you don't want the chart to create or overwrite it.

```yaml
global:
  host: "camunda.example.com"
  gateway:
    enabled: true
    createGatewayResource: false
    className: nginx
```

The chart creates:

- `HTTPRoute` and `GRPCRoute` resources referencing the Gateway by name within the same namespace
- A `ReferenceGrant` in the release namespace

The Gateway resource name the chart looks for matches the Helm release name (for example, `camunda-platform` for a release named `camunda-platform`).

### Scenario D: Manage all resources yourself

Use this scenario when you want to manage all Gateway API resources outside the chart. No Gateway, HTTPRoute, GRPCRoute, or ReferenceGrant objects are created.

```yaml
global:
  gateway:
    enabled: true
    external: true
```

You are responsible for creating all resources that expose Camunda's services.

## Configuration reference

| Parameter                              | Type    | Default | Description                                                                                                                                                                                                                                                                            |
| -------------------------------------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global.host`                          | string  | `""`    | The external hostname where Camunda is reachable. Used as the `hostname` on the Gateway listener and as the `hostnames` field in each Route.                                                                                                                                           |
| `global.gateway.enabled`               | boolean | `false` | Enable the Kubernetes Gateway API integration. When `false`, no Gateway API resources are created regardless of other settings.                                                                                                                                                        |
| `global.gateway.createGatewayResource` | boolean | `false` | Create the `Gateway` CustomResource as part of this Helm release. Set to `true` when you want the chart to own the Gateway (Scenario A). Set to `false` if a Gateway already exists in the target namespace or in a separate namespace.                                                |
| `global.gateway.external`              | boolean | `false` | Skip creating all Gateway API resources (Gateway, Routes, and ReferenceGrant). Use this when you manage all networking resources yourself.                                                                                                                                             |
| `global.gateway.className`             | string  | `""`    | The name of the `GatewayClass` resource that tells the cluster which Gateway controller manages this Gateway.                                                                                                                                                                          |
| `global.gateway.labels`                | map     | `{}`    | Labels added to the Gateway and all Route resources.                                                                                                                                                                                                                                   |
| `global.gateway.annotations`           | map     | `{}`    | Annotations added to the Gateway and all Route resources.                                                                                                                                                                                                                              |
| `global.gateway.tls.enabled`           | boolean | `false` | Enable TLS on the Gateway listener. Requires `global.gateway.tls.secretName` to be set.                                                                                                                                                                                                |
| `global.gateway.tls.secretName`        | string  | `""`    | Name of the Kubernetes `Secret` containing the TLS certificate and private key.                                                                                                                                                                                                        |
| `global.gateway.name`                  | string  | `""`    | The name of the Gateway resource that Routes attach to. Defaults to the Helm release fullname when unset. Set this when the shared Gateway has a different name than your release (Scenario B).                                                                                        |
| `global.gateway.namespace`             | string  | `""`    | The namespace where the Gateway resource lives. Set this only when using a shared Gateway in a different namespace than your Camunda components (see [Scenario B](#scenario-b-shared-gateway-in-a-different-namespace)). When unset, Kubernetes defaults to the Route's own namespace. |
| `global.gateway.controllerNamespace`   | string  | `""`    | The namespace from which an external controller or operator creates Routes that reference Camunda services. The chart uses this value in the `ReferenceGrant`'s `from.namespace` field. Leave unset if your Routes are created by this chart.                                          |

## Additional configuration

### TLS

To enable HTTPS, add a TLS certificate to a Kubernetes Secret and reference it:

```yaml
global:
  host: "camunda.example.com"
  gateway:
    enabled: true
    createGatewayResource: true
    className: nginx
    tls:
      enabled: true
      secretName: camunda-tls
```

When TLS is enabled, the chart configures the Gateway listener on port 443 with `protocol: HTTPS` and sets `sectionName: https` on all HTTPRoutes, and sets `sectionName: grpcs` on the GRPCRoute (used by Zeebe).

### NGINX Gateway Fabric: ProxySettingsPolicy

If you are using the NGINX Gateway Fabric, the default proxy buffer size is likely too small for Camunda. You may see errors such as:

> 502: upstream sent too big header while reading response header from upstream

Install the `ProxySettingsPolicy` CRD ([CRD location](https://github.com/nginx/nginx-gateway-fabric/tree/main/config/crd/bases)) and apply the following resource in your Camunda namespace:

```yaml
apiVersion: gateway.nginx.org/v1alpha1
kind: ProxySettingsPolicy
metadata:
  name: camunda-platform
  namespace: camunda
spec:
  buffering:
    bufferSize: 128k
    buffers:
      number: 8
      size: 128k
    busyBuffersSize: 256k
  targetRefs:
    - group: gateway.networking.k8s.io
      kind: Gateway
      name: camunda-platform
```

See the [ProxySettingsPolicy documentation](https://docs.nginx.com/nginx-gateway-fabric/traffic-management/proxy-settings/) for details.
