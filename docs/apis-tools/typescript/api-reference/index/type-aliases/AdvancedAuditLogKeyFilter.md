---
title: "Type Alias: AdvancedAuditLogKeyFilter"
sidebar_label: "AdvancedAuditLogKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedAuditLogKeyFilter

```ts
type AdvancedAuditLogKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4377](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4377)

Advanced filter

Advanced AuditLogKey filter.

## Properties

### $eq?

```ts
optional $eq: AuditLogKey;
```

Defined in: [gen/types.gen.ts:4381](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4381)

Checks for equality with the provided value.

---

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4389](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4389)

Checks if the current property exists.

---

### $in?

```ts
optional $in: AuditLogKey[];
```

Defined in: [gen/types.gen.ts:4393](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4393)

Checks if the property matches any of the provided values.

---

### $neq?

```ts
optional $neq: AuditLogKey;
```

Defined in: [gen/types.gen.ts:4385](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4385)

Checks for inequality with the provided value.

---

### $notIn?

```ts
optional $notIn: AuditLogKey[];
```

Defined in: [gen/types.gen.ts:4397](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L4397)

Checks if the property matches none of the provided values.
