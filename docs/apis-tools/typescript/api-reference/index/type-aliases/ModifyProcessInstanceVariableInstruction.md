---
title: "Type Alias: ModifyProcessInstanceVariableInstruction"
sidebar_label: "ModifyProcessInstanceVariableInstruction"
mdx:
  format: md
---

# Type Alias: ModifyProcessInstanceVariableInstruction

```ts
type ModifyProcessInstanceVariableInstruction = object;
```

Defined in: [gen/types.gen.ts:5993](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5993)

Instruction describing which variables to create or update.

## Properties

### scopeId?

```ts
optional scopeId: string;
```

Defined in: [gen/types.gen.ts:6007](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6007)

The id of the element in which scope the variables should be created.
Leave empty to create the variables in the global scope of the process instance.

---

### variables

```ts
variables: object;
```

Defined in: [gen/types.gen.ts:5999](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L5999)

JSON document that will instantiate the variables at the scope defined by the scopeId.
It must be a JSON object, as variables will be mapped in a key-value fashion.

#### Index Signature

```ts
[key: string]: unknown
```
