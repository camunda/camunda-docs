---
title: "Type Alias: DeploymentMetadataResult"
sidebar_label: "DeploymentMetadataResult"
mdx:
  format: md
---

# Type Alias: DeploymentMetadataResult

```ts
type DeploymentMetadataResult = object;
```

Defined in: [gen/types.gen.ts:2073](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2073)

## Properties

### decisionDefinition

```ts
decisionDefinition: DeploymentDecisionResult | null;
```

Defined in: [gen/types.gen.ts:2081](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2081)

Deployed decision.

***

### decisionRequirements

```ts
decisionRequirements: 
  | DeploymentDecisionRequirementsResult
  | null;
```

Defined in: [gen/types.gen.ts:2085](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2085)

Deployed decision requirement definition.

***

### form

```ts
form: DeploymentFormResult | null;
```

Defined in: [gen/types.gen.ts:2089](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2089)

Deployed form.

***

### processDefinition

```ts
processDefinition: DeploymentProcessResult | null;
```

Defined in: [gen/types.gen.ts:2077](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2077)

Deployed process.

***

### resource

```ts
resource: DeploymentResourceResult | null;
```

Defined in: [gen/types.gen.ts:2093](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2093)

Deployed resource.
