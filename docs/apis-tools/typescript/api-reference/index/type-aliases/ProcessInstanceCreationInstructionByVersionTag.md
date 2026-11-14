---
title: "Type Alias: ProcessInstanceCreationInstructionByVersionTag"
sidebar_label: "ProcessInstanceCreationInstructionByVersionTag"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationInstructionByVersionTag

```ts
type ProcessInstanceCreationInstructionByVersionTag =
  ProcessInstanceCreationInstructionBase & object;
```

Process creation by version tag

## Type Declaration

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The BPMN process id of the process definition to start an instance of.

### processDefinitionVersionTag

```ts
processDefinitionVersionTag: string;
```

The version tag of the process definition to start an instance of.
If several deployed versions carry the same tag, the most recently deployed one is used.
