---
id: overview
title: "Install Camunda 8 Self-Managed for production and advanced development setups"
sidebar_label: "Overview"
description: "Learn how to install Camunda 8 Self-Managed in production-ready environments (cloud or on-premises) and in advanced development setups that mirror production."
keywords: ["camunda download", "production installation"]
---

Use this overview to choose an installation approach for Camunda 8 Self-Managed in production-ready environments (cloud or on-premises), and in advanced development setups that mirror production for CI/CD, integration testing, or shared clusters.

## Production installations

- [**Helm/Kubernetes**](/self-managed/deployment/helm/install/quick-install.md) (recommended): Run Camunda 8 Self-Managed on Kubernetes using Helm. With the right configuration, you can deploy on any Certified Kubernetes distribution (cloud or on-premises). Camunda also supports specific providers such as [Red Hat OpenShift](../../self-managed/deployment/helm/cloud-providers/openshift/redhat-openshift.md) and [Amazon EKS](../../self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md).
- [**Docker**](/self-managed/deployment/docker/docker.md): Run Camunda components as [Docker images](https://hub.docker.com/u/camunda) in production on Linux systems. Windows and macOS are supported for development environments only.
- [**Manual**](/self-managed/deployment/manual/install.md): Run each Java application on virtual machines or bare-metal servers with a supported Java Virtual Machine (JVM). This offers flexibility but requires manual configuration of component interactions. Use this approach only when necessary. Windows and macOS are supported for development environments only.

:::info
To run Camunda 8 in a local environment for development or evaluation purposes only, see [running locally](/self-managed/quickstart/developer-quickstart.md).
:::

## Production storage choices

Choosing the right storage configuration is a critical step for production deployments:

- Install Camunda 8 using one of the production deployment options above (Helm/Kubernetes recommended).
- Review storage concepts: [primary and secondary storage overview](/components/concepts/concepts-overview.md) and [details on secondary storage](/self-managed/concepts/secondary-storage/index.md).
- Provision your chosen storage backend(s) before enabling web applications such as Operate, Tasklist, or Optimize.

Guidance:

- Prefer managed or vendor-supported infrastructure for production deployments to reduce operational overhead and improve reliability (for example, managed Elasticsearch/OpenSearch services or managed RDBMS).
- Benchmark and size your environment using [sizing your environment](/components/best-practices/architecture/sizing-your-environment.md) and the Camunda benchmark project referenced there.

:::info
For environment compatibility and supported versions, see [supported environments](/reference/supported-environments.md).
:::
