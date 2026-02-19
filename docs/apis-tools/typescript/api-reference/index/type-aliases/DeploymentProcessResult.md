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

Defined in: [gen/types.gen.ts:2019](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2019)

A deployed process.

## Properties

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

Defined in: [gen/types.gen.ts:2025](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2025)

The bpmn process ID, as parsed during deployment, together with the version forms a
unique identifier for a specific process definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

Defined in: [gen/types.gen.ts:2041](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2041)

The assigned key, which acts as a unique identifier for this process.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

Defined in: [gen/types.gen.ts:2029](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2029)

The assigned process version.

---

### resourceName

```ts
resourceName: string;
```

Defined in: [gen/types.gen.ts:2033](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2033)

The resource name from which this process was parsed.

---

### tenantId

```ts
tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2037](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2037)

The tenant ID of the deployed process.
