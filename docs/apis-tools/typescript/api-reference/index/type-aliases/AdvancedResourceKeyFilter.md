---
title: "Type Alias: AdvancedResourceKeyFilter"
sidebar_label: "AdvancedResourceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedResourceKeyFilter

```ts
type AdvancedResourceKeyFilter = object;
```

Defined in: [gen/types.gen.ts:2246](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2246)

Advanced filter

Advanced ResourceKey filter.

## Properties

### $eq?

```ts
optional $eq: ResourceKey;
```

Defined in: [gen/types.gen.ts:2250](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2250)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:2258](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2258)

Checks if the current property exists.

---

### $in?

```ts
optional $in: ResourceKey[];
```

Defined in: [gen/types.gen.ts:2262](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2262)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq: ResourceKey;
```

Defined in: [gen/types.gen.ts:2254](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2254)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn: ResourceKey[];
```

Defined in: [gen/types.gen.ts:2266](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2266)

Checks if the property matches none of the provided values.
