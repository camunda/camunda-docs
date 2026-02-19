---
title: "Type Alias: AdvancedElementInstanceStateFilter"
sidebar_label: "AdvancedElementInstanceStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedElementInstanceStateFilter

```ts
type AdvancedElementInstanceStateFilter = object;
```

Defined in: [gen/types.gen.ts:2471](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2471)

Advanced filter

Advanced ElementInstanceStateEnum filter.

## Properties

### $eq?

```ts
optional $eq: ElementInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:2475](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2475)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:2483](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2483)

Checks if the current property exists.

---

### $in?

```ts
optional $in: ElementInstanceStateEnum[];
```

Defined in: [gen/types.gen.ts:2487](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2487)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:2488](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2488)

---

### $neq?

```ts
optional $neq: ElementInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:2479](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2479)

Checks for inequality with the provided value.
