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

Defined in: [gen/types.gen.ts:6129](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6129)

## Properties

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:6138](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6138)

Future extensions might include:
- different types of start instructions
- ability to set local variables for different flow scopes

For now, however, the start instruction is implicitly a "startBeforeElement" instruction
