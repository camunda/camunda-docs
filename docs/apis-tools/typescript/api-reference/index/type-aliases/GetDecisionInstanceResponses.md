---
title: "Type Alias: GetDecisionInstanceResponses"
sidebar_label: "GetDecisionInstanceResponses"
mdx:
  format: md
---

# Type Alias: GetDecisionInstanceResponses

```ts
type GetDecisionInstanceResponses = object;
```

Defined in: [gen/types.gen.ts:9574](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9574)

## Properties

### 200

```ts
200: object & object;
```

Defined in: [gen/types.gen.ts:9578](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9578)

The decision instance is successfully returned.

#### Type Declaration

##### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

The ID of the DMN decision.

##### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKey;
```

The key of the decision.

##### decisionDefinitionName?

```ts
optional decisionDefinitionName: string;
```

The name of the DMN decision.

##### decisionDefinitionType?

```ts
optional decisionDefinitionType: DecisionDefinitionTypeEnum;
```

##### decisionDefinitionVersion?

```ts
optional decisionDefinitionVersion: number;
```

The version of the decision.

##### decisionEvaluationInstanceKey?

```ts
optional decisionEvaluationInstanceKey: DecisionEvaluationInstanceKey;
```

##### decisionEvaluationKey?

```ts
optional decisionEvaluationKey: DecisionEvaluationKey;
```

The key of the decision evaluation where this instance was created.

##### elementInstanceKey?

```ts
optional elementInstanceKey: ElementInstanceKey;
```

The key of the element instance this decision instance is linked to.

##### evaluationDate?

```ts
optional evaluationDate: string;
```

The evaluation date of the decision instance.

##### evaluationFailure?

```ts
optional evaluationFailure: string;
```

The evaluation failure of the decision instance.

##### processDefinitionKey?

```ts
optional processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition.

##### processInstanceKey?

```ts
optional processInstanceKey: ProcessInstanceKey;
```

The key of the process instance.

##### result?

```ts
optional result: string;
```

The result of the decision instance.

##### rootDecisionDefinitionKey?

```ts
optional rootDecisionDefinitionKey: DecisionDefinitionKey;
```

The key of the root decision definition.

##### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey: ProcessInstanceKey;
```

##### state?

```ts
optional state: DecisionInstanceStateEnum;
```

##### tenantId?

```ts
optional tenantId: TenantId;
```

The tenant ID of the decision instance.

#### Type Declaration

##### evaluatedInputs?

```ts
optional evaluatedInputs: EvaluatedDecisionInputItem[];
```

The evaluated inputs of the decision instance.

##### matchedRules?

```ts
optional matchedRules: MatchedDecisionRuleItem[];
```

The matched rules of the decision instance.
