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

We strongly recommend

* For **production**: Use Kubernetes and our [Helm charts](./kubernetes-helm). This setup provides you with predictable and consistent configuration, and the ability to manage deployment using automation tools.
* For **development**: Use SaaS. If this is not possible, use Docker Compose or Kubernetes locally. If this does not work either, consider starting a Zeebe broker via Java.

## Getting help

If you have questions or feedback about deployment with Zeebe, we encourage you to visit:

- [User forum](https://forum.camunda.io/)
- [Public Slack channel](https://camunda-slack-invite.herokuapp.com/)
