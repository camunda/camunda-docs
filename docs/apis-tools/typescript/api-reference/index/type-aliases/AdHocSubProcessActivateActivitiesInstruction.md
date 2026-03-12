---
title: "Type Alias: AdHocSubProcessActivateActivitiesInstruction"
sidebar_label: "AdHocSubProcessActivateActivitiesInstruction"
mdx:
  format: md
---

# Type Alias: AdHocSubProcessActivateActivitiesInstruction

```ts
type AdHocSubProcessActivateActivitiesInstruction = object;
```

Defined in: [gen/types.gen.ts:2708](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2708)

## Properties

### cancelRemainingInstances?

```ts
optional cancelRemainingInstances: boolean;
```

Defined in: [gen/types.gen.ts:2716](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2716)

Whether to cancel remaining instances of the ad-hoc sub-process.

***

### elements

```ts
elements: AdHocSubProcessActivateActivityReference[];
```

Defined in: [gen/types.gen.ts:2712](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2712)

Activities to activate.
