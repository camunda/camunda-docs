---
title: "Type Alias: GetVariableResponses"
sidebar_label: "GetVariableResponses"
mdx:
  format: md
---

# Type Alias: GetVariableResponses

```ts
type GetVariableResponses = object;
```

Defined in: [gen/types.gen.ts:17714](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17714)

## Properties

### 200

```ts
200: object & object;
```

Defined in: [gen/types.gen.ts:17718](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17718)

Variable search response item.

#### Type Declaration

##### name?

```ts
optional name: string;
```

Name of this variable.

##### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

The key of the process instance of this variable.

##### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: ProcessInstanceKey;
```

##### scopeKey?

```ts
optional scopeKey: ScopeKey;
```

The key of the scope of this variable.

##### tenantId?

```ts
optional tenantId: TenantId;
```

Tenant ID of this variable.

##### variableKey?

```ts
optional variableKey: VariableKey;
```

The key for this variable.

#### Type Declaration

##### value?

```ts
optional value: string;
```

Full value of this variable.
