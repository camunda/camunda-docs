---
id: typed-variables-with-dtos
title: "Typed Variables with DTOs"
sidebar_label: "Typed Variables with DTOs"
sidebar_position: 13
mdx:
  format: md
---

# Typed Variables with DTOs

:::caution Technical Preview
The C# SDK is a **technical preview** available from Camunda 8.9. It will become fully supported in Camunda 8.10. Its API surface may change in future releases without following semver.
:::

Camunda API operations use dynamic `variables` and `customHeaders` payloads. By default these are untyped (`object`), but you can opt in to compile-time type safety using your own DTOs.

## Sending Variables (Input)

Assign any DTO or dictionary to the `Variables` property — `System.Text.Json` serializes the runtime type automatically:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+SendingVariables+SendingVariablesBody -->

```csharp
using Camunda.Orchestration.Sdk;

// Define your application domain models
public record OrderInput(string OrderId, decimal Amount);

// Assign the DTO directly
await client.CreateProcessInstanceAsync(new ProcessInstanceCreationInstructionById
{
    ProcessDefinitionId = processDefinitionId,
    Variables = new OrderInput("ord-123", 99.99m),
});

// Dictionaries also work — no DTO required
await client.CompleteJobAsync(jobKey, new JobCompletionRequest
{
    Variables = new Dictionary<string, object> { ["processed"] = true },
});
```

## Receiving Variables (Output)

Use `DeserializeAs<T>()` to extract typed DTOs from API responses:

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+ReceivingVariables+ReceivingVariablesBody -->

```csharp
using Camunda.Orchestration.Sdk;

public record OrderResult(bool Processed, string InvoiceNumber);

// Deserialize variables from any API response
var result = await client.CreateProcessInstanceAsync(
    new ProcessInstanceCreationInstructionById
    {
        ProcessDefinitionId = processDefinitionId,
    });
var output = result.Variables.DeserializeAs<OrderResult>();
// output.Processed, output.InvoiceNumber — fully typed
```

`DeserializeAs<T>()` handles the common runtime shapes:

- `JsonElement` (standard API response) → deserialized via `System.Text.Json`
- Already the target type → returned as-is (zero-copy)
- `null` → returns `default(T)`

Custom `JsonSerializerOptions` can be passed for non-standard naming conventions.

## Searching Variables as a DTO

`SearchVariablesAsDtoAsync<T>()` queries a process instance for exactly the variables declared on your DTO, pages through all results, and collapses them into a typed `VariableMap<T>`. Variable names are derived from the same `JsonSerializerOptions` used to deserialize (camelCase by default, overridable with `[JsonPropertyName]`), so the query filter, the raw keys, and DTO binding always agree.

<!-- snippet-source: docs/examples/ReadmeExamples.cs | regions: UsingDirective+SearchVariablesAsDto+SearchVariablesAsDtoBody -->

```csharp
using Camunda.Orchestration.Sdk;

public record OrderVariables(string OrderId, decimal Amount, string? Notes);

// Query only the variables declared on the DTO, across all pages, and
// collapse them into a single typed object.
var map = await client.SearchVariablesAsDtoAsync<OrderVariables>(processInstanceKey);

// Inspect individual values without materializing the whole DTO
if (map.Contains("amount"))
{
    var amount = map.Get<decimal>("amount");
}

// Validate() enforces that every non-nullable DTO member is present,
// throwing VariableValidationException if any required variable is missing.
OrderVariables order = map.Validate();
// order.OrderId, order.Amount — fully typed; order.Notes is optional
```

Behavior notes:

- **Scope collision**: if the same variable name appears at more than one scope (e.g. a local and a parent scope), `SearchVariablesAsDtoAsync` throws `VariableScopeCollisionException` rather than guessing. Narrow the query with the optional `scopeKey` parameter.
- **`Validate()`** throws `VariableValidationException` listing every missing required member; nullable members (`string?`, `int?`) are optional.
- **`Get<TValue>(name)`** and **`Get(name)`** read individual values lazily and return `default`/`null` when absent.
