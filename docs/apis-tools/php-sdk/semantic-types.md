---
id: semantic-types
title: "Semantic Types"
sidebar_label: "Semantic Types"
sidebar_position: 5
mdx:
  format: md
---

# Semantic Types

:::caution Technical Preview
The PHP SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

The SDK uses distinct value objects for identifiers like `ProcessDefinitionId`, `ProcessInstanceKey`, `JobKey`, `TenantId`, and so on, defined in the `Camunda\Orchestration\Semantic` namespace.

## Why they exist

Camunda's API has many operations that accept string keys. Without semantic types it is easy to accidentally pass a process-instance key where a process-definition id is expected. When everything is a `string`, static analysis cannot help you.

Semantic types make these identifiers **distinct at the type level**. PHPStan flags an error if you pass the wrong identifier type, catching bugs before runtime. Each value object validates its format on construction and implements `Stringable` and `JsonSerializable`, so it serializes transparently to JSON.

## How to use them

```php
function readme_semantic_types(): void
{
    // Identifiers are distinct value objects — you cannot accidentally pass a
    // process-definition id where a tenant id is expected.
    $instruction = (new ProcessInstanceCreationInstructionById())
        ->setProcessDefinitionId(ProcessDefinitionId::of('order-process'))
        ->setVariables(['orderId' => 'ORD-42']);

    // Value objects validate their format on construction and stringify cleanly.
    $definitionId = new ProcessDefinitionId('order-process');
    echo (string) $definitionId, "\n";
}
```

When you construct a model from an array, raw strings are automatically lifted into their semantic value objects, so you can stay ergonomic where you want to.
