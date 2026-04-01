---
id: typed-variables-with-dtos
title: "Typed Variables with DTOs"
sidebar_label: "Typed Variables with DTOs"
sidebar_position: 12
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

<!-- snippet:UsingDirective+SendingVariables+SendingVariablesBody -->

```csharp
using Camunda.Orchestration.Sdk;

// Define your application domain models
public record OrderInput(string OrderId, decimal Amount);

// Assign the DTO directly
await client.CreateProcessInstanceAsync(new ProcessInstanceCreationInstructionById
{
    ProcessDefinitionId = ProcessDefinitionId.AssumeExists("order-process"),
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

<!-- snippet:UsingDirective+ReceivingVariables+ReceivingVariablesBody -->

```csharp
using Camunda.Orchestration.Sdk;

public record OrderResult(bool Processed, string InvoiceNumber);

// Deserialize variables from any API response
var result = await client.CreateProcessInstanceAsync(
    new ProcessInstanceCreationInstructionById
    {
        ProcessDefinitionId = ProcessDefinitionId.AssumeExists("test"),
    });
var output = result.Variables.DeserializeAs<OrderResult>();
// output.Processed, output.InvoiceNumber — fully typed
```

`DeserializeAs<T>()` handles the common runtime shapes:

- `JsonElement` (standard API response) → deserialized via `System.Text.Json`
- Already the target type → returned as-is (zero-copy)
- `null` → returns `default(T)`

Custom `JsonSerializerOptions` can be passed for non-standard naming conventions.
