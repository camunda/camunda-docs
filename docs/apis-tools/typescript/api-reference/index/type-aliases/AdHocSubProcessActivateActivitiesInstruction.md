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

Defined in: [gen/types.gen.ts:2559](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2559)

## Properties

### cancelRemainingInstances?

```ts
optional cancelRemainingInstances: boolean;
```

Defined in: [gen/types.gen.ts:2567](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2567)

Whether to cancel remaining instances of the ad-hoc sub-process.

---

### elements

```ts
elements: AdHocSubProcessActivateActivityReference[];
```

Defined in: [gen/types.gen.ts:2563](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2563)

Activities to activate.
