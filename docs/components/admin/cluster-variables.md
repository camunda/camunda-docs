---
id: cluster-variables
title: "Cluster variables"
sidebar_label: "Cluster variables"
description: "Manage configuration values centrally across your cluster using the Admin UI."
---

Use Admin to manage cluster variables, which store configuration values centrally across your cluster and make them available in [FEEL expressions](/components/modeler/feel/cluster-variable/overview.md).

## About cluster variables

Cluster variables allow you to maintain environment-specific configurations, API endpoints, feature flags, and other shared values without hardcoding them into individual process definitions. Variables can be defined at the global (cluster-wide) or tenant level.

Each variable also has a kind, either `JSON` or `SECRET_REFERENCE`, which determines how Camunda reads its value. `JSON` is the default. See [variable kinds](/components/modeler/feel/cluster-variable/data-types.md#variable-kinds).

:::tip
To learn more about cluster variables, including scope resolution, data types, and FEEL expression usage, see the [cluster variables overview](/components/modeler/feel/cluster-variable/overview.md).
:::

You can manage cluster variables through the Admin UI or the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/specifications/create-global-cluster-variable.api.mdx).

## Manage global cluster variables

Global cluster variables are available to all processes across the entire cluster.

### Create a global cluster variable

1. Log in to Admin in your cluster, and select the **Cluster Variables** tab.
2. Click **Create variable**.
3. Provide the following details:
   - **Name**: A unique identifier for the variable.
   - **Value**: The value of the variable, which can be a string, number, boolean, or JSON object.
4. Click **Create variable**.

The variable is created and immediately available for use in FEEL expressions across all processes in the cluster using `camunda.vars.cluster.<name>` or `camunda.vars.env.<name>`.

### Update a global cluster variable

1. Log in to Admin in your cluster, and select the **Cluster Variables** tab.
2. Click the **pencil icon** next to the variable you want to update.
3. Update the variable value.
4. Click **Save**.

The updated value takes effect for new evaluations of FEEL expressions that reference this variable.

### Delete a global cluster variable

1. Log in to Admin in your cluster, and select the **Cluster Variables** tab.
2. Click **Delete** next to the variable you want to delete.
3. Confirm the deletion by clicking **Delete** in the confirmation dialog.

The variable is deleted and is no longer available in FEEL expressions.

:::note
Deleting a cluster variable does not affect process instances that have already resolved the variable value.
:::

## Manage tenant cluster variables

When [multi-tenancy](/components/concepts/multi-tenancy.md) is enabled, you can define tenant-specific cluster variables that override global variables with the same name for processes running in that tenant.

### Create a tenant cluster variable

1. Log in to Admin in your cluster, and select the **Cluster Variables** tab.
2. Select the tenant for which you want to create a variable.
3. Click **Create variable**.
4. Provide the following details:
   - **Name**: A unique identifier for the variable.
   - **Value**: The value of the variable.
5. Click **Create variable**.

The variable is created and available in FEEL expressions for processes running in the selected tenant using `camunda.vars.tenant.<name>` or `camunda.vars.env.<name>`.

:::note
If a global variable with the same name exists, the tenant-level variable takes precedence for processes running in this tenant. See [scope resolution](/components/modeler/feel/cluster-variable/scope-and-priority.md) for details.
:::

### Update a tenant cluster variable

1. Log in to Admin in your cluster, and select the **Cluster Variables** tab.
2. Select the tenant for which you want to update the variable.
3. Click the **pencil icon** next to the variable you want to update.
4. Update the variable value.
5. Click **Save**.

### Delete a tenant cluster variable

1. Log in to Admin in your cluster, and select the **Cluster Variables** tab.
2. Select the tenant for which you want to delete the variable.
3. Click **Delete** next to the variable you want to delete.
4. Confirm the deletion by clicking **Delete** in the confirmation dialog.

## Manage cluster variables of kind `SECRET_REFERENCE`

A cluster variable of kind `SECRET_REFERENCE` can contain `camunda.secrets.<name>` references in its value. When a process reads the variable in an input mapping, Camunda resolves these references in the background ahead of activation, and injects the resolved values into the job only once it's handed to a worker. A `JSON`-kind variable whose value contains the same text is treated as ordinary text.

Resolving these references requires a secret store to be configured. Without one, references are never resolved, and any job that depends on them stays unactivated with no error pointing at the cause. See [`camunda.secrets.stores.file`](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundasecretsstoresfile).

The Admin UI create form has no kind field, so every variable you create there is a `JSON`-kind variable. To create a `SECRET_REFERENCE`-kind variable, use the Orchestration Cluster API with `"kind": "SECRET_REFERENCE"` in the request body, either [globally](/apis-tools/orchestration-cluster-api-rest/specifications/create-global-cluster-variable.api.mdx) or [for a tenant](/apis-tools/orchestration-cluster-api-rest/specifications/create-tenant-cluster-variable.api.mdx).

You can manage an existing `SECRET_REFERENCE`-kind variable in the Admin UI:

- Updating its value keeps its kind, and Camunda scans the new value for references. A variable's kind is fixed at creation and cannot be changed.
- The value shown in the variable list and in the variable details is the stored value, so you see the reference text rather than a resolved value.
- Deleting it works the same as deleting any other cluster variable.

For where resolved values appear and where they do not, see [secret resolution and job activation](/components/concepts/secret-resolution-and-job-activation.md).

## Required permissions

Managing cluster variables requires permissions on the `CLUSTER_VARIABLE` resource type. These permissions are the same for every kind, and there is no additional permission for a `SECRET_REFERENCE`-kind variable.

| Action                    | Required permission |
| ------------------------- | ------------------- |
| Create a cluster variable | `CREATE`            |
| View a cluster variable   | `READ`              |
| Update a cluster variable | `UPDATE`            |
| Delete a cluster variable | `DELETE`            |

The resource identifier is the variable name, or `*` for all cluster variables. See [authorizations](/components/concepts/access-control/authorizations.md#available-resources) for how to grant these permissions.

## See also

- [Cluster variables overview](/components/modeler/feel/cluster-variable/overview.md) — learn about scopes, data types, and FEEL expression usage.
- [Get started with cluster variables](/components/modeler/feel/cluster-variable/get-started.md) — tutorial for creating and using your first cluster variable.
- [Secret resolution and job activation](/components/concepts/secret-resolution-and-job-activation.md) — understand when a job that references secrets reaches a worker.
- [Orchestration Cluster API: Create global cluster variable](/apis-tools/orchestration-cluster-api-rest/specifications/create-global-cluster-variable.api.mdx) — manage cluster variables via API.
