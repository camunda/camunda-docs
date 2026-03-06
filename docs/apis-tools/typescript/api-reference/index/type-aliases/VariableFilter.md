---
title: "Type Alias: VariableFilter"
sidebar_label: "VariableFilter"
mdx:
  format: md
---

# Type Alias: VariableFilter

```ts
type VariableFilter = object;
```

Defined in: [gen/types.gen.ts:7933](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7933)

Variable filter request.

## Properties

### isTruncated?

```ts
optional isTruncated: boolean;
```

Defined in: [gen/types.gen.ts:7953](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7953)

Whether the value is truncated or not.

***

### name?

```ts
optional name: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7937](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7937)

Name of the variable.

***

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:7970](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7970)

The key of the process instance of this variable.

***

### scopeKey?

```ts
optional scopeKey: ScopeKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:7966](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7966)

The key of the scope that defines where this variable is directly defined. This can be a
process instance key (for process-level variables) or an element instance key (for local
variables scoped to tasks, subprocesses, gateways, events, etc.). Use this filter to
find variables directly defined in specific scopes. Note that this does not include
variables from parent scopes that would be visible through the scope hierarchy.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:7949](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7949)

Tenant ID of this variable.

***

### value?

```ts
optional value: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7945](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7945)

The value of the variable.
Variable values in filters need to be in serialized JSON format. For example, a variable
with string value `myValue` can be found with the filter value `"myValue"`. Consider
appropriate escaping for special characters in JSON strings when constructing filter values.

***

### variableKey?

```ts
optional variableKey: VariableKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:7957](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7957)

The key for this variable.
