---
title: "Type Alias: ProcessDefinitionSuspensionResult"
sidebar_label: "ProcessDefinitionSuspensionResult"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionSuspensionResult

```ts
type ProcessDefinitionSuspensionResult = object;
```

## Properties

### batchOperationKey

```ts
batchOperationKey: BatchOperationKey | null;
```

The key of the batch operation that suspends the running process instances.
Null when `includeProcessInstances` is not set.

---

### processDefinitions

```ts
processDefinitions: ProcessDefinitionSuspensionVersionResult[];
```

The affected process definition versions.
