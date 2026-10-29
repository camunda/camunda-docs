---
title: "Type Alias: ProcessInstanceCreationInstructionById"
sidebar_label: "ProcessInstanceCreationInstructionById"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationInstructionById

```ts
type ProcessInstanceCreationInstructionById =
  ProcessInstanceCreationInstructionBase & object;
```

Process creation by id

## Type Declaration

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The BPMN process id of the process definition to start an instance of.

### processDefinitionVersion?

```ts
processDefinitionVersion?: number;
```

The version of the process. If omitted, the latest active version is used.
