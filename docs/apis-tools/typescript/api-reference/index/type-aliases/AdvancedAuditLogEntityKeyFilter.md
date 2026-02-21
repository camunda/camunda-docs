---
title: "Type Alias: AdvancedAuditLogEntityKeyFilter"
sidebar_label: "AdvancedAuditLogEntityKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedAuditLogEntityKeyFilter

```ts
type AdvancedAuditLogEntityKeyFilter = object;
```

Defined in: [gen/types.gen.ts:315](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L315)

Advanced filter

Advanced entityKey filter.

## Properties

### $eq?

```ts
optional $eq: AuditLogEntityKey;
```

Defined in: [gen/types.gen.ts:319](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L319)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:327](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L327)

Checks if the current property exists.

---

### $in?

```ts
optional $in: AuditLogEntityKey[];
```

Defined in: [gen/types.gen.ts:331](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L331)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq: AuditLogEntityKey;
```

Defined in: [gen/types.gen.ts:323](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L323)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn: AuditLogEntityKey[];
```

Defined in: [gen/types.gen.ts:335](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L335)

Checks if the property matches none of the provided values.
