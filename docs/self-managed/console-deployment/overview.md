---
id: overview
title: "Console (Self-Managed)"
sidebar_label: "Overview"
description: "Console Self-Managed provides key insights into orchestration cluster deployments, process orchestration usage, and streamlining usage tracking."
---

Camunda Console (Self-Managed) provides a centralized interface for monitoring and managing your Camunda 8 deployments. It is designed to improve operational efficiency and streamline DevOps workflows in enterprise environments.

Console gives you real-time insights into orchestration clusters and helps reduce the operational overhead of managing distributed systems.

**Key Features**

- **Cluster Status Dashboard**: Monitor the health and status of core components such as Zeebe, Operate, Tasklist, Optimize, and Identity.
- **Cluster Telemetry**: Collect and view component metrics as a simple monitoring interface.
- **Cluster Configuration Overview**: View endpoint URLs, version details, and configuration metadata for your clusters.
- **Health Monitoring**: Ensure availability of essential services across the platform.
- **Read-Only Mode**: Use Console in a read-only mode for safe monitoring and troubleshooting.
- **Basic SSO Integration**: Support for OIDC-based login via Identity when configured.
- **Usage Visibility**: Gain insights into how your Camunda Self-Managed environment is being used.

## [Cluster Connectors](https://docs.camunda.io/docs/components/console/manage-clusters/cluster-connectors/)

The Cluster Connectors feature enables Console to connect to remote Camunda Orcherstration clusters securely over HTTPS. It supports:

- Monitoring of inbound connector webhooks, message queue subscriptions, and polling subscriptions.
- Health checks for connectors with visibility into which ones are running or failing.
- Troubleshooting via activity logs for diagnosing connector issues.

Camunda Console (Self-Managed) is available as a container image. Refer to the [installation guide](/self-managed/setup/overview.md) for instructions on deploying it.
