---
title: "Type Alias: ProcessInstanceCreationInstructionByKey"
sidebar_label: "ProcessInstanceCreationInstructionByKey"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationInstructionByKey

```ts
type ProcessInstanceCreationInstructionByKey =
  ProcessInstanceCreationInstructionBase & object;
```

Process creation by key

## Type Declaration

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The unique key identifying the process definition, for example, returned for a process in the
deploy resources endpoint.

### processDefinitionVersion?

```ts
processDefinitionVersion?: number;
```

As the version is already identified by the `processDefinitionKey`, the value of this field is ignored.
It's here for backwards-compatibility only as previous releases accepted it in request bodies.
