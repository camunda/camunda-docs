---
id: gateway-api-setup
sidebar_label: With Gateway API
title: Configure the Helm chart with Gateway API
description: Configure the Camunda 8 Self-Managed Helm chart to use the Kubernetes Gateway API.
---

Configure the Camunda 8 Self-Managed Helm chart to use the Kubernetes Gateway API instead of a traditional Ingress controller for modern, secure traffic routing in Kubernetes clusters.

## About

The Gateway API provides a modern way to manage Ingress traffic in Kubernetes clusters. It improves on the Ingress API in the following ways:

- Separates cluster operators, who manage Gateway resources, from application developers, who manage HTTPRoute resources.
- Enables configuration of NGINX without relying on labels and annotations, which also helps limit permissions.

:::important
The Ingress-NGINX controller is planned to reach end of life in March 2026 (see the Kubernetes announcement on Ingress-NGINX retirement). Plan a migration to the Gateway API where it fits your use case.

If you decide not to adopt the Gateway API, you can migrate to a different Ingress controller and continue using the Ingress API. This remains a supported approach.
:::

## Prerequisites

Ensure the following are installed in your cluster:

- Gateway API CRDs.
- A Gateway API controller.

## Gateway controllers

Just like Ingress controllers, Gateway controllers must be installed before a cluster can use the Gateway API. See [Gateway API implementations](https://gateway-api.sigs.k8s.io/implementations/) for details.

In testing, Camunda uses the [NGINX Gateway Fabric](https://github.com/nginx/nginx-gateway-fabric).

## Implement gateway resource types

### Quickstart

Get started by running the `helm template` command against version 8.9 or later of the Helm chart to generate the resources, then modify them as needed. See the following command example:

```bash
helm template camunda camunda/camunda-platform \
  --version 14.0.0 \
  --set global.host=example.com \
  --set global.gateway.enabled=true \
  --set global.gateway.createGatewayResource=true \
  --set orchestration.data.secondaryStorage.type=elasticsearch \
  --show-only templates/orchestration/httproute.yaml \
  --show-only templates/orchestration/grpcroute.yaml \
  --show-only templates/common/referencegrant.yaml \
  --show-only templates/common/gateway.yaml
```

### `Gateway`

Gateway resources are intended to be created by cluster operators to define how traffic enters the cluster and which controllers are responsible for managing it.
They reference a `GatewayClass` resource, which defines which controller will manage the gateway and `HTTPRoute` resources.

Here's an example:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: camunda-camunda-platform
  annotations:
spec:
  gatewayClassName: nginx
  listeners:
    - name: http
      port: 80
      protocol: HTTP
      hostname: example.com
    - name: grpc
      port: 80
      protocol: HTTP
      hostname: grpc-example.com
```

See [Kubernetes Gateway](https://gateway-api.sigs.k8s.io/api-types/gateway/) for more details.

### `ReferenceGrants`

`ReferenceGrants` allow the gateway controller to reference service resources in the application namespace.
This Gateway API security feature limits which resources the gateway and `HTTPRoute` resources can reference.

Here's an example:

```yaml
kind: ReferenceGrant
apiVersion: gateway.networking.k8s.io/v1beta1
metadata:
  name: camunda-camunda-platform
spec:
  from:
    - group: gateway.networking.k8s.io
      kind: HTTPRoute
      namespace: NAMESPACE
  to:
    - group: ""
      kind: Service
```

See [Kubernetes `ReferenceGrant`](https://gateway-api.sigs.k8s.io/api-types/referencegrant/) for more details.

### `HTTPRoute` and `GRPCRoute`

These routes are intended to be created by application developers to expose endpoints and route them to specific services.

Here's an example:

```yaml
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: orchestration
  annotations:
spec:
  parentRefs:
    - name: camunda-camunda-platform
      sectionName: http
  hostnames:
    - "example.com"
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /orchestration
      backendRefs:
        - name: camunda-zeebe-gateway
          namespace: NAMESPACE
          port: 8080
---
apiVersion: gateway.networking.k8s.io/v1
kind: GRPCRoute
metadata:
  name: camunda-camunda-platform-grpc
  annotations:
spec:
  parentRefs:
    - name: camunda-camunda-platform
  hostnames:
    - "grpc-example.com"
  rules:
    - backendRefs:
        - name: camunda-zeebe-gateway
          namespace: NAMESPACE
          port: 26500
```

See [Kubernetes `HTTPRoute`](https://gateway-api.sigs.k8s.io/api-types/httproute/) and [Kubernetes `GRPCRoute`](https://gateway-api.sigs.k8s.io/api-types/grpcroute/) for more details.
