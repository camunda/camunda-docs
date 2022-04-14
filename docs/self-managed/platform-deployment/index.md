---
id: index
title: "Camunda 8 Platform Deployment"
sidebar_label: "Overview"
---

This chapter contains information for users who want to deploy and run Camunda Platform 8 self-managed, typically in your self-controlled cloud (public or private) or even your on your own hardware.

## Components

Camunda Platform 8 includes the following components as Java Applications:

* Zeebe Broker and Gateway
* Operate (requiring Elasticsearch)
* Tasklist (requiring Elasticsearch)
* Optimize (requiring Elasticsearch)
* Identity (requiring Keycloak)

Depending on your needs, you might not need all of the above components to successfully use Camunda Platform 8.

## Supported environments

For details on supported environments (e.g. Java or Elasticsearch versions), see [supported environments](/docs/reference/supported-environments/).

## Deployment options

You have the following options to run the above components in a self-managed fashion:

- [**Kubernetes**](./kubernetes): We strongly recommend using Kubernetes to run Camunda 8 in production. Using Minikube, Kubernetes can also be an interesting environment to run Camunda 8 locally on developer machines.
- [**Docker**](./docker): You can run the provided Docker images of the components, also in production. For your convenience, we provide a Docker Compose configuration to run Camunda 8 on developer machines. Note that the Docker Compose configuration is **not** optimized for production usage, but for local development.
- [**Local installation**](./local): You can run the Java applications on a local or virtual machine if it provides a supported Java Virtual Machine (JVM). This allows you to run Camunda on virtual machines or bare metal and offers a significant amount of flexibility. However, you will need to configure the details for the components to interact correctly yourself. We consider this a last resort. Note that Windows/Mac is **not** supported for production usage of Zeebe.

## Deployment recommendation

As you can see below, we recommend to prefer SaaS whenever possible, as simply Camunda does the heavy lifting and provides everything as a service for you. This provides peace of mind and allows you to conentrate on the important work. If SaaS is not an option, we have a trong oppinion on how you should install Camunda Platform 8, depending on the goal (production or development).

### Production

For production usage, we highly **recommend** to use a real Kubernetes cluster and our [Helm charts](./kubernetes-helm) if SaaS provided by Camunda is not an option for you.

We **support** the following deployment options (the sequence expresses preference) for production:

1. **SaaS**
2. [**Helm**](./kubernetes-helm) on a real Kubernetes cluster (independant where this is hosted, for example GKE)
3. [**Docker**](./docker) images together with the [infrastructure as code (IaC) tool](https://en.wikipedia.org/wiki/Infrastructure_as_code) of your choice
4. [**Local installation**](./local) using the [infrastructure as code (IaC) tool](https://en.wikipedia.org/wiki/Infrastructure_as_code) of your choice

### Development

For development usage, we highly **recommend** to use our [Helm charts on KIND](./kubernetes-helm/#installing-the-camunda-helm-chart-locally-using-kind) if SaaS provided by Camunda is not an option for you. Those Helm charts are battle-tested and give you an experience close to production.

We **support** the following deployment options (the sequence expresses preference) for production:

1. **SaaS**
2. [**Helm** charts on KIND](./kubernetes-helm/#installing-the-camunda-helm-chart-locally-using-kind) or [Helm](./kubernetes-helm) on a managed Kubernetes offering (like GKE) or [Helm](./kubernetes-helm) on a local Kubernetes installation like Minikube
3. [**Docker Compose**](./docker/#docker-compose)
4. [**Local installation**](./local) as a last ressort if you only need the Zeebe broker. We don't recommend to setup the whole toolchain in this fashion.


## Getting help

If you have questions or feedback about deployment with Zeebe, we encourage you to visit:

- [User forum](https://forum.camunda.io/)
- [Public Slack channel](https://camunda-slack-invite.herokuapp.com/)
