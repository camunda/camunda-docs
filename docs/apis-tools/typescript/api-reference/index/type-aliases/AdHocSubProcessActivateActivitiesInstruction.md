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

Defined in: [gen/types.gen.ts:2704](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2704)

## Properties

### cancelRemainingInstances?

```ts
optional cancelRemainingInstances?: boolean;
```

Defined in: [gen/types.gen.ts:2712](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2712)

Whether to cancel remaining instances of the ad-hoc sub-process.

---

### elements

```ts
elements: AdHocSubProcessActivateActivityReference[];
```

Defined in: [gen/types.gen.ts:2708](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2708)

Activities to activate.
