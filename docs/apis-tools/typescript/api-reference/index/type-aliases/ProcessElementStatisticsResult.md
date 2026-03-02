---
title: "Type Alias: ProcessElementStatisticsResult"
sidebar_label: "ProcessElementStatisticsResult"
mdx:
  format: md
---

# Type Alias: ProcessElementStatisticsResult

```ts
type ProcessElementStatisticsResult = object;
```

Defined in: [gen/types.gen.ts:5206](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5206)

Process element statistics response.

## Properties

### active?

```ts
optional active: number;
```

Defined in: [gen/types.gen.ts:5214](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5214)

The total number of active instances of the element.

---

### canceled?

```ts
optional canceled: number;
```

Defined in: [gen/types.gen.ts:5218](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5218)

The total number of canceled instances of the element.

---

### completed?

```ts
optional completed: number;
```

Defined in: [gen/types.gen.ts:5226](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5226)

The total number of completed instances of the element.

---

### elementId?

```ts
optional elementId: ElementId;
```

Defined in: [gen/types.gen.ts:5210](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5210)

The element ID for which the results are aggregated.

---

### incidents?

```ts
optional incidents: number;
```

Defined in: [gen/types.gen.ts:5222](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5222)

The total number of incidents for the element.
