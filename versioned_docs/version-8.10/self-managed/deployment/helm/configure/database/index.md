---
id: index
sidebar_label: Database
title: Helm chart database configuration
description: "In this section, find details on database configuration associated with Kubernetes with Helm."
---

import DocCardList from '@theme/DocCardList';

:::tip Need end-to-end guidance for RDBMS?
For a unified setup guide covering provisioning, topology decisions, driver management, and backup strategies across Orchestration Cluster and Web Modeler, see the [end-to-end RDBMS setup guide](/self-managed/concepts/databases/relational-db/rdbms-setup-guide.md). This guide is useful both when starting a new setup and when harmonizing existing component configurations.
:::

:::tip Choosing a secondary storage backend?
Use the [secondary storage overview](/self-managed/concepts/secondary-storage/index.md) as the navigation hub for Elasticsearch/OpenSearch and RDBMS paths.
:::

Use this section to configure database layers for Helm deployments.

This section is organized by component:

- [Orchestration Cluster](/self-managed/deployment/helm/configure/database/non-sql.md): Configure Elasticsearch or OpenSearch as secondary storage, or use [RDBMS](/self-managed/deployment/helm/configure/database/rdbms.md).
- [Management Identity and Web Modeler](/self-managed/deployment/helm/configure/database/using-existing-postgres.md): Configure PostgreSQL for management components.
- [Optimize](/self-managed/deployment/helm/configure/database/optimize/index.md): Configure Elasticsearch or OpenSearch for Optimize.

Some Elasticsearch/OpenSearch tasks, such as custom headers and index prefixes, apply to both the Orchestration Cluster and Optimize. Those shared pages call that out explicitly.

<DocCardList />
