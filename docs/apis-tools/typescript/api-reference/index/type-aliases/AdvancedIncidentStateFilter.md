---
title: "Type Alias: AdvancedIncidentStateFilter"
sidebar_label: "AdvancedIncidentStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedIncidentStateFilter

```ts
type AdvancedIncidentStateFilter = object;
```

Defined in: [gen/types.gen.ts:3113](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3113)

Advanced filter

Advanced IncidentStateEnum filter

## Properties

### $eq?

```ts
optional $eq: IncidentStateEnum;
```

Defined in: [gen/types.gen.ts:3117](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3117)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:3125](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3125)

Checks if the current property exists.

---

### $in?

```ts
optional $in: IncidentStateEnum[];
```

Defined in: [gen/types.gen.ts:3129](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3129)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:3134](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3134)

---

### $neq?

```ts
optional $neq: IncidentStateEnum;
```

Defined in: [gen/types.gen.ts:3121](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3121)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn: IncidentStateEnum[];
```

Defined in: [gen/types.gen.ts:3133](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L3133)

Checks if the property does not match any of the provided values.
