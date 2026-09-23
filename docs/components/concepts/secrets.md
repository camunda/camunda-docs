---
id: secrets
title: "Secrets"
description: "Use secrets to keep sensitive values out of process models, variables, and configuration. Learn how to reference a secret, where values are stored, how references resolve, and how access is controlled."
---

import PageDescription from '@site/src/components/PageDescription';
import SecretsOverviewImg from './assets/secrets-overview.png';

<PageDescription />

## About

You can use and manage secrets to keep keep sensitive values such as API keys, passwords, and tokens, out of your process models, job variables, and configuration files.

Instead of writing a value into a model, you reference a secret stored in a secret store by name. Camunda resolves that reference to its value at runtime. The value is supplied only where it is needed, so it is never stored in the process itself.

<!-- Source diagram: https://miro.com/app/board/uXjVHjBNPcc=/?share_link_id=404465590432 -->

<img src={SecretsOverviewImg} alt="Secrets overview" title="Secrets overview" class="img-noborder" style={{marginTop: '0', marginBottom: '0'}}/>

1. Use a stored secret (for example, `MY_SECRET`) in a model as a secret reference (`camunda.secrets.MY_SECRET`).
1. Once deployed and when the process instance starts, the Orchestration Cluster logs, stores, and exports the secret reference.
1. Once the job is activated, the secret reference is resolved and replaced with the actual secret value from the secret store.

