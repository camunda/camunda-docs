---
title: "Type Alias: AdvancedIntegerFilter"
sidebar_label: "AdvancedIntegerFilter"
mdx:
  format: md
---

# Type Alias: AdvancedIntegerFilter

```ts
type AdvancedIntegerFilter = object;
```

Defined in: [gen/types.gen.ts:2674](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2674)

Advanced filter

Advanced integer (int32) filter.

## Properties

### $eq?

```ts
optional $eq: number;
```

Defined in: [gen/types.gen.ts:2678](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2678)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:2686](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2686)

Checks if the current property exists.

---

### $gt?

```ts
optional $gt: number;
```

Defined in: [gen/types.gen.ts:2690](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2690)

Greater than comparison with the provided value.

---

### $gte?

```ts
optional $gte: number;
```

Defined in: [gen/types.gen.ts:2694](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2694)

Greater than or equal comparison with the provided value.

---

### $in?

```ts
optional $in: number[];
```

Defined in: [gen/types.gen.ts:2706](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2706)

Checks if the property matches any of the provided values.

---

### $lt?

```ts
optional $lt: number;
```

Defined in: [gen/types.gen.ts:2698](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2698)

Lower than comparison with the provided value.

---

### $lte?

```ts
optional $lte: number;
```

Defined in: [gen/types.gen.ts:2702](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2702)

Lower than or equal comparison with the provided value.

---

### $neq?

```ts
optional $neq: number;
```

Defined in: [gen/types.gen.ts:2682](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2682)

Checks for inequality with the provided value.
