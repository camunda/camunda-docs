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

Defined in: [gen/types.gen.ts:6200](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6200)

## Properties

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6209](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6209)

Future extensions might include:
- different types of start instructions
- ability to set local variables for different flow scopes

For now, however, the start instruction is implicitly a "startBeforeElement" instruction
