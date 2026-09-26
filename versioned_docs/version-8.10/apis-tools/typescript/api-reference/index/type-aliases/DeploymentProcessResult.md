---
title: "Type Alias: DeploymentProcessResult"
sidebar_label: "DeploymentProcessResult"
mdx:
  format: md
---

# Type Alias: DeploymentProcessResult

```ts
type DeploymentProcessResult = object;
```

A deployed process.

## Properties

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The bpmn process ID, as parsed during deployment, together with the version forms a
unique identifier for a specific process definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The assigned key, which acts as a unique identifier for this process.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

The assigned process version.

---

### resourceName

```ts
resourceName: string;
```

The resource name from which this process was parsed.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID of the deployed process.
