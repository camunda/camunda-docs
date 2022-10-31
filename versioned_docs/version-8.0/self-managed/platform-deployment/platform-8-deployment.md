---
id: platform-8-deployment
title: "Camunda Platform 8 deployment"
sidebar_label: "Deployment"
description: "This chapter contains information for users who want to deploy and run Camunda Platform 8 Self-Managed in their self-controlled cloud or own hardware."
---

This chapter contains information for users who want to deploy and run Camunda Platform 8 Self-Managed, typically in your self-controlled cloud (public or private) or even on your own hardware.

## Components

Camunda Platform 8 includes the following components as Java applications:

- Zeebe Broker and Gateway
- Operate (requiring Elasticsearch)
- Tasklist (requiring Elasticsearch)
- Connectors
- Optimize (requiring Elasticsearch)
- Identity (requiring Keycloak)

Depending on your needs, you might not need all the above components to successfully use Camunda Platform 8.

## Supported environments

For details on supported environments (e.g. Java or Elasticsearch versions), see [supported environments](/docs/reference/supported-environments/).

## Deployment options

You have the following options to run the above components in a self-managed fashion:

- [**Kubernetes**](./kubernetes.md): We strongly recommend using Kubernetes to run Camunda Platform 8 in production. Using minikube, Kubernetes can also be an interesting environment to run Camunda Platform 8 locally on developer machines.
- [**OpenShift**](./openshift.md): You can run Camunda Platform 8 on OpenShift in much the same way you would on a standard Kubernetes cluster, with some configuration based on your desired security context constraints.
- [**Docker**](./docker.md): You can run the provided Docker images of the components, also in production. For your convenience, we provide a Docker Compose configuration to run Camunda Platform 8 on developer machines. Note that the Docker Compose configuration is **not** optimized for production usage, but for local development.
- [**Local installation**](./local.md): You can run the Java applications on a local or virtual machine if it provides a supported Java Virtual Machine (JVM). This allows you to run Camunda on virtual machines or bare metal and offers a significant amount of flexibility. However, you will need to configure the details for the components to interact correctly yourself. We consider this a last resort. Note that Windows/Mac is **not** supported for production usage of Zeebe.

## Deployment recommendation

As you can see below, we recommend [SaaS](https://camunda.com/get-started) whenever possible, as Camunda does the heavy lifting and provides everything as a service for you. This provides peace of mind and allows you to concentrate on the important work. If SaaS is not an option, we have a strong opinion on how you should install Camunda Platform 8, depending on the goal (production or development).

### Production

For production usage, we highly recommend using a real Kubernetes cluster and our [Helm charts](./kubernetes-helm.md) if SaaS provided by Camunda is not an option for you.

We support the following deployment options (the sequence expresses preference) for production:

1. **SaaS**
2. [**Helm**](./kubernetes-helm.md) on a real Kubernetes cluster (independent of where this is hosted, for example GKE), including [a dedicated guide to deploy with Helm on OpenShift](./openshift-helm.md).
3. [**Docker**](./docker.md) images together with the [infrastructure as code (IaC) tool](https://en.wikipedia.org/wiki/Infrastructure_as_code) of your choice.
4. [**Local installation**](./local.md) using the [infrastructure as code (IaC) tool](https://en.wikipedia.org/wiki/Infrastructure_as_code) of your choice.

### Development

For development usage, we highly recommend using our [Helm charts on KIND](./kubernetes-helm.md#installing-the-camunda-helm-chart-locally-using-kind) if SaaS provided by Camunda is not an option for you. Those Helm charts are battle-tested and give you an experience close to production.

We support the following deployment options (the sequence expresses preference) for production:

1. **SaaS**
2. [**Helm** charts on KIND](./kubernetes-helm.md#installing-the-camunda-helm-chart-locally-using-kind) or [Helm](./kubernetes-helm.md) on a managed Kubernetes offering (like GKE) or [Helm](./kubernetes-helm.md) on a local Kubernetes installation like minikube.
3. [**Docker Compose**](./docker.md#docker-compose)
4. [**Local installation**](./local.md) as a last resort if you only need the Zeebe broker. We don't recommend setting up the whole toolchain in this fashion.

## Getting help

If you have questions or feedback about deployment with Zeebe, we encourage you to visit:

- [User forum](https://forum.camunda.io/)
- [Public Slack channel](https://camunda-slack-invite.herokuapp.com/)
