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

Defined in: [gen/types.gen.ts:5681](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5681)

Process definition search filter.

## Properties

### hasStartForm?

```ts
optional hasStartForm: boolean;
```

Defined in: [gen/types.gen.ts:5720](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5720)

Indicates whether the start event of the process has an associated Form Key.

***

### isLatestVersion?

```ts
optional isLatestVersion: boolean;
```

Defined in: [gen/types.gen.ts:5692](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5692)

Whether to only return the latest version of each process definition.
When using this filter, pagination functionality is limited, you can only paginate forward using `after` and `limit`.
The response contains no `startCursor` in the `page`, and requests ignore the `from` and `before` in the `page`.

***

### name?

```ts
optional name: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5685](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5685)

Name of this process definition.

***

### processDefinitionId?

```ts
optional processDefinitionId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:5708](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5708)

Process definition ID of this process definition.

***

### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:5716](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5716)

The key for this process definition.

***

### resourceName?

```ts
optional resourceName: string;
```

Defined in: [gen/types.gen.ts:5696](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5696)

Resource name of this process definition.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:5712](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5712)

Tenant ID of this process definition.

***

### version?

```ts
optional version: number;
```

Defined in: [gen/types.gen.ts:5700](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5700)

Version of this process definition.

***

### versionTag?

```ts
optional versionTag: string;
```

Defined in: [gen/types.gen.ts:5704](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5704)

Version tag of this process definition.
