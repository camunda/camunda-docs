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
- [Getting started guide](getting-started/index.md) - Shows you how to work with Zeebe.
- [Configuration](configuration/configuration.md) - Explains the configuration options. These configuration options apply to both environments, but not to Camunda Cloud. In Camunda Cloud, the configuration is provided for you.
- [Security](security/security.md) - Discusses the security aspects of running Zeebe and how to use them.
- [Operation](operations/index.md) - Outlines topics that become relevant when you want to operate Zeebe in production.
- [Interceptors](../interceptors) - Describes how to enhance your Zeebe gateway with arbitrary gRPC call interceptors.
