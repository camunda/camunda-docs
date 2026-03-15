---
title: "Type Alias: ConditionalEvaluationInstruction"
sidebar_label: "ConditionalEvaluationInstruction"
mdx:
  format: md
---

# Type Alias: ConditionalEvaluationInstruction

```ts
type ConditionalEvaluationInstruction = object;
```

Defined in: [gen/types.gen.ts:1373](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1373)

## Properties

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:1384](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1384)

Used to evaluate root-level conditional start events of the process definition with the given key.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1379](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1379)

Used to evaluate root-level conditional start events for a tenant with the given ID.
This will only evaluate root-level conditional start events of process definitions which belong to the tenant.

***

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:1389](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1389)

JSON object representing the variables to use for evaluation of the conditions and to pass to the process instances that have been triggered.

#### Index Signature

```ts
[key: string]: unknown
```
