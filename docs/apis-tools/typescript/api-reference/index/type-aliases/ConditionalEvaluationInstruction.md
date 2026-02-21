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

Defined in: [gen/types.gen.ts:1338](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1338)

## Properties

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:1349](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1349)

Used to evaluate root-level conditional start events of the process definition with the given key.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1344](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1344)

Used to evaluate root-level conditional start events for a tenant with the given ID.
This will only evaluate root-level conditional start events of process definitions which belong to the tenant.

---

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:1354](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1354)

JSON object representing the variables to use for evaluation of the conditions and to pass to the process instances that have been triggered.

#### Index Signature

```ts
[key: string]: unknown
```
