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

Defined in: [gen/types.gen.ts:1422](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1422)

Decision definition search filter.

## Properties

### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1426](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1426)

The DMN ID of the decision definition.

---

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1453](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1453)

The assigned key, which acts as a unique identifier for this decision definition.

---

### decisionRequirementsId?

```ts
optional decisionRequirementsId: string;
```

Defined in: [gen/types.gen.ts:1445](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1445)

the DMN ID of the decision requirements graph that the decision definition is part of.

---

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKey;
```

Defined in: [gen/types.gen.ts:1457](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1457)

The assigned key of the decision requirements graph that the decision definition is part of.

---

### decisionRequirementsName?

```ts
optional decisionRequirementsName: string;
```

Defined in: [gen/types.gen.ts:1461](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1461)

The DMN name of the decision requirements that the decision definition is part of.

---

### decisionRequirementsVersion?

```ts
optional decisionRequirementsVersion: number;
```

Defined in: [gen/types.gen.ts:1465](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1465)

The assigned version of the decision requirements that the decision definition is part of.

---

### isLatestVersion?

```ts
optional isLatestVersion: boolean;
```

Defined in: [gen/types.gen.ts:1437](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1437)

Whether to only return the latest version of each decision definition.
When using this filter, pagination functionality is limited, you can only paginate forward using `after` and `limit`.
The response contains no `startCursor` in the `page`, and requests ignore the `from` and `before` in the `page`.

---

### name?

```ts
optional name: string;
```

Defined in: [gen/types.gen.ts:1430](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1430)

The DMN name of the decision definition.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1449](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1449)

The tenant ID of the decision definition.

---

### version?

```ts
optional version: number;
```

Defined in: [gen/types.gen.ts:1441](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1441)

The assigned version of the decision definition.
