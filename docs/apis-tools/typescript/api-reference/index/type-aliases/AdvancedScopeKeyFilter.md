---
title: "Type Alias: AdvancedScopeKeyFilter"
sidebar_label: "AdvancedScopeKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedScopeKeyFilter

```ts
type AdvancedScopeKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4278](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4278)

Advanced filter

Advanced ScopeKey filter.

## Properties

### $eq?

```ts
optional $eq: ScopeKey;
```

Defined in: [gen/types.gen.ts:4282](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4282)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4290](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4290)

Checks if the current property exists.

---

### $in?

```ts
optional $in: ScopeKey[];
```

Defined in: [gen/types.gen.ts:4294](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4294)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq: ScopeKey;
```

Defined in: [gen/types.gen.ts:4286](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4286)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn: ScopeKey[];
```

Defined in: [gen/types.gen.ts:4298](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4298)

Checks if the property matches none of the provided values.
