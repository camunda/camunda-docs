---
title: "Type Alias: MigrateProcessInstanceData"
sidebar_label: "MigrateProcessInstanceData"
mdx:
  format: md
---

# Type Alias: MigrateProcessInstanceData

```ts
type MigrateProcessInstanceData = object;
```

Defined in: [gen/types.gen.ts:13309](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13309)

## Properties

### body

```ts
body: ProcessInstanceMigrationInstruction;
```

Defined in: [gen/types.gen.ts:13310](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13310)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:13311](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13311)

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance that should be migrated.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:13317](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13317)

***

### url

```ts
url: "/process-instances/{processInstanceKey}/migration";
```

Defined in: [gen/types.gen.ts:13318](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13318)
