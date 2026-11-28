---
title: "Type Alias: ProcessDefinitionSuspensionInstructionByKey"
sidebar_label: "ProcessDefinitionSuspensionInstructionByKey"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionSuspensionInstructionByKey

```ts
type ProcessDefinitionSuspensionInstructionByKey = object;
```

Process definition suspension by key

## Properties

### includeProcessInstances?

```ts
includeProcessInstances?: boolean;
```

Whether to also suspend the process instances of the affected
process definition versions. The instances are changed by a batch operation.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition version to suspend.
