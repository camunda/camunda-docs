---
title: "Type Alias: SearchUsersForGroupData"
sidebar_label: "SearchUsersForGroupData"
mdx:
  format: md
---

# Type Alias: SearchUsersForGroupData

```ts
type SearchUsersForGroupData = object;
```

Defined in: [gen/types.gen.ts:11215](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11215)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:11216](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11216)

#### Type Declaration

##### sort?

```ts
optional sort: TenantUserSearchQuerySortRequest[];
```

Sort field criteria.

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:11222](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11222)

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

Defined in: [gen/types.gen.ts:11228](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11228)

---

### url

```ts
url: "/groups/{groupId}/users/search";
```

Defined in: [gen/types.gen.ts:11229](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L11229)
