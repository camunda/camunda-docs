---
title: "Type Alias: AdvancedProcessInstanceStateFilter"
sidebar_label: "AdvancedProcessInstanceStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProcessInstanceStateFilter

```ts
type AdvancedProcessInstanceStateFilter = object;
```

Defined in: [gen/types.gen.ts:6165](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6165)

Advanced filter

Advanced ProcessInstanceStateEnum filter.

## Properties

### $eq?

```ts
optional $eq: ProcessInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:6169](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6169)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:6177](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6177)

Checks if the current property exists.

---

### $in?

```ts
optional $in: ProcessInstanceStateEnum[];
```

Defined in: [gen/types.gen.ts:6181](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6181)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:6182](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6182)

---

### $neq?

```ts
optional $neq: ProcessInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:6173](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6173)

Checks for inequality with the provided value.
