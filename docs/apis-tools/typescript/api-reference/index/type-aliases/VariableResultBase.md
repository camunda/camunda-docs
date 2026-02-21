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

Defined in: [gen/types.gen.ts:7337](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7337)

Variable response item.

## Properties

### name?

```ts
optional name: string;
```

Defined in: [gen/types.gen.ts:7341](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7341)

Name of this variable.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:7357](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7357)

The key of the process instance of this variable.

---

### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: RootProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:7358](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7358)

---

### scopeKey?

```ts
optional scopeKey: ScopeKey;
```

Defined in: [gen/types.gen.ts:7353](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7353)

The key of the scope of this variable.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:7345](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7345)

Tenant ID of this variable.

---

### variableKey?

```ts
optional variableKey: VariableKey;
```

Defined in: [gen/types.gen.ts:7349](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7349)

The key for this variable.
