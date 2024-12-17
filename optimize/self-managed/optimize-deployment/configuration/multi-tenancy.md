---
id: multi-tenancy
title: "Multi-tenancy"
description: "Learn about the supported multi-tenancy scenarios."
---

<span class="badge badge--platform">Camunda 8 Self-Managed only</span>

Multi-tenancy in the context of Camunda 8 refers to the ability of Camunda 8 to serve multiple distinct [tenants]($docs$/self-managed/identity/user-guide/tenants/managing-tenants/) or
clients within a single installation.

From version 8.3 onwards, Optimize has been enhanced to support multi-tenancy for Self-Managed setups. More information about
the feature can be found in [the multi-tenancy documentation]($docs$/self-managed/concepts/multi-tenancy/).

Optimize imports the relevant tenant information from Zeebe records and retrieves each user's tenant authorizations from Identity, so that the logged-in users only have access to the data on tenants that they are authorized to see in Identity. Because tenant authorizations are cached in Optimize to improve performance, there could be a delay until any changes made to tenant authorizations in Identity are visible in Optimize.

## Default tenant authorizations in Optimize

If multi-tenancy is enabled across components, users will be allowed to view any data from tenants for which they have authorizations configured in Identity.
If multi-tenancy is disabled in Optimize, all users will be allowed to view data from the `<default>` tenant only and no data from other tenants.

If multi-tenancy is enabled in Optimize, but disabled in Identity or Identity is not reachable for other reasons, users will not have any tenant authorizations in Optimize and will not be able to access the data of any tenants in Optimize.

## Configuration

In a Self-Managed Camunda 8 environment, the following two configurations settings are required for multi-tenancy:

| YAML path                  | Environment variable                  | Default value | Description                                              |
| -------------------------- | ------------------------------------- | ------------- | -------------------------------------------------------- |
| multitenancy.enabled       | CAMUNDA_OPTIMIZE_MULTITENANCY_ENABLED | false         | Enables the Camunda 8 multi-tenancy feature in Optimize. |
| security.auth.ccsm.baseUrl | CAMUNDA_OPTIMIZE_IDENTITY_BASE_URL    | null          | The base URL of Identity.                                |

The `CAMUNDA_OPTIMIZE_MULTITENANCY_ENABLED` environment variable enables the feature in Optimize. The multi-tenancy feature must be enabled in all other components as well using their respective multi-tenancy feature flags.

The `CAMUNDA_OPTIMIZE_IDENTITY_BASE_URL` environment variable has to be set to enable Optimize to retrieve tenant authorizations from Identity. If this base URL is not configured, Optimize will not be able to retrieve tenant authorizations and users will not be able to access any tenant's data in Optimize.

If required, the tenant authorization cache in Optimize can also be configured via these optional settings:

| YAML path                                         | Environment variable                                                           | Default value | Description                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------ | ------------- | ------------------------------------------------------------------ |
| caches.cloudTenantAuthorizations.maxSize          | CAMUNDA_OPTIMIZE_CACHES_CLOUD_TENANT_AUTHORIZATIONS_MAX_SIZE                   | 10000         | The maximum size of the Camunda 8 tenant authorizations cache.     |
| caches.cloudTenantAuthorizations.defaultTtlMillis | CAMUNDA_OPTIMIZE_CACHES_CLOUD_TENANT_AUTHORIZATIONS_MIN_FETCH_INTERVAL_SECONDS | 300000        | The time in milliseconds the tenant authorizations will be cached. |

### Troubleshooting

To ensure seamless integration and functionality, the multi-tenancy feature must also be enabled across **all** associated components [if not configured in Helm]($docs$/self-managed/concepts/multi-tenancy/) so users can view any data from tenants for which they have authorizations configured in Identity.

Find more information (including links to individual component configuration) on the [multi-tenancy concepts page]($docs$/self-managed/concepts/multi-tenancy/).
