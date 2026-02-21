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

Defined in: [gen/types.gen.ts:5531](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5531)

## Properties

### elementId

```ts
elementId: ElementId;
```

Defined in: [gen/types.gen.ts:5540](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5540)

Future extensions might include:

- different types of start instructions
- ability to set local variables for different flow scopes

For now, however, the start instruction is implicitly a "startBeforeElement" instruction
