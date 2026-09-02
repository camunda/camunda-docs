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
| `JSON`             | The default. The value is data, and Camunda reads it exactly as stored.            |
| `SECRET_REFERENCE` | The value can contain `camunda.secrets.<name>` references, which Camunda resolves. |

Only a `SECRET_REFERENCE`-kind variable has its references resolved. A `JSON`-kind variable whose value contains the same text is treated as ordinary text, and that text reaches your process unchanged.

### Where references can appear in a value

Camunda scans every string value in a `SECRET_REFERENCE`-kind value, including strings nested inside objects. Object keys are not scanned. A reference has the form `camunda.secrets.<name>`, where `<name>` can contain ASCII letters, digits, underscores, and dashes.

For example, the following value carries two references, one at the top level and one nested:

```json
{
  "apiKey": "camunda.secrets.PAYMENT_API_KEY",
  "database": {
    "user": "reporting",
    "password": "camunda.secrets.REPORTING_DB_PASSWORD"
  }
}
```

Do not place a reference inside an array. Camunda detects such a reference when you create the variable, but it cannot be resolved when a process reads the variable: the job is not activated and raises an incident instead. See [when a job is not activated](/components/concepts/secret-resolution-and-job-activation.md#when-a-job-is-not-activated).

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

A variable's kind is fixed at creation. Update requests carry no `kind` field, so updating a `SECRET_REFERENCE`-kind variable keeps its kind and scans the new value for references. To change a variable's kind, delete it and create it again with the kind you want.

### Read a variable of kind `SECRET_REFERENCE`

Get and search responses return the stored value, so you see the reference text rather than a resolved value. References are resolved only when a process reads the variable in an input mapping, as described in [resolve secret references in a cluster variable](./usage-guide.md#resolve-secret-references-in-a-cluster-variable). For where resolved values appear and where they do not, see [secret resolution and job activation](/components/concepts/secret-resolution-and-job-activation.md).

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
