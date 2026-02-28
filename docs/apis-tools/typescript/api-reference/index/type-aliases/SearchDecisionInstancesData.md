---
title: "Type Alias: SearchDecisionInstancesData"
sidebar_label: "SearchDecisionInstancesData"
mdx:
  format: md
---

# Type Alias: SearchDecisionInstancesData

```ts
type SearchDecisionInstancesData = object;
```

Defined in: [gen/types.gen.ts:9365](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9365)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:9366](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9366)

#### Type Declaration

##### filter?

```ts
optional filter: object;
```

Decision instance search filter.

###### filter.decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

The ID of the DMN decision.

###### filter.decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKeyFilterProperty;
```

The key of the decision.

###### filter.decisionDefinitionName?

```ts
optional decisionDefinitionName: string;
```

The name of the DMN decision.

###### filter.decisionDefinitionType?

```ts
optional decisionDefinitionType: DecisionDefinitionTypeEnum;
```

###### filter.decisionDefinitionVersion?

```ts
optional decisionDefinitionVersion: number;
```

The version of the decision.

###### filter.decisionEvaluationInstanceKey?

```ts
optional decisionEvaluationInstanceKey: DecisionEvaluationInstanceKeyFilterProperty;
```

The key of the decision evaluation instance.

###### filter.decisionEvaluationKey?

```ts
optional decisionEvaluationKey: DecisionEvaluationKey;
```

The key of the parent decision evaluation. Note that this is not the identifier of an individual decision instance; the `decisionEvaluationInstanceKey` is the identifier for a decision instance.

###### filter.decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKeyFilterProperty;
```

The key of the decision requirements definition.

###### filter.elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKeyFilterProperty;
```

The key of the element instance this decision instance is linked to.

###### filter.evaluationDate?

```ts
optional evaluationDate: DateTimeFilterProperty;
```

The evaluation date of the decision instance.

###### filter.evaluationFailure?

```ts
optional evaluationFailure: string;
```

The evaluation failure of the decision instance.

###### filter.processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition.

###### filter.processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

The key of the process instance.

###### filter.rootDecisionDefinitionKey?

```ts
optional rootDecisionDefinitionKey: DecisionDefinitionKeyFilterProperty;
```

The key of the root decision definition.

###### filter.state?

```ts
optional state: DecisionInstanceStateFilterProperty;
```

The state of the decision instance.

###### filter.tenantId?

```ts
optional tenantId: TenantId;
```

The tenant ID of the decision instance.

##### sort?

```ts
optional sort: DecisionInstanceSearchQuerySortRequest[];
```

Sort field criteria.

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:9439](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9439)

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:9440](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9440)

---

### url

```ts
url: "/decision-instances/search";
```

Defined in: [gen/types.gen.ts:9441](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9441)
