---
title: "Type Alias: ProcessInstanceCreationStartInstruction"
sidebar_label: "ProcessInstanceCreationStartInstruction"
mdx:
  format: md
---

# Type Alias: ProcessInstanceCreationStartInstruction

```ts
type ProcessInstanceCreationStartInstruction = object;
```

## Properties

### elementId

```ts
elementId: ElementId;
```

Future extensions might include:

- different types of start instructions
- ability to set local variables for different flow scopes

For now, however, the start instruction is implicitly a "startBeforeElement" instruction
