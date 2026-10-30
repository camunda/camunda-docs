---
id: variable-protection
title: "Variable protection"
sidebar_label: Variable protection
description: "Keep sensitive process variable values, such as card numbers or personal data, out of secondary storage. Available from 8.11.0-alpha1."
---

Process [variables](./variables.md) often carry sensitive data, such as card numbers or personal details. By default, variable values are exported to secondary storage, such as Elasticsearch, OpenSearch, or an RDBMS, where anyone with access to that storage or to the search APIs can read them.

With variable protection, you mark individual variables as sensitive so their values are not exported to secondary storage. You keep using the variables in your process, and you can still see which variables exist and which are protected.

Variable protection is available from 8.11.0-alpha1 as an alpha feature.

:::warning
In 8.11.0-alpha1, variable protection is incomplete. Redaction applies to variables that you read through the variable and user task variable endpoints, but values can still appear in other places. Before you rely on this feature for sensitive data, see [Known issues and planned changes](#known-issues-and-planned-changes).
:::

## REDACT

The `REDACT` protection mode irrecoverably replaces the value of a variable before it is exported to secondary storage. Searching or reading the variable through the API returns the redacted value, not the original.

The variable itself stays visible in secondary storage, only without its value. For example, you can still see its `name`, `variableKey`, `scopeKey`, `processInstanceKey`, `tenantId`, and `metadata.protectionModes`.

The original value is not removed from the engine. Components that work with primary storage still receive it, for example a job worker that activates a job and gets the process variables.

### Protect a variable when you create a process instance

To protect a variable, send a `POST /v2/process-instances` request. In `variablesMetadata`, add an entry for the variable name and set its `protectionModes` to `["REDACT"]`. For all request fields, see [create process instance](/apis-tools/orchestration-cluster-api-rest/specifications/create-process-instance.api.mdx).

The following request creates a process instance with two variables and protects `cardNumber`:

```json
{
  "processDefinitionId": "payment-process",
  "variables": {
    "cardNumber": "5500000000000004",
    "amount": 120
  },
  "variablesMetadata": {
    "cardNumber": {
      "protectionModes": ["REDACT"]
    }
  }
}
```

| Property                                   | Description                                                                                                                                                                                           |
| :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variables`                                | The variables to set on the process instance, as a map from variable name to value.                                                                                                                   |
| `variablesMetadata`                        | Optional. A map from variable name to its metadata. Variables without an entry are not protected. Every name must also be in `variables`, otherwise the request is rejected with a bad request error. |
| `variablesMetadata.<name>.protectionModes` | The protection modes to apply to the variable. Set it to `["REDACT"]`.                                                                                                                                |

### Update variables

You can also protect a variable, or change its protection, when you update variables on an element instance. Send a `PUT /v2/element-instances/{elementInstanceKey}/variables` request and add `variablesMetadata` next to `variables`, the same way as when you create a process instance.

If you don't add an entry for a variable, its protection doesn't change. A protected variable stays protected, and an unprotected variable stays unprotected. For all request fields, see [update element instance variables](/apis-tools/orchestration-cluster-api-rest/specifications/create-element-instance-variables.api.mdx).

The following request sets a new value for `cardNumber` and protects it:

```json
{
  "variables": {
    "cardNumber": "4111111111111111"
  },
  "variablesMetadata": {
    "cardNumber": {
      "protectionModes": ["REDACT"]
    }
  }
}
```

The result depends on whether the variable already exists, whether it's already protected, and what you send.

:::warning
Not all update cases are finalized. The cases below can change before the final release.
:::

| Variable before the request | You send                                                         | What happens                                                            |
| :-------------------------- | :--------------------------------------------------------------- | :---------------------------------------------------------------------- |
| Doesn't exist               | A value, no `variablesMetadata` entry                            | The variable is created. Its value isn't redacted.                      |
| Doesn't exist               | A value, `REDACT`                                                | The variable is created. Its value is redacted.                         |
| Exists, not protected       | The same value, `REDACT`                                         | The variable is now redacted. Only its metadata changes, not its value. |
| Exists, not protected       | A new value, `REDACT`                                            | The variable gets the new value, and it's redacted.                     |
| Exists, protected           | A new value, no `variablesMetadata` entry                        | The variable gets the new value, and it stays redacted.                 |
| Exists, protected           | The same value, no `variablesMetadata` entry                     | Nothing changes.                                                        |
| Exists, protected           | The same value, `REDACT`                                         | Nothing changes.                                                        |
| Exists, protected           | Any value, an empty `protectionModes` list                       | The redaction is removed.                                               |
| Any                         | A `variablesMetadata` entry for a name that isn't in `variables` | The request is rejected with a bad request error.                       |

### See redacted variables in search results

When you send a `POST /v2/variables/search` request, the response replaces the value of every protected variable. To tell which variables are protected, check the `metadata.protectionModes` property of each variable. For request and response details, see [search variables](/apis-tools/orchestration-cluster-api-rest/specifications/search-variables.api.mdx).

The following endpoints return `metadata.protectionModes`:

| Endpoint                                                       | API specification                                                                                                                              |
| :------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /v2/variables/search`                                    | [Search variables](/apis-tools/orchestration-cluster-api-rest/specifications/search-variables.api.mdx)                                         |
| `GET /v2/variables/{variableKey}`                              | [Get variable](/apis-tools/orchestration-cluster-api-rest/specifications/get-variable.api.mdx)                                                 |
| `POST /v2/user-tasks/{userTaskKey}/variables/search`           | [Search user task variables](/apis-tools/orchestration-cluster-api-rest/specifications/search-user-task-variables.api.mdx)                     |
| `POST /v2/user-tasks/{userTaskKey}/effective-variables/search` | [Search user task effective variables](/apis-tools/orchestration-cluster-api-rest/specifications/search-user-task-effective-variables.api.mdx) |

For the process instance created above, the search response looks like this:

```json
{
  "items": [
    {
      "value": "null",
      "isTruncated": false,
      "name": "cardNumber",
      "tenantId": "<default>",
      "variableKey": 2251799813685328,
      "scopeKey": 2251799813685327,
      "processInstanceKey": 2251799813685327,
      "rootProcessInstanceKey": 2251799813685327,
      "metadata": {
        "protectionModes": ["REDACT"]
      }
    },
    {
      "value": "120",
      "isTruncated": false,
      "name": "amount",
      "tenantId": "<default>",
      "variableKey": 2251799813685346,
      "scopeKey": 2251799813685345,
      "processInstanceKey": 2251799813685345,
      "rootProcessInstanceKey": 2251799813685345,
      "metadata": {
        "protectionModes": []
      }
    }
  ]
}
```

| Property                   | Protected variable (`cardNumber`) | Unprotected variable (`amount`) |
| :------------------------- | :-------------------------------- | :------------------------------ |
| `value`                    | `"null"`                          | `"120"`                         |
| `metadata.protectionModes` | `["REDACT"]`                      | `[]`                            |

To list only protected or only unprotected variables, use the `protectionMode` filter in the variables search request. For all request and response fields, see the [search variables API specification](/apis-tools/orchestration-cluster-api-rest/specifications/search-variables.api.mdx).

:::warning
The redacted `value` is the string `"null"`, not an omitted field or a JSON `null`. Check `metadata.protectionModes` instead of the value to detect a protected variable. A variable whose real value is the string `"null"` can't be told apart by its value alone. In a later release, the redacted value will change to `null`.
:::

### What you can and can't do

| You can                                                                                                                            | You can't                                                                                                                              |
| :--------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| Protect one or more variables with `REDACT` when you create a process instance or update variables.                                | Read the original value of a protected variable from secondary storage or the variable endpoints. The value is replaced before export. |
| Identify protected variables through `metadata.protectionModes`, or filter for them with `protectionMode` in the variables search. | Rely on `REDACT` to hide a value in places other than the stored variable in 8.11.0-alpha1.                                            |
| Keep using unprotected variables in the same process instance without any change.                                                  | Protect a variable by default. You must set `variablesMetadata` explicitly on every request.                                           |
| Search for a protected variable by name, scope, or process instance, but not by its value.                                         | Rely on the update cases that are not finalized yet. They can change before the final release.                                         |

## Known issues and planned changes

The following limitations apply to 8.11.0-alpha1. They are planned to be addressed in later 8.11 releases.

### Redaction doesn't cover every place a value can appear

Variable values can be carried by many records and endpoints beyond variable search. In 8.11.0-alpha1, `REDACT` should not be treated as a guarantee that a value never appears in the following places:

- Responses and records that contain variable lists, such as job activation, job completion, user task completion, message publication and correlation, signal broadcast, and process instance results.
- Records that quote a variable value in free text, such as incident error messages, job error messages, and decision evaluation failure messages.
- Values derived from a variable, such as decision inputs and outputs, FEEL expression results, message correlation keys, and multi-instance input collections.
- The process instance creation request and response.

Use these limitations to decide if a variable is suitable for protection. For example, avoid using a protected variable as a message correlation key or as the input of a decision.

### Update behavior is not finalized

Some cases of [updating variables](#update-variables) are not finalized, for example removing protection from a variable. They can change before the final release.

### The redacted value is the string `"null"`

In 8.11.0-alpha1, the search response returns a redacted value as the string `"null"`. In a later release, the redacted value will change to `null`. Build integrations on `metadata.protectionModes`, not on the redacted `value`, so they keep working after the change.

## Next steps

- Learn how variables work in [variables](./variables.md).
- Learn about [process instance creation](./process-instance-creation.md).
- See the [Orchestration Cluster REST API overview](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).
