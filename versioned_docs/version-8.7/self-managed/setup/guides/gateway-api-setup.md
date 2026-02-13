---
id: gateway-api-setup
sidebar_label: Gateway API Setup
title: Configure the Helm chart with Gateway API
description: Set up and configure the Kubernetes Gateway API for Camunda 8 Self-Managed Helm deployments.
---

Use this guide to configure the Camunda 8 Helm chart with the Kubernetes Gateway API instead of a traditional Ingress controller.

The Gateway API provides a modern way to manage Ingress traffic in Kubernetes clusters. It improves on the Ingress API in the following ways:

- Separates cluster operators, who manage Gateway resources, from application developers, who manage HTTPRoute resources.
- Enables configuration of NGINX without relying on labels and annotations, which also helps limit permissions.

  8.9 and later versions of the helm chart will support Gateway API with values.yaml options.

:::note
The Ingress-NGINX controller is planned to reach end of life in March 2026 (see the Kubernetes announcement on Ingress-NGINX retirement). We recommend planning a migration to the Gateway API where it fits your use case.

If you decide not to adopt the Gateway API, you can migrate to a different Ingress controller and continue using the Ingress API. This remains a supported approach.
:::

## Prerequisites

Ensure both are installed in your cluster.

- Gateway API CRDs
- A Gateway API controller

## Gateway controllers

Just like Ingress Controllers, Gateway controllers need to be installed before a cluster can use the Gateway API. [See the list of Gateway API implementations](https://gateway-api.sigs.k8s.io/implementations/) for details.

In testing, we use the [NGINX Gateway Fabric](https://github.com/nginx/nginx-gateway-fabric).

## Implementing the Gateway Resource Types

### Quickstart

The quickest way to get started is to run `helm template` against an 8.9 or later version of the helm chart to grab the resources and modify from there.

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

### Gateway

- [K8s Gateway docs](https://gateway-api.sigs.k8s.io/api-types/gateway/)

Gateway resources are intended to be created by cluster operators to define how traffic can enter the cluster and which controllers are responsible for managing that traffic. They reference a GatewayClass resource, which defines which controller will manage the Gateway and HTTPRoute resources.

#### Example Gateway

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

### ReferenceGrants

- [K8s ReferenceGrant docs](https://gateway-api.sigs.k8s.io/api-types/referencegrant/)

#### Example ReferenceGrant

ReferenceGrants are needed to allow the Gateway Controller to reference the Service resources in the application namespace. This is a security feature of the Gateway API to limit which resources can be referenced by the Gateway and HTTPRoute resources.

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


### HTTPRoute and GRPCRoute

- [K8s HTTPRoute docs](https://gateway-api.sigs.k8s.io/api-types/httproute/)
- [K8s GRPCRoute docs](https://gateway-api.sigs.k8s.io/api-types/grpcroute/)

These routes are intended to be created by application developers exposing endpoints and routing them to specific services.

#### Example HTTPRoute and GRPCRoute

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