:::tip Terminology
For precise definitions of secret-related terms, see the [secret reference](/reference/glossary.md#secret-reference) glossary entries.
:::

## Reference a secret

You can reference a secret in Camunda using a [secret reference](/reference/glossary.md#secret-reference).

- This is a placeholder written into a model that stands in for a secret value.
- The recommended syntax is `camunda.secrets.<name>`. This is resolved centrally by the [Orchestration Cluster](/reference/glossary.md#orchestration-cluster).
- To learn how the backing store is configured in each offering, see [using `camunda.secrets.*` references](/components/connectors/use-connectors/index.md#using-camundasecrets-references) and [store and create secrets](#store-and-create-secrets).

| Syntax                   | Resolved by                                                           | Where you use it                                                                                                                                                                                                                                                                                                |
| :----------------------- | :-------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `camunda.secrets.<name>` | [Orchestration Cluster](/reference/glossary.md#orchestration-cluster) | <p>Input mapping FEEL expressions, and connector or credential fields backed by a `SECRET_REFERENCE` cluster variable.</p><p><ul><li>[Secret resolution](secret-resolution.md)</li><li>[Secret reference (Orchestration Cluster)](/reference/glossary.md#secret-reference-orchestration-cluster).</li></ul></p> |

:::note
An older `{{secrets.<name>}}` syntax, resolved by the connector runtime, remains supported for existing connector models. See [Legacy connector secrets](#legacy-connector-secrets).
:::

For a working example of referencing `camunda.secrets.<name>` in a model, including the FEEL expression rules, see [Secret references in input mappings](/components/concepts/variables.md#secret-references-in-input-mappings).

## Store and create secrets

A reference only resolves to a value once that value is available to the resolving component. How you create and store a secret depends on how you run Camunda 8:

| Deployment model      | Secret storage and management                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SaaS**              | <p>The secret store is provisioned and managed for you.</p><p><ol><li>Create and update secret values on a cluster's **Cluster secrets** tab.</li><li>Reference them as `camunda.secrets.<name>`.</li></ol></p><p>See [manage connector secrets](/components/hub/organization/manage-clusters/manage-secrets.md) and the [SaaS-managed secret](/reference/glossary.md#saas-managed-secret) glossary entry.</p>                                                                                                                                                                               |
| **Self-Managed**      | <p>An operator supplies secret values by configuring a secret store (File, AWS Secrets Manager, or GCP Secret Manager). See [secrets configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets).</p><p>When deploying with the Helm chart, a [Kubernetes Secret](/reference/glossary.md#kubernetes-secret) can back the configured store, for example as mounted files for a File store. See [Helm charts secret management](/self-managed/deployment/helm/configure/secret-management.md).</p>                                        |
| **Local development** | <p>No store configuration is needed. You can manage secrets through `c8ctl` or `c8run` and reference them as `camunda.secrets.<name>`.</p><p><ul><li>Manage secrets via `c8ctl` through the `c8ctl cluster secrets` CLI, forwarding to the local development cluster. See [Manage secrets with `c8ctl`](/apis-tools/c8ctl/getting-started.md#manage-secrets).</li><li><p>Manage secrets via `c8run` directly through the `c8run secrets` CLI. See [Manage secrets via `c8run`](/self-managed/quickstart/developer-quickstart/c8run/configuration.md#manage-local-secrets).</p></li></ul></p> |

## Resolve, list, and troubleshoot

- [Secret resolution](secret-resolution.md) covers the reference syntax, the two resolution paths, tenant scope, and caching.
- [Secret resolution and job activation](secret-resolution-and-job-activation.md) covers the broker path: the scheduler, caching, and delivery to job workers.
- [Troubleshoot secret resolution failures](secret-resolution-incidents.md) covers the incidents raised when a reference or its injection fails.
- [Secrets](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-secrets.md) covers the `POST /v2/secrets/resolve` and `POST /v2/secrets/list` API endpoints, and [secrets](/apis-tools/java-client/secrets.md) covers the equivalent Java client commands.

## Control access to secrets

The `SECRET` resource's `READ` and `REVEAL` permissions control who can list and reveal a secret via the `/v2/secrets` API. These permissions do not govern the broker resolving a reference for job activation.

See [authorizations](access-control/authorizations.md#reveal-permission-for-the-secret) and [secret authorizations don't cover broker-side resolution](access-control/authorizations.md#secret-authorizations-dont-cover-broker-side-resolution).

## Legacy connector secrets

The legacy secret reference syntax, `{{secrets.<name>}}` is resolved by the [connector runtime](/reference/glossary.md#connector-runtime) itself at execution time, and can be used in any connector field in the properties panel.

This syntax remains fully supported for existing connector models: "legacy" describes its age relative to `camunda.secrets.<name>`, not its support status. See [using secrets](/components/connectors/use-connectors/index.md#using-secrets) to learn how to reference a legacy secret in a model, and the [secret reference (legacy)](/reference/glossary.md#secret-reference-legacy) glossary entry.

In Self-Managed, a connector secret provider supplies the values behind legacy references, for example from prefixed environment variables or a custom provider. When deploying with the Helm chart, a [Kubernetes Secret](/reference/glossary.md#kubernetes-secret) can deliver these values as mounted environment variables. See [Connector secrets in Self-Managed](/self-managed/components/connectors/connectors-configuration.md#secrets) and [Helm charts secret management](/self-managed/deployment/helm/configure/secret-management.md).

### Limitations

Compared to `camunda.secrets.<name>`, the legacy syntax has the following limitations:

| Limitation                           | Description                                                                                                                                                                                                                                                                                                                                                                                                |
| :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No field-scoped resolution           | <p>A legacy reference can resolve outside the field it was written in.</p><p>The [secret filter](/self-managed/components/connectors/connectors-configuration.md#secret-filter) introduced with [security notice 61](/reference/notices.md#notice-61) mitigates this; `camunda.secrets.<name>` scopes resolution to the field instead. See [secret resolution](secret-resolution.md#reference-syntax).</p> |
| No resource-based authorization      | Legacy secrets have no `SECRET` resource permissions and rely on the secret filter instead. See [control access to secrets](#control-access-to-secrets).                                                                                                                                                                                                                                                   |
| No external secret store integration | Values come from connector secret providers, not from a File, AWS Secrets Manager, or GCP Secret Manager store. See [secrets configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets) for the stores `camunda.secrets.<name>` supports.                                                                                                            |

:::tip Migrating from the legacy syntax?
In Self-Managed, [set up the secret store](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets) and move your values there first. Then follow [Migrate to `camunda.secrets.<name>`](/components/connectors/use-connectors/migrate-secrets.md), which covers the step-by-step process, including the connector runtime's fallback mode for incremental migration.
:::

## Related resources

- The [secret reference](/reference/glossary.md#secret-reference) and its related glossary entries defines the terms used in these sections.

### `camunda.secrets.<name>` (recommended)

- [Secret references in input mappings](/components/concepts/variables.md#secret-references-in-input-mappings) covers referencing `camunda.secrets.<name>` in a model, with examples.
- [Cluster secrets](/components/hub/organization/manage-clusters/manage-secrets.md#reference-connector-secrets-as-camundasecretsname) covers referencing SaaS-managed secrets as `camunda.secrets.<name>`.
- [Secrets configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets) covers configuring the secret store in Self-Managed.
- [Migrate to `camunda.secrets.<name>`](/components/connectors/use-connectors/migrate-secrets.md) covers moving from the legacy syntax, including the connector runtime's fallback mode.

### `{{secrets.<name>}}` (legacy)

- [Using secrets](/components/connectors/use-connectors/index.md#using-secrets) covers referencing secrets from connector fields.
- [Cluster secrets](/components/hub/organization/manage-clusters/manage-secrets.md) covers creating and managing secret values in SaaS.
- [Connector secrets in Self-Managed](/self-managed/components/connectors/connectors-configuration.md#secrets) covers configuring connector secret providers.
