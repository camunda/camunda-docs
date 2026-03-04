---
title: "Type Alias: AdvancedJobKeyFilter"
sidebar_label: "AdvancedJobKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedJobKeyFilter

```ts
type AdvancedJobKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4212](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4212)

Advanced filter

Advanced JobKey filter.

## Properties

### $eq?

```ts
optional $eq: JobKey;
```

Defined in: [gen/types.gen.ts:4216](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4216)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4224](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4224)

Checks if the current property exists.

---

### $in?

```ts
optional $in: JobKey[];
```

Defined in: [gen/types.gen.ts:4228](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4228)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq: JobKey;
```

Defined in: [gen/types.gen.ts:4220](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4220)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn: JobKey[];
```

Defined in: [gen/types.gen.ts:4232](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4232)

Checks if the property matches none of the provided values.
