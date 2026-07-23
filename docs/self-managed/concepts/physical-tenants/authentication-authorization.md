---
id: authentication-authorization
title: "Authentication and authorization for Physical Tenants"
sidebar_label: "Authentication and authorization"
description: "Learn how identity providers, token routing, and per-tenant authorization work for Physical Tenants in Camunda 8.10."
---

<!-- TODO: Update this page once camunda/camunda#55259 finalizes typed config and property names for the per-tenant identity overlay. -->

This page explains how authentication and authorization work for Physical Tenants in Camunda 8.10 Self-Managed deployments.

For the configuration properties used to assign identity providers to tenants, see [configuration reference](./configuration-reference.md).

For how operations are authorized at the cluster and tenant level, see [authorization model](./authorization-model.md).

## Centralized identity model

In Camunda 8.10, identity is **centralized at the cluster boundary**. This means:

- Identity providers (IdPs) are defined once at the cluster level.
- Each Physical Tenant selects which cluster-defined providers it accepts using `providers.assigned`.
- Physical Tenants cannot introduce their own IdP definitions outside the cluster-level list.

This design keeps identity management simple and avoids per-engine IdP fragmentation, which is explicitly not recommended for Physical Tenants. Configuring a separate identity provider per engine increases operational complexity without additional security benefit for most use cases.

## Identity deployment models

Camunda 8.10 supports two recommended identity deployment models for Physical Tenants. A third model for advanced or managed-service scenarios is available but not recommended as a baseline.

### Model A: Single IdP, single client

All Physical Tenants use one identity provider and one client registration. Roles and permissions are differentiated within that client by tenant-specific mapping rules.

Use Model A when:

- You have one organization or team using a single IdP.
- You want simple configuration with a single client.
- Role differentiation per tenant is handled through token claims or group mappings in Camunda.

### Model B: Single IdP, multiple role-level clients

All Physical Tenants use one identity provider, but each tenant (or role level) has a dedicated client registration. Camunda distinguishes clients by matching both the **issuer** (`iss` claim) to identify the IdP and the **audience** (`aud` claim) to identify the specific role-level client.

Use Model B when:

- You need stricter per-tenant token isolation.
- Different teams or departments require separate client configurations.
- You want role-level client separation within one IdP.

Model B is the recommended baseline for most customers deploying Physical Tenants in 8.10.

### Model C: Multiple IdPs (advanced)

Each Physical Tenant uses a separate identity provider. This model is intended for managed services or advanced deployments where tenants are fully autonomous organizations with their own IdPs.

Model C is not a recommended baseline for 8.10. Use it only when:

- Tenants are separate organizations that each manage their own IdP.
- You are operating a managed service where per-tenant IdP autonomy is required.

## How token routing works

When a request arrives at an authenticated endpoint, Camunda matches the JWT token to the correct identity provider using two steps:

1. **Issuer matching:** The token's `iss` claim identifies which configured IdP issued the token.
2. **Audience matching (Model B):** For deployments with multiple role-level clients under the same IdP, the token's `aud` claim identifies the specific client registration. Camunda rejects tokens whose audience does not match the tenant's allowed configuration.

Both checks are enforced at the API security filter chain level. A token whose `iss` claim matches no configured provider fails with an authentication error naming the unrecognized issuer. A token with a valid issuer but a non-matching audience is also rejected.

## Per-tenant authorization

Roles, permissions, and mapping rules are local to each Physical Tenant — they are **not** stored or managed in the identity provider.

- Each Physical Tenant has its own roles and permission definitions.
- Mapping rules translate IdP token claims into Camunda roles independently per tenant.
- A user can be admin in one tenant and read-only in another, defined independently in each tenant.

This means the IdP only authenticates users and supplies claims. Authorization — what a user can do within a tenant — is determined by that tenant's local mapping rules in Camunda.

## Per-tenant role and permission definitions

Each Physical Tenant defines its own roles, permissions, and mapping rules independently. There is no automatic cross-tenant role inheritance from the cluster level.

Role definitions within a tenant cover:

- What operations a role can perform within that tenant (for example, deploy processes, start instances, complete tasks)
- Which token claims or values map to which Camunda roles within that tenant

Because each tenant manages its own authorization, the same user can have different permissions in different Physical Tenants.

<!-- TODO (camunda/camunda#55259): Add the YAML shape for per-tenant role definitions and token claim mappings once the typed config is confirmed. -->

## Token claim mappings

Mapping rules define how token claims from the IdP translate into Camunda roles within a Physical Tenant. Each tenant applies its own mapping rules independently, enabling different access levels for the same user across tenants.

For example, a token claim `groups: ["team-a-admins"]` might map to an admin role in one Physical Tenant but have no effect in another tenant where that claim is not configured.

## IdP provider assignment

Every explicitly configured Physical Tenant must declare which identity providers it accepts using `providers.assigned`. If no providers are assigned to a configured tenant, the cluster fails to start with a configuration validation error.

The one exception is the **implicit default tenant**: when no `camunda.physical-tenants.*` configuration is present, the default tenant falls back to the full cluster provider set. Once the default tenant is explicitly configured under `camunda.physical-tenants.default`, it must also declare its assigned providers.

```yaml
camunda:
  security:
    authentication:
      method: oidc
      providers:
        oidc:
          corp-idp:
            issuer-uri: https://corp-idp.example.com/realms/camunda
            client-id: camunda-client
            client-secret: ${CORP_IDP_CLIENT_SECRET}
            audiences:
              - camunda-api
            username-claim: preferred_username

  physical-tenants:
    tenanta:
      security:
        authentication:
          providers:
            assigned:
              - corp-idp
```

For complete configuration examples, see [configuration reference](./configuration-reference.md).

## Session isolation

Each Physical Tenant has its own path-scoped session cookie. The browser only sends the session cookie for that tenant's URL prefix (`/physical-tenants/<id>`), so sessions from different tenants do not interfere.

For example:

- Tenant A: `camunda-session-tenanta`, scoped to `/physical-tenants/tenanta`
- Default tenant: `camunda-session-default`, scoped to `/physical-tenants/default`

## Cluster-admin role

:::note
Cluster-admin role support and cluster-wide operations are not available in 8.10. They are planned for a future release.
:::

In a future release, the cluster-admin role will be resolved from JWT token claims using configurable mapping rules. No persisted cluster-level role bindings or new cluster identity service will be required. Multiple mechanisms will be supported: claim-based mapping rules, a dedicated cluster-admin configuration, and explicit user assignment for basic auth.

## gRPC authentication

gRPC clients specify the target Physical Tenant using the `Camunda-Physical-Tenant` request header (metadata in gRPC terms). Requests that omit the header route to the `default` Physical Tenant.
