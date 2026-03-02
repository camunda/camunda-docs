---
title: "Type Alias: AdvancedBatchOperationStateFilter"
sidebar_label: "AdvancedBatchOperationStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedBatchOperationStateFilter

```ts
type AdvancedBatchOperationStateFilter = object;
```

Defined in: [gen/types.gen.ts:1051](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1051)

Advanced filter

Advanced BatchOperationStateEnum filter.

## Properties

### $eq?

```ts
optional $eq: BatchOperationStateEnum;
```

Defined in: [gen/types.gen.ts:1055](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1055)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:1063](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1063)

Checks if the current property exists.

---

### $in?

```ts
optional $in: BatchOperationStateEnum[];
```

Defined in: [gen/types.gen.ts:1067](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1067)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:1068](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1068)

---

### $neq?

```ts
optional $neq: BatchOperationStateEnum;
```

Defined in: [gen/types.gen.ts:1059](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1059)

Checks for inequality with the provided value.
