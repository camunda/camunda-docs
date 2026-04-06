---
title: "Type Alias: DecisionInstanceStateEnum"
sidebar_label: "DecisionInstanceStateEnum"
mdx:
  format: md
---

# Type Alias: DecisionInstanceStateEnum

```ts
type DecisionInstanceStateEnum =
  | "EVALUATED"
  | "FAILED"
  | "UNSPECIFIED"
  | "UNKNOWN";
```

Defined in: [gen/types.gen.ts:1938](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1938)

The state of the decision instance. UNSPECIFIED and UNKNOWN are deprecated and should not be used anymore, for removal in 8.10
