---
title: "Domain keys"
sidebar_label: "Domain keys"
mdx:
  format: md
---

# Domain keys

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

The Camunda Domain Type System replaces the bare `string` identifiers emitted by the OpenAPI generator with validated named types. Passing a `ProcessInstanceKey` where a `JobKey` is expected is a compile error, so whole classes of identifier mix-ups are caught before the request is sent.

```go
import openapi "github.com/camunda/orchestration-cluster-api-go/client"
```

Every key type exposes the same surface, shown here for `AgentDefinitionKey`:

| Function or method                                            | Description                                                                                                    |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `MustAgentDefinitionKey(s string) AgentDefinitionKey`         | MustAgentDefinitionKey is like NewAgentDefinitionKey but panics if s is invalid.                               |
| `NewAgentDefinitionKey(s string) (AgentDefinitionKey, error)` | NewAgentDefinitionKey validates s against the AgentDefinitionKey constraints and returns a AgentDefinitionKey. |
| `(k AgentDefinitionKey) String() string`                      | String returns the underlying string value.                                                                    |
| `(k AgentDefinitionKey) Validate() error`                     | Validate reports whether k satisfies the AgentDefinitionKey constraints.                                       |

## Key types

| Key type                        | Underlying | Description                                           |
| ------------------------------- | ---------- | ----------------------------------------------------- |
| `AgentDefinitionKey`            | `string`   | Identifier for an agent definition.                   |
| `AgentHistoryItemKey`           | `string`   | Identifier for an agent history item.                 |
| `AgentInstanceKey`              | `string`   | Identifier for an agent instance.                     |
| `AuditLogEntityKey`             | `string`   | Identifier for an audit log entity.                   |
| `AuditLogKey`                   | `string`   | Identifier for an audit log.                          |
| `AuthorizationKey`              | `string`   | Identifier for an authorization.                      |
| `BatchOperationKey`             | `string`   | Identifier for a batch operation.                     |
| `BusinessId`                    | `string`   | Identifier for a business.                            |
| `ClientId`                      | `string`   | Identifier for a client.                              |
| `ClusterVariableName`           | `string`   | Name of a cluster variable.                           |
| `ConditionalEvaluationKey`      | `string`   | Identifier for a conditional evaluation.              |
| `DecisionDefinitionId`          | `string`   | Identifier for a decision definition.                 |
| `DecisionDefinitionKey`         | `string`   | Identifier for a decision definition.                 |
| `DecisionEvaluationInstanceKey` | `string`   | Identifier for a decision evaluation instance.        |
| `DecisionEvaluationKey`         | `string`   | Identifier for a decision evaluation.                 |
| `DecisionInstanceKey`           | `string`   | Identifier for a decision instance.                   |
| `DecisionRequirementsKey`       | `string`   | Identifier for a decision requirements.               |
| `DeploymentKey`                 | `string`   | Identifier for a deployment.                          |
| `DocumentId`                    | `string`   | Identifier for a document.                            |
| `ElementId`                     | `string`   | Identifier for an element.                            |
| `ElementInstanceKey`            | `string`   | Identifier for an element instance.                   |
| `EndCursor`                     | `string`   | Pagination cursor marking the end of a result page.   |
| `FormId`                        | `string`   | Identifier for a form.                                |
| `FormKey`                       | `string`   | Identifier for a form.                                |
| `GlobalListenerId`              | `string`   | Identifier for a global listener.                     |
| `GroupId`                       | `string`   | Identifier for a group.                               |
| `IncidentKey`                   | `string`   | Identifier for an incident.                           |
| `JobKey`                        | `string`   | Identifier for a job.                                 |
| `MappingRuleId`                 | `string`   | Identifier for a mapping rule.                        |
| `MessageKey`                    | `string`   | Identifier for a message.                             |
| `MessageSubscriptionKey`        | `string`   | Identifier for a message subscription.                |
| `ProcessDefinitionId`           | `string`   | Identifier for a process definition.                  |
| `ProcessDefinitionKey`          | `string`   | Identifier for a process definition.                  |
| `ProcessInstanceKey`            | `string`   | Identifier for a process instance.                    |
| `ResourceKey`                   | `string`   | Identifier for a resource.                            |
| `RoleId`                        | `string`   | Identifier for a role.                                |
| `SignalKey`                     | `string`   | Identifier for a signal.                              |
| `StartCursor`                   | `string`   | Pagination cursor marking the start of a result page. |
| `Tag`                           | `string`   | Validated tag value.                                  |
| `TenantId`                      | `string`   | Identifier for a tenant.                              |
| `UserTaskKey`                   | `string`   | Identifier for a user task.                           |
| `Username`                      | `string`   | Validated username value.                             |
| `VariableKey`                   | `string`   | Identifier for a variable.                            |

Each key also has a matching `<Key>ExactMatch` wrapper used by the search filter models to express an exact-value match.
