---
id: docker
sidebar_label: Docker
title: Camunda Docker images
keywords: ["camunda docker"]
description: "Learn about Camunda Docker images, their supported platforms, and recommended production alternatives. Camunda provides official Docker images for all major ..."
---

Camunda provides [official Docker images](https://hub.docker.com/u/camunda) for all major components.

## Docker images vs. Docker Compose

Docker images are suitable for production deployments.

By contrast, the provided [Docker Compose files](../../quickstart/developer-quickstart/docker-compose/) are intended only for quick start, development, and testing.

For production, we recommend using [Kubernetes with Helm](../helm/install/quick-install.md). Advanced users can create their own hardened Docker Compose configuration, but this requires additional effort.

## Platform support

- Use the `linux/amd64` image for production environments.
- The `linux/arm64` image is available for development purposes.
- All images are publicly accessible.

Docker images are supported for production only on Linux systems.
Windows and macOS are supported for development environments only.

## Docker images and configuration references

| Component             | Docker image                                                                                                                                                                                                                                                            | Configuration docs                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Orchestration Cluster | [camunda/camunda](https://hub.docker.com/r/camunda/camunda)                                                                                                                                                                                                             | [Environment variables](../../components/orchestration-cluster/overview/)                                                |
| Management Identity   | [camunda/identity](https://hub.docker.com/r/camunda/identity)                                                                                                                                                                                                           | [Management Identity configuration](../../components/management-identity/configuration/identity-configuration-overview/) |
| Optimize              | [camunda/optimize](https://hub.docker.com/r/camunda/optimize)                                                                                                                                                                                                           | [Optimize configuration](../../components/optimize/overview/)                                                            |
| Connectors            | [camunda/connectors](https://hub.docker.com/r/camunda/connectors)                                                                                                                                                                                                       | [Connectors configuration](../../components/connectors/overview/)                                                        |
| Connectors Bundle     | [camunda/connectors-bundle](https://hub.docker.com/r/camunda/connectors-bundle)                                                                                                                                                                                         | [Connectors configuration](../../components/connectors/overview/)                                                        |
| Web Modeler           | [camunda/web-modeler-restapi](https://hub.docker.com/r/camunda/web-modeler-restapi)<br/>[camunda/web-modeler-webapp](https://hub.docker.com/r/camunda/web-modeler-webapp)<br/>[camunda/web-modeler-websockets](https://hub.docker.com/r/camunda/web-modeler-websockets) | [Web Modeler configuration](../../components/modeler/web-modeler/overview/)                                              |
| Console               | [camunda/console](https://hub.docker.com/r/camunda/console)                                                                                                                                                                                                             | [Console configuration](../../components/console/overview/)                                                              |
