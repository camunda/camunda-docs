---
title: "Type Alias: DecisionInstanceFilter"
sidebar_label: "DecisionInstanceFilter"
mdx:
  format: md
---

# Type Alias: DecisionInstanceFilter

```ts
type DecisionInstanceFilter = object;
```

Defined in: [gen/types.gen.ts:1714](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1714)

Decision instance search filter.

## Properties

### decisionDefinitionId?

```ts
optional decisionDefinitionId?: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:1734](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1734)

The ID of the DMN decision.

---

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey?: DecisionDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:1764](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1764)

The key of the decision.

---

### decisionDefinitionName?

```ts
optional decisionDefinitionName?: string;
```

Defined in: [gen/types.gen.ts:1738](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1738)

The name of the DMN decision.

---

### decisionDefinitionType?

```ts
optional decisionDefinitionType?: DecisionDefinitionTypeEnum;
```

Defined in: [gen/types.gen.ts:1743](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1743)

---

### decisionDefinitionVersion?

```ts
optional decisionDefinitionVersion?: number;
```

Defined in: [gen/types.gen.ts:1742](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1742)

The version of the decision.

---

### decisionEvaluationInstanceKey?

```ts
optional decisionEvaluationInstanceKey?: DecisionEvaluationInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:1718](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1718)

The key of the decision evaluation instance.

---

### decisionEvaluationKey?

```ts
optional decisionEvaluationKey?: DecisionEvaluationKey;
```

Defined in: [gen/types.gen.ts:1752](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1752)

The key of the parent decision evaluation. Note that this is not the identifier of an individual decision instance; the `decisionEvaluationInstanceKey` is the identifier for a decision instance.

---

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey?: DecisionRequirementsKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:1776](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1776)

The key of the decision requirements definition.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:1768](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1768)

The key of the element instance this decision instance is linked to.

---

### evaluationDate?

```ts
optional evaluationDate?: DateTimeFilterProperty;
```

Defined in: [gen/types.gen.ts:1730](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1730)

The evaluation date of the decision instance.

---

### evaluationFailure?

```ts
optional evaluationFailure?: string;
```

Defined in: [gen/types.gen.ts:1726](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1726)

The evaluation failure of the decision instance.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:1756](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1756)

The key of the process definition.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:1760](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1760)

The key of the process instance.

---

### rootDecisionDefinitionKey?

```ts
optional rootDecisionDefinitionKey?: DecisionDefinitionKeyFilterProperty;
```

Defined in: [gen/types.gen.ts:1772](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1772)

The key of the root decision definition.

---

### state?

```ts
optional state?: DecisionInstanceStateFilterProperty;
```

Defined in: [gen/types.gen.ts:1722](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1722)

The state of the decision instance.

---

### tenantId?

```ts
optional tenantId?: TenantId;
```

Defined in: [gen/types.gen.ts:1747](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L1747)

The tenant ID of the decision instance.
