---
title: "Type Alias: SearchVariablesData"
sidebar_label: "SearchVariablesData"
mdx:
  format: md
---

# Type Alias: SearchVariablesData

```ts
type SearchVariablesData = object;
```

Defined in: [gen/types.gen.ts:17552](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17552)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:17556](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17556)

Variable search query request.

#### Type Declaration

##### filter?

```ts
optional filter: object;
```

Variable filter request.

###### filter.isTruncated?

```ts
optional isTruncated: boolean;
```

Whether the value is truncated or not.

###### filter.name?

```ts
optional name: StringFilterProperty;
```

Name of the variable.

###### filter.processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKeyFilterProperty;
```

The key of the process instance of this variable.

###### filter.scopeKey?

```ts
optional scopeKey: ScopeKeyFilterProperty;
```

The key of the scope of this variable.

###### filter.tenantId?

```ts
optional tenantId: TenantId;
```

Tenant ID of this variable.

###### filter.value?

```ts
optional value: StringFilterProperty;
```

The value of the variable.

###### filter.variableKey?

```ts
optional variableKey: VariableKeyFilterProperty;
```

The key for this variable.

##### sort?

```ts
optional sort: object[];
```

Sort field criteria.

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:17601](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17601)

---

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:17602](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17602)

#### truncateValues?

```ts
optional truncateValues: boolean;
```

When true (default), long variable values in the response are truncated. When false, full variable values are returned.

---

### url

```ts
url: "/variables/search";
```

Defined in: [gen/types.gen.ts:17608](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L17608)
