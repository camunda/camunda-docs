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

Defined in: [gen/types.gen.ts:1457](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1457)

Decision definition search filter.

## Properties

### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1461](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1461)

The DMN ID of the decision definition.

***

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1488](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1488)

The assigned key, which acts as a unique identifier for this decision definition.

***

### decisionRequirementsId?

```ts
optional decisionRequirementsId: string;
```

Defined in: [gen/types.gen.ts:1480](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1480)

the DMN ID of the decision requirements graph that the decision definition is part of.

***

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKey;
```

Defined in: [gen/types.gen.ts:1492](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1492)

The assigned key of the decision requirements graph that the decision definition is part of.

***

### decisionRequirementsName?

```ts
optional decisionRequirementsName: string;
```

Defined in: [gen/types.gen.ts:1496](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1496)

The DMN name of the decision requirements that the decision definition is part of.

***

### decisionRequirementsVersion?

```ts
optional decisionRequirementsVersion: number;
```

Defined in: [gen/types.gen.ts:1500](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1500)

The assigned version of the decision requirements that the decision definition is part of.

***

### isLatestVersion?

```ts
optional isLatestVersion: boolean;
```

Defined in: [gen/types.gen.ts:1472](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1472)

Whether to only return the latest version of each decision definition.
When using this filter, pagination functionality is limited, you can only paginate forward using `after` and `limit`.
The response contains no `startCursor` in the `page`, and requests ignore the `from` and `before` in the `page`.

***

### name?

```ts
optional name: string;
```

Defined in: [gen/types.gen.ts:1465](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1465)

The DMN name of the decision definition.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1484](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1484)

The tenant ID of the decision definition.

***

### version?

```ts
optional version: number;
```

Defined in: [gen/types.gen.ts:1476](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1476)

The assigned version of the decision definition.
