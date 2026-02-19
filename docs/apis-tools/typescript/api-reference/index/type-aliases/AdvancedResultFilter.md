---
title: "Type Alias: AdvancedResultFilter"
sidebar_label: "AdvancedResultFilter"
mdx:
  format: md
---

# Type Alias: AdvancedResultFilter

```ts
type AdvancedResultFilter = object;
```

Defined in: [gen/types.gen.ts:438](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L438)

Advanced filter

Advanced AuditLogResultEnum filter.

## Properties

### $eq?

```ts
optional $eq: AuditLogResultEnum;
```

Defined in: [gen/types.gen.ts:442](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L442)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:450](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L450)

Checks if the current property exists.

---

### $in?

```ts
optional $in: AuditLogResultEnum[];
```

Defined in: [gen/types.gen.ts:454](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L454)

Checks if the property matches any of the provided values.

---

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:455](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L455)

---

### $neq?

```ts
optional $neq: AuditLogResultEnum;
```

Defined in: [gen/types.gen.ts:446](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L446)

Checks for inequality with the provided value.
