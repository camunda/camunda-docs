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

Defined in: [gen/types.gen.ts:7269](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7269)

Variable filter request.

## Properties

### isTruncated?

```ts
optional isTruncated: boolean;
```

Defined in: [gen/types.gen.ts:7285](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7285)

Whether the value is truncated or not.

---

### name?

```ts
optional name: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7273](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7273)

Name of the variable.

---

### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:7297](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7297)

The key of the process instance of this variable.

---

### scopeKey?

```ts
optional scopeKey: ScopeKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:7293](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7293)

The key of the scope of this variable.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:7281](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7281)

Tenant ID of this variable.

---

### value?

```ts
optional value: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:7277](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7277)

The value of the variable.

---

### variableKey?

```ts
optional variableKey: VariableKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:7289](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7289)

The key for this variable.
