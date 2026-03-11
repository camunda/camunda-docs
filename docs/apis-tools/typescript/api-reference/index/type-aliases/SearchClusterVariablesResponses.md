---
title: "Type Alias: SearchClusterVariablesResponses"
sidebar_label: "SearchClusterVariablesResponses"
mdx:
  format: md
---

# Type Alias: SearchClusterVariablesResponses

```ts
type SearchClusterVariablesResponses = object;
```

Defined in: [gen/types.gen.ts:8844](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8844)

## Properties

### 200

```ts
200: SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:8848](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L8848)

Cluster variable search query response.

#### Type Declaration

##### items?

```ts
optional items: ClusterVariableResultBase & object[];
```

The matching cluster variables.
