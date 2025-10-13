---
id: overview
title: "Console on Self-Managed"
sidebar_label: "Overview"
description: "Console Self-Managed provides key insights into orchestration cluster deployments, process orchestration usage, and streamlining usage tracking."
---

Camunda Console (Self-Managed) offers a centralized interface to monitor and manage your Camunda 8 deployments, enhancing operational efficiency and streamlining DevOps workflows in enterprise environments.

Console delivers real-time insights into orchestration clusters and reduces the operational overhead of managing distributed systems.

## Key features

- **Cluster Status Dashboard**: Monitor the health of your orchestration cluster (Zeebe, Operate, Tasklist, Identity), connectors, and external services such as Optimize.
- **Cluster Telemetry**: Collect and view component metrics in a built-in monitoring interface.
- **Cluster Configuration Overview**: View endpoint URLs, version details, and configuration metadata for your clusters.
- **Health Monitoring**: Track availability of essential services across the platform.
- **Read-Only Mode**: Use Console in read-only mode for safe monitoring and troubleshooting.
- **Basic SSO Integration**: OIDC-based login via Identity (when configured).
- **Usage Visibility**: View usage patterns for your Camunda Self-Managed environment.

## Connector management

You can [manage your connectors](/components/console/manage-clusters/manage-connectors.md) in Console. This lets Console connect securely over HTTPS to remote Camunda orchestration clusters.

- Monitor inbound connector webhooks, message queue subscriptions, and polling subscriptions.
- Check connector health, including which connectors are running or failing.
- Troubleshoot connector issues using activity logs.
