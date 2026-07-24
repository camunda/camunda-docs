---
id: service-configuration
sidebar_label: Service configuration
title: Configure Kubernetes Service ports
description: Set the Kubernetes Service appProtocol hint per port for Camunda component Services in Self-Managed Helm deployments.
---

The Camunda Helm chart exposes an `appProtocols` value per component that sets the Kubernetes [`appProtocol`](https://kubernetes.io/docs/concepts/services-networking/service/#application-protocol) field on a Service port. Use this when your infrastructure needs an explicit protocol hint instead of relying on protocol sniffing — for example, a GKE NEG-backed Ingress or Gateway handling HTTP/2 cleartext (`h2c`) gRPC traffic to the orchestration cluster gateway.

## AppProtocol per Service port

Each component's `service.appProtocols` value accepts a map of port name to appProtocol value. It's empty by default and doesn't change existing behavior until you set it.

The following components support `appProtocols` (the accepted port names for each component are listed in the last column):

| Component              | Value key                                    | Accepted port names                                 |
| ---------------------- | -------------------------------------------- | --------------------------------------------------- |
| Orchestration cluster  | `orchestration.service.appProtocols`         | `management`, `internal`, `command`, `http`, `grpc` |
| Identity               | `identity.service.appProtocols`              | `http`, `metrics`                                   |
| Optimize               | `optimize.service.appProtocols`              | `http`, `management`                                |
| Connectors             | `connectors.service.appProtocols`            | `server`                                            |
| Web Modeler REST API   | `webModeler.restapi.service.appProtocols`    | `http`, `http-management`                           |
| Web Modeler WebSockets | `webModeler.websockets.service.appProtocols` | `http`                                              |

Example — setting the orchestration cluster gRPC gateway port to use `kubernetes.io/h2c` for HTTP/2 cleartext framing:

```yaml
orchestration:
  service:
    appProtocols:
      grpc: kubernetes.io/h2c
```
