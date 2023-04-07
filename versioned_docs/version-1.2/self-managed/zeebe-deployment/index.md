---
id: index
title: "Deployment guide"
sidebar_label: "Overview"
---

This chapter contains information for users who want to deploy and run Zeebe in a private cloud or on their own hardware.

Zeebe can be run as a Docker image or as a Kubernetes deployment.

We recommend using Docker during development. This gives you a consistent, repeatable development environment.

We recommend using either Camunda Cloud or Kubernetes and container images in production. This provides you with predictable and consistent configuration, and the ability to manage deployment using automation tools.

The deployment guide covers the following topics:

- [Local installation](local/install.md) - Contains instructions and a quick start guide to install Zeebe locally.
- [Docker container](docker/install.md) - Covers running Zeebe in a Docker environment.
- [Kubernetes deployment](kubernetes/index.md) - Gives information on running Zeebe in a Kubernetes environment.
- [Configuration](configuration/configuration.md) - Explains the configuration options. These configuration options apply to both environments, but not to Camunda Cloud. In Camunda Cloud, the configuration is provided for you.
- [Security](security/security.md) - Discusses the security aspects of running Zeebe and how to use them.
- [Operation](operations/index.md) - Outlines topics that become relevant when you want to operate Zeebe in production.

This deployment guide also integrates with the following:

1.  [Zeebe Distribution](https://github.com/camunda-cloud/zeebe/releases): The Zeebe distribution contains the workflow engine where we'll deploy our process model; the engine is also responsible for managing the state of active process instances. Included in the distro is the Zeebe CLI. Refer to our [installation guide](local/install.md).
1.  [Elasticsearch 7.x](https://www.elastic.co/guide/en/elasticsearch/reference/7.x/index.html): An open-source distributed datastore that can connect to Zeebe to store process data for auditing, visualization, analysis, etc. Camunda Operate uses Elasticsearch as its underlying datastore, which is why you need to download Elasticsearch to complete this deployment. Currently, 7.x is the minimum mandatory version with Zeebe 1.x. With version 0.20.0 (currently used in our tutorial,) you may use 6.x.

:::note
New to BPMN and want to learn more before moving forward? [This blog post](https://zeebe.io/blog/2018/08/bpmn-for-microservices-orchestration-a-primer-part-1/) helps explain the standard and why it's a good fit for microservices orchestration.
:::

If you're already familiar with BPMN and how to create a BPMN model in Camunda Modeler, you can find the finished model we create during the tutorial here: [Zeebe Getting Started Tutorial Process Model](getting-started/assets/order-process.bpmn).

## Additional resources

If you have questions or feedback about deployment with Zeebe, we encourage you to visit the following: 

- [User forum](https://forum.camunda.io/)
- [Public Slack channel](https://zeebe-slack-invite.herokuapp.com/)
- [GitHub issue tracker](https://github.com/camunda-cloud/zeebe/issues)

## Additional client configurations

Zeebe's Java and Go clients each have getting started guides of their own, showing in much greater detail how you can use the clients in the worker services you orchestrate with Zeebe.

- [Getting started with the Java client](https://github.com/camunda-cloud/camunda-cloud-get-started)
- [Getting started with the Go client](//go-client/get-started.md)

Beyond Java and Go, it's possible to create clients for Zeebe in a range of other programming languages, including JavaScript and C#, via community-supported libraries. The [Awesome Zeebe](https://awesome.zeebe.io/) page includes community-contributed clients in other languages, and [this blog post](https://camunda.com/blog/2018/11/grpc-generating-a-zeebe-python-client/) walks through how to generate a new client stub for Zeebe using gRPC.