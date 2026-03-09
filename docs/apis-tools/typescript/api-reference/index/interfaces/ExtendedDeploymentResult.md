---
title: "Interface: ExtendedDeploymentResult"
sidebar_label: "ExtendedDeploymentResult"
mdx:
  format: md
---

# Interface: ExtendedDeploymentResult

Defined in: [gen/CamundaClient.ts:1101](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1101)

Extended deployment result with typed buckets for direct access to deployed artifacts.

## Extends

- `_DataOf`\<_typeof_ `Sdk.createDeployment`\>

## Properties

### decisionRequirements

```ts
decisionRequirements: DeploymentDecisionRequirementsResult[];
```

Defined in: [gen/CamundaClient.ts:1104](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1104)

---

### decisions

```ts
decisions: DeploymentDecisionResult[];
```

Defined in: [gen/CamundaClient.ts:1103](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1103)

---

### deploymentKey

```ts
deploymentKey: DeploymentKey;
```

Defined in: [gen/types.gen.ts:9975](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9975)

The unique key identifying the deployment.

#### Inherited from

```ts
_DataOf.deploymentKey;
```

---

### deployments

```ts
deployments: object[];
```

Defined in: [gen/types.gen.ts:9983](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9983)

Items deployed by the request.

#### decisionDefinition?

```ts
optional decisionDefinition: DeploymentDecisionResult;
```

#### decisionRequirements?

```ts
optional decisionRequirements: DeploymentDecisionRequirementsResult;
```

#### form?

```ts
optional form: object;
```

A deployed form.

##### form.formId?

```ts
optional formId: FormId;
```

The form ID, as parsed during deployment, together with the version forms a
unique identifier for a specific form.

##### form.formKey?

```ts
optional formKey: FormKey;
```

The assigned key, which acts as a unique identifier for this form.

##### form.resourceName?

```ts
optional resourceName: string;
```

##### form.tenantId?

```ts
optional tenantId: TenantId;
```

##### form.version?

```ts
optional version: number;
```

#### processDefinition?

```ts
optional processDefinition: DeploymentProcessResult;
```

#### resource?

```ts
optional resource: DeploymentResourceResult;
```

#### Inherited from

```ts
_DataOf.deployments;
```

---

### forms

```ts
forms: object[];
```

Defined in: [gen/CamundaClient.ts:1105](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1105)

#### formId?

```ts
optional formId: FormId;
```

The form ID, as parsed during deployment, together with the version forms a
unique identifier for a specific form.

#### formKey?

```ts
optional formKey: FormKey;
```

The assigned key, which acts as a unique identifier for this form.

#### resourceName?

```ts
optional resourceName: string;
```

#### tenantId?

```ts
optional tenantId: TenantId;
```

#### version?

```ts
optional version: number;
```

---

### processes

```ts
processes: DeploymentProcessResult[];
```

Defined in: [gen/CamundaClient.ts:1102](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1102)

---

### resources

```ts
resources: DeploymentResourceResult[];
```

Defined in: [gen/CamundaClient.ts:1106](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L1106)

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:9979](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L9979)

The tenant ID associated with the deployment.

#### Inherited from

```ts
_DataOf.tenantId;
```
