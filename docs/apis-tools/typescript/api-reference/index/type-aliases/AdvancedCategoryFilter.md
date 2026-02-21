---
title: "Type Alias: AdvancedCategoryFilter"
sidebar_label: "AdvancedCategoryFilter"
mdx:
  format: md
---

# Type Alias: AdvancedCategoryFilter

```ts
type AdvancedCategoryFilter = object;
```

Defined in: [gen/types.gen.ts:408](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L408)

Advanced filter

Advanced AuditLogCategoryEnum filter.

## Properties

### $eq?

```ts
optional $eq: AuditLogCategoryEnum;
```

Defined in: [gen/types.gen.ts:412](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L412)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:420](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L420)

Checks if the current property exists.

---

### $in?

```ts
optional $in: AuditLogCategoryEnum[];
```

Defined in: [gen/types.gen.ts:424](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L424)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:425](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L425)

---

### $neq?

```ts
optional $neq: AuditLogCategoryEnum;
```

Defined in: [gen/types.gen.ts:416](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L416)

Checks for inequality with the provided value.
