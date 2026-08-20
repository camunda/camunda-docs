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

Cluster admin protects the operations served under the `/cluster/v2/...` path prefix. These cover cluster status and topology, cluster mode changes, restore, exporting control, and runtime and history backups that fan out across every Physical Tenant.

| Area                | Operations                                                                                                                                                                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Status and topology | [Cluster status](/apis-tools/orchestration-cluster-api-rest/specifications/get-cluster-status.api.mdx), [cluster topology](/apis-tools/orchestration-cluster-api-rest/specifications/get-cluster-topology.api.mdx)                           |
| Recovery            | [Cluster restore](/apis-tools/orchestration-cluster-api-rest/specifications/restore-as-cluster-admin.api.mdx), [cluster mode change](/apis-tools/orchestration-cluster-api-rest/specifications/change-cluster-mode-as-cluster-admin.api.mdx) |
| Backup              | Runtime and history backup, exporting pause and resume. See [backup, restore, and scaling](/self-managed/concepts/physical-tenants/backup-restore-scaling.md).                                                                               |

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
Cluster admin was introduced in Camunda 8.10. Verify the configuration schema against your version's release notes before relying on it in production.

Under OIDC, configure at least one client, group, or claim. If none are configured, every bearer token is denied on `/cluster/v2/**` and the API becomes unreachable. Matching on `clients` or `groups` also requires the provider's `client-id-claim` and `groups-claim` to be set under `camunda.security.authentication.oidc`, otherwise startup fails.

Under Basic authentication, an empty or absent user list is accepted silently and leaves no cluster admin provisioned. Only a malformed entry, such as a duplicate or blank name or password, fails startup.
:::

## Related

- [Physical Tenants authorization model](/self-managed/concepts/physical-tenants/authorization-model.md)
- [Physical Tenants API routing](/self-managed/concepts/physical-tenants/api-routing.md)
- [Backup, restore, and scaling](/self-managed/concepts/physical-tenants/backup-restore-scaling.md)
- [Orchestration Cluster authorizations](../concepts/access-control/authorizations.md)
