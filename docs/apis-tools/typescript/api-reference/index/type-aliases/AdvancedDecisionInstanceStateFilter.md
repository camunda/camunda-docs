---
title: "Type Alias: AdvancedDecisionInstanceStateFilter"
sidebar_label: "AdvancedDecisionInstanceStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedDecisionInstanceStateFilter

```ts
type AdvancedDecisionInstanceStateFilter = object;
```

Defined in: [gen/types.gen.ts:1884](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1884)

Advanced filter

Advanced DecisionInstanceStateEnum filter.

## Properties

### $eq?

```ts
optional $eq: DecisionInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:1888](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1888)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:1896](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1896)

Checks if the current property exists.

---

### $in?

```ts
optional $in: DecisionInstanceStateEnum[];
```

Defined in: [gen/types.gen.ts:1900](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1900)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:1905](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1905)

---

### $neq?

```ts
optional $neq: DecisionInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:1892](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1892)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn: DecisionInstanceStateEnum[];
```

Defined in: [gen/types.gen.ts:1904](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1904)

Checks if the property matches none of the provided values.
