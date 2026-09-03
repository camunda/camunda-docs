---
id: getting-started
title: "Set up two isolated Physical Tenants"
sidebar_label: "Getting started"
description: "A hands-on walkthrough for adding a strongly isolated second team to a Camunda 8 Self-Managed cluster with Helm."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Set up a second, strongly isolated Physical Tenant on an existing Camunda 8 Self-Managed cluster, with its own storage, identity, and backups.

:::note The scenario
A bank runs its day-to-day operations on one Camunda 8 cluster today, the always-present `default` Physical Tenant. Its Risk team is now onboarding, and compliance requires Risk's process data, identity provider, and backups to be fully separate from Operations, without a second cluster to operate. This is the internal-domain pattern from [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md): strong isolation for teams that must not blur, on one platform.
:::

This guide assumes Kubernetes with the Camunda Helm chart and a shared Keycloak or external OIDC provider, the setup used in Camunda's own Physical Tenant benchmarking.

<Tabs groupId="storage-backend" queryString>
<TabItem value="rdbms" label="RDBMS" default>

This guide's examples isolate the new tenant with a separate schema on the same PostgreSQL instance `default` already uses.

</TabItem>
<TabItem value="es-os" label="Elasticsearch/OpenSearch">

The same steps apply, but isolate the new tenant with a distinct index prefix instead of a schema. See [Elasticsearch and OpenSearch storage](./storage-isolation.md#elasticsearch-and-opensearch-storage) for the prefix rules.

</TabItem>
</Tabs>

Before starting, read [Physical Tenant isolation model](./index.md) for the concepts this guide builds on. It links out to the [configuration reference](./configuration-reference.md), [Helm configuration guide](/self-managed/deployment/helm/configure/configure-physical-tenants.md), and [API routing](./api-routing.md) pages for full property and endpoint detail rather than repeating them here.

## Pre-flight checklist

Confirm each of these before you start, every item here has caused a real setup failure:

| Check                                                                                       | Why it matters                                                                                                                                                                     |
| :------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Running Camunda 8.10 Self-Managed Helm deployment                                           | Physical Tenants are a Self-Managed feature only, not available on SaaS in this release.                                                                                           |
| RDBMS (or Elasticsearch/OpenSearch) reachable for a second, distinct schema or index prefix | Startup fails if the new tenant's storage location collides with an existing one.                                                                                                  |
| Permission to register a new redirect URI in your IdP                                       | The new tenant needs its own callback URI registered before its first browser login.                                                                                               |
| Decide whether the new tenant uses the same IdP as `default`                                | Both tenants can share one OIDC provider and still authorize independently. See [choose an Identity Provider setup](./authentication-authorization.md#identity-deployment-models). |

<details>
<summary>Two behaviors that are easy to miss on a first rollout</summary>

- **Table and index prefixes are compared case-insensitively.** Configuring `riskprod_` for one tenant and `RISKPROD_` for another is treated as the same storage location and fails startup, not two distinct ones. Pick prefixes that are unique regardless of case.
- **Custom exporters need explicit per-tenant assignment.** The built-in Camunda, RDBMS, Elasticsearch, and OpenSearch exporters merge their configuration from the root automatically. A custom exporter loaded from a JAR does not, unless it implements its own merge logic, so it needs a full configuration block per tenant, and that tenant must list it under its own exporter assignment configuration rather than inheriting it from the root. If you don't use custom exporters, skip this.

</details>

<details>
<summary>Deploying from Web Modeler or Desktop Modeler?</summary>

To target a Physical Tenant from Desktop Modeler, change the cluster URL from `.../v2` to `.../physical-tenants/<physicalTenantId>/v2` and leave the client's tenant ID field unset. That field is for Logical Tenants, not Physical Tenants.

</details>

## Plan

Before touching configuration, decide three things for the new tenant:

1. **Storage**: a distinct RDBMS schema, database, or index prefix. This guide uses a separate schema on the same PostgreSQL instance `default` already uses, the lowest-effort option. See [RDBMS storage](./storage-isolation.md#rdbms-storage) for the tradeoffs against a dedicated database instance.
2. **Identity**: whether Risk reuses the platform's existing Keycloak/OIDC provider (recommended to start, since it's one less moving part) or connects its own IdP.
3. **Authorization**: who administers Risk's tenant, and what roles their process applications need. Physical Tenants don't inherit authorization from the cluster or from other tenants. Each tenant's `security.initialization` block is independent. See [per-tenant role and permission definitions](./authentication-authorization.md#per-tenant-role-and-permission-definitions).

For this walkthrough, the new tenant is named `riskprod`, reusing the existing Keycloak provider, with its own schema and its own authorization block.

## Configure

Add the following to your Helm values, either inline under `orchestration.configuration` or as a separate file under `orchestration.extraConfiguration`. Both approaches, and the full property list, are covered in [configure Physical Tenants in Helm chart](/self-managed/deployment/helm/configure/configure-physical-tenants.md). This example, adapted from Camunda's own two-tenant benchmark configuration, assumes the base `camunda.security.authentication` and `camunda.document` blocks for `default` are already in your values file. The minimum needed is storage and an assigned identity provider:

```yaml
orchestration:
  extraConfiguration:
    - file: physical-tenants.yaml
      content: |
        camunda:
          physical-tenants:
            riskprod:
              # Shared PostgreSQL instance, isolated by schema.
              data:
                secondary-storage:
                  rdbms:
                    url: jdbc:postgresql://db.example.com:5432/camunda?currentSchema=riskprod_schema

              security:
                authentication:
                  providers:
                    assigned:
                      - oidc # reuse the cluster-level OIDC provider
```

Add an authorization block so `riskprod` has an admin role of its own, every explicitly configured tenant needs one, it isn't inherited from the cluster:

<details>
<summary>Full authorization example for <code>riskprod</code></summary>

```yaml
security:
  initialization:
    roles:
      - roleId: riskprod-admin
        name: Risk Production Admin
        mappingRules:
          - riskprod-admins-mapping
    mappingrules:
      - mapping-rule-id: riskprod-admins-mapping
        claim-name: groups
        claim-value: risk-admins
    authorizations:
      - ownerType: ROLE
        ownerId: riskprod-admin
        resourceType: RESOURCE
        resourceId: "*"
        permissions:
          - CREATE
      - ownerType: ROLE
        ownerId: riskprod-admin
        resourceType: PROCESS_DEFINITION
        resourceId: "*"
        permissions:
          - CREATE_PROCESS_INSTANCE
          - UPDATE_PROCESS_INSTANCE
          - READ_PROCESS_INSTANCE
          - READ_PROCESS_DEFINITION
```

Add this block alongside `security.authentication` above, under the same `riskprod` tenant.

</details>

Before applying this, create the `riskprod_schema` schema on your PostgreSQL instance. Camunda validates that the schema exists at startup; it does not create it for you. See [validation and operations](./storage-isolation.md#validation-and-operations).

Now register `riskprod`'s redirect URI in your IdP. In Keycloak, add `/physical-tenants/riskprod/sso-callback` to the client's allowed redirect URIs. See [IdP redirect URI registration](./authentication-authorization.md#idp-redirect-uri-registration). Skip this and the first browser login to `riskprod` fails at the IdP, not at Camunda.

## Deploy

Apply the updated values with a rolling restart:

```bash
helm upgrade camunda camunda/camunda-platform -f values.yaml
```

Adding a Physical Tenant always requires a rolling restart. There's no dynamic, restart-free way to add one in this release. `default` keeps serving requests throughout the rollout. See [rolling restart expectations](./provisioning-and-lifecycle.md#rolling-restart-expectations).

Confirm `riskprod` is up before deploying a process to it:

```bash
curl https://your-cluster/physical-tenants/riskprod/v2/topology
```

Deploy your process to `riskprod` from Web Modeler or Desktop Modeler by targeting its tenant URL (see the pre-flight checklist), or from the CLI/Java client by connecting a client scoped to `riskprod` (see [API walkthrough](#api-walkthrough) below) and calling the deploy operation as usual.

## Run and verify

1. Start a process instance scoped to `riskprod` (see [API walkthrough](#api-walkthrough)).
2. Open `https://your-cluster/physical-tenants/riskprod/operate` and confirm the instance is visible.
3. In a second browser tab, open `https://your-cluster/physical-tenants/default/operate`. Confirm the `riskprod` instance does **not** appear, and that `default`'s own instances are unaffected. Each tenant has its own path-scoped session, so you can be logged into both at once without one logout affecting the other. See [session behavior](./api-routing.md#session-behavior).
4. Try opening `riskprod`'s Operate with a user who only has a role in `default`. Expect a `403`, not a redirect to `default`'s data, confirming the two tenants don't fall back to each other on authorization failure.

This confirms the isolation the rest of the guide assumes: two tenants, one cluster, no visibility across the boundary.

## API walkthrough

| Client          | How to target `riskprod`                                                                                                                                                                                                                                             |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| REST            | Prefix every request with `/physical-tenants/riskprod/`, for example `POST /physical-tenants/riskprod/v2/process-definitions/search`. Plain `/v2/...` requests always resolve to `default`.                                                                          |
| gRPC            | Send the `Camunda-Physical-Tenant: riskprod` header (metadata) on each call. Omitting it routes to `default`.                                                                                                                                                        |
| Java client     | Set `.physicalTenantId("riskprod")` when building the `CamundaClient`. This scopes both REST and gRPC calls made through that client, no separate REST configuration needed. See [Physical Tenants in the Java client](/apis-tools/java-client/physical-tenants.md). |
| Desktop Modeler | Change the deployment target's cluster URL to end in `/physical-tenants/riskprod/v2`, leave the tenant ID field unset.                                                                                                                                               |

To filter search results by tenant, you don't need a request parameter. The tenant is already fixed by which prefix, header, or client you used to make the call. A `riskprod`-scoped search never returns `default`'s data and vice versa.

For the full REST path reference and status code meanings, see [tenant-scoped REST API routing](./api-routing.md#tenant-scoped-rest-api-routing) and [HTTP status codes](./api-routing.md#http-status-codes).

## Web app walkthrough

| Web app  | `riskprod` URL                                            |
| :------- | :-------------------------------------------------------- |
| Operate  | `https://your-cluster/physical-tenants/riskprod/operate`  |
| Tasklist | `https://your-cluster/physical-tenants/riskprod/tasklist` |

To try a user task end to end in the new tenant:

1. Deploy a process containing a user task to `riskprod`, and start an instance.
2. Open Tasklist at `riskprod`'s URL, claim the task, complete it.
3. Open Tasklist at `default`'s URL. Confirm the task is not visible there.

There's no tenant switcher inside either web app. Switching tenants means navigating to the other tenant's URL, which loads a fully separate session. See [webapp routing](./api-routing.md#webapp-routing).

## Day-2 operations

These operations are documented in full elsewhere. This section only covers the tenant-specific part of each.

**Scale `riskprod`'s partitions independently of `default`:**

```bash
curl -X PATCH "https://your-cluster/actuator/cluster?physicalTenant=riskprod" \
  -d '{"partitions": {"count": 6}}'
```

Only `riskprod`'s partition group changes. See [scale a cluster with multiple Physical Tenants](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#scale-a-cluster-with-multiple-physical-tenants) for broker count, replication factor, and the other scaling dimensions.

**Back up `riskprod` specifically:** call the tenant-scoped endpoint rather than the cluster-wide one, `POST /physical-tenants/riskprod/v2/backups/history`, using a role granted both `BACKUP:CREATE` and `EXPORTER:PAUSE` (exporting must pause for the duration of a history backup). See [back up a cluster with multiple Physical Tenants](/self-managed/operational-guides/backup-restore/backup-and-restore.md#back-up-a-cluster-with-multiple-physical-tenants) for the full endpoint reference and required permissions.

**Restore `riskprod` without affecting `default`:** the recovery-mode and restore endpoints target one tenant at a time by default. Prefix them with `/physical-tenants/riskprod`. See [restore a cluster with multiple Physical Tenants](/self-managed/operational-guides/backup-restore/in-process-restore.md#restore-a-cluster-with-multiple-physical-tenants) for the full procedure. This is destructive to the targeted tenant's data. Follow that guide directly rather than improvising from this summary.

**Add a third tenant:** add its configuration block (following the same shape as `riskprod` above) and apply with a rolling restart. It's provisioned automatically, with no separate creation step. Removing a tenant from configuration disables it and retains its data; re-adding it later re-enables the tenant with that same data intact. There's no permanent-delete operation in this release. An actuator endpoint can logically remove an already-disabled tenant from the cluster topology (useful so a disabled tenant doesn't block operations like multi-region failover), but it deletes no data. See [disable, rename, and delete](./provisioning-and-lifecycle.md#disable-rename-and-delete).

Once you're validating a third tenant's rollout, check its topology alongside the cluster's overall status: `GET /physical-tenants/<id>/v2/topology` for the tenant, `GET /cluster/v2/topology` for the whole cluster (requires [cluster admin](/components/admin/cluster-admin.md) access).

## Troubleshooting this scenario

For issues beyond this specific setup flow, see [troubleshoot Physical Tenants](./troubleshooting.md). These are the failures most likely to hit you during this walkthrough:

| Symptom                                                                       | Likely cause                                                                                                      | Fix                                                                                                                                                                                                         |
| :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Startup fails naming `riskprod` and another tenant sharing a storage location | Two tenants resolved to the same schema, database, or index prefix, including two prefixes differing only by case | Pick a schema or prefix unique regardless of case. See [validation and operations](./storage-isolation.md#validation-and-operations).                                                                       |
| Startup fails: `riskprod` must declare `providers.assigned`                   | A non-default tenant was configured without assigning an identity provider                                        | Add `security.authentication.providers.assigned` under `riskprod`, even if it reuses the cluster's only provider. See [IdP provider assignment](./authentication-authorization.md#idp-provider-assignment). |
| First login to `riskprod` fails at the IdP, before reaching Camunda           | The tenant's redirect URI was never registered                                                                    | Register `/physical-tenants/riskprod/sso-callback` in your IdP. See [IdP redirect URI registration](./authentication-authorization.md#idp-redirect-uri-registration).                                       |
| A user with a role in `riskprod` gets `403` in `default`, or vice versa       | Expected behavior, not a bug                                                                                      | Authorization is per tenant by design. Grant the role in each tenant where the user needs access.                                                                                                           |
| A custom exporter's per-tenant settings seem to be ignored                    | Custom exporters don't inherit root-level config unless they implement their own merge logic                      | Declare the exporter's full configuration under each tenant, and assign it explicitly to that tenant rather than relying on inheritance from the root.                                                      |
| `riskprod` stays disabled after being re-added to configuration               | Configuration wasn't applied with a rolling restart                                                               | Re-adding a tenant to configuration takes effect on the next rolling restart, not immediately.                                                                                                              |

**Finding logs**: broker and gateway logs aren't split per tenant. A single broker pod can host partitions for both `default` and `riskprod`. Get logs the normal Kubernetes way (`kubectl logs <pod-name>`), then filter for the tenant ID. Transition and validation log lines name the affected tenant directly, so grepping for `riskprod` isolates its entries from a shared pod's log.

## Lessons learned

- **Start with one shared IdP.** Connecting a second tenant to its own separate identity provider is supported, but it's a second thing to get wrong on your first rollout. Prove the pattern with a shared provider first, then split identity later if compliance requires it.
- **Storage isolation errors happen at startup, not at runtime.** Getting the schema, database, or prefix wrong fails the rollout immediately and names both conflicting tenants. It doesn't silently share data. Treat a failed rollout here as the isolation check working, not a bug.
- **Authorization doesn't compose across tenants, budget for it.** Every explicitly configured tenant needs its own complete `security.initialization` block. For two tenants this is a few extra lines; for ten, template it rather than hand-writing each one.
- **Add tenants for isolation boundaries, not for scale.** If Risk just needs more throughput on the same data and identity as Operations, that's a partition-count or broker-count change within one tenant, not a new tenant. Reach for a new Physical Tenant when a team needs its own storage, identity, or backup, not just more capacity.

## Related pages

- [Physical Tenant isolation model](./index.md)
- [Configuration reference](./configuration-reference.md)
- [Provisioning and lifecycle](./provisioning-and-lifecycle.md)
- [Storage isolation](./storage-isolation.md)
- [Authentication and authorization](./authentication-authorization.md)
- [API routing](./api-routing.md)
- [Troubleshoot Physical Tenants](./troubleshooting.md)
- [Configure Physical Tenants in Helm chart](/self-managed/deployment/helm/configure/configure-physical-tenants.md)
