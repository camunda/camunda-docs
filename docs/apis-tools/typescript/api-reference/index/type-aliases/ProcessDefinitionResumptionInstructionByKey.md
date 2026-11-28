---
title: "Type Alias: ProcessDefinitionResumptionInstructionByKey"
sidebar_label: "ProcessDefinitionResumptionInstructionByKey"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionResumptionInstructionByKey

```ts
type ProcessDefinitionResumptionInstructionByKey = object;
```

Process definition resumption by key

## Properties

### includeProcessInstances?

```ts
includeProcessInstances?: boolean;
```

Whether to also resume the process instances of the affected
process definition versions. The instances are changed by a batch operation.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition version to resume.
