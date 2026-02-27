---
title: "Type Alias: getStartProcessFormConsistency"
sidebar_label: "getStartProcessFormConsistency"
mdx:
  format: md
---

# Type Alias: getStartProcessFormConsistency

```ts
type getStartProcessFormConsistency = object;
```

Defined in: [gen/CamundaClient.ts:529](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L529)

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getStartProcessForm>>;
```

Defined in: [gen/CamundaClient.ts:531](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/CamundaClient.ts#L531)

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
