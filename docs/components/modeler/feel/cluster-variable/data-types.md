---
id: cluster-variable-data-types
title: Supported data types
sidebar_label: "Supported data types"
description: "Understand data types supported by cluster variables."
---

Understand the data types supported by cluster variables for different configuration needs.

## Simple values

- **String**: Text values for URLs, names, identifiers.
- **Number**: Numeric values for thresholds, timeouts, counts.
- **Boolean**: True/false values for feature flags and toggles.

## Complex values

- **Objects**: Nested structures for grouped configuration.
- **Arrays**: Lists of values.

:::note
Access patterns may vary depending on how the array is used.
:::

## Variable kinds

Every cluster variable has a kind, which determines how Camunda reads its value.

| Kind               | Description                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| `JSON`             | Default kind. Camunda reads the value exactly as you stored it.                    |
| `SECRET_REFERENCE` | The value can contain `camunda.secrets.<name>` references, which Camunda resolves. |

Secret resolution for `SECRET_REFERENCE` variables is part of an [alpha feature](/components/early-access/alpha/alpha-features.md) and may change in future releases.

Camunda resolves references only in variables of kind `SECRET_REFERENCE`. For variables of kind `JSON`, Camunda treats the same reference text as ordinary text and passes it to your process unchanged.

### Where references can appear in a value

Camunda scans every string in a variable of kind `SECRET_REFERENCE`, including strings nested inside objects and arrays. Camunda does not scan object keys. A reference has the form `camunda.secrets.<name>`, where `<name>` can contain ASCII letters, digits, underscores, and dashes, up to 240 characters. Camunda does not resolve a name that violates either requirement.See [secrets](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secrets) for more details.

For example, the following value contains two references, one at the top level and one nested:

```json
{
  "apiKey": "camunda.secrets.PAYMENT_API_KEY",
  "database": {
    "user": "reporting",
    "password": "camunda.secrets.REPORTING_DB_PASSWORD"
  }
}
```

Do not place a reference inside an array. Camunda detects the reference when you create the variable but cannot resolve it when a process reads the variable. In this case, Camunda does not activate the job and raises an incident. See [when a job is not activated](/components/concepts/secret-resolution-and-job-activation.md#understand-why-a-job-is-not-activated) for more details.

### Create a variable of kind `SECRET_REFERENCE`

Set `kind` when you create the variable. If you omit `kind`, the variable is created as `JSON`.

```bash
POST /v2/cluster-variables/global
Content-Type: application/json

{
  "name": "PAYMENT_API_CONFIG",
  "kind": "SECRET_REFERENCE",
  "value": {
    "endpoint": "https://api.payment.prod.example.com",
    "apiKey": "camunda.secrets.PAYMENT_API_KEY"
  }
}
```

You cannot change a variable's kind after creation. Update requests do not include a `kind` field, so a variable of kind `SECRET_REFERENCE` keeps its kind when you update its value. Camunda scans the new value for references. To change a variable's kind, delete it and create it again with the kind you want.

### Read a variable of kind `SECRET_REFERENCE`

Get and search responses return the stored value, so you see the reference text rather than a resolved value. Camunda resolves references only when a process reads the variable in an input mapping, as described in [Resolve secret references in a cluster variable](./usage-guide.md#resolve-secret-references-in-a-cluster-variable). To understand where resolved values appear, see [Secret resolution and job activation](/components/concepts/secret-resolution-and-job-activation.md).

To find variables of a given kind, use the `kind` filter in [search cluster variables](/apis-tools/orchestration-cluster-api-rest/specifications/search-cluster-variables.api.mdx).

### Required permissions

A `SECRET_REFERENCE`-kind variable needs the same permissions as any other cluster variable. There is no additional permission for this kind.

| Action            | Required permission                              |
| ----------------- | ------------------------------------------------ |
| Create a variable | `CREATE` on the `CLUSTER_VARIABLE` resource type |
| Get or search     | `READ` on the `CLUSTER_VARIABLE` resource type   |
| Update a variable | `UPDATE` on the `CLUSTER_VARIABLE` resource type |
| Delete a variable | `DELETE` on the `CLUSTER_VARIABLE` resource type |

The resource identifier is the variable name, or `*` for all cluster variables. See [authorizations](/components/concepts/access-control/authorizations.md#available-resources) for how to grant these permissions.
