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

Defined in: [gen/types.gen.ts:8010](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8010)

Variable response item.

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:8014](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8014)

Name of this variable.

***

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:8034](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8034)

The key of the process instance of this variable.

***

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Defined in: [gen/types.gen.ts:8041](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8041)

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

***

### scopeKey

```ts
scopeKey: ScopeKey;
```

Defined in: [gen/types.gen.ts:8030](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8030)

The key of the scope where this variable is directly defined. For process-level
variables, this is the process instance key. For local variables, this is the key of the
specific element instance (task, subprocess, gateway, event, etc.) where the variable is
directly defined.

***

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:8018](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8018)

Tenant ID of this variable.

***

### variableKey

```ts
variableKey: VariableKey;
```

Defined in: [gen/types.gen.ts:8022](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8022)

The key for this variable.
