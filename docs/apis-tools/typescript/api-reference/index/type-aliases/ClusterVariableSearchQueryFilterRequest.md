---
title: "Type Alias: ClusterVariableSearchQueryFilterRequest"
sidebar_label: "ClusterVariableSearchQueryFilterRequest"
mdx:
  format: md
---

# Type Alias: ClusterVariableSearchQueryFilterRequest

```ts
type ClusterVariableSearchQueryFilterRequest = object;
```

Defined in: [gen/types.gen.ts:1231](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1231)

Cluster variable filter request.

## Properties

### isTruncated?

```ts
optional isTruncated: boolean;
```

Defined in: [gen/types.gen.ts:1252](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1252)

Filter cluster variables by truncation status of their stored values. When true, returns only variables whose stored values are truncated (i.e., the value exceeds the storage size limit and is truncated in storage). When false, returns only variables with non-truncated stored values. This filter is based on the underlying storage characteristic, not the response format.

***

### name?

```ts
optional name: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:1235](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1235)

Name of the cluster variable.

***

### scope?

```ts
optional scope: ClusterVariableScopeFilterProperty;
```

Defined in: [gen/types.gen.ts:1243](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1243)

The scope filter for cluster variables.

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:1247](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1247)

Tenant ID of this variable.

***

### value?

```ts
optional value: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:1239](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1239)

The value of the cluster variable.
