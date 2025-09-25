---
id: docker
sidebar_label: Docker
title: Camunda Docker images
keywords: ["camunda docker"]
description: "Step through multi-platform support, configuration, Docker images, and Docker Compose."
---

Camunda provides [official Docker images](https://hub.docker.com/u/camunda) for all major components.

## Docker Images vs. Docker Compose

All **Docker images** are supported for **production use on Linux**.

By contrast, the provided [Docker Compose files](/self-managed/quickstart/developer-quickstart/docker-compose/) are meant only for quick start, development and tetsting. They are not desinged for production deployments.

For production, we recommend using [Kubernetes with Helm](/self-managed/installation-methods/helm/install.md). Advanced users may still create their own hardened Docker Compose configuration, but this requires additional efforts.

## Platform Support

- Use the `linux/amd64` image for production environments.
- The `linux/arm64` image is available for development purposes.
- All images are publicly accessible.

Docker images are supported for production usage **only on Linux systems**.
Windows and macOS are supported for **development environments only**.

## Docker images and configuration references

| Component             | Docker image                                                                                                                                                                                          | Configuration docs                                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Orchestration Cluster | [camunda/camunda:latest](https://hub.docker.com/r/camunda/camunda)                                                                                                                                    | [Environment variables](/self-managed/components/orchestration-cluster/overview/)                                                |
| Management Identity   | [camunda/identity:latest](https://hub.docker.com/r/camunda/identity)                                                                                                                                  | [Management Identity configuration](/self-managed/components/management-identity/configuration/identity-configuration-overview/) |
| Optimize              | [camunda/optimize:8-latest](https://hub.docker.com/r/camunda/optimize)                                                                                                                                | [Optimize configuration](/self-managed/components/optimize/overview/)                                                            |
| Connectors            | [camunda/connectors:latest](https://hub.docker.com/r/camunda/connectors)                                                                                                                              | [Connectors configuration](/self-managed/components/connectors/overview/)                                                        |
| Connectors Bundle     | [camunda/connectors-bundle:latest](https://hub.docker.com/r/camunda/connectors-bundle)                                                                                                                | [Connectors configuration](/self-managed/components/connectors/overview/)                                                        |
| Web Modeler           | [restapi](https://hub.docker.com/r/camunda/web-modeler-restapi), [webapp](https://hub.docker.com/r/camunda/web-modeler-webapp), [websockets](https://hub.docker.com/r/camunda/web-modeler-websockets) | [Web Modeler config](/self-managed/components/modeler/web-modeler/overview/)                                                     |
| Console               | [camunda/console:latest](https://hub.docker.com/r/camunda/console)                                                                                                                                    | [Console configuration](/self-managed/components/console/overview/)                                                              |
