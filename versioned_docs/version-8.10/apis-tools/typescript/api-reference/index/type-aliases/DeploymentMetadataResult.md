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

## Properties

### decisionDefinition

```ts
decisionDefinition: DeploymentDecisionResult | null;
```

Deployed decision.

---

### decisionRequirements

```ts
decisionRequirements:
  | DeploymentDecisionRequirementsResult
  | null;
```

Deployed decision requirement definition.

---

### form

```ts
form: DeploymentFormResult | null;
```

Deployed form.

---

### processDefinition

```ts
processDefinition: DeploymentProcessResult | null;
```

Deployed process.

---

### resource

```ts
resource: DeploymentResourceResult | null;
```

Deployed resource.
