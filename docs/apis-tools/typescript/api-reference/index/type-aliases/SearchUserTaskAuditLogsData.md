---
title: "Type Alias: SearchUserTaskAuditLogsData"
sidebar_label: "SearchUserTaskAuditLogsData"
mdx:
  format: md
---

# Type Alias: SearchUserTaskAuditLogsData

```ts
type SearchUserTaskAuditLogsData = object;
```

Defined in: [gen/types.gen.ts:16011](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16011)

## Properties

### body?

```ts
optional body: UserTaskAuditLogSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:16012](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16012)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:16013](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16013)

#### userTaskKey

```ts
userTaskKey: UserTaskKey;
```

The key of the user task.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:16019](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16019)

***

### url

```ts
url: "/user-tasks/{userTaskKey}/audit-logs/search";
```

Defined in: [gen/types.gen.ts:16020](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L16020)
