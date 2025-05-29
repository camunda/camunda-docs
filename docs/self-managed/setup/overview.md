---
id: overview
title: "Camunda 8 production installations overview"
sidebar_label: "Overview"
description: "This chapter contains information for users who want to deploy and run Camunda 8 Self-Managed in their self-controlled cloud or own on-premise infrastructure in a production environment."
keywords: ["camunda download", "production installation"]
---

import Components from '../react-components/components.md'

This section provides an overview of the available recommendations for installing Camunda 8 Self-Managed in a production-ready environment, whether in a self-controlled cloud (public or private) or on on-premises infrastructure.

## Production installations

- [**Helm/Kubernetes**](./install.md) (Recommended): We recommend using Kubernetes and Helm to run Camunda 8 Self-Managed in production. With the right configuration, Camunda 8 Self-Managed can be deployed on any Certified Kubernetes distribution (cloud or on-premises). We also officially support a variety of providers like [Red Hat OpenShift](./deploy/openshift/redhat-openshift.md) and [Amazon EKS](./deploy/amazon/amazon-eks/amazon-eks.md).
- [**Docker**](./deploy/other/docker.md): All Camunda components are available as [Docker images](https://hub.docker.com/u/camunda) and can be used in production on Linux systems.
   - :warning: Windows or macOS are only supported for development environments, not for production.
- [**Manual**](./deploy/local/manual.md): Run each Java application manually on virtual machines or bare-metal servers with a supported Java Virtual Machine (JVM). This method offers a significant amount of flexibility but requires manual configuration of component interactions. It is not recommended unless necessary, as you will need to configure the details for the components to interact correctly yourself. 
   - :warning: Windows/Mac is **not** supported for production usage of Zeebe.

:::info
 If you're looking to run Camunda 8 in a local environment for development or evaluation purposes, see [**Run locally**](../run-locally/index.md)
:::

## Supported environments

For details on supported environments (e.g. Java or Elasticsearch versions), see [supported environments](/reference/supported-environments.md).

## Components

<Components/>
