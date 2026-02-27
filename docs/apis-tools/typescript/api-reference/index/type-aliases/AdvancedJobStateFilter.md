---
title: "Type Alias: AdvancedJobStateFilter"
sidebar_label: "AdvancedJobStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedJobStateFilter

```ts
type AdvancedJobStateFilter = object;
```

Defined in: [gen/types.gen.ts:3983](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3983)

Advanced filter

Advanced JobStateEnum filter.

## Properties

### $eq?

```ts
optional $eq: JobStateEnum;
```

Defined in: [gen/types.gen.ts:3987](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3987)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:3995](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3995)

Checks if the current property exists.

---

### $in?

```ts
optional $in: JobStateEnum[];
```

Defined in: [gen/types.gen.ts:3999](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3999)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:4000](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4000)

---

### $neq?

```ts
optional $neq: JobStateEnum;
```

Defined in: [gen/types.gen.ts:3991](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3991)

Checks for inequality with the provided value.
