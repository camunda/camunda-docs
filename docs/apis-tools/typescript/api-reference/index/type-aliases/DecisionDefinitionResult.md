---
title: "Type Alias: DecisionDefinitionResult"
sidebar_label: "DecisionDefinitionResult"
mdx:
  format: md
---

# Type Alias: DecisionDefinitionResult

```ts
type DecisionDefinitionResult = object;
```

Defined in: [gen/types.gen.ts:1475](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1475)

## Properties

### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1479](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1479)

The DMN ID of the decision definition.

---

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:1499](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1499)

The assigned key, which acts as a unique identifier for this decision definition.

---

### decisionRequirementsId?

```ts
optional decisionRequirementsId: string;
```

Defined in: [gen/types.gen.ts:1491](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1491)

the DMN ID of the decision requirements graph that the decision definition is part of.

---

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKey;
```

Defined in: [gen/types.gen.ts:1503](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1503)

The assigned key of the decision requirements graph that the decision definition is part of.

---

### decisionRequirementsName?

```ts
optional decisionRequirementsName: string;
```

Defined in: [gen/types.gen.ts:1507](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1507)

The DMN name of the decision requirements that the decision definition is part of.

---

### decisionRequirementsVersion?

```ts
optional decisionRequirementsVersion: number;
```

Defined in: [gen/types.gen.ts:1511](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1511)

The assigned version of the decision requirements that the decision definition is part of.

---

### name?

```ts
optional name: string;
```

Defined in: [gen/types.gen.ts:1483](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1483)

The DMN name of the decision definition.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:1495](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1495)

The tenant ID of the decision definition.

---

### version?

```ts
optional version: number;
```

Defined in: [gen/types.gen.ts:1487](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1487)

The assigned version of the decision definition.
