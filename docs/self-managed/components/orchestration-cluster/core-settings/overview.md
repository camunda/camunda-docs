---
id: overview
title: "Core settings and features"
description: "The central documentation hub for shared configuration and conceptual topics across the Camunda 8 Orchestration Cluster."
---

Learn about unified configuration for the Camunda 8 Orchestration Cluster components Operate, Tasklist, Zeebe, and Identity.

## About Orchestration Cluster configuration

With the release of version 8.8, configuration and operational concepts for the Orchestration Cluster are unified. This means:

- Many configuration options previously documented separately for each component are now consolidated into a single, centralized configuration file and management approach.
- Several conceptual topics—such as security headers, authentication, data retention, and usage metrics—apply across all Orchestration Cluster components rather than to just one.
- This shared section provides a single source of truth for these cross-cutting concerns, making it easier to find, understand, and maintain orchestration cluster configuration and concepts.

This section includes:

- **Unified configuration topics:** Centralized documentation on all cluster-wide configuration settings grouped by theme (e.g., security, logging, monitoring).
- **Conceptual documentation:** Explanations of cluster-wide behaviors, features, and best practices relevant across multiple components.
- **Migration and legacy information:** Guidance related to upgrading and migrating to version 8.8+, including notes on deprecated features and legacy support.
- **Cross-component topics:** Information on shared aspects such as HTTP security headers, authentication mechanisms, data retention policies, and usage metrics.

:::caution Camunda 8.9 unified configuration breaking changes

Only the first partial set of unified configuration properties is introduced in Camunda 8.8.

- All remaining unified property changes will be completed by Camunda 8.9.
- This remaining work will result in future breaking changes. For example, the secondary database properties will be unified into a secondary-storage properties section.

:::
