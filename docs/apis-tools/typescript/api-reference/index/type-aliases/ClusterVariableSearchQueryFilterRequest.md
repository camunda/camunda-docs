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

Defined in: [gen/types.gen.ts:1229](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1229)

Cluster variable filter request.

## Properties

### isTruncated?

```ts
optional isTruncated: boolean;
```

Defined in: [gen/types.gen.ts:1250](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1250)

Filter cluster variables by truncation status of their stored values. When true, returns only variables whose stored values are truncated (i.e., the value exceeds the storage size limit and is truncated in storage). When false, returns only variables with non-truncated stored values. This filter is based on the underlying storage characteristic, not the response format.

***

### name?

```ts
optional name: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:1233](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1233)

Name of the cluster variable.

***

### scope?

```ts
optional scope: ClusterVariableScopeFilterProperty;
```

Defined in: [gen/types.gen.ts:1241](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1241)

The scope filter for cluster variables.

***

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:1245](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1245)

Tenant ID of this variable.

***

### value?

```ts
optional value: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:1237](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1237)

The value of the cluster variable.
