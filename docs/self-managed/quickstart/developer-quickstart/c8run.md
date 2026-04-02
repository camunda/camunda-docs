---
id: c8run
title: "Developer quickstart – Camunda 8 Run"
sidebar_label: "Camunda 8 Run"
description: "A quickstart guide for developers to deploy and run Camunda 8 Self-Managed locally with Camunda 8 Run, including setup, configuration, and key components."
---

:::note
Camunda 8 Run provides a lightweight, self-managed environment for local development and prototyping. It is not intended for production use.

For production deployments, install the Orchestration Cluster manually as a Java application.
For detailed steps, see the [manual installation](../../../deployment/manual/install) guide.
:::

Camunda 8 Run is a local distribution of Camunda 8 that bundles the Camunda 8 runtime, core services, startup scripts, and a launcher application for Windows, macOS, and Linux.

Camunda 8 Run enables you to run the [Orchestration Cluster](../../../../reference/glossary#orchestration-cluster) with minimal configuration. It is intended for developers who want to model BPMN diagrams, deploy them, and interact with running process instances in a simple environment.

Camunda 8 Run includes the following:

- Orchestration Cluster
- Connectors
- H2 (default [secondary storage](/reference/glossary#secondary-storage) for Camunda 8 Run)

Camunda 8 Run also supports document storage and management with [document handling](/self-managed/concepts/document-handling/overview.md).

:::note
For the latest list of supported relational databases and versions, see the
[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).
:::

## Pages in this section

Step through the Camunda 8 Run guide via the following topics:

- [Install and start](./c8run/install-start.md)
- [Configure](./c8run/configuration.md)
- [Configure secondary storage](./c8run/secondary-storage.md)
- [Troubleshoot](./c8run-troubleshooting.md)

## Common tasks

If you are looking for a specific task from the previous single-page guide, use the links below.

## Install and start Camunda 8 Run {#install-and-start-camunda-8-run}

For prerequisites, local startup, Docker mode, and shutdown steps, see [install and start Camunda 8 Run](./c8run/install-start.md).

### Configuration options {#configuration-options}

For CLI flags, startup overrides, TLS flags, and `--config` usage, see [configure Camunda 8 Run](./c8run/configuration.md#configuration-options).

### Enable authentication and authorization {#enable-authentication-and-authorization}

For `application.yaml` examples that protect the API and enable authorization checks, see [enable authentication and authorization](./c8run/configuration.md#enable-authentication-and-authorization).

### Use Camunda APIs {#use-camunda-apis}

For local API endpoints, authentication expectations, and links to the canonical API docs, see [use Camunda APIs](./c8run/configuration.md#use-camunda-apis).

### Use built-in and custom connectors {#use-built-in-and-custom-connectors}

For local connector usage, custom connector placement, and connector secrets guidance, see [use built-in and custom connectors](./c8run/configuration.md#use-built-in-and-custom-connectors).

### Configure or switch secondary storage (H2 or Elasticsearch) {#configure-or-switch-secondary-storage-h2-or-elasticsearch}

For H2, external relational databases, Elasticsearch, and migration notes, see [configure secondary storage in Camunda 8 Run](./c8run/secondary-storage.md#configure-or-switch-secondary-storage-h2-or-elasticsearch).

#### Default: H2 (Camunda 8 Run) {#default-h2-camunda-8-run}

For the default H2 configuration and limitations, see [default H2 in Camunda 8 Run](./c8run/secondary-storage.md#default-h2-camunda-8-run).

#### External relational database options {#external-relational-database-options}

For PostgreSQL, MariaDB, MySQL, Oracle, and Microsoft SQL Server examples, see [external relational database options](./c8run/secondary-storage.md#external-relational-database-options).

## Shut down Camunda 8 Run {#shut-down-camunda-8-run}

For local and Docker shutdown commands, see [shut down Camunda 8 Run](./c8run/install-start.md#shut-down-camunda-8-run).

## Next steps

- Review [backup and restore for RDBMS](/self-managed/operational-guides/backup-restore/rdbms/backup.md).
- Identify and resolve [common issues when starting, configuring, or using Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run-troubleshooting.md).
