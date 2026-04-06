---
title: "Type Alias: CompleteJobData"
sidebar_label: "CompleteJobData"
mdx:
  format: md
---

# Type Alias: CompleteJobData

```ts
type CompleteJobData = object;
```

Defined in: [gen/types.gen.ts:11912](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11912)

## Properties

### body?

```ts
optional body?: JobCompletionRequest;
```

Defined in: [gen/types.gen.ts:11913](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11913)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11914](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11914)

#### jobKey

```ts
jobKey: JobKey;
```

The key of the job to complete.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:11920](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11920)

---

### url

```ts
url: "/jobs/{jobKey}/completion";
```

Defined in: [gen/types.gen.ts:11921](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L11921)
