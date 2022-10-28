---
id: overview
title: "Camunda Platform 8 Self-Managed Architecture"
sidebar_label: "Overview"
---

Camunda Platform 8 Self-Managed is highly customizable and could be deployed in different setups.
[**Helm/Kubernetes**](../platform-deployment/helm-kubernetes/overview.md) is the recommended method to deploy Camunda Platform 8, especially in production. Our Helm chart provides many capabilities to customize deployment according to your needs. This page aims to provide a high-level overview about the architecture and deployment options.

## Architecture

Camunda Platform 8 Self-Managed has multiple web applications and gRPC services which could be accessed externally using Ingress. The following is the architecture diagram with two Ingress objects, an Ingress with HTTP(S) protocol for all web applications using a single domain and another Ingress with gRPC protocol for Zeebe workflow engine.

![Camunda Platform 8 Self-Managed Architecture Diagram - Combined Ingress](./assets/camunda-platform-8-self-managed-architecture-diagram-combined-ingress.png)

In this architecture, Camunda Platform 8 Self-Managed could be accessed as following:

- Web applications: https://camunda.example.com/[identity|operate|optimize|tasklist]
- Keycloak authentication: https://camunda.example.com/auth
- Zeebe Gateway: grpc://zeebe.camunda.example.com

It's also possible to setup an Ingress for each component. For more details, visit [combined and separated Ingress setup guide](../platform-deployment/helm-kubernetes/guides/ingress-setup.md).

## Deployment

Each component of Camunda Platform 8 Self-Managed could be deployed in single or high-availability mode which provide minimal to no service interruption. The following is the deployment diagram in high-availability mode.

![Camunda Platform 8 Self-Managed Deployment Diagram](./assets/camunda-platform-8-self-managed-deployment-diagram-high-availability-mode.png)

**Notes**

- The Kubernetes resources that don't have a custom configuration like Service and ConfigMap are not in the diagram.
- By default, the deployment requires at least 3 Kubernetes Nodes to meet the Pod Anti-Affinity constraints.
- For components with Anti-Affinity enabled, like Zeebe Broker, the Kubernetes Nodes should be equal to or greater than the number of the Pod replicas. Otherwise, some of its Pods will not be scheduled and will be in a "Pending" state.

For more details about deployment options, visit [Sizing your environment - Camunda Platform 8 Self-Managed](../../components/best-practices/architecture/sizing-your-environment.md#camunda-platform-8-self-managed).
