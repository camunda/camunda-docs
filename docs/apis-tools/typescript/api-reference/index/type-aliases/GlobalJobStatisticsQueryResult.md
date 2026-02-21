---
title: "Type Alias: GlobalJobStatisticsQueryResult"
sidebar_label: "GlobalJobStatisticsQueryResult"
mdx:
  format: md
---

# Type Alias: GlobalJobStatisticsQueryResult

```ts
type GlobalJobStatisticsQueryResult = object;
```

Defined in: [gen/types.gen.ts:3314](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3314)

Global job statistics query result.

## Properties

### completed

```ts
completed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3316](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3316)

---

### created

```ts
created: StatusMetric;
```

Defined in: [gen/types.gen.ts:3315](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3315)

---

### failed

```ts
failed: StatusMetric;
```

Defined in: [gen/types.gen.ts:3317](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3317)

---

### isIncomplete

```ts
isIncomplete: boolean;
```

Defined in: [gen/types.gen.ts:3321](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3321)

True if some data is missing because internal limits were reached and some metrics were not recorded.
