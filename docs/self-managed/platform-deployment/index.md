---
id: index
title: "Camunda 8 Platform Deployment"
sidebar_label: "Overview"
---

This chapter contains information for users who want to deploy and run Camunda Platform 8 self-managed, typically in your self-controlled cloud (public or private) or even your on your own hardware.

## Components

Camunda Platform 8 includes the following components:

* Zeebe Broker and Gateway (Java Application)
* Operate (Java Application, requiring Elasticsearch)
* Tasklist ( Java Application, requiring Elasticsearch)
* Optimize (Java Application, requiring Elasticsearch)
* Identity (Java Application, requiring Keycloak)

Depending on your needs, you might not need all of the above components to succefully use Camunda Platform 8.

## Supported environments

For details on supported environments (e.g. Java or Elasticsearch versions), see [supported environments](/docs/reference/supported-environments/).

## Deployment options

You have the following options to run the above components in a self-managed fashion:

- [**Kubernetes**](./kubernetes): We stronlgy recommend to use a Kubernetes to run Camunda 8 in production. Using Minikube, Kubernetes can also be an interesting evironment to run Camunda 8 locally on developer machines.
- [**Docker**](./docker): You can run the provided Docker images of the components, also in production. For convenience, we provide a Docker Compose configuration to run Camunda 8 on developer machines. Note that the Docker Compose configiration is **not** optimized for production usage, but for local development.
- [**Local installation**](./local): You can simply run the Java applications on a local or virtual machine if it provides a supported Java Virtual Machine (JVM). This allows to run Camunda on virtual machines or bare metal and gives you big flexibility, however, you have to configure all nuts and bolts for the components to interact correctly yourself. We consider this a last ressort. Please note, that Windows/Mac is **NOT** supported for production usage of Zeebe.

We strongly recommend

* For **production**: Use Kubernetes and our [Helm charts](./kubernetes-helm). This setup provides you with predictable and consistent configuration, and the ability to manage deployment using automation tools.
* For **development**: Use SaaS. If this is not possible, use Docker Compose or Kubernetes locally. If this does not work either, consider starting a Zeebe broker via Java.

## Getting help

If you have questions or feedback about deployment with Zeebe, we encourage you to visit:

- [User forum](https://forum.camunda.io/)
- [Public Slack channel](https://zeebe-slack-invite.herokuapp.com/)
