---
title: "Type Alias: SearchClusterVariablesData"
sidebar_label: "SearchClusterVariablesData"
mdx:
  format: md
---

# Type Alias: SearchClusterVariablesData

```ts
type SearchClusterVariablesData = object;
```

Defined in: [gen/types.gen.ts:8759](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8759)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:8763](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8763)

Cluster variable search query request.

#### Type Declaration

##### filter?

```ts
optional filter: object;
```

Cluster variable filter request.

###### filter.isTruncated?

```ts
optional isTruncated: boolean;
```

Filter cluster variables by truncation status of their stored values. When true, returns only variables whose stored values are truncated (i.e., the value exceeds the storage size limit and is truncated in storage). When false, returns only variables with non-truncated stored values. This filter is based on the underlying storage characteristic, not the response format.

###### filter.name?

```ts
optional name: StringFilterProperty;
```

Name of the cluster variable.

###### filter.scope?

```ts
optional scope:
  | ClusterVariableScopeEnum
  | {
  $eq?: ClusterVariableScopeEnum;
  $exists?: boolean;
  $in?: ClusterVariableScopeEnum[];
  $like?: LikeFilter;
  $neq?: ClusterVariableScopeEnum;
};
```

ClusterVariableScopeEnum property with full advanced search capabilities.

###### Type Declaration

[`ClusterVariableScopeEnum`](ClusterVariableScopeEnum.md)

```ts
{
  $eq?: ClusterVariableScopeEnum;
  $exists?: boolean;
  $in?: ClusterVariableScopeEnum[];
  $like?: LikeFilter;
  $neq?: ClusterVariableScopeEnum;
}
```

###### filter.tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Tenant ID of this variable.

###### filter.value?

```ts
optional value: StringFilterProperty;
```

The value of the cluster variable.

##### sort?

```ts
optional sort: ClusterVariableSearchQuerySortRequest[];
```

Sort field criteria.

---

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:8813](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8813)

---

### query?

```ts
optional query: object;
```

Defined in: [gen/types.gen.ts:8814](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8814)

#### truncateValues?

```ts
optional truncateValues: boolean;
```

When true (default), long variable values in the response are truncated. When false, full variable values are returned.

---

### url

```ts
url: "/cluster-variables/search";
```

Defined in: [gen/types.gen.ts:8820](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8820)
