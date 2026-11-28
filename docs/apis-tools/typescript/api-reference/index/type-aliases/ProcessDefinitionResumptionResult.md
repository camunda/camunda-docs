---
title: "Type Alias: ProcessDefinitionResumptionResult"
sidebar_label: "ProcessDefinitionResumptionResult"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionResumptionResult

```ts
type ProcessDefinitionResumptionResult = object;
```

## Properties

### batchOperationKey

```ts
batchOperationKey: BatchOperationKey | null;
```

The key of the batch operation that resumes the suspended process instances.
Null when `includeProcessInstances` is not set.

---

### processDefinitions

```ts
processDefinitions: ProcessDefinitionResumptionVersionResult[];
```

The affected process definition versions.
