---
id: index
title: "Physical Tenant isolation model"
sidebar_label: "Isolation model"
description: "Learn how Physical Tenants isolate execution, storage, and API routing within a single orchestration cluster."
---

:::info
This is the detailed technical documentation for Physical Tenants. For an overview and key concepts, see [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md).
:::

Physical Tenants provide strong isolation within a single orchestration cluster. This page assumes one orchestration cluster with multiple Physical Tenants. Multi-region and multi-cluster topologies are separate topics.

## Isolation model

A Physical Tenant is an isolated execution unit inside one orchestration cluster.

| Layer             | Isolation model                                                                                          | Shared or isolated    |
| ----------------- | -------------------------------------------------------------------------------------------------------- | --------------------- |
| Primary storage   | Dedicated Raft groups per Physical Tenant. A single tenant can span multiple brokers.                    | Isolated              |
| Brokers           | Brokers are co-located and can host more than one Physical Tenant.                                       | Shared infrastructure |
| Gateways          | Gateways route requests to the targeted tenant.                                                          | Shared                |
| Secondary storage | Use a tenant-specific schema, index prefix, or separate backend, depending on the storage type.          | Isolated              |
| Document store    | Use a tenant-specific bucket, container, or subpath. The exact convention depends on the cloud provider. | Isolated              |

## Architecture

```mermaid
graph TD
    subgraph cluster["Single orchestration cluster"]
        cp["Cluster control plane\nshared"]
        gw["Gateways\nshared"]

        subgraph tenantA["Physical Tenant A"]
            raftA["Primary storage\nRaft group A"]
            secA["Secondary storage A"]
            docA["Document store A"]
        end

        subgraph tenantB["Physical Tenant B"]
            raftB["Primary storage\nRaft group B"]
            secB["Secondary storage B"]
            docB["Document store B"]
        end

        cp --> gw
        gw --> raftA
        gw --> raftB
        cp --> tenantA
        cp --> tenantB
    end
```

The diagram shows one orchestration cluster boundary with shared control-plane components and tenant-specific execution and storage boundaries.

## API routing

Use tenant-scoped routes for tenant-specific requests:

- REST: `/physical-tenants/{physicalTenantId}/v2/...`
- gRPC: `Camunda-Physical-Tenant` header (upcoming — routes to `default` when omitted)
- Default tenant compatibility: plain `/v2/...` requests route to the default Physical Tenant

Cluster-wide endpoints (such as topology and license) are not tenant-scoped. They remain at their standard `/v2/...` paths.

## Configure and provision Physical Tenants

To configure tenant defaults, per-tenant overrides, validation expectations, and property examples, see [configuration reference](./configuration-reference.md).

To provision new tenants and understand lifecycle behavior in 8.10, including rolling restart expectations and unsupported operations, see [provisioning and lifecycle](./provisioning-and-lifecycle.md).

## What is not isolated in 8.10

- Gateways are shared between tenants, so a saturated gateway can still affect multiple tenants.
- Brokers are co-located and shared infrastructure remains part of the deployment.
- Full performance isolation is out of scope for the first version.
- Future versions may reduce sharing further, for example through more isolated actor-thread or runtime placement, but that is not part of 8.10.

## Storage validation

Configuration validation should fail fast when two tenants point to the same backend location or another unsupported path. For document store, the final naming convention depends on the provider, so validate uniqueness at startup rather than relying on a hard-coded path format.

## Readiness

The intended model is that readiness remains broker-scoped, not tenant-scoped. If one physical tenant loses access to its secondary storage, that should not fail readiness for the entire cluster.

## Document store details

Document stores are declared once in the root `camunda.document.*` catalog. Each Physical Tenant inherits the catalog and overrides only the fields it needs — typically the bucket path or prefix — to ensure its data is written to a distinct location.

Isolation is enforced by validating the resolved `provider, bucket/container, path` tuple at startup. If two tenants resolve to the same tuple, Camunda fails startup and names the conflicting tenants in the error.

For configuration examples covering shared buckets with per-tenant paths, dedicated buckets per tenant, and GCP prefix isolation, see [document store isolation](./configuration-reference.md#document-store-isolation) in the configuration reference.

For the storage backends used by tenant-scoped data, see [secondary storage](../secondary-storage/index.md) and [document handling configuration](../document-handling/configuration/index.md).
