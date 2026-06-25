---
id: configuration-reference
title: "Configuration reference"
sidebar_label: "Configuration reference"
description: "Configure Physical Tenants with root defaults, per-tenant overrides, and startup validation rules."
---

This page explains how to configure Physical Tenants in Camunda 8.10 for Self-Managed deployments.

In 8.10, configuration is static. You define Physical Tenants in startup configuration, then apply changes with a rolling restart.

## Configuration model

At startup, Camunda resolves tenant configuration using this model:

1. Root-level `camunda.*` acts as the implicit base configuration.
2. The `default` Physical Tenant is always present.
3. Optional `camunda.physical-tenants.default.*` overrides the root-level values for the default Physical Tenant.
4. Additional tenants are configured under `camunda.physical-tenants.<tenant-key>.*`.

## Section structure

Use this structure for Physical Tenants:

```yaml
camunda:
  # Root-level defaults (implicit default tenant base)
  database:
    url: jdbc:postgresql://db/shared
  security:
    authentication:
      method: oidc
      providers:
        # Cluster-level provider definitions
        my-idp:
          type: oidc

  physical-tenants:
    # Optional overrides for the always-present default tenant
    default:
      initialization:
        # Required when you override default-tenant values
        partitionsCount: 3
      database:
        url: jdbc:postgresql://db/default_tenant
      security:
        authentication:
          providers:
            assigned:
              - my-idp

    # Additional Physical Tenant
    tenanta:
      initialization:
        partitionsCount: 3
      database:
        url: jdbc:postgresql://db/tenanta
      security:
        authentication:
          providers:
            assigned:
              - my-idp
```

## Required and optional properties per tenant

For a configured tenant entry under `camunda.physical-tenants.<tenant-key>`:

- Required when present:
  - `initialization` block, if the tenant overrides defaults.
  - `security.authentication.providers.assigned` to assign one or more cluster-defined identity providers.
- Optional:
  - Any tenant-overridable `camunda.*` properties that support per-tenant override behavior.

Identity providers are defined at cluster level, then assigned per tenant. Physical Tenants do not define tenant-local provider objects.

## Cluster-wide defaults and per-tenant overrides

Use root-level `camunda.*` for shared defaults across all tenants.

Use `camunda.physical-tenants.<tenant-key>.*` only for tenant-specific differences.

### Cluster-only properties

The following properties are cluster-scoped and cannot be overridden per tenant:

- `method`
- `cluster-admin`
- `csrf`
- `multi-tenancy`
- `http-headers`
- `authentication-refresh-interval`

## Default tenant behavior and compatibility

The `default` Physical Tenant is always present in 8.10 and is immutable.

For backward compatibility:

- Existing root-level single-tenant configuration maps to the `default` Physical Tenant.
- If you upgrade from 8.9 to 8.10, no manual migration step is required for this mapping.
- `camunda.physical-tenants.default.*` is interpreted as overrides for the existing default tenant, not as creation of a new tenant.

## Validation and constraints

At startup, configuration validation enforces tenant-level constraints.

Known constraints and behavior for 8.10:

- Tenant keys in `camunda.physical-tenants.<tenant-key>` must be lowercase alphanumeric (`[a-z0-9]+`) with a maximum length of 64 characters.
- Validation is expected to reject unsupported or colliding storage configurations across tenants.
- Validation failures are startup failures, not runtime warnings.

<!--
TODO(physical-tenants): Add the final cross-tenant storage collision matrix once implementation details are finalized.
Include explicit rules for:
- RDBMS schema/table-prefix collisions
- Elasticsearch/OpenSearch index-prefix collisions
- Document store bucket/path collisions
-->

## Configuration examples

### application.yaml

```yaml
camunda:
  database:
    url: jdbc:postgresql://db/default

  security:
    authentication:
      method: oidc
      providers:
        corp-idp:
          type: oidc

  physical-tenants:
    default:
      initialization:
        partitionsCount: 3
      security:
        authentication:
          providers:
            assigned:
              - corp-idp

    riskprod:
      initialization:
        partitionsCount: 3
      database:
        url: jdbc:postgresql://db/riskprod
      security:
        authentication:
          providers:
            assigned:
              - corp-idp
```

### Environment variables

Spring environment variable mapping follows canonical property conversion:

```bash
CAMUNDA_DATABASE_URL=jdbc:postgresql://db/default
CAMUNDA_SECURITY_AUTHENTICATION_METHOD=oidc
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_CORP_IDP_TYPE=oidc

CAMUNDA_PHYSICALTENANTS_DEFAULT_INITIALIZATION_PARTITIONSCOUNT=3
CAMUNDA_PHYSICALTENANTS_DEFAULT_SECURITY_AUTHENTICATION_PROVIDERS_ASSIGNED_0=corp-idp

CAMUNDA_PHYSICALTENANTS_RISKPROD_INITIALIZATION_PARTITIONSCOUNT=3
CAMUNDA_PHYSICALTENANTS_RISKPROD_DATABASE_URL=jdbc:postgresql://db/riskprod
CAMUNDA_PHYSICALTENANTS_RISKPROD_SECURITY_AUTHENTICATION_PROVIDERS_ASSIGNED_0=corp-idp
```

If YAML and environment variables are used together, use the same normalized tenant key in both forms.

### Helm values

If you deploy with Helm, provide equivalent values in your `values.yaml` for the same underlying Camunda properties. Helm customers use the same application-level properties directly without chart-specific tenant keys.

```yaml
# Example shape only. Map these values to your chart's current Camunda property injection mechanism.
camunda:
  database:
    url: jdbc:postgresql://db/default
  physical-tenants:
    default:
      initialization:
        partitionsCount: 3
    riskprod:
      initialization:
        partitionsCount: 3
      database:
        url: jdbc:postgresql://db/riskprod
```

## Related pages

- [Physical Tenant isolation model](./index.md)
- [Provisioning and lifecycle](./provisioning-and-lifecycle.md)
- [Multi-tenancy overview](../multi-tenancy/index.md)
