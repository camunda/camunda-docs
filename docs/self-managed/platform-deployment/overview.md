---
id: overview
title: "Camunda Platform 8 installation overview"
sidebar_label: "Overview"
description: "This chapter contains information for users who want to deploy and run Camunda Platform 8 Self-Managed in their self-controlled cloud or own hardware."
keywords: ["camunda download"]
---

This chapter contains information for users who want to deploy and run Camunda Platform 8 Self-Managed, typically in your self-controlled cloud (public or private) or even on your own hardware.

## Components

Camunda Platform 8 includes the following components:

- Zeebe Broker and Gateway
- Operate (requiring Elasticsearch)
- Tasklist (requiring Elasticsearch)
- Connectors (requiring Operate)
- Optimize (requiring Elasticsearch)
- Identity (requiring Keycloak)
- Web Modeler (requiring Identity, Keycloak, and PostgreSQL) [<span class="badge badge--enterprise-only">Enterprise only</span>](../../../reference/licenses/#web-modeler)

All components except Web Modeler are single Java applications.

Depending on your needs, you might not need all the above components to successfully use Camunda Platform 8. Some components are not available in all deployment options.

:::note
Manual deployment is not available for Web Modeler, Optimize, or Identity.
:::

## Deployment recommendations

We recommend [SaaS](https://camunda.com/get-started) whenever possible, as Camunda does the heavy lifting and provides everything as a service for you. This provides peace of mind and allows you to concentrate on the important work. If SaaS is not an option, we have a strong opinion on how you should install Camunda Platform 8, depending on the goal (production or development).

### Production

For production usage, we highly recommend using a real Kubernetes cluster and our [Helm charts](./helm-kubernetes/deploy.md) if SaaS provided by Camunda is not an option for you.

We support the following deployment options (the sequence expresses preference) for production:

1. [**Helm/Kubernetes**](./helm-kubernetes/overview.md) independent of where this is hosted, for example OpenShift, Amazon EKS, or Google Kubernetes Engine (GKE).
2. [**Docker**](./docker.md) images together with the [infrastructure as code (IaC) tool](https://en.wikipedia.org/wiki/Infrastructure_as_code) of your choice.
3. [**Manual**](./manual.md) using the [infrastructure as code (IaC) tool](https://en.wikipedia.org/wiki/Infrastructure_as_code) of your choice. Manual deployment is not available for Web Modeler, Optimize, or Identity.

### Development

For development usage, we highly recommend using our [Helm charts on KIND](./helm-kubernetes/guides/local-kubernetes-cluster.md) if SaaS provided by Camunda is not an option for you. Those Helm charts are battle-tested and give you an experience close to production.

We support the following deployment options (the sequence expresses preference) for development:

1. [**Helm/Kubernetes**](./helm-kubernetes/overview.md)
   - [Cloud or on-prem cluster](./helm-kubernetes/overview.md#kubernetes-environments) with one of managed offering like Amazon EKS, Google Kubernetes Engine (GKE), etc.
   - [Local cluster](./helm-kubernetes/guides/local-kubernetes-cluster.md) with KIND.
2. [**Docker**](./docker.md) including [Docker Compose](./docker.md#docker-compose), which is **only** recommended for development.
3. [**Manual**](./manual.md) as a last resort if you only need the Zeebe broker. We don't recommend setting up the whole toolchain in this fashion. Manual deployment is not available for Web Modeler, Optimize, or Identity.

## Supported environments

For details on supported environments (e.g. Java or Elasticsearch versions), see [supported environments](/docs/reference/supported-environments/).
