---
id: configure-physical-tenants
sidebar_label: Physical Tenants
title: Configure Physical Tenants in Helm chart
description: "Learn how to configure Physical Tenants in Camunda 8 using the Helm chart."
---

:::note
This page describes Physical Tenants, the strong isolation model for separate teams or organizations within a single orchestration cluster. For the lightweight, tenant-ID based model, see [Logical Tenants](./configure-logical-tenants.md).
:::

The Helm chart does not expose a dedicated `physicalTenants.*` values schema. Configure Physical Tenants by passing the same `camunda.physical-tenants.<tenant-key>.*` properties documented in the [configuration reference](/self-managed/concepts/physical-tenants/configuration-reference.md), either as a raw `application.yaml` block, as a standalone extra configuration file, or as environment variables.

## Prerequisites

- A running Camunda 8 Self-Managed Helm deployment.
- Read the [Physical Tenant isolation model](/self-managed/concepts/physical-tenants/index.md) and [configuration reference](/self-managed/concepts/physical-tenants/configuration-reference.md) first — this page only shows how to deliver that same configuration through Helm.

## Configure via `orchestration.configuration`

Set `orchestration.configuration` to the full `application.yaml` content, including the root-level and per-tenant `camunda.physical-tenants.*` blocks:

```yaml
orchestration:
  configuration: |
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

This is the same configuration shape as the [configuration reference's application.yaml example](/self-managed/concepts/physical-tenants/configuration-reference.md#configuration-examples) — `orchestration.configuration` renders as-is into the pod's `application.yaml`.

Secrets referenced with `${VARIABLE}` syntax (like `${CORP_IDP_CLIENT_SECRET}` above) still resolve from the pod's environment. Supply them through `orchestration.env` or `orchestration.envFrom` alongside `orchestration.configuration`.

## Configure via `orchestration.extraConfiguration`

If you'd rather keep the Physical Tenant configuration in its own file instead of folding it into a single `orchestration.configuration` block, use `orchestration.extraConfiguration`. Each entry mounts as its own file and, with `springImport` left at its default (`true`), is merged into the pod's Spring configuration alongside the base `application.yaml`:

```yaml
orchestration:
  extraConfiguration:
    - file: physical-tenants.yaml
      content: |
        camunda:
          physical-tenants:
            default:
              cluster:
                partitions-count: 3
              document:
                default-store-id: shared-s3
                assigned:
                  - shared-s3
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

This still requires the base `camunda.security.authentication` and `camunda.document` configuration (shown in the `orchestration.configuration` example above) to be set elsewhere — through `orchestration.configuration` or your own base `application.yaml` — since `extraConfiguration` only adds to that configuration, it doesn't replace it.

## Configure via environment variables

For a small number of overrides, set individual properties through `orchestration.env` instead of a full configuration block:

```yaml
orchestration:
  env:
    - name: CAMUNDA_PHYSICALTENANTS_RISKPROD_DATA_SECONDARYSTORAGE_RDBMS_URL
      value: jdbc:postgresql://db/riskprod
```

Environment variables and `orchestration.configuration` can be combined. Use the same normalized tenant key in both. See [environment variable mapping](/self-managed/concepts/physical-tenants/configuration-reference.md#environment-variables) for the full conversion rules.

## Related pages

- [Physical Tenant isolation model](/self-managed/concepts/physical-tenants/index.md)
- [Configuration reference](/self-managed/concepts/physical-tenants/configuration-reference.md)
- [Authentication and authorization](/self-managed/concepts/physical-tenants/authentication-authorization.md)
