---
title: "Type Alias: DeleteDecisionInstancesBatchOperationData"
sidebar_label: "DeleteDecisionInstancesBatchOperationData"
mdx:
  format: md
---

# Type Alias: DeleteDecisionInstancesBatchOperationData

```ts
type DeleteDecisionInstancesBatchOperationData = object;
```

Defined in: [gen/types.gen.ts:9698](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9698)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:9702](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9702)

The decision instance filter that defines which decision instances should be deleted.

#### filter

```ts
filter: object;
```

Decision instance search filter.

##### filter.decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

The ID of the DMN decision.

##### filter.decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKeyFilterProperty;
```

The key of the decision.

##### filter.decisionDefinitionName?

```ts
optional decisionDefinitionName: string;
```

The name of the DMN decision.

##### filter.decisionDefinitionType?

```ts
optional decisionDefinitionType: DecisionDefinitionTypeEnum;
```

##### filter.decisionDefinitionVersion?

```ts
optional decisionDefinitionVersion: number;
```

The version of the decision.

##### filter.decisionEvaluationInstanceKey?

```ts
optional decisionEvaluationInstanceKey: DecisionEvaluationInstanceKeyFilterProperty;
```

The key of the decision evaluation instance.

##### filter.decisionEvaluationKey?

```ts
optional decisionEvaluationKey: DecisionEvaluationKey;
```

The key of the parent decision evaluation. Note that this is not the identifier of an individual decision instance; the `decisionEvaluationInstanceKey` is the identifier for a decision instance.

##### filter.decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKeyFilterProperty;
```

The key of the decision requirements definition.

##### filter.elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

The key of the element instance this decision instance is linked to.

##### filter.evaluationDate?

```ts
optional evaluationDate: DateTimeFilterProperty;
```

The evaluation date of the decision instance.

##### filter.evaluationFailure?

```ts
optional evaluationFailure: string;
```

The evaluation failure of the decision instance.

##### filter.processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition.

##### filter.processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

The key of the process instance.

##### filter.rootDecisionDefinitionKey?

```ts
optional rootDecisionDefinitionKey: DecisionDefinitionKeyFilterProperty;
```

The key of the root decision definition.

##### filter.state?

```ts
optional state: DecisionInstanceStateFilterProperty;
```

The state of the decision instance.

##### filter.tenantId?

```ts
optional tenantId: TenantId;
```

The tenant ID of the decision instance.

#### operationReference?

```ts
optional operationReference: OperationReference;
```

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:9772](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9772)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:9773](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9773)

---

### url

```ts
url: "/decision-instances/deletion";
```

Defined in: [gen/types.gen.ts:9774](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9774)
