---
title: "Type Alias: JobCompletionRequest"
sidebar_label: "JobCompletionRequest"
mdx:
  format: md
---

# Type Alias: JobCompletionRequest

```ts
type JobCompletionRequest = object;
```

Defined in: [gen/types.gen.ts:4395](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4395)

## Properties

### result?

```ts
optional result?: JobResult;
```

Defined in: [gen/types.gen.ts:4402](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4402)

---

### variables?

```ts
optional variables?:
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:4399](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4399)

The variables to complete the job with.
