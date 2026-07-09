---
id: multi-tenancy
title: "Multi-tenancy"
sidebar_label: "Multi-tenancy"
description: "Multi-tenancy allows you to host multiple tenants within a single Camunda installation."
---

:::info
Multi-tenancy is only supported in Camunda 8 Self-Managed. It is not available in Camunda 8 SaaS.
:::

:::note
This page provides a conceptual overview of multi-tenancy. For detailed configuration and implementation in Self-Managed deployments, see [multi-tenancy in Self-Managed](/self-managed/concepts/multi-tenancy/index.md).
:::

[Multi-tenancy](/reference/glossary.md#multi-tenancy) in Camunda 8 enables a single installation to serve multiple [tenants](/reference/glossary.md#tenant) such as departments, teams, or external clients, while keeping each tenant's data and processes isolated.

Camunda 8 supports three distinct multi-tenancy models: **logical tenants** (lightweight, tenant-ID based), **Physical Tenants** (strong physical isolation within a cluster), and **multi-cluster** (full isolation with separate infrastructure).

If you need physical isolation within a single orchestration cluster, see [Physical Tenant isolation model](/self-managed/concepts/physical-tenants/index.md).

For details on configuring and using multi-tenancy in your Self-Managed deployment, see [multi-tenancy](/self-managed/concepts/multi-tenancy/index.md).
