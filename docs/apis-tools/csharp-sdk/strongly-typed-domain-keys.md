---
id: strongly-typed-domain-keys
title: "Strongly-Typed Domain Keys"
sidebar_label: "Strongly-Typed Domain Keys"
sidebar_position: 9
mdx:
  format: md
---

# Strongly-Typed Domain Keys

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

All domain identifiers (process definition keys, job keys, user task keys, etc.) are `readonly record struct` types rather than plain strings. This prevents accidentally mixing different key types at compile time — the same pattern as the JS SDK's branded types.

<!-- snippet:UsingDirective+DomainKeys -->

```csharp
using Camunda.Orchestration.Sdk;

// Lift a raw value into the correct nominal type
var defKey = ProcessDefinitionKey.AssumeExists("2251799813686749");

// Type safety — compiler prevents mixing key types
var taskKey = UserTaskKey.AssumeExists("123456");
// await client.GetProcessDefinitionAsync(taskKey); // ← compile error

// Validation — constraints (pattern, length) checked at construction
ProcessDefinitionKey.IsValid("2251799813686749"); // true

// Values returned from API calls are already typed
var result = await client.GetProcessDefinitionAsync(defKey);
// result.ProcessDefinitionKey is ProcessDefinitionKey, not string

// Transparent JSON serialization — no special handling needed
```

Key types implement `ICamundaKey` (string-backed) or `ICamundaLongKey` (long-backed) and serialize as plain JSON values. Constraint validation (regex pattern, min/max length) is enforced in `AssumeExists()` and queryable via `IsValid()`.
