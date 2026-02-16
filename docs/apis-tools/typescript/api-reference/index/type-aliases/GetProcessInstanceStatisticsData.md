---
title: "Type Alias: GetProcessInstanceStatisticsData"
sidebar_label: "GetProcessInstanceStatisticsData"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceStatisticsData

```ts
type GetProcessInstanceStatisticsData = object;
```

Defined in: [gen/types.gen.ts:14352](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14352)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:14353](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14353)

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:14354](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14354)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The assigned key of the process instance, which acts as a unique identifier for this process instance.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:14360](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14360)

---

### url

```ts
url: "/process-instances/{processInstanceKey}/statistics/element-instances";
```

Defined in: [gen/types.gen.ts:14361](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L14361)
