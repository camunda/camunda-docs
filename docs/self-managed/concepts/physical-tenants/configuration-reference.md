---
id: configuration-reference
title: "Configuration reference"
sidebar_label: "Configuration reference"
description: "Configure Physical Tenants with root defaults, per-tenant overrides, and startup validation rules."
---

This page explains how to configure Physical Tenants in Camunda 8.10 for Self-Managed deployments.

In 8.10, configuration is static. You define Physical Tenants in application configuration, then apply changes with a rolling restart.

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
  data:
    secondary-storage:
      rdbms:
        url: jdbc:postgresql://db/shared
  security:
    authentication:
      method: oidc
      providers:
        # Cluster-level provider definitions
        oidc:
          my-idp:
            issuer-uri: https://my-idp.example.com/realms/camunda
            client-id: camunda-client
            client-secret: ${MY_IDP_CLIENT_SECRET}
            audiences:
              - camunda-api
            username-claim: preferred_username

  physical-tenants:
    # Optional overrides for the always-present default tenant
    default:
      cluster:
        # Required when you override default-tenant values
        partitions-count: 3
      data:
        secondary-storage:
          rdbms:
            url: jdbc:postgresql://db/default_tenant
      security:
        authentication:
          providers:
            assigned:
              - my-idp

    # Additional Physical Tenant
    tenanta:
      cluster:
        partitions-count: 3
      data:
        secondary-storage:
          rdbms:
            url: jdbc:postgresql://db/tenanta
      security:
        authentication:
          providers:
            assigned:
              - my-idp
```

## Required and optional properties per tenant

Each configured tenant under `camunda.physical-tenants.<tenant-key>` must assign at least one cluster-defined identity provider through `security.authentication.providers.assigned`. All other tenant-level properties are optional overrides of the root-level defaults.

Identity providers are defined at the cluster level, then assigned per tenant. Physical Tenants do not define tenant-local provider objects.

For the full list of available properties, see the [Orchestration Cluster configuration properties](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md) reference.

## Cluster-wide defaults and per-tenant overrides

Use root-level `camunda.*` for shared defaults across all tenants.

Use `camunda.physical-tenants.<tenant-key>.*` only for tenant-specific differences.

Some properties are cluster-scoped and cannot be overridden per tenant. Per-tenant override behavior is indicated in the [Orchestration Cluster configuration properties](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md) reference.

## Default tenant behavior and compatibility

The `default` Physical Tenant is always present in 8.10 and is immutable.

For backward compatibility:

- Existing root-level single-tenant configuration maps to the `default` Physical Tenant.
- If you upgrade from 8.9 to 8.10, no manual migration step is required for this mapping.
- `camunda.physical-tenants.default.*` is interpreted as overrides for the existing default tenant, not as creation of a new tenant.

## Validation and constraints

At startup, configuration validation enforces tenant-level constraints. All validation failures throw a `UnifiedConfigurationException` and prevent the cluster from starting — there is no separate error code, and the message is reported at startup rather than logged as a warning. For the exact error message when a tenant is missing `providers.assigned`, see [IdP provider assignment](./authentication-authorization.md#idp-provider-assignment).

Known constraints and behavior for 8.10:

- Tenant keys in `camunda.physical-tenants.<tenant-key>` must be lowercase alphanumeric (`[a-z0-9]+`) with a maximum length of 64 characters.
- Validation rejects unsupported or colliding storage configurations across tenants.
- For RDBMS-backed secondary storage, the combination of `camunda.data.secondary-storage.rdbms.url` and the effective table prefix must be unique per tenant.
- For Elasticsearch and OpenSearch, the effective index prefix must be unique per tenant.
- For object stores, backend-specific location combinations must be unique per tenant:
  - AWS S3: Bucket name and bucket path.
  - GCP: Bucket name and prefix.
  - Azure: Container name, container path, and endpoint.
  - Local filesystem: Path.
- Validation failures are startup failures, not runtime warnings.
- **Document store**: non-default tenants must declare `document.assigned`. Startup also fails if two tenants resolve to the same provider, bucket or container, and path. The error names the conflicting tenants.

### Startup error message formats

**Secondary storage (RDBMS, Elasticsearch, or OpenSearch) location conflict:**

```text
Physical tenants must not share a secondary-storage location, or they would write into the same
database. Use a distinct connection, or a distinct index/table prefix per tenant. Conflicts: tenants
[tenanta, tenantb] share the same secondary-storage location [type=rdbms,
connection=jdbc:postgresql://db/shared, namespace='']
```

For Oracle, a colliding RDBMS location additionally appends a hint to isolate by schema-per-user instead: `To isolate Oracle physical tenants by schema-per-user (distinct DB users on a shared jdbc url), set data.secondary-storage.rdbms.database-vendor-id: oracle on each tenant.`

**Document store location conflict:**

```text
Physical tenants must not share a document store location, or they would read and write into the
same backing storage. Use a distinct bucket, container, or path per tenant, and never nest one
tenant's path inside another's — a nested path is reachable through a caller-supplied document id,
which no object store bounds at '/'. Conflicts: tenants [tenanta, tenantb] share the same document
store location [provider=aws, namespace=[company-docs-bucket], keyPrefix='tenant-a']
```

If one tenant's path is nested inside another's rather than identical, the message instead reads: `tenant <enclosing> 's document store location [...] encloses tenant <enclosed> 's [...]`.

## Configuration examples

### application.yaml

```yaml
camunda:
  data:
    secondary-storage:
      rdbms:
        url: jdbc:postgresql://db/default
  document:
    default-store-id: shared-s3
    aws:
      shared-s3:
        bucket-name: company-docs-bucket
        bucket-path: default/

  database:
    url: jdbc:postgresql://db/default

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
    default:
      cluster:
        partitions-count: 3
      document:
        default-store-id: shared-s3
        assigned:
          - shared-s3
        # inherits bucket-path: default/ from root
      security:
        authentication:
          providers:
            assigned:
              - corp-idp

    riskprod:
      cluster:
        partitions-count: 3
      data:
        secondary-storage:
          rdbms:
            url: jdbc:postgresql://db/riskprod
      database:
        url: jdbc:postgresql://db/riskprod
      document:
        default-store-id: shared-s3
        assigned:
          - shared-s3
        aws:
          shared-s3:
            bucket-path: riskprod/ # distinct path — no collision with default
      security:
        authentication:
          providers:
            assigned:
              - corp-idp
```

### Environment variables

Spring environment variable mapping follows canonical property conversion. For example, a root-level property and its per-tenant override:

```bash
CAMUNDA_DATA_SECONDARYSTORAGE_RDBMS_URL=jdbc:postgresql://db/default
CAMUNDA_PHYSICALTENANTS_RISKPROD_DATA_SECONDARYSTORAGE_RDBMS_URL=jdbc:postgresql://db/riskprod
```

If YAML and environment variables are used together, use the same normalized tenant key in both forms.

## Related pages

- [Physical Tenant isolation model](./index.md)
- [Provisioning and lifecycle](./provisioning-and-lifecycle.md)
- [Multi-tenancy overview](../multi-tenancy/index.md)
