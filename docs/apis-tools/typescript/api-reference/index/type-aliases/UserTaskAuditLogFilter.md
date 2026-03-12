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

Defined in: [gen/types.gen.ts:7885](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7885)

The user task audit log search filters.

## Properties

### actorId?

```ts
optional actorId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7905](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7905)

The actor ID search filter.

***

### actorType?

```ts
optional actorType: AuditLogActorTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:7901](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7901)

The actor type search filter.

***

### operationType?

```ts
optional operationType: OperationTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:7889](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7889)

The audit log operation type search filter.

***

### result?

```ts
optional result: AuditLogResultFilterProperty;
```

Defined in: [gen/types.gen.ts:7893](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7893)

The audit log result search filter.

***

### timestamp?

```ts
optional timestamp: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7897](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7897)

The audit log timestamp filter.
