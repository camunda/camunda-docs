---
title: "Type Alias: DecisionDefinitionFilter"
sidebar_label: "DecisionDefinitionFilter"
mdx:
  format: md
---

# Type Alias: DecisionDefinitionFilter

```ts
type DecisionDefinitionFilter = object;
```

Defined in: [gen/types.gen.ts:1455](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1455)

Decision definition search filter.

## Properties

### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1459](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1459)

The DMN ID of the decision definition.

***

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1486](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1486)

The assigned key, which acts as a unique identifier for this decision definition.

***

### decisionRequirementsId?

```ts
optional decisionRequirementsId: string;
```

Defined in: [gen/types.gen.ts:1478](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1478)

the DMN ID of the decision requirements graph that the decision definition is part of.

***

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKey;
```

Defined in: [gen/types.gen.ts:1490](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1490)

The assigned key of the decision requirements graph that the decision definition is part of.

***

### decisionRequirementsName?

```ts
optional decisionRequirementsName: string;
```

Defined in: [gen/types.gen.ts:1494](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1494)

The DMN name of the decision requirements that the decision definition is part of.

***

### decisionRequirementsVersion?

```ts
optional decisionRequirementsVersion: number;
```

Defined in: [gen/types.gen.ts:1498](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1498)

The assigned version of the decision requirements that the decision definition is part of.

***

### isLatestVersion?

```ts
optional isLatestVersion: boolean;
```

Defined in: [gen/types.gen.ts:1470](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1470)

Whether to only return the latest version of each decision definition.
When using this filter, pagination functionality is limited, you can only paginate forward using `after` and `limit`.
The response contains no `startCursor` in the `page`, and requests ignore the `from` and `before` in the `page`.

***

### name?

```ts
optional name: string;
```

Defined in: [gen/types.gen.ts:1463](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1463)

The DMN name of the decision definition.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1482](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1482)

The tenant ID of the decision definition.

***

### version?

```ts
optional version: number;
```

Defined in: [gen/types.gen.ts:1474](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1474)

The assigned version of the decision definition.
