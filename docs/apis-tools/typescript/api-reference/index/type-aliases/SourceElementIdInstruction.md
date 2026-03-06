---
title: "Type Alias: SourceElementIdInstruction"
sidebar_label: "SourceElementIdInstruction"
mdx:
  format: md
---

# Type Alias: SourceElementIdInstruction

```ts
type SourceElementIdInstruction = object;
```

Defined in: [gen/types.gen.ts:6673](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6673)

Defines an instruction with a sourceElementId. The move instruction with this sourceType will terminate all active element
instances with the sourceElementId and activate a new element instance for each terminated
one at targetElementId.

## Properties

### sourceElementId

```ts
sourceElementId: ElementId;
```

Defined in: [gen/types.gen.ts:6682](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6682)

The id of the source element for the move instruction.

***

### sourceType

```ts
sourceType: string;
```

Defined in: [gen/types.gen.ts:6677](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6677)

The type of source element instruction.
