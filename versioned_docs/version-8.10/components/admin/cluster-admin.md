---
id: cluster-admin
title: "Cluster admin"
sidebar_label: "Cluster admin"
description: "Cluster admin is a coarse-grained role for cluster-wide operations that span all Physical Tenants in an Orchestration Cluster."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<span class="badge badge--platform">Self-Managed only</span>

Cluster admin is a role for operations that apply to an entire [Orchestration Cluster](../orchestration-cluster.md), rather than a single Physical Tenant. It is separate from the [tenant-scoped roles and authorizations](authorization.md) managed elsewhere in Admin, and uses its own credentials.

:::note
Cluster admin was added in 8.10 alongside [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md). It is most relevant in clusters running multiple Physical Tenants, where cluster-wide visibility and recovery operations span Physical Tenant boundaries.
:::

## How cluster admin differs from tenant-scoped access

- Cluster admin is authenticated and authorized separately from Orchestration Cluster user sessions. It does not share credentials, roles, or mapping rules with tenant-scoped users.
- Cluster admin credentials are verified against an isolated user store bound to `/cluster/v2/**`. A cluster admin has no route to `/physical-tenants/{physicalTenantId}/v2/...` endpoints, and no existing tenant role grants cluster admin implicitly. Configure it explicitly, as described in [Configure cluster admin access](#configure-cluster-admin-access).
- Authorization is coarse-grained by design. Cluster admin grants access to all cluster-level operations. There are no sub-roles or partial cluster admin grants.

## Cluster-wide operations

Cluster admin protects the operations served under the `/cluster/v2/...` path prefix. Every one of these operations fans out across all Physical Tenants in the cluster.

| Area                | Endpoints                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| Status and topology | `GET /cluster/v2/status`, `GET /cluster/v2/topology`                                                 |
| Backup              | `/cluster/v2/backups/runtime`, `/cluster/v2/backups/runtime/state`, `/cluster/v2/backups/history`    |
| Exporting           | `GET /cluster/v2/exporting`, `POST /cluster/v2/exporting/pause`, `POST /cluster/v2/exporting/resume` |
| Recovery            | `POST /cluster/v2/restore`, `PATCH /cluster/v2/mode`                                                 |
| Partition placement | `POST /cluster/v2/rebalance`                                                                         |

Each cluster-wide endpoint also accepts an optional `physicalTenantId` query parameter, which narrows the same cluster-admin operation to a single Physical Tenant without switching to the tenant-scoped API. Omitting the parameter targets every Physical Tenant.

For the operator procedures that use these endpoints, see [back up and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md#back-up-a-cluster-with-multiple-physical-tenants), [in-process restore](/self-managed/operational-guides/backup-restore/in-process-restore.md#restore-a-cluster-with-multiple-physical-tenants), and [cluster scaling](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#scale-a-cluster-with-multiple-physical-tenants). Scaling and multi-region failover use the actuator surface rather than this API.

For request and response schemas, see the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) reference.

Cluster admin protects every operation under this prefix except `GET /cluster/v2/status`, which is deliberately unauthenticated so load balancers and operators can use it as a health check. Cluster topology is its authenticated counterpart, because topology exposes Physical Tenant identifiers.

## Configure cluster admin access

Assign cluster admin access using one of two methods. Which one applies is determined by `camunda.security.authentication.method`, not by choice: only the chain matching your cluster's authentication method is instantiated.

The cluster admin chain is stateless in both modes. An existing web application session cookie can never authenticate a `/cluster/v2/**` request.

Under OIDC, tokens are issued by the cluster's default provider. For the `client_credentials` flow and request examples, see [Orchestration Cluster API authentication](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

<Tabs groupId="clusterAdminAuth" defaultValue="basic" queryString values={[{label: 'Basic authentication', value: 'basic' }, {label: 'OIDC', value: 'oidc' }]}>

<TabItem value="basic">

Define one or more cluster admin users directly in configuration:

```yaml
camunda:
  security:
    cluster-admin:
      basic:
        users:
          - name: cluster-operator
            password: <password>
```

</TabItem>

<TabItem value="oidc">

Match cluster admin against a claim in the access token, such as a specific client, group, or custom claim:

```yaml
camunda:
  security:
    cluster-admin:
      oidc:
        clients:
          - cluster-admin-client
        groups:
          - cluster-operators
        # claims:
        #   - name: <claim-name>
        #     value: <claim-value>
```

</TabItem>

</Tabs>

:::warning
Under OIDC, configure at least one client, group, or claim. If none are configured, every bearer token is denied on `/cluster/v2/**` and the API becomes unreachable. Matching on `clients` or `groups` also requires the provider's `client-id-claim` and `groups-claim` to be set under `camunda.security.authentication.oidc`, otherwise startup fails.

Under Basic authentication, an empty or absent user list is accepted silently and leaves no cluster admin provisioned. Only a malformed entry, such as a duplicate or blank name or password, fails startup.
:::

## Related

- [Physical Tenants authorization model](/self-managed/concepts/physical-tenants/authorization-model.md)
- [Physical Tenants API routing](/self-managed/concepts/physical-tenants/api-routing.md)
- [Back up and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md)
- [Cluster scaling](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md)
- [Orchestration Cluster authorizations](../concepts/access-control/authorizations.md)
