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

Defined in: [gen/types.gen.ts:1196](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1196)

Cluster variable filter request.

## Properties

### isTruncated?

```ts
optional isTruncated: boolean;
```

Defined in: [gen/types.gen.ts:1217](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1217)

Filter cluster variables by truncation status of their stored values. When true, returns only variables whose stored values are truncated (i.e., the value exceeds the storage size limit and is truncated in storage). When false, returns only variables with non-truncated stored values. This filter is based on the underlying storage characteristic, not the response format.

---

### name?

```ts
optional name: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:1200](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1200)

Name of the cluster variable.

---

### scope?

```ts
optional scope: ClusterVariableScopeFilterProperty;
```

Defined in: [gen/types.gen.ts:1208](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1208)

The scope filter for cluster variables.

---

### tenantId?

```ts
optional tenantId: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:1212](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1212)

Tenant ID of this variable.

---

### value?

```ts
optional value: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:1204](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1204)

The value of the cluster variable.
