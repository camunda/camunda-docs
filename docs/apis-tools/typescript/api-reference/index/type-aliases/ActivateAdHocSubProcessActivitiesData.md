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

Defined in: [gen/types.gen.ts:10229](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10229)

## Properties

### body

```ts
body: AdHocSubProcessActivateActivitiesInstruction;
```

Defined in: [gen/types.gen.ts:10230](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10230)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10231](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10231)

#### adHocSubProcessInstanceKey

```ts
adHocSubProcessInstanceKey: ElementInstanceKey;
```

The key of the ad-hoc sub-process instance that contains the activities.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:10237](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10237)

---

### url

```ts
url: "/element-instances/ad-hoc-activities/{adHocSubProcessInstanceKey}/activation";
```

Defined in: [gen/types.gen.ts:10238](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10238)
