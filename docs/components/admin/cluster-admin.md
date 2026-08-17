---
id: cluster-admin
title: "Cluster admin"
sidebar_label: "Cluster admin"
description: "Cluster admin is a coarse-grained role for cluster-wide operations that span all Physical Tenants in an Orchestration Cluster."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<span class="badge badge--platform">Self-Managed only</span>

Cluster admin is a role for operations that apply to an entire [Orchestration Cluster](../orchestration-cluster.md), rather than a single tenant. It's separate from the [tenant-scoped roles and authorizations](authorization.md) managed elsewhere in Admin, and uses its own credentials.

:::note
Cluster admin was added in 8.10 alongside [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md). It's most relevant in clusters running multiple Physical Tenants, where cluster-wide visibility and recovery operations span tenant boundaries.
:::

## How cluster admin differs from tenant-scoped access

- Cluster admin is authenticated and authorized separately from Orchestration Cluster user sessions. It does not share credentials, roles, or mapping rules with tenant-scoped users.
- Cluster admin access does not grant admin rights within any specific Physical Tenant, and no existing role grants cluster admin implicitly. You must configure it explicitly — see [Configure cluster admin access](#configure-cluster-admin-access).
- Authorization is coarse-grained by design: cluster admin grants access to all cluster-level operations. There are no sub-roles or partial cluster admin grants.

## Cluster-wide operations

Cluster admin protects the following REST operations, all under the `/cluster/v2/...` path prefix:

| Operation                 | Method and path            | Authentication                                                   |
| ------------------------- | -------------------------- | ---------------------------------------------------------------- |
| Cluster status            | `GET /cluster/v2/status`   | None — public, for health checks by load balancers and operators |
| Cluster topology          | `GET /cluster/v2/topology` | Cluster admin                                                    |
| Change cluster mode       | `PATCH /cluster/v2/mode`   | Cluster admin                                                    |
| Trigger a cluster restore | `POST /cluster/v2/restore` | Cluster admin                                                    |

All four operations were added in 8.10.

:::note
These endpoints aren't yet reflected in the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md) reference. Full request and response schemas will be available there once the generated reference is updated.
:::

## Configure cluster admin access

Assign cluster admin access using one of two methods, matching your cluster's authentication method. The two methods are mutually exclusive.

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

Match cluster admin against a claim in the access token — for example, a specific client, group, or custom claim:

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

:::caution
Cluster admin is a recent addition to Camunda 8.10. Verify the exact configuration schema against your version's release notes before relying on it in production.
:::

## Related

- [Physical Tenants authorization model](/self-managed/concepts/physical-tenants/authorization-model.md)
- [Physical Tenants API routing](/self-managed/concepts/physical-tenants/api-routing.md)
- [Orchestration Cluster authorizations](../concepts/access-control/authorizations.md)
