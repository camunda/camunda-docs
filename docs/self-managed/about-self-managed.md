---
id: about-self-managed
title: "Camunda 8 Self-Managed"
---

:::note

Camunda 8 Self-Managed is not Camunda 7. [Find Camunda 7 documentation here](https://docs.camunda.org).

Optimize documentation is available for both Camunda 8 and Camunda 7, including [deployment instructions]($optimize$/self-managed/optimize-deployment/install-and-start). Look for `Camunda 7` badges to help you understand what content is available for each product.

:::

As an alternative to using Camunda 8 through SaaS, you can host it yourself; we call this setup Camunda 8 Self-Managed.

Building process automation solutions with Camunda 8 Self-Managed is similar to working with Camunda 8 SaaS. For more information on Camunda 8 SaaS, visit [What is Camunda 8?](../components/concepts/what-is-camunda-8.md) If you are new to Camunda 8, we recommend you start your journey with [Camunda 8 SaaS-based guides](../../guides/).

The content in this section of the documentation includes:

- Everything you need to download, configure, and work with each component of Camunda 8 Self-Managed.
- Features specific to Camunda 8 Self-Managed.

The following components are available for Camunda 8 Self-Managed:

- Zeebe
- Zeebe Gateway
- Operate
- Tasklist
- Connectors
- Optimize
- Identity (not available in Camunda 8 SaaS)
- Console [<span class="badge badge--enterprise-only">Enterprise only</span>](/../reference/licenses/#console)
- Web Modeler

Camunda 8 Self-Managed users may also use [Desktop Modeler](../components/modeler/desktop-modeler/install-the-modeler) as an addition to these components. Desktop Modeler can be used by process developers to build BPMN diagrams, DMN diagrams, or [Camunda Forms](../guides/utilizing-forms.md) for automation.

Camunda 8 Self-Managed is highly customizable and can be deployed in different setups.

[**Helm/Kubernetes**](/self-managed/setup/overview.md) is the recommended method to deploy Camunda 8, especially in production. Our Helm chart provides many capabilities to customize deployment according to your needs. This page provides a high-level overview of architecture and deployment options.

## Architecture

Camunda 8 Self-Managed has multiple web applications and gRPC services which could be accessed externally using Ingress. The following diagram is the architecture with two Ingress objects, an Ingress with HTTP(S) protocol for all web applications using a single domain, and another Ingress with gRPC protocol for the Zeebe workflow engine:

![Camunda 8 Self-Managed Architecture Diagram - Combined Ingress](./assets/camunda-platform-8-self-managed-architecture-diagram-combined-ingress.png)

In this architecture, Camunda 8 Self-Managed can be accessed as follows:

- Web applications: `https://camunda.example.com/[identity|operate|optimize|tasklist|modeler]`
  - _Note_: Web Modeler also exposes a WebSocket endpoint on `https://camunda.example.com/modeler-ws`. This is only used by the application itself and not supposed to be accessed by users directly.
- Keycloak authentication: `https://camunda.example.com/auth`
- Zeebe gateway: `grpc://zeebe.camunda.example.com`

It's also possible to set up an Ingress for each component. For more details, visit our [combined and separated Ingress setup guide](./setup/guides/ingress-setup.md).

## Deployment

Each component of Camunda 8 Self-Managed can be deployed in single or high-availability mode, which provides minimal to no service interruption. The following diagram represents deployment in high-availability mode:

![Camunda 8 Self-Managed Deployment Diagram](./assets/camunda-platform-8-self-managed-deployment-diagram-high-availability-mode.png)

## Additional considerations

- The Kubernetes resources that don't have a custom configuration like Service and ConfigMap are not in the diagram.
- By default, the deployment requires at least three Kubernetes Nodes to meet the Pod Anti-Affinity constraints.
- For components with Anti-Affinity enabled, like Zeebe Broker, the Kubernetes Nodes should be equal to or greater than the number of the Pod replicas. Otherwise, some of its Pods will not be scheduled and will be in a "Pending" state.

For more details about deployment options, visit [sizing your environment](../components/best-practices/architecture/sizing-your-environment.md#camunda-platform-8-self-managed).
