---
id: custom-exporters
title: "Custom exporters for Physical Tenants"
sidebar_label: "Custom exporters"
description: "Learn how to assign a globally-defined custom exporter to specific Physical Tenants, or declare an exporter that is private to one tenant."
---

Learn how custom exporters interact with Physical Tenants: exporters defined once at the root level and assigned to specific tenants, and exporters a tenant declares only for itself.

For the base exporter configuration properties (`camunda.data.exporters.*`), see the [Orchestration Cluster configuration properties](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundadataexporters) reference.

## Two ways to use a custom exporter with Physical Tenants

- **Global exporter, assigned to specific tenants**: Define the exporter once under the root `camunda.data.exporters.<exporter-id>.*` catalog, then list its ID under `camunda.physical-tenants.<tenant-key>.data.exporters-assigned` for every tenant that should run it. A tenant can only adjust the exporter's `args`; the `class-name` and `jar-path` always come from the root definition.
- **Tenant-private exporter**: Declare the exporter entirely under `camunda.physical-tenants.<tenant-key>.data.exporters.<exporter-id>.*`, using an ID that does not exist in the root catalog. The exporter is not shared with, or visible to, other tenants.

## Assigning a root-level exporter to specific tenants

```yaml
camunda:
  data:
    exporters:
      audit-log:
        class-name: com.example.AuditLogExporter
        jar-path: /usr/local/camunda/exporters/audit-log.jar
        args:
          endpoint: https://audit.example.com/ingest

  physical-tenants:
    tenanta:
      data:
        exporters-assigned:
          - audit-log
        exporters:
          audit-log:
            args:
              # Overrides/extends the root args for this tenant only
              endpoint: https://audit.example.com/ingest/tenanta

    tenantb:
      data:
        exporters-assigned: []
        # tenantb does not run the audit-log exporter
```

- `exporters-assigned` is the tenant's complete list of generic (non-autoconfigured) exporter IDs. It is mandatory for every tenant once the root catalog is non-empty or the tenant declares its own exporter; pass an empty list to explicitly run no generic exporters.
- Listing an ID in `exporters-assigned` without also declaring it under `data.exporters` is enough to run the exporter with its root `args` unchanged.
- Declaring an exporter under `data.exporters` without also listing it in `exporters-assigned` is rejected at startup: configuring an exporter is not a way to activate it.
- The autoconfigured `camundaexporter` and `rdbms` exporters (created automatically from a tenant's secondary-storage configuration) must never appear in `exporters-assigned`.

## What a tenant can and cannot override

When a tenant is assigned a root-declared exporter ID:

| Field        | Overridable per tenant                                                                                                        |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `class-name` | No — must match the root value if restated; startup fails otherwise                                                           |
| `jar-path`   | No — must match the root value if restated; startup fails otherwise                                                           |
| `args`       | Yes — deep-merged with the root args when the exporter supports it, otherwise replaces the root args entirely for that tenant |

Assigning a root exporter ID means running the root's exporter implementation, optionally with adjusted arguments. To run a different exporter class, declare it under a new, tenant-private exporter ID instead of reusing a root ID.

## Declaring a tenant-private exporter

Use an exporter ID that is not defined in the root catalog to scope an exporter entirely to one tenant:

```yaml
camunda:
  physical-tenants:
    tenanta:
      data:
        exporters-assigned:
          - tenanta-only-exporter
        exporters:
          tenanta-only-exporter:
            class-name: com.example.TenantAExporter
            jar-path: /usr/local/camunda/exporters/tenant-a.jar
            args:
              region: us-east
```

A tenant-private exporter is not visible to, or usable by, other Physical Tenants, and it does not need to match any root definition.

:::note Related pages

- [Configuration reference](./configuration-reference.md)
- [Storage isolation](./storage-isolation.md)
- [Physical Tenant isolation model](./index.md)

:::
