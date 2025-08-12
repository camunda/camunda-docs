---
id: overview
title: "Overview"
description: "The central documentation hub for shared configuration and conceptual topics across the Camunda 8 Orchestration Cluster."
---

Welcome to the central documentation hub for shared configuration and conceptual topics across the Camunda 8 Orchestration Cluster components: Operate, Tasklist, and Identity.

## Purpose

With the release of version 8.8 and beyond, configuration and operational concepts for the orchestration cluster have been unified. This means:

- Many configuration options previously documented separately for each component are now consolidated into a single, centralized configuration file and management approach.
- Several conceptual topics—such as security headers, authentication, data retention, and usage metrics—apply across all orchestration cluster components rather than to just one.
- This shared section provides a single source of truth for these cross-cutting concerns, making it easier to find, understand, and maintain orchestration cluster configuration and concepts.

## What you will find here

This section includes:

- **Unified configuration topics:** Centralized documentation on all cluster-wide configuration settings grouped by theme (e.g., security, logging, monitoring).
- **Conceptual documentation:** Explanations of cluster-wide behaviors, features, and best practices relevant across multiple components.
- **Migration and legacy information:** Guidance related to upgrading and migrating to version 8.8+, including notes on deprecated features and legacy support.
- **Cross-component topics:** Information on shared aspects such as HTTP security headers, authentication mechanisms, data retention policies, and usage metrics.

## Why this matters

Previously, configuration and concepts were scattered across multiple component-specific docs (Operate, Tasklist, Identity), which could cause confusion and duplication. Centralizing this content:

- Simplifies navigation and discovery for users managing the orchestration cluster
- Reduces maintenance overhead by avoiding duplicated content
- Reflects the underlying architectural changes introduced in 8.8 that unify the orchestration cluster components
- Provides a clearer, consistent experience for configuring and operating Camunda Platform 8 Self-Managed clusters

## How this section relates to component docs

- Component-specific docs will continue to exist for UI, user guides, and other unique features.
- Wherever applicable, component docs will link to this shared section for configuration or conceptual topics that apply cluster-wide.
- This structure helps keep documentation DRY (Don't Repeat Yourself) and aligned with platform improvements.
