---
id: overview
title: "Camunda 8 installation overview"
sidebar_label: "Overview"
description: "This chapter contains information for users who want to deploy and run Camunda 8 Self-Managed in their self-controlled cloud or own hardware."
keywords: ["camunda download"]
---

This chapter contains information for users who want to deploy and run Camunda 8 Self-Managed, typically in their self-controlled cloud (public or private) or even on their own hardware.

## Components

- Zeebe Broker and Gateway
- Operate
- Tasklist
- Connectors
- Optimize
- Identity
- Web Modeler
- Console [<span class="badge badge--enterprise-only">Enterprise only</span>](../../../reference/licenses/#console-sm)

All components except Web Modeler and Console are single Java applications.

Camunda 8 Self-Managed users may also use [Desktop Modeler](../components/modeler/desktop-modeler/install-the-modeler) as an addition to these components. Desktop Modeler can be used by process developers to build BPMN diagrams, DMN diagrams, or [Camunda Forms](../../guides/utilizing-forms.md) for automation.

Depending on your needs, you might not need all the above components to successfully use Camunda 8.

## Supported environments

For details on supported environments (e.g. Java or Elasticsearch versions), see [supported environments](/reference/supported-environments.md).

## Deployment options

You have the following options to run or deploy the above components in a self-managed fashion:

- **Helm/Kubernetes**: We strongly recommend using Kubernetes to run Camunda 8 in production. In addition to stock Kubernetes we also officially support variety of providers like Red Hat OpenShift and Amazon EKS. Also using Kubernetes with Minikube or KIND can be an interesting environment to run Camunda 8 locally on developer machines.
- **Docker**: You can run the provided Docker images of the components, also in production. For your convenience, we provide a Docker Compose configuration to run Camunda 8 on developer machines. Note that the Docker Compose configuration is **not** optimized for production usage, but for local development. You can find setup instructions in the [camunda-platform](https://github.com/camunda/camunda-platform) repository.
- **Manual**: You can run the Java applications on a local or virtual machine if it provides a supported Java Virtual Machine (JVM). This allows you to run Camunda on virtual machines or bare metal and offers a significant amount of flexibility. However, you will need to configure the details for the components to interact correctly yourself. We consider this a last resort. Note that Windows/Mac is **not** supported for production usage of Zeebe.

:::note
For additional details on locating your Camunda 8 credentials, visit the [contact page](/contact).
:::
