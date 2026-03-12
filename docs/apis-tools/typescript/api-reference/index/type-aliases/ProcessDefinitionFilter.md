---
title: "Type Alias: ProcessDefinitionFilter"
sidebar_label: "ProcessDefinitionFilter"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionFilter

```ts
type ProcessDefinitionFilter = object;
```

Defined in: [gen/types.gen.ts:5751](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5751)

Process definition search filter.

## Properties

### hasStartForm?

```ts
optional hasStartForm: boolean;
```

Defined in: [gen/types.gen.ts:5791](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5791)

Indicates whether the start event of the process has an associated Form Key.

***

### isLatestVersion?

```ts
optional isLatestVersion: boolean;
```

Defined in: [gen/types.gen.ts:5763](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5763)

Whether to only return the latest version of each process definition.
When using this filter, pagination functionality is limited, you can only paginate forward using `after` and `limit`.
The response contains no `startCursor` in the `page`, and requests ignore the `from` and `before` in the `page`.
When using this filter, sorting is limited to `processDefinitionId` and `tenantId` fields only.

***

### name?

```ts
optional name: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5755](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5755)

Name of this process definition.

***

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5779](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5779)

Process definition ID of this process definition.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5787](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5787)

The key for this process definition.

***

### resourceName?

```ts
optional resourceName: string;
```

Defined in: [gen/types.gen.ts:5767](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5767)

Resource name of this process definition.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5783](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5783)

Tenant ID of this process definition.

***

### version?

```ts
optional version: number;
```

Defined in: [gen/types.gen.ts:5771](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5771)

Version of this process definition.

***

### versionTag?

```ts
optional versionTag: string;
```

Defined in: [gen/types.gen.ts:5775](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L5775)

Version tag of this process definition.
