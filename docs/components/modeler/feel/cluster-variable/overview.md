---
id: cluster-variable-overview
title: Cluster variables
description: "Manage configuration values centrally across your Camunda cluster with cluster variables."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import AoGrid from '/docs/components/react-components/\_ao-card';
import { fundamentalCards, resourcesCards } from '/docs/components/react-components/\_modeler-card-data';

Manage configuration values centrally across your Camunda cluster with cluster variables.

## About

Within your Camunda cluster, you can define variables at two levels: globally for the entire cluster, or at the tenant level when multi-tenancy is enabled.

Cluster variables allows you to maintain environment-specific configurations, API endpoints, feature flags, and other shared values without hardcoding them into individual process definitions.

### Why use

Cluster variables provide **centralized**, **flexible**, and **environment-aware configuration** for your processes. They allow you to:

- Define configuration once and reuse it across multiple processes.
- Use different values for development, staging, and production without changing BPMN models.
- Support multi-tenant setups with tenant-specific overrides on top of global defaults.
- Promote processes across environments without modifying process definitions.
- Update configuration at runtime without redeploying.
- Manage shared settings such as API endpoints and service URLs, feature flags, and integration credentials.

### When not to use

Consider alternatives for the following use cases:

| Use case                                       | Recommended alternative          |
| ---------------------------------------------- | -------------------------------- |
| Process instance-specific data                 | Process variables                |
| Values that change frequently during execution | Process variables                |
| Sensitive credentials                          | Secrets management               |
| Large payloads                                 | External storage with references |

## Get started

Get started with cluster variables with the following tutorial:

<p><a href="../cluster-variable-get-started/" class="link-arrow">Create your first cluster variable</a></p>

## Learn the fundamentals

Understand the fundamental concepts of cluster variables:

<AoGrid ao={fundamentalCards} columns={2}/>

## Explore further resources

Dive into common use cases and the API documentation to extend your knowledge:

<AoGrid ao={resourcesCards} columns={2}/>
