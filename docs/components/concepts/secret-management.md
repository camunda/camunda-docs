---
id: secret-management
title: "Secret management"
description: "Camunda's approach to keeping secrets out of process models, variables, and configuration, and where to reference, store, resolve, and secure them in SaaS and Self-Managed."
---

With secret management, you can keep sensitive values, such as API keys, passwords, and tokens, out of your process models, job variables, and configuration files. Instead of writing a value into a model, you reference a secret by name, and Camunda resolves that reference to its value at runtime. The value is supplied only where it is needed, so it is never stored in the process itself.

This page is the entry point for how secrets work across Camunda 8. It explains how to reference a secret, where secret values are stored in each offering, how references are resolved, and how access to secrets is controlled. For precise definitions of every term used here, see the [secret reference](/reference/glossary.md#secret-reference) glossary entries.

## Reference a secret

You reference a secret with a [secret reference](/reference/glossary.md#secret-reference): a placeholder written into a model that stands in for a secret value. Camunda 8 supports two reference syntaxes, resolved by different components: the [Orchestration Cluster](/reference/glossary.md#orchestration-cluster) resolves `camunda.secrets.<name>` (**recommended**), and the [connector runtime](/reference/glossary.md#connector-runtime) resolves `{{secrets.<name>}}` (**legacy**). By default, each reads only its own configured store or providers; a migration path from legacy to recommended is available. See [Using `camunda.secrets.*` references](/components/connectors/use-connectors/index.md#using-camundasecrets-references), and [Store and create secrets](#store-and-create-secrets) for how that store is configured in each offering.

| Syntax                   | Status          | Resolved by                                                               | Where you use it                                                                                                   | Learn more                                                                                                                                                 |
| :----------------------- | :-------------- | :------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `camunda.secrets.<name>` | **Recommended** | The [Orchestration Cluster](/reference/glossary.md#orchestration-cluster) | Input mapping FEEL expressions, and connector or credential fields backed by a `SECRET_REFERENCE` cluster variable | [Secret resolution](secret-resolution.md), [Secret reference (Orchestration Cluster)](/reference/glossary.md#secret-reference-orchestration-cluster)       |
| `{{secrets.<name>}}`     | Legacy          | The [connector runtime](/reference/glossary.md#connector-runtime)         | Any connector field in the properties panel                                                                        | [Using secrets](/components/connectors/use-connectors/index.md#using-secrets), [Secret reference (legacy)](/reference/glossary.md#secret-reference-legacy) |

Camunda recommends the `camunda.secrets.<name>` syntax for all models. This is part of an [alpha feature](/components/early-access/alpha/alpha-features.md) and may change in future releases. The `{{secrets.<name>}}` syntax remains supported for backward compatibility; "legacy" describes its age relative to `camunda.secrets.<name>`, not its support status.

For a worked example of referencing `camunda.secrets.<name>` in a model, including the FEEL expression rules, see [Secret references in input mappings](/components/concepts/variables.md#secret-references-in-input-mappings).

:::tip Recommended: `camunda.secrets.<name>`

Because the Orchestration Cluster resolves `camunda.secrets.<name>` centrally, it is more secure and more capable than the legacy connector syntax:

- **Field-scoped resolution**: a reference only resolves at the field where it was written. The legacy form doesn't have this property; see [security notice 61](/reference/notices.md#notice-61) and [secret resolution](secret-resolution.md#reference-syntax).
- **Broader reach**: usable in input mappings and cluster variables, not only connector fields; see [secret references in input mappings](/components/concepts/variables.md#secret-references-in-input-mappings) and [resolve secret references in a cluster variable](/components/modeler/feel/cluster-variable/usage-guide.md#resolve-secret-references-in-a-cluster-variable), compared to [using secrets](/components/connectors/use-connectors/index.md#using-secrets) for the legacy form.
- **External secret stores**: backed by a File, AWS Secrets Manager, or GCP Secret Manager store in Self-Managed, rather than the environment-variable-based [connector secret providers](/self-managed/components/connectors/connectors-configuration.md#secrets); see [secrets configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets).
- **Resource-based access control**: governed by the `SECRET` resource's `READ` and `REVEAL` authorizations; see [Control access to secrets](#control-access-to-secrets).
- **Kept off the processing path**: resolved ahead of job activation, so the value never lands in a record, runtime state, or log; see [Secret resolution and job activation](secret-resolution-and-job-activation.md).

:::

## Store and create secrets

A reference only resolves to a value once that value is available to the resolving component. How you create and store a secret depends on the offering:

- **SaaS**: the secret store is provisioned and managed for you. Create and update secret values on a cluster's **Cluster secrets** tab, then reference them as `camunda.secrets.<name>`. See [Manage connector secrets](/components/hub/organization/manage-clusters/manage-secrets.md) and the [SaaS-managed secret](/reference/glossary.md#saas-managed-secret) glossary entry.
- **Self-Managed**: an operator supplies secret values.
  - For `camunda.secrets.<name>` (recommended), configure a secret store (File, AWS Secrets Manager, or GCP Secret Manager). See [secrets configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets).
  - For `{{secrets.<name>}}` (legacy), a connector secret provider supplies values, for example from prefixed environment variables or a custom provider. See [Connector secrets in Self-Managed](/self-managed/components/connectors/connectors-configuration.md#secrets).
  - When deploying with the Helm chart, a [Kubernetes Secret](/reference/glossary.md#kubernetes-secret) can back either syntax's underlying storage. See [Helm charts secret management](/self-managed/deployment/helm/configure/secret-management.md).

## Resolve, list, and troubleshoot

This section applies to `camunda.secrets.<name>` only; the legacy `{{secrets.<name>}}` syntax is resolved by the connector runtime itself, as described in [Using secrets](/components/connectors/use-connectors/index.md#using-secrets).

- [Secret resolution](secret-resolution.md) covers the reference syntax, the two resolution paths, tenant scope, and caching.
- [Secret resolution and job activation](secret-resolution-and-job-activation.md) covers the broker path: the scheduler, caching, and delivery to job workers.
- [Troubleshoot secret resolution failures](secret-resolution-incidents.md) covers the incidents raised when a reference or its injection fails.
- [Secrets](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-secrets.md) covers the `POST /v2/secrets/resolve` and `POST /v2/secrets/list` API endpoints, and [Secrets](/apis-tools/java-client/secrets.md) covers the equivalent Java client commands.

## Control access to secrets

This section applies to `camunda.secrets.<name>` only; the legacy `{{secrets.<name>}}` syntax has no equivalent resource-based authorization, and relies instead on the [secret filter](/self-managed/components/connectors/connectors-configuration.md#secret-filter).

The `SECRET` resource's `READ` and `REVEAL` permissions govern who can list and reveal a secret through the `/v2/secrets` API; they don't govern the broker resolving a reference for job activation. See [Authorizations](access-control/authorizations.md#reveal-permission-for-the-secret) and [Secret authorizations don't cover broker-side resolution](access-control/authorizations.md#secret-authorizations-dont-cover-broker-side-resolution).

## Related resources

- [Secret reference](/reference/glossary.md#secret-reference) and its related glossary entries define every term used on this page.

**`camunda.secrets.<name>` (recommended):**

- [Secret references in input mappings](/components/concepts/variables.md#secret-references-in-input-mappings) covers referencing `camunda.secrets.<name>` in a model, with examples.
- [Cluster secrets](/components/hub/organization/manage-clusters/manage-secrets.md#reference-connector-secrets-as-camundasecretsname) covers referencing SaaS-managed secrets as `camunda.secrets.<name>`.
- [Secrets configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets) covers configuring the secret store in Self-Managed.

**`{{secrets.<name>}}` (legacy):**

- [Using secrets](/components/connectors/use-connectors/index.md#using-secrets) covers referencing secrets from connector fields.
- [Cluster secrets](/components/hub/organization/manage-clusters/manage-secrets.md) covers creating and managing secret values in SaaS.
- [Connector secrets in Self-Managed](/self-managed/components/connectors/connectors-configuration.md#secrets) covers configuring connector secret providers.
