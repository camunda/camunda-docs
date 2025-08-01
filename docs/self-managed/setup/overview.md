---
id: overview
title: "Install Camunda 8 Self-Managed for production and advanced development setups"
sidebar_label: "Overview"
description: "This chapter contains information for users who want to deploy and run Camunda 8 Self-Managed in their self-managed cloud or own on-premise infrastructure in a production and advanced development environment."
keywords: ["camunda download", "production installation"]
---

This section provides an overview of the available recommendations for installing Camunda 8 Self-Managed in a production-ready environment, whether in a self-managed cloud (public or private) or on on-premises infrastructure. These installation options can also be used to set up advanced development environments that mirror production - such as for CI/CD pipelines, integration testing, or shared development clusters - especially when aligning closely with the production environment is important.

## Production installations

- [**Helm/Kubernetes**](/self-managed/installation-methods/helm/install.md) (Recommended): We recommend using Kubernetes and Helm to run Camunda 8 Self-Managed in production. With the right configuration, Camunda 8 Self-Managed can be deployed on any Certified Kubernetes distribution (cloud or on-premises). We also officially support a variety of providers like [Red Hat OpenShift](../../self-managed/installation-methods/helm/cloud-providers/openshift/redhat-openshift.md) and [Amazon EKS](../../self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md).
- [**Docker**](/self-managed/installation-methods/docker/docker.md): All Camunda components are available as [Docker images](https://hub.docker.com/u/camunda) and can be used in production on Linux systems. Windows and macOS are only supported for development environments, not for production.
- [**Manual**](/self-managed/installation-methods/manual/install.md): Run each Java application manually on virtual machines or bare-metal servers with a supported Java Virtual Machine (JVM). This method offers a significant amount of flexibility but requires manual configuration of component interactions. It is not recommended unless necessary, as you will need to configure the details for the components to interact correctly yourself. Windows and macOS are only supported for development environments, not for production.

:::info
To run Camunda 8 in a local environment for development or evaluation purposes only, review [running locally](/self-managed/quickstart/developer-quickstart.md)
:::

## Supported environments

For details on supported environments (e.g. Java or Elasticsearch versions), see [supported environments](/reference/supported-environments.md).
