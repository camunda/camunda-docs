---
id: cluster-variable-overview
title: Cluster variables
description: "Cluster variables provide a centralized way to manage configuration values across your Camunda cluster."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import AoGrid from '/docs/components/react-components/\_ao-card';
import { fundamentalCards } from '/docs/components/react-components/\_modeler-card-data';

Manage configuration values centrally across your Camunda cluster with cluster variables.

## About cluster variables

Within your Camunda cluster, you can define variables at two levels: globally for the entire cluster, or at the tenant level when multi-tenancy is enabled.

Cluster variables allows you to maintain environment-specific configurations, API endpoints, feature flags, and other shared values without hardcoding them into individual process definitions.

### Key benefits

- **Centralized configuration management**: Define configurations once and reuse them across processes.
- **Environment flexibility**: Maintain different values for development, staging, and production without modifying BPMN files.
- **Multi-tenant support**: Provide tenant-specific overrides while maintaining global defaults.
- **Simplified deployment**: Promote processes across environments without changing process definitions.
- **Dynamic updates**: Modify configuration values without redeploying processes.

### When to use cluster variables

They are ideal for:

- Environment-specific API endpoints and service URLs.
- Feature flags to control functionality availability.
- Shared configuration used across multiple processes.
- Tenant-specific customization in multi-tenant deployments.
- Environment-specific thresholds, timeouts, and limits.
- Integration credentials and connection strings.

### When not to use cluster variables

Consider alternatives for:

- Process instance-specific data. Use process variables.
- Frequently-changing values during execution. Use process variables.
- Sensitive credentials requiring encryption at rest. Use secrets management.
- Large data payloads. Use external storage with references.

## Get started

Get started with cluster variables with the following tutorial:

<p><a href="../cluster-variable-get-started/" class="link-arrow">Create your first cluster variable</a></p>

## Learn the fundamentals

Understand the fundamental of cluster variables:

<AoGrid ao={fundamentalCards}/>
