---
title: "Type Alias: ScopeKey"
sidebar_label: "ScopeKey"
mdx:
  format: md
---

# Type Alias: ScopeKey

```ts
type ScopeKey = ProcessInstanceKey | ElementInstanceKey;
```

Defined in: [gen/types.gen.ts:4688](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4688)

System-generated key for a scope. A scope can hold variables and represents either an
element instance in a BPMN process or the process instance itself.
