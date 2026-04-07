---
title: "Type Alias: JobErrorRequest"
sidebar_label: "JobErrorRequest"
mdx:
  format: md
---

# Type Alias: JobErrorRequest

```ts
type JobErrorRequest = object;
```

Defined in: [gen/types.gen.ts:4375](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4375)

## Properties

### errorCode

```ts
errorCode: string;
```

Defined in: [gen/types.gen.ts:4380](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4380)

The error code that will be matched with an error catch event.

---

### errorMessage?

```ts
optional errorMessage?: string | null;
```

Defined in: [gen/types.gen.ts:4385](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4385)

An error message that provides additional context.

---

### variables?

```ts
optional variables?:
  | {
[key: string]: unknown;
}
  | null;
```

Defined in: [gen/types.gen.ts:4390](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L4390)

JSON object that will instantiate the variables at the local scope of the error catch event that catches the thrown error.
