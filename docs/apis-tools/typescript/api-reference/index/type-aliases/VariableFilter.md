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

Defined in: [gen/types.gen.ts:8076](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8076)

Variable filter request.

## Properties

### isTruncated?

```ts
optional isTruncated?: boolean;
```

Defined in: [gen/types.gen.ts:8096](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8096)

Whether the value is truncated or not.

---

### name?

```ts
optional name?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:8080](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8080)

Name of the variable.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:8113](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8113)

The key of the process instance of this variable.

---

### scopeKey?

```ts
optional scopeKey?: ScopeKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:8109](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8109)

The key of the scope that defines where this variable is directly defined. This can be a
process instance key (for process-level variables) or an element instance key (for local
variables scoped to tasks, subprocesses, gateways, events, etc.). Use this filter to
find variables directly defined in specific scopes. Note that this does not include
variables from parent scopes that would be visible through the scope hierarchy.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Defined in: [gen/types.gen.ts:8092](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8092)

Tenant ID of this variable.

---

### value?

```ts
optional value?: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:8088](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8088)

The value of the variable.
Variable values in filters need to be in serialized JSON format. For example, a variable
with string value `myValue` can be found with the filter value `"myValue"`. Consider
appropriate escaping for special characters in JSON strings when constructing filter values.

---

### variableKey?

```ts
optional variableKey?: VariableKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:8100](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8100)

The key for this variable.
