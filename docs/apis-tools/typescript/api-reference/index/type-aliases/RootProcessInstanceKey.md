---
title: "Type Alias: RootProcessInstanceKey"
sidebar_label: "RootProcessInstanceKey"
mdx:
  format: md
---

# Type Alias: RootProcessInstanceKey

```ts
type RootProcessInstanceKey = CamundaKey<"RootProcessInstanceKey">;
```

Defined in: [gen/types.gen.ts:4019](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4019)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.
