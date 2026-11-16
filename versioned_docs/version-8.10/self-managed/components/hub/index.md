---
id: camunda-hub
title: Camunda Hub
description: "Install and configure Camunda Hub in your Self-Managed environment."
---

Install and configure Camunda Hub components in your Self-Managed environment.

## Installation and configuration

Camunda Hub is a unified platform that provides governance, observability, and delivery capabilities in one place.

### Install Camunda Hub

Choose the installation method that matches your environment:

- **Kubernetes with Helm:** [Install the Camunda Hub release](/self-managed/deployment/helm/install/topology/hub-release.md), which runs Camunda Hub and Management Identity as the management plane of your [deployment topology](/self-managed/deployment/helm/install/topology/index.md).
- **Docker Compose for local development:** [Deploy with Camunda Hub](/self-managed/quickstart/developer-quickstart/docker-compose/connectors-and-modeling.md#deploy-with-camunda-hub) using the standalone `docker-compose-hub.yaml` configuration, or use the full configuration, which includes Camunda Hub.

### Configure Camunda Hub

After installation, configure Camunda Hub and connect it to your Orchestration Clusters across environments:

- [Property reference](./configuration/properties.md): settings for the `restapi` and `websocket` components.
- [Environments and Physical Tenants](./configuration/environments.md): how Camunda Hub creates environments from your clusters and Physical Tenants.
- [Legacy cluster configurations](./configuration/legacy-cluster-config.md): the deprecated way to configure clusters.
- [Database](./configuration/database.md): connect Camunda Hub to a supported database.
- [Authentication](./configuration/identity.md): configure authentication and connect an OIDC provider.
- [Logging](./configuration/logging.md): additional logging configuration.
- [SSL](./configuration/ssl.md): additional SSL configuration.
- [Copilot](./configuration/copilot.md): configure Copilot with a custom LLM provider.

To operate and maintain Camunda Hub, see [usage metrics](./usage-metrics.md), [monitoring](./monitoring.md), and [version upgrade](./version-upgrade.md). If something goes wrong, see the Camunda Hub troubleshooting pages, starting with [troubleshoot database connection](./troubleshooting/troubleshoot-database-connection.md).
