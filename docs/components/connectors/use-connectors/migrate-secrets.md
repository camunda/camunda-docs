---
id: migrate-secrets
title: "Migrate to `camunda.secrets.<name>`"
description: "Move connector models from the legacy {{secrets.<name>}} syntax to the recommended camunda.secrets.<name> syntax, using the connector runtime's fallback mode for incremental migration."
---

`camunda.secrets.<name>` is the recommended secret reference syntax, resolved centrally by the [Orchestration Cluster](/reference/glossary.md#orchestration-cluster) rather than by the [connector runtime](/reference/glossary.md#connector-runtime). This page explains how to move existing connector models from the legacy `{{secrets.<name>}}` syntax to `camunda.secrets.<name>`, including a fallback mode that lets you migrate incrementally without updating every model at once.

:::note
`camunda.secrets.<name>` is part of an [alpha feature](/components/early-access/alpha/alpha-features.md) and may change in future releases. The legacy `{{secrets.<name>}}` syntax remains fully supported, so you can migrate at your own pace.
:::

## Why migrate

Resolving secrets centrally in the Orchestration Cluster gives you capabilities the connector runtime's own resolution doesn't have:

- **Field-scoped resolution**: a reference only resolves at the field where it was written. See [secret resolution](/components/concepts/secret-resolution.md#reference-syntax) and [security notice 61](/reference/notices.md#notice-61) for the legacy behavior this replaces.
- **External secret store support**: in Self-Managed, values come from a File, AWS Secrets Manager, or GCP Secret Manager store instead of environment-variable-based [connector secret providers](/self-managed/components/connectors/connectors-configuration.md#secrets). See [secrets configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets).
- **Resource-based access control**: the `SECRET` resource's `READ` and `REVEAL` authorizations govern who can list and reveal secrets through the API. See [Control access to secrets](/components/concepts/secret-management.md#control-access-to-secrets).
- **Resolution kept off the connector runtime path**: references resolve ahead of job activation, so a value never lands in a record, runtime state, or log. See [Secret resolution and job activation](/components/concepts/secret-resolution-and-job-activation.md).

## Feature differences

|                  | `{{secrets.<name>}}` (legacy)                                                                                                                        | `camunda.secrets.<name>` (recommended)                                                                                                  |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| Resolved by      | The connector runtime, at execution time                                                                                                             | The Orchestration Cluster, ahead of job activation or on demand through the API                                                         |
| Where you use it | Any connector field in the properties panel                                                                                                          | Input mapping FEEL expressions, and connector or credential fields backed by a `SECRET_REFERENCE` cluster variable                      |
| Value source     | Connector secret providers, for example prefixed environment variables or a custom provider                                                          | A File, AWS Secrets Manager, or GCP Secret Manager store in Self-Managed; managed secrets in SaaS                                       |
| Authorization    | None; the [secret filter](/self-managed/components/connectors/connectors-configuration.md#secret-filter) restricts which fields may resolve a secret | The `SECRET` resource's `READ` and `REVEAL` authorizations govern the `/v2/secrets` API; broker-side resolution is not governed by them |
| Tenant awareness | Not scoped per physical tenant unless you opt in to a tenant-aware provider in the connector runtime configuration                                   | Each physical tenant resolves its own configured secret store                                                                           |
| Caching          | Values are read from the provider on each execution                                                                                                  | Cache-first with a configurable cache lifetime, so rotated values become available without a restart                                    |

For the full behavior of the recommended syntax, see [Secret resolution](/components/concepts/secret-resolution.md) and [Secret resolution and job activation](/components/concepts/secret-resolution-and-job-activation.md). For the legacy syntax, see [Using secrets](index.md#using-secrets).

## Migrate incrementally with fallback mode

You don't have to update every model at once. The connector runtime's `camunda.connector.secret-resolver.legacy.mode` setting controls where legacy references resolve from:

- `ON` (default): the runtime resolves `{{secrets.<name>}}` only from its configured secret providers.
- `FALLBACK`: when a legacy reference's name isn't found in a configured secret provider, the runtime looks the name up in the same secret store that backs `camunda.secrets.<name>`.

With `FALLBACK` set, you can move a secret's value into the Orchestration Cluster's store first and keep existing models on the legacy syntax. Models you haven't touched keep resolving, now from the store, while you update them field by field. Once no legacy references remain, set the mode back to `ON` and remove the provider configuration.

## Backend prerequisites by offering

Before `camunda.secrets.<name>` can resolve, its store must hold the secret values. What that requires depends on your offering:

- **SaaS**: no backend change is needed. The managed secrets you create on a cluster's **Cluster secrets** tab are available to both the legacy syntax and `camunda.secrets.<name>`, so you can start migrating models right away. See [Manage connector secrets](/components/hub/organization/manage-clusters/manage-secrets.md#reference-connector-secrets-as-camundasecretsname).
- **Self-Managed**: an operator must configure a secret store (File, AWS Secrets Manager, or GCP Secret Manager) for the Orchestration Cluster. The connector runtime's secret providers alone are not enough: `camunda.secrets.<name>` doesn't read them. See [secrets configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets).

## Migrate step by step

1. **Prepare the store.** In Self-Managed, [configure a secret store](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets) for the Orchestration Cluster. In SaaS, confirm the secrets exist on the cluster's **Cluster secrets** tab.
1. **Copy the secret values.** Move each secret value from your connector secret provider into the store under the same name. Note that a name created or managed through the `/v2/secrets` API must match `[\p{Alnum}_-]+`; see [secret resolution](/components/concepts/secret-resolution.md#reference-syntax) for the naming rules.
1. **(Optional) Enable fallback mode.** Set `camunda.connector.secret-resolver.legacy.mode` to `FALLBACK` on the connector runtime, as described in [Migrate incrementally with fallback mode](#migrate-incrementally-with-fallback-mode). Legacy references whose names are no longer supplied by a provider then resolve from the store, so models keep working while you migrate them.
1. **Update your models field by field.** Replace each `{{secrets.NAME}}` reference with `camunda.secrets.NAME`:
   - In an input mapping, use the FEEL expression `=camunda.secrets.NAME`. See [secret references in input mappings](/components/concepts/variables.md#secret-references-in-input-mappings) for the syntax rules, including backtick-escaping dashed names.
   - In a connector or credential field, read the reference from a cluster variable of kind `SECRET_REFERENCE`. See [resolve secret references in a cluster variable](/components/modeler/feel/cluster-variable/usage-guide.md#resolve-secret-references-in-a-cluster-variable).
1. **Remove the legacy configuration.** Once no model contains a `{{secrets.<name>}}` reference, set `camunda.connector.secret-resolver.legacy.mode` back to `ON` (or remove the setting) and remove the connector secret provider configuration.

## Related resources

- [Secret management](/components/concepts/secret-management.md) gives an overview of secret references, stores, and access control across Camunda 8.
- [Using `camunda.secrets.*` references](index.md#using-camundasecrets-references) covers how the two syntaxes coexist on the connector runtime.
- [Connector secrets in Self-Managed](/self-managed/components/connectors/connectors-configuration.md#secrets) covers the legacy secret provider configuration.
