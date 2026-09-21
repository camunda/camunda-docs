---
id: secret-management
title: "Secret management"
description: "Camunda's approach to keeping secrets out of process models, variables, and configuration, and where to reference, store, resolve, and secure them in SaaS and Self-Managed."
---

With secret management, you can keep sensitive values, such as API keys, passwords, and tokens, out of your process models, job variables, and configuration files. Instead of writing a value into a model, you reference a secret by name, and Camunda resolves that reference to its value at runtime. The value is supplied only where it is needed, so it is never stored in the process itself.

This page is the entry point for how secrets work across Camunda 8. It explains how to reference a secret, where secret values are stored in each offering, how references are resolved, and how access to secrets is controlled. For precise definitions of every term used here, see the [secret reference](/reference/glossary.md#secret-reference) glossary entries.

## Reference a secret

You reference a secret with a [secret reference](/reference/glossary.md#secret-reference): a placeholder written into a model that stands in for a secret value. The recommended syntax is `camunda.secrets.<name>`, resolved centrally by the [Orchestration Cluster](/reference/glossary.md#orchestration-cluster). See [Using `camunda.secrets.*` references](/components/connectors/use-connectors/index.md#using-camundasecrets-references), and [Store and create secrets](#store-and-create-secrets) for how the backing store is configured in each offering.

| Syntax                   | Resolved by                                                               | Where you use it                                                                                                   | Learn more                                                                                                                                           |
| :----------------------- | :------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `camunda.secrets.<name>` | The [Orchestration Cluster](/reference/glossary.md#orchestration-cluster) | Input mapping FEEL expressions, and connector or credential fields backed by a `SECRET_REFERENCE` cluster variable | [Secret resolution](secret-resolution.md), [Secret reference (Orchestration Cluster)](/reference/glossary.md#secret-reference-orchestration-cluster) |

An older `{{secrets.<name>}}` syntax, resolved by the connector runtime, remains supported for existing connector models. See [Legacy connector secrets](#legacy-connector-secrets).

For a working example of referencing `camunda.secrets.<name>` in a model, including the FEEL expression rules, see [Secret references in input mappings](/components/concepts/variables.md#secret-references-in-input-mappings).

## Store and create secrets

A reference only resolves to a value once that value is available to the resolving component. How you create and store a secret depends on how you run Camunda 8:

- **SaaS**: the secret store is provisioned and managed for you. Create and update secret values on a cluster's **Cluster secrets** tab, then reference them as `camunda.secrets.<name>`. See [Manage connector secrets](/components/hub/organization/manage-clusters/manage-secrets.md) and the [SaaS-managed secret](/reference/glossary.md#saas-managed-secret) glossary entry.
- **Self-Managed**: an operator supplies secret values by configuring a secret store (File, AWS Secrets Manager, or GCP Secret Manager). See [secrets configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets). When deploying with the Helm chart, a [Kubernetes Secret](/reference/glossary.md#kubernetes-secret) can back the configured store, for example as mounted files for a File store. See [Helm charts secret management](/self-managed/deployment/helm/configure/secret-management.md).
- **Local development**: no store configuration needed; you manage secrets via `c8ctl` or `c8run` and reference them via `camunda.secrets.<name>`:
  - Manage secrets via `c8ctl` through the `c8ctl cluster secrets` CLI, forwarding to the local development cluster — see [Manage secrets with `c8ctl`](/apis-tools/c8ctl/getting-started.md#manage-secrets).
  - Manage secrets via `c8run` directly through the `c8run secrets` CLI. See [Manage secrets via `c8run`](/self-managed/quickstart/developer-quickstart/c8run/configuration.md#manage-local-secrets).

## Resolve, list, and troubleshoot

- [Secret resolution](secret-resolution.md) covers the reference syntax, the two resolution paths, tenant scope, and caching.
- [Secret resolution and job activation](secret-resolution-and-job-activation.md) covers the broker path: the scheduler, caching, and delivery to job workers.
- [Troubleshoot secret resolution failures](secret-resolution-incidents.md) covers the incidents raised when a reference or its injection fails.
- [Secrets](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-secrets.md) covers the `POST /v2/secrets/resolve` and `POST /v2/secrets/list` API endpoints, and [Secrets](/apis-tools/java-client/secrets.md) covers the equivalent Java client commands.

## Control access to secrets

The `SECRET` resource's `READ` and `REVEAL` permissions govern who can list and reveal a secret through the `/v2/secrets` API; they don't govern the broker resolving a reference for job activation. See [Authorizations](access-control/authorizations.md#reveal-permission-for-the-secret) and [Secret authorizations don't cover broker-side resolution](access-control/authorizations.md#secret-authorizations-dont-cover-broker-side-resolution).

## Legacy connector secrets

The legacy secret reference syntax, `{{secrets.<name>}}`, is resolved by the [connector runtime](/reference/glossary.md#connector-runtime) itself, at execution time, and can be used in any connector field in the properties panel. The syntax remains fully supported for existing connector models: "legacy" describes its age relative to `camunda.secrets.<name>`, not its support status. See [Using secrets](/components/connectors/use-connectors/index.md#using-secrets) for how to reference a legacy secret in a model, and the [Secret reference (legacy)](/reference/glossary.md#secret-reference-legacy) glossary entry.

In Self-Managed, a connector secret provider supplies the values behind legacy references, for example from prefixed environment variables or a custom provider. When deploying with the Helm chart, a [Kubernetes Secret](/reference/glossary.md#kubernetes-secret) can deliver these values as mounted environment variables. See [Connector secrets in Self-Managed](/self-managed/components/connectors/connectors-configuration.md#secrets) and [Helm charts secret management](/self-managed/deployment/helm/configure/secret-management.md).

Compared to `camunda.secrets.<name>`, the legacy syntax has these limitations:

- **No field-scoped resolution**: a legacy reference can resolve outside the field it was written in. The [secret filter](/self-managed/components/connectors/connectors-configuration.md#secret-filter) introduced with [security notice 61](/reference/notices.md#notice-61) mitigates this; `camunda.secrets.<name>` scopes resolution to the field instead. See [secret resolution](secret-resolution.md#reference-syntax).
- **No resource-based authorization**: legacy secrets have no `SECRET` resource permissions and rely on the secret filter instead. See [Control access to secrets](#control-access-to-secrets).
- **No external secret store integration**: values come from connector secret providers, not from a File, AWS Secrets Manager, or GCP Secret Manager store. See [secrets configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets) for the stores `camunda.secrets.<name>` supports.

`camunda.secrets.<name>` values live in the Orchestration Cluster's configured secret store — not in a connector-attached provider.

:::tip Migrating from the legacy syntax?
In Self-Managed, [set up the secret store](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets) and move your values there first. Then follow [Migrate to `camunda.secrets.<name>`](/components/connectors/use-connectors/migrate-secrets.md), which covers the step-by-step process, including the connector runtime's fallback mode for incremental migration.
:::

## Related resources

- [Secret reference](/reference/glossary.md#secret-reference) and its related glossary entries define every term used on this page.

**`camunda.secrets.<name>` (recommended):**

- [Secret references in input mappings](/components/concepts/variables.md#secret-references-in-input-mappings) covers referencing `camunda.secrets.<name>` in a model, with examples.
- [Cluster secrets](/components/hub/organization/manage-clusters/manage-secrets.md#reference-connector-secrets-as-camundasecretsname) covers referencing SaaS-managed secrets as `camunda.secrets.<name>`.
- [Secrets configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets) covers configuring the secret store in Self-Managed.
- [Migrate to `camunda.secrets.<name>`](/components/connectors/use-connectors/migrate-secrets.md) covers moving from the legacy syntax, including the connector runtime's fallback mode.

**`{{secrets.<name>}}` (legacy):**

- [Using secrets](/components/connectors/use-connectors/index.md#using-secrets) covers referencing secrets from connector fields.
- [Cluster secrets](/components/hub/organization/manage-clusters/manage-secrets.md) covers creating and managing secret values in SaaS.
- [Connector secrets in Self-Managed](/self-managed/components/connectors/connectors-configuration.md#secrets) covers configuring connector secret providers.
