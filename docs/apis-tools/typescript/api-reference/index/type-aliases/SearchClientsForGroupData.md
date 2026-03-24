---
title: "Type Alias: SearchClientsForGroupData"
sidebar_label: "SearchClientsForGroupData"
mdx:
  format: md
---

# Type Alias: SearchClientsForGroupData

```ts
type SearchClientsForGroupData = object;
```

Defined in: [gen/types.gen.ts:10860](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10860)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:10861](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10861)

#### Type Declaration

##### sort?

```ts
optional sort: TenantClientSearchQuerySortRequest[];
```

Sort field criteria.

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:10867](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10867)

#### groupId

```ts
groupId: string;
```

The group ID.

---

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:10873](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10873)

---

### url

```ts
url: "/groups/{groupId}/clients/search";
```

Defined in: [gen/types.gen.ts:10874](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L10874)
