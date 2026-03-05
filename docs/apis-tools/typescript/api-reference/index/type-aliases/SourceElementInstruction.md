---
title: "Type Alias: SourceElementInstruction"
sidebar_label: "SourceElementInstruction"
mdx:
  format: md
---

# Type Alias: SourceElementInstruction

```ts
type SourceElementInstruction = 
  | object & SourceElementIdInstruction
  | object & SourceElementInstanceKeyInstruction;
```

Defined in: [gen/types.gen.ts:6661](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6661)

Defines the source element identifier for the move instruction. It can either be a sourceElementId, or sourceElementInstanceKey.
