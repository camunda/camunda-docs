---
title: "Type Alias: BasicStringFilter"
sidebar_label: "BasicStringFilter"
mdx:
  format: md
---

# Type Alias: BasicStringFilter

```ts
type BasicStringFilter = object;
```

Defined in: [gen/types.gen.ts:2627](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2627)

Advanced filter

Basic advanced string filter.

## Properties

### $eq?

```ts
optional $eq: string;
```

Defined in: [gen/types.gen.ts:2631](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2631)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:2639](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2639)

Checks if the current property exists.

---

### $in?

```ts
optional $in: string[];
```

Defined in: [gen/types.gen.ts:2643](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2643)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq: string;
```

Defined in: [gen/types.gen.ts:2635](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2635)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn: string[];
```

Defined in: [gen/types.gen.ts:2647](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2647)

Checks if the property matches none of the provided values.
