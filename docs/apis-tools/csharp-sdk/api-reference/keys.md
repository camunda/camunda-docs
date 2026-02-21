---
title: "Keys"
sidebar_label: "Keys"
mdx:
  format: md
---

# Key Types

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

Strongly-typed domain key types provide compile-time safety for entity identifiers. Each key wraps a string value and ensures type-safe API calls.

## Overview

| Key Type                        | Description                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------- |
| `AuditLogEntityKey`             | System-generated entity key for an audit log entry.                              |
| `AuditLogKey`                   | System-generated key for an audit log entry.                                     |
| `AuthorizationKey`              | System-generated key for an authorization.                                       |
| `BatchOperationKey`             | System-generated key for an batch operation.                                     |
| `ConditionalEvaluationKey`      | System-generated key for a conditional evaluation.                               |
| `DecisionDefinitionKey`         | System-generated key for a decision definition.                                  |
| `DecisionEvaluationInstanceKey` | System-generated key for a decision evaluation instance.                         |
| `DecisionEvaluationKey`         | System-generated key for a decision evaluation.                                  |
| `DecisionInstanceKey`           | System-generated key for a deployed decision instance.                           |
| `DecisionRequirementsKey`       | System-generated key for a deployed decision requirements definition.            |
| `DeploymentKey`                 | Key for a deployment.                                                            |
| `ElementInstanceKey`            | System-generated key for a element instance.                                     |
| `FormKey`                       | System-generated key for a deployed form.                                        |
| `IncidentKey`                   | System-generated key for a incident.                                             |
| `JobKey`                        | System-generated key for a job.                                                  |
| `LongKey`                       | Zeebe Engine resource key (Java long serialized as string)                       |
| `MessageKey`                    | System-generated key for an message.                                             |
| `MessageSubscriptionKey`        | System-generated key for a message subscription.                                 |
| `ProcessDefinitionKey`          | System-generated key for a deployed process definition.                          |
| `ProcessInstanceKey`            | System-generated key for a process instance.                                     |
| `ResourceKey`                   | The system-assigned key for this resource.                                       |
| `RootProcessInstanceKey`        | The key of the root process instance. The root process instance is the top-level |

ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later. |
| `ScopeKey` | System-generated key for a scope. |
| `SignalKey` | System-generated key for an signal. |
| `UserTaskKey` | System-generated key for a user task. |
| `VariableKey` | System-generated key for a variable. |

## Common Methods

All key types share these methods:

| Method                 | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `AssumeExists(string)` | Creates a key from a known-valid string value.   |
| `IsValid(string)`      | Validates whether a string is a valid key value. |
| `Value`                | Gets the underlying string value.                |
| `ToString()`           | Returns the string representation.               |

## Details

### AuditLogEntityKey

System-generated entity key for an audit log entry.

```csharp
public readonly record struct AuditLogEntityKey : ICamundaKey, IEquatable<AuditLogEntityKey>
```

### AuditLogKey

System-generated key for an audit log entry.

```csharp
public readonly record struct AuditLogKey : ICamundaKey, IEquatable<AuditLogKey>
```

### AuthorizationKey

System-generated key for an authorization.

```csharp
public readonly record struct AuthorizationKey : ICamundaKey, IEquatable<AuthorizationKey>
```

### BatchOperationKey

System-generated key for an batch operation.

```csharp
public readonly record struct BatchOperationKey : ICamundaKey, IEquatable<BatchOperationKey>
```

### ConditionalEvaluationKey

System-generated key for a conditional evaluation.

```csharp
public readonly record struct ConditionalEvaluationKey : ICamundaKey, IEquatable<ConditionalEvaluationKey>
```

### DecisionDefinitionKey

System-generated key for a decision definition.

```csharp
public readonly record struct DecisionDefinitionKey : ICamundaKey, IEquatable<DecisionDefinitionKey>
```

### DecisionEvaluationInstanceKey

System-generated key for a decision evaluation instance.

```csharp
public readonly record struct DecisionEvaluationInstanceKey : ICamundaKey, IEquatable<DecisionEvaluationInstanceKey>
```

### DecisionEvaluationKey

System-generated key for a decision evaluation.

```csharp
public readonly record struct DecisionEvaluationKey : ICamundaKey, IEquatable<DecisionEvaluationKey>
```

### DecisionInstanceKey

System-generated key for a deployed decision instance.

```csharp
public readonly record struct DecisionInstanceKey : ICamundaKey, IEquatable<DecisionInstanceKey>
```

### DecisionRequirementsKey

System-generated key for a deployed decision requirements definition.

```csharp
public readonly record struct DecisionRequirementsKey : ICamundaKey, IEquatable<DecisionRequirementsKey>
```

### DeploymentKey

Key for a deployment.

```csharp
public readonly record struct DeploymentKey : ICamundaKey, IEquatable<DeploymentKey>
```

### ElementInstanceKey

System-generated key for a element instance.

```csharp
public readonly record struct ElementInstanceKey : ICamundaKey, IEquatable<ElementInstanceKey>
```

### FormKey

System-generated key for a deployed form.

```csharp
public readonly record struct FormKey : ICamundaKey, IEquatable<FormKey>
```

### IncidentKey

System-generated key for a incident.

```csharp
public readonly record struct IncidentKey : ICamundaKey, IEquatable<IncidentKey>
```

### JobKey

System-generated key for a job.

```csharp
public readonly record struct JobKey : ICamundaKey, IEquatable<JobKey>
```

### LongKey

Zeebe Engine resource key (Java long serialized as string)

```csharp
public readonly record struct LongKey : ICamundaKey, IEquatable<LongKey>
```

### MessageKey

System-generated key for an message.

```csharp
public readonly record struct MessageKey : ICamundaKey, IEquatable<MessageKey>
```

### MessageSubscriptionKey

System-generated key for a message subscription.

```csharp
public readonly record struct MessageSubscriptionKey : ICamundaKey, IEquatable<MessageSubscriptionKey>
```

### ProcessDefinitionKey

System-generated key for a deployed process definition.

```csharp
public readonly record struct ProcessDefinitionKey : ICamundaKey, IEquatable<ProcessDefinitionKey>
```

### ProcessInstanceKey

System-generated key for a process instance.

```csharp
public readonly record struct ProcessInstanceKey : ICamundaKey, IEquatable<ProcessInstanceKey>
```

### ResourceKey

The system-assigned key for this resource.

```csharp
public readonly record struct ResourceKey : ICamundaKey, IEquatable<ResourceKey>
```

### RootProcessInstanceKey

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

```csharp
public readonly record struct RootProcessInstanceKey : ICamundaKey, IEquatable<RootProcessInstanceKey>
```

### ScopeKey

System-generated key for a scope.

```csharp
public readonly record struct ScopeKey : ICamundaKey, IEquatable<ScopeKey>
```

### SignalKey

System-generated key for an signal.

```csharp
public readonly record struct SignalKey : ICamundaKey, IEquatable<SignalKey>
```

### UserTaskKey

System-generated key for a user task.

```csharp
public readonly record struct UserTaskKey : ICamundaKey, IEquatable<UserTaskKey>
```

### VariableKey

System-generated key for a variable.

```csharp
public readonly record struct VariableKey : ICamundaKey, IEquatable<VariableKey>
```
