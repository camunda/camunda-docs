---
title: "Type Alias: VariableResultBase"
sidebar_label: "VariableResultBase"
mdx:
  format: md
---

# Type Alias: VariableResultBase

```ts
type VariableResultBase = object;
```

Defined in: [gen/types.gen.ts:8124](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8124)

Variable response item.

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:8128](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8128)

Name of this variable.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:8148](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8148)

The key of the process instance of this variable.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:8155](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8155)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### scopeKey

```ts
scopeKey: ScopeKey;
```

Defined in: [gen/types.gen.ts:8144](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8144)

The key of the scope where this variable is directly defined. For process-level
variables, this is the process instance key. For local variables, this is the key of the
specific element instance (task, subprocess, gateway, event, etc.) where the variable is
directly defined.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:8132](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8132)

Tenant ID of this variable.

***

### variableKey

```ts
variableKey: VariableKey;
```

Defined in: [gen/types.gen.ts:8136](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8136)

The key for this variable.
