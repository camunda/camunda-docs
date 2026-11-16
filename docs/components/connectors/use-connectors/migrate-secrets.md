---
id: migrate-secrets
title: "Migrate to `camunda.secrets.<name>`"
description: "Move connector models from the legacy {{secrets.<name>}} syntax to camunda.secrets.<name>. In SaaS, you only update the references in your models."
---

`camunda.secrets.<name>` is the recommended secret reference syntax, resolved centrally by the [Orchestration Cluster](/reference/glossary.md#orchestration-cluster) rather than by the [connector runtime](/reference/glossary.md#connector-runtime). This page explains how to rewrite existing `{{secrets.<name>}}` references in your connector models, and which extra steps apply if you run your own connector runtime.

:::note
The legacy `{{secrets.<name>}}` syntax remains fully supported, so you can migrate at your own pace.
:::

## Why migrate

Resolving secrets centrally in the Orchestration Cluster gives you capabilities the connector runtime's own resolution doesn't have:

- **Field-scoped resolution**: a reference only resolves at the field where it was written. See [secret resolution](/components/concepts/secret-resolution.md#reference-syntax) and [security notice 61](/reference/notices.md#notice-61) for the legacy behavior this replaces.
- **External secret store support**: in Self-Managed, values come from a File, AWS Secrets Manager, or GCP Secret Manager store instead of environment-variable-based [connector secret providers](/self-managed/components/connectors/connectors-configuration.md#secrets). See [secrets configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets).
- **Resource-based access control**: the `SECRET` resource's `READ` and `REVEAL` authorizations govern who can list and reveal secrets through the API. See [Control access to secrets](/components/concepts/secrets.md#control-access-to-secrets).
- **Resolution kept off the connector runtime path**: references resolve ahead of job activation, so a value never lands in a record, runtime state, or log. See [Secret resolution and job activation](/components/concepts/secret-resolution-and-job-activation.md).

## Feature differences

|                  | `{{secrets.<name>}}` (legacy)                                                                                                                        | `camunda.secrets.<name>` (recommended)                                                                                                                    |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Resolved by      | The connector runtime, at execution time                                                                                                             | The Orchestration Cluster, ahead of job activation or on demand through the API                                                                           |
| Where you use it | Any connector field in the properties panel                                                                                                          | Connector fields that take a secret, such as authentication fields, and any input mapping, written as a FEEL expression; credential fields in Camunda Hub |
| Value source     | Connector secret providers, for example prefixed environment variables or a custom provider; in SaaS, the cluster's managed secrets                  | A File, AWS Secrets Manager, or GCP Secret Manager store in Self-Managed; managed secrets in SaaS                                                         |
| Authorization    | None; the [secret filter](/self-managed/components/connectors/connectors-configuration.md#secret-filter) restricts which fields may resolve a secret | The `SECRET` resource's `READ` and `REVEAL` authorizations govern the `/v2/secrets` API; broker-side resolution is not governed by them                   |
| Tenant awareness | Not scoped per physical tenant unless you opt in to a tenant-aware provider in the connector runtime configuration                                   | Each physical tenant resolves its own configured secret store                                                                                             |
| Caching          | Values are read from the provider on each execution                                                                                                  | Cache-first with a configurable cache lifetime, so rotated values become available without a restart                                                      |

For the full behavior of the recommended syntax, see [Secret resolution](/components/concepts/secret-resolution.md) and [Secret resolution and job activation](/components/concepts/secret-resolution-and-job-activation.md). For the legacy syntax, see [Using secrets](index.md#using-secrets).

## Choose your migration path

The steps you need depend on which connector runtime runs your connectors.

| Your setup                                                          | What you do                                                                                                                                     |
| :------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| SaaS, with the Camunda-hosted connector runtime                     | Update the references in your models. See [Migrate in SaaS](#migrate-in-saas).                                                                  |
| Self-Managed, or SaaS with your own connector runtime (hybrid mode) | Move the secret values first, then update your models. See [Migrate with your own connector runtime](#migrate-with-your-own-connector-runtime). |

## Migrate in SaaS

In SaaS with the Camunda-hosted connector runtime, migrating means updating the references in your models. The secrets on a cluster's **Cluster secrets** tab already back both syntaxes, so you don't copy values or change any runtime configuration.

1. Check that each secret your models use exists on the cluster's **Cluster secrets** tab and follows the [secret naming rule](#name-your-secrets).
1. Replace each `{{secrets.NAME}}` reference with `camunda.secrets.NAME`, as shown in [Rewrite secret references](#rewrite-secret-references).
1. Deploy the updated models to the cluster that holds the secrets.

If you run your own connector runtime against a SaaS cluster, follow [Migrate with your own connector runtime](#migrate-with-your-own-connector-runtime) instead. In that setup, legacy references resolve from your runtime's own secret providers, not from the **Cluster secrets** tab.

## Migrate with your own connector runtime

When you operate the connector runtime yourself, legacy references resolve from that runtime's secret providers, so you move the values to the Orchestration Cluster's store before you update your models. This applies to Self-Managed and to a self-managed connector runtime connected to a SaaS cluster.

1. **Prepare the store.** In Self-Managed, [configure a secret store](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets) for the Orchestration Cluster. The connector runtime's secret providers alone are not enough, because `camunda.secrets.<name>` doesn't read them. In SaaS, the store is the cluster's **Cluster secrets** tab.
1. **Copy the secret values.** Move each secret value from your connector secret provider into the store under the same name. Follow the [secret naming rule](#name-your-secrets).
1. **(Optional) Enable fallback mode.** Set `camunda.connector.secret-resolver.legacy.mode` to `FALLBACK` on the connector runtime, as described in [Migrate incrementally with fallback mode](#migrate-incrementally-with-fallback-mode). Models you haven't updated yet then keep working while you migrate them.
1. **Update your models.** Replace each `{{secrets.NAME}}` reference with `camunda.secrets.NAME`, as shown in [Rewrite secret references](#rewrite-secret-references).
1. **Remove the legacy configuration.** Once no model contains a `{{secrets.<name>}}` reference, set `camunda.connector.secret-resolver.legacy.mode` back to `ON` (or remove the setting) and remove the connector secret provider configuration.

### Migrate incrementally with fallback mode

Fallback mode lets models that still use the legacy syntax resolve from the Orchestration Cluster's store, so you don't have to update every model at once. The connector runtime's `camunda.connector.secret-resolver.legacy.mode` setting controls where legacy references resolve from:

- `ON` (default): the current behavior, with no fallback. The runtime resolves `{{secrets.<name>}}` only from its configured secret providers.
- `FALLBACK`: when a legacy reference's name isn't found in a configured secret provider, the runtime looks the name up in the same secret store that backs `camunda.secrets.<name>`.

With `FALLBACK` set, you can move a secret's value into the Orchestration Cluster's store first and keep existing models on the legacy syntax. Models you haven't touched keep resolving, now from the store, while you update them field by field.

This setting only applies to a connector runtime you operate. In SaaS, the Camunda-hosted connector runtime already resolves legacy references from the **Cluster secrets** tab.

## Rewrite secret references

A `camunda.secrets.<name>` reference is a FEEL expression, so the field starts with `=` and the reference itself is never quoted. Use these forms directly in connector fields in the properties panel and in input mappings.

| Use case                    | Legacy reference                           | `camunda.secrets.<name>` reference           |
| :-------------------------- | :----------------------------------------- | :------------------------------------------- |
| The whole field is a secret | `{{secrets.MY_API_KEY}}`                   | `=camunda.secrets.MY_API_KEY`                |
| Text around the secret      | `Bearer {{secrets.MY_API_KEY}}`            | `="Bearer " + camunda.secrets.MY_API_KEY`    |
| A secret in a FEEL context  | `= { myHeader: "{{secrets.MY_API_KEY}}" }` | `= { myHeader: camunda.secrets.MY_API_KEY }` |
| A secret name with a dash   | `{{secrets.db-password}}`                  | ``=camunda.secrets.`db-password` ``          |

Keep the following in mind when you rewrite a reference:

- Remove the quotes around the reference. A quoted reference, such as `="camunda.secrets.MY_API_KEY"`, is rejected at deployment.
- Don't put a reference inside a list, such as `=[camunda.secrets.MY_API_KEY]`. This is also rejected at deployment. Give each secret its own field or input mapping instead.
- In a Camunda Hub credential field, enter the reference without a leading `=`, for example `camunda.secrets.MY_API_KEY`. See [reference a secret from a credential field](/components/hub/organization/credentials/index.md#reference-a-secret-from-a-credential-field).

For the full rules, see [secret references in input mappings](/components/concepts/variables.md#secret-references-in-input-mappings). To reuse the same references across processes, you can also store them in a cluster variable of kind `SECRET_REFERENCE`. See [resolve secret references in a cluster variable](/components/modeler/feel/cluster-variable/usage-guide.md#resolve-secret-references-in-a-cluster-variable).

## Name your secrets

A secret name can contain only ASCII letters, digits, `_`, and `-`. Rename any secret with other characters before you migrate.

A name with a dash must be backtick-escaped, for example ``=camunda.secrets.`db-password` ``. Without the backticks, FEEL reads `camunda.secrets.db-password` as `db` minus `password`.

## Testing

To supply cluster secrets when you test processes with Camunda Process Test, see [cluster secrets in Camunda Process Test](/apis-tools/testing/connectors.md#cluster-secrets).

## Related resources

- [Secrets](/components/concepts/secrets.md) provides an overview of secret references, stores, and access control across Camunda.
- [Using `camunda.secrets.*` references](index.md#using-camundasecrets-references) covers how the two syntaxes coexist on the connector runtime.
- [Connector secrets in Self-Managed](/self-managed/components/connectors/connectors-configuration.md#secrets) covers the legacy secret provider configuration.
