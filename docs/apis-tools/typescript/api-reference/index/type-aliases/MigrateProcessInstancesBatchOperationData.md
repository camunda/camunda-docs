---
title: "Type Alias: MigrateProcessInstancesBatchOperationData"
sidebar_label: "MigrateProcessInstancesBatchOperationData"
mdx:
  format: md
---

# Type Alias: MigrateProcessInstancesBatchOperationData

```ts
type MigrateProcessInstancesBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:13522](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13522)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:13523](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13523)

#### filter

```ts
filter: ProcessInstanceFilter;
```

The process instance filter.

#### migrationPlan

```ts
migrationPlan: ProcessInstanceMigrationBatchOperationPlan;
```

The migration plan.

#### operationReference?

```ts
optional operationReference: OperationReference;
```

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:13534](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13534)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13535](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13535)

---

### url

```ts
url: "/process-instances/migration";
```

Defined in: [gen/types.gen.ts:13536](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L13536)
