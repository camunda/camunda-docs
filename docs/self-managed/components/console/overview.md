---
id: overview
title: "Console (Self-Managed)"
sidebar_label: "Overview"
description: "Console Self-Managed provides key insights into Orchestration Cluster deployments, process orchestration usage, and streamlining usage tracking."
---

Camunda Console (Self-Managed) provides a centralized interface for monitoring and managing your Camunda 8 deployments. It is designed to improve operational efficiency and streamline DevOps workflows in enterprise environments.

Console gives you real-time insights into Orchestration Clusters and helps reduce the operational overhead of managing distributed systems.

## Key features

- **Cluster Status Dashboard**: Monitor the health and status of core components such as Zeebe, Operate, Tasklist, Optimize, and Identity.
- **Cluster Telemetry**: Collect and view component metrics as a simple monitoring interface.
- **Cluster Configuration Overview**: View endpoint URLs, version details, and configuration metadata for your clusters.
- **Health Monitoring**: Ensure availability of essential services across the platform.
- **Read-Only Mode**: Use Console in a read-only mode for safe monitoring and troubleshooting.
- **Basic SSO Integration**: Support for OIDC-based login via Identity when configured.
- **Usage Visibility**: Gain insights into how your Camunda Self-Managed environment is being used.

## Connector management

You can [manage your connectors](/components/console/manage-clusters/manage-connectors.md) via Console. This feature allows Console to connect to remote Camunda Orchestration Clusters securely over HTTPS.

- Monitor your inbound connector webhooks, message queue subscriptions, and polling subscriptions.
- Check connector health and which connectors are running or failing.
- Troubleshoot and diagnose connector issues via activity logs.
