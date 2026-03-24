---
title: "Type Alias: UserTaskAuditLogFilter"
sidebar_label: "UserTaskAuditLogFilter"
mdx:
  format: md
---

# Type Alias: UserTaskAuditLogFilter

```ts
type UserTaskAuditLogFilter = object;
```

Defined in: [gen/types.gen.ts:7107](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7107)

The user task audit log search filters.

## Properties

### actorId?

```ts
optional actorId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7127](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7127)

The actor ID search filter.

---

### actorType?

```ts
optional actorType: AuditLogActorTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:7123](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7123)

The actor type search filter.

---

### operationType?

```ts
optional operationType: OperationTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:7111](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7111)

The audit log operation type search filter.

---

### result?

```ts
optional result: AuditLogResultFilterProperty;
```

Defined in: [gen/types.gen.ts:7115](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7115)

The audit log result search filter.

---

### timestamp?

```ts
optional timestamp: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7119](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7119)

The audit log timestamp filter.
