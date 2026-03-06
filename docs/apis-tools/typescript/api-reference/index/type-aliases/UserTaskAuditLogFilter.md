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

Defined in: [gen/types.gen.ts:7771](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7771)

The user task audit log search filters.

## Properties

### actorId?

```ts
optional actorId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7791](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7791)

The actor ID search filter.

***

### actorType?

```ts
optional actorType: AuditLogActorTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:7787](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7787)

The actor type search filter.

***

### operationType?

```ts
optional operationType: OperationTypeFilterProperty;
```

Defined in: [gen/types.gen.ts:7775](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7775)

The audit log operation type search filter.

***

### result?

```ts
optional result: AuditLogResultFilterProperty;
```

Defined in: [gen/types.gen.ts:7779](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7779)

The audit log result search filter.

***

### timestamp?

```ts
optional timestamp: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:7783](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7783)

The audit log timestamp filter.
