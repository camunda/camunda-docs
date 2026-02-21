---
title: "Type Alias: ClusterVariableResultBase"
sidebar_label: "ClusterVariableResultBase"
mdx:
  format: md
---

# Type Alias: ClusterVariableResultBase

```ts
type ClusterVariableResultBase = object;
```

Defined in: [gen/types.gen.ts:1159](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1159)

Cluster variable response item.

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:1163](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1163)

The name of the cluster variable. Unique within its scope (global or tenant-specific).

---

### scope

```ts
scope: ClusterVariableScopeEnum;
```

Defined in: [gen/types.gen.ts:1164](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1164)

---

### tenantId?

```ts
optional tenantId: string;
```

Defined in: [gen/types.gen.ts:1168](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1168)

Only provided if the cluster variable scope is TENANT.
