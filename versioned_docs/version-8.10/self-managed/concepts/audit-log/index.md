---
id: index
title: Audit log
sidebar_label: Audit log
description: A high-level overview of the audit log in Camunda 8.
---

Use the [audit log](../../../components/audit-log/overview.md) to access a record of operations, including who performed the operation, when it was performed, and on which entities the operation was performed.

## Impact on secondary storage

When the audit log is active, a record is written to [secondary storage](../../concepts/secondary-storage/index.md) for every applicable operation instance. By default, only user operations are tracked, not [client](/components/zeebe/technical-concepts/architecture.md#clients) operations. With this default behavior, you can expect a 3.5% increase in disk usage.

:::warning
The audit log is enabled by default. Because of the increase in resource usage on secondary storage, you may see increased costs associated with this feature.
:::

You can [configure the audit log](./configure.md) to fine tune log thoroughness and resource usage according to your needs.

## Audit logs and Physical Tenants

Audit records are stored in the secondary-storage location configured for the Physical Tenant where the operation occurred. Query a tenant's records through its tenant-scoped API path, for example `POST /physical-tenants/{physicalTenantId}/v2/audit-logs/search`. The unprefixed `POST /v2/audit-logs/search` endpoint queries the default Physical Tenant. See [search audit logs](/apis-tools/orchestration-cluster-api-rest/specifications/search-audit-logs.api.mdx) for request filters and response fields.

The API's `tenantId` field and filter refer to a Logical Tenant within the selected Physical Tenant. They do not select a Physical Tenant. Physical Tenant scope comes from the request path. For details about tenant-scoped API routing, see [API routing for Physical Tenants](/self-managed/concepts/physical-tenants/api-routing.md).
