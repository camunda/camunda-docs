---
title: "Type Alias: SourceElementInstanceKeyInstruction"
sidebar_label: "SourceElementInstanceKeyInstruction"
mdx:
  format: md
---

# Type Alias: SourceElementInstanceKeyInstruction

```ts
type SourceElementInstanceKeyInstruction = object;
```

Defined in: [gen/types.gen.ts:6690](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6690)

Defines an instruction with a sourceElementInstanceKey. The move instruction with this sourceType will terminate one active element
instance with the sourceElementInstanceKey and activate a new element instance at targetElementId.

## Properties

### sourceElementInstanceKey

```ts
sourceElementInstanceKey: ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:6699](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6699)

The source element instance key for the move instruction.

***

### sourceType

```ts
sourceType: string;
```

Defined in: [gen/types.gen.ts:6694](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6694)

The type of source element instruction.
