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

Defined in: [gen/types.gen.ts:7914](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7914)

The user task audit log search filters.

## Properties

### actorId?

```ts
optional actorId?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7934](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7934)

The actor ID search filter.

---

### actorType?

```ts
optional actorType?: AuditLogActorTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:7930](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7930)

The actor type search filter.

---

### operationType?

```ts
optional operationType?: OperationTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:7918](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7918)

The audit log operation type search filter.

---

### result?

```ts
optional result?: AuditLogResultFilterProperty;
```

Defined in: [gen/types.gen.ts:7922](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7922)

The audit log result search filter.

---

### timestamp?

```ts
optional timestamp?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7926](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7926)

The audit log timestamp filter.
