---
title: "Type Alias: ActivateAdHocSubProcessActivitiesData"
sidebar_label: "ActivateAdHocSubProcessActivitiesData"
mdx:
  format: md
---

# Type Alias: ActivateAdHocSubProcessActivitiesData

```ts
type ActivateAdHocSubProcessActivitiesData = object;
```

Defined in: [gen/types.gen.ts:10180](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10180)

## Properties

### body

```ts
body: AdHocSubProcessActivateActivitiesInstruction;
```

Defined in: [gen/types.gen.ts:10181](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10181)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10182](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10182)

#### adHocSubProcessInstanceKey

```ts
adHocSubProcessInstanceKey: ElementInstanceKey;
```

The key of the ad-hoc sub-process instance that contains the activities.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:10188](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10188)

***

### url

```ts
url: "/element-instances/ad-hoc-activities/{adHocSubProcessInstanceKey}/activation";
```

Defined in: [gen/types.gen.ts:10189](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L10189)
