---
id: docker-compose
title: "Developer quickstart with Docker Compose"
sidebar_label: "Docker Compose"
description: "A quickstart guide for developers to deploy and run Camunda 8 Self-Managed locally with Docker Compose, including setup, configuration, secondary storage, connectors, and modeling."
---

Get started with Docker Compose to run Camunda 8 Self-Managed locally. The default lightweight configuration includes the Orchestration Cluster, Connectors, and Elasticsearch. The full configuration additionally includes Optimize, Console, Management Identity, Web Modeler, Keycloak, and PostgreSQL.

Docker Compose also supports [document handling](/self-managed/concepts/document-handling/overview.md), configurable secondary storage, built-in connectors, custom connectors, and local modeling workflows with Desktop Modeler and Web Modeler.

:::note
The [Docker images](/self-managed/deployment/docker/docker.md) are supported for production usage. The Docker Compose files are intended for local development and evaluation, and are not designed for production. For production deployments, use [Kubernetes with Helm](/self-managed/deployment/helm/install/index.md).
:::

Camunda 8 with Docker Compose includes the following:

- Orchestration Cluster
- Connectors
- Elasticsearch as the default secondary storage in the lightweight configuration

## Pages in this section

Step through the Docker Compose guide with the following topics:

- [Install and start](./docker-compose/install-start.md)
- [Configuration](./docker-compose/configuration.md)
- [Secondary storage](./docker-compose/secondary-storage.md)
- [Connectors and modeling](./docker-compose/connectors-and-modeling.md)

## Common tasks

If you are looking for a specific task from the previous single-page guide, use the links below.

## Install and start Camunda 8 with Docker Compose {#install-and-start-camunda-8-with-docker-compose}

For prerequisites, startup commands, and shutdown commands, see [install and start with Docker Compose](./docker-compose/install-start.md).

### Choose a Docker Compose configuration {#choose-a-docker-compose-configuration}

For lightweight, full, and standalone Web Modeler configurations, plus component URLs and authentication defaults, see [configure Docker Compose environments](./docker-compose/configuration.md#choose-a-docker-compose-configuration).

### Configure secondary storage {#configure-secondary-storage}

For Elasticsearch, OpenSearch, PostgreSQL, MariaDB, MySQL, Oracle, Microsoft SQL Server, and H2 examples, see [configure secondary storage with Docker Compose](./docker-compose/secondary-storage.md#configure-secondary-storage-for-the-orchestration-cluster).

### Use connectors and deploy processes {#use-connectors-and-deploy-processes}

For connector secrets, custom connectors, Desktop Modeler, and Web Modeler, see [use connectors and deploy processes with Docker Compose](./docker-compose/connectors-and-modeling.md#use-connectors).

## Stop Camunda 8 with Docker Compose {#stop-camunda-8-with-docker-compose}

For shutdown commands and volume cleanup guidance, see [install and start with Docker Compose](./docker-compose/install-start.md#stop-camunda-8-with-docker-compose).

## Next steps

- Follow the [getting started guide](/guides/getting-started-example.md) to create a Java project and connect to your local cluster.
- Explore the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) and [client libraries](/apis-tools/working-with-apis-tools.md).
- When you are ready for production, deploy with [Kubernetes and Helm](/self-managed/deployment/helm/install/index.md).
