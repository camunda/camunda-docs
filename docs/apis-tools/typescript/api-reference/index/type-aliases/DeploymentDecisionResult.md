---
title: "Type Alias: DeploymentDecisionResult"
sidebar_label: "DeploymentDecisionResult"
mdx:
  format: md
---

# Type Alias: DeploymentDecisionResult

```ts
type DeploymentDecisionResult = object;
```

Defined in: [gen/types.gen.ts:2047](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2047)

A deployed decision.

## Properties

### decisionDefinitionId?

```ts
optional decisionDefinitionId: DecisionDefinitionId;
```

Defined in: [gen/types.gen.ts:2053](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2053)

The dmn decision ID, as parsed during deployment, together with the version forms a
unique identifier for a specific decision.

---

### decisionDefinitionKey?

```ts
optional decisionDefinitionKey: DecisionDefinitionKey;
```

Defined in: [gen/types.gen.ts:2075](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2075)

The assigned decision key, which acts as a unique identifier for this decision.

---

### decisionRequirementsId?

```ts
optional decisionRequirementsId: string;
```

Defined in: [gen/types.gen.ts:2070](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2070)

The dmn ID of the decision requirements graph that this decision is part of, as parsed during deployment.

---

### decisionRequirementsKey?

```ts
optional decisionRequirementsKey: DecisionRequirementsKey;
```

Defined in: [gen/types.gen.ts:2080](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2080)

The assigned key of the decision requirements graph that this decision is part of.

---

### name?

```ts
optional name: string;
```

Defined in: [gen/types.gen.ts:2061](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2061)

The DMN name of the decision, as parsed during deployment.

---

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2065](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2065)

The tenant ID of the deployed decision.

---

### version?

```ts
optional version: number;
```

Defined in: [gen/types.gen.ts:2057](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2057)

The assigned decision version.
