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

A deployed decision.

## Properties

### decisionDefinitionId

```ts
decisionDefinitionId: DecisionDefinitionId;
```

The dmn decision ID, as parsed during deployment, together with the version forms a
unique identifier for a specific decision.

---

### decisionDefinitionKey

```ts
decisionDefinitionKey: DecisionDefinitionKey;
```

The assigned decision key, which acts as a unique identifier for this decision.

---

### decisionRequirementsId

```ts
decisionRequirementsId: string;
```

The dmn ID of the decision requirements graph that this decision is part of, as parsed during deployment.

---

### decisionRequirementsKey

```ts
decisionRequirementsKey: DecisionRequirementsKey;
```

The assigned key of the decision requirements graph that this decision is part of.

---

### name

```ts
name: string;
```

The DMN name of the decision, as parsed during deployment.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID of the deployed decision.

---

### version

```ts
version: number;
```

The assigned decision version.
