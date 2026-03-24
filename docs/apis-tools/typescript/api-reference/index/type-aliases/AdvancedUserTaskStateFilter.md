---
title: "Type Alias: AdvancedUserTaskStateFilter"
sidebar_label: "AdvancedUserTaskStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedUserTaskStateFilter

```ts
type AdvancedUserTaskStateFilter = object;
```

Defined in: [gen/types.gen.ts:7084](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7084)

Advanced filter

Advanced UserTaskStateEnum filter.

## Properties

### $eq?

```ts
optional $eq: UserTaskStateEnum;
```

Defined in: [gen/types.gen.ts:7088](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7088)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:7096](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7096)

Checks if the current property exists.

---

### $in?

```ts
optional $in: UserTaskStateEnum[];
```

Defined in: [gen/types.gen.ts:7100](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7100)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:7101](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7101)

---

### $neq?

```ts
optional $neq: UserTaskStateEnum;
```

Defined in: [gen/types.gen.ts:7092](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7092)

Checks for inequality with the provided value.
