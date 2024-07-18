---
id: overview
title: "Camunda 8 installation overview"
sidebar_label: "Overview"
description: "This chapter contains information for users who want to deploy and run Camunda 8 Self-Managed in their self-controlled cloud or own hardware."
keywords: ["camunda download"]
---

This guide contains information for users who want to install, deploy, and upgrade Camunda 8 Self-Managed, typically in their self-controlled cloud (public or private) or on their own hardware.

## Components

- Zeebe Broker and Gateway
- Operate
- Tasklist
- Connectors
- Optimize
- Identity
- Web Modeler
- Console [<span class="badge badge--enterprise-only">Enterprise only</span>](../../../reference/licenses/#console-sm)

All components except Web Modeler and Console are single Java applications. Depending on your needs, you might not need all of the above components to successfully use Camunda 8.

Camunda 8 Self-Managed users may also use [Desktop Modeler](../components/modeler/desktop-modeler/install-the-modeler) as an addition to these components. Desktop Modeler can be used by process developers to build BPMN diagrams, DMN diagrams, or [Camunda Forms](../../guides/utilizing-forms.md) for automation.

:::note

To obtain or retrieve your Camunda 8 credentials for Enterprise licenses, visit the [contact page](/contact).

:::

## Supported environments

For details on supported environments (e.g. Java or Elasticsearch versions), see [supported environments](/reference/supported-environments.md).

## Deployment options

- [**Helm/Kubernetes**](./install.md): We recommend using Kubernetes and Helm to deploy and run Camunda 8 Self-Managed in production. With the right configuration, Camunda 8 Self-Managed can be deployed on any Certified Kubernetes distribution (cloud or on-premise). We also officially support a variety of providers like [Red Hat OpenShift](./deploy/openshift/redhat-openshift.md) and [Amazon EKS](./deploy/amazon/amazon-eks/).
- [**Docker**](./deploy/other/docker.md): Component [Docker images](https://hub.docker.com/u/camunda) are available for use in production. A Docker Compose configuration is also provided for local development, and is **not** optimized for production usage. You can find setup instructions in the [camunda-platform](https://github.com/camunda/camunda-platform) repository.
- [**Manual**](./deploy/local/manual.md): The Java applications can run on a local or virtual machine if it provides a supported Java Virtual Machine (JVM). This allows you to run Camunda on virtual machines or bare metal and offers a significant amount of flexibility. However, you will need to configure the details for the components to interact correctly yourself. We consider this a last resort. Note that Windows/Mac is **not** supported for production usage of Zeebe.

For more details on deployment, see [sizing your environment](../../components/best-practices/architecture/sizing-your-environment.md#camunda-8-self-managed).
