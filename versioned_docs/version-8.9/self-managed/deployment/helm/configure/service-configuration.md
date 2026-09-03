---
id: service-configuration
sidebar_label: Service configuration
title: Configure Kubernetes Service ports
description: Set the Kubernetes Service appProtocol hint per port for Camunda component Services in Self-Managed Helm deployments.
---

The Camunda Helm chart exposes an `appProtocols` value per component that sets the Kubernetes [`appProtocol`](https://kubernetes.io/docs/concepts/services-networking/service/#application-protocol) field on a Service port. Use this when your infrastructure needs an explicit protocol hint instead of relying on protocol sniffing. For example, a GKE NEG-backed Ingress or Gateway handling HTTP/2 cleartext (`h2c`) gRPC traffic to the orchestration cluster gateway.

## `appProtocol` per Service port

Each component's `service.appProtocols` value accepts a map of logical port key to `appProtocol` value. It's empty by default and doesn't change existing behavior until you set it.

The following components support `appProtocols` (the accepted logical port keys for each component are listed in the last column). These keys are fixed and don't change if you override a component's `*Name` value (for example, `orchestration.service.grpcName`). Always use the logical key (`grpc`), not the renamed Service port. Setting a key outside the accepted list fails the Helm render instead of being silently ignored.

| Component              | Value key                                    | Accepted logical port keys                          |
| ---------------------- | -------------------------------------------- | --------------------------------------------------- |
| Orchestration cluster  | `orchestration.service.appProtocols`         | `management`, `internal`, `command`, `http`, `grpc` |
| Console                | `console.service.appProtocols`               | `http`, `management`                                |
| Identity               | `identity.service.appProtocols`              | `http`, `metrics`                                   |
| Optimize               | `optimize.service.appProtocols`              | `http`, `management`                                |
| Connectors             | `connectors.service.appProtocols`            | `server`                                            |
| Web Modeler REST API   | `webModeler.restapi.service.appProtocols`    | `http`, `http-management`                           |
| Web Modeler WebSockets | `webModeler.websockets.service.appProtocols` | `http`                                              |

Example: set the orchestration cluster gRPC gateway port to use `kubernetes.io/h2c` for HTTP/2 cleartext framing:

```yaml
orchestration:
  service:
    appProtocols:
      grpc: kubernetes.io/h2c
```
