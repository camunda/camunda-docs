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

Defined in: [gen/types.gen.ts:2706](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2706)

## Properties

### cancelRemainingInstances?

```ts
optional cancelRemainingInstances: boolean;
```

Defined in: [gen/types.gen.ts:2714](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2714)

Whether to cancel remaining instances of the ad-hoc sub-process.

***

### elements

```ts
elements: AdHocSubProcessActivateActivityReference[];
```

Defined in: [gen/types.gen.ts:2710](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2710)

Activities to activate.
