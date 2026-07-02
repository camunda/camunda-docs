---
id: configuration-reference
title: "Configuration reference"
sidebar_label: "Configuration reference"
description: "Configure Physical Tenants with root defaults, per-tenant overrides, and startup validation rules."
---

<!-- TODO: Update this page once camunda/camunda#55259 finalizes typed config, validation rules, and error messages for Physical Tenants. -->

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
  data:
    secondary-storage:
      rdbms:
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

For a configured tenant entry under `camunda.physical-tenants.<tenant-key>`:

- Required when present:
  - `cluster.partitions-count`, if the tenant overrides default cluster sizing.
  - `security.authentication.providers.assigned` to assign one or more cluster-defined identity providers.
- Optional:
  - Any tenant-overridable `camunda.*` properties that support per-tenant override behavior.

Identity providers are defined at cluster level, then assigned per tenant. Physical Tenants do not define tenant-local provider objects.

## Cluster-wide defaults and per-tenant overrides

Use root-level `camunda.*` for shared defaults across all tenants.

Use `camunda.physical-tenants.<tenant-key>.*` only for tenant-specific differences.

### Cluster-only properties

The following properties are cluster-scoped and cannot be overridden per tenant:

- `camunda.security.authentication.method`
- `camunda.security.cluster-admin`
- `camunda.security.csrf`
- `camunda.security.multi-tenancy`
- `camunda.security.http-headers`
- `camunda.security.authentication.authentication-refresh-interval`

## Default tenant behavior and compatibility

The `default` Physical Tenant is always present in 8.10 and is immutable.

For backward compatibility:

- Existing root-level single-tenant configuration maps to the `default` Physical Tenant.
- If you upgrade from 8.9 to 8.10, no manual migration step is required for this mapping.
- `camunda.physical-tenants.default.*` is interpreted as overrides for the existing default tenant, not as creation of a new tenant.

## Validation and constraints

At startup, configuration validation enforces tenant-level constraints.

<!-- TODO: Confirm the exact startup error message format (log level, error code, message text) for each validation failure case listed below. Specifically, confirm error messages for: missing `providers.assigned`, conflicting RDBMS URL+prefix, and conflicting document store location. Source: camunda/camunda#55259. -->

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
        corp-idp:
          type: oidc

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

Spring environment variable mapping follows canonical property conversion:

```bash
CAMUNDA_DATA_SECONDARYSTORAGE_RDBMS_URL=jdbc:postgresql://db/default
CAMUNDA_SECURITY_AUTHENTICATION_METHOD=oidc
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_CORP_IDP_TYPE=oidc
CAMUNDA_DOCUMENT_DEFAULTSTOREID=shared-s3
CAMUNDA_DOCUMENT_AWS_SHAREDS3_BUCKETNAME=company-docs-bucket
CAMUNDA_DOCUMENT_AWS_SHAREDS3_BUCKETPATH=default/

CAMUNDA_PHYSICALTENANTS_DEFAULT_CLUSTER_PARTITIONSCOUNT=3
CAMUNDA_PHYSICALTENANTS_DEFAULT_DOCUMENT_DEFAULTSTOREID=shared-s3
CAMUNDA_PHYSICALTENANTS_DEFAULT_DOCUMENT_ASSIGNED_0=shared-s3
CAMUNDA_PHYSICALTENANTS_DEFAULT_SECURITY_AUTHENTICATION_PROVIDERS_ASSIGNED_0=corp-idp

CAMUNDA_PHYSICALTENANTS_RISKPROD_CLUSTER_PARTITIONSCOUNT=3
CAMUNDA_PHYSICALTENANTS_RISKPROD_DATA_SECONDARYSTORAGE_RDBMS_URL=jdbc:postgresql://db/riskprod
CAMUNDA_PHYSICALTENANTS_RISKPROD_DOCUMENT_DEFAULTSTOREID=shared-s3
CAMUNDA_PHYSICALTENANTS_RISKPROD_DOCUMENT_ASSIGNED_0=shared-s3
CAMUNDA_PHYSICALTENANTS_RISKPROD_DOCUMENT_AWS_SHAREDS3_BUCKETPATH=riskprod/
CAMUNDA_PHYSICALTENANTS_RISKPROD_SECURITY_AUTHENTICATION_PROVIDERS_ASSIGNED_0=corp-idp
```

If YAML and environment variables are used together, use the same normalized tenant key in both forms.

### Helm values

If you deploy with Helm, provide equivalent values in your `values.yaml` for the same underlying Camunda properties. Helm customers use the same application-level properties directly without chart-specific tenant keys.

```yaml
# Example shape only. Map these values to your chart's current Camunda property injection mechanism.
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
  physical-tenants:
    default:
      cluster:
        partitions-count: 3
      document:
        default-store-id: shared-s3
        assigned:
          - shared-s3
    riskprod:
      cluster:
        partitions-count: 3
      data:
        secondary-storage:
          rdbms:
            url: jdbc:postgresql://db/riskprod
      document:
        default-store-id: shared-s3
        assigned:
          - shared-s3
        aws:
          shared-s3:
            bucket-path: riskprod/
```

## Related pages

- [Physical Tenant isolation model](./index.md)
- [Provisioning and lifecycle](./provisioning-and-lifecycle.md)
- [Multi-tenancy overview](../multi-tenancy/index.md)
