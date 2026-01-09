---
id: overview
title: "Install Camunda 8 Self-Managed for production and advanced development setups"
sidebar_label: "Overview"
description: "Learn how to install Camunda 8 Self-Managed in production-ready environments (cloud or on-premises) and in advanced development setups that mirror production."
keywords: ["camunda download", "production installation"]
---

Use this overview to choose an installation approach for Camunda 8 Self-Managed in production-ready environments (cloud or on-premises), and in advanced development setups that mirror production for CI/CD, integration testing, or shared clusters.

## Production installations

:::note
Starting in 8.9-alpha3, Camunda 8 Run uses H2 as the default secondary storage out-of-the-box. Elasticsearch remains bundled and supported as an optional alternative; OpenSearch is supported for Self‑Managed deployments but is not bundled in Camunda 8 Run. See the [Camunda 8 Run configuration docs](../quickstart/developer-quickstart/c8run.md) for enabling Elasticsearch if required.
:::

- [**Helm/Kubernetes**](/self-managed/deployment/helm/install/quick-install.md) (Recommended): We recommend using Kubernetes and Helm to run Camunda 8 Self-Managed in production. With the right configuration, Camunda 8 Self-Managed can be deployed on any Certified Kubernetes distribution (cloud or on-premises). We also officially support a variety of providers like [Red Hat OpenShift](../../self-managed/deployment/helm/cloud-providers/openshift/redhat-openshift.md) and [Amazon EKS](../../self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md).
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
