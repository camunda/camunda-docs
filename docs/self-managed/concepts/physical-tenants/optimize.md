---
id: optimize
title: "Optimize and Physical Tenants"
sidebar_label: "Optimize"
description: "Learn how to deploy Optimize per Physical Tenant, how one Management Identity isolates multiple Optimize deployments, and the limitation with logical tenants that reuse the same ID across tenants."
---

Deploy a separate Optimize instance for each Physical Tenant, and share one Management Identity across all of them. With distinct Optimize audiences and roles, each Optimize instance authorizes access to its own data. If you also use logical tenants inside those instances, avoid the logical-tenant-ID collision described below.

:::note
This page assumes familiarity with the [Physical Tenant isolation model](./index.md) and the identity deployment models in [authentication and authorization](./authentication-authorization.md).
:::

## Deploy Optimize per Physical Tenant

Native multi-tenant Helm support does not manage multiple Optimize instances for you. Deploy Optimize separately for each Physical Tenant, as its own release with `global.topology.mode: optimize`, and configure it to connect to that tenant's orchestration cluster endpoint (`/physical-tenants/{physicalTenantId}`). Each Optimize instance imports records from, and serves data for, exactly one Physical Tenant. See [install an Optimize release](/self-managed/deployment/helm/install/topology/optimize-release.md) for the release-level requirements and a complete `optimize-values.yaml` example.

The Hub release provisions the Management Identity side of this for you: declare each Physical Tenant's Optimize instance under `global.topology.clusters[].physicalTenants[]` in the Hub release, and the chart registers a distinct OAuth2 client and resource server for it. See [configure Physical Tenants across releases](/self-managed/deployment/helm/install/topology/physical-tenants.md) for how this maps across the Hub, Orchestration Cluster, and Optimize releases, including index prefix isolation and release ordering.

```yaml
global:
  topology:
    clusters:
      - id: production-a
        # ...
        physicalTenants:
          - id: tenanta
            components:
              optimize:
                enabled: true
                clientId: optimize-production-a-tenanta
                audience: optimize-production-a-tenanta-api
                roleName: "Optimize Tenant A"
                redirectUrl: https://production-a.example.com/optimize-tenanta
                secret:
                  existingSecret: optimize-production-a-tenanta-oidc
                  existingSecretKey: client-secret
```

## How one Management Identity isolates multiple Optimize deployments

You do not need a separate Management Identity per Physical Tenant's Optimize instance. A single Management Identity instance can serve every Optimize deployment, provided each one is configured with its own `audience` and its own `roleName`, as shown above.

Isolation between Optimize instances is enforced by the role grant, not by the audience alone:

- Every Optimize instance also accepts a cluster-wide shared audience (the Hub or Web Modeler client audience), so a user's Hub session token can authenticate against any Optimize instance in the deployment. This is intentional. It lets Hub's business value dashboard call Optimize's API on the user's behalf. Authentication alone does not grant access to Optimize data.
- Management Identity stores permissions per audience. When an Optimize instance checks whether the current user may access it, it asks Management Identity for the permissions granted against its own configured audience, not the audience the token happened to authenticate with.
- A user only sees data from an Optimize instance if they hold a role that grants `write:*` on that instance's specific audience. Holding the shared Hub audience in a token is not sufficient on its own.

:::warning
Set a distinct `roleName` on every Optimize entry (cluster-level and per Physical Tenant) if you want isolated access between them. Every declared Optimize instance contributes its audience to the canonical `Optimize` role by default, and assigning that role grants access to every one of those instances at once. Set `components.optimize.roleName` to a unique value per instance when users must be authorized per Physical Tenant.
:::

## Known limitation: logical tenants with the same ID across Physical Tenants

[Logical tenants](/self-managed/components/optimize/configuration/multi-tenancy.md) remain available inside a Physical Tenant's Optimize instance, so a team can still subdivide its own workload by tenant ID. This is independent of Physical Tenant isolation, and it has a gap when Management Identity is shared:

Management Identity's tenant-authorization lookup has no concept of Physical Tenant. It returns a flat set of logical tenant IDs the user is assigned to, without saying which Physical Tenant's Optimize instance that assignment was meant for.

If the same logical tenant ID exists in two different Physical Tenants (for example, both tenant A and tenant B define a logical tenant called `b`), and a user:

1. is assigned that logical tenant ID in Management Identity, and
2. holds the Optimize role for both Physical Tenants' Optimize instances (see the role grant above),

that user sees the logical tenant's data in both Optimize instances, even though the underlying data belongs to two different, and otherwise isolated, Physical Tenants. Neither Optimize instance can tell that the two identically-named logical tenants are unrelated.

This only applies to a user who is already independently granted the Optimize role on both Physical Tenants' Optimize instances. A user granted the Optimize role for only one Physical Tenant's Optimize instance never reaches the other one, regardless of logical tenant assignment.

### How to avoid this

Choose one of the following when running several Physical Tenants' Optimize instances behind one shared Management Identity:

- Use unique logical tenant IDs across every Physical Tenant. This is the simplest option and removes the collision entirely. Camunda does not validate logical tenant ID uniqueness across Physical Tenants, so this is a naming convention you enforce yourself.
- Avoid granting the Optimize role for more than one Physical Tenant's Optimize instance to the same user, if you do reuse logical tenant IDs across tenants and need to keep them isolated.
- Run a separate Management Identity per Physical Tenant if you need both identical logical tenant IDs across tenants and independent enforcement of them. This trades the simpler single-Identity setup described above for full per-tenant identity isolation.

## Related pages

- [Physical Tenant isolation model](./index.md)
- [Authentication and authorization](./authentication-authorization.md)
- [Optimize multi-tenancy (logical tenants)](/self-managed/components/optimize/configuration/multi-tenancy.md)
- [Install an Optimize release](/self-managed/deployment/helm/install/topology/optimize-release.md)
- [Configure Physical Tenants across releases](/self-managed/deployment/helm/install/topology/physical-tenants.md)
