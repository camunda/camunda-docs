---
id: variable-protection
title: "Variable protection"
sidebar_label: Variable protection
description: "Protect sensitive process variables so their values are replaced before they reach secondary storage and are never returned by the Orchestration Cluster API. Available from 8.11.0-alpha1."
---

Variable protection lets you mark a [variable](./variables.md) as sensitive when you create a process instance, so its value is irrecoverably replaced before it reaches secondary storage.

Variable protection is available from 8.11.0-alpha1 as an alpha feature. It currently supports one protection mode, `REDACT`, and is configured when you [create a process instance](./process-instance-creation.md).

:::warning
In 8.11.0-alpha1, variable protection is incomplete. Redaction applies to the stored variable that you read through the variable and user task variable endpoints, but variable values can still appear in other places. See [Known issues and planned changes](#known-issues-and-planned-changes) before you rely on this feature for sensitive data.
:::

## Protection modes

A protection mode defines how Camunda handles the value of a protected variable. You set protection modes per variable in the `variablesMetadata` property of a request, next to the `variables` property.

| Protection mode | Description                                                                    | Available since |
| :-------------- | :----------------------------------------------------------------------------- | :-------------- |
| `REDACT`        | Irrecoverably replaces the variable value before it reaches secondary storage. | 8.11.0-alpha1   |

## REDACT

The `REDACT` protection mode irrecoverably replaces the value of a variable before it reaches secondary storage, so the value is never readable through the API. The variable itself, its name, and its metadata remain visible.

### Protect a variable when you create a process instance

To protect a variable, send a `POST /v2/process-instances` request and add the variable name to `variablesMetadata`. Then set its `protectionModes` to `["REDACT"]`. For all request fields, see [create process instance](/apis-tools/orchestration-cluster-api-rest/specifications/create-process-instance.api.mdx).

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

| Property                                   | Description                                                                                            |
| :----------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `variables`                                | The variables to set on the process instance. Variable values are sent in the request in plain text.   |
| `variablesMetadata`                        | Optional. A map from variable name to its metadata. Variables without an entry are not protected.      |
| `variablesMetadata.<name>.protectionModes` | The protection modes to apply to the variable. In 8.11.0-alpha1, the only supported value is `REDACT`. |

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

To list only protected variables, use the `protectionMode` filter in the variables search request. A variable matches when it has at least one of the given protection modes. For all request and response fields, see the [search variables API specification](/apis-tools/orchestration-cluster-api-rest/specifications/search-variables.api.mdx).

:::warning
The redacted `value` is the string `"null"`, not an omitted field or a JSON `null`. Check `metadata.protectionModes` instead of the value to detect a protected variable. A variable whose real value is the string `"null"` can't be told apart by its value alone. In a later release, the redacted value will change to `null`.
:::

### What you can and can't do

| You can                                                                                                                            | You can't                                                                                                                   |
| :--------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| Protect one or more variables with `REDACT` when you create a process instance.                                                    | Read the original value of a protected variable through the API. The value is replaced before it reaches secondary storage. |
| Identify protected variables through `metadata.protectionModes`, or filter for them with `protectionMode` in the variables search. | Rely on `REDACT` to hide a value in places other than the stored variable in 8.11.0-alpha1.                                 |
| Keep using unprotected variables in the same process instance without any change.                                                  | Protect a variable by default. You must set `variablesMetadata` explicitly on every request.                                |
| Look up a protected variable by name, scope, and process instance. The variable remains searchable.                                | Protect variables that you set through other requests, such as setting variables on a running element instance.             |

## Known issues and planned changes

The following limitations apply to 8.11.0-alpha1. They are planned to be addressed in later 8.11 releases.

### Redaction does not cover every place a value can appear

Variable values can be carried by many records and endpoints beyond variable search. In 8.11.0-alpha1, `REDACT` should not be treated as a guarantee that a value never appears in the following places:

- Responses and records that contain variable lists, such as job activation, job completion, user task completion, message publication and correlation, signal broadcast, and process instance results.
- Records that quote a variable value in free text, such as incident error messages, job error messages, and decision evaluation failure messages.
- Values derived from a variable, such as decision inputs and outputs, FEEL expression results, message correlation keys, and multi-instance input collections.
- The process instance creation request and response itself. The request carries the value in plain text.

Use these limitations to decide if a variable is suitable for protection. For example, avoid using a protected variable as a message correlation key or as the input of a decision.

### Protection can only be set at process instance creation

In 8.11.0-alpha1, you can set `variablesMetadata` when you create a process instance. Other requests that write variables, such as [setting variables on an element instance](/apis-tools/orchestration-cluster-api-rest/specifications/create-element-instance-variables.api.mdx), don't accept protection settings yet. Support for these requests is planned.

### The redacted value is the string `"null"`

In 8.11.0-alpha1, the search response returns a redacted value as the string `"null"`. In a later release, the redacted value will change to `null`. Build integrations on `metadata.protectionModes`, not on the redacted `value`, so they keep working after the change.

## Next steps

- Learn how variables work in [variables](./variables.md).
- Learn about [process instance creation](./process-instance-creation.md).
- See the [Orchestration Cluster REST API overview](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).
