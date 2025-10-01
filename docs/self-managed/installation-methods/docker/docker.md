---
id: docker
sidebar_label: Docker
title: Camunda Docker images
keywords: ["camunda docker"]
description: Learn about supported Camunda Docker images, platform support, and the recommended production alternatives.
---

Camunda provides [official Docker images](https://hub.docker.com/u/camunda) for all major components.

## Docker images vs. Docker Compose

Docker images are suitable for production deployments.

By contrast, the provided [Docker Compose files](../../quickstart/developer-quickstart/docker-compose/) are intended only for quick start, development, and testing.

For production, we recommend using [Kubernetes with Helm](../helm/install.md). Advanced users can create their own hardened Docker Compose configuration, but this requires additional effort.

## Platform support

- Use the `linux/amd64` image for production environments.
- The `linux/arm64` image is available for development purposes.
- All images are publicly accessible.

Docker images are supported for production only on Linux systems.
Windows and macOS are supported for development environments only.

## Docker images and configuration references

| Component             | Docker image                                                                                                                                                                                          | Configuration docs                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Orchestration Cluster | [camunda/camunda:latest](https://hub.docker.com/r/camunda/camunda)                                                                                                                                    | [Environment variables](../../components/orchestration-cluster/overview/)                                                |
| Management Identity   | [camunda/identity:latest](https://hub.docker.com/r/camunda/identity)                                                                                                                                  | [Management Identity configuration](../../components/management-identity/configuration/identity-configuration-overview/) |
| Optimize              | [camunda/optimize:8-latest](https://hub.docker.com/r/camunda/optimize)                                                                                                                                | [Optimize configuration](../../components/optimize/overview/)                                                            |
| Connectors            | [camunda/connectors:latest](https://hub.docker.com/r/camunda/connectors)                                                                                                                              | [Connectors configuration](../../components/connectors/overview/)                                                        |
| Connectors Bundle     | [camunda/connectors-bundle:latest](https://hub.docker.com/r/camunda/connectors-bundle)                                                                                                                | [Connectors configuration](../../components/connectors/overview/)                                                        |
| Web Modeler           | [restapi](https://hub.docker.com/r/camunda/web-modeler-restapi), [webapp](https://hub.docker.com/r/camunda/web-modeler-webapp), [websockets](https://hub.docker.com/r/camunda/web-modeler-websockets) | [Web Modeler configuration](../../components/modeler/web-modeler/overview/)                                              |
| Console               | [camunda/console:latest](https://hub.docker.com/r/camunda/console)                                                                                                                                    | [Console configuration](../../components/console/overview/)                                                              |
