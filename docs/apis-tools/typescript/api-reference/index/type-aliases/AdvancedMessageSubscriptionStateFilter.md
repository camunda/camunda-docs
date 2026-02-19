---
title: "Type Alias: AdvancedMessageSubscriptionStateFilter"
sidebar_label: "AdvancedMessageSubscriptionStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedMessageSubscriptionStateFilter

```ts
type AdvancedMessageSubscriptionStateFilter = object;
```

Defined in: [gen/types.gen.ts:4987](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4987)

Advanced filter

Advanced MessageSubscriptionStateEnum filter

## Properties

### $eq?

```ts
optional $eq: MessageSubscriptionStateEnum;
```

Defined in: [gen/types.gen.ts:4991](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4991)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4999](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4999)

Checks if the current property exists.

---

### $in?

```ts
optional $in: MessageSubscriptionStateEnum[];
```

Defined in: [gen/types.gen.ts:5003](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5003)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:5004](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5004)

---

### $neq?

```ts
optional $neq: MessageSubscriptionStateEnum;
```

Defined in: [gen/types.gen.ts:4995](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4995)

Checks for inequality with the provided value.
